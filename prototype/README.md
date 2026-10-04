# ZEARO Website Workspace — Phase 1 MVP

This isolated MVP uses the public ZEARO site as the first reference tenant while keeping the current root landing page unchanged.

## Delivered in Phase 1
- Reusable template registry: Corporate / Store / B2B RFQ.
- Generic block renderer.
- Desktop and mobile preview modes.
- Preview-only ZEE instruction adapter.
- Local revision save / restore proof.
- Explicit Website Workspace action contract.
- No production publish, DNS writes, payments, or customer/live data writes.

## Architecture boundary
Website Workspace owns website state and revisions.
ZEE interprets user intent and proposes/executes authorized preview actions.
Canonical ZEARO modules remain the systems of record for catalog, inventory, Party/CRM, pricing, orders, Treasury, Accounting, Sales Invoice, and tax workflows.

## Technical test
Open /prototype/ after deployment.
Switch templates.
Apply a ZEE preview instruction such as:
- switch to store
- switch to b2b
- make it more sales focused
Save a revision, change the template, then restore the previous revision.

This is a bounded technical MVP, not the final tenant website runtime.