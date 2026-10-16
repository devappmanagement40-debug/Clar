---
name: Withdrawal balance policy
description: Business rule for separating the total wallet balance from the amount eligible for withdrawal.
---

Keep two balances distinct. The deposit balance receives deposited principal and the signup bonus (500 XOF by default); it is never withdrawable and is reserved for purchases. The earnings balance receives daily product earnings and other non-deposit credits except the signup bonus; it is the only withdrawable balance, even when the user has not purchased a product. Product and staking purchases consume deposit funds first, then earnings if needed.

**Why:** The user wants referral commissions and other earnings withdrawable without owning a product, to encourage referrals; the 500 XOF signup bonus remains a purchase-only deposit credit.

**How to apply:** Put signup bonuses in deposit balance and record their transaction impact as a deposit credit. Credit daily product earnings and other earnings to the earnings balance. Do not require a deposit or product purchase for a withdrawal; base withdrawal UI, availability checks, and server validation only on earnings. Keep purchase spending deposit-first and never include deposits or signup bonuses in a withdrawable total.

Do not reclassify pooled historical balances when adding persistent wallet fields. Keep the original combined total intact and derive the apparent split from the approved-deposit and purchase/staking ledgers until a separate reconciliation is approved.

**Why:** The persistent-wallet decision was made without approval to move historical funds; preserving the total avoids silently changing account value or withdrawability.

**How to apply:** For legacy accounts, calculate deposit principal remaining and treat the rest of the existing total as earnings. Do not backfill wallet columns from estimated historical splits.