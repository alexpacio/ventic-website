import { ui, defaultLang } from "../i18n/ui";
type Lang = keyof typeof ui;
type Props = { lang?: Lang };

export default function Why({ lang = defaultLang as Lang }: Props) {
  const t = (key: string) => (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  return (
    <section id="why" className="relative border-b border-[#e0e0e0] bg-[#f4f4f4] overflow-hidden">
      {/* Sfondo ambiente lavorativo team — IBM style wash */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f4f4f4] via-[#f4f4f4]/85 to-[#f4f4f4]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>
      <div className="relative mx-auto max-w-[1584px] px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-[720px]">
          <div className="font-mono text-[12px] tracking-[0.08em] uppercase text-[#0f62fe]">{t("why.eyebrow")}</div>
          <h2 className="mt-3 text-[28px] lg:text-[36px] font-light leading-[1.05] tracking-[-0.02em]" dangerouslySetInnerHTML={{ __html: t("why.title") }} />
          <p className="mt-4 text-[16px] leading-[1.6] text-[#525252]">{t("why.subtitle")}</p>
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-0 border border-[#e0e0e0] bg-white overflow-hidden">
          {/* Column 1 — ambiente: interruzione servizio, ufficio in ombra */}
          <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-[#e0e0e0] overflow-hidden">
            <div className="relative h-[132px] overflow-hidden bg-[#1c1c1c]">
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-90 grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#da1e28]/85 via-[#da1e28]/30 to-transparent" />
              <div className="absolute inset-0 bg-[#da1e28] mix-blend-multiply opacity-[0.18]" />
              <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center gap-2">
                <span className="h-6 w-6 bg-[#da1e28] flex items-center justify-center text-white font-mono text-[12px] border border-white/20">!</span>
                <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-white/90">Ufficio • outage</span>
              </div>
            </div>
            <div className="p-6 lg:p-7 flex-1">
              <h3 className="text-[14px] font-semibold tracking-[-0.01em]">{t("why.col1.title")}</h3>
              <ul className="mt-5 space-y-4 text-[14px] leading-[1.6] text-[#525252]">
                <li className="flex gap-3"><span className="text-[#da1e28] mt-0.5">—</span><span dangerouslySetInnerHTML={{ __html: t("why.col1.li1") }} /></li>
                <li className="flex gap-3"><span className="text-[#da1e28] mt-0.5">—</span><span dangerouslySetInnerHTML={{ __html: t("why.col1.li2") }} /></li>
                <li className="flex gap-3"><span className="text-[#da1e28] mt-0.5">—</span><span dangerouslySetInnerHTML={{ __html: t("why.col1.li3") }} /></li>
              </ul>
            </div>
          </div>

          {/* Column 2 — ambiente: meeting costi */}
          <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-[#e0e0e0] overflow-hidden">
            <div className="relative h-[132px] overflow-hidden bg-[#1c1c1c]">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-90 grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#8a3ffc]/80 via-[#8a3ffc]/25 to-transparent" />
              <div className="absolute inset-0 bg-[#8a3ffc] mix-blend-multiply opacity-[0.16]" />
              <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center gap-2">
                <span className="h-6 w-6 bg-[#f1c21b] flex items-center justify-center text-[#161616] font-mono text-[12px] border border-black/10">€</span>
                <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-white/90">Budget • pay-per-token</span>
              </div>
            </div>
            <div className="p-6 lg:p-7 flex-1">
              <h3 className="text-[14px] font-semibold tracking-[-0.01em]">{t("why.col2.title")}</h3>
              <ul className="mt-5 space-y-4 text-[14px] leading-[1.6] text-[#525252]">
                <li className="flex gap-3"><span className="text-[#8a3ffc] mt-0.5">—</span><span dangerouslySetInnerHTML={{ __html: t("why.col2.li1") }} /></li>
                <li className="flex gap-3"><span className="text-[#8a3ffc] mt-0.5">—</span><span dangerouslySetInnerHTML={{ __html: t("why.col2.li2") }} /></li>
                <li className="flex gap-3"><span className="text-[#8a3ffc] mt-0.5">—</span><span dangerouslySetInnerHTML={{ __html: t("why.col2.li3") }} /></li>
              </ul>
            </div>
          </div>

          {/* Column 3 - Ventic — ambient: server room blu, IBM card */}
          <div className="flex flex-col bg-[#0f62fe] text-white overflow-hidden">
            <div className="relative h-[132px] overflow-hidden bg-[#002d9c]">
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f62fe] via-[#0f62fe]/40 to-transparent" />
              <div className="absolute inset-0 bg-[#0f62fe] mix-blend-multiply opacity-[0.35]" />
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
              <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center gap-2">
                <span className="h-6 w-6 bg-white flex items-center justify-center text-[#0f62fe] font-mono text-[12px] font-bold">✓</span>
                <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-white">Ventic • privata</span>
              </div>
            </div>
            <div className="p-6 lg:p-7 flex-1">
              <h3 className="text-[14px] font-semibold tracking-[-0.01em]">{t("why.col3.title")}</h3>
              <ul className="mt-5 space-y-3 text-[14px] leading-[1.6] text-[#e0e0e0]">
                {[
                  t("why.col3.li1"),
                  t("why.col3.li2"),
                  t("why.col3.li3"),
                  t("why.col3.li4"),
                  t("why.col3.li5"),
                  t("why.col3.li6"),
                  t("why.col3.li7"),
                ].map((txt) => (
                  <li key={txt} className="flex gap-3">
                    <span className="mt-[8px] h-1 w-1 bg-white shrink-0" />
                    <span>{txt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Comparison bar — beautified */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            {
              label: t("why.bar.context.label"),
              frontier: t("why.bar.context.frontier").replace(/\s*→\s*$/, ""),
              ventic: t("why.bar.context.ventic"),
            },
            {
              label: t("why.bar.budget.label"),
              frontier: t("why.bar.budget.frontier"),
              ventic: t("why.bar.budget.ventic"),
            },
            {
              label: t("why.bar.data.label"),
              frontier: t("why.bar.data.frontier"),
              ventic: t("why.bar.data.ventic"),
            },
          ].map((item) => (
            <div
              key={item.label}
              className="group border border-[#e0e0e0] bg-white hover:border-[#0f62fe]/30 hover:shadow-[0_4px_24px_rgba(15,98,254,0.08)] transition-all flex flex-col"
            >
              <div className="px-4 py-3 flex items-center justify-between border-b border-[#e0e0e0] bg-[#f9f9f9] group-hover:bg-[#f4f8ff] transition-colors">
                <span className="font-mono text-[11px] tracking-[0.08em] uppercase font-medium text-[#393939]">{item.label}</span>
                <span className="h-2 w-2 rounded-full bg-[#0f62fe]/50 group-hover:bg-[#0f62fe] transition-colors" />
              </div>
              <div className="p-4 flex flex-col items-center gap-2.5 flex-1 justify-center">
                <span className="inline-flex items-center justify-center gap-2 w-full border border-[#ffd7d9] bg-[#fff1f2] text-[#a2191f] px-3 py-2 text-[12px] font-medium leading-none">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#da1e28] shrink-0" />
                  {item.frontier}
                </span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#edf5ff] border border-[#d0e2ff] text-[#0f62fe] text-[12px] leading-none">↓</span>
                <span className="inline-flex items-center justify-center gap-2 w-full border border-[#a6c8ff] bg-[#0f62fe] text-white px-3 py-2 text-[12px] font-semibold leading-none shadow-[0_2px_8px_rgba(15,98,254,0.18)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)] shrink-0" />
                  {item.ventic}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
