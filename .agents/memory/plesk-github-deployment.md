---
name: Plesk GitHub deployment
description: Production deployment uses a committed dist build and a Node.js startup file relative to the application root.
---

For this project, Plesk's configured application root is `dist`, startup file is `index.cjs`, and document root is `dist/public`; Plesk currently uses pnpm. Include a production runtime `package.json` inside `dist` so package installation runs in the configured root.

**Why:** The Plesk dashboard showed `dist` as the application root while the full project manifest was one level above it; the compiled server also has external runtime dependencies.

**How to apply:** Keep the runtime manifest generated with `dist`, use `/public` as the document root relative to the application root, use `index.cjs` as startup file, and install dependencies in `dist` before restarting. Keep `SUPABASE_NEW_DATABASE_URL` and `SESSION_SECRET` available to that Node process.

Plesk is the production source of truth for this project; Replit is for development only. A healthy Replit preview does not establish that the Plesk deployment is healthy.

**Why:** The user explicitly clarified that production work and verification must target Plesk.

**How to apply:** For deployment checks, verify the public Plesk domain and its app/API routes directly; use Replit only to inspect or validate source and build artifacts.

Plesk's pnpm installation must explicitly approve bcrypt's native build script; allow only bcrypt rather than enabling scripts for every dependency.

**Why:** Plesk reported `ERR_PNPM_IGNORED_BUILDS` for bcrypt after resolving the runtime dependencies.

**How to apply:** Keep bcrypt in the generated `dist/pnpm-workspace.yaml` build approval list. In an existing Plesk checkout, run `pnpm approve-builds`, select bcrypt only, then reinstall and restart the app.

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

After each Plesk deployment, promptly check `/`, `/login`, and `/api/health`. A static homepage returning 200 while Nginx returns its own 404 for the app route and health endpoint means requests are not reaching Express; do not treat that as a confirmed front-end bug.

**Why:** The user asked for quick recovery after deployments, and the live site showed this exact split on 2026-10-17.

**How to apply:** Use read-only requests to verify all three paths. If the response is Plesk/Nginx HTML rather than the app's HTML or JSON, inspect the Plesk Node.js process, startup settings, and proxy/routing before editing application routes. Plesk dashboard access or its process logs are required to confirm an external startup failure.