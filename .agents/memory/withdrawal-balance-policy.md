---
name: Withdrawal balance policy
description: Business rule for separating the total wallet balance from the amount eligible for withdrawal.
---

Keep two balances distinct. The deposit balance receives deposited principal and the signup bonus (500 XOF by default); it is never withdrawable and is reserved for purchases. The earnings balance receives daily product earnings and other non-deposit credits except the signup bonus; it remains the only withdrawable balance. A user must also own at least one active user product (`user_products.is_active = true` and `days_remaining > 0`) to initiate a withdrawal or withdrawal-fee prepayment. This checks the user's active holding, not whether the product is still available for new sales in the catalog. Product and staking purchases consume deposit funds first, then earnings if needed.

**Why:** The user now requires at least one active product before any withdrawal; deposited principal and signup bonuses remain purchase-only.

**How to apply:** Put signup bonuses in deposit balance and record their transaction impact as a deposit credit. Credit daily product earnings and other earnings to the earnings balance. Keep the active-product requirement consistent across withdrawal UI, availability responses, prepayment preparation, and server withdrawal validation. Continue calculating withdrawable amounts from earnings only; keep purchase spending deposit-first and never include deposits or signup bonuses in a withdrawable total.

Do not reclassify pooled historical balances when adding persistent wallet fields. Keep the original combined total intact and derive the apparent split from the approved-deposit and purchase/staking ledgers until a separate reconciliation is approved.

**Why:** The persistent-wallet decision was made without approval to move historical funds; preserving the total avoids silently changing account value or withdrawability.

**How to apply:** For legacy accounts, calculate deposit principal remaining and treat the rest of the existing total as earnings. Do not backfill wallet columns from estimated historical splits.