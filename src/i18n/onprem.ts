import type { Lang } from "./content";

/** Pick the Italian or English string. */
export const pick = (lang: Lang) => (it: string, en: string) => (lang === "it" ? it : en);

export const TEMPLATE_URL = "https://github.com/nettersrl/ventic-provider-template";
export const LICMAN_URL = "https://licman-saas.netter.io/";

/* ───────────────────────── Under the hood: 12 capabilities ───────────────────────── */

export function hood(lang: Lang) {
  const t = pick(lang);
  return {
    id: "sotto-il-cofano",
    plate: t("Sotto il cofano", "Under the hood"),
    title: [
      t("Ogni richiesta è autorizzata,", "Every request is authorised,"),
      t("prezzata e contabilizzata.", "priced and accounted for."),
    ],
    lead: t(
      "Quello che la piattaforma fa davvero tra il tuo client e il modello: protocolli nativi, routing, privacy, contabilità e agenti remoti. Tutto dentro il tuo cluster.",
      "What the platform really does between your client and the model: native protocols, routing, privacy, accounting and remote agents. All inside your cluster.",
    ),
    cta: t("Vedi gli schemi", "See the schemes"),
    items: [
      { tag: "GATEWAY", title: t("API con protocolli nativi", "Native protocol APIs"), body: t("Chat Completions, Responses, Messages, FIM e conteggio token, più embedding, voce, trascrizione e visione.", "Chat Completions, Responses, Messages, FIM and token counting, plus embeddings, speech, transcription and vision.") },
      { tag: "ROUTING", title: "Switchyard", body: t("Sceglie il modello più adatto tra le rotte che sei autorizzato a usare, poi ordina per costo Decimal esatto.", "Picks the most suitable model among the routes you are authorised for, then ranks by exact Decimal cost.") },
      { tag: "PRIVACY", title: t("Confine PII reversibile", "Reversible PII boundary"), body: t("I dati personali diventano segnaposto prima del modello e tornano originali nello stream di risposta.", "Personal data becomes placeholders before the model and returns to the original in the response stream.") },
      { tag: "BYOK", title: t("Porta il tuo provider", "Bring your own provider"), body: t("Credenziali personali cifrate, condivisione esplicita col team e commissioni di servizio governate.", "Encrypted personal credentials, explicit sharing with your team and governed service fees.") },
      { tag: "LEDGER", title: t("Riserva, invia, liquida", "Reserve, dispatch, settle"), body: t("Un blocco limitato prima di ogni chiamata, liquidazione esatta dopo. Idempotente, nessun doppio addebito.", "A bounded hold before every call, exact settlement after. Idempotent, no double charges.") },
      { tag: "MONEY", title: t("Wallet, ricariche, fatture", "Wallets, top-ups, invoices"), body: t("Wallet di gruppo, trasferimenti, piani di allocazione, commissioni reseller, pagamento carta o bonifico e fatture.", "Group wallets, transfers, allocation schedules, reseller commissions, card or bank payment and invoices.") },
      { tag: "AGENT", title: t("Runtime remoti, nessuna porta aperta", "Remote runtimes, no open port"), body: t("Un agente Rust si connette in uscita via WSS e serve vLLM, llama.cpp, Ollama o SGLang dal tuo hardware.", "A Rust agent connects outbound over WSS and serves vLLM, llama.cpp, Ollama or SGLang from your hardware.") },
      { tag: "DATA", title: t("Export e cancellazione", "Exports and erasure"), body: t("Contenuti cifrati AES-256-GCM, export JSON, archivi chat opzionali sul tuo S3 e cancellazione dei contenuti.", "AES-256-GCM encrypted content, JSON exports, optional chat archives on your S3 and content erasure.") },
      { tag: "SERVICES", title: t("Consulenze con esperti", "Expert consultations"), body: t("Carichi un brief, ricevi un preventivo, prenoti uno slot e ricevi il report: tutto nel portale.", "Upload a brief, get a quote, book a slot and receive the report: all in the portal.") },
      { tag: "TRUST", title: t("Verifica aziendale", "Company verification"), body: t("Identità e prove aziendali verificate da un operatore prima di sbloccare pagamenti e funzioni reseller.", "Company identity and evidence reviewed by an operator before payments and reseller features unlock.") },
      { tag: "ALERTS", title: t("Notifiche e audit", "Notifications and audit"), body: t("Inbox raggruppata, email e push con ntfy, e una voce di audit per ogni modifica in console.", "Grouped inbox, email and push via ntfy, and an audit entry for every change in the console.") },
      { tag: "CLI", title: "venticli · OpenCode", body: t("Accesso da browser o device, risorse dichiarative e un catalogo con scope per i coding agent.", "Browser or device sign-in, declarative resources and a scoped catalogue for coding agents.") },
    ],
    foot: t(
      "Licenza con lease firmato (max 72 h): alla scadenza l’inferenza si ferma, mentre fatturazione, export e cancellazione restano disponibili.",
      "Signed licence lease (72 h max): on expiry inference stops, while billing, export and erasure stay available.",
    ),
  };
}

/** 160×48 micro-illustrations, one per capability card. */
export const miniArt: string[] = [
  `<g fill="none" stroke="#97958f" stroke-width="1.4"><rect x="8" y="8" width="70" height="6" rx="1"/><rect x="8" y="19" width="104" height="6" rx="1" stroke="#f5a83f"/><rect x="8" y="30" width="52" height="6" rx="1"/><rect x="8" y="41" width="86" height="4" rx="1"/></g>`,
  `<g fill="none" stroke-width="1.4"><path d="M8 24h46M54 24l30-14h60M54 24h90M54 24l30 14h60" stroke="#5c5f63"/><path d="M54 24h90" stroke="#f5a83f"/><circle cx="148" cy="24" r="4" fill="#f5a83f" stroke="none"/></g>`,
  `<g fill="none" stroke-width="1.4"><path d="M8 12h36M52 12h28M88 12h40" stroke="#5c5f63"/><rect x="48" y="9" width="36" height="7" rx="1" fill="#f5a83f" stroke="none"/><path d="M8 26h56M72 26h56" stroke="#5c5f63"/><rect x="68" y="23" width="30" height="7" rx="1" fill="#f5a83f" stroke="none"/><path d="M8 40h90" stroke="#5c5f63"/></g>`,
  `<g fill="none" stroke="#f5a83f" stroke-width="1.5"><circle cx="30" cy="24" r="10"/><path d="M40 24h46M72 24v10M82 24v7"/></g><g fill="#5c5f63"><rect x="104" y="14" width="40" height="8" rx="1"/><rect x="104" y="28" width="40" height="8" rx="1"/></g>`,
  `<g fill="none" stroke-width="1.5"><path d="M20 24h42M78 24h42" stroke="#5c5f63"/><circle cx="14" cy="24" r="6" stroke="#97958f"/><circle cx="70" cy="24" r="6" stroke="#f5a83f"/><circle cx="128" cy="24" r="6" stroke="#35cfa4" fill="#35cfa4" fill-opacity=".25"/></g>`,
  `<g fill="none" stroke="#97958f" stroke-width="1.4"><path d="M8 42V30M28 42V20M48 42V26M68 42V12" /><path d="M8 42h72" stroke="#5c5f63"/></g><circle cx="118" cy="24" r="14" fill="none" stroke="#f5a83f" stroke-width="1.5"/><path d="M112 24h12M118 18v12" stroke="#f5a83f" stroke-width="1.5"/>`,
  `<g fill="none" stroke-width="1.5"><rect x="8" y="12" width="40" height="26" rx="2" stroke="#97958f"/><rect x="112" y="12" width="40" height="26" rx="2" stroke="#97958f"/><path d="M52 25h56" stroke="#f5a83f" stroke-dasharray="4 4"/><path d="M82 8v34" stroke="#5c5f63"/></g>`,
  `<g fill="none" stroke="#97958f" stroke-width="1.4"><ellipse cx="40" cy="12" rx="26" ry="6"/><path d="M14 12v12c0 3 12 6 26 6s26-3 26-6V12M14 24v12c0 3 12 6 26 6s26-3 26-6V24"/></g><rect x="96" y="20" width="32" height="22" rx="2" fill="none" stroke="#f5a83f" stroke-width="1.5"/><path d="M104 20v-5a8 8 0 0 1 16 0v5" fill="none" stroke="#f5a83f" stroke-width="1.5"/>`,
  `<g fill="none" stroke="#97958f" stroke-width="1.4"><rect x="10" y="8" width="64" height="34" rx="2"/><path d="M10 18h64M26 8v-4M58 8v-4"/></g><g fill="#5c5f63"><rect x="16" y="24" width="8" height="6"/><rect x="32" y="24" width="8" height="6"/><rect x="48" y="24" width="8" height="6" fill="#f5a83f"/></g><path d="M96 26h48M132 18l12 8-12 8" fill="none" stroke="#35cfa4" stroke-width="1.5"/>`,
  `<path d="M20 8 44 16v14c0 7-10 11-24 14C6 41-4 37-4 30" transform="translate(30 0)" fill="none" stroke="#97958f" stroke-width="1.4"/><path d="M62 26l8 8 16-18" fill="none" stroke="#35cfa4" stroke-width="2"/><g fill="#5c5f63"><rect x="110" y="14" width="40" height="5" rx="1"/><rect x="110" y="26" width="30" height="5" rx="1"/></g>`,
  `<g fill="none" stroke="#97958f" stroke-width="1.4"><path d="M28 36h40M34 36V22a14 14 0 0 1 28 0v14"/><path d="M42 40a6 6 0 0 0 12 0"/></g><circle cx="64" cy="14" r="5" fill="#f5a83f"/><g fill="none" stroke="#5c5f63" stroke-width="1.4"><path d="M96 14h50M96 26h38M96 38h44"/></g>`,
  `<rect x="8" y="6" width="144" height="36" rx="2" fill="#101215" stroke="#32373d"/><path d="M20 18l8 6-8 6" fill="none" stroke="#f5a83f" stroke-width="1.8"/><path d="M36 32h22" stroke="#97958f" stroke-width="1.8"/><rect x="64" y="18" width="40" height="5" rx="1" fill="#5c5f63"/>`,
];

/* ───────────────────────── Schemes ───────────────────────── */

export type Tone = "n" | "a" | "j" | "d";
export interface SNode { x: number; y: number; w: number; h: number; t: string; s?: string; n?: string; tone?: Tone }
export interface SEdge { pts: [number, number][]; tone?: "w" | "a" | "j"; dash?: boolean }
export interface SLabel { x: number; y: number; text: string; anchor?: "start" | "middle" | "end"; tone?: "w" | "a" | "j" }
export interface SBand { x: number; y: number; w: number; h: number; text: string; dash?: boolean; hatch?: boolean }
export interface Scheme {
  id: string; plate: string; title: string; lead: string; w: number; h: number;
  nodes: SNode[]; edges: SEdge[]; labels?: SLabel[]; bands?: SBand[]; chips?: string[]; steps?: { k: string; t: string }[];
}

export function schemes(lang: Lang): { id: string; plate: string; title: string[]; lead: string; items: Scheme[] } {
  const t = pick(lang);

  /* 1 — request lifecycle */
  const row = (i: number) => 40 + i * 300;
  const lifecycle: Scheme = {
    id: "lifecycle", plate: t("Ciclo di una richiesta", "Request lifecycle"),
    title: t("Il successo del provider non basta a chiudere una richiesta.", "Upstream success alone does not finish a request."),
    lead: t("Il gateway completa una richiesta solo con consumi validi, liquidazione limitata e, dove serve, ripristino dei dati personali.", "The gateway only completes a request with valid usage, bounded settlement and, where required, restoration of personal data."),
    w: 1240, h: 380,
    nodes: [
      { x: row(0), y: 70, w: 220, h: 100, n: "01", t: t("Richiesta nativa", "Native request"), s: t("Chat Completions, Responses, Messages o FIM con chiave API", "Chat Completions, Responses, Messages or FIM with an API key") },
      { x: row(1), y: 70, w: 220, h: 100, n: "02", t: t("Chiave → Principal", "Key → Principal"), s: t("Tenant, wallet, modelli, limiti. Rate limit su Valkey", "Tenant, wallet, models, limits. Rate limits on Valkey") },
      { x: row(2), y: 70, w: 220, h: 100, n: "03", t: t("Policy e rotta", "Policy and route"), s: t("Licenza firmata, controlli modello, Switchyard, prezzo", "Signed licence, model controls, Switchyard, price") },
      { x: row(3), y: 70, w: 220, h: 100, n: "04", tone: "d", t: t("Sanitizza PII (opz.)", "PII sanitise (opt.)"), s: t("Segnaposto in uscita, mappa cifrata conservata", "Placeholders out, encrypted map kept") },
      { x: row(3), y: 250, w: 220, h: 100, n: "05", t: t("Riserva il massimo", "Reserve the maximum"), s: t("Blocco limitato sul wallet con impronta della richiesta", "Bounded wallet hold with a request fingerprint") },
      { x: row(2), y: 250, w: 220, h: 100, n: "06", tone: "a", t: t("Invio", "Dispatch"), s: t("Provider, GPU gestita o relay dell’agente remoto", "Provider, managed GPU or remote-agent relay") },
      { x: row(1), y: 250, w: 220, h: 100, n: "07", t: t("Valida e ripristina", "Validate and restore"), s: t("Consumi verificati, testo ripristinato nello stream", "Usage verified, text restored in the stream") },
      { x: row(0), y: 250, w: 220, h: 100, n: "08", tone: "j", t: t("Liquida e rispondi", "Settle and reply"), s: t("Costo reale nel blocco, poi risposta o evento SSE finale", "Actual cost within the hold, then the reply or final SSE event") },
    ],
    edges: [
      { pts: [[260, 120], [340, 120]] }, { pts: [[560, 120], [640, 120]] }, { pts: [[860, 120], [940, 120]] },
      { pts: [[1050, 170], [1050, 250]] },
      { pts: [[940, 300], [860, 300]], tone: "a" }, { pts: [[640, 300], [560, 300]], tone: "a" }, { pts: [[340, 300], [260, 300]], tone: "j" },
    ],
    chips: [t("Gateway → Control → PII → Billing → provider", "Gateway → Control → PII → Billing → provider"), t("L’ordine esatto varia con operazione, media e streaming", "Exact order varies with operation, media and streaming")],
  };

  /* 2 — ledger */
  const ledger: Scheme = {
    id: "ledger", plate: t("Contabilità", "Accounting"),
    title: t("Bloccato prima della chiamata. Liquidato dopo.", "Held before the call. Settled after it."),
    lead: t("Ogni richiesta è una macchina a stati: un esito ambiguo non perde mai il blocco finché non c’è prova.", "Every request is a state machine: an ambiguous outcome never loses its hold until there is evidence."),
    w: 1100, h: 380,
    nodes: [
      { x: 40, y: 70, w: 240, h: 92, t: "Reserved", s: t("Blocco limitato, ID richiesta e impronta", "Bounded hold, request ID and fingerprint") },
      { x: 430, y: 70, w: 240, h: 92, t: "Dispatched", tone: "a", s: t("Marcata prima della chiamata upstream", "Marked before the upstream call") },
      { x: 820, y: 70, w: 240, h: 92, t: "Settled", tone: "j", s: t("Consumo misurato dentro il limite", "Measured usage within the bound") },
      { x: 40, y: 250, w: 240, h: 92, t: "Released", tone: "d", s: t("Annullata, scaduta o fallimento definitivo", "Cancelled, expired or definite failure") },
      { x: 430, y: 250, w: 240, h: 92, t: "Uncertain", tone: "a", s: t("Esito ambiguo: il blocco resta", "Ambiguous outcome: the hold stays") },
    ],
    edges: [
      { pts: [[280, 116], [430, 116]] }, { pts: [[670, 116], [820, 116]], tone: "j" },
      { pts: [[160, 162], [160, 250]], dash: true }, { pts: [[550, 162], [550, 250]], tone: "a", dash: true },
      { pts: [[670, 296], [940, 296], [940, 162]], tone: "a", dash: true },
    ],
    labels: [
      { x: 172, y: 212, text: t("annulla / scade", "cancel / expire"), anchor: "start" },
      { x: 562, y: 212, text: t("incompleto", "incomplete"), anchor: "start", tone: "a" },
      { x: 805, y: 286, text: t("riconciliazione con prove", "evidence-based reconciliation"), anchor: "middle", tone: "a" },
    ],
    chips: [t("Idempotente per ID richiesta", "Idempotent by request ID"), t("Decimal esatto", "Exact Decimal"), t("Scritture bilanciate + outbox", "Balanced entries + outbox"), t("I budget delle chiavi contano i blocchi", "Key budgets count holds")],
  };

  /* 3 — PII */
  const px = (i: number) => 40 + i * 200;
  const pii: Scheme = {
    id: "pii", plate: t("Privacy", "Privacy"),
    title: t("Il modello vede segnaposto. I tuoi utenti vedono i loro dati.", "The model sees placeholders. Your users see their own data."),
    lead: t("La mappa reversibile è cifrata (AES-GCM), legata a tenant, utente e contesto, e non lascia mai il cluster.", "The reversible map is encrypted (AES-GCM), bound to tenant, user and context, and never leaves the cluster."),
    w: 1240, h: 380,
    nodes: [
      { x: px(0), y: 70, w: 160, h: 100, t: t("Testo in ingresso", "Input text"), s: t("Limitato a tenant e utente", "Scoped to tenant and user") },
      { x: px(1), y: 70, w: 160, h: 100, t: t("Detector", "Detector"), s: t("Modello approvato + pattern", "Approved model + patterns") },
      { x: px(2), y: 70, w: 160, h: 100, tone: "a", t: t("Segnaposto", "Placeholders"), s: t("<NI_…> sostituisce ogni span", "<NI_…> replaces each span") },
      { x: px(3), y: 70, w: 160, h: 100, t: t("Provider modello", "Model provider"), s: t("Non riceve mai gli originali", "Never receives the originals") },
      { x: px(4), y: 70, w: 160, h: 100, t: t("Casting dello stream", "Stream casting"), s: t("Ripristina il testo, ID di protocollo intatti", "Restores text, protocol IDs intact") },
      { x: px(5), y: 70, w: 160, h: 100, tone: "j", t: t("Client", "Client"), s: t("Output autorizzato con valori originali", "Authorised output with original values") },
      { x: 240, y: 250, w: 200, h: 90, tone: "a", t: t("Mappa cifrata", "Encrypted map"), s: t("Valkey, TTL, legata al contesto", "Valkey, TTL, bound to context") },
    ],
    edges: [
      { pts: [[200, 120], [240, 120]] }, { pts: [[400, 120], [440, 120]] }, { pts: [[600, 120], [640, 120]] },
      { pts: [[800, 120], [840, 120]] }, { pts: [[1000, 120], [1040, 120]], tone: "j" },
      { pts: [[320, 170], [320, 250]], tone: "a", dash: true },
      { pts: [[440, 295], [920, 295], [920, 170]], tone: "a", dash: true },
    ],
    labels: [{ x: 680, y: 285, text: t("mappa reversibile", "reversible mapping"), anchor: "middle", tone: "a" }],
    chips: [t("Solo testo: immagini e audio non sono anonimizzati", "Text only: images and audio are not anonymised"), t("Un controllo modello può rendere la PII obbligatoria", "A model control can make PII mandatory")],
  };

  /* 4 — remote agent */
    const agent: Scheme = {
    id: "agent", plate: "Ventic Agent",
    title: t("Le tue GPU servono le richieste. Il tuo firewall resta chiuso.", "Your GPUs serve requests. Your firewall stays shut."),
    lead: t("L’agente apre un canale WSS in uscita; le richieste tornano sullo stesso canale. Non è una shell remota.", "The agent opens an outbound WSS channel; requests return on that same channel. It is not a remote shell."),
    w: 1200, h: 270,
    bands: [{ x: 582, y: 50, w: 16, h: 150, text: "", hatch: true }],
    nodes: [
      { x: 40, y: 60, w: 200, h: 130, t: "Gateway", s: t("Richiesta autorizzata e prezzata per una rotta remota", "Authorised, priced request for a remote route") },
      { x: 330, y: 60, w: 200, h: 130, t: t("Relay di Control", "Control relay"), s: t("Frame limitati sul canale corrente dell’agente", "Bounded frames on the agent's current channel") },
      { x: 650, y: 60, w: 200, h: 130, tone: "a", t: "Rust agent", s: t("Identità legata all’installazione, aggiornamenti firmati", "Installation-bound identity, signed updates") },
      { x: 940, y: 60, w: 200, h: 130, t: t("Runtime locale", "Local runtime"), s: "vLLM · llama.cpp · Ollama · SGLang · Strata" },
    ],
    edges: [
      { pts: [[240, 100], [330, 100]] }, { pts: [[330, 150], [240, 150]], tone: "j", dash: true },
      { pts: [[530, 100], [650, 100]], tone: "a" }, { pts: [[650, 150], [530, 150]], tone: "a", dash: true },
      { pts: [[850, 100], [940, 100]] }, { pts: [[940, 150], [850, 150]], tone: "j", dash: true },
    ],
    labels: [{ x: 590, y: 222, text: t("WSS in uscita dall’agente", "outbound WSS from the agent"), anchor: "middle", tone: "a" }, { x: 590, y: 240, text: t("nessuna porta in ingresso", "no inbound port"), anchor: "middle" }],
    steps: [
      { k: "1", t: t("Un operatore crea un invito dalla console", "An operator creates an invitation in the console") },
      { k: "2", t: t("L’agente si abbina; il fingerprint è approvato", "The agent pairs; the fingerprint is approved") },
      { k: "3", t: t("Scopre i runtime e pubblica l’inventario", "It discovers runtimes and publishes the inventory") },
      { k: "4", t: t("I modelli vanno live dopo pubblicazione e controlli", "Models go live after publication and feature checks") },
    ],
  };

  /* 5 — architecture */
  const arch: Scheme = {
    id: "architecture", plate: t("Architettura", "Architecture"),
    title: t("Un’installazione, quattro namespace, un cluster tuo.", "One installation, four namespaces, one cluster you own."),
    lead: t("Il chart crea quattro namespace dedicati. Controller condivisi e storage restano prerequisiti installati separatamente.", "The chart creates four dedicated namespaces. Shared controllers and storage remain separately installed prerequisites."),
    w: 1200, h: 640,
    bands: [
      { x: 20, y: 70, w: 220, h: 390, text: t("ESTERNO", "OUTSIDE"), dash: true },
      { x: 260, y: 70, w: 200, h: 390, text: "installation-edge" },
      { x: 480, y: 70, w: 420, h: 390, text: "installation-app" },
      { x: 920, y: 70, w: 260, h: 390, text: "installation-data" },
      { x: 260, y: 490, w: 920, h: 130, text: "installation-ops" },
    ],
    nodes: [
      { x: 40, y: 110, w: 180, h: 76, t: t("Utenti e client API", "Users and API clients"), s: t("Browser, SDK, CLI", "Browser, SDKs, CLI") },
      { x: 40, y: 270, w: 180, h: 170, tone: "d", t: t("Esterni (in uscita)", "External (outbound)"), s: t("Modelli upstream, lease Licman, Stripe, SMTP, S3, agenti remoti", "Upstream models, Licman lease, Stripe, SMTP, S3, remote agents") },
      { x: 280, y: 110, w: 160, h: 76, t: "Traefik", s: t("Ingress e TLS", "Ingress and TLS") },
      { x: 280, y: 250, w: 160, h: 84, t: "WAF", s: t("Nginx + ModSecurity CRS", "Nginx + ModSecurity CRS") },
      { x: 500, y: 100, w: 180, h: 66, t: t("Portale · Docs", "Portal · Docs"), s: t("Sito marketing", "Marketing site") },
      { x: 700, y: 100, w: 180, h: 66, t: "Keycloak", s: "OIDC · SSO · MFA" },
      { x: 500, y: 186, w: 180, h: 66, tone: "a", t: "Control API", s: t("Policy, relay agenti", "Policy, agent relay") },
      { x: 700, y: 186, w: 180, h: 66, tone: "a", t: "Gateway", s: "Switchyard" },
      { x: 500, y: 272, w: 180, h: 66, t: "Billing", s: t("Ledger Decimal", "Decimal ledger") },
      { x: 700, y: 272, w: 180, h: 66, t: t("Confine PII", "PII boundary"), s: t("Mappe reversibili", "Reversible maps") },
      { x: 500, y: 358, w: 180, h: 66, tone: "d", t: "Open WebUI", s: t("+ SearXNG (opzionali)", "+ SearXNG (optional)") },
      { x: 700, y: 358, w: 180, h: 66, t: "ntfy · exporter", s: t("Push, archivi chat", "Push, chat archives") },
      { x: 940, y: 100, w: 220, h: 66, t: "PostgreSQL", s: "CloudNativePG" },
      { x: 940, y: 186, w: 220, h: 66, t: "Valkey", s: t("Rate limit, mappe PII", "Rate limits, PII maps") },
      { x: 940, y: 272, w: 220, h: 66, t: t("Object storage", "Object storage"), s: "S3" },
      { x: 940, y: 358, w: 220, h: 66, tone: "d", t: "Backup", s: "Barman WAL" },
      { x: 280, y: 520, w: 164, h: 76, t: "Reconciler", s: t("Lease, journal", "Lease, journal") },
      { x: 459, y: 520, w: 164, h: 76, t: "CronJobs + KEDA", s: t("Catalogo job fisso", "Fixed job catalogue") },
      { x: 638, y: 520, w: 164, h: 76, t: "OpenTelemetry", s: t("Coda persistente", "Persistent queue") },
      { x: 817, y: 520, w: 164, h: 76, t: "GreptimeDB", s: t("Metriche, log, trace", "Metrics, logs, traces") },
      { x: 996, y: 520, w: 164, h: 76, t: "Perses · Prometheus", s: "Dashboards" },
    ],
    edges: [
      { pts: [[220, 148], [280, 148]] },
      { pts: [[360, 186], [360, 250]] },
      { pts: [[440, 292], [470, 292], [470, 219], [500, 219]], tone: "a" },
      { pts: [[880, 130], [940, 130]] },
      { pts: [[880, 219], [940, 219]], tone: "a" },
      { pts: [[880, 305], [940, 305]] },
      { pts: [[690, 424], [690, 490]], tone: "a", dash: true },
    ],
    labels: [{ x: 700, y: 462, text: "OTLP", anchor: "start", tone: "a" }],
    chips: [t("Prerequisiti installati a parte: Traefik, cert-manager, KEDA, CloudNativePG, CNI con NetworkPolicy, StorageClass", "Installed separately as prerequisites: Traefik, cert-manager, KEDA, CloudNativePG, an enforcing CNI, StorageClass")],
  };

  return {
    id: "schemi",
    plate: t("Schemi", "Schemes"),
    title: [t("Come funziona,", "How it works,"), t("disegnato.", "drawn out.")],
    lead: t("Cinque schemi dal codice reale: dal flusso di una richiesta all’architettura Kubernetes della tua installazione.", "Five schemes from the real code: from a request’s path to the Kubernetes architecture of your installation."),
    items: [lifecycle, ledger, pii, agent, arch],
  };
}

/* ───────────────────────── On-premise install ───────────────────────── */

export interface Step { n: string; title: string; body: string; code?: string; note?: string; link?: { href: string; label: string } }

export function onprem(lang: Lang) {
  const t = pick(lang);
  const steps: Step[] = [
    {
      n: "01", title: t("Ottieni la chiave demo", "Get your demo key"),
      body: t("Registra la tua azienda su Licman, apri il prodotto Ventic, scegli On Premise e richiedi la demo. La chiave compare una sola volta: salvala in un file privato.", "Register your company on Licman, open the Ventic product, choose On Premise and request the demo. The key is shown once: save it in a private file."),
      code: `install -d -m 700 private private/staging\numask 077\n$EDITOR private/staging/license.key   # ${t("incolla la chiave", "paste the key")}`,
      link: { href: LICMAN_URL, label: t("Apri Licman", "Open Licman") },
    },
    {
      n: "02", title: t("Parti dal template", "Start from the template"),
      body: t("Usa il repository template come nuovo repository (o fai un fork) e clonalo. Contoso Ltd è fittizia: sostituirai identità, domini e artwork.", "Use the template repository as a new repository (or fork it) and clone it. Contoso Ltd is fictional: you will replace identity, domains and artwork."),
      code: `git clone git@github.com:<YOUR-ORG>/acme-provider.git\ncd acme-provider\npython3 -m venv .venv && . .venv/bin/activate\npython -m pip install -r requirements-installer.txt\nmake help`,
      link: { href: TEMPLATE_URL, label: t("Template su GitHub", "Template on GitHub") },
    },
    {
      n: "03", title: t("Scarica la release firmata", "Fetch the signed release"),
      body: t("Salva la chiave pubblica di release, ottenuta da un canale fidato indipendente, in private/release.pub. Imposta versione e origine in config/distribution.yaml, poi scarica e verifica: nessuna compilazione.", "Save the release public key, obtained through an independent trusted channel, at private/release.pub. Set version and origin in config/distribution.yaml, then fetch and verify: nothing is compiled."),
      code: `make release-fetch\nmake release-check\nVENTIC_INSTALLER="$(python scripts/binary-release.py path)"`,
      note: t("Le immagini Docker non si costruiscono: il cluster le scarica dal registry fissato nel manifest firmato.", "You never build Docker images: the cluster pulls them from the registry pinned in the signed manifest."),
    },
    {
      n: "04", title: t("Prepara il cluster", "Prepare the cluster"),
      body: t("Kubernetes 1.36 o 1.37, nodi Linux amd64, CNI con NetworkPolicy e StorageClass persistente. Installa i controller mancanti (KEDA, cert-manager, ingress, CloudNativePG, External Secrets, Reloader) e distribuisci OpenBao per i segreti.", "Kubernetes 1.36 or 1.37, Linux amd64 nodes, a NetworkPolicy-enforcing CNI and a persistent StorageClass. Install any missing controllers (KEDA, cert-manager, ingress, CloudNativePG, External Secrets, Reloader) and deploy OpenBao for secrets."),
      code: `kubectl --kubeconfig private/staging/kubeconfig --context acme-demo \\\n  get namespace kube-system -o jsonpath='{.metadata.uid}'\n\npython "$VENTIC_INSTALLER/scripts/controllers.py" \\\n  --context acme-demo --kubeconfig private/staging/kubeconfig \\\n  --cluster-uid <INSPECTED-UID> \\\n  --openbao-values config/openbao.yaml --openbao-namespace acme-credentials`,
    },
    {
      n: "05", title: t("Configura dominio e brand", "Configure domain and brand"),
      body: t("Parti da config/production.yaml e salva config/demo.yaml. Punta sei host pubblici (marketing, portal, api, docs, chat con wildcard, push) all’ingress. Il logo va in artwork/portal/.", "Start from config/production.yaml and save config/demo.yaml. Point six public hosts (marketing, portal, api, docs, chat with wildcard, push) at the ingress. Your logo goes in artwork/portal/."),
      code: `installation: acme-demo\ndomain: demo.example.org\nprofile: bundled\nlocalBuild: false\nprovider:\n  name: Acme Demo\n  support_email: support@example.org\n  terms_url: https://legal.example.org/acme/terms\n  privacy_url: https://legal.example.org/acme/privacy\npostgres:\n  instances: 1        # ${t("solo demo, senza alta disponibilità", "demo only, no high availability")}\nsettings:\n  SMTP_HOST: smtp.example.org\n  S3_BUCKET: acme-demo-data`,
    },
    {
      n: "06", title: t("Pianifica, poi installa", "Plan, then install"),
      body: t("Il piano è offline e ti elenca quello che manca. Quando è completo, Helm installa i quattro namespace e il verify controlla il rollout.", "The plan is offline and lists what is still missing. When complete, Helm installs the four namespaces and verify checks the rollout."),
      code: `make deploy-plan ENVIRONMENT=staging\nmake deploy-release ENVIRONMENT=staging\nmake deploy-verify ENVIRONMENT=staging`,
    },
    {
      n: "07", title: t("Collega un modello e prova", "Connect a model and try it"),
      body: t("Collega un endpoint approvato oppure un agente Rust sul tuo hardware, pubblica il modello, finanzia il workspace e invia la prima richiesta dal portale.", "Connect an approved endpoint or a Rust agent on your hardware, publish the model, fund the workspace and send the first request from the portal."),
      note: t("La demo non include hardware né credito di inferenza.", "The demo includes neither hardware nor inference credit."),
    },
    {
      n: "08", title: t("Passa alla licenza a pagamento", "Move to a paid licence"),
      body: t("Acquista la licenza su Licman: stessi dati, stessi servizi, stesse chiavi di cifratura. Non devi reinstallare.", "Buy the licence on Licman: same data, same services, same encryption keys. No reinstall needed."),
    },
  ];

  return {
    id: "on-premise",
    plate: t("Installa Ventic · On-premise", "Install Ventic · On-premise"),
    title: [t("Scarica Ventic.", "Download Ventic."), t("Installalo sul tuo cluster.", "Run it on your cluster.")],
    lead: t(
      "Parti dal template ufficiale, scarica la release firmata e distribuisci l’intera piattaforma sul tuo Kubernetes. Stessi servizi, stessi dati e stessa installazione prima e dopo l’acquisto.",
      "Start from the official template, fetch the signed release and deploy the whole platform on your Kubernetes. Same services, same data and same installation before and after you buy.",
    ),
    cta1: t("Apri il template su GitHub", "Open the template on GitHub"),
    cta2: t("Guida completa", "Full guide"),
    guide: t("/demo/", "/en/demo/"),
    stackTitle: t("Cosa scarichi e cosa installa", "What you pull and what it installs"),
    stack: [
      { k: t("Template", "Template"), v: t("Repository GitHub con config, artwork e Makefile", "GitHub repo with config, artwork and Makefile") },
      { k: t("Release firmata", "Signed release"), v: t("Manifest Ed25519, chart Helm, immagini OCI", "Ed25519 manifest, Helm chart, OCI images") },
      { k: t("Immagini Docker", "Docker images"), v: t("Scaricate dal cluster; mai da compilare", "Pulled by the cluster; never built") },
      { k: t("Strumenti", "Tools"), v: "Git · Python 3.12+ · Helm · kubectl" },
    ],
    steps,
    copy: t("Copia", "Copy"),
    copied: t("Copiato", "Copied"),
    needs: {
      title: t("Prima di cominciare", "Before you begin"),
      items: [
        t("Cluster Kubernetes 1.36 / 1.37 (amd64)", "Kubernetes 1.36 / 1.37 cluster (amd64)"),
        t("Un dominio e certificati TLS validi", "A domain and valid TLS certificates"),
        t("SMTP e storage compatibile S3", "SMTP and S3-compatible storage"),
        t("Accesso GitHub al template e account Licman", "GitHub access to the template and a Licman account"),
        t("Un modello raggiungibile (anche su una tua GPU)", "A reachable model (a GPU of your own works too)"),
      ],
    },
    foot: t(
      "I comandi sono tratti dalla guida alla demo e dal README del template. Non incollare mai chiavi in Git, shell history o ticket.",
      "Commands come from the demo guide and the template README. Never paste keys into Git, shell history or tickets.",
    ),
  };
}
