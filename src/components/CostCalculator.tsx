import { useState, useMemo, useEffect } from "react";

// ── Catalog (semplificato per UI, dettagli tecnici interni) ─────────────
type ModelKey = "qwen3.8-27b" | "qwen3.8-flash-next" | "deepseek-v4-flash" | "deepseek-v4-pro";
const MODEL_CATALOG: Record<ModelKey, any> = {
  "qwen3.8-27b": {
    label: "Qwen 3.8 27B",
    subtitle: "Dense 27B · 262K contesto · ideale per chat e RAG veloci",
    params_b: 27,
    native_ctx: 262144,
    weights_gib: { bf16: 54.0, fp8: 27.0, nvfp4: 14.0, q8: 27.0, int8: 27.0 },
    kv_mib_per_token_fp8: 0.115,
    kv_mib_per_token_int8: 0.115,
    kv_mib_per_token_nvfp4: 0.065,
    quant_preference: ["nvfp4", "fp8", "bf16"],
    min_host: { cpu_cores: 16, cpu_ram_gb: 64, disk_gb: 250, inet_mbps: 300, reliability: 0.98 },
  },
  "qwen3.8-flash-next": {
    label: "Qwen 3.8 Flash Next",
    subtitle: "MoE 125B (6B attivi) · hybrid linear attention · 262K → 1M YaRN",
    params_b: 125,
    native_ctx: 262144,
    weights_gib: { bf16: 250.0, fp8: 125.0, nvfp4: 65.0, q8: 125.0, int8: 125.0 },
    kv_mib_per_token_fp8: 0.12,
    kv_mib_per_token_int8: 0.12,
    kv_mib_per_token_nvfp4: 0.07,
    quant_preference: ["nvfp4", "fp8", "bf16"],
    min_host: { cpu_cores: 32, cpu_ram_gb: 128, disk_gb: 600, inet_mbps: 500, reliability: 0.985 },
  },
  "deepseek-v4-flash": {
    label: "DeepSeek V4 Flash",
    subtitle: "MoE 284B (13B attivi) · MLA + DSA · 1M contesto · alta efficienza",
    params_b: 284,
    native_ctx: 1048576,
    weights_gib: { bf16: 568.0, fp8: 284.0, nvfp4: 156.7, q8: 284.0, int8: 284.0 },
    kv_mib_per_token_fp8: 0.06,
    kv_mib_per_token_int8: 0.06,
    kv_mib_per_token_nvfp4: 0.03,
    quant_preference: ["nvfp4", "fp8", "bf16"],
    min_host: { cpu_cores: 32, cpu_ram_gb: 256, disk_gb: 900, inet_mbps: 800, reliability: 0.99 },
  },
  "deepseek-v4-pro": {
    label: "DeepSeek V4 Pro",
    subtitle: "MoE 1.6T (49B attivi) · 1M contesto · frontier, su richiesta",
    params_b: 1600,
    native_ctx: 1048576,
    weights_gib: { bf16: 3200.0, fp8: 1600.0, nvfp4: 862.0, q8: 1600.0, int8: 1600.0 },
    kv_mib_per_token_fp8: 0.08,
    kv_mib_per_token_int8: 0.08,
    kv_mib_per_token_nvfp4: 0.045,
    quant_preference: ["nvfp4", "fp8"],
    min_host: { cpu_cores: 64, cpu_ram_gb: 512, disk_gb: 2000, inet_mbps: 1000, reliability: 0.99 },
  },
};


// ── Benchmark throughput reali (ricerca internet, non esposti come hardware) ─
// Fonte: FlashRT RTX5090 121-145 tok/s @256K (qwen27b), syv-ai RTX3090 114 tok/s single / 1000 tok/s @64conc,
// Baseten H200 45 tok/s per user / 1400 tok/s tot, SoftReviewed Flash-Next 195 tok/s,
// NVIDIA GB300 16K tok/s per GPU / 200 tok/s per user (Flash-Next), eric8810 2x RTX PRO 6000 200-227 tok/s single (DS Flash),
// DGX Spark 50-60 tok/s (DS Flash), GB200 DeepSeek Pro >150 tok/s per user
const MODEL_BENCH: Record<ModelKey, { single_tps: number; total_tps: number; label: string }> = {
  "qwen3.8-27b": { single_tps: 120, total_tps: 1400, label: "~120 tok/s per utente" },
  "qwen3.8-flash-next": { single_tps: 195, total_tps: 4000, label: "~195 tok/s per utente" },
  "deepseek-v4-flash": { single_tps: 200, total_tps: 2200, label: "~200 tok/s per utente" },
  "deepseek-v4-pro": { single_tps: 150, total_tps: 1600, label: "~150 tok/s per utente" },
};

function getOverbookingFactor(model: ModelKey, users: number, desiredTps: number): number {
  const b = MODEL_BENCH[model];
  // Base su velocità desiderata vs velocità singola del modello (benchmark reali)
  let f = 0.60 + 0.40 * (desiredTps / Math.max(1, b.single_tps));
  // Più utenti contemporanei = meno margine di condivisione KV
  f += Math.max(0, users - 4) * 0.015;
  // Se la banda totale richiesta supera la capacità aggregata, niente overbooking
  if (users * desiredTps > b.total_tps * 0.9) f = 1.0;
  return Math.min(1.0, Math.max(0.60, f));
}

function getDiskOffloadFactor(users: number, fascia: "office"|"always"): number {
  // Contesti inattivi → KV salvata su RAM/NVMe e liberata dalla VRAM
  // office: molti idle fuori orario, sempre attivo: più concorrenza reale
  // Più spazi = più probabilità che una parte sia parcheggiata su disco
  const base = fascia === "office" ? 0.55 : 0.80;
  // con pochi utenti l'effetto è minore (tutti attivi), con tanti cresce
  const scale = users <= 4 ? 1.0 : users <= 8 ? 0.92 : 0.85;
  return Math.min(1.0, base * scale + (1 - scale) * 0.3);
}

const EU_COUNTRIES = new Set(["AL","AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE","CH","NO","GB","IS","UK","TR","RS","UA"]);

type GpuEntry = {
  name: string; vram_gib: number; arch: "ada"|"ampere"|"hopper"|"blackwell"|"mi300x";
  spot_dph: number; ondemand_dph: number;
  cpu_cores: number; cpu_ram_gb: number; disk_gb: number;
  reliability: number; inet_down: number; inet_up: number;
  hosting_type: 0|1; geolocation: string; verification: string;
  inet_down_cost_per_tb: number; inet_up_cost_per_tb: number;
};

const GPU_CATALOG: GpuEntry[] = [
  { name: "RTX 4090", vram_gib: 24, arch: "ada", spot_dph: 0.35, ondemand_dph: 0.60, cpu_cores: 16, cpu_ram_gb: 64, disk_gb: 500, reliability: 0.985, inet_down: 600, inet_up: 400, hosting_type: 0, geolocation: "Milan, IT", verification: "verified", inet_down_cost_per_tb: 2.5, inet_up_cost_per_tb: 4.0 },
  { name: "L40S", vram_gib: 48, arch: "ada", spot_dph: 0.55, ondemand_dph: 1.05, cpu_cores: 24, cpu_ram_gb: 128, disk_gb: 800, reliability: 0.99, inet_down: 1000, inet_up: 800, hosting_type: 1, geolocation: "Frankfurt, DE", verification: "verified", inet_down_cost_per_tb: 2.0, inet_up_cost_per_tb: 3.5 },
  { name: "A100 80GB", vram_gib: 80, arch: "ampere", spot_dph: 0.70, ondemand_dph: 1.10, cpu_cores: 32, cpu_ram_gb: 256, disk_gb: 1000, reliability: 0.992, inet_down: 1000, inet_up: 1000, hosting_type: 1, geolocation: "Paris, FR", verification: "verified", inet_down_cost_per_tb: 1.5, inet_up_cost_per_tb: 2.5 },
  { name: "H100 80GB", vram_gib: 80, arch: "hopper", spot_dph: 1.22, ondemand_dph: 1.70, cpu_cores: 32, cpu_ram_gb: 256, disk_gb: 1000, reliability: 0.993, inet_down: 2000, inet_up: 2000, hosting_type: 1, geolocation: "Milan, IT", verification: "verified", inet_down_cost_per_tb: 1.2, inet_up_cost_per_tb: 2.0 },
  { name: "H200 141GB", vram_gib: 141, arch: "hopper", spot_dph: 1.90, ondemand_dph: 3.40, cpu_cores: 48, cpu_ram_gb: 512, disk_gb: 1800, reliability: 0.994, inet_down: 2500, inet_up: 2500, hosting_type: 1, geolocation: "Frankfurt, DE", verification: "verified", inet_down_cost_per_tb: 1.0, inet_up_cost_per_tb: 1.8 },
  { name: "B200 192GB", vram_gib: 192, arch: "blackwell", spot_dph: 2.12, ondemand_dph: 4.50, cpu_cores: 64, cpu_ram_gb: 1024, disk_gb: 2500, reliability: 0.995, inet_down: 4000, inet_up: 4000, hosting_type: 1, geolocation: "Milan, IT", verification: "verified", inet_down_cost_per_tb: 0.8, inet_up_cost_per_tb: 1.5 },
  { name: "RTX PRO 6000", vram_gib: 96, arch: "blackwell", spot_dph: 1.20, ondemand_dph: 1.80, cpu_cores: 32, cpu_ram_gb: 256, disk_gb: 1200, reliability: 0.99, inet_down: 1500, inet_up: 1200, hosting_type: 0, geolocation: "Milan, IT", verification: "verified", inet_down_cost_per_tb: 2.0, inet_up_cost_per_tb: 3.0 },
  { name: "GB200 NVL72", vram_gib: 192, arch: "blackwell", spot_dph: 6.00, ondemand_dph: 9.00, cpu_cores: 96, cpu_ram_gb: 2048, disk_gb: 4000, reliability: 0.997, inet_down: 8000, inet_up: 8000, hosting_type: 1, geolocation: "Frankfurt, DE", verification: "verified", inet_down_cost_per_tb: 0.5, inet_up_cost_per_tb: 1.0 },
  { name: "MI300X", vram_gib: 192, arch: "mi300x", spot_dph: 2.99, ondemand_dph: 2.99, cpu_cores: 13, cpu_ram_gb: 224, disk_gb: 13312, reliability: 0.992, inet_down: 2000, inet_up: 2000, hosting_type: 1, geolocation: "Frankfurt, DE", verification: "verified", inet_down_cost_per_tb: 1.2, inet_up_cost_per_tb: 2.0 },
];

const BUNDLE_OPTIONS = [1,2,3,4,6,8] as const;
const FLEET_BUNDLES: Array<[number,string,number]> = [
  [2,"H200 141GB",282],[3,"H200 141GB",423],[4,"H200 141GB",564],
  [2,"B200 192GB",384],[3,"B200 192GB",576],[4,"B200 192GB",768],
  [5,"B200 192GB",960],[6,"B200 192GB",1152],[7,"B200 192GB",1344],[8,"H200 141GB",1128],[9,"B200 192GB",1728],
];

// ── Costanti ottimizzazioni interne (non esposte in UI) ───────────────
// OVERBOOKING_FACTOR ora dinamico via getOverbookingFactor()

function estimateVram(model: ModelKey, ctx: number, conc: number, kv_dtype: "fp8"|"int8"|"nvfp4" = "fp8", fascia: "office"|"always" = "office") {
  const m = MODEL_CATALOG[model];
  const quant = m.quant_preference[0];
  const weights = (m.weights_gib as any)[quant];
  // KV cache 8-bit: fp8 e int8 sono entrambi 1 byte/token; nvfp4 è 4-bit (~56% di fp8)
  const kv_per_raw = (kv_dtype==="nvfp4" || quant==="nvfp4") ? m.kv_mib_per_token_nvfp4 : (m.kv_mib_per_token_int8 ?? m.kv_mib_per_token_fp8);
  const kv_gib_raw = kv_per_raw * ctx * conc / 1024;
  const desiredTps = 40; // fisso interno, non esposto in UI
  const overbooking = getOverbookingFactor(model, conc, desiredTps);
  const diskFactor = getDiskOffloadFactor(conc, fascia);
  const kv_gib = kv_gib_raw * overbooking * diskFactor;
  let overhead = 4.0 + (ctx*conc/200000)*1.5;
  if (model.includes("deepseek")) overhead+=2;
  if (model.includes("flash-next")) overhead+=1;
  const total = (weights + kv_gib + overhead)*1.08;
  return { quant, weights, kv_gib, overhead: overhead*1.08, total, kv_per: kv_per_raw };
}

function getHostReq(model: ModelKey, ctx:number, conc:number, quant:string, fascia: "office"|"always" = "office") {
  const base = MODEL_CATALOG[model].min_host;
  const est = estimateVram(model, ctx, conc, "fp8", fascia);
  return {
    cpu_ram_gb: Math.max(base.cpu_ram_gb, Math.round(est.weights*1.2 + est.kv_gib*0.6 + 32)),
    cpu_cores: Math.max(base.cpu_cores, 8 + conc*4),
    disk_gb: Math.max(base.disk_gb, Math.round(est.weights*2.5 + 120)),
    inet_mbps: base.inet_mbps,
    reliability: base.reliability,
  };
}

function parseCountryCode(geo:string) {
  if (!geo) return "";
  const parts = geo.split(",");
  if (parts.length>=2) return parts[parts.length-1].trim().toUpperCase();
  return geo.trim().toUpperCase().slice(0,2);
}
function isEU(code:string){ return EU_COUNTRIES.has(code.toUpperCase()); }

function passesLocation(gpu: GpuEntry, region: string){
  if (!region || region==="ANY") return true;
  const code = parseCountryCode(gpu.geolocation);
  if (region==="EU") return isEU(code);
  return true;
}
function passesAdequacy(gpu:GpuEntry, req:ReturnType<typeof getHostReq>){
  if (gpu.cpu_ram_gb < req.cpu_ram_gb) return { ok: false, reasons: ["ram"] };
  if (gpu.disk_gb < req.disk_gb) return { ok: false, reasons: ["disk"] };
  if (gpu.cpu_cores < req.cpu_cores) return { ok: false, reasons: ["cpu"] };
  if (gpu.reliability < req.reliability) return { ok: false, reasons: ["reliability"] };
  if (gpu.inet_down < req.inet_mbps) return { ok: false, reasons: ["inet"] };
  return { ok: true, reasons: [] as string[] };
}

type Candidate = {
  type: string; n:number; gpu:string; total_vram_gib:number;
  monthlyTotal:number; perUserMonthly:number;
};

export default function CostCalculator({ lang = "it" }: { lang?: string }){
  const [model, setModel] = useState<ModelKey>("qwen3.8-27b");
  const [context, setContext] = useState(200_000);
  const [users, setUsers] = useState(4);
  const [fascia, setFascia] = useState<"office"|"always">("office");


  // defaults interni non esposti
  const region = "EU";
  const tbDown = 2;
  const tbUp = 2;

  const [eurRate, setEurRate] = useState(0.8589);

  useEffect(()=>{
    if (typeof window==="undefined") return;
    const fetchFx = async () => {
      const urls = [
        "https://api.frankfurter.app/latest?from=USD&to=EUR",
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json",
      ];
      for (const url of urls) {
        try {
          const res = await fetch(url, { headers: { "Accept": "application/json" } });
          if (!res.ok) continue;
          const j = await res.json();
          let rate: number | null = null;
          if (j.rates && j.rates.EUR) rate = j.rates.EUR;
          else if (j.usd && j.usd.eur) rate = j.usd.eur;
          if (rate) { setEurRate(rate); break; }
        } catch {}
      }
    };
    fetchFx();
  }, []);

  const hoursPerMonth = fascia==="office" ? 160 : 730;
  const fasciaLabel = fascia==="office" ? "Ufficio · 8h × 20gg" : "Sempre attivo · h24 7/7";

  const est = useMemo(()=> estimateVram(model, context, users, "fp8", fascia), [model, context, users, fascia]);

  const candidates: Candidate[] = useMemo(()=>{
    const quantSupport: Record<string, Set<string>> = {
      mi300x: new Set(["bf16","fp8","q8","int8","awq4","nvfp4"]),
      ada: new Set(["bf16","awq4","int4","q8","int8"]),
      ampere: new Set(["bf16","int8","q8","fp8"]),
      hopper: new Set(["bf16","fp8","int8","q8","awq4"]),
      blackwell: new Set(["bf16","fp8","nvfp4","mxfp4","mxfp8","awq4","int4","int8","q8"]),
    };
    const list: Candidate[] = [];
    for (const gpu of GPU_CATALOG) {
      const modelPrefs = MODEL_CATALOG[model].quant_preference as string[];
      const extendedPrefs = [...modelPrefs];
      if (!extendedPrefs.includes("q8")) extendedPrefs.push("q8");
      if (!extendedPrefs.includes("int8")) extendedPrefs.push("int8");
      let bestQuant: string | null = null;
      let bestEst: ReturnType<typeof estimateVram> | null = null;
      for (const q of extendedPrefs) {
        if (!quantSupport[gpu.arch]?.has(q)) continue;
        if (!(q in MODEL_CATALOG[model].weights_gib)) continue;
        const e = estimateVram(model, context, users, q as any, fascia);
        bestQuant = q;
        bestEst = e;
        break;
      }
      if (!bestQuant || !bestEst) continue;
      if (!passesLocation(gpu, region)) continue;
      const hostReqForGpu = getHostReq(model, context, users, bestQuant, fascia);
      const { ok } = passesAdequacy(gpu, hostReqForGpu);
      if (!ok) continue;
      for (const n of BUNDLE_OPTIONS) {
        const totalVram = gpu.vram_gib * n;
        if (totalVram < (bestEst as any).total) continue;
        const spot = gpu.spot_dph * n;
        const venticSpot = spot * 0.5;
        const monthlyVentic = venticSpot * hoursPerMonth;
        const monthlyNet = gpu.inet_down_cost_per_tb * tbDown + gpu.inet_up_cost_per_tb * tbUp;
        const monthlyTotal = monthlyVentic + monthlyNet;
        list.push({
          type: `${n}× ${gpu.name}`,
          n, gpu: gpu.name, total_vram_gib: totalVram,
          monthlyTotal,
          perUserMonthly: monthlyTotal / users,
        } as any);
      }
    }
    const allowFleet = model==="deepseek-v4-pro" || est.total>564;
    if (allowFleet) {
      for (const [n, gpuName, totalVram] of FLEET_BUNDLES) {
        const base = GPU_CATALOG.find(g=>g.name===gpuName);
        if (!base) continue;
        const modelPrefs2 = MODEL_CATALOG[model].quant_preference as string[];
        const extPrefs2 = [...modelPrefs2]; if (!extPrefs2.includes("q8")) extPrefs2.push("q8");
        let bestQuantFleet: string | null = null;
        let bestEstFleet: ReturnType<typeof estimateVram> | null = null;
        for (const q of extPrefs2) {
          if (!quantSupport[base.arch]?.has(q)) continue;
          if (!(q in MODEL_CATALOG[model].weights_gib)) continue;
          const e = estimateVram(model, context, users, q as any, fascia);
          bestQuantFleet = q; bestEstFleet = e; break;
        }
        if (!bestQuantFleet || !bestEstFleet) continue;
        if (totalVram < bestEstFleet.total) continue;
        if (!passesLocation(base, region)) continue;
        const nodes = Math.ceil(n/4);
        const agg = { ...base, cpu_ram_gb: base.cpu_ram_gb*nodes, cpu_cores: base.cpu_cores*nodes, disk_gb: base.disk_gb*nodes };
        const hostReqFleet = getHostReq(model, context, users, bestQuantFleet, fascia);
        const { ok } = passesAdequacy(agg as any, hostReqFleet);
        if (!ok) continue;
        const spot = base.spot_dph * n;
        const venticSpot = spot*0.5;
        const monthlyVentic = venticSpot * hoursPerMonth;
        const monthlyNet = (base.inet_down_cost_per_tb * tbDown + base.inet_up_cost_per_tb * tbUp) * n;
        const monthlyTotal = monthlyVentic + monthlyNet;
        list.push({
          type: `${n}× ${gpuName} · soluzione multi-nodo`,
          n, gpu: gpuName, total_vram_gib: totalVram,
          monthlyTotal,
          perUserMonthly: monthlyTotal / users,
        } as any);
      }
    }
    list.sort((a,b)=> a.monthlyTotal - b.monthlyTotal);
    return list;
  }, [est, model, context, users, hoursPerMonth, fascia]);

  const best = candidates[0] ?? null;

  const fmtEur = (usd:number) => "€" + (usd*eurRate).toLocaleString("it-IT", { maximumFractionDigits: 0 });

  return (
    <div className="border border-[#e0e0e0] bg-white overflow-hidden">
      {/* Header semplificato */}
      <div className="bg-[#161616] text-white px-6 py-6">
        <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#a8a8a8]">Calcolatore costi · hosting gestito in EU</div>
        <h2 className="text-[22px] font-semibold tracking-[-0.015em] mt-1">Quanto costa il tuo AI privato?</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-[#a8a8a8] max-w-[60ch]">Scegli modello, contesto e utenti. Ti mostriamo subito il costo mensile — per utente e totale. Nessun dettaglio hardware, solo il prezzo.</p>
      </div>

      <div className="grid lg:grid-cols-[380px_1fr] divide-y lg:divide-y-0 lg:divide-x divide-[#e0e0e0]">
        {/* Controls — solo ciò che serve */}
        <div className="p-6 space-y-7 bg-[#f4f4f4]">
          <div>
            <label className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#525252]">Modello</label>
            <select value={model} onChange={e=>setModel(e.target.value as ModelKey)} className="mt-2 w-full border border-[#e0e0e0] bg-white px-3 py-2.5 text-[14px] font-medium">
              {Object.entries(MODEL_CATALOG).map(([k,v])=>(
                <option key={k} value={k}>{v.label} — {v.subtitle}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#525252]">Contesto per utente <span className="normal-case tracking-normal text-[#6f6f6f]">— {context.toLocaleString("it-IT")} token</span></label>
            <input type="range" min={10000} max={1000000} step={10000} value={context} onChange={e=>setContext(Number(e.target.value))} className="mt-3 w-full accent-[#0f62fe]" />
            <div className="flex justify-between font-mono text-[11px] text-[#6f6f6f] mt-1"><span>10K</span><span>200K</span><span>1M</span></div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { v: 50000, l: "Breve" },
                { v: 200000, l: "Medio" },
                { v: 1000000, l: "Lungo" },
              ].map(({v,l})=>(
                <button key={v} onClick={()=>setContext(v)} className={`px-2 py-2 border font-mono text-[12px] leading-tight ${context===v ? "bg-[#0f62fe] text-white border-[#0f62fe]" : "bg-white border-[#e0e0e0] hover:bg-white"}`}>
                  <span className="block font-medium">{l}</span><span className="text-[11px] opacity-80">{v>=1000000?`${v/1000000}M`:`${v/1000}K`}</span>
                </button>
              ))}
            </div>
            <div className="mt-2 font-mono text-[11px] text-[#6f6f6f]">Quanto deve ricordare ogni conversazione.</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#525252]">Utenti contemporanei <span className="normal-case tracking-normal text-[#6f6f6f]">({users} spazi)</span></label>
              <input type="range" min={1} max={32} step={1} value={users} onChange={e=>setUsers(Number(e.target.value))} className="mt-2 w-full accent-[#0f62fe]" />
              <div className="mt-2 font-mono text-[13px] font-medium">{users} {users===1?"utente":"utenti"} <span className="font-normal text-[#6f6f6f]">· { (context*users).toLocaleString("it-IT")} token totali</span></div>
              <div className="mt-1 font-mono text-[11px] text-[#6f6f6f]">Spazi concorrenti richiesti</div>
            </div>
            <div>
              <label className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#525252]">Utilizzo</label>
              <div className="mt-2 grid grid-cols-1 gap-1 border border-[#e0e0e0] p-1 bg-white">
                <button onClick={()=>setFascia("office")} className={`px-3 py-2 font-mono text-[12px] leading-tight text-left ${fascia==="office" ? "bg-[#0f62fe] text-white" : "bg-[#f4f4f4] text-[#525252] hover:bg-white"}`}>
                  <span className="font-medium">Orario d’ufficio</span><span className="block text-[11px] opacity-80">8h × 20gg · 160h/mese</span>
                </button>
                <button onClick={()=>setFascia("always")} className={`px-3 py-2 font-mono text-[12px] leading-tight text-left ${fascia==="always" ? "bg-[#0f62fe] text-white" : "bg-[#f4f4f4] text-[#525252] hover:bg-white"}`}>
                  <span className="font-medium">Sempre attivo</span><span className="block text-[11px] opacity-80">h24 7/7 · 730h/mese</span>
                </button>
              </div>
            </div>
          </div>



          <div className="font-mono text-[11px] leading-relaxed text-[#6f6f6f] border-t border-[#e0e0e0] pt-4">
            Dati in EU. Hosting gestito incluso. Prezzi aggiornati giornalmente.
          </div>
        </div>

        {/* Results — solo prezzo */}
        <div className="p-6 bg-white">
          {!best ? (
            <div className="border border-[#e0e0e0] bg-[#fff1f1] p-6 text-center">
              <div className="font-mono text-[12px] uppercase text-[#a2191f]">Nessuna soluzione disponibile</div>
              <div className="mt-2 text-[13px] text-[#525252]">Prova a ridurre contesto o numero di utenti.</div>
            </div>
          ) : (
            <>
              <div className="border-2 p-6 border-[#0f62fe] bg-[#edf5ff]">
                <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#0f62fe]">
                  ✓ Consigliato per te
                </div>
                <div className="mt-2 text-[13px] text-[#525252]">{MODEL_CATALOG[model].label} · {fasciaLabel} · {users} {users===1?"utente":"utenti"}</div>

                <div className="mt-5 grid sm:grid-cols-2 gap-4">
                  <div className="bg-white border border-[#e0e0e0] p-4 text-center">
                    <div className="font-mono text-[11px] uppercase tracking-wide text-[#6f6f6f]">Totale al mese</div>
                    <div className="mt-2 text-[28px] font-light tracking-[-0.02em] text-[#0f62fe]">{fmtEur(best.monthlyTotal)}</div>
                    <div className="font-mono text-[11px] text-[#6f6f6f]">IVA esclusa · hosting gestito incluso</div>
                  </div>
                  <div className="bg-white border border-[#e0e0e0] p-4 text-center">
                    <div className="font-mono text-[11px] uppercase tracking-wide text-[#6f6f6f]">Per utente al mese</div>
                    <div className="mt-2 text-[28px] font-light tracking-[-0.02em] text-[#161616]">{fmtEur(best.perUserMonthly)}</div>
                    <div className="font-mono text-[11px] text-[#6f6f6f]">{users} utenti · {context.toLocaleString("it-IT")} token ciascuno</div>
                  </div>
                </div>


              </div>



              <div className="mt-6 p-3 bg-[#f4f4f4] border border-[#e0e0e0] font-mono text-[11px] leading-relaxed text-[#525252]">
                Stima realistica con ottimizzazioni di memoria integrate. Include hosting gestito EU. Contattaci per un preventivo su misura.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
