window.ZEARO_SITE_CONFIG = {
  site: { id: "zearo-reference-site", template: "corporate", status: "preview", locale: "en" },
  blocks: [
    { type: "hero", props: { eyebrow: "ZEARO", title: "A more intelligent way to run business.", body: "A reusable Website Workspace proof built from composable blocks.", primaryAction: "Explore platform", secondaryAction: "In development" } },
    { type: "moduleGrid", props: { title: "Connected business modules", items: ["Accounting","Treasury","CRM","WMS","Automation","ZEE"] } },
    { type: "zee", props: { title: "ZEE as the intelligent layer", body: "ZEE can compose, revise and operate the website experience without becoming the system of record." } },
    { type: "demoStrip", props: { title: "Operational demos", items: ["Open a sales invoice","Check warehouse availability","Show treasury status"] } }
  ]
};