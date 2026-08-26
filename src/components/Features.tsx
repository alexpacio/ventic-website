import { ui, defaultLang } from "../i18n/ui";
type Lang = keyof typeof ui;
type Props = { lang?: Lang };

export default function Features({ lang = defaultLang as Lang }: Props) {
  const t = (key: string) => (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  const items = [
    {
      k: "01",
      title: t("features.01.title"),
      desc: t("features.01.desc"),
      bullets: [t("features.01.b1"), t("features.01.b2"), t("features.01.b3")],
    },
    {
      k: "02",
      title: t("features.02.title"),
      desc: t("features.02.desc"),
      bullets: [t("features.02.b1"), t("features.02.b2"), t("features.02.b3")],
    },
    {
      k: "03",
      title: t("features.03.title"),
      desc: t("features.03.desc"),
      bullets: [t("features.03.b1"), t("features.03.b2"), t("features.03.b3")],
    },
    {
      k: "04",
      title: t("features.04.title"),
      desc: t("features.04.desc"),
      bullets: [t("features.04.b1"), t("features.04.b2"), t("features.04.b3")],
    },
    {
      k: "05",
      title: t("features.05.title"),
      desc: t("features.05.desc"),
      bullets: [t("features.05.b1"), t("features.05.b2"), t("features.05.b3")],
      badge: t("features.05.badge"),
    },
    {
      k: "06",
      title: t("features.06.title"),
      desc: t("features.06.desc"),
      bullets: [t("features.06.b1"), t("features.06.b2"), t("features.06.b3")],
      badge: t("features.06.badge"),
    },
  ];

  return (
    <section id="features" className="border-b border-[#e0e0e0] bg-white">
      <div className="mx-auto max-w-[1584px] px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="font-mono text-[12px] tracking-[0.08em] uppercase text-[#0f62fe]">{t("features.eyebrow")}</div>
            <h2 className="mt-3 text-[28px] lg:text-[32px] font-light leading-[1.1] tracking-[-0.02em]" dangerouslySetInnerHTML={{ __html: t("features.title") }} />
          </div>
          <div className="font-mono text-[12px] text-[#6f6f6f] border border-[#e0e0e0] bg-[#f4f4f4] px-3 py-2">
            {t("features.compat")}
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-0 border border-[#e0e0e0]">
          {items.map((it) => (
            <div key={it.k} className="p-6 lg:p-7 border-b lg:border-r border-[#e0e0e0] last:border-b-0 bg-white [&:nth-child(3n)]:lg:border-r-0 [&:nth-child(3)]:md:border-r-0 [&:nth-child(6)]:md:border-r-0">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[12px] tracking-[0.08em] text-[#0f62fe]">{it.k}</span>
                {it.badge && <span className="font-mono text-[11px] tracking-wide uppercase border border-[#0f62fe] text-[#0f62fe] px-1.5 py-0.5">{it.badge}</span>}
              </div>
              <h3 className="mt-3 text-[16px] font-semibold leading-tight tracking-[-0.01em]">{it.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-[#525252]">{it.desc}</p>
              <ul className="mt-4 space-y-1.5">
                {it.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-[13px] leading-[1.5] text-[#262626]">
                    <span className="mt-[7px] h-1 w-1 bg-[#8d8d8d] shrink-0" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Observability mock - IBM Carbon dashboard style */}
        <div className="mt-8 border border-[#e0e0e0] bg-[#f4f4f4] p-4 lg:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-[12px] tracking-[0.08em] uppercase text-[#525252]">{t("features.preview.label")}</span>
            <span className="font-mono text-[11px] text-[#6f6f6f]">{t("features.preview.realtime")}</span>
          </div>
          <div className="mt-4 grid lg:grid-cols-[1.2fr_0.8fr] gap-4">
            <div className="border border-[#e0e0e0] bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium">{t("features.preview.gpu")}</span>
                <span className="font-mono text-[11px] text-[#6f6f6f]">{t("features.preview.gpuAvg")}</span>
              </div>
              <div className="mt-4 flex items-end gap-1 h-[72px]">
                {[32, 48, 72, 55, 88, 94, 81, 90, 94, 86, 92, 94].map((h, i) => (
                  <div key={i} className="flex-1 bg-[#0f62fe]" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="mt-2 flex justify-between font-mono text-[11px] text-[#8d8d8d]"><span>00:00</span><span>03:00</span><span>06:00</span></div>
            </div>
            <div className="border border-[#e0e0e0] bg-white p-4">
              <div className="text-[13px] font-medium">{t("features.preview.tokens")}</div>
              <div className="mt-4 space-y-3 font-mono text-[12px]">
                {[
                  { user: "agent-prod", tok: "2.41M", pct: 72 },
                  { user: "alexp@team", tok: "0.84M", pct: 42 },
                  { user: "ci-bot", tok: "0.31M", pct: 18 },
                ].map((r) => (
                  <div key={r.user} className="flex items-center gap-3">
                    <span className="w-[88px] truncate text-[#525252]">{r.user}</span>
                    <div className="flex-1 h-2 bg-[#e0e0e0]"><div className="h-full bg-[#0f62fe]" style={{ width: `${r.pct}%` }} /></div>
                    <span className="w-[58px] text-right text-[#161616]">{r.tok}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-[#e0e0e0] pt-3 flex gap-2 font-mono text-[11px]">
                <span className="border border-[#e0e0e0] bg-[#f4f4f4] px-2 py-1">{t("features.preview.alerts")}</span>
                <span className="border border-[#e0e0e0] bg-[#f4f4f4] px-2 py-1">{t("features.preview.policy")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
