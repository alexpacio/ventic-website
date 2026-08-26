import { ui, defaultLang } from "../i18n/ui";
type Lang = keyof typeof ui;
type Props = { lang?: Lang };

export default function Pricing({ lang = defaultLang as Lang }: Props) {
  const t = (key: string) => (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  const linkContact = lang === "it" ? "/#contact" : "/en/#contact";
  const linkPaas = lang === "it" ? "/paas" : "/en/paas";
  return (
    <section id="pricing" className="border-b border-[#e0e0e0] bg-[#161616] text-white">
      <div className="mx-auto max-w-[1584px] px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-[720px]">
          <div className="font-mono text-[12px] tracking-[0.08em] uppercase text-[#78a9ff]">{t("pricing.eyebrow")}</div>
          <h2 className="mt-3 text-[28px] lg:text-[36px] font-light leading-[1.05] tracking-[-0.02em]" dangerouslySetInnerHTML={{ __html: t("pricing.title") }} />
          <p className="mt-4 text-[16px] leading-[1.6] text-[#a8a8a8]">{t("pricing.desc")}</p>
        </div>

        <div className="mt-10 grid lg:grid-cols-2 gap-0 border border-[#393939] bg-[#262626]">
          {/* BYOH */}
          <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#393939] bg-white text-[#161616]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] tracking-[0.08em] uppercase border border-[#e0e0e0] px-2 py-1">{t("pricing.byoh.badge")}</span>
              <span className="font-mono text-[11px] text-[#6f6f6f]">{t("pricing.byoh.subtitle")}</span>
            </div>
            <h3 className="mt-4 text-[22px] font-semibold tracking-[-0.015em]">{t("pricing.byoh.title")}</h3>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-[44px] font-light tracking-[-0.03em] leading-none">{t("pricing.byoh.price")}</span>
              <span className="text-[16px] text-[#525252]">{t("pricing.byoh.suffix")}</span>
              <span className="ml-2 font-mono text-[11px] tracking-wide uppercase bg-[#f4f4f4] border border-[#e0e0e0] px-2 py-1">{t("pricing.byoh.consulting")}</span>
            </div>
            <p className="mt-3 text-[13px] leading-[1.6] text-[#525252]">{t("pricing.byoh.desc")}</p>
            <ul className="mt-6 space-y-2.5 text-[14px]">
              {[t("pricing.byoh.b1"), t("pricing.byoh.b2"), t("pricing.byoh.b3"), t("pricing.byoh.b4")].map((txt) => (
                <li key={txt} className="flex gap-3"><span className="text-[#0f62fe]">✓</span><span>{txt}</span></li>
              ))}
            </ul>
            <a href={linkContact} className="mt-8 inline-flex w-full justify-center items-center gap-2 bg-[#0f62fe] text-white py-3 text-[14px] font-medium hover:bg-[#0353e9] transition-colors">
              {t("pricing.byoh.cta")}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" /></svg>
            </a>
            <div className="mt-3 text-center font-mono text-[11px] text-[#6f6f6f]">{t("pricing.byoh.note")}</div>
          </div>

          {/* PaaS */}
          <div className="p-8 lg:p-10 bg-[#0f62fe] text-white">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] tracking-[0.08em] uppercase bg-white text-[#0f62fe] px-2 py-1 font-medium">{t("pricing.paas.badge")}</span>
              <span className="font-mono text-[11px] text-[#c6c6ff]">{t("pricing.paas.subtitle")}</span>
            </div>
            <h3 className="mt-4 text-[22px] font-semibold tracking-[-0.015em]">{t("pricing.paas.title")}</h3>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-[44px] font-light tracking-[-0.03em] leading-none">{t("pricing.paas.price")}</span>
              <span className="text-[16px] text-[#c6c6ff]">{t("pricing.paas.suffix")}</span>
            </div>
            <p className="mt-3 text-[13px] leading-[1.6] text-[#c6c6ff]">{t("pricing.paas.desc")}</p>
            <ul className="mt-6 space-y-2.5 text-[14px] text-white">
              {[t("pricing.paas.b1"), t("pricing.paas.b2"), t("pricing.paas.b3"), t("pricing.paas.b4")].map((txt) => (
                <li key={txt} className="flex gap-3"><span>✓</span><span>{txt}</span></li>
              ))}
            </ul>
            <a href={linkPaas} className="mt-8 inline-flex w-full justify-center items-center gap-2 bg-white text-[#0f62fe] py-3 text-[14px] font-medium hover:bg-[#f4f4f4] transition-colors">
              {t("pricing.paas.cta")}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" /></svg>
            </a>
            <div className="mt-3 text-center font-mono text-[11px] text-[#c6c6ff]">{t("pricing.paas.note")}</div>
          </div>
        </div>

        <div className="mt-6 border border-[#393939] bg-[#262626] p-4 flex flex-wrap gap-4 justify-between items-center">
          <span className="font-mono text-[12px] text-[#a8a8a8]">{t("pricing.custom.text")}</span>
          <a href={linkContact} className="font-mono text-[12px] tracking-wide uppercase text-white border border-[#525252] px-4 py-2 hover:bg-[#393939] transition-colors">{t("pricing.custom.cta")}</a>
        </div>
      </div>
    </section>
  );
}
