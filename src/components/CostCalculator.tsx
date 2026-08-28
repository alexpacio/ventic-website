import { useState, useMemo, useEffect } from "react";

// ── Catalog (mirrors Python) ──────────────────────────────────────────────
type ModelKey = "qwen3.8-27b" | "qwen3.8-flash-next" | "deepseek-v4-flash" | "deepseek-v4-pro";
const MODEL_CATALOG: Record<ModelKey, any> = {
  "qwen3.8-27b": {
    label: "Qwen3.8-27B",
    hf_id: "Qwen/Qwen3.8-27B",
    params_b: 27,
    native_ctx: 262144,
    weights_gib: { bf16: 54.0, fp8: 27.0, nvfp4: 14.0, q8: 27.0, int8: 27.0 },
    kv_mib_per_token_fp8: 0.115,
    kv_mib_per_token_nvfp4: 0.065,
    quant_preference: ["nvfp4", "fp8", "bf16"],
    min_host: { cpu_cores: 16, cpu_ram_gb: 64, disk_gb: 250, inet_mbps: 300, reliability: 0.98 },
    desc: "27B dense · 262K→1M · NVFP4 14G",
  },
  "qwen3.8-flash-next": {
    label: "Qwen3.8-Flash-Next",
    hf_id: "Qwen/Qwen3.8-Flash-Next",
    params_b: 125,
    native_ctx: 262144,
    weights_gib: { bf16: 250.0, fp8: 125.0, nvfp4: 65.0, q8: 125.0, int8: 125.0 },
    kv_mib_per_token_fp8: 0.12,
    kv_mib_per_token_nvfp4: 0.07,
    quant_preference: ["nvfp4", "fp8", "bf16"],
    min_host: { cpu_cores: 32, cpu_ram_gb: 128, disk_gb: 600, inet_mbps: 500, reliability: 0.985 },
    desc: "125B/6B MoE · NVFP4 65G · hybrid linear",
  },
  "deepseek-v4-flash": {
    label: "DeepSeek-V4-Flash (NVFP4)",
    hf_id: "nvidia/DeepSeek-V4-Flash-NVFP4",
    params_b: 284,
    native_ctx: 1048576,
    weights_gib: { bf16: 568.0, fp8: 284.0, nvfp4: 156.7, q8: 284.0, int8: 284.0 },
    kv_mib_per_token_fp8: 0.06,
    kv_mib_per_token_nvfp4: 0.03,
    quant_preference: ["nvfp4", "fp8", "bf16"],
    min_host: { cpu_cores: 32, cpu_ram_gb: 256, disk_gb: 900, inet_mbps: 800, reliability: 0.99 },
    desc: "284B/13B · NVFP4 156.7G · MLA+DSA",
  },
  "deepseek-v4-pro": {
    label: "DeepSeek-V4-Pro",
    hf_id: "deepseek-ai/DeepSeek-V4-Pro",
    params_b: 1600,
    native_ctx: 1048576,
    weights_gib: { bf16: 3200.0, fp8: 1600.0, nvfp4: 862.0, q8: 1600.0, int8: 1600.0 },
    kv_mib_per_token_fp8: 0.08,
    kv_mib_per_token_nvfp4: 0.045,
    quant_preference: ["nvfp4", "fp8"],
    min_host: { cpu_cores: 64, cpu_ram_gb: 512, disk_gb: 2000, inet_mbps: 1000, reliability: 0.99 },
    desc: "1.6T/49B · NVFP4 862G · fleet",
  },
};

const EU_COUNTRIES = new Set(["AL","AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE","CH","NO","GB","IS","UK","TR","RS","UA"]);

type GpuEntry = {
  name: string; vram_gib: number; arch: "ada"|"ampere"|"hopper"|"blackwell";
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

const BUNDLE_OPTIONS = [1,2,4,8] as const;
const FLEET_BUNDLES: Array<[number,string,number]> = [
  [2,"H200 141GB",282],[3,"H200 141GB",423],[4,"H200 141GB",564],
  [2,"B200 192GB",384],[3,"B200 192GB",576],[4,"B200 192GB",768],
  [5,"B200 192GB",960],[6,"B200 192GB",1152],[7,"B200 192GB",1344],[8,"H200 141GB",1128],[9,"B200 192GB",1728],
];

function estimateVram(model: ModelKey, ctx: number, conc: number, kv_dtype: "fp8"|"nvfp4" = "fp8") {
  const m = MODEL_CATALOG[model];
  const quant = m.quant_preference[0];
  const weights = (m.weights_gib as any)[quant];
  const kv_per = (kv_dtype==="nvfp4" || quant==="nvfp4") ? m.kv_mib_per_token_nvfp4 : m.kv_mib_per_token_fp8;
  const kv_gib = kv_per * ctx * conc / 1024;
  let overhead = 4.0 + (ctx*conc/200000)*1.5;
  if (model.includes("deepseek")) overhead+=2;
  if (model.includes("flash-next")) overhead+=1;
  const total = (weights + kv_gib + overhead)*1.08;
  return { quant, weights, kv_gib, overhead: overhead*1.08, total, kv_per };
}

function getHostReq(model: ModelKey, ctx:number, conc:number, quant:string) {
  const base = MODEL_CATALOG[model].min_host;
  const est = estimateVram(model, ctx, conc);
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

function passesLocation(gpu: GpuEntry, region: string, country: string){
  if (country) {
    const wanted = country.split(",").map(s=>s.trim().toUpperCase());
    const mapping: Record<string,string> = {ITALY:"IT",GERMANY:"DE",FRANCE:"FR",ITALIA:"IT"};
    const normalized = wanted.map(c=>mapping[c]||c);
    const code = parseCountryCode(gpu.geolocation);
    for (const w of normalized) {
      if (w.length===2) { if (code===w) return true; }
      else if (gpu.geolocation.toUpperCase().includes(w)) return true;
    }
    return false;
  }
  if (region && region!=="ANY") {
    const r = region.toUpperCase();
    const code = parseCountryCode(gpu.geolocation);
    if (r==="EU") return isEU(code);
    if (r==="US") return code==="US";
    if (r==="ANY"||r==="ALL"||r==="GLOBAL") return true;
    return code===r || gpu.geolocation.toUpperCase().includes(r);
  }
  return true;
}
function passesDatacenter(gpu:GpuEntry, dc:string){
  if (!dc || dc==="any") return true;
  const isDC = gpu.hosting_type===1;
  const w=dc.toLowerCase();
  if (["true","1","yes","datacenter","dc"].includes(w)) return isDC;
  if (["false","0","no","host","residential"].includes(w)) return !isDC;
  return true;
}
function passesAdequacy(gpu:GpuEntry, req:ReturnType<typeof getHostReq>){
  const reasons:string[]=[];
  if (gpu.cpu_ram_gb < req.cpu_ram_gb) reasons.push(`RAM ${gpu.cpu_ram_gb}GB < ${req.cpu_ram_gb}GB`);
  if (gpu.disk_gb < req.disk_gb) reasons.push(`disk ${gpu.disk_gb}GB < ${req.disk_gb}GB`);
  if (gpu.cpu_cores < req.cpu_cores) reasons.push(`cpu ${gpu.cpu_cores} < ${req.cpu_cores}`);
  if (gpu.reliability < req.reliability) reasons.push(`reliability ${gpu.reliability.toFixed(3)} < ${req.reliability}`);
  if (gpu.inet_down < req.inet_mbps) reasons.push(`inet ${gpu.inet_down} < ${req.inet_mbps}Mbps`);
  return { ok: reasons.length===0, reasons };
}

type Candidate = {
  type: string; n:number; gpu:string; arch:string; total_vram_gib:number;
  spot_dph:number; ondemand_dph:number; ventic_spot:number; ventic_ondemand:number;
  geolocation:string; hosting_type:number; reliability:number;
  cpu_cores:number; cpu_ram_gb:number; disk_gb:number; inet_down:number;
  waste:number; isFleet:boolean;
  netDownPerTB:number; netUpPerTB:number; monthlyNet:number;
  monthlyVentic:number; monthlyTotal:number; perUserMonthly:number;
};

export default function CostCalculator({ lang = "it" }: { lang?: string }){
  const [model, setModel] = useState<ModelKey>("qwen3.8-27b");
  const [context, setContext] = useState(200_000);
  const [users, setUsers] = useState(4);
  const [fascia, setFascia] = useState<"office"|"always">("office");
  const [budget, setBudget] = useState(500);
  const [region, setRegion] = useState("ANY");
  const [country, setCountry] = useState("");
  const [datacenter, setDatacenter] = useState("any");
  const [tbDown, setTbDown] = useState(10);
  const [tbUp, setTbUp] = useState(10);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [eurRate, setEurRate] = useState(0.8589);
  const [fxDate, setFxDate] = useState("2026-08-28");
  const [fxSource, setFxSource] = useState("Frankfurter (ECB)");

  // Fetch tasso giornaliero EUR/USD (Frankfurter ECB)
  useEffect(()=>{ // useEffect would be better but useMemo runs client-side after mount with client:load
    if (typeof window==="undefined") return;
    const fetchFx = async () => {
      const urls = [
        "https://api.frankfurter.app/latest?from=USD&to=EUR",
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json",
        "https://open.er-api.com/v6/latest/USD",
      ];
      for (const url of urls) {
        try {
          const res = await fetch(url, { headers: { "Accept": "application/json" } });
          if (!res.ok) continue;
          const j = await res.json();
          let rate: number | null = null;
          let date: string = new Date().toISOString().slice(0,10);
          if (j.rates && j.rates.EUR) { rate = j.rates.EUR; date = j.date || date; setFxSource("Frankfurter (ECB)"); }
          else if (j.usd && j.usd.eur) { rate = j.usd.eur; date = j.date || date; setFxSource("fawazahmed0/currency-api"); }
          else if (j.rates && j.rates.EUR) { rate = j.rates.EUR; date = j.time_last_update_utc || date; setFxSource("open.er-api.com"); }
          if (rate) { setEurRate(rate); setFxDate(date); break; }
        } catch {}
      }
    };
    fetchFx();
  }, []);

  const hoursPerMonth = fascia==="office" ? 160 : 730;
  const hoursPerDay = fascia==="office" ? 8 : 24;
  const fasciaLabel = fascia==="office" ? "8h × 20gg (160h/mese)" : "h24 7/7 (730h/mese)";

  const est = useMemo(()=> estimateVram(model, context, users), [model, context, users]);
  const hostReq = useMemo(()=> getHostReq(model, context, users, est.quant), [model, context, users, est.quant]);

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
      // Trova la migliore quantizzazione supportata da questo hardware per il modello
      const modelPrefs = MODEL_CATALOG[model].quant_preference as string[];
      // Estendi preferenze con q8 se non presente, per hardware vecchio
      const extendedPrefs = [...modelPrefs];
      if (!extendedPrefs.includes("q8")) extendedPrefs.push("q8");
      if (!extendedPrefs.includes("int8")) extendedPrefs.push("int8");
      let bestQuant: string | null = null;
      let bestEst: ReturnType<typeof estimateVram> | null = null;
      for (const q of extendedPrefs) {
        if (!quantSupport[gpu.arch]?.has(q)) continue;
        if (!(q in MODEL_CATALOG[model].weights_gib)) continue;
        const e = estimateVram(model, context, users, q as any);
        // Usa stima con questa quant
        bestQuant = q;
        bestEst = e;
        break; // prima disponibile = preferita (nvfp4 prima di q8)
      }
      if (!bestQuant || !bestEst) continue;
      if (!passesLocation(gpu, region, country)) continue;
      if (!passesDatacenter(gpu, datacenter)) continue;
      // Ricalcola hostReq per questa quant specifica (RAM/disk dipendono da pesi)
      const hostReqForGpu = getHostReq(model, context, users, bestQuant);
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
          n, gpu: gpu.name, arch: gpu.arch, total_vram_gib: totalVram,
          spot_dph: spot, ondemand_dph: gpu.ondemand_dph * n,
          ventic_spot: venticSpot, ventic_ondemand: gpu.ondemand_dph * n * 0.5,
          geolocation: gpu.geolocation, hosting_type: gpu.hosting_type, reliability: gpu.reliability,
          cpu_cores: gpu.cpu_cores, cpu_ram_gb: gpu.cpu_ram_gb, disk_gb: gpu.disk_gb, inet_down: gpu.inet_down,
          waste: totalVram - (bestEst as any).total, isFleet: false,
          netDownPerTB: gpu.inet_down_cost_per_tb, netUpPerTB: gpu.inet_up_cost_per_tb,
          monthlyNet, monthlyVentic, monthlyTotal,
          quant: bestQuant,
          perUserMonthly: monthlyTotal / users,
        } as any);
      }
    }
    // Fleet for Pro (con quant per-GPU)
    const allowFleet = model==="deepseek-v4-pro" || est.total>564;
    if (allowFleet) {
      for (const [n, gpuName, totalVram] of FLEET_BUNDLES) {
        const base = GPU_CATALOG.find(g=>g.name===gpuName);
        if (!base) continue;
        // best quant per fleet base
        const modelPrefs2 = MODEL_CATALOG[model].quant_preference as string[];
        const extPrefs2 = [...modelPrefs2]; if (!extPrefs2.includes("q8")) extPrefs2.push("q8");
        let bestQuantFleet: string | null = null;
        let bestEstFleet: ReturnType<typeof estimateVram> | null = null;
        for (const q of extPrefs2) {
          if (!quantSupport[base.arch]?.has(q)) continue;
          if (!(q in MODEL_CATALOG[model].weights_gib)) continue;
          const e = estimateVram(model, context, users, q as any);
          bestQuantFleet = q; bestEstFleet = e; break;
        }
        if (!bestQuantFleet || !bestEstFleet) continue;
        if (totalVram < bestEstFleet.total) continue;
        if (!passesLocation(base, region, country)) continue;
        if (!passesDatacenter(base, datacenter)) continue;
        const nodes = Math.ceil(n/4);
        const agg = { ...base, cpu_ram_gb: base.cpu_ram_gb*nodes, cpu_cores: base.cpu_cores*nodes, disk_gb: base.disk_gb*nodes };
        const hostReqFleet = getHostReq(model, context, users, bestQuantFleet);
        const { ok } = passesAdequacy(agg as any, hostReqFleet);
        if (!ok) continue;
        const spot = base.spot_dph * n;
        const venticSpot = spot*0.5;
        const monthlyVentic = venticSpot * hoursPerMonth;
        const monthlyNet = (base.inet_down_cost_per_tb * tbDown + base.inet_up_cost_per_tb * tbUp) * n;
        const monthlyTotal = monthlyVentic + monthlyNet;
        list.push({
          type: `${n}× ${gpuName} (fleet ${nodes} nodi)`,
          n, gpu: gpuName, arch: base.arch, total_vram_gib: totalVram,
          spot_dph: spot, ondemand_dph: base.ondemand_dph*n,
          ventic_spot: venticSpot, ventic_ondemand: base.ondemand_dph*n*0.5,
          geolocation: base.geolocation+" (fleet)", hosting_type: base.hosting_type, reliability: base.reliability,
          cpu_cores: agg.cpu_cores, cpu_ram_gb: agg.cpu_ram_gb, disk_gb: agg.disk_gb, inet_down: base.inet_down,
          waste: totalVram - bestEstFleet.total, isFleet: true,
          netDownPerTB: base.inet_down_cost_per_tb, netUpPerTB: base.inet_up_cost_per_tb,
          monthlyNet, monthlyVentic, monthlyTotal,
          perUserMonthly: monthlyTotal / users,
        } as any);
      }
    }
    list.sort((a,b)=> a.monthlyTotal - b.monthlyTotal || a.waste - b.waste);
    return list;
  }, [est, hostReq, region, country, datacenter, tbDown, tbUp, hoursPerMonth, model]);

  const affordable = candidates.filter(c=> c.monthlyTotal <= budget);
  const best = affordable[0] ?? candidates[0] ?? null;
  const overBudget = best && best.monthlyTotal > budget ? best.monthlyTotal - budget : 0;

  const fmt = (n:number, cur="$") => cur + n.toLocaleString("it-IT", { maximumFractionDigits: 0 });
  const fmtEur = (usd:number) => "€" + (usd*eurRate).toLocaleString("it-IT", { maximumFractionDigits: 0 });
  const fmtPerUser = (usd:number) => fmtEur(usd);

  return (
    <div className="border border-[#e0e0e0] bg-white">
      {/* Header */}
      <div className="bg-[#161616] text-white px-6 py-5 flex flex-wrap justify-between gap-4 items-center">
        <div>
          <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#a8a8a8]">Cost Calculator · PaaS · NVFP4 sempre quando possibile</div>
          <h2 className="text-[20px] font-semibold tracking-[-0.015em] mt-1">Quanto costa al mese — per utente e totale</h2>
        </div>
        <div className="text-right">
          <div className="font-mono text-[11px] text-[#a8a8a8]">Budget mensile</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-mono text-[13px] text-[#a8a8a8]">€</span>
            <input type="number" value={budget} onChange={e=>setBudget(Math.max(0, Number(e.target.value)||0))} className="w-[140px] bg-white text-[#161616] px-3 py-2 font-mono text-[18px] font-medium border border-[#393939] focus:outline-none focus:border-[#0f62fe]" />
            <span className="font-mono text-[11px] text-[#a8a8a8]">/mese</span>
          </div>
        </div>
      </div>

      {/* Featured MI300X — sponsorizzata */}
      {model==="deepseek-v4-flash" && (
        <div className="bg-[#fff8e1] border-y border-[#ffe082] px-6 py-4 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2">
              <span className="bg-[#ff6f00] text-white font-mono text-[11px] tracking-[0.08em] uppercase px-2 py-1">★ Offerta in evidenza — sponsorizzata</span>
              <span className="bg-[#161616] text-white font-mono text-[11px] px-2 py-1">AMD MI300X</span>
              <a href="https://github.com/ryanzhou/deepseek-v4-flash-mi300x" target="_blank" rel="noopener" className="font-mono text-[11px] underline text-[#0f62fe]">github.com/ryanzhou/deepseek-v4-flash-mi300x</a>
            </div>
            <h3 className="mt-2 text-[16px] font-semibold tracking-[-0.015em]">DeepSeek V4 Flash 0731 su singolo MI300X — validato in produzione</h3>
            <div className="mt-1.5 grid grid-cols-2 lg:grid-cols-4 gap-2 font-mono text-[11px] text-[#525252]">
              <span className="bg-white border border-[#ffe082] px-2 py-1"><b className="text-[#161616]">192GB HBM3</b> · 5.3 TB/s · 304 CUs (gfx942)</span>
              <span className="bg-white border border-[#ffe082] px-2 py-1"><b className="text-[#161616]">156.67 GiB pesi</b> in HBM · 16GB GPU KV (1.95M tok) + 96GB CPU offload</span>
              <span className="bg-white border border-[#ffe082] px-2 py-1"><b className="text-[#161616]">384K</b> validato (1M arch) · 11.69K tok/s prefill · 158.8 tok/s decode (DSpark-7)</span>
              <span className="bg-white border border-[#ffe082] px-2 py-1"><b className="text-[#161616]">FNUZ FP8</b> · fix 10 overlay SHA-256 · AITER GEMM tuning · deploy Docker Compose</span>
            </div>
            <div className="mt-2 font-mono text-[11px] text-[#6f6f6f]">Richiede 1× MI300X (192GB), ~235GB RAM host, 500GB disk. Host tipo: Xeon Platinum 8470 — 1× MI300X VM (13c / 224GB RAM / 13TB) <b className="text-[#161616]">$2.99/h</b> · 2× MI300X VM (26c / 448GB / 13TB) <b className="text-[#161616]">$5.98/h</b>. Confronto B200 192GB $2.12/h (NVFP4): MI300X costa +41% ma offre stack ROCm validato single-GPU senza fleet.</div>
          </div>
          <div className="shrink-0 text-right">
            <div className="font-mono text-[11px] uppercase text-[#525252]">Costo MI300X (fascia scelta)</div>
            {(() => {
              const mi = GPU_CATALOG.find(g=>g.name==="MI300X");
              if (!mi) return null;
              const spot = mi.spot_dph;
              const ventic = spot*0.5;
              const monthly = ventic*hoursPerMonth + mi.inet_down_cost_per_tb*tbDown + mi.inet_up_cost_per_tb*tbUp;
              const perUser = monthly/users;
              const isBest = best && best.gpu==="MI300X";
              return (
                <div className={`mt-1 border p-3 ${isBest ? "bg-[#0f62fe] text-white border-[#0f62fe]" : "bg-white border-[#ff6f00]"}`}>
                  <div className="font-mono text-[12px]">{mi.name} · {fasciaLabel}</div>
                  <div className={`text-[18px] font-light ${isBest?"text-white":"text-[#ff6f00]"}`}>€{(monthly*0.92).toFixed(0)}<span className="text-[12px] font-normal">/mese tot</span> · €{(perUser*0.92).toFixed(0)}/utente</div>
                  <div className="font-mono text-[11px] opacity-80">${spot.toFixed(2)}/h Vast · ${ventic.toFixed(2)}/h Ventic · {hoursPerMonth}h</div>
                  {isBest && <div className="mt-1 font-mono text-[11px] bg-white text-[#0f62fe] px-2 py-0.5 inline-block">✓ È la miglior soluzione entro budget</div>}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-[380px_1fr] divide-y lg:divide-y-0 lg:divide-x divide-[#e0e0e0]">
        {/* Controls */}
        <div className="p-6 space-y-6 bg-[#f4f4f4]">
          <div>
            <label className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#525252]">Modello (NVFP4 quando disponibile)</label>
            <select value={model} onChange={e=>setModel(e.target.value as ModelKey)} className="mt-2 w-full border border-[#e0e0e0] bg-white px-3 py-2.5 text-[14px] font-medium">
              {Object.entries(MODEL_CATALOG).map(([k,v])=>(
                <option key={k} value={k}>{v.label} — {v.desc}</option>
              ))}
            </select>
            <div className="mt-1.5 font-mono text-[11px] text-[#6f6f6f]">{MODEL_CATALOG[model].hf_id} · quant {est.quant} · pesi {est.weights}G</div>
          </div>

          <div>
            <label className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#525252]">Contesto per utente <span className="normal-case tracking-normal">— {context.toLocaleString("it-IT")} token</span></label>
            <input type="range" min={10000} max={1000000} step={10000} value={context} onChange={e=>setContext(Number(e.target.value))} className="mt-2 w-full accent-[#0f62fe]" />
            <div className="flex justify-between font-mono text-[11px] text-[#6f6f6f] mt-1"><span>10K</span><span>200K</span><span>1M</span></div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {[200000,500000,1000000].map(v=>(
                <button key={v} onClick={()=>setContext(v)} className={`px-2 py-1.5 border font-mono text-[12px] ${context===v ? "bg-[#0f62fe] text-white border-[#0f62fe]" : "bg-white border-[#e0e0e0] hover:bg-[#f4f4f4]"}`}>{v>=1000000?`${v/1000000}M`:`${v/1000}K`}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#525252]">Utenti concorrenti</label>
              <input type="range" min={1} max={32} step={1} value={users} onChange={e=>setUsers(Number(e.target.value))} className="mt-2 w-full accent-[#0f62fe]" />
              <div className="mt-1 font-mono text-[13px] font-medium">{users} {users===1?"utente":"utenti"} <span className="text-[#6f6f6f] font-normal">· { (context*users).toLocaleString("it-IT")} tok totali</span></div>
            </div>
            <div>
              <label className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#525252]">Fascia oraria</label>
              <div className="mt-2 grid grid-cols-2 gap-1 border border-[#e0e0e0] p-1 bg-white">
                <button onClick={()=>setFascia("office")} className={`px-2 py-2 font-mono text-[12px] leading-tight ${fascia==="office" ? "bg-[#0f62fe] text-white" : "bg-[#f4f4f4] text-[#525252] hover:bg-white"}`}>8h × 20gg<br/><span className="text-[11px] opacity-80">160h/mese</span></button>
                <button onClick={()=>setFascia("always")} className={`px-2 py-2 font-mono text-[12px] leading-tight ${fascia==="always" ? "bg-[#0f62fe] text-white" : "bg-[#f4f4f4] text-[#525252] hover:bg-white"}`}>h24 7/7<br/><span className="text-[11px] opacity-80">730h/mese</span></button>
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#6f6f6f]">{fasciaLabel}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#525252]">Regione</label>
              <select value={region} onChange={e=>setRegion(e.target.value)} className="mt-1.5 w-full border border-[#e0e0e0] bg-white px-2.5 py-2 text-[13px]">
                <option value="ANY">Any (globale)</option>
                <option value="EU">EU (33 paesi)</option>
                <option value="US">US</option>
                <option value="IT">IT</option>
                <option value="DE">DE</option>
                <option value="FR">FR</option>
              </select>
            </div>
            <div>
              <label className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#525252]">Paese specifico</label>
              <input value={country} onChange={e=>setCountry(e.target.value.toUpperCase())} placeholder="es. IT,DE" className="mt-1.5 w-full border border-[#e0e0e0] bg-white px-2.5 py-2 text-[13px] font-mono" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#525252]">Datacenter</label>
            <select value={datacenter} onChange={e=>setDatacenter(e.target.value)} className="border border-[#e0e0e0] bg-white px-2.5 py-1.5 text-[13px]">
              <option value="any">Any</option>
              <option value="true">Solo datacenter</option>
              <option value="false">Solo host</option>
            </select>
            <span className="font-mono text-[11px] text-[#6f6f6f]">(hosting_type=1)</span>
          </div>

          <div className="border border-[#e0e0e0] bg-white p-3">
            <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#525252]">Requisiti host calcolati</div>
            <div className="mt-2 font-mono text-[12px] grid grid-cols-2 gap-1 text-[#525252]">
              <span>VRAM: <b className="text-[#161616]">{est.total.toFixed(0)}G</b> <span className="text-[#6f6f6f]">({est.weights}G pesi + {est.kv_gib.toFixed(0)}G KV)</span></span>
              <span>RAM host ≥ {hostReq.cpu_ram_gb}G</span>
              <span>CPU ≥ {hostReq.cpu_cores}c</span>
              <span>Disk ≥ {hostReq.disk_gb}G</span>
              <span>inet ≥ {hostReq.inet_mbps}Mbps</span>
              <span>reliability ≥ {hostReq.reliability}</span>
            </div>
          </div>

          <div>
            <button onClick={()=>setShowAdvanced(!showAdvanced)} className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#0f62fe] underline">{showAdvanced?"Nascondi avanzate":"Avanzate (traffico rete)"}</button>
            {showAdvanced && (
              <div className="mt-3 grid grid-cols-2 gap-3 border border-[#e0e0e0] bg-white p-3">
                <div>
                  <label className="font-mono text-[11px] uppercase text-[#525252]">TB download /mese</label>
                  <input type="number" value={tbDown} onChange={e=>setTbDown(Math.max(0,Number(e.target.value)||0))} className="mt-1 w-full border border-[#e0e0e0] px-2 py-1.5 font-mono text-[13px]" />
                </div>
                <div>
                  <label className="font-mono text-[11px] uppercase text-[#525252]">TB upload /mese</label>
                  <input type="number" value={tbUp} onChange={e=>setTbUp(Math.max(0,Number(e.target.value)||0))} className="mt-1 w-full border border-[#e0e0e0] px-2 py-1.5 font-mono text-[13px]" />
                </div>
                <div className="col-span-2 font-mono text-[11px] text-[#6f6f6f]">Costo rete = down $/TB × TB + up $/TB × TB (da Vast, es. B200 $0.8↓/$1.5↑, H100 $1.2/$2.0). Sommata al TCO.</div>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="p-6">
          {!best ? (
            <div className="border border-[#e0e0e0] bg-[#fff1f1] p-6 text-center">
              <div className="font-mono text-[12px] uppercase text-[#a2191f]">Nessuna macchina soddisfa i filtri</div>
              <div className="mt-2 text-[13px] text-[#525252]">Prova ad allargare regione (ANY), togliere datacenter, o ridurre contesto/utenti.</div>
            </div>
          ) : (
            <>
              {/* Best card */}
              <div className={`border-2 p-5 ${best.monthlyTotal <= budget ? "border-[#0f62fe] bg-[#edf5ff]" : "border-[#a2191f] bg-[#fff1f1]"}`}>
                <div className="flex flex-wrap justify-between gap-2 items-start">
                  <div>
                    <div className={`font-mono text-[11px] tracking-[0.08em] uppercase ${best.monthlyTotal <= budget ? "text-[#0f62fe]" : "text-[#a2191f]"}`}>
                      {best.monthlyTotal <= budget ? "✓ Miglior soluzione entro budget" : "⚠ Fuori budget — soluzione più economica"}
                    </div>
                    <div className="mt-1 text-[18px] font-semibold tracking-[-0.015em]">{best.type} <span className="font-mono text-[11px] font-normal text-[#6f6f6f]">· {best.geolocation} · {best.hosting_type===1?"datacenter":"host"} · {best.arch}</span></div>
                    <div className="mt-1 font-mono text-[12px] text-[#525252]">{best.total_vram_gib}G VRAM · {best.cpu_cores}c/{best.cpu_ram_gb}GB RAM · {best.disk_gb}GB disk · {best.inet_down}Mbps · rel {best.reliability.toFixed(3)}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[11px] uppercase text-[#525252]">Costo Ventic (50% Vast)</div>
                    <div className="text-[13px] font-mono text-[#525252]">${best.ventic_spot.toFixed(2)}/h · ${best.spot_dph.toFixed(2)}/h Vast</div>
                    <div className="text-[11px] font-mono text-[#6f6f6f]">rete {best.netDownPerTB}$↓/{best.netUpPerTB}$↑ /TB</div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="bg-white border border-[#e0e0e0] p-3 text-center">
                    <div className="font-mono text-[11px] uppercase text-[#6f6f6f]">Totale /mese</div>
                    <div className={`mt-1 text-[22px] font-light tracking-[-0.02em] ${best.monthlyTotal <= budget ? "text-[#0f62fe]" : "text-[#a2191f]"}`}>{fmt(best.monthlyTotal)} <span className="text-[12px] text-[#6f6f6f]">({fmtEur(best.monthlyTotal)})</span></div>
                    <div className="font-mono text-[11px] text-[#525252]">{fmt(best.monthlyVentic)} GPU + {fmt(best.monthlyNet)} rete</div>
                    <div className="mt-1 font-mono text-[11px] text-[#6f6f6f]">{hoursPerMonth}h · {tbDown}TB↓ {tbUp}TB↑</div>
                  </div>
                  <div className="bg-white border border-[#e0e0e0] p-3 text-center">
                    <div className="font-mono text-[11px] uppercase text-[#6f6f6f]">Per utente /mese</div>
                    <div className="mt-1 text-[22px] font-light tracking-[-0.02em] text-[#161616]">{fmtPerUser(best.perUserMonthly)} <span className="text-[12px] text-[#6f6f6f]">({fmt(best.perUserMonthly)})</span></div>
                    <div className="font-mono text-[11px] text-[#525252]">{users} utenti · {context.toLocaleString("it-IT")} ctx</div>
                    <div className="font-mono text-[11px] text-[#525252]">{fmt(best.perUserMonthly / hoursPerMonth)}/h per utente (condiviso)</div>
                  </div>
                  <div className="bg-white border border-[#e0e0e0] p-3 text-center">
                    <div className="font-mono text-[11px] uppercase text-[#6f6f6f]">Budget</div>
                    <div className="mt-1 text-[18px] font-medium">{fmt(budget, "€")} <span className="text-[12px] font-normal text-[#6f6f6f]">({fmt(budget/eurRate)})</span></div>
                    {best.monthlyTotal <= budget ? (
                      <div className="mt-1 inline-flex bg-[#0f62fe] text-white font-mono text-[11px] px-2 py-1">Risparmi {fmt(budget - best.monthlyTotal, "€")}</div>
                    ) : (
                      <div className="mt-1 inline-flex bg-[#a2191f] text-white font-mono text-[11px] px-2 py-1">Mancano {fmt(overBudget, "€")} ({fmt(overBudget/eurRate)})</div>
                    )}
                    <div className="mt-1">
                      <div className="h-2 bg-[#e0e0e0] overflow-hidden">
                        <div className="h-full transition-all" style={{ width: `${Math.min(100, (best.monthlyTotal/budget)*100)}%`, background: best.monthlyTotal<=budget ? "#0f62fe" : "#a2191f" }} />
                      </div>
                      <div className="font-mono text-[10px] text-[#6f6f6f] mt-1">{((best.monthlyTotal/budget)*100).toFixed(0)}% budget usato</div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 font-mono text-[11px] text-[#525252] flex flex-wrap gap-2">
                  <span className="border border-[#e0e0e0] bg-white px-2 py-1">VRAM {est.total.toFixed(0)}G → {best.total_vram_gib}G ({best.waste.toFixed(0)}G liberi)</span>
                  <span className="border border-[#e0e0e0] bg-white px-2 py-1">Ventic 50% Vast · rete esclusa da dph</span>
                  <span className="border border-[#e0e0e0] bg-white px-2 py-1">1 USD ≈ {eurRate.toFixed(4)} EUR · {fxDate} · {fxSource}</span>
                </div>
              </div>

              {/* Alternatives */}
              {candidates.length>1 && (
                <div className="mt-6">
                  <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#525252]">Alternative ordinate per TCO (GPU+rete) — {candidates.length} configurazioni valide</div>
                  <div className="mt-2 border border-[#e0e0e0] overflow-x-auto">
                    <table className="w-full font-mono text-[12px] border-collapse">
                      <thead><tr className="bg-[#f4f4f4] text-[#525252]">
                        <th className="p-2 text-left border border-[#e0e0e0]">Macchina</th>
                        <th className="p-2 border border-[#e0e0e0]">VRAM</th>
                        <th className="p-2 border border-[#e0e0e0]">Geo / DC</th>
                        <th className="p-2 border border-[#e0e0e0]">Tot /mese</th>
                        <th className="p-2 border border-[#e0e0e0]">/utente/mese</th>
                        <th className="p-2 border border-[#e0e0e0]">Budget</th>
                      </tr></thead>
                      <tbody>
                        {candidates.slice(0,8).map((c, i)=>(
                          <tr key={c.type} className={`${c.gpu==="MI300X" ? "bg-[#fff8e1] border-l-4 border-l-[#ff6f00]" : ""} ${c.type===best.type ? "bg-[#edf5ff] font-medium" : c.gpu==="MI300X" ? "" : i%2===0?"bg-white":"bg-[#f9f9f9]"}`}>
                            <td className="p-2 border border-[#e0e0e0]">{c.type} <span className="text-[#6f6f6f] font-normal">· {c.arch}</span> {c.gpu==="MI300X" && <span className="ml-1 bg-[#ff6f00] text-white px-1.5 py-0.5 text-[10px] tracking-wide uppercase">★ MI300X</span>}</td>
                            <td className="p-2 border text-center border-[#e0e0e0]">{c.total_vram_gib}G</td>
                            <td className="p-2 border border-[#e0e0e0]">{c.geolocation} {c.hosting_type===1?"· dc":"· host"}</td>
                            <td className="p-2 border text-right border-[#e0e0e0]">{fmt(c.monthlyTotal)} <span className="text-[#6f6f6f]">({fmtEur(c.monthlyTotal)})</span></td>
                            <td className="p-2 border text-right border-[#e0e0e0]">{fmtEur(c.perUserMonthly)}</td>
                            <td className="p-2 border text-center border-[#e0e0e0]">{c.monthlyTotal <= budget ? <span className="bg-[#0f62fe] text-white px-2 py-0.5">OK</span> : <span className="bg-[#a2191f] text-white px-2 py-0.5">+{fmt(c.monthlyTotal - budget,"€")}</span>}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-2 font-mono text-[11px] text-[#6f6f6f]">Mostrate le 8 più economiche. Filtri: {region}/{country||"any"} · {datacenter} · {hoursPerMonth}h/mese · rete {tbDown}TB↓/{tbUp}TB↑. Usa sempre NVFP4 quando possibile (Flash NVFP4 156.7G).</div>
                </div>
              )}

              <div className="mt-4 p-3 bg-[#f4f4f4] border border-[#e0e0e0] font-mono text-[11px] text-[#525252]">
                <b>Come è calcolato:</b> VRAM = pesi({MODEL_CATALOG[model].weights_gib[MODEL_CATALOG[model].quant_preference[0]]}G) + KV {est.kv_gib.toFixed(1)}G ({est.kv_per.toFixed(3)} MiB/tok × {context.toLocaleString("it-IT")}×{users}) + overhead {est.overhead.toFixed(1)}G ×1.08 = <b>{est.total.toFixed(1)}G</b>. Host: ≥{hostReq.cpu_ram_gb}GB RAM, {hostReq.cpu_cores}c, {hostReq.disk_gb}GB disk, {hostReq.inet_mbps}Mbps, rel ≥{hostReq.reliability}. Mensile Ventic = $/h Ventic × {hoursPerMonth}h + rete ($/TB×TB). Per utente = totale / {users}.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
