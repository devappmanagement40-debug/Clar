---
name: Page visual styling
description: Homepage and shared page styling after the CATL rebrand.
---

The user requested a compact homepage based on their mobile reference, with white card surfaces, black borders, and a fixed horizontal bottom navigation. Preserve live account fields and quick actions. CATL blue now replaces the former crimson accent throughout the app.

**Why:** The user asked for white backgrounds and clear card borders, then later chose CATL blue as the new brand direction.

**How to apply:** Keep homepage card surfaces white with clear black borders and deliberate offset shadows. Use CATL blue accents across pages and the supplied CATL image behind page content. Preserve live values and routes.

Use the user's supplied image icons for homepage quick actions, the announcement bell, and pointage. Reuse matching assets in the account shortcuts and service rows only when their meaning fits the action.

**Why:** The user asked for image icons on the homepage, then requested their reuse in the account shortcuts and matching icons in the account services list.

**How to apply:** Match supplied icons to the relevant labels, preserve actions and layout, use the lock image for password changes and the supplied X image for logout, and keep existing semantic icons where no supplied image fits (such as admin access).

On the withdrawal page, use actual image or SVG assets for icons; do not draw icon artwork with CSS pseudo-elements.

**Why:** the user said the CSS-generated icon decorations looked strange and asked for real icons instead.

**How to apply:** Use a relevant supplied image or semantic SVG icon, and keep CSS limited to layout, sizing, and surface styling.

The latest homepage reference shows small bullet separators in the scrolling activity strip; keep that strip display-only and separate from the account ledger.

**Why:** The user provided a newer homepage reference and asked to apply its structure while preserving the current platform fields.

**How to apply:** Preserve the decorative scrolling examples, use simple bullet separators, and do not present them as live transactions or alter account balances.

For the product listing, follow the user's mobile card reference: product thumbnail with a cycle-duration sticker, title with a map-pin marker, total and daily revenue, purchase price, and an "Investir" action. Use CATL blue for brand accents and preserve live product data and purchase behavior; do not copy the unrelated Surface product names or images.

**Why:** The user supplied the reference on 2026-10-16 and asked for the product card to be reproduced icon by icon while retaining the platform color.

**How to apply:** Keep the layout compact and scan-friendly on mobile, use the actual product image and cycle data, and retain the existing purchase flow.

The purchase confirmation should use the CATL blue palette and clearly summarize the selected product, purchase price, daily and total revenue, and deposit-versus-withdrawable-earnings funding. Keep the confirmation responsive and preserve existing balance calculations and server validation.

**Why:** The user asked for the page and purchase confirmation to be stabilized and for the popup to look professional in the platform's new colors.

**How to apply:** Present financial details in a clear hierarchy with distinct cancel and confirm actions, without changing purchase or balance rules.

After a failed purchase request, keep the confirmation open and show the error there so the user can retry or cancel without losing the product and balance details. Clear stale errors when another product is opened.

**Why:** A rejected or interrupted purchase should not force the user to restart the confirmation flow.

**How to apply:** Keep server validation authoritative and only send another purchase request after the user explicitly retries.

The withdrawal page should use light white surfaces with CATL-blue accents and clearly defined cards; do not use black or dark page/card fills.

**Why:** the user rejected the dark withdrawal appearance, then asked its cards and background treatment to match the homepage and deposit page.

**How to apply:** Reuse the homepage's CATL background image and subtle overlay with a transparent shell. Keep cards bright white with strong dark outlines and offset shadows; dark outlines are acceptable, but dark fills are not.