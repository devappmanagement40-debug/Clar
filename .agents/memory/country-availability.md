---
name: Country availability
description: Country availability and admin-managed deposit and withdrawal methods
---

When a country should disappear from signup or the public country selector, deactivate its catalog entry rather than deleting it outright.

**Why:** Country codes can remain attached to accounts and historical activity. Deletion destroys catalog context, while deactivation is reversible. Before hiding a country from login selection, check whether existing non-admin accounts use it; otherwise those users may no longer be able to select the country required for login.

**How to apply:** Check account counts and the login path before a country change. Preserve inactive entries for history, and ensure new registration accepts only active countries.

Public pickers may use the seeded country list only when `/api/countries` fails; a successful empty response must stay empty. Server-side active-country validation remains authoritative, so a display fallback does not make registration or payments available during an API outage.

**Why:** A Plesk API 500 hid every country option even though the client bundle and seeded country data were valid.

**How to apply:** Use the fallback only for failed requests, label it as temporary, and keep inactive-country enforcement on the server.

The user's current active country list is exactly Togo (TG), Côte d'Ivoire (CI), Burkina Faso (BF), Niger (NE), and Bénin (BJ). Keep other catalog rows inactive rather than deleting them. Bénin uses XOF and phone prefix 229; its payment methods remain unconfigured until the user chooses them.

**Why:** the user requested this exact country list on 2026-10-16 and existing country codes may still be needed for historical records.

**How to apply:** Keep each country's deposit operators and withdrawal methods editable in the admin panel, including per-method activation. Do not restore country-specific runtime overrides. When the active country set changes, update the app's first-install defaults and temporary API-failure fallbacks, and use a one-time reversible transition for existing rows.