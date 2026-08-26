import { ui, defaultLang } from "../i18n/ui";
type Lang = keyof typeof ui;
type Props = { lang?: Lang };

export default function Why({ lang = defaultLang as Lang }: Props) {
  const t = (key: string) => (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  return (
    <section id="why" className="border-b border-[#e0e0e0] bg-[#f4f4f4]">
      <div className="mx-auto max-w-[1584px] px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-[720px]">
          <div className="font-mono text-[12px] tracking-[0.08em] uppercase text-[#0f62fe]">{t("why.eyebrow")}</div>
          <h2 className="mt-3 text-[28px] lg:text-[36px] font-light leading-[1.05] tracking-[-0.02em]" dangerouslySetInnerHTML={{ __html: t("why.title") }} />
          <p className="mt-4 text-[16px] leading-[1.6] text-[#525252]">{t("why.subtitle")}</p>
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-0 border border-[#e0e0e0] bg-white">
          {/* Column 1 */}
          <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-[#e0e0e0]">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 bg-[#da1e28] flex items-center justify-center text-white font-mono text-[12px]">!</span>
              <h3 className="text-[14px] font-semibold tracking-[-0.01em]">{t("why.col1.title")}</h3>
            </div>
            <ul className="mt-6 space-y-4 text-[14px] leading-[1.6] text-[#525252]">
              <li className="flex gap-3"><span className="text-[#da1e28] mt-0.5">—</span><span dangerouslySetInnerHTML={{ __html: t("why.col1.li1") }} /></li>
              <li className="flex gap-3"><span className="text-[#da1e28] mt-0.5">—</span><span dangerouslySetInnerHTML={{ __html: t("why.col1.li2") }} /></li>
              <li className="flex gap-3"><span className="text-[#da1e28] mt-0.5">—</span><span dangerouslySetInnerHTML={{ __html: t("why.col1.li3") }} /></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-[#e0e0e0]">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 bg-[#f1c21b] flex items-center justify-center text-[#161616] font-mono text-[12px]">€</span>
              <h3 className="text-[14px] font-semibold tracking-[-0.01em]">{t("why.col2.title")}</h3>
            </div>
            <ul className="mt-6 space-y-4 text-[14px] leading-[1.6] text-[#525252]">
              <li className="flex gap-3"><span className="text-[#8a3ffc] mt-0.5">—</span><span dangerouslySetInnerHTML={{ __html: t("why.col2.li1") }} /></li>
              <li className="flex gap-3"><span className="text-[#8a3ffc] mt-0.5">—</span><span dangerouslySetInnerHTML={{ __html: t("why.col2.li2") }} /></li>
              <li className="flex gap-3"><span className="text-[#8a3ffc] mt-0.5">—</span><span dangerouslySetInnerHTML={{ __html: t("why.col2.li3") }} /></li>
            </ul>
          </div>

          {/* Column 3 - Ventic - highlighted like IBM blue card */}
          <div className="p-6 lg:p-8 bg-[#0f62fe] text-white">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 bg-white flex items-center justify-center text-[#0f62fe] font-mono text-[12px] font-bold">✓</span>
              <h3 className="text-[14px] font-semibold tracking-[-0.01em]">{t("why.col3.title")}</h3>
            </div>
            <ul className="mt-6 space-y-3 text-[14px] leading-[1.6] text-[#e0e0e0]">
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
