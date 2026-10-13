---
name: Deposit checkout routing
description: Client deposit checkout must not expose aggregator selection.
---

Do not ask clients to choose the payment aggregator on the deposit screen. After amount and country are set, use the RobotPay flow for operator/payment steps where supported; keep provider identifiers and names in the backend and administration.

**Why:** The user objected to exposing provider selection in the customer deposit flow. Guessing between multiple active methods could send a payment through the wrong provider.

**How to apply:** Automatically use the method when exactly one is configured for a country and navigate to RobotPay for supported providers. If multiple are active, do not choose one silently; require an explicit admin-side priority or resolve the configuration before allowing the deposit. Keep provider-specific external checkout redirects only where RobotPay does not support that provider.

For recipient-number payments, create the deposit as pending only after the client submits the payer number and transaction reference. The five-minute countdown is a tracking window; reaching zero must not approve, reject, credit, or expire the pending deposit.

**Why:** The user chose admin review for manual deposits and asked for the countdown screen shown in the reference; a timer must not imply provider confirmation or cancel a real pending request.

**How to apply:** Keep the status pending until an authorized review changes it. After the countdown, clearly say the request remains pending and allow the client to keep checking its status.