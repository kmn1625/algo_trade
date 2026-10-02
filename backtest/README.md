# Strategy backtest harness (ORB-revised vs BB+RSI vs hybrid)

## Status: engine built and mechanically tested. NO real-market results yet.
The cloud environment this was built in could not reach any market-data host (Yahoo, NSE, Stooq,
Binance, Alpha Vantage were all refused by the network policy), and this repo is a React marketing site
with no backtest engine or data in it. Nothing here has been run on real Nifty data.
The synthetic-data run only proves the code works; its P&L means nothing.

## Run it
```bash
pip install pandas numpy pytest
python -m pytest backtest -q                       # 15 mechanics tests
python -m backtest.run_backtest --data nifty_15m.csv --qty <lot size> --commission 20 --slippage-ticks 10
# 1-minute file -> resample:  --resample 15min
```
CSV columns: `datetime` (or `date`+`time`), `open`, `high`, `low`, `close`. Timestamp = bar OPEN time, IST.
Use the same timeframe you use on TradingView. Verify the current Nifty lot size, brokerage and STT with
your broker/NSE; the defaults here are placeholders copied from the Pine files.

Report contains, per variant: all / in-sample / out-of-sample (last 40% of days held out) /
zero-cost run, exit-reason breakdown, and the daily-P&L correlation between ORB and BB+RSI.

## Execution model (approximation of TradingView, not identical)
Signals at bar close -> orders fill from next bar; stop orders fill at level or at the open on a gap;
intrabar path O-H-L-C if high is nearer the open else O-L-H-C; slippage always adverse; trailing stop =
activates after `trail_activate` points of profit, then trails the extreme by `trail_offset`.
**Before trusting any number, compare ~20 trades against the TradingView Strategy Tester list for the same
bars.** Indicators (Supertrend, RSI, ADX, BB, ATR) are re-implemented from the Pine definitions and not
diffed against TradingView.

## Review of the two Pine scripts (read-only; neither was compiled by me — no Pine compiler here)

### Nifty ORB - revised
1. **End-of-day exit depends on timeframe.** `strategy.close` fires on the first bar inside 15:10-15:30.
   On 15m bars that is the 15:15 bar, so the order fills at the NEXT session's open (overnight, gap risk).
   On 5m bars it works (fills 15:15). In the synthetic run ~15% of trades became overnight holds on 15m.
   Fix: add `process_orders_on_close = true`, or move square-off to 15:00-15:15 on 15m.
2. **`maxTrades` can be exceeded.** `tradesToday` increments only when `position_size` is non-zero at a
   bar close. If entry and stop-out happen inside one bar, it never increments and a second entry is allowed.
3. **Costs are out of proportion at qty=1.** Commission 20 INR/order x2 = 40 INR vs a 50-point stop that is
   50 INR at qty 1. Net results on that setting are dominated by the placeholder commission. Set the real
   lot size and costs. Slippage 10 ticks is only 0.5 index points.
4. Supertrend lags: with a 50-point hard stop and 30-point trail, the Supertrend exit rarely does the work;
   the ablation row in the report shows whether the filter helps at all.
5. Range 09:30-10:00 skips the 09:15-09:30 open on purpose; fine, but it is a design choice to test.

### BB + RSI mean reversion
1. **No end-of-day exit, no session window.** Trades can be entered at 15:15 and held overnight. For
   intraday/MIS execution it needs a square-off; the "intraday" variant in the report adds one.
2. **Very selective setup.** Close outside the band with RSI < 24 / > 76, then back inside, AND ADX < 25.
   Extreme closes tend to occur in fast moves, which often have high ADX, so the filters may fight each
   other. I cannot say how often it fires on Nifty without real data (it fired once in 500 synthetic days).
3. **`percent_of_equity` 10% gives fractional quantity** (about 0.4 index units at 100k capital). Not
   executable on futures/options; use a fixed lot count for comparable results.
4. **No `alert_message`** on entries/exits, so it cannot drive webhook automation as-is (the ORB script has them).
5. Stop is ATR-based (1.5 x ATR) while the target is the middle band; the reward/risk is whatever the
   band distance happens to be. Check the avg win vs avg loss in the report.

## Hybrid idea (a hypothesis to test, not a conclusion)
They are different regimes: ORB is a breakout/trend-day strategy, BB+RSI is a range/fade strategy.
The `hybrid` mode shares one position slot: fade BB extremes only until ORB has triggered that day,
max 2 fades/day, 10:00-14:30, forced flat by 15:10; ORB logic unchanged. Worth building in Pine only if
(a) both are positive out-of-sample after real costs and (b) the daily-P&L correlation is low.
