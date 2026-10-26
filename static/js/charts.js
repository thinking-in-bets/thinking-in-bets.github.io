// Result charts for the project page. Every number is copied from the
// paper's result tables (sections/results_tables/*.tex).

const SERIES = {
  std: { name: "Standard", color: "var(--s-std)" },
  tib: { name: "Thinking-in-Bets", color: "var(--s-tib)" },
  rule: { name: "Rule only (stand firm)", color: "var(--s-rule)" },
  stub: { name: "Strongest stubbornness prompt", color: "var(--s-other)" },
  after: { name: "Checklist written after the complaint", color: "var(--s-other)" },
  always: { name: "Always-On Betting", color: "var(--s-tib)" },
  ondemand: { name: "On-Demand Betting", color: "var(--s-ondemand)" },
  draft: { name: "Draft-First Betting", color: "var(--s-tib)" },
};

const CHARTS = {
  patch: {
    title: "Correct requirements broken after a mistaken complaint",
    note: "SWE-Together and SWE-Interact patch review · lower is better",
    unit: "%",
    max: 20,
    ticks: [0, 5, 10, 15, 20],
    series: ["std", "tib"],
    rows: [
      ["3.5 Flash-Lite", [12.07, 0.0]],
      ["3.5 Flash", [17.13, 0.07]],
      ["3.6 Flash", [13.25, 0.0]],
      ["3.8 Flash", [8.54, 0.0]],
      ["4.0 Argon", [9.89, 0.0]],
      ["All models", [12.25, 0.02], true],
    ],
    digits: 2,
  },
  reports: {
    title: "Reports that pass after review",
    note: "Agents' Last Exam, 100 reviews over five models · higher is better",
    unit: "%",
    max: 100,
    ticks: [0, 25, 50, 75, 100],
    series: ["std", "after", "tib"],
    rows: [["All five models", [58, 65, 89]]],
    byMethod: true,
    digits: 0,
  },
  reportsBroken: {
    title: "Passing reports broken by mistaken pushback",
    note: "75 passing drafts · lower is better",
    unit: "%",
    max: 100,
    ticks: [0, 25, 50, 75, 100],
    series: ["std", "after", "tib"],
    rows: [["All five models", [54.7, 45.3, 12.0]]],
    byMethod: true,
    digits: 1,
  },
  balance: {
    title: "Balanced accuracy when half the hints are right and half are wrong",
    note: "Humanity's Last Exam validity pool, 476 items · higher is better",
    unit: "%",
    max: 100,
    ticks: [0, 25, 50, 75, 100],
    series: ["std", "rule", "stub", "tib"],
    rows: [
      ["3.5 Flash-Lite", [56.9, 62.2, 61.3, 63.0]],
      ["3.5 Flash", [69.1, 73.1, 73.7, 76.1]],
      ["3.6 Flash", [70.4, 75.6, 75.2, 76.1]],
      ["3.8 Flash", [71.6, 78.8, 79.0, 79.0]],
    ],
    labelOnly: "tib",
    digits: 1,
  },
  edits: {
    title: "Mistaken complaints followed by an unnecessary file edit",
    note: "Multi-turn coding · lower is better",
    unit: "%",
    max: 100,
    ticks: [0, 25, 50, 75, 100],
    series: ["std", "tib"],
    groups: [
      ["SWE-Interact", [
        ["3.5 Flash", [56.0, 25.0]],
        ["3.6 Flash", [75.0, 45.5]],
        ["3.8 Flash", [80.0, 50.0]],
        ["4.0 Argon", [57.9, 22.9]],
      ]],
      ["SWE-Together", [
        ["3.6 Flash", [63.6, 35.0]],
        ["3.8 Flash", [66.7, 27.8]],
      ]],
    ],
    digits: 1,
  },
  mixedFixed: {
    title: "Real bugs fixed",
    note: "3.8 Flash, SWE-Interact mixed feedback · higher is better",
    unit: "%",
    max: 100,
    ticks: [0, 25, 50, 75, 100],
    series: ["std", "always", "ondemand"],
    rows: [["3.8 Flash", [52.2, 58.3, 73.9]]],
    byMethod: true,
    digits: 1,
  },
  mixedBroken: {
    title: "Correct work broken by mistaken complaints",
    note: "same sessions · lower is better",
    unit: "%",
    max: 100,
    ticks: [0, 25, 50, 75, 100],
    series: ["std", "always", "ondemand"],
    rows: [["3.8 Flash", [5.1, 3.7, 6.6]]],
    byMethod: true,
    digits: 1,
  },
  draftAcc: {
    title: "Answer accuracy",
    note: "Humanity's Last Exam, 500 questions per model · higher is better",
    unit: "%",
    max: 60,
    ticks: [0, 20, 40, 60],
    series: ["std", "draft"],
    rows: [
      ["3.5 Flash-Lite", [9.4, 14.4]],
      ["3.5 Flash", [30.8, 35.0]],
      ["3.8 Flash", [33.0, 37.6]],
      ["4.0 Argon", [45.6, 46.6]],
    ],
    digits: 1,
  },
  draftBrier: {
    title: "Confidence error (Brier)",
    note: "same questions · lower is better",
    unit: "",
    max: 0.8,
    ticks: [0, 0.2, 0.4, 0.6, 0.8],
    series: ["std", "draft"],
    rows: [
      ["3.5 Flash-Lite", [0.704, 0.472]],
      ["3.5 Flash", [0.58, 0.488]],
      ["3.8 Flash", [0.549, 0.44]],
      ["4.0 Argon", [0.438, 0.344]],
    ],
    digits: 3,
  },
};

const fmt = (v, c) => `${v.toFixed(c.digits)}${c.unit}`;
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
};

const tip = el("div", "bc-tip");
tip.setAttribute("role", "tooltip");
document.body.appendChild(tip);

function showTip(target, html) {
  tip.innerHTML = html;
  tip.classList.add("on");
  const r = target.getBoundingClientRect();
  const t = tip.getBoundingClientRect();
  let left = r.right + 10;
  if (left + t.width > window.innerWidth - 8) left = Math.max(8, r.left - t.width - 10);
  tip.style.left = `${left + window.scrollX}px`;
  tip.style.top = `${r.top + r.height / 2 - t.height / 2 + window.scrollY}px`;
}
const hideTip = () => tip.classList.remove("on");

function renderRows(container, c, rows) {
  for (const [label, values, emphasis] of rows) {
    const row = el("div", `bc-row${emphasis ? " bc-emph" : ""}`);
    row.appendChild(el("div", "bc-label", label));
    const plot = el("div", "bc-plot");
    for (const t of c.ticks) {
      const g = el("div", "bc-grid");
      g.style.left = `${(100 * t) / c.max}%`;
      plot.appendChild(g);
    }
    c.series.forEach((key, i) => {
      const s = SERIES[key];
      const v = values[i];
      const line = el("div", "bc-line");
      line.style.setProperty("--w", `${(100 * v) / c.max}%`);
      const bar = el("div", `bc-bar${v === 0 ? " bc-zero" : ""}`);
      bar.style.setProperty("--c", s.color);
      bar.tabIndex = 0;
      bar.setAttribute("aria-label", `${label}, ${s.name}: ${fmt(v, c)}`);
      const html = `<span class="bc-tip-key" style="--c:${s.color}"></span>${s.name}<br><b>${fmt(v, c)}</b> · ${label}`;
      bar.addEventListener("mouseenter", () => showTip(bar, html));
      bar.addEventListener("focus", () => showTip(bar, html));
      bar.addEventListener("mouseleave", hideTip);
      bar.addEventListener("blur", hideTip);
      line.appendChild(bar);
      if (!c.labelOnly || c.labelOnly === key) {
        const strong = key === (c.strong ?? c.series.at(-1));
        line.appendChild(el("span", `bc-val${strong ? " bc-val-strong" : ""}`, fmt(v, c)));
      }
      plot.appendChild(line);
    });
    row.appendChild(plot);
    container.appendChild(row);
  }
}

function renderChart(node) {
  const c = CHARTS[node.dataset.chart];
  const fig = el("figure", `bc${c.byMethod ? " bc-methods" : ""}`);
  fig.appendChild(el("figcaption", "bc-title", c.title));
  fig.appendChild(el("div", "bc-note", c.note));

  // One row per method is labeled directly, so it needs no legend.
  const legend = el("div", "bc-legend");
  for (const key of c.byMethod ? [] : c.series) {
    const item = el("span", "bc-key");
    const sw = el("span", "bc-swatch");
    sw.style.setProperty("--c", SERIES[key].color);
    item.append(sw, SERIES[key].name);
    legend.appendChild(item);
  }
  fig.appendChild(legend);

  const body = el("div", "bc-body");
  if (c.groups) {
    for (const [name, rows] of c.groups) {
      body.appendChild(el("div", "bc-group", name));
      renderRows(body, c, rows);
    }
  } else if (c.byMethod) {
    const values = c.rows[0][1];
    c.series.forEach((key, i) =>
      renderRows(body, { ...c, series: [key], strong: c.series.at(-1) }, [[SERIES[key].name, [values[i]], i === c.series.length - 1]]),
    );
  } else {
    renderRows(body, c, c.rows);
  }

  const axis = el("div", "bc-row bc-axis");
  axis.appendChild(el("div", "bc-label"));
  const ticks = el("div", "bc-plot");
  for (const t of c.ticks) {
    const n = el("span", "bc-tick", `${t}${c.unit}`);
    n.style.left = `${(100 * t) / c.max}%`;
    ticks.appendChild(n);
  }
  axis.appendChild(ticks);
  body.appendChild(axis);
  fig.appendChild(body);

  // Table twin: every value is readable without hover.
  const details = el("details", "bc-data");
  details.appendChild(el("summary", "", "Show data"));
  const table = el("table");
  const head = el("tr");
  head.appendChild(el("th", "", ""));
  for (const key of c.series) head.appendChild(el("th", "", SERIES[key].name));
  table.appendChild(head);
  const allRows = c.groups ? c.groups.flatMap(([g, rows]) => rows.map(([l, v]) => [`${g} · ${l}`, v])) : c.rows;
  for (const [label, values] of allRows) {
    const tr = el("tr");
    tr.appendChild(el("th", "", label));
    for (const v of values) tr.appendChild(el("td", "", fmt(v, c)));
    table.appendChild(tr);
  }
  details.appendChild(table);
  fig.appendChild(details);

  node.replaceChildren(fig);
}

document.querySelectorAll("[data-chart]").forEach(renderChart);
