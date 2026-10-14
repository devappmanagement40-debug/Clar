---
name: Plesk GitHub deployment
description: Production deployment uses a committed dist build and a Node.js startup file relative to the application root.
---

For this project, Plesk must pull the versioned `dist` directory from GitHub; the production server starts `dist/index.cjs` and serves static files from `dist/public`.

**Why:** Plesk does not automatically see the Replit workspace build, and a missing or incorrect document root causes either “startup file not found” or a 403 response.

**How to apply:** Keep `dist` tracked for Plesk pulls, use `/dist/public` as the document root relative to the application root, use `dist/index.cjs` as the startup file, and provide `SUPABASE_NEW_DATABASE_URL` plus `SESSION_SECRET` as server environment variables.

Plesk can serve the current static `index.html` while its Node.js process is failing; a working `/` is not proof that login or API routes work. The downloadable `plesk-deploy-bundle.zip` is separate from GitHub's tracked `dist` and can become stale.

**Why:** The live homepage matched the current `dist/public/index.html` exactly while `/login` and `/api/health` returned Plesk 500 errors. The supplied Plesk screenshots showed only access-log status lines, not the Node runtime exception.

**How to apply:** Verify `/` and a real API route independently. Treat Plesk access-log 500 lines as evidence of the failing URL, not its root cause; inspect Node stdout/stderr and app-root/startup settings before attributing a code defect. Confirm whether Plesk deploys from GitHub or from the ZIP before changing either artifact.

The August ZIP uses `SUPABASE_DATABASE_URL`, while the current Plesk Node environment uses `SUPABASE_NEW_DATABASE_URL`; the current source and September build use the latter.

**Why:** The legacy archive can fail at startup against the current Plesk environment, even when the newly named database variable is configured and reachable.

**How to apply:** Do not deploy the August archive as a substitute for the current build unless its legacy database variable is deliberately mapped to the intended production database and the older schema/application compatibility is confirmed.

Replit's workspace Git Provider authentication is separate from its connected GitHub integration. A working GitHub connector does not prove that native `git push` credentials are valid; authentication failures should be repaired through Replit account Settings → Git Providers, not Connected Services.

**Why:** GitHub API access through the connector succeeded while the workspace's configured Git remote rejected its native push credentials.

**How to apply:** When `git push --dry-run` fails authentication against the configured upstream, reconnect the Git Provider before changing application code or asking the user to paste a token.

Keep the HTTP listener available before database bootstrap finishes, expose readiness separately, and hold API requests until initialization succeeds. Plesk may serve static files while returning its generic 500 page for dynamic routes if Node has not bound its port yet.

**Why:** Startup waited for Supabase-backed seeding before listening; the live static page loaded while `/login` and `/api` failed at the Plesk proxy.

**How to apply:** When changing startup or deployment bundles, verify the server binds before bootstrap, `/api/health` reports readiness, and API routes work after initialization. Never treat a static homepage response as proof Node is healthy.