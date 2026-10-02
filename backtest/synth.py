"""SYNTHETIC intraday data, for testing the engine's mechanics ONLY.

Random-walk bars with a mix of trend / range days. Results on this data say NOTHING about how the
strategies perform on Nifty. Never quote them as performance.
"""
import numpy as np
import pandas as pd


def make_synthetic(days=250, bar_minutes=15, start="2024-01-01", seed=7, start_price=22000.0):
    rng = np.random.default_rng(seed)
    bdays = pd.bdate_range(start, periods=days)
    rows, price = [], start_price
    per_day = (15 * 60 + 30 - (9 * 60 + 15)) // bar_minutes
    for d in bdays:
        trend = rng.choice([0.0, 0.0, 1.0, -1.0], p=[0.35, 0.15, 0.25, 0.25])
        vol = rng.uniform(0.0006, 0.0014) * np.sqrt(bar_minutes / 15)
        gap = rng.normal(0, 0.003)
        price *= 1 + gap
        for k in range(per_day):
            t = d + pd.Timedelta(minutes=9 * 60 + 15 + k * bar_minutes)
            drift = trend * 0.00012 * (bar_minutes / 15)
            if trend == 0:
                drift = -0.15 * (price - rows[-1][4] if rows and k else 0) / price  # mean-revert on range days
            ret = drift + rng.normal(0, vol)
            o = price
            cl = o * (1 + ret)
            hi = max(o, cl) * (1 + abs(rng.normal(0, vol / 2)))
            lo = min(o, cl) * (1 - abs(rng.normal(0, vol / 2)))
            rows.append((t, round(o / .05) * .05, round(hi / .05) * .05, round(lo / .05) * .05, round(cl / .05) * .05))
            price = cl
    df = pd.DataFrame(rows, columns=["time", "open", "high", "low", "close"]).set_index("time")
    return df
