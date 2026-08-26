import { ui, defaultLang } from "../i18n/ui";
type Lang = keyof typeof ui;

type Props = { lang?: Lang };

export default function Modes({ lang = defaultLang as Lang }: Props) {
  const t = (key: string) => (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  return (
    <section id="models" className="border-b border-[#e0e0e0] bg-white">
      <div className="mx-auto max-w-[1584px] px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-[380px_1fr] gap-8 lg:gap-12">
          <div>
            <div className="font-mono text-[12px] tracking-[0.08em] uppercase text-[#0f62fe]">{t("modes.eyebrow")}</div>
            <h2 className="mt-3 text-[28px] lg:text-[32px] font-light leading-[1.1] tracking-[-0.02em]" dangerouslySetInnerHTML={{ __html: t("modes.title") }} />
            <p className="mt-4 text-[14px] leading-[1.6] text-[#525252]">
              {t("modes.desc")}
            </p>
            <div className="mt-6 hidden lg:block h-px bg-[#e0e0e0]" />
            <div className="mt-6 hidden lg:flex items-center gap-2 font-mono text-[12px] text-[#6f6f6f]">
              <span className="h-2 w-2 bg-[#0f62fe]" /> {t("modes.compat")}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-0 border border-[#e0e0e0]">
            {/* BYOH */}
            <div className="p-6 lg:p-8 bg-white border-b md:border-b-0 md:border-r border-[#e0e0e0]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 border border-[#e0e0e0] px-2 py-1">
                    <span className="h-1.5 w-1.5 bg-[#525252]" />
                    <span className="font-mono text-[11px] tracking-[0.08em] uppercase">{t("modes.byoh.badge")}</span>
                  </div>
                  <h3 className="mt-4 text-[20px] font-semibold tracking-[-0.015em]">{t("modes.byoh.title")}</h3>
                </div>
                <span className="font-mono text-[11px] text-[#6f6f6f]">01</span>
              </div>
              <p className="mt-3 text-[14px] leading-[1.6] text-[#525252]">
                {t("modes.byoh.desc")}
              </p>
              <ul className="mt-6 space-y-3 text-[14px] leading-[1.5]">
                {[
                  t("modes.byoh.b1"),
                  t("modes.byoh.b2"),
                  t("modes.byoh.b3"),
                  t("modes.byoh.b4"),
                ].map((txt) => (
                  <li key={txt} className="flex gap-3">
                    <span className="mt-[7px] h-1 w-1 bg-[#0f62fe] shrink-0" />
                    <span className="text-[#262626]">{txt}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-[#e0e0e0] flex items-baseline justify-between">
                <span className="font-mono text-[12px] tracking-wide uppercase text-[#6f6f6f]">{t("modes.byoh.priceLabel")}</span>
                <span className="text-[14px]"><span className="text-[20px] font-semibold">{t("modes.byoh.price")}</span><span className="text-[#525252]">{t("modes.byoh.priceSuffix")}</span></span>
              </div>
            </div>

            {/* PaaS */}
            <div className="p-6 lg:p-8 bg-[#f4f4f4]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#0f62fe] text-white px-2 py-1">
                    <span className="h-1.5 w-1.5 bg-white" />
                    <span className="font-mono text-[11px] tracking-[0.08em] uppercase">{t("modes.paas.badge")}</span>
                  </div>
                  <h3 className="mt-4 text-[20px] font-semibold tracking-[-0.015em]">{t("modes.paas.title")}</h3>
                </div>
                <span className="font-mono text-[11px] text-[#6f6f6f]">02</span>
              </div>
              <p className="mt-3 text-[14px] leading-[1.6] text-[#525252]">
                {t("modes.paas.desc")}
              </p>
              <ul className="mt-6 space-y-3 text-[14px] leading-[1.5]">
                {[
                  t("modes.paas.b1"),
                  t("modes.paas.b2"),
                  t("modes.paas.b3"),
                  t("modes.paas.b4"),
                ].map((txt) => (
                  <li key={txt} className="flex gap-3">
                    <span className="mt-[7px] h-1 w-1 bg-[#0f62fe] shrink-0" />
                    <span className="text-[#262626]">{txt}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-[#e0e0e0] flex items-baseline justify-between">
                <span className="font-mono text-[12px] tracking-wide uppercase text-[#6f6f6f]">{t("modes.paas.priceLabel")}</span>
                <span className="text-[14px]"><span className="text-[20px] font-semibold">{t("modes.paas.price")}</span><span className="text-[#525252]"> {t("modes.paas.priceSuffix")}</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
