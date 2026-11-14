---
name: Administrator PIN security
description: Rules for storing, checking, and exposing administrator PINs.
---

Administrator PINs are credentials: store them as bcrypt hashes, omit them from API responses, and never write their values to logs.

**Why:** An administrator PIN grants privileged access and must remain protected even when user records or request data are serialized.

**How to apply:** Use the shared hash and verification helpers for seed setup and admin changes. When a legacy plaintext PIN verifies successfully, replace it with a hash. Keep user-facing PIN updates inside authenticated flows and send bootstrap PINs only through Replit Secrets.
