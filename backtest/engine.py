"""Bar-based simulator that mirrors the two Pine scripts (ORB revised, BB+RSI) and a hybrid of them.

Execution model (approximation of TradingView's broker emulator, process_orders_on_close=false):
  * Logic runs at bar CLOSE. Orders it places become active on the NEXT bar.
  * Market orders fill at the next bar's open. Stop orders fill at the stop price, or at the
    open if the bar gaps through it.
  * Intrabar path: O->H->L->C if the high is closer to the open than the low, else O->L->H->C.
  * Slippage is applied against you on every fill (ticks * mintick).
Timestamps in the data are BAR OPEN times in exchange time (IST), as TradingView uses.

This is a re-implementation from reading the scripts. It has NOT been diffed against TradingView's
Strategy Tester trade-by-trade; do that on a short window before trusting the numbers.
"""
from dataclasses import dataclass
import numpy as np
import pandas as pd

from . import indicators as ind


def hhmm(s):
    return int(s[:2]) * 60 + int(s[2:])


def parse_session(s):
    a, b = s.split("-")
    return hhmm(a), hhmm(b)


@dataclass
class OrbParams:
    range_session: str = "0930-1000"
    entry_session: str = "1000-1430"
    squareoff_session: str = "1510-1530"
    max_trades: int = 1
    stop_mode: str = "Fixed points"          # or "Opposite range side"
    sl_points: float = 50.0
    use_trail: bool = True
    trail_activate: float = 60.0
    trail_offset: float = 30.0
    st_factor: float = 3.0
    st_len: int = 10
    use_st_filter: bool = True
    use_st_exit: bool = True


@dataclass
class BbParams:
    bb_len: int = 20
    bb_mult: float = 2.0
    rsi_len: int = 14
    rsi_os: float = 24.0
    rsi_ob: float = 76.0
    use_adx: bool = True
    adx_len: int = 14
    adx_max: float = 25.0
    exit_mode: str = "Middle band"           # "RSI 50" / "Either"
    atr_len: int = 14
    atr_mult: float = 1.5
    cooldown: int = 3
    enable_long: bool = True
    enable_short: bool = True
    eod_squareoff: bool = False              # script as written has NO end-of-day exit
    entry_window: str = ""                   # "" = any bar (as written); e.g. "1000-1430"


@dataclass
class HybridParams:
    bb_only_before_orb_trade: bool = True    # stop fading once ORB has traded today
    bb_inside_or_only: bool = False          # BB fades only while close is inside the opening range
    bb_max_per_day: int = 2
    bb_entry_window: str = "1000-1430"
    bb_force_eod: bool = True


@dataclass
class Costs:
    commission_type: str = "cash_per_order"   # or "percent"
    commission_value: float = 20.0            # INR per order, or percent of trade value per side
    slippage_ticks: float = 0.0
    mintick: float = 0.05


@dataclass
class Trade:
    tag: str
    side: int
    entry_time: pd.Timestamp
    entry_px: float
    exit_time: pd.Timestamp = None
    exit_px: float = np.nan
    reason: str = ""
    overnight: bool = False
    bars: int = 0
    gross_pts: float = np.nan


def _path(o, h, l, c):
    return [o, h, l, c] if abs(h - o) <= abs(l - o) else [o, l, h, c]


def simulate(df, mode, orb=None, bb=None, hyb=None, costs=None, qty=1.0):
    """df: DatetimeIndex (bar open, IST) with open/high/low/close. mode in {'orb','bb','hybrid'}."""
    orb = orb or OrbParams()
    bb = bb or BbParams()
    hyb = hyb or HybridParams()
    costs = costs or Costs()
    tick = costs.mintick
    slip = costs.slippage_ticks * tick

    o = df["open"].to_numpy(float)
    h = df["high"].to_numpy(float)
    l = df["low"].to_numpy(float)
    c = df["close"].to_numpy(float)
    idx = df.index
    n = len(df)
    tod = (idx.hour * 60 + idx.minute).to_numpy()
    day = np.asarray(idx.normalize().asi8)

    use_orb = mode in ("orb", "hybrid")
    use_bb = mode in ("bb", "hybrid")

    _, st_dir = ind.supertrend(h, l, c, orb.st_factor, orb.st_len)[0:2] if use_orb else (None, None)
    if use_bb:
        basis, upper, lower = ind.bbands(c, bb.bb_len, bb.bb_mult)
        rsi_v = ind.rsi(c, bb.rsi_len)
        _, _, adx_v = ind.adx(h, l, c, bb.adx_len, bb.adx_len)
        atr_v = ind.atr(h, l, c, bb.atr_len)

    rs, re_ = parse_session(orb.range_session)
    es, ee = parse_session(orb.entry_session)
    ss, se = parse_session(orb.squareoff_session)
    if hyb.bb_entry_window:
        bws, bwe = parse_session(hyb.bb_entry_window)
    if bb.entry_window:
        bbs, bbe = parse_session(bb.entry_window)

    trades = []
    # position state
    pos = 0
    tr = None
    entry_px = stop_px = ext = trail_stop = 0.0
    trail_on = False
    trail_act = trail_off = None
    tag = ""
    entry_bar = 0
    # pending (decided at previous close)
    pend_long = pend_short = None            # (level, stop_level)
    queued = None                            # ("close", reason, decision_day) | ("enter", side, tag, stop_ticks)
    # day / strategy state
    cur_day = None
    orbH = orbL = np.nan
    orb_trades = 0
    bb_trades = 0
    prev_pos = 0
    last_exit_bar = None

    def open_pos(side, px, i, tg, stop, act=None, off=None):
        nonlocal pos, tr, entry_px, stop_px, ext, trail_on, trail_stop, trail_act, trail_off, tag, entry_bar
        pos, tag, entry_px, stop_px, ext = side, tg, px, stop, px
        trail_on, trail_stop, trail_act, trail_off = False, np.nan, act, off
        entry_bar = i
        tr = Trade(tg, side, idx[i], px)

    def close_pos(px, i, reason):
        nonlocal pos, tr
        tr.exit_time, tr.exit_px, tr.reason = idx[i], px, reason
        tr.overnight = bool(day[i] != day[entry_bar])
        tr.bars = i - entry_bar
        tr.gross_pts = (px - tr.entry_px) * tr.side
        trades.append(tr)
        pos, tr = 0, None

    def eff_stop():
        """(level, reason) of the currently effective protective stop."""
        if trail_on and ((pos > 0 and trail_stop > stop_px) or (pos < 0 and trail_stop < stop_px)):
            return trail_stop, "trail"
        return stop_px, "stop"

    def advance(a, b):
        """Move price from a to b with a position open. Return True if stopped out."""
        nonlocal ext, trail_on, trail_stop
        s = pos
        if s * (b - a) > 0:                   # favourable move: ratchet extreme / trail
            if s * (b - ext) > 0:
                ext = b
            if trail_act is not None:
                if s * (ext - entry_px) >= trail_act:
                    trail_on = True
                if trail_on:
                    cand = ext - s * trail_off
                    if np.isnan(trail_stop) or s * (cand - trail_stop) > 0:
                        trail_stop = cand
            return False
        if b == a:
            return False
        lvl, why = eff_stop()                 # adverse move
        if s * (b - lvl) <= 0:
            return lvl, why
        return False

    for i in range(n):
        # ---------- bar open: queued market orders ----------
        if queued is not None:
            if queued[0] == "close" and pos != 0:
                px = o[i] - pos * slip
                close_pos(px, i, queued[1])
            elif queued[0] == "enter" and pos == 0:
                _, side, tg, stop_ticks = queued
                px = o[i] + side * slip
                open_pos(side, px, i, tg, px - side * stop_ticks * tick)
            queued = None

        # ---------- bar open: gap fills for pending ORB stop entries ----------
        if pos == 0 and (pend_long or pend_short):
            if pend_long and o[i] >= pend_long[0]:
                open_pos(1, o[i] + slip, i, "ORB", pend_long[1],
                         orb.trail_activate if orb.use_trail else None,
                         orb.trail_offset if orb.use_trail else None)
            elif pend_short and o[i] <= pend_short[0]:
                open_pos(-1, o[i] - slip, i, "ORB", pend_short[1],
                         orb.trail_activate if orb.use_trail else None,
                         orb.trail_offset if orb.use_trail else None)
        pend_snapshot = (pend_long, pend_short)
        pend_long = pend_short = None

        # ---------- intrabar walk ----------
        pts = _path(o[i], h[i], l[i], c[i])
        cur = pts[0]
        if pos != 0 and (pos * (cur - eff_stop()[0]) <= 0):
            lvl, why = eff_stop()
            close_pos(cur - pos * slip, i, "gap_" + why)
        for nxt in pts[1:]:
            if pos == 0 and (pend_snapshot[0] or pend_snapshot[1]):
                pl, ps = pend_snapshot
                if pl and cur < pl[0] <= nxt:
                    open_pos(1, pl[0] + slip, i, "ORB", pl[1],
                             orb.trail_activate if orb.use_trail else None,
                             orb.trail_offset if orb.use_trail else None)
                    cur = pl[0]
                    pend_snapshot = (None, None)
                elif ps and nxt <= ps[0] < cur:
                    open_pos(-1, ps[0] - slip, i, "ORB", ps[1],
                             orb.trail_activate if orb.use_trail else None,
                             orb.trail_offset if orb.use_trail else None)
                    cur = ps[0]
                    pend_snapshot = (None, None)
            if pos != 0:
                hit = advance(cur, nxt)
                if hit:
                    lvl, why = hit
                    close_pos(lvl - pos * slip, i, why)
            cur = nxt

        # ---------- bar close: bookkeeping ----------
        if cur_day != day[i]:
            cur_day = day[i]
            orbH = orbL = np.nan
            orb_trades = 0
            bb_trades = 0
        in_range = rs <= tod[i] < re_
        if use_orb and in_range:
            orbH = h[i] if np.isnan(orbH) else max(orbH, h[i])
            orbL = l[i] if np.isnan(orbL) else min(orbL, l[i])
        if pos != 0 and prev_pos == 0:
            if tag == "ORB":
                orb_trades += 1
            else:
                bb_trades += 1
        if prev_pos != 0 and pos == 0:
            last_exit_bar = i
        prev_pos = pos

        in_entry = es <= tod[i] < ee
        in_sq = ss <= tod[i] < se
        range_done = use_orb and not np.isnan(orbH) and not np.isnan(orbL) and not in_range

        # ---------- bar close: decisions for next bar ----------
        if pos != 0:
            if tag == "ORB":
                flip = orb.use_st_exit and ((pos > 0 and st_dir[i] > 0) or (pos < 0 and st_dir[i] < 0))
                if flip or in_sq:
                    queued = ("close", "eod" if in_sq else "st_flip", day[i])
            else:
                if mode == "bb":
                    force_eod = bb.eod_squareoff and in_sq
                else:
                    force_eod = hyb.bb_force_eod and in_sq
                use_mid = bb.exit_mode in ("Middle band", "Either")
                use_r50 = bb.exit_mode in ("RSI 50", "Either")
                if pos > 0:
                    tgt = (use_mid and c[i] >= basis[i]) or (use_r50 and rsi_v[i] >= 50)
                else:
                    tgt = (use_mid and c[i] <= basis[i]) or (use_r50 and rsi_v[i] <= 50)
                if tgt or force_eod:
                    queued = ("close", "target" if tgt else "eod", day[i])
            continue

        # flat -> look for entries
        bb_entry = None
        if use_bb and i > 0 and not np.isnan(lower[i - 1]) and not np.isnan(rsi_v[i - 1]):
            adx_ok = (not bb.use_adx) or (not np.isnan(adx_v[i]) and adx_v[i] < bb.adx_max)
            cool_ok = last_exit_bar is None or (i - last_exit_bar > bb.cooldown)
            long_setup = c[i - 1] < lower[i - 1] and rsi_v[i - 1] < bb.rsi_os and c[i] > lower[i]
            short_setup = c[i - 1] > upper[i - 1] and rsi_v[i - 1] > bb.rsi_ob and c[i] < upper[i]
            allowed = adx_ok and cool_ok
            if mode == "bb" and bb.entry_window:
                allowed = allowed and bbs <= tod[i] < bbe
            if mode == "hybrid":
                allowed = allowed and bws <= tod[i] < bwe and not in_sq
                allowed = allowed and bb_trades < hyb.bb_max_per_day
                if hyb.bb_only_before_orb_trade:
                    allowed = allowed and orb_trades == 0
                if hyb.bb_inside_or_only:
                    allowed = allowed and range_done and orbL <= c[i] <= orbH
            if allowed and np.isfinite(atr_v[i]):
                stop_ticks = round(atr_v[i] * bb.atr_mult / tick)
                if bb.enable_long and long_setup:
                    bb_entry = ("enter", 1, "BB", stop_ticks)
                elif bb.enable_short and short_setup:
                    bb_entry = ("enter", -1, "BB", stop_ticks)
        if bb_entry:
            queued = bb_entry
            continue

        if use_orb:
            can_place = in_entry and range_done and orb_trades < orb.max_trades and not in_sq
            long_ok = can_place and (not orb.use_st_filter or st_dir[i] < 0)
            short_ok = can_place and (not orb.use_st_filter or st_dir[i] > 0)
            if orb.stop_mode == "Fixed points":
                l_stop, s_stop = orbH - orb.sl_points, orbL + orb.sl_points
            else:
                l_stop, s_stop = orbL, orbH
            if long_ok:
                pend_long = (orbH, l_stop)
            if short_ok:
                pend_short = (orbL, s_stop)

    # open position at end of data is left unclosed and excluded (reported separately)
    open_at_end = tr is not None
    return trades, open_at_end


# ------------------------------------------------------------------ metrics
def to_frame(trades, costs, qty):
    cols = ["tag", "side", "entry_time", "entry_px", "exit_time", "exit_px", "reason", "overnight", "bars", "gross_pts"]
    t = pd.DataFrame([{k: getattr(x, k) for k in cols} for x in trades], columns=cols)
    if t.empty:
        t["comm"] = t["net"] = t["gross"] = []
        return t
    if costs.commission_type == "percent":
        comm = (t.entry_px + t.exit_px) * qty * costs.commission_value / 100.0
    else:
        comm = pd.Series(2 * costs.commission_value, index=t.index)
    t["gross"] = t.gross_pts * qty
    t["comm"] = comm
    t["net"] = t.gross - t.comm
    return t


def summarize(t, label=""):
    if t.empty:
        return {"label": label, "trades": 0}
    w, ls = t[t.net > 0].net, t[t.net <= 0].net
    eq = t.net.cumsum()
    dd = (eq - eq.cummax()).min()
    daily = t.groupby(t.exit_time.dt.normalize()).net.sum()
    sharpe = np.nan
    if len(daily) > 5 and daily.std() > 0:
        sharpe = daily.mean() / daily.std() * np.sqrt(252)
    streak = best = 0
    for v in t.net:
        streak = streak + 1 if v <= 0 else 0
        best = max(best, streak)
    gp, gl = w.sum(), -ls.sum()
    return {
        "label": label, "trades": len(t), "win_%": 100 * len(w) / len(t),
        "net": t.net.sum(), "gross": t.gross.sum(), "costs": t.comm.sum(),
        "pf": gp / gl if gl > 0 else np.inf, "expectancy/trade": t.net.mean(),
        "avg_win": w.mean() if len(w) else 0.0, "avg_loss": ls.mean() if len(ls) else 0.0,
        "max_dd": dd, "max_losing_streak": best, "sharpe_daily_ann": sharpe,
        "overnight_holds": int(t.overnight.sum()),
        "pts_per_trade_gross": t.gross_pts.mean(),
    }
