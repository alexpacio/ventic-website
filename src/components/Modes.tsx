import { ui, defaultLang } from "../i18n/ui";
type Lang = keyof typeof ui;

type Props = { lang?: Lang };

export default function Modes({ lang = defaultLang as Lang }: Props) {
  const t = (key: string) => (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  return (
    <section id="models" className="relative border-b border-[#e0e0e0] bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80"
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
      </div>
      <div className="relative mx-auto max-w-[1584px] px-6 lg:px-8 py-12 lg:py-16">
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

          <div className="grid md:grid-cols-2 gap-0 border border-[#e0e0e0] overflow-hidden bg-white">
            {/* BYOH — ambiente: proprio hardware in ufficio */}
            <div className="flex flex-col bg-white border-b md:border-b-0 md:border-r border-[#e0e0e0] overflow-hidden">
              <div className="relative h-[148px] overflow-hidden bg-[#f4f4f4]">
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="bg-white text-[#161616] font-mono text-[11px] tracking-[0.08em] uppercase px-2 py-1 border border-black/10">BYOH</span>
                  <span className="font-mono text-[11px] text-white/90">tuo hardware</span>
                </div>
                <span className="absolute top-3 right-3 font-mono text-[11px] text-white/80 bg-black/30 backdrop-blur px-1.5 py-0.5 border border-white/20">01</span>
              </div>
              <div className="p-6 lg:p-7 flex-1 flex flex-col">
                <div className="inline-flex items-center gap-2 border border-[#e0e0e0] px-2 py-1 self-start">
                  <span className="h-1.5 w-1.5 bg-[#525252]" />
                  <span className="font-mono text-[11px] tracking-[0.08em] uppercase">{t("modes.byoh.badge")}</span>
                </div>
                <h3 className="mt-4 text-[20px] font-semibold tracking-[-0.015em]">{t("modes.byoh.title")}</h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-[#525252]">{t("modes.byoh.desc")}</p>
                <ul className="mt-6 space-y-3 text-[14px] leading-[1.5]">
                  {[t("modes.byoh.b1"), t("modes.byoh.b2"), t("modes.byoh.b3"), t("modes.byoh.b4")].map((txt) => (
                    <li key={txt} className="flex gap-3">
                      <span className="mt-[7px] h-1 w-1 bg-[#0f62fe] shrink-0" />
                      <span className="text-[#262626]">{txt}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8 flex items-baseline justify-between border-t border-[#e0e0e0]">
                  <span className="font-mono text-[12px] tracking-wide uppercase text-[#6f6f6f]">{t("modes.byoh.priceLabel")}</span>
                  <span className="text-[14px]"><span className="text-[20px] font-semibold">{t("modes.byoh.price")}</span><span className="text-[#525252]">{t("modes.byoh.priceSuffix")}</span></span>
                </div>
              </div>
            </div>

            {/* PaaS — ambiente: data center gestito */}
            <div className="flex flex-col bg-[#f4f4f4] overflow-hidden">
              <div className="relative h-[148px] overflow-hidden bg-[#002d9c]">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[#0f62fe] mix-blend-multiply opacity-[0.32]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f62fe]/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="bg-[#0f62fe] text-white font-mono text-[11px] tracking-[0.08em] uppercase px-2 py-1">PaaS</span>
                  <span className="font-mono text-[11px] text-white/90">noi gestiamo</span>
                </div>
                <span className="absolute top-3 right-3 font-mono text-[11px] text-white/85 bg-black/25 backdrop-blur px-1.5 py-0.5 border border-white/20">02</span>
              </div>
              <div className="p-6 lg:p-7 flex-1 flex flex-col">
                <div className="inline-flex items-center gap-2 bg-[#0f62fe] text-white px-2 py-1 self-start">
                  <span className="h-1.5 w-1.5 bg-white" />
                  <span className="font-mono text-[11px] tracking-[0.08em] uppercase">{t("modes.paas.badge")}</span>
                </div>
                <h3 className="mt-4 text-[20px] font-semibold tracking-[-0.015em]">{t("modes.paas.title")}</h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-[#525252]">{t("modes.paas.desc")}</p>
                <ul className="mt-6 space-y-3 text-[14px] leading-[1.5]">
                  {[t("modes.paas.b1"), t("modes.paas.b2"), t("modes.paas.b3"), t("modes.paas.b4")].map((txt) => (
                    <li key={txt} className="flex gap-3">
                      <span className="mt-[7px] h-1 w-1 bg-[#0f62fe] shrink-0" />
                      <span className="text-[#262626]">{txt}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8 flex items-baseline justify-between border-t border-[#e0e0e0]">
                  <span className="font-mono text-[12px] tracking-wide uppercase text-[#6f6f6f]">{t("modes.paas.priceLabel")}</span>
                  <span className="text-[14px]"><span className="text-[20px] font-semibold">{t("modes.paas.price")}</span><span className="text-[#525252]"> {t("modes.paas.priceSuffix")}</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
