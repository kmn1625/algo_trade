"""Mechanics tests on tiny hand-built bar sets (expected fills computed by hand) + invariants on synthetic data."""
import numpy as np
import pandas as pd
import pytest

from backtest import indicators as ind
from backtest.engine import OrbParams, BbParams, HybridParams, Costs, simulate
from backtest.synth import make_synthetic

NO_COST = Costs(commission_value=0.0, slippage_ticks=0.0)


def day_frame(date, bars, minutes=15, first="09:15"):
    """bars: list of (o,h,l,c) starting at `first`."""
    t0 = pd.Timestamp(f"{date} {first}")
    idx = [t0 + pd.Timedelta(minutes=minutes * k) for k in range(len(bars))]
    return pd.DataFrame(bars, columns=["open", "high", "low", "close"], index=pd.DatetimeIndex(idx))


def orb_params(**kw):
    base = dict(use_st_filter=False, use_st_exit=False, use_trail=False, sl_points=5.0)
    base.update(kw)
    return OrbParams(**base)


def fill_to(bars, n_bars, px):
    """pad with flat bars at price px so the day reaches a given number of bars."""
    while len(bars) < n_bars:
        bars.append((px, px, px, px))
    return bars


def base_day():
    # 09:15 ignored by range; 09:30 & 09:45 build range 98..102; 10:00 flat inside.
    return [(100, 101, 99, 100), (100, 101, 99, 100), (100, 102, 98, 100), (100, 101, 99, 100)]


def test_long_breakout_fill_and_hard_stop():
    bars = base_day() + [(100, 103, 100, 102.5), (102.5, 102.6, 96, 97)]   # 10:15 breakout, 10:30 stop
    t, _ = simulate(day_frame("2024-03-04", bars), "orb", orb=orb_params(), costs=NO_COST)
    assert len(t) == 1
    x = t[0]
    assert x.side == 1 and x.entry_px == 102 and x.exit_px == 97 and x.reason == "stop"
    assert x.gross_pts == -5


def test_gap_through_level_fills_at_open():
    bars = base_day() + [(104, 105, 103, 104.5), (104.5, 104.6, 96, 97)]
    t, _ = simulate(day_frame("2024-03-04", bars), "orb", orb=orb_params(), costs=NO_COST)
    assert t[0].entry_px == 104                     # filled at the gap open, not at 102
    assert t[0].exit_px == 97 and t[0].reason == "stop"   # hard stop stays anchored at orbH - 5


def test_short_breakout_and_oca_one_side_only():
    bars = base_day() + [(100, 100, 96, 97), (97, 104, 97, 103)]            # short fills 98; later bar would break high
    t, _ = simulate(day_frame("2024-03-04", bars), "orb", orb=orb_params(), costs=NO_COST)
    assert [x.side for x in t] == [-1]               # long order was cancelled by OCA / flat check
    assert t[0].entry_px == 98 and t[0].exit_px == 103 and t[0].reason == "stop"


def test_max_trades_one_per_day():
    bars = base_day() + [(100, 103, 100, 102.5), (102.5, 102.6, 96, 97),     # long, stopped out
                         (97, 104, 90, 100), (100, 110, 95, 108)]            # more breakouts later
    t, _ = simulate(day_frame("2024-03-04", bars), "orb", orb=orb_params(max_trades=1), costs=NO_COST)
    assert len(t) == 1


def test_trailing_stop():
    bars = base_day() + [(100, 103, 100, 102.5), (102.5, 106, 102.5, 105.5), (105.5, 105.6, 103.5, 104)]
    p = orb_params(sl_points=50, use_trail=True, trail_activate=3, trail_offset=2)
    t, _ = simulate(day_frame("2024-03-04", bars), "orb", orb=p, costs=NO_COST)
    # entry 102, high 106 -> trail = 104; next bar low 103.5 <= 104 -> exit at 104
    assert t[0].entry_px == 102 and t[0].exit_px == 104 and t[0].reason == "trail"


def test_slippage_is_adverse_both_ways():
    bars = base_day() + [(100, 103, 100, 102.5), (102.5, 102.6, 96, 97)]
    c = Costs(commission_value=0.0, slippage_ticks=10, mintick=0.05)       # 0.5 pt per fill
    t, _ = simulate(day_frame("2024-03-04", bars), "orb", orb=orb_params(), costs=c)
    assert t[0].entry_px == pytest.approx(102.5) and t[0].exit_px == pytest.approx(96.5)


def test_no_entry_before_range_complete_or_outside_window():
    # breakout during the range window itself must not trade
    bars = [(100, 101, 99, 100), (100, 110, 99, 109), (109, 112, 108, 111)]
    t, _ = simulate(day_frame("2024-03-04", bars), "orb", orb=orb_params(), costs=NO_COST)
    assert t == []


def test_eod_exit_on_15m_bars_becomes_overnight_hold():
    """15m bars: the only bar inside 15:10-15:30 is the 15:15 bar, so the exit order is only
    filled at the NEXT day's open. This documents a real timeframe sensitivity of the script."""
    day1 = base_day() + [(100, 103, 100, 102.5)]
    day1 = fill_to(day1, 25, 102.5)                       # 09:15 + 24*15m = 15:15 is bar index 24
    day1.append((102.5, 102.5, 102.5, 102.5))
    d1 = day_frame("2024-03-04", day1[:25])
    d2 = day_frame("2024-03-05", [(110, 110, 110, 110)] * 3)
    t, _ = simulate(pd.concat([d1, d2]), "orb", orb=orb_params(sl_points=50), costs=NO_COST)
    assert len(t) == 1 and t[0].reason == "eod" and t[0].overnight is True
    assert t[0].exit_px == 110                             # exited at the next session's open


def test_eod_exit_on_5m_bars_same_day():
    # 5m bars: range 09:30-10:00 = 6 bars. Build a day up to 15:25 and check flat by close.
    n = (15 * 60 + 30 - (9 * 60 + 15)) // 5
    bars = [(100, 101, 99, 100)] * 3                      # 09:15..09:25
    bars += [(100, 102, 98, 100)] * 6                     # 09:30..09:55 (range)
    bars += [(100, 101, 99, 100)] * 1                     # 10:00
    bars += [(100, 103, 100, 102.5)]                      # 10:05 breakout -> long @102
    bars = fill_to(bars, n, 102.5)
    t, _ = simulate(day_frame("2024-03-04", bars, minutes=5), "orb", orb=orb_params(sl_points=50), costs=NO_COST)
    assert len(t) == 1 and t[0].reason == "eod" and not t[0].overnight


def test_indicators_basic():
    up = np.arange(1.0, 60.0)
    assert ind.rsi(up, 14)[-1] == 100.0
    flat_rng = np.full(40, 10.0)
    a = ind.atr(flat_rng + 1, flat_rng - 1, flat_rng, 14)
    assert a[-1] == pytest.approx(2.0)
    b, u, l = ind.bbands(np.tile([1.0, 3.0], 20), 20, 2.0)
    assert b[-1] == pytest.approx(2.0) and u[-1] == pytest.approx(4.0)   # population stdev = 1
    c = np.linspace(100, 200, 120)
    _, d = ind.supertrend(c + 1, c - 1, c, 3.0, 10)
    assert d[-1] == -1.0                                                  # -1 = uptrend (Pine convention)


def test_bb_rsi_mean_reversion_long():
    base = [100.0, 100.1] * 20
    bars = [(p, p + 0.05, p - 0.05, p) for p in base]
    bars.append((100.0, 100.0, 89.9, 90.0))               # crash close far below lower band, RSI collapses
    bars.append((90.0, 100.2, 89.8, 100.0))               # closes back inside band -> signal on this bar
    bars += [(100.0, 100.3, 99.8, 100.2)] * 4             # fill bar then recovery above the basis
    bars += [(100.2, 100.4, 100.0, 100.3)] * 6
    df = day_frame("2024-03-04", bars, minutes=5)
    bp = BbParams(use_adx=False)
    t, _ = simulate(df, "bb", bb=bp, costs=NO_COST)
    longs = [x for x in t if x.side == 1]
    assert longs, "expected a long mean-reversion trade"
    sig_bar = 41
    assert longs[0].entry_time == df.index[sig_bar + 1]   # filled at the NEXT bar's open
    assert longs[0].entry_px == df.open.iloc[sig_bar + 1]


# ---- invariants on synthetic data (mechanics only; says nothing about real performance) ----
@pytest.mark.parametrize("mode", ["orb", "bb", "hybrid"])
def test_invariants_synthetic(mode):
    df = make_synthetic(days=120, bar_minutes=15)
    trades, _ = simulate(df, mode, orb=OrbParams(), bb=BbParams(), hyb=HybridParams(), costs=Costs())
    last_exit = None
    for x in trades:
        assert x.exit_time >= x.entry_time
        assert x.gross_pts == pytest.approx((x.exit_px - x.entry_px) * x.side)
        if last_exit is not None:
            assert x.entry_time >= last_exit              # one position at a time
        last_exit = x.exit_time
        if x.tag == "ORB":
            tod = x.entry_time.hour * 60 + x.entry_time.minute
            assert 10 * 60 <= tod < 14 * 60 + 30 + 15     # entry window (+1 bar for a fill on the next bar)
    # maxTrades=1 can only be exceeded when the earlier trade was entered AND stopped inside one bar
    # (position_size is 0 at both closes, so the script's tradesToday counter never increments).
    orb_trades = [x for x in trades if x.tag == "ORB"]
    by_day = {}
    for x in orb_trades:
        by_day.setdefault(x.entry_time.normalize(), []).append(x)
    for d, xs in by_day.items():
        assert all(y.bars == 0 for y in xs[:-1]), f"{d}: second ORB trade after a non-same-bar trade"


def test_same_bar_entry_and_stop_does_not_count_toward_max_trades():
    # 10:15 bar: breaks 102 and falls through the 97 stop within the same bar; 10:30 breaks again.
    bars = base_day() + [(100, 103, 90, 95), (95, 95, 94, 94.5), (94.5, 94.5, 94.5, 94.5)]
    bars[-2] = (100, 110, 99, 108)       # 10:30 bar: long breakout again
    t, _ = simulate(day_frame("2024-03-04", bars), "orb", orb=orb_params(max_trades=1), costs=NO_COST)
    assert len(t) >= 2                   # script-as-written quirk: more than maxTrades
