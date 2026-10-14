---
name: Site-wide processing indicator
description: User-visible action processing states should be shared across app routes.
---

A processing overlay intended for app actions is global, not tied to the page where an example action was first noticed. Its compact center card should be black with a white spinner and white text, over a dimmed backdrop.

**Why:** On 2026-10-14, the user corrected a deposit-only implementation, requested the loading style across all site pages, clarified the black-card appearance, and showed that the app's white screen-loading spinner also needed replacing.

**How to apply:** Use the shared black card for user-triggered actions and app-level route/auth loading. Keep passive payment-status polling local so it does not block the screen.
