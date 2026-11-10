// Motion layer: button fill + label roll, headline line wipe, words lighting on scroll,
// breathing squares and a pixel edge on dark bands. Styles live in global.css.
// Everything is progressive: without this script (or with reduced motion) the page is static and complete.

if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const el = (tag: string, cls: string, html = "") => {
    const n = document.createElement(tag);
    n.className = cls;
    n.setAttribute("aria-hidden", "true");
    n.innerHTML = html;
    return n;
  };

  // wrap every word of `root` in <span class="w">, keeping nested markup (<br>, .hl spans) intact
  const words = (root: Element) => {
    const texts: Text[] = [];
    const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walk.nextNode()) texts.push(walk.currentNode as Text);
    const out: HTMLElement[] = [];
    for (const t of texts) {
      const frag = document.createDocumentFragment();
      for (const part of t.data.split(/(\s+)/)) {
        if (!part.trim()) { frag.append(part); continue; }
        const w = document.createElement("span");
        w.className = "w";
        w.textContent = part;
        frag.append(w);
        out.push(w);
      }
      t.replaceWith(frag);
    }
    return out;
  };

  const onceInView = (fn: (n: HTMLElement) => void, threshold = 0.3) =>
    new IntersectionObserver((es, o) => es.forEach((e) => {
      if (e.isIntersecting) { o.unobserve(e.target); fn(e.target as HTMLElement); }
    }), { threshold });

  // buttons: five columns rise in sequence under a label that rolls over in 3D
  document.querySelectorAll<HTMLElement>(".btn").forEach((b) => {
    for (const n of [...b.childNodes]) {
      const t = n.nodeType === Node.TEXT_NODE ? n.textContent?.trim() : "";
      if (!t) continue;
      const roll = document.createElement("span");
      roll.className = "roll";
      roll.dataset.t = t;
      roll.append(Object.assign(document.createElement("span"), { textContent: t }));
      n.replaceWith(roll);
    }
    b.prepend(el("span", "fill", [0, 1, 2, 3, 4].map((i) => `<i style="--i:${i}"></i>`).join("")));
  });

  // headlines: measure lines when they enter view, sweep one accent bar per line
  const wipeIO = onceInView((h) => {
    const box = h.getBoundingClientRect();
    const lines: DOMRect[][] = [];
    let top = NaN;
    h.querySelectorAll<HTMLElement>(".w").forEach((w) => {
      const r = w.getBoundingClientRect();
      if (!(Math.abs(r.top - top) < r.height / 2)) { lines.push([]); top = r.top; }
      lines[lines.length - 1].push(r);
      w.style.setProperty("--line", String(lines.length - 1));
    });
    lines.forEach((rs, i) => {
      const l = Math.min(...rs.map((r) => r.left)), t = Math.min(...rs.map((r) => r.top));
      const bar = el("span", "wipe-bar");
      bar.style.cssText = `--line:${i};left:${l - box.left}px;top:${t - box.top}px;width:${Math.max(...rs.map((r) => r.right)) - l}px;height:${Math.max(...rs.map((r) => r.bottom)) - t}px`;
      bar.addEventListener("animationend", () => bar.remove());
      h.append(bar);
    });
    h.classList.add("is-in");
  }, 0.4);
  document.querySelectorAll<HTMLElement>(".h1, .h2, .h2-big").forEach((h) => {
    if (h.closest(".sr-only") || !words(h).length) return;
    h.classList.add("wipe");
    wipeIO.observe(h);
  });

  // statement text: words light up one by one as the paragraph scrolls up through the viewport
  const leads = [...document.querySelectorAll<HTMLElement>(".shead-lead")].map((p) => ({ p, ws: words(p) }));
  let queued = false;
  const light = () => {
    queued = false;
    const vh = innerHeight;
    const end = scrollY + vh >= document.documentElement.scrollHeight - 2;
    for (const { p, ws } of leads) {
      const r = p.getBoundingClientRect();
      const lit = end ? ws.length : Math.round(Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (vh * 0.35 + r.height))) * ws.length);
      ws.forEach((w, i) => w.toggleAttribute("data-lit", i < lit));
    }
  };
  if (leads.length) {
    light();
    leads.forEach(({ p }) => p.classList.add("lit-words"));
    addEventListener("scroll", () => { if (!queued) { queued = true; requestAnimationFrame(light); } }, { passive: true });
  }

  // dark bands
  document.querySelectorAll<HTMLElement>(".sec--dark").forEach((sec) => {
    if (sec.previousElementSibling) {
      // top row fills later than the row touching the band, so the edge crumbles upward
      sec.append(el("div", "px-edge", Array.from({ length: 64 }, (_, i) => `<i style="--a:${((i < 32 ? 18 : 6) + Math.random() * 22).toFixed(1)}%"></i>`).join("")));
    }
    if (innerWidth < 1200) return;
    const cols = Math.floor(sec.offsetWidth / 48), rows = Math.floor(sec.offsetHeight / 48);
    sec.prepend(el("div", "field", Array.from({ length: 24 }, () => {
      const c = Math.floor(Math.random() * cols), r = Math.floor(Math.random() * rows);
      return `<i style="left:${c * 48 + 1}px;top:${r * 48 + 1}px;--d:${(4 + Math.random() * 5).toFixed(2)}s;--dl:${(-Math.random() * 9).toFixed(2)}s;--pk:${(0.1 + Math.random() * 0.2).toFixed(2)}"></i>`;
    }).join("")));
  });
}
