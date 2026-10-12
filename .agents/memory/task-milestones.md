---
name: Task milestone management
description: Product rules for configurable Centre des tâches milestones and rewards.
---

Task milestones are database-managed content, not a fixed set in the user interface. Administrators must be able to add, edit every field, reorder, activate/deactivate, and delete unused milestones.

**Why:** the user asked to manage the milestone count and all values from the admin panel rather than hard-code them.

**How to apply:** Seed defaults only once so admin changes and deletions survive restarts. Preserve already-claimed reward history; deactivate claimed milestones instead of deleting them.
