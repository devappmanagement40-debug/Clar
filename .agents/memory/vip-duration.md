---
name: VIP duration
description: Business rule for the duration and total return of VIP products.
---

Product cycle lengths, prices, and earnings are managed in the admin panel. A specifically approved initial catalog may be inserted once when its named offers are missing, using a durable marker so later starts do not recreate deleted offers or overwrite admin edits. The total return remains derived from daily earnings multiplied by the configured cycle length.

**Why:** The user requested editable product values; one-time create-only insertion lets the initial catalog appear without turning admin-managed values into recurring defaults.

**How to apply:** Use startup only for explicitly approved missing offers, mark the bootstrap as applied, and treat all existing database values saved by admins as authoritative.