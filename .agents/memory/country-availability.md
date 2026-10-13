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

Keep each country's deposit operators and withdrawal methods editable in the admin panel, including per-method activation. Do not restore country-specific runtime overrides. The Tchad catalog starts with Airtel Money and Moov for both lists.

**Why:** the user asked for country-wide admin control over adding, editing, and disabling payment methods.

**How to apply:** Treat the country catalog as the runtime source of truth for every country, including Tchad.