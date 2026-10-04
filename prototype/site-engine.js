(() => {
  const config = window.ZEARO_SITE_CONFIG;
  const app = document.getElementById("app");
  const templateSelect = document.getElementById("templateSelect");
  const zeeCommand = document.getElementById("zeeCommand");
  const applyZee = document.getElementById("applyZee");
  const saveRevision = document.getElementById("saveRevision");
  const restoreRevision = document.getElementById("restoreRevision");
  const revisionLabel = document.getElementById("revisionLabel");
  const workspaceStatus = document.getElementById("workspaceStatus");
  const previewFrame = document.getElementById("previewFrame");
  const desktopMode = document.getElementById("desktopMode");
  const mobileMode = document.getElementById("mobileMode");
  const siteIdentity = document.getElementById("siteIdentity");

  const storageKey = "zearo.website.workspace.mvp.v1";

  const clone = (value) => JSON.parse(JSON.stringify(value));
  const state = {
    site: clone(config.site),
    templates: clone(config.templates),
    activeBlocks: clone(config.templates[config.site.template].blocks),
    revisions: []
  };

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const renderers = {
    hero(block) {
      const section = el("section", "block hero");
      const wrap = el("div", "wrap");
      wrap.append(el("div", "eyebrow", block.props.eyebrow), el("h1", "", block.props.title), el("p", "lead", block.props.body));
      const actions = el("div", "actions");
      actions.append(el("button", "primary", block.props.primaryAction), el("span", "secondary", block.props.secondaryAction));
      wrap.append(actions);
      section.append(wrap);
      return section;
    },

    moduleGrid(block) {
      const section = el("section", "block");
      const wrap = el("div", "wrap");
      wrap.append(el("h2", "", block.props.title));
      const grid = el("div", "grid");
      block.props.items.forEach((item) => grid.append(el("article", "card", item)));
      wrap.append(grid);
      section.append(wrap);
      return section;
    },

    productGrid(block) {
      const section = el("section", "block");
      const wrap = el("div", "wrap");
      wrap.append(el("h2", "", block.props.title));
      const grid = el("div", "grid");
      block.props.items.forEach((item) => {
        const card = el("article", "card stackCard");
        card.append(el("strong", "", item.name), el("span", "cardMeta", item.meta));
        grid.append(card);
      });
      wrap.append(grid);
      section.append(wrap);
      return section;
    },

    zee(block) {
      const section = el("section", "block zee");
      const wrap = el("div", "wrap");
      wrap.append(el("div", "zeeMark", "ZEE"), el("h2", "", block.props.title), el("p", "lead", block.props.body));
      section.append(wrap);
      return section;
    },

    demoStrip(block) {
      const section = el("section", "block");
      const wrap = el("div", "wrap");
      wrap.append(el("h2", "", block.props.title));
      const demos = el("div", "demos");
      block.props.items.forEach((item, index) => {
        const card = el("article", "demo");
        card.append(el("span", "demoIndex", String(index + 1).padStart(2, "0")), el("strong", "", item));
        demos.append(card);
      });
      wrap.append(demos);
      section.append(wrap);
      return section;
    },

    flow(block) {
      const section = el("section", "block flowBlock");
      const wrap = el("div", "wrap");
      wrap.append(el("h2", "", block.props.title));
      const flow = el("div", "flow");
      block.props.steps.forEach((step, index) => {
        const node = el("div", "flowNode");
        node.append(el("span", "flowIndex", String(index + 1).padStart(2, "0")), el("strong", "", step));
        flow.append(node);
      });
      wrap.append(flow);
      section.append(wrap);
      return section;
    }
  };

  function render() {
    app.replaceChildren();
    document.body.dataset.template = state.site.template;
    siteIdentity.textContent = state.site.id;
    revisionLabel.textContent = "v" + state.site.revision;
    workspaceStatus.textContent = state.site.status === "preview" ? "Preview only" : state.site.status;

    state.activeBlocks.forEach((block) => {
      const renderer = renderers[block.type];
      if (renderer) app.append(renderer(block));
    });
  }

  function setTemplate(templateId) {
    const template = state.templates[templateId];
    if (!template) return;
    state.site.template = templateId;
    state.activeBlocks = clone(template.blocks);
    state.site.status = "preview";
    render();
  }

  function persist() {
    localStorage.setItem(storageKey, JSON.stringify({
      site: state.site,
      activeBlocks: state.activeBlocks,
      revisions: state.revisions
    }));
  }

  function saveCurrentRevision() {
    state.revisions.push({
      revision: state.site.revision,
      template: state.site.template,
      blocks: clone(state.activeBlocks),
      savedAt: new Date().toISOString()
    });
    state.site.revision += 1;
    persist();
    render();
  }

  function restorePreviousRevision() {
    const previous = state.revisions.pop();
    if (!previous) {
      workspaceStatus.textContent = "No saved revision";
      return;
    }
    state.site.template = previous.template;
    state.activeBlocks = clone(previous.blocks);
    state.site.revision = Math.max(1, previous.revision);
    templateSelect.value = state.site.template;
    persist();
    render();
  }

  function applyPreviewInstruction(command) {
    const normalized = command.trim().toLowerCase();
    if (!normalized) return;

    if (normalized.includes("store")) {
      setTemplate("store");
    } else if (normalized.includes("b2b") || normalized.includes("rfq")) {
      setTemplate("b2b");
    } else if (normalized.includes("corporate")) {
      setTemplate("corporate");
    }

    const hero = state.activeBlocks.find((block) => block.type === "hero");
    if (hero && (normalized.includes("sales") || normalized.includes("sell"))) {
      hero.props.title = "Turn connected operations into a clearer sales experience.";
      hero.props.body = "Preview-only ZEE instruction applied to the Website Workspace configuration.";
    }
    if (hero && (normalized.includes("simple") || normalized.includes("minimal"))) {
      hero.props.body = "A simpler, clearer preview composed through the Website Workspace.";
    }

    state.site.status = "preview — ZEE instruction applied";
    persist();
    render();
  }

  Object.entries(state.templates).forEach(([id, template]) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = template.label;
    templateSelect.append(option);
  });
  templateSelect.value = state.site.template;

  templateSelect.addEventListener("change", () => setTemplate(templateSelect.value));
  applyZee.addEventListener("click", () => applyPreviewInstruction(zeeCommand.value));
  saveRevision.addEventListener("click", saveCurrentRevision);
  restoreRevision.addEventListener("click", restorePreviousRevision);

  desktopMode.addEventListener("click", () => {
    previewFrame.classList.remove("mobile");
    desktopMode.classList.add("active");
    mobileMode.classList.remove("active");
  });

  mobileMode.addEventListener("click", () => {
    previewFrame.classList.add("mobile");
    mobileMode.classList.add("active");
    desktopMode.classList.remove("active");
  });

  const persisted = localStorage.getItem(storageKey);
  if (persisted) {
    try {
      const saved = JSON.parse(persisted);
      if (saved.site && saved.activeBlocks) {
        Object.assign(state.site, saved.site);
        state.activeBlocks = saved.activeBlocks;
        state.revisions = Array.isArray(saved.revisions) ? saved.revisions : [];
        templateSelect.value = state.site.template;
      }
    } catch (_) {}
  }

  render();
})();