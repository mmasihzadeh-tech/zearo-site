# ZEARO Website Workspace — Technical PoC

This isolated prototype uses the ZEARO public site as the first reference tenant without changing the live root landing page.

## Purpose
- Prove a reusable Template + Block rendering model.
- Keep website persistent state separate from ZEE.
- Let ZEE eventually compose/revise blocks through an authorized action layer.
- Prepare future Corporate / Store / B2B templates without duplicating operational business data.

## Boundaries
- No customer/live data.
- No inventory/accounting/payment logic is implemented here.
- No production publish automation.
- Business data must later arrive through canonical ZEARO module contracts.
- Publish/DNS/payment/state changes remain behind Permission + Validation + Confirmation.

## Current proof
site-config.js is the website state/config input.
site-engine.js is a generic block renderer.
index.html is only the shell.

This is intentionally a technical proving ground, not the final Website Workspace runtime.
