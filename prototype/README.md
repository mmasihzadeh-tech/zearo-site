# ZEARO Web Presence (ZWP) — Website Surface Phase 1 MVP

Canonical product boundary: **ZWP = ZEARO Web Presence / حضور در وب**.

Website is one major surface inside ZWP. This isolated MVP uses the public ZEARO site as the first reference surface while keeping the current root landing page unchanged.

## Delivered in Phase 1
- Reusable template registry: Corporate / Store / B2B RFQ.
- Generic block renderer.
- Desktop and mobile preview modes.
- Preview-only ZEE instruction adapter.
- Local revision save / restore proof.
- Explicit ZWP-owned Website surface action contract.
- No production publish, DNS writes, payments, or customer/live data writes.

## Architecture boundary
ZWP owns Web Presence state. The Website surface owns website-specific state/revisions through approved ZWP contracts.
ZEE interprets user intent and proposes/executes authorized preview actions; it is not the system of record.
Canonical ZEARO modules remain authoritative for catalog, inventory, Party/CRM, pricing, orders, Treasury, Accounting, Sales Invoice, and tax workflows.

## Technical test
Open /prototype/ after deployment.
Switch templates.
Apply a ZEE preview instruction such as:
- switch to store
- switch to b2b
- make it more sales focused
Save a revision, change the template, then restore the previous revision.

This is a bounded technical proof for the Website surface of ZWP, not proof that tenant ZWP runtime or production publishing is AVAILABLE.
