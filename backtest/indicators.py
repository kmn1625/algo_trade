"""Pine-style indicators (RMA seeding, population stdev) written from the Pine v5/v6 definitions.

These are re-implementations, NOT TradingView's code. Warm-up bars can differ slightly
from TradingView; values converge after a few hundred bars.
"""
import numpy as np


def rma(x, n):
    """Wilder's moving average, seeded with the SMA of the first n valid values (as Pine's ta.rma)."""
    x = np.asarray(x, dtype=float)
    out = np.full(len(x), np.nan)
    valid = np.flatnonzero(~np.isnan(x))
    if len(valid) < n:
        return out
    s = valid[0]
    seed = s + n - 1
    out[seed] = x[s:seed + 1].mean()
    a = 1.0 / n
    for i in range(seed + 1, len(x)):
        out[i] = a * x[i] + (1 - a) * out[i - 1]
    return out


def sma(x, n):
    x = np.asarray(x, dtype=float)
    out = np.full(len(x), np.nan)
    if len(x) < n:
        return out
    c = np.cumsum(np.insert(x, 0, 0.0))
    out[n - 1:] = (c[n:] - c[:-n]) / n
    return out


def stdev_pop(x, n):
    """Population stdev, which is what ta.bb / ta.stdev (biased=true) use."""
    x = np.asarray(x, dtype=float)
    out = np.full(len(x), np.nan)
    for i in range(n - 1, len(x)):
        out[i] = x[i - n + 1:i + 1].std()
    return out


def true_range(h, l, c):
    pc = np.concatenate(([np.nan], c[:-1]))
    tr = np.maximum.reduce([h - l, np.abs(h - pc), np.abs(l - pc)])
    tr[0] = h[0] - l[0]
    return tr


def atr(h, l, c, n):
    return rma(true_range(h, l, c), n)


def rsi(c, n):
    ch = np.concatenate(([np.nan], np.diff(c)))
    up = rma(np.where(ch > 0, ch, 0.0) * np.where(np.isnan(ch), np.nan, 1.0), n)
    dn = rma(np.where(ch < 0, -ch, 0.0) * np.where(np.isnan(ch), np.nan, 1.0), n)
    with np.errstate(divide="ignore", invalid="ignore"):
        out = np.where(dn == 0, 100.0, np.where(up == 0, 0.0, 100.0 - 100.0 / (1.0 + up / dn)))
    out[np.isnan(up) | np.isnan(dn)] = np.nan
    return out


def bbands(c, n, mult):
    basis = sma(c, n)
    dev = mult * stdev_pop(c, n)
    return basis, basis + dev, basis - dev


def adx(h, l, c, di_len, adx_smooth):
    """Pine ta.dmi(diLength, adxSmoothing) -> (+DI, -DI, ADX)."""
    up = np.concatenate(([np.nan], np.diff(h)))
    dn = -np.concatenate(([np.nan], np.diff(l)))
    plus_dm = np.where((up > dn) & (up > 0), up, 0.0)
    minus_dm = np.where((dn > up) & (dn > 0), dn, 0.0)
    plus_dm[0] = minus_dm[0] = np.nan
    tr = rma(true_range(h, l, c), di_len)
    with np.errstate(divide="ignore", invalid="ignore"):
        plus = 100.0 * rma(plus_dm, di_len) / tr
        minus = 100.0 * rma(minus_dm, di_len) / tr
        tot = plus + minus
        tot = np.where(tot == 0, 1.0, tot)
        adx_v = 100.0 * rma(np.abs(plus - minus) / tot, adx_smooth)
    return plus, minus, adx_v


def supertrend(h, l, c, factor, length):
    """Pine ta.supertrend -> (supertrend, direction); direction -1 = uptrend, +1 = downtrend."""
    a = atr(h, l, c, length)
    src = (h + l) / 2.0
    n = len(c)
    ub = src + factor * a
    lb = src - factor * a
    st = np.full(n, np.nan)
    d = np.full(n, np.nan)
    f_ub = np.full(n, np.nan)
    f_lb = np.full(n, np.nan)
    for i in range(n):
        if np.isnan(a[i]):
            continue
        p_lb = f_lb[i - 1] if i > 0 and not np.isnan(f_lb[i - 1]) else 0.0
        p_ub = f_ub[i - 1] if i > 0 and not np.isnan(f_ub[i - 1]) else 0.0
        pc = c[i - 1] if i > 0 else np.nan
        f_lb[i] = lb[i] if (lb[i] > p_lb or pc < p_lb) else p_lb
        f_ub[i] = ub[i] if (ub[i] < p_ub or pc > p_ub) else p_ub
        if i == 0 or np.isnan(a[i - 1]):
            d[i] = 1.0
        elif st[i - 1] == p_ub:
            d[i] = -1.0 if c[i] > f_ub[i] else 1.0
        else:
            d[i] = 1.0 if c[i] < f_lb[i] else -1.0
        st[i] = f_lb[i] if d[i] == -1.0 else f_ub[i]
    return st, d
