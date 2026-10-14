---
name: Site-wide processing indicator
description: User-visible action processing states should be shared across app routes.
---

A processing overlay intended for app actions is global, not tied to the page where an example action was first noticed. Its compact center card should be black with a white spinner and white text, over a dimmed backdrop.

**Why:** On 2026-10-14, the user corrected a deposit-only implementation, requested the loading style across all site pages, and clarified that the card should match the supplied black-card reference.

**How to apply:** Use app-level pending state for user-triggered asynchronous actions. Keep the card compact and black with white loading elements; avoid tying shared processing feedback to one page, and keep passive status polling from blocking screens.
