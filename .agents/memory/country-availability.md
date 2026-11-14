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

Only Congo-Kinshasa (CD) is active in public country selectors, and all customer-facing and admin financial amounts display in CDF. It uses phone prefix 243; configure manual deposit methods and recipient details through the admin panel, reusing the existing manual-deposit page unchanged. Keep other country rows inactive rather than deleting them, preserve their history, and preserve administrator login.

**Why:** the user explicitly changed the active-country scope to RDC only, corrected the currency scope to CDF throughout the app, and asked to preserve the existing manual-deposit experience while adding methods through admin settings.

**How to apply:** Keep RDC deposit operators and withdrawal methods editable in the admin panel, including per-method activation. Do not restore other active countries or show XOF/FCFA labels. When country configuration changes, update first-install defaults, API-failure fallbacks, and external-database active flags without overwriting RDC's configured methods or deleting historical rows.

RDC customer phone numbers are entered as exactly nine local digits, such as `990665835`; show `+243` separately where the interface includes a country prefix.

**Why:** The user specified the required nine-digit format for DRC phone numbers.

**How to apply:** Enforce the local nine-digit format in registration, login, deposit, and withdrawal-wallet forms and server validation. Preserve legacy account access by normalizing old leading-zero numbers during input prefills and login lookup; do not rewrite stored phone records without approval.

The withdrawal page must keep the country from the user's profile; do not let the withdrawal form select a separate country. Deposit and withdrawal-account setup can use the active-country selector.

**Why:** the user chose to keep the profile country for withdrawals.

**How to apply:** Keep withdrawal currency and payout methods tied to the profile country, while limiting deposit and wallet-account country choices to active countries.

Bénin deposits use MTN and Moov, and the user has explicitly chosen both as withdrawal methods too. The manual transfer flow remains usable without a shortcut USSD code until an exact merchant command is confirmed. Niger withdrawals also include NITA TRANSFERT, alongside existing methods.

**Why:** the user explicitly requested MTN and Moov for Bénin withdrawals and Nita for Niger withdrawals; deposit and withdrawal settings remain separate even when labels overlap.

**How to apply:** Keep Bénin's MTN and Moov deposit operators separate from its withdrawal-method list and receiver coordinates. Require administrator-configured receiver numbers and names before allowing a manual deposit; show the receiver details and required transaction ID without a USSD shortcut until the exact merchant identifier and command format are confirmed.

For automatic Clapay deposits, Burkina Faso should expose only the live Moov and Orange operators; Niger should expose every active operator returned by Clapay. Bénin remains manual MTN/Moov only unless the user explicitly requests an automatic route.

**Why:** on 2026-10-17, the user clarified that the automatic page request covered Burkina Faso and Niger, not Bénin.

**How to apply:** Apply the shared automatic checkout and live Clapay operator discovery to BF/NE only; preserve explicit country routing and the manual Bénin path. Do not hardcode provider operators or replace existing deposit methods.

For Togo manual TMoney/Togocel deposits, generate the USSD merchant identifier from the active number configured for that operator in the admin payment-number panel; do not hardcode it. Strip the Togo country prefix if the saved number includes it.

**Why:** the user expects changing the admin-configured TMoney number to update the USSD instructions shown on manual deposit pages.

**How to apply:** Use the selected active payment number as the source for the TMoney USSD code. Keep the shortcut limited to Togocel/TMoney in Togo and hide it for payment links.