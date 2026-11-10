import type { Lang } from "./content";
import { GPU, PLANS, fmt, usd, usdAuto, usdRange, saveBand } from "./economics";

/* Data for /comparison/. Prices and speeds checked online in November 2026; see `sources`.
   Speeds marked "previsione/forecast" interpolate between two public vLLM measurements with a power law. */

const pick = (lang: Lang) => <T,>(it: T, en: T): T => (lang === "it" ? it : en);
const blend = (i: number, o: number) => 0.8 * i + 0.2 * o;

// decode: per-user tok/s vs concurrent sessions on an 8-GPU node
const DS = { one: 575, many: 34, sessions: 2048 };           // DeepSeek V4.1 Flash NVFP4, B300 (vLLM)
const KIMI = { one: 376, many: 54, sessions: 1120 };         // Kimi K3.1 Pro; sessions assume 20% of 37.8K tok/s/GPU is output
const fit = (c: typeof DS) => { const a = Math.log(c.one / c.many) / Math.log(c.sessions); return (s: number) => (s > c.one ? 0 : s <= c.many ? c.sessions : Math.max(1, Math.floor(Math.pow(c.one / s, 1 / a)))); };
export const dsAt = fit(DS), kimiAt = fit(KIMI);
const MI = [[64, 29.64], [32, 36.98], [16, 53.77], [8, 79.8], [4, 95.22], [2, 132.86], [1, 158.75]]; // DeepSeek V4 Flash, 1×MI300X, production
const miAt = (s: number) => (MI.find(([, v]) => v >= s)?.[0] ?? 0) * 8;
const DUTY = 0.3, HOURS = 730;

export function comparison(lang: Lang) {
  const t = pick(lang);
  const sonnet = blend(2, 10);

  const models = [
    { n: "Claude Opus 5.5", s: t("frontier, chiuso", "frontier, closed"), i: 4, o: 20, ref: true },
    { n: "Claude Sonnet 5.5", s: t("frontier, chiuso", "frontier, closed"), i: 2, o: 10, ref: true },
    { n: "Kimi K3.1 Pro", s: t("2,8T, 104B attivi, pesi aperti", "2.8T, 104B active, open weights"), i: 2, o: 10 },
    { n: "GLM-5.3", s: t("753B, 40B attivi, pesi aperti", "753B, 40B active, open weights"), i: 1.4, o: 4.4 },
    { n: "DeepSeek V4.1 Flash", s: t("MoE, pesi aperti", "MoE, open weights"), i: 0.3, o: 1.2 },
    { n: "GLM-5.3 Flash", s: t("320B, 18B attivi, MIT", "320B, 18B active, MIT"), i: 0.15, o: 0.5 },
    { n: "Qwen3.8 Flash", s: t("versione open: Flash Next, 125B", "open version: Flash Next, 125B"), i: 0.15, o: 0.47 },
  ].map((m) => {
    const v = blend(m.i, m.o), p = Math.round((1 - v / sonnet) * 100);
    return { name: m.n, spec: `${m.s} · $${fmt(lang, m.i, 2)} / $${fmt(lang, m.o, 2)}`, value: usd(lang, v, 2), w: Math.round((v / blend(4, 20)) * 100), ref: !!m.ref,
      save: m.n === "Claude Sonnet 5.5" ? t("riferimento", "baseline") : p === 0 ? t("pari", "same") : p > 0 ? `−${p}%` : `+${-p}%`, good: p > 0 };
  });

  const hw = [
    { n: "8×B300", mem: t("288 GB · 4 bit", "288 GB · 4-bit"), g: 288, max: 8, four: true },
    { n: "8×MI300X", mem: "192 GB · FP8", g: 192, max: 8, four: false },
    { n: "8×H100", mem: "80 GB · FP8", g: 80, max: 8, four: false },
    { n: t("Server 495", "495 server"), mem: t("192 GB · 4 bit", "192 GB · 4-bit"), g: 192, max: 1, four: true, box: true },
  ];
  const weights = [
    { n: "Kimi K3.1 Pro", w4: 1560, w8: 1560, note: t("1,56 TB in MXFP4", "1.56 TB in MXFP4") },
    { n: "GLM-5.3", w4: 378, w8: 756, note: t("756 GB in FP8", "756 GB in FP8") },
    { n: "GLM-5.3 Flash", w4: 164, w8: 328, note: t("328 GB in FP8", "328 GB in FP8") },
    { n: "DeepSeek V4.1 Flash", w4: 144, w8: 168, note: t("168 GB in FP8", "168 GB in FP8") },
    { n: "Qwen3.8 Flash Next", w4: 100, w8: 180, note: t("stima", "estimate") },
  ];
  const fitRows = weights.map((m) => ({
    name: m.n, note: m.note,
    cells: hw.map((h) => { const need = Math.ceil(((h.four ? m.w4 : m.w8) * 1.1) / h.g); const ok = need <= h.max; return { ok, t: ok ? (h.box ? t("entra", "fits") : `${need} GPU`) : t("non entra", "no fit") }; }),
  }));

  const speedRows = [
    { n: t("DeepSeek V4.1 Flash · 4×B300 · 1 sessione", "DeepSeek V4.1 Flash · 4×B300 · 1 session"), v: 575, k: "own", s: t("misura vLLM", "vLLM measurement") },
    { n: t("Kimi K3.1 Pro · 8 GPU · 1 sessione", "Kimi K3.1 Pro · 8 GPU · 1 session"), v: 376, k: "own", s: t("misura vLLM", "vLLM measurement") },
    { n: "GPT-5.5 medium (Codex)", v: 186, k: "ext", s: "Artificial Analysis" },
    { n: t("DeepSeek V4 Flash · 1×MI300X · 1 sessione", "DeepSeek V4 Flash · 1×MI300X · 1 session"), v: 159, k: "own", s: t("misura di produzione", "production measurement") },
    { n: "Claude Sonnet 5.5", v: 151, k: "ext", s: "Artificial Analysis" },
    { n: "Claude Opus 5.5", v: 114, k: "ext", s: "Artificial Analysis" },
    { n: `Kimi K3.1 Pro · 8×B300 · ${kimiAt(100)} ${t("sessioni", "sessions")}`, v: 100, k: "pred", s: t("previsione", "forecast") },
    { n: `DeepSeek V4.1 Flash · 8×B300 · ${dsAt(100)} ${t("sessioni", "sessions")}`, v: 100, k: "pred", s: t("previsione", "forecast") },
    { n: "Claude Opus 5.5 · Claude Code", v: 89, k: "ext", s: t("mediana su 20.000 turni", "median over 20,000 turns") },
    { n: "GPT-5 Codex high", v: 78, k: "ext", s: "Artificial Analysis" },
    { n: t("Kimi K3.1 Pro · massimo carico", "Kimi K3.1 Pro · full load"), v: 54, k: "own", s: t("misura vLLM", "vLLM measurement") },
    { n: `DeepSeek V4.1 Flash · 8×B300 · 2.048 ${t("sessioni", "sessions")}`, v: 34, k: "own", s: t("misura vLLM", "vLLM measurement") },
  ].map((r) => ({ ...r, w: Math.round((r.v / 575) * 100), value: `${fmt(lang, r.v)} tok/s` }));

  const SL = [
    { v: 150, l: t("come Sonnet 5.5", "like Sonnet 5.5") },
    { v: 100, l: t("come Opus 5.5", "like Opus 5.5") },
    { v: 75, l: t("come Codex", "like Codex") },
    { v: 34, l: t("massima densità", "max density") },
  ];
  const nodes = [
    { n: "8×B300 · DeepSeek V4.1 Flash", band: GPU.b300, at: dsAt, main: true },
    { n: "8×B300 · Kimi K3.1 Pro", band: GPU.b300, at: kimiAt },
    { n: "8×MI300X · DeepSeek V4 Flash", band: GPU.mi300x, at: miAt },
  ];
  const sla = SL.map((s) => ({
    ...s,
    cards: nodes.map((n) => {
      const sess = n.at(s.v), devs = Math.floor(sess / DUTY);
      const lo = devs ? (n.band.lo * 8 * HOURS) / devs : 0, hi = devs ? (n.band.hi * 8 * HOURS) / devs : 0;
      return { name: n.n, main: !!n.main, price: `${usdRange(lang, n.band.lo, n.band.hi)} / GPU-${t("ora", "hour")}`, sessions: fmt(lang, sess), devs: fmt(lang, devs),
        perDev: devs ? usdRange(lang, lo, hi) : "—", saves: devs ? PLANS.map((p) => ({ n: p[lang], ...saveBand(lo, hi, p.v) })) : [] };
    }),
  }));
  const kNode = [GPU.b300.lo * 8 * HOURS, GPU.b300.hi * 8 * HOURS];
  const kimiBreak = t(
    `Kimi K3.1 Pro in azienda: un nodo 8×B300 costa quanto Claude Max 5x per ${fmt(lang, kNode[0] / 100)}–${fmt(lang, kNode[1] / 100)} sviluppatori. Sotto, conviene via API; sopra, o con dati che non possono uscire, in casa.`,
    `Kimi K3.1 Pro at work: an 8×B300 node costs as much as Claude Max 5x for ${fmt(lang, kNode[0] / 100)}–${fmt(lang, kNode[1] / 100)} developers. Below that, use the API; above it, or with data that cannot leave, run it in-house.`,
  );

  const local = [
    { n: "Claude Sonnet 5.5 (API)", v: 151, k: "ext", s: t("riferimento", "baseline") },
    { n: "gpt-oss-120b", v: 55, k: "own", s: "MXFP4" },
    { n: t("Qwen3.8 Flash Next con MTP", "Qwen3.8 Flash Next with MTP"), v: 38, k: "own", s: t("125B, 6B attivi", "125B, 6B active") },
    { n: "Qwen3.6 35B-A3B", v: 32, k: "own", s: "Q8_0" },
    { n: "Qwen3.8 Flash Next", v: 21, k: "own", s: "llama.cpp" },
    { n: "GLM-5.3 Flash", v: 20, k: "own", s: t("IQ4_XS, dato AMD", "IQ4_XS, AMD figure") },
    { n: "DeepSeek V4 Flash", v: 12, k: "own", s: t("Q4_K_XL; altra fonte 26", "Q4_K_XL; another source 26") },
    { n: "GLM-5.3 · Kimi K3.1 Pro", v: 0, k: "no", s: t("non entrano", "do not fit") },
  ].map((r) => ({ ...r, w: Math.round((r.v / 151) * 100), value: r.k === "no" ? t("non entra", "no fit") : `${r.v} tok/s` }));

  const RT = 65; // faster-whisper large-v3 on H100, 60-70x real time
  const pre = (8000 * 3600) / 1e6, miOut = (b: number) => b / (1650 * 0.4 * 3600 / 1e6);
  const workloads = [
    { title: t("Trascrizione", "Transcription"), ep: "/v1/audio/transcriptions", unit: t("$ per ora di audio", "$ per audio hour"), ref: 0.36, refN: "Whisper API",
      items: [["Google Chirp", 0.96], ["OpenAI Whisper", 0.36], ["AssemblyAI", 0.15]] as [string, number][], own: [GPU.h100.lo / RT, GPU.h100.hi / RT], ownN: "Ventic · H100" },
    { title: t("Serie temporali", "Time series"), ep: "/v1/forecast", unit: t("$ al mese", "$ per month"), ref: 12000, refN: "TimeGPT Enterprise",
      items: [["TimeGPT Enterprise", 12000]] as [string, number][], own: [GPU.h100.lo * 730, GPU.h100.hi * 730], ownN: "Ventic · 1×H100" },
    { title: t("Classificazione (System One)", "Classification (System One)"), ep: "/v1/systemone", unit: t("$ per milione di decisioni", "$ per million decisions"), ref: 52.5, refN: "Haiku 5.5",
      items: [["Sonnet 5.5", 1050], ["Haiku 5.5", 52.5]] as [string, number][], own: [500 * GPU.mi300x.lo / pre + 5 * miOut(GPU.mi300x.lo), 500 * GPU.mi300x.hi / pre + 5 * miOut(GPU.mi300x.hi)], ownN: "Ventic · MI300X" },
    { title: t("Sintesi vocale", "Speech"), ep: "/v1/audio/speech", unit: t("$ per milione di caratteri", "$ per million characters"), ref: 0, refN: "",
      items: [["ElevenLabs v3", 80], ["OpenAI tts-1", 15]] as [string, number][], own: null, ownN: "Ventic" },
    { title: "Embedding", ep: "/v1/embeddings", unit: t("$ per milione di token", "$ per million tokens"), ref: 0, refN: "",
      items: [["text-embedding-3-large", 0.13], ["text-embedding-3-small", 0.02]] as [string, number][], own: null, ownN: "Ventic" },
  ].map((w) => {
    const mx = Math.max(...w.items.map(([, v]) => v), w.own ? w.own[1] : 0);
    const save = w.own && w.ref ? saveBand(w.own[0], w.own[1], w.ref) : null;
    return {
      title: w.title, ep: w.ep, unit: w.unit,
      rows: [
        ...w.items.map(([n, v]) => ({ n, value: usdAuto(lang, v), w: Math.max(1, Math.round((v / mx) * 100)), own: false })),
        { n: w.ownN, value: w.own ? usdRange(lang, w.own[0], w.own[1]) : t("da misurare", "to be measured"), w: w.own ? Math.max(1, Math.round(((w.own[0] + w.own[1]) / 2 / mx) * 100)) : 0, own: true },
      ],
      save: save ? `${t("contro", "vs")} ${w.refN}: ${save.text}` : t("Nessun benchmark self-hosted affidabile", "No reliable self-hosted benchmark"),
      good: save?.good ?? null,
    };
  });

  return {
    sec: {
      models: { plate: t("Modelli", "Models"), title: t("Anche solo via API, i modelli open costano da metà a un sedicesimo.", "Even through the API, open models cost half to a sixteenth."), lead: t("$ per milione di token (80% input), risparmio su Sonnet 5.5.", "$ per million tokens (80% input), saving vs Sonnet 5.5.") },
      fit: { plate: t("Hardware", "Hardware"), title: t("Dove entra ogni modello", "Where each model fits"), lead: t("GPU minime per i pesi più il 10% di cache. Stima, non misura.", "Minimum GPUs for the weights plus 10% cache. Estimate, not a measurement.") },
      speed: { plate: t("Velocità", "Speed"), title: t("Da solo più veloce di Claude e Codex; sotto carico scegli il compromesso.", "Alone, faster than Claude and Codex; under load, you pick the trade-off."), lead: t("Token al secondo visti da un utente. Più sessioni, meno velocità a testa.", "Tokens per second seen by one user. More sessions, less speed each.") },
      sla: { plate: t("Capacità", "Capacity"), title: t("Scegli la velocità da garantire", "Pick the speed to guarantee"), lead: t("Sviluppatori per nodo da 8 GPU a quella velocità; ognuno genera il 30% del tempo, nodo sempre acceso.", "Developers per 8-GPU node at that speed; each generates 30% of the time, node always on.") },
      local: { plate: t("In casa", "In-house"), title: t("Cosa gira sul server Ryzen AI Max+ 495", "What runs on the Ryzen AI Max+ 495 server"), lead: t("Una sessione; misure quasi tutte da Ryzen AI Max+ 395, velocità simili.", "One session; measurements mostly from Ryzen AI Max+ 395, similar speeds.") },
      work: { plate: t("Oltre la chat", "Beyond chat"), title: t("Trascrizione, serie temporali, classificazione, voce, embedding", "Transcription, time series, classification, speech, embeddings"), lead: t("Stesso endpoint, stesse regole. API contro self-hosted dove esiste un benchmark.", "Same endpoint, same rules. API against self-hosted where a benchmark exists.") },
    },
    labels: { sessions: t("Sessioni", "Sessions"), devs: t("Sviluppatori", "Developers"), perDev: t("per sviluppatore al mese", "per developer per month"), vs: t("contro", "vs"), model: t("Modello", "Model"),
      legendExt: t("Claude e Codex (API)", "Claude and Codex (API)"), legendOwn: t("Misura self-hosted", "Self-hosted measurement"), legendPred: t("Previsione", "Forecast"),
      method: t("Previsioni interpolate tra due misure vLLM pubbliche; MI300X da misure di produzione. Con contesti lunghi le velocità scendono.", "Forecasts interpolated between two public vLLM measurements; MI300X from production measurements. Speeds drop with long contexts."),
      foot: t("Prezzi in USD di novembre 2026, da riconfermare; euro convertiti a €0,92 per $1. Fasce GPU dal neocloud più economico al più caro, spot incluso. Esclusi rete, personale, licenza Ventic e ridondanza.", "November 2026 USD prices, to be reconfirmed; euros converted at €0.92 per $1. GPU bands from cheapest to dearest neocloud, spot included. Network, staff, Ventic licence and redundancy excluded.") },
    models, hw: hw.map((h) => ({ n: h.n, mem: h.mem })), fitRows, speedRows, sla, kimiBreak, local, workloads,
    sources: [
      ["Claude, API", "https://artificialanalysis.ai/models/claude-sonnet-5-5"],
      ["Codex", "https://artificialanalysis.ai/models/comparisons/gpt-5-5-medium-vs-gpt-5-codex"],
      ["Claude Code", "https://agentsroom.dev/blog/measure-claude-code-tokens-per-second"],
      ["Kimi K3.1 Pro (vLLM)", "https://vllm.ai/blog/2026-11-04-kimi-k31-pro"],
      ["DeepSeek V4.1 Flash (vLLM)", "https://vllm.ai/blog/2026-10-23-deepseek-v41-flash-pd-wide-ep"],
      ["DeepSeek V4.1 Flash 8×B300", "https://dev.to/kbespalov/deepseek-v41-flash-on-8xb300-vllm-vs-deepinfer-600k-tokenss-3jl9"],
      ["GLM-5.3", "https://docs.z.ai/guides/llm/glm-5.3"],
      ["GLM-5.3 Flash", "https://artificialanalysis.ai/models/glm-5-3-flash"],
      ["Qwen3.8 Flash Next", "https://sleepingrobots.com/dreams/qwen38-flash-next-strix-halo/"],
      ["Ryzen AI Max+ 495", "https://llmspeed.dev/hardware/ryzen-ai-max-pro-495-192gb/"],
      [t("Prezzi GPU", "GPU prices"), "https://docs.digitalocean.com/products/droplets/details/pricing/"],
      ["B300", "https://www.ancapex.io/gpu-cloud-pricing"],
      [t("Piani Claude", "Claude plans"), "https://ai.zenken.co.jp/en/post/claude-pro-vs-max-comparison/"],
      ["Copilot", "https://benchlm.ai/github-copilot/pricing"],
      ["faster-whisper", "https://www.spheron.network/blog/faster-whisper-gpu-cloud-production-deployment-guide/"],
    ] as [string, string][],
  };
}
