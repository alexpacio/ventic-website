import { ui, defaultLang } from "../i18n/ui";
type Lang = keyof typeof ui;
type Props = { lang?: Lang };

export default function How({ lang = defaultLang as Lang }: Props) {
  const t = (key: string) => (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  return (
    <section id="how" className="relative border-b border-[#e0e0e0] bg-white overflow-hidden">
      {/* Sfondo lab / data center IBM wash */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.045]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/85 to-white" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      </div>
      <div className="relative mx-auto max-w-[1584px] px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-[420px_1fr] gap-8 lg:gap-12 items-start">
          <div className="lg:sticky lg:top-[88px]">
            <div className="font-mono text-[12px] tracking-[0.08em] uppercase text-[#0f62fe]">{t("how.eyebrow")}</div>
            <h2 className="mt-3 text-[28px] lg:text-[32px] font-light leading-[1.1] tracking-[-0.02em]" dangerouslySetInnerHTML={{ __html: t("how.title") }} />
            <p className="mt-4 text-[14px] leading-[1.6] text-[#525252]">
              {t("how.desc")}
            </p>
            <div className="mt-8 border border-[#e0e0e0] bg-[#f4f4f4] overflow-hidden">
              <div className="relative h-[118px] overflow-hidden bg-[#161616]">
                <img
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-[#161616]/45 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-white/85">Lab • developer workspace</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#42be65] animate-pulse" />
                </div>
              </div>
              <div className="p-4 font-mono text-[12px] leading-[1.6] text-[#525252]">
                <div className="text-[#161616] font-medium">{t("how.agent.title")}</div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <span className="bg-white border border-[#e0e0e0] px-2 py-1.5">{t("how.agent.vllm")}</span>
                  <span className="bg-white border border-[#e0e0e0] px-2 py-1.5">{t("how.agent.scheduling")}</span>
                  <span className="bg-white border border-[#e0e0e0] px-2 py-1.5">{t("how.agent.mesh")}</span>
                  <span className="bg-white border border-[#e0e0e0] px-2 py-1.5">{t("how.agent.observability")}</span>
                  <span className="bg-white border border-[#e0e0e0] px-2 py-1.5">{t("how.agent.recovery")}</span>
                  <span className="bg-white border border-[#e0e0e0] px-2 py-1.5">{t("how.agent.shutdown")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Diagram - IBM-style architecture — con sfondo server room */}
          <div className="relative border border-[#e0e0e0] bg-[#161616] text-white overflow-hidden">
            <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-[0.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#161616]/60 via-[#161616]/85 to-[#161616]" />
            </div>
            <div className="relative px-6 py-4 border-b border-[#393939] flex items-center justify-between bg-[#262626]/90 backdrop-blur-[1px]">
              <span className="font-mono text-[12px] tracking-[0.06em] uppercase text-[#a8a8a8]">{t("how.arch.title")}</span>
              <span className="hidden sm:inline font-mono text-[11px] text-[#6f6f6f]">{t("how.arch.noip")}</span>
            </div>

            <div className="relative p-6 lg:p-8">
              {/* Flow */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="border border-[#393939] bg-[#262626] p-4">
                  <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#8d8d8d]">{t("how.arch.col1.eyebrow")}</div>
                  <div className="mt-2 text-[13px] font-medium">{t("how.arch.col1.title")}</div>
                  <div className="mt-1 font-mono text-[12px] text-[#8d8d8d]">{t("how.arch.col1.subtitle")}</div>
                  <div className="mt-3 flex gap-1.5">
                    <span className="h-6 w-6 rounded-full bg-[#0f62fe] flex items-center justify-center text-[10px] font-mono">JS</span>
                    <span className="h-6 w-6 rounded-full bg-[#393939] border border-[#525252] flex items-center justify-center text-[10px] font-mono">PY</span>
                    <span className="h-6 w-6 rounded-full bg-[#393939] border border-[#525252] flex items-center justify-center text-[10px] font-mono">cURL</span>
                  </div>
                </div>

                <div className="border border-[#0f62fe] bg-[#0f62fe]/20 p-4 relative">
                  <div className="absolute -top-2 left-4 bg-[#0f62fe] text-white font-mono text-[10px] tracking-wide px-1.5 py-0.5">MESH</div>
                  <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#8d8d8d]">{t("how.arch.col2.eyebrow")}</div>
                  <div className="mt-2 text-[13px] font-medium">{t("how.arch.col2.title")}</div>
                  <div className="mt-1 font-mono text-[12px] text-[#a8a8a8]">{t("how.arch.col2.subtitle")}</div>
                  <div className="mt-3 h-px bg-[#0f62fe]/40" />
                  <div className="mt-3 font-mono text-[11px] text-[#8d8d8d]">{t("how.arch.col2.note")}</div>
                </div>

                <div className="border border-[#393939] bg-[#262626] p-4">
                  <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#8d8d8d]">{t("how.arch.col3.eyebrow")}</div>
                  <div className="mt-2 text-[13px] font-medium">{t("how.arch.col3.title")}</div>
                  <div className="mt-1 font-mono text-[12px] text-[#8d8d8d]">{t("how.arch.col3.subtitle")}</div>
                  <div className="mt-3 inline-flex items-center gap-1.5 border border-[#393939] bg-[#161616] px-2 py-1 font-mono text-[11px]">
                    <span className="h-1.5 w-1.5 bg-[#42be65] animate-pulse rounded-full" /> {t("how.arch.col3.badge")}
                  </div>
                </div>
              </div>

              {/* Bottom detail */}
              <div className="mt-6 grid lg:grid-cols-2 gap-4">
                <div className="border border-[#393939] p-4 bg-[#262626]/50">
                  <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#8d8d8d]">{t("how.setup.title")}</div>
                  <ol className="mt-3 space-y-2 font-mono text-[13px] text-[#e0e0e0]">
                    <li className="flex gap-3"><span className="text-[#0f62fe]">1.</span> {t("how.setup.s1")}</li>
                    <li className="flex gap-3"><span className="text-[#0f62fe]">2.</span> {t("how.setup.s2")}</li>
                    <li className="flex gap-3"><span className="text-[#0f62fe]">3.</span> <span dangerouslySetInnerHTML={{ __html: t("how.setup.s3") }} /></li>
                  </ol>
                </div>
                <div className="border border-[#393939] p-4 bg-[#262626]/50">
                  <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#8d8d8d]">{t("how.resilience.title")}</div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
                    <div className="border border-[#393939] bg-[#161616] py-3"><div className="text-[#42be65] font-medium">{t("how.resilience.spot")}</div><div className="text-[#8d8d8d] mt-1">{t("how.resilience.spotDesc")}</div></div>
                    <div className="border border-[#393939] bg-[#161616] py-3"><div className="text-[#42be65] font-medium">{t("how.resilience.idle")}</div><div className="text-[#8d8d8d] mt-1">{t("how.resilience.idleDesc")}</div></div>
                    <div className="border border-[#393939] bg-[#161616] py-3"><div className="text-[#42be65] font-medium">{t("how.resilience.request")}</div><div className="text-[#8d8d8d] mt-1">{t("how.resilience.requestDesc")}</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
