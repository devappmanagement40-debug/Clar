---
name: Source asset recovery
description: Recover missing source images used by the client when the committed build still contains them.
---

For this app, some client imports from `attached_assets` may be missing even though the exact image survives in the tracked `dist/public/assets` build under its original basename plus a content hash. When the match is unambiguous, restore the image bytes to the original source path instead of substituting a different visual.

**Why:** A fresh Vite build fails on missing source imports even when the previous committed build still contains their optimized images.

**How to apply:** Confirm the source basename and extension match exactly one file in `dist/public/assets`, then restore it before building. Do not use `dist` as a source import path because the build clears and regenerates that directory.
