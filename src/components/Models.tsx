import { ui, defaultLang } from "../i18n/ui";
type Lang = keyof typeof ui;
type Props = { lang?: Lang };

export default function ModelsSection({ lang = defaultLang as Lang }: Props) {
  const t = (key: string) => (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  const models = [
    {
      name: t("models.qwen.name"),
      tag: t("models.qwen.tag"),
      tier: t("models.qwen.tier"),
      desc: t("models.qwen.desc"),
      stats: { context: t("models.qwen.context"), speed: t("models.qwen.speed"), use: t("models.qwen.use") },
      accent: "bg-[#0f62fe]",
    },
    {
      name: t("models.deepseek.name"),
      tag: t("models.deepseek.tag"),
      tier: t("models.deepseek.tier"),
      desc: t("models.deepseek.desc"),
      stats: { context: t("models.deepseek.context"), speed: t("models.deepseek.speed"), use: t("models.deepseek.use") },
      accent: "bg-[#8a3ffc]",
    },
    {
      name: t("models.kimi.name"),
      tag: t("models.kimi.tag"),
      tier: t("models.kimi.tier"),
      desc: t("models.kimi.desc"),
      stats: { context: t("models.kimi.context"), speed: t("models.kimi.speed"), use: t("models.kimi.use") },
      accent: "bg-[#007d79]",
    },
  ];

  return (
    <section className="border-b border-[#e0e0e0] bg-[#f4f4f4]">
      <div className="mx-auto max-w-[1584px] px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="font-mono text-[12px] tracking-[0.08em] uppercase text-[#0f62fe]">{t("models.eyebrow")}</div>
            <h2 className="mt-3 text-[28px] lg:text-[32px] font-light leading-[1.1] tracking-[-0.02em]" dangerouslySetInnerHTML={{ __html: t("models.title") }} />
          </div>
          <p className="max-w-[44ch] text-[14px] leading-[1.6] text-[#525252]">
            {t("models.desc")}
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-0 border border-[#e0e0e0] bg-white">
          {models.map((m) => (
            <div key={m.name} className="p-6 lg:p-7 border-b md:border-b-0 md:border-r last:border-r-0 border-[#e0e0e0] flex flex-col">
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2 py-1 text-white font-mono text-[11px] tracking-[0.06em] uppercase ${m.accent}`}>{m.tag}</span>
                <span className="font-mono text-[11px] text-[#6f6f6f]">{m.tier}</span>
              </div>
              <h3 className="mt-4 text-[20px] font-semibold tracking-[-0.015em]">{m.name}</h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-[#525252]">{m.desc}</p>

              <div className="mt-6 grid grid-cols-3 gap-2 border-t border-[#e0e0e0] pt-4">
                <div>
                  <div className="font-mono text-[11px] tracking-wide uppercase text-[#6f6f6f]">{t("models.table.context")}</div>
                  <div className="mt-1 text-[13px] font-medium">{m.stats.context}</div>
                </div>
                <div>
                  <div className="font-mono text-[11px] tracking-wide uppercase text-[#6f6f6f]">{t("models.table.throughput")}</div>
                  <div className="mt-1 text-[13px] font-medium">{m.stats.speed}</div>
                </div>
                <div>
                  <div className="font-mono text-[11px] tracking-wide uppercase text-[#6f6f6f]">{t("models.table.bestfor")}</div>
                  <div className="mt-1 text-[13px] font-medium leading-tight">{m.stats.use}</div>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <span className="flex-1 border border-[#e0e0e0] bg-[#f4f4f4] px-3 py-2 text-center font-mono text-[12px]">{t("models.badge.open")}</span>
                <span className="flex-1 border border-[#e0e0e0] bg-[#f4f4f4] px-3 py-2 text-center font-mono text-[12px]">{t("models.badge.vllm")}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2 font-mono text-[12px] text-[#525252]">
          <span className="border border-[#e0e0e0] bg-white px-3 py-2">{t("models.footer.embedding")}</span>
          <span className="border border-[#e0e0e0] bg-white px-3 py-2">{t("models.footer.compat")}</span>
        </div>
      </div>
    </section>
  );
}
