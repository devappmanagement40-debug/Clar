---
name: Imported database setup
description: Fresh imported projects may have only Replit's session table before the checked-in application schema is applied.
---

When setting up an imported app that uses Drizzle and connect-pg-simple, preserve the existing `session` table and treat application tables as new, even if Drizzle presents an ambiguous rename prompt. On Supabase, use a `tablesFilter` allowlist that excludes `session`; `drizzle-kit push --verbose` still applies changes, and push may disable RLS on an existing table.

**Why:** Drizzle can misidentify a pre-existing session table as a rename candidate. In this workspace, a verbose push applied DDL and disabled RLS on the existing `countries` table.

**How to apply:** Inspect `information_schema` and current RLS policies first. Filter schema changes to the application's explicit table allowlist, preserve `session`, and verify/restore RLS after a push. Treat `verbose` as SQL logging, not as a dry run; avoid broad force pushes that could rename or drop session data.