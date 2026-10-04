window.ZEARO_SITE_CONFIG = {
  product: { id: "zwp", name: "ZEARO Web Presence", labelFa: "حضور در وب" },
  surface: { id: "website", name: "Website" },
  site: {
    id: "zearo-reference-site",
    template: "corporate",
    status: "preview",
    locale: "en",
    revision: 1
  },

  templates: {
    corporate: {
      label: "Corporate",
      blocks: [
        { type: "hero", props: { eyebrow: "ZEARO", title: "A more intelligent way to run business.", body: "A connected operating layer for finance, operations, relationships and intelligent assistance.", primaryAction: "Explore platform", secondaryAction: "In development" } },
        { type: "moduleGrid", props: { title: "Connected business modules", items: ["Accounting", "Treasury", "CRM", "WMS", "Automation", "ZEE"] } },
        { type: "zee", props: { title: "ZEE as the intelligent layer", body: "ZEE helps compose, navigate and operate authorized experiences while canonical ZEARO modules remain the systems of record." } },
        { type: "demoStrip", props: { title: "Operational demos", items: ["Open a sales invoice", "Check warehouse availability", "Show treasury status"] } }
      ]
    },

    store: {
      label: "Store",
      blocks: [
        { type: "hero", props: { eyebrow: "ZEARO COMMERCE", title: "Turn operational data into a connected storefront.", body: "A storefront shell designed to consume canonical product, pricing and availability contracts without copying operational truth.", primaryAction: "Browse catalog", secondaryAction: "Preview mode" } },
        { type: "productGrid", props: { title: "Storefront blocks", items: [
          { name: "Product catalog", meta: "Canonical source" },
          { name: "Availability", meta: "WMS-backed" },
          { name: "Customer order", meta: "Workflow-ready" },
          { name: "Payment", meta: "Gateway boundary" }
        ] } },
        { type: "flow", props: { title: "Target commerce flow", steps: ["Order", "Stock reservation", "Warehouse request", "Delivery / Issue", "Sales invoice", "Payment / Treasury", "Accounting", "Taxpayer system"] } }
      ]
    },

    b2b: {
      label: "B2B / RFQ",
      blocks: [
        { type: "hero", props: { eyebrow: "ZEARO BUSINESS NETWORK", title: "Private B2B demand and supply matching.", body: "An opt-in RFQ and Offer experience designed to protect tenant inventory, pricing and customer data.", primaryAction: "Create RFQ", secondaryAction: "Opt-in only" } },
        { type: "productGrid", props: { title: "Exchange building blocks", items: [
          { name: "RFQ", meta: "Buyer request" },
          { name: "Offer", meta: "Supplier response" },
          { name: "Match", meta: "Policy controlled" },
          { name: "Accept", meta: "Creates workflow" }
        ] } },
        { type: "flow", props: { title: "Bounded B2B lifecycle", steps: ["RFQ", "Anonymous match", "Offers", "Accept", "Order handoff", "Settlement", "WMS / Delivery", "Invoice"] } }
      ]
    }
  },

  actionContract: {
    action: "zearo.zwp.website.preview.apply",
    authority: "ZEARO Web Presence",
    surface: "website",
    interpreter: "ZEE",
    mode: "preview-only",
    writeRequires: ["permission", "validation", "confirmation"],
    forbiddenInMvp: ["dns-change", "publish-production", "payment-write", "customer-data-write"]
  }
};