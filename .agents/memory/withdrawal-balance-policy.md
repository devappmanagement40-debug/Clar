---
name: Withdrawal balance policy
description: Business rule for separating the total wallet balance from the amount eligible for withdrawal.
---

Keep two balances distinct. The deposit balance receives deposited principal and is never withdrawable. The earnings balance receives daily product earnings and the signup bonus; this earnings balance is the only withdrawable balance. Product purchases may consume protected deposit principal according to the existing account policy. Do not assume where other reward types belong without confirmation.

**Why:** The user explicitly clarified that deposits and earnings are separate balances, daily earnings and the signup bonus go to the earnings balance, and only that balance can be withdrawn.

**How to apply:** Credit deposits only to the deposit balance; credit daily earnings and signup bonuses to the earnings balance. Base withdrawal UI, availability checks, and server validation only on the earnings balance. Keep rejections/refunds in the same balance bucket and never include deposited principal in a withdrawable total.