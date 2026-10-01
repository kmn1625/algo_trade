"""Compare ORB-revised, BB+RSI and a hybrid on YOUR data.

    python -m backtest.run_backtest --data nifty_15m.csv --qty 75 --commission 20 --slippage-ticks 10
    python -m backtest.run_backtest --synthetic            # pipeline smoke test only, numbers are meaningless

CSV: one row per bar, bar OPEN time (IST), columns: datetime (or date+time), open, high, low, close.
Use the SAME timeframe you run on TradingView (the ORB script's end-of-day exit depends on it).
"""
import argparse
import sys
import numpy as np
import pandas as pd

from .engine import OrbParams, BbParams, HybridParams, Costs, simulate, to_frame, summarize
from .synth import make_synthetic


def load_csv(path, resample=None):
    df = pd.read_csv(path)
    df.columns = [x.strip().lower() for x in df.columns]
    if "datetime" in df.columns:
        ts = pd.to_datetime(df["datetime"])
    elif "date" in df.columns and "time" in df.columns:
        ts = pd.to_datetime(df["date"].astype(str) + " " + df["time"].astype(str))
    elif "timestamp" in df.columns:
        ts = pd.to_datetime(df["timestamp"])
    else:
        raise SystemExit("need a 'datetime' (or date+time / timestamp) column")
    if getattr(ts.dt, "tz", None) is not None:
        ts = ts.dt.tz_convert("Asia/Kolkata").dt.tz_localize(None)
    df = df.set_index(pd.DatetimeIndex(ts, name="time")).sort_index()
    df = df[["open", "high", "low", "close"]].astype(float)
    df = df[~df.index.duplicated()]
    if resample:
        df = df.resample(resample, origin="start_day", offset="9h15min").agg(
            {"open": "first", "high": "max", "low": "min", "close": "last"}).dropna()
    tod = df.index.hour * 60 + df.index.minute
    return df[(tod >= 9 * 60 + 15) & (tod < 15 * 60 + 30)]


def variants(args):
    orb = OrbParams()
    return {
        "ORB as written": ("orb", dict(orb=orb)),
        "ORB, no Supertrend (ablation)": ("orb", dict(orb=OrbParams(use_st_filter=False, use_st_exit=False))),
        "BB+RSI as written (any time, holds overnight)": ("bb", dict(bb=BbParams())),
        "BB+RSI intraday (10:00-14:30, EOD flat)": ("bb", dict(bb=BbParams(eod_squareoff=True, entry_window="1000-1430"))),
        "Hybrid (ORB + BB fade before ORB triggers)": ("hybrid", dict(orb=orb, bb=BbParams(), hyb=HybridParams())),
    }


def fmt(d):
    keys = ["trades", "win_%", "net", "gross", "costs", "pf", "expectancy/trade", "avg_win", "avg_loss",
            "max_dd", "max_losing_streak", "sharpe_daily_ann", "overnight_holds"]
    return {k: (round(d.get(k, np.nan), 2) if isinstance(d.get(k, np.nan), (float, np.floating)) else d.get(k)) for k in keys}


def main(argv=None):
    ap = argparse.ArgumentParser()
    ap.add_argument("--data")
    ap.add_argument("--synthetic", action="store_true")
    ap.add_argument("--resample", help="e.g. 15min (from 1-minute data)")
    ap.add_argument("--qty", type=float, default=1.0, help="units per trade (Pine ORB script uses 1; set your lot size)")
    ap.add_argument("--commission", type=float, default=20.0, help="INR per order (each entry and each exit)")
    ap.add_argument("--commission-pct", type=float, help="use percent-of-value per side instead of cash per order")
    ap.add_argument("--slippage-ticks", type=float, default=10.0)
    ap.add_argument("--mintick", type=float, default=0.05)
    ap.add_argument("--oos-fraction", type=float, default=0.4, help="last fraction of days held out as out-of-sample")
    ap.add_argument("--out", default="backtest_results")
    a = ap.parse_args(argv)

    if a.synthetic:
        df = make_synthetic(days=500, bar_minutes=15)
        print("=" * 78 + "\nSYNTHETIC DATA - pipeline smoke test. These numbers say NOTHING about real strategy performance.\n" + "=" * 78)
    elif a.data:
        df = load_csv(a.data, a.resample)
    else:
        raise SystemExit("give --data FILE.csv (or --synthetic)")

    bar_min = int(round(df.index.to_series().diff().dt.total_seconds().div(60).mode().iloc[0]))
    days = df.index.normalize().unique()
    print(f"bars={len(df)} days={len(days)} timeframe~{bar_min}m  {df.index[0]} -> {df.index[-1]}")
    if a.qty == 1.0 and not a.synthetic:
        print("NOTE: qty=1 and cash commission means costs are huge relative to points; set --qty to your real lot size.")

    if a.commission_pct is not None:
        costs = Costs("percent", a.commission_pct, a.slippage_ticks, a.mintick)
    else:
        costs = Costs("cash_per_order", a.commission, a.slippage_ticks, a.mintick)
    zero = Costs(costs.commission_type, 0.0, 0.0, a.mintick)

    split = days[int(len(days) * (1 - a.oos_fraction))]
    rows, daily = [], {}
    import os
    os.makedirs(a.out, exist_ok=True)
    for name, (mode, kw) in variants(a).items():
        trades, open_end = simulate(df, mode, costs=costs, qty=a.qty, **kw)
        t = to_frame(trades, costs, a.qty)
        t0 = to_frame(simulate(df, mode, costs=zero, qty=a.qty, **kw)[0], zero, a.qty)
        slug = "".join(ch if ch.isalnum() else "_" for ch in name.lower())[:40].strip("_")
        t.to_csv(f"{a.out}/trades_{slug}.csv", index=False)
        ins, oos = t[t.exit_time < split], t[t.exit_time >= split]
        rows.append(summarize(t, name + " | ALL"))
        rows.append(summarize(ins, name + " | in-sample"))
        rows.append(summarize(oos, name + " | OUT-of-sample"))
        rows.append(summarize(t0, name + " | ALL, zero cost/slippage"))
        if not t.empty:
            daily[name] = t.groupby(t.exit_time.dt.normalize()).net.sum()
        if not t.empty:
            print(f"\n--- {name}: exit reasons / side ---")
            print(t.groupby(["tag", "side", "reason"]).net.agg(["count", "sum", "mean"]).round(1).to_string())
        if open_end:
            print("(a position was still open at end of data and is excluded)")

    res = pd.DataFrame([fmt(r) | {"label": r["label"]} for r in rows]).set_index("label")
    pd.set_option("display.width", 250, "display.max_columns", 30, "display.max_colwidth", 70)
    print("\n" + res.to_string())
    res.to_csv(f"{a.out}/summary.csv")

    d = pd.DataFrame(daily).fillna(0.0)
    keys = [k for k in d.columns if k.startswith("ORB as written") or k.startswith("BB+RSI intraday")]
    if len(keys) == 2:
        print(f"\nDaily-P&L correlation, ORB vs BB+RSI intraday: {d[keys[0]].corr(d[keys[1]]):.2f} "
              "(low/negative = they diversify each other, which is the case FOR a hybrid)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
