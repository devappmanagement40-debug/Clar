---
name: Site-wide processing indicator
description: User-visible action processing states should be shared across app routes.
---

A processing overlay intended for app actions is global, not tied to the page where an example action was first noticed. Its compact center card should be black with a white spinner and white text, over a dimmed backdrop.

**Why:** On 2026-10-14, the user requested the loading style across all site pages and asked that the former round spinners no longer appear; page-level query loaders also needed to use the shared card.

**How to apply:** Use the shared black card for route/auth loading, foreground queries, and user-triggered actions. Track manual refreshes too; keep passive status polling local so it does not block the screen.
