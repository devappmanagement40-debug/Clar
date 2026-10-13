---
name: Withdrawal balance policy
description: Business rule for separating the total wallet balance from the amount eligible for withdrawal.
---

Keep two balances distinct. The deposit balance receives deposited principal and is never withdrawable. The earnings balance receives daily product earnings, the signup bonus, and every other credit that is not a deposit; this earnings balance is the only withdrawable balance. Product and staking purchases consume deposit funds first, then earnings if needed.

**Why:** The user explicitly clarified that deposits and earnings are separate balances, all non-deposit credits go to the earnings balance, and only that balance can be withdrawn.

**How to apply:** Credit deposits only to the deposit balance and every other credit to earnings. Base withdrawal UI, availability checks, and server validation only on earnings. Keep purchase spending deposit-first, return rejected withdrawals to earnings, and never include deposited principal in a withdrawable total.

Do not reclassify pooled historical balances when adding persistent wallet fields. Keep the original combined total intact and derive the apparent split from the approved-deposit and purchase/staking ledgers until a separate reconciliation is approved.

**Why:** The persistent-wallet decision was made without approval to move historical funds; preserving the total avoids silently changing account value or withdrawability.

**How to apply:** For legacy accounts, calculate deposit principal remaining and treat the rest of the existing total as earnings. Do not backfill wallet columns from estimated historical splits.