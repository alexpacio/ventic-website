const models = [
  {
    name: "Qwen 3.8",
    tag: "Agentic • Coding",
    tier: "Tier 1 — Max intelligence",
    desc: "Best for complex reasoning, long-horizon agents and deep code generation.",
    stats: { context: "128k", speed: "~1.9k tok/s", use: "Agents, coding" },
    accent: "bg-[#0f62fe]",
  },
  {
    name: "DeepSeek v4 Flash 0731",
    tag: "Speed • Value",
    tier: "Tier 2 — Balanced",
    desc: "Flash-optimized for high throughput and low latency. Excellent cost/performance.",
    stats: { context: "128k", speed: "~3.2k tok/s", use: "Production, chat" },
    accent: "bg-[#8a3ffc]",
  },
  {
    name: "Kimi K3",
    tag: "Long context",
    tier: "Tier 3 — Efficiency",
    desc: "Ultra-long context specialist. Ideal for document-heavy and retrieval workloads.",
    stats: { context: "200k+", speed: "~2.4k tok/s", use: "RAG, docs" },
    accent: "bg-[#007d79]",
  },
];

export default function ModelsSection() {
  return (
    <section className="border-b border-[#e0e0e0] bg-[#f4f4f4]">
      <div className="mx-auto max-w-[1584px] px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="font-mono text-[12px] tracking-[0.08em] uppercase text-[#0f62fe]">Which models</div>
            <h2 className="mt-3 text-[28px] lg:text-[32px] font-light leading-[1.1] tracking-[-0.02em]">The best open-weights<br /><span className="font-semibold">for coding and agents.</span></h2>
          </div>
          <p className="max-w-[44ch] text-[14px] leading-[1.6] text-[#525252]">
            Three price/intelligence tiers. All served with hardware-tuned vLLM and embedding model. Swap anytime — same API.
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
                  <div className="font-mono text-[11px] tracking-wide uppercase text-[#6f6f6f]">Context</div>
                  <div className="mt-1 text-[13px] font-medium">{m.stats.context}</div>
                </div>
                <div>
                  <div className="font-mono text-[11px] tracking-wide uppercase text-[#6f6f6f]">Throughput</div>
                  <div className="mt-1 text-[13px] font-medium">{m.stats.speed}</div>
                </div>
                <div>
                  <div className="font-mono text-[11px] tracking-wide uppercase text-[#6f6f6f]">Best for</div>
                  <div className="mt-1 text-[13px] font-medium leading-tight">{m.stats.use}</div>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <span className="flex-1 border border-[#e0e0e0] bg-[#f4f4f4] px-3 py-2 text-center font-mono text-[12px]">Open weights</span>
                <span className="flex-1 border border-[#e0e0e0] bg-[#f4f4f4] px-3 py-2 text-center font-mono text-[12px]">vLLM tuned</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2 font-mono text-[12px] text-[#525252]">
          <span className="border border-[#e0e0e0] bg-white px-3 py-2">+ Embedding model included & hardware-optimized</span>
          <span className="border border-[#e0e0e0] bg-white px-3 py-2">OpenAI-compatible • same endpoint for all models</span>
        </div>
      </div>
    </section>
  );
}
