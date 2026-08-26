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

  // IBM-style work environment thumbnails — Unsplash, reuse già verificati
  const images = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80", // code
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", // server
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", // dashboard/charts
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80", // team
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80", // collaboration
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80", // office energy
  ];

  return (
    <section id="features" className="relative border-b border-[#e0e0e0] bg-white overflow-hidden">
      {/* Sfondo ufficio leggero — IBM wash */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.035]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
      </div>
      <div className="relative mx-auto max-w-[1584px] px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="font-mono text-[12px] tracking-[0.08em] uppercase text-[#0f62fe]">{t("features.eyebrow")}</div>
            <h2 className="mt-3 text-[28px] lg:text-[32px] font-light leading-[1.1] tracking-[-0.02em]" dangerouslySetInnerHTML={{ __html: t("features.title") }} />
          </div>
          <div className="font-mono text-[12px] text-[#6f6f6f] border border-[#e0e0e0] bg-[#f4f4f4] px-3 py-2">
            {t("features.compat")}
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-0 border border-[#e0e0e0] bg-white overflow-hidden">
          {items.map((it, idx) => (
            <div
              key={it.k}
              className="flex flex-col border-b lg:border-r border-[#e0e0e0] last:border-b-0 bg-white [&:nth-child(3n)]:lg:border-r-0 [&:nth-child(3)]:md:border-r-0 [&:nth-child(6)]:md:border-r-0 group/card overflow-hidden"
            >
              <div className="relative h-[132px] overflow-hidden bg-[#f4f4f4]">
                <img
                  src={images[idx]}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover grayscale group-hover/card:grayscale-0 group-hover/card:scale-[1.02] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-[#0f62fe]/[0.08] group-hover/card:bg-[#0f62fe]/[0.02] transition-colors" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="bg-white text-[#0f62fe] font-mono text-[11px] tracking-[0.08em] px-1.5 py-1 leading-none border border-black/10 shadow-sm">
                    {it.k}
                  </span>
                  {it.badge && (
                    <span className="bg-[#0f62fe] text-white font-mono text-[10px] tracking-wide uppercase px-1.5 py-1 leading-none">
                      {it.badge}
                    </span>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20" />
              </div>
              <div className="p-6 lg:p-6 flex-1 flex flex-col">
                <h3 className="text-[16px] font-semibold leading-tight tracking-[-0.01em]">{it.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-[#525252]">{it.desc}</p>
                <ul className="mt-4 space-y-1.5">
                  {it.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-[13px] leading-[1.5] text-[#262626]">
                      <span className="mt-[7px] h-1 w-1 bg-[#8d8d8d] shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
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
