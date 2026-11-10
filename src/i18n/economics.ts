import type { Lang } from "./content";

/* Economics shown on the home and on /comparison/.
   Prices checked online in November 2026 from public price lists and aggregators; USD.
   Speeds are public vLLM / llama.cpp measurements or interpolations between two of them. */

const pick = (lang: Lang) => <T,>(it: T, en: T): T => (lang === "it" ? it : en);

export const FX = 0.92;                      // EUR per USD, assumed
export const LICENCE = 299 / FX;             // Ventic licence, €299/month per company
export const BOX_EUR = 7499;                 // local server, Ryzen AI Max+ PRO 495, 192 GB
export const BOX = BOX_EUR / FX;
export const BOX_POWER = (0.12 * 730 * 0.25) / FX; // 120 W, €0.25/kWh, always on
export const DUTY = 0.3;                     // share of time a developer is generating
const blend = (i: number, o: number) => 0.8 * i + 0.2 * o; // 80% input, 20% output

/** USD per GPU-hour, cheapest to dearest neocloud seen (spot included). Provider names left out on purpose. */
export const GPU = {
  b300: { lo: 5.57, hi: 9.99 },
  mi300x: { lo: 2.35 / FX, hi: 3.39 },
  h100: { lo: 1.89 / FX, hi: 4.41 },
};

export const PLANS = [
  { key: "pro", it: "Claude Pro · ChatGPT Plus", en: "Claude Pro · ChatGPT Plus", v: 20 },
  { key: "max5", it: "Claude Max 5x · ChatGPT Pro 5x", en: "Claude Max 5x · ChatGPT Pro 5x", v: 100 },
  { key: "max20", it: "Claude Max 20x · ChatGPT Pro 20x", en: "Claude Max 20x · ChatGPT Pro 20x", v: 200 },
];

/* ───────────── team economics: plan vs API vs Ventic (cloud) vs Ventic (local servers) ───────────── */

export interface TeamOption { key: "plan" | "api" | "cloud" | "local"; capex: number; month: number; tco: (m: number) => number }

export function teamEconomics(team: number, perUser = 8, plan = 100, sessions = 2) {
  const apiDev = perUser * 10 + perUser * 4 * 2;                 // Sonnet 5.5, $2/$10
  const openDev = perUser * 5 * blend(0.3, 1.2);                 // DeepSeek V4.1 Flash, same tokens
  const devsPerBox = Math.max(1, Math.floor(sessions / DUTY));
  const boxes = Math.ceil(team / devsPerBox);
  const boxCap = 21 * Math.pow(sessions, 0.8) * 730 * 3600 / 1e6; // M generated tokens/month per server (Qwen3.8 Flash Next)
  const spill = Math.max(0, 0.9 * perUser * team - boxes * boxCap) / perUser;
  const mk = (key: TeamOption["key"], capex: number, month: number): TeamOption => ({ key, capex, month, tco: (m) => capex + month * m });
  const o = {
    plan: mk("plan", 0, plan * team),
    api: mk("api", 0, apiDev * team),
    cloud: mk("cloud", 0, team * (0.9 * openDev + 0.1 * apiDev) + LICENCE),
    local: mk("local", boxes * BOX, boxes * BOX_POWER + team * 0.1 * apiDev + spill * 0.9 * openDev + LICENCE),
  };
  const payback = (vs: TeamOption) => (vs.month > o.local.month ? o.local.capex / (vs.month - o.local.month) : Infinity);
  return {
    team, boxes, devsPerBox, options: [o.plan, o.api, o.cloud, o.local],
    cloudSave: 1 - o.cloud.tco(36) / o.plan.tco(36),
    cloudSaveApi: 1 - o.cloud.tco(36) / o.api.tco(36),
    paybackPlan: payback(o.plan),
    paybackApi: payback(o.api),
    roiLocal: (o.plan.tco(36) - o.local.tco(36)) / o.local.capex,
    boxPayback: BOX / (devsPerBox * (plan - 0.1 * apiDev) - BOX_POWER),
  };
}

export const TEAMS = [10, 20, 50, 200];

/* ───────────── formatting ───────────── */

export const fmt = (lang: Lang, n: number, d = 0) =>
  n.toLocaleString(lang === "it" ? "it-IT" : "en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
export const usd = (lang: Lang, n: number, d = 0) => "$" + fmt(lang, n, d);
const dp = (n: number) => (n < 1 ? 3 : n < 10 ? 2 : n < 100 ? 1 : 0);
export const usdAuto = (lang: Lang, n: number) => usd(lang, n, dp(n));
export const usdRange = (lang: Lang, lo: number, hi: number) =>
  Math.abs(hi - lo) < 0.005 * hi ? usdAuto(lang, lo) : `${usdAuto(lang, lo)}–${fmt(lang, hi, dp(hi))}`;
export const months = (lang: Lang, n: number) =>
  !isFinite(n) || n <= 0 ? null : n > 36 ? pick(lang)("oltre 3 anni", "over 3 years") : `${Math.ceil(n)} ${pick(lang)("mesi", "months")}`;
/** "−12% / +58%" style saving text for a cost band against a reference price. */
export function saveBand(lo: number, hi: number, ref: number) {
  const a = Math.round((1 - hi / ref) * 100), b = Math.round((1 - lo / ref) * 100);
  const s = (p: number) => (p >= 0 ? `−${p}%` : `+${-p}%`);
  return { text: a === b ? s(a) : `${s(b)} / ${s(a)}`, good: b >= 0 };
}

/* ───────────── home copy ───────────── */

export function homeEconomics(lang: Lang) {
  const t = pick(lang);
  return {
    plate: t("Il confronto economico", "The economics"),
    title: [t("Stessi agenti,", "Same agents,"), t("una frazione della spesa.", "a fraction of the spend.")] as [string, string],
    lead: t(
      "Quattro modi di dare l'AI a un team di sviluppo, con investimento, costo mensile e totale a tre anni.",
      "Four ways to give AI to a development team, with investment, monthly cost and three-year total.",
    ),
    teamLabel: t("Sviluppatori", "Developers"),
    rows: { capex: t("Investimento", "Investment"), month: t("Al mese", "Per month"), speed: t("Velocità per utente", "Speed per user"), tco: t("In 3 anni", "Over 3 years") },
    options: {
      plan: { kind: t("Oggi", "Today"), name: t("Piano Claude Max o ChatGPT Pro", "Claude Max or ChatGPT Pro plan"), speed: "89–186 tok/s" },
      api: { kind: t("Oggi", "Today"), name: t("API frontier a consumo", "Pay-per-use frontier API"), speed: "151 tok/s" },
      cloud: { kind: "Ventic", name: t("Modelli open in cloud, frontier quando serve", "Open models in the cloud, frontier when needed"), speed: t("del provider", "provider's") },
      local: { kind: "Ventic", name: t("Server locali acquistati, frontier quando serve", "Purchased local servers, frontier when needed"), speed: "21–38 tok/s" },
    },
    verdict: {
      plan: t("Prezzo fisso, con tetti di utilizzo", "Fixed price, with usage caps"),
      api: t("Nessun tetto, costo che cresce con l'uso", "No caps, cost grows with use"),
      cloud: (s: string) => t(`${s} sul piano in 3 anni, senza investimento`, `${s} vs the plan over 3 years, no investment`),
      local: (b: number, p: string | null, a: string | null) =>
        t(`${b} server · rientro ${p ? "in " + p : "oltre 3 anni"} sul piano, ${a ? "in " + a : "mai"} sull'API`,
          `${b} server${b > 1 ? "s" : ""} · payback ${p ? "in " + p : "over 3 years"} vs the plan, ${a ? "in " + a : "never"} vs the API`),
    },
    cumTitle: t("Spesa cumulata", "Cumulative spend"),
    cumMonths: t("mesi", "months"),
    foot: t(
      "8 M token generati per sviluppatore al mese, 80% input; piano da $100. Sonnet 5.5 $2/$10, DeepSeek V4.1 Flash $0,30/$1,20, server Ryzen AI Max+ 495 da 192 GB a €7.499 (6 sviluppatori ciascuno). Le opzioni Ventic tengono il 10% del traffico sul frontier e includono la licenza. Prezzi di novembre 2026, da riconfermare.",
      "8 M generated tokens per developer per month, 80% input; $100 plan. Sonnet 5.5 $2/$10, DeepSeek V4.1 Flash $0.30/$1.20, Ryzen AI Max+ 495 192 GB server at €7,499 (6 developers each). Ventic options keep 10% of traffic on the frontier and include the licence. November 2026 prices, to be reconfirmed.",
    ),
    detail: t("Confronto dettagliato: GPU, modelli e velocità", "Detailed comparison: GPUs, models and speed"),
  };
}

export function cfo(lang: Lang, e: ReturnType<typeof teamEconomics>) {
  const t = pick(lang);
  const [plan, api, cloud, local] = e.options;
  const pct = (x: number) => `${Math.round(x * 100)}%`;
  const pp = months(lang, e.paybackPlan), pa = months(lang, e.paybackApi);
  return {
    plate: t("Per il CFO", "For the CFO"),
    title: t(`Le conclusioni economiche, per ${e.team} sviluppatori`, `The economic conclusions, for ${e.team} developers`),
    points: [
      {
        k: `−${pct(e.cloudSave)}`,
        t: t("Spesa AI ridotta, senza investimento", "Lower AI spend, no investment"),
        b: t(
          `${usd(lang, cloud.tco(36))} in 3 anni contro ${usd(lang, plan.tco(36))} dei piani e ${usd(lang, api.tco(36))} dell'API. Costo operativo, variabile con l'uso.`,
          `${usd(lang, cloud.tco(36))} over 3 years against ${usd(lang, plan.tco(36))} for plans and ${usd(lang, api.tco(36))} for the API. Operating cost, variable with use.`,
        ),
      },
      {
        k: pp ?? "—",
        t: t("Server locali: un investimento che rientra", "Local servers: an investment that pays back"),
        b: t(
          `${usd(lang, local.capex)} per ${e.boxes} server. Rientro ${pp ? "in " + pp : "oltre 3 anni"} sul piano${pa ? ", in " + pa + " sull'API" : ""}; ROI a 3 anni ${pct(e.roiLocal)}. Si comprano per i dati che non devono uscire.`,
          `${usd(lang, local.capex)} for ${e.boxes} servers. Payback ${pp ? "in " + pp : "over 3 years"} vs the plan${pa ? ", in " + pa + " vs the API" : ""}; 3-year ROI ${pct(e.roiLocal)}. Bought for data that must stay in.`,
        ),
      },
      {
        k: "0",
        t: t("Sforamenti di budget", "Budget overruns"),
        b: t(
          "Ogni richiesta riserva il costo massimo prima di partire, per team e per chiave: la spesa non supera il budget approvato.",
          "Every request reserves its maximum cost before it runs, per team and per key: spend never exceeds the approved budget.",
        ),
      },
      {
        k: t("Nessun", "No"),
        t: t("lock-in sul fornitore", "vendor lock-in"),
        b: t(
          "Se un provider alza i prezzi, cambia o ritira un modello, una regola sposta il traffico. Il potere negoziale resta all'azienda.",
          "If a provider raises prices, changes or retires a model, one rule moves the traffic. Negotiating power stays with the company.",
        ),
      },
    ],
    caveat: t(
      "Quando non conviene: contro piani da $20 o con team sotto le 5 persone il risparmio sparisce. In cloud i modelli open costano meno dei server locali: il server si giustifica con la sovranità dei dati.",
      "When it does not pay: against $20 plans or with teams under 5 people the saving disappears. In the cloud, open models cost less than local servers: the server is justified by data sovereignty.",
    ),
    reco: t(
      "Raccomandazione: partire con i modelli open in cloud, senza investimento; aggiungere server locali per i flussi con dati sensibili.",
      "Recommendation: start with open models in the cloud, with no investment; add local servers for flows with sensitive data.",
    ),
  };
}

export function enable(lang: Lang) {
  const t = pick(lang);
  return {
    plate: t("Come Ventic lo rende possibile", "How Ventic makes it possible"),
    title: [t("I modelli open costano poco.", "Open models are cheap."), t("Ventic li rende usabili in azienda.", "Ventic makes them usable at work.")] as [string, string],
    items: [
      { icon: "M4 12h16M14 6l6 6-6 6", t: t("Un endpoint, client invariati", "One endpoint, unchanged clients"), b: t("Agenti di coding e app usano gli SDK OpenAI o Anthropic di sempre. Cambiare modello non tocca il codice.", "Coding agents and apps keep their OpenAI or Anthropic SDKs. Changing model never touches the code.") },
      { icon: "M4 6h16M4 12h10M4 18h6M17 14l3 4-3 4", t: t("Il frontier solo quando serve", "Frontier only when needed"), b: t("Regole per team, tipo di richiesta, PII e budget: così il 90% del traffico va sui modelli open.", "Rules by team, request type, PII and budget: that is how 90% of traffic goes to open models.") },
      { icon: "M4 4h16v16H4zM8 9l3 3-3 3M13 15h4", t: t("GPU e server con un manifest", "GPUs and servers from one manifest"), b: t("Noleggi GPU o accendi il server locale con venticli apply. Autoscaling e spegnimento fuori orario inclusi.", "Rent GPUs or bring up the local server with venticli apply. Autoscaling and off-hours shutdown included.") },
      { icon: "M3 12h14M13 7l5 5-5 5M21 4v16", t: t("Server locali senza aprire porte", "Local servers with no open ports"), b: t("L'agent si collega in uscita: niente IP pubblico né VPN. Il server in ufficio è un target come gli altri.", "The agent connects outbound: no public IP, no VPN. The office server is a target like any other.") },
      { icon: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z", t: t("Dati sensibili solo in casa", "Sensitive data stays in"), b: t("PII mascherate in modo reversibile e regole di residenza: le richieste con dati personali restano in locale.", "Reversibly masked PII and residency rules: requests with personal data stay local.") },
      { icon: "M6 11V8a6 6 0 0112 0v3M5 11h14v10H5z", t: t("Costi sotto controllo, mai fermi", "Costs in check, never down"), b: t("Budget riservato prima di ogni richiesta. Se un target è lento o giù, la regola passa al successivo.", "Budget reserved before every request. If a target is slow or down, the rule moves to the next one.") },
    ],
    server: {
      plate: t("Server AI locale · in vendita su Compud", "Local AI server · sold by Compud"),
      title: t("Ryzen AI Max+ PRO 495, 192 GB. Pronto per Ventic.", "Ryzen AI Max+ PRO 495, 192 GB. Ready for Ventic."),
      specs: [
        [t("Memoria", "Memory"), t("192 GB unificati, 273 GB/s", "192 GB unified, 273 GB/s")],
        [t("Modelli", "Models"), "Qwen3.8 Flash Next, GLM-5.3 Flash, DeepSeek V4 Flash, gpt-oss-120b"],
        [t("Velocità per utente", "Speed per user"), t("12–55 tok/s secondo il modello", "12–55 tok/s depending on model")],
      ] as [string, string][],
      price: "€7.499",
      note: (devs: number, pay: string | null) => t(
        `Listino del produttore, IVA da confermare. Circa ${devs} sviluppatori per server; rientro ${pay ? "in " + pay : "oltre 3 anni"} sul piano da $100.`,
        `Manufacturer list price, VAT to be confirmed. About ${devs} developers per server; payback ${pay ? "in " + pay : "over 3 years"} vs the $100 plan.`,
      ),
      cta: t("Richiedi il server su Compud", "Request the server from Compud"),
      href: "https://compud.it",
    },
  };
}
