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

The withdrawal page must keep the country from the user's profile; do not let the withdrawal form select a separate country. Deposit and withdrawal-account setup can use the active-country selector.

**Why:** the user chose to keep the profile country for withdrawals.

**How to apply:** Keep withdrawal currency and payout methods tied to the profile country, while limiting deposit and wallet-account country choices to active countries.

Bénin deposits use MTN and Moov. Keep these as deposit operators only; do not infer withdrawal methods or account coordinates from this choice. The manual transfer flow remains usable without a shortcut USSD code until an exact merchant command is confirmed.

**Why:** the user requested these two Bénin deposit methods and supplied the MTN logo.

**How to apply:** Require administrator-configured receiver numbers and names before allowing a manual deposit; show the receiver details and required transaction ID without a USSD shortcut until the exact merchant identifier and command format are confirmed.

For automatic Clapay deposits, Burkina Faso should expose only the live Moov and Orange operators; Niger should expose every active operator returned by Clapay.

**Why:** the user chose these country-specific operator scopes.

**How to apply:** Keep the shared automatic checkout and live Clapay operator discovery; preserve explicit country routing and avoid hardcoding Niger's operator list.