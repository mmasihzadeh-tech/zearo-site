(() => {
  const config = window.ZEARO_SITE_CONFIG;
  const app = document.getElementById("app");
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
    }
  };
  document.body.dataset.template = config.site.template;
  config.blocks.forEach((block) => {
    const renderer = renderers[block.type];
    if (renderer) app.append(renderer(block));
  });
})();