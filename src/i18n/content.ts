/* Site copy, IT + EN. One structure, two dictionaries. */

export const languages = { it: "Italiano", en: "English" } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = "it";

export type Mark = "yes" | "no" | "dash";
export interface Cell {
  mark: Mark;
  text: string;
}

const it = {
  seo: {
    home: {
      title: "Ventic — AI privata su GPU dedicate",
      desc: "Da una VM o un bare metal con GPU grezze a un endpoint privato compatibile OpenAI e Anthropic. Chiavi in mano: modelli open-weight, vLLM tunato sul tuo hardware, assistenza continuativa.",
    },
    pricing: {
      title: "Prezzi e confronto — Ventic",
      desc: "BYOH a 80 €/h di consulenza, pacchetti PaaS da 1 €/h tutto incluso. Costi per utente e confronto con subscription e pagamento a token.",
    },
    adminPanel: {
      title: "Admin panel Ventic — utenti, ruoli, modelli, white label",
      desc: "Come funziona il pannello di amministrazione di Ventic: utenti e accessi, RBAC per endpoint, gestione modelli e scaling, wiring RAG e harness agentici, white label multi-tenant.",
    },
  },

  nav: {
    links: [
      { label: "Perché", href: "/#perche" },
      { label: "Come funziona", href: "/#come-funziona" },
      { label: "Architettura", href: "/#stack" },
      { label: "Modelli", href: "/#modelli" },
      { label: "Admin panel", href: "/admin-panel" },
      { label: "Prezzi", href: "/pricing" },
    ],
    cta: "Prenota una call",
    skip: "Vai al contenuto",
    langLabel: "Lingua",
  },

  hero: {
    plate: "Inferenza privata · GPU dedicate · UE / US",
    title: ["La tua AI.", "Privata,", "sotto il tuo controllo."],
    lead: "Da una VM o un bare metal con GPU grezze a un endpoint compatibile OpenAI e Anthropic, con la piattaforma per rilasciarlo ai tuoi utenti aziendali: ruoli, accessi, RBAC. Chiavi in mano: modelli open-weight allo stato dell'arte, vLLM tunato sul tuo hardware, assistenza continuativa.",
    sub: "Il tuo hardware, i tuoi dati. Il nostro know-how.",
    cta1: "Prenota una call tecnica",
    cta2: "Come funziona",
    micro: "Analisi di compatibilità in 1 ora · 80 €/h + IVA · nessun impegno dopo",
  },

  panel: {
    title: "Ventic Agent",
    status: "ONLINE",
    node: "node-01 · eu-central · spot · 2× GPU",
    gauges: [
      { label: "GPU 0", value: "94%", pct: 94, warm: true },
      { label: "GPU 1", value: "91%", pct: 91, warm: true },
      { label: "VRAM", value: "71G", pct: 89, warm: false },
    ],
    stats: [
      { label: "Prefill", value: "12.4k", unit: "tok/s" },
      { label: "Decode", value: "1.86k", unit: "tok/s" },
      { label: "Sessioni", value: "37", unit: "in coda 0" },
    ],
    chips: ["qwen3.8-27b", "vLLM · TP 2", "embed · bge-m3"],
    chipLive: "overlay up",
    sample: "dati di esempio",
  },

  heroShots: {
    label: "Admin panel",
    host: "admin.ventic.local",
    note: "Screenshot piattaforma",
  },

  problem: {
    id: "perche",
    plate: "Il problema",
    title: ["Le API dei modelli di frontiera", "non sono un'infrastruttura."],
    lead: "Vanno benissimo per provare. Diventano un rischio nel momento in cui ci costruisci sopra un prodotto, o ci fai lavorare degli agenti autonomi tutta la notte.",
    cards: [
      { tag: "01 — Subscription", title: "Finestre strette", body: "Quota finita, lavoro fermo. Per una persona è un'attesa; per un agente che gira di notte è un guasto, e te ne accorgi la mattina dopo." },
      { tag: "02 — Subscription", title: "Outage a monte", body: "Quando il provider va giù, va giù il tuo prodotto. Nessun failover ti salva se il modello vive solo a casa loro." },
      { tag: "03 — Subscription", title: "Modelli mobili", body: "I frontier model cambiano spesso e senza preavviso: gli stessi prompt danno risultati diversi nel tempo. Poca trasparenza, nessuna riproducibilità." },
      { tag: "04 — A token", title: "Prezzo per token", body: "Sui modelli di frontiera statunitensi il costo per token resta alto, e cresce esattamente quanto il tuo prodotto ha successo." },
      { tag: "05 — A token", title: "Compliance", body: "Le alternative cinesi costano poco, ma girano su server cinesi. Se i tuoi dati devono restare in UE, quella strada è chiusa in partenza." },
      { tag: "06 — A token", title: "Budget aperto", body: "Il consumo di un LLM è imprevedibile per natura. In azienda si traduce in una voce di costo che nessuno riesce a chiudere a inizio anno." },
    ],
  },

  modes: {
    id: "modelli-di-ingaggio",
    plate: "Due modi di lavorare",
    title: ["Porti il ferro tu,", "oppure lo portiamo noi."],
    lead: "In entrambi i casi ottieni la stessa cosa: un endpoint privato compatibile OpenAI e Anthropic, su una macchina a cui puoi accedere quando vuoi.",
    byoh: {
      tag: "BYOH",
      title: "Il ferro è tuo",
      desc: "Hai già i server, o preferisci comprarli tu. Noi portiamo lo stack: verifica di compatibilità, vLLM tunato sulla tua GPU, Ventic Agent, rete overlay cifrata, pannello e observability.",
      priceLabel: "Consulenza tecnica specializzata",
      price: "80 €",
      unit: "/ ora + IVA",
      ticks: [
        "Analisi del server e verifica di compatibilità — 1 ora al massimo",
        "Setup completo dello stack di inferenza",
        "Ventic Agent installato per l'accesso remoto",
      ],
      note: "Finita l'installazione il server resta tuo e non ci paghi nulla di ricorrente.",
    },
    paas: {
      tag: "PaaS",
      title: "Ci pensiamo noi",
      desc: "Cerchiamo il server giusto al prezzo giusto sul nostro catalogo, lo mettiamo in produzione e te lo fatturiamo insieme al servizio. Tutto incluso, nessun hardware da comprare.",
      priceLabel: "Pacchetti a ora, tutto incluso",
      price: "da 1 €",
      unit: "/ ora + IVA",
      ticks: [
        "Discovery su criteri tuoi: spot o dedicato, UE o US, datacenter o no",
        "Acquisto dal marketplace con bonifico SEPA immediato",
        "Spegnimento automatico quando la macchina non serve a nessuno",
        "Configurazione multicloud per ridondanza o failover, se il servizio è critico",
      ],
      note: "Paghi soltanto le ore in cui il server è acceso. Mai un centesimo per token.",
    },
  },

  how: {
    id: "come-funziona",
    plate: "Come funziona",
    title: ["Un agent sul server.", "Fa tutto il resto lui."],
    lead: "Sul tuo server gira il Ventic Agent, software proprietario. Tiene in piedi l'LLM, lo espone in modo sicuro e lo divide in modo equo fra i tuoi utenti — senza che nessuno debba smanettare con driver, kernel e flag di vLLM.",
    steps: [
      { title: "Discovery", body: "Cerchiamo la macchina giusta al prezzo giusto sui marketplace, secondo i criteri che hai scelto. Acquisto con bonifico SEPA immediato.", tag: "solo PaaS" },
      { title: "Provisioning", body: "vLLM configurato e ottimizzato per quel modello su quell'hardware, LLM ed embedding model insieme. Automatizzato: a noleggio orario, ogni minuto risparmiato è denaro.", tag: "in pochi minuti" },
      { title: "Rete overlay cifrata", body: "Una rete privata e cifrata che si autoconfigura, attraversa i NAT e raggiunge server ed endpoint senza IP pubblico. Niente VPN da configurare a mano, niente porte aperte sul mondo.", tag: "zero esposizione" },
      { title: "Esercizio", body: "Scheduling equo fra utenti, ripristino automatico dopo un outage spot, spegnimento nei momenti morti, metriche e allarmi. Con la nostra assistenza dietro.", tag: "continuo" },
    ],
  },

  stackDiagram: {
    label: "Schema",
    clients: { label: "Postazioni", items: ["Agenti di coding", "App e servizi interni", "Client OpenAI / Anthropic"] },
    infra: { label: "La tua infrastruttura", items: ["LLM proxy", "Admin panel", "Observability"] },
    nodesLabel: "Nodi GPU",
    nodes: [
      { name: "gpu-node-01", meta: "2×H100 80GB", filled: 2 },
      { name: "gpu-node-02", meta: "2×MI300X", filled: 1 },
    ],
    autoNode: { name: "gpu-node-03", meta: "acceso al bisogno", tag: "auto" },
    flowA: "API OpenAI / Anthropic",
    flowB: "Overlay cifrato · NAT traversal",
    replicaLabel: "repliche",
    scale: {
      label: "Autoscaling",
      rules: [
        "Sopra l'80% di utilizzo Ventic aggiunge una replica.",
        "Sotto il 25% per 10 minuti ne toglie una.",
        "Nessuna richiesta per 15 minuti: il nodo si spegne, e riparte da solo alla prima chiamata.",
      ],
    },
  },

  stack: {
    id: "stack",
    plate: "Architettura",
    title: ["Il Ventic", "Inference Stack."],
    lead: "Ventic non è un servizio a cui spedisci i dati: è uno stack che si installa. Pannello, proxy e observability girano sulla tua infrastruttura Docker; sui nodi GPU gira il nostro agent; in mezzo una rete overlay cifrata che si autoconfigura, attraversa i NAT e non chiede IP pubblici né VPN da mantenere a mano.",
    legend: { own: "Sempre incluso", opt: "Opzionale" },
    planes: [
      {
        idx: "01",
        title: "Le tue postazioni",
        where: "Sui desktop di chi lavora",
        items: [
          { name: "Coding Agent wiring tool", body: "Configura da solo l'agente di coding che il team già usa. Nessuna procedura da seguire a mano, nessun endpoint da incollare.", opt: false },
        ],
      },
      {
        idx: "02",
        title: "La tua infrastruttura Docker",
        where: "Dove decidi tu — on-prem o cloud",
        items: [
          { name: "Admin panel", body: "Utenti, ruoli, modelli, quote e policy. È il pannello che vedi qui sotto.", opt: false },
          { name: "LLM proxy", body: "Un endpoint solo, compatibile con le API OpenAI e Anthropic. I client esistenti non cambiano.", opt: false },
          { name: "Stack LGTM", body: "Log, metriche e tracce, con Grafana davanti. I dati di utilizzo restano da te.", opt: false },
          { name: "OpenRAG", body: "Pipeline di retrieval sui tuoi documenti.", opt: true },
          { name: "Qdrant", body: "Database vettoriale per le collection RAG.", opt: true },
          { name: "Embedding model", body: "Indicizzazione servita dallo stesso stack di inferenza.", opt: true },
          { name: "Deepseek harness", body: "Harness agentico pronto da agganciare a un modello.", opt: true },
          { name: "Openclaw", body: "Harness agentico alternativo, stessa procedura di wiring.", opt: true },
        ],
      },
      {
        idx: "03",
        title: "Rete overlay cifrata",
        where: "Relay in rete pubblica, nodi no",
        items: [
          { name: "Relay node", body: "Instrada il traffico verso host che non espongono niente su internet. Il relay può stare in rete pubblica; i tuoi nodi restano chiusi, anche dietro NAT.", opt: false },
        ],
      },
      {
        idx: "04",
        title: "I nodi di inferenza",
        where: "Sulle GPU, tue o del catalogo",
        items: [
          { name: "Ventic host agent", body: "Tiene in piedi l'LLM, lo espone sull'overlay e lo divide in modo equo fra gli utenti. È l'unico pezzo che gira sul nodo.", opt: false },
          { name: "Runtime vLLM", body: "Tunato su quel modello e su quella GPU, con LLM ed embedding model serviti insieme.", opt: false },
        ],
      },
    ],
    links: [
      "Endpoint compatibile OpenAI e Anthropic",
      "Overlay cifrato e autoconfigurante — nessun IP pubblico",
      "Dopo un outage spot l'agent si riconnette da solo",
    ],
    note: "Le parti opzionali si accendono solo se servono: lo stack minimo è agent, overlay e proxy.",
  },

  adminPanel: {
    id: "pannello",
    plate: "Admin panel",
    title: ["Chi usa cosa,", "lo decidi tu."],
    lead: "Il pannello gira accanto al proxy, sulla tua infrastruttura. Da lì si installano i modelli, si aprono e si revocano le chiavi, si stabilisce quale utente può parlare con quale modello e si guarda quanto sta consumando ognuno.",
    chrome: "admin.ventic.local",
    shots: [
      {
        id: "inventory", tab: "Modelli", src: "/admin/inventory.webp", w: 1440, h: 1331,
        title: "Inventario modelli",
        body: "Chat, multimodale ed embedding in una lista sola, con nodo, finestra di contesto, quota e repliche. Da qui installi un modello nuovo dal catalogo Ventic, scali le repliche e imposti spegnimento automatico, quote per utente, allow e deny, restrizioni semantiche e sorgenti RAG.",
        alt: "Schermata dell'inventario modelli: tabella dei modelli installati con nodo, contesto, quota e stato, catalogo dei template a destra, pannelli di scaling, quote e restrizioni semantiche in basso.",
      },
      {
        id: "users", tab: "Utenti e chiavi", src: "/admin/users.webp", w: 1440, h: 1450,
        title: "Utenti e accessi",
        body: "Utenti attivi, scadenze e revoche, divisi per gruppo, dominio e tenant. Ogni API key ha un proprietario, uno scope e una scadenza, e si revoca da qui. L'autenticazione può arrivare dal tuo provider — Google Workspace, Entra ID, Okta o un OIDC qualsiasi — con 2FA obbligatoria.",
        alt: "Schermata utenti e accessi: elenco degli utenti con tenant, ruolo, scadenza e consumo token, pannello dei provider di autenticazione esterni e tabella delle API key.",
      },
      {
        id: "rbac", tab: "Ruoli", src: "/admin/rbac.webp", w: 1440, h: 1350,
        title: "Ruoli e RBAC",
        body: "Quattro livelli — utente, developer, admin, superadmin — e una matrice che dice endpoint per endpoint chi può fare cosa. Sotto, le regole che legano utenti, gruppi, domini e tenant ai singoli modelli, con la quota che si portano dietro.",
        alt: "Schermata ruoli e RBAC: matrice dei permessi per endpoint sui quattro ruoli e tabella delle regole che legano utenti, gruppi, domini e tenant ai modelli.",
      },
      {
        id: "telemetry", tab: "Telemetria", src: "/admin/telemetry.webp", w: 1440, h: 1293,
        title: "Telemetria",
        body: "Token al minuto sulle ultime 24 ore, occupazione di GPU, VRAM e potenza nodo per nodo, e il consumo per singolo utente. Gli allarmi partono sul canale che preferisci quando una soglia viene superata o un'istanza spot viene revocata.",
        alt: "Schermata telemetria: grafico dei token al minuto nelle ultime 24 ore, indicatori di GPU e VRAM per nodo, consumo per utente e lista degli allarmi recenti.",
      },
      {
        id: "wirings", tab: "Wiring", src: "/admin/wirings.webp", w: 1440, h: 1133,
        title: "Wiring esterni",
        body: "I componenti opzionali si collegano da qui: OpenRAG e Qdrant con le collection e il modello che le indicizza, gli harness agentici con il modello a cui sono agganciati, e il wiring tool che spinge l'endpoint giusto sui desktop del team.",
        alt: "Schermata dei wiring esterni: connettori RAG con le collection sorgenti, stato dei componenti di piattaforma, harness agentici e configurazione degli agenti di coding.",
      },
    ],
    note: "Mockup dell'interfaccia: numeri, nomi e nodi mostrati sono di esempio.",
    more: "Guida completa al pannello",
    moreHref: "/admin-panel",
  },

  caps: {
    id: "cosa-ottieni",
    plate: "Cosa ottieni",
    title: ["Tutto quello che serve", "perché non ci pensi più."],
    cta: "Prenota una call tecnica",
    items: [
      { title: "Sempre in piedi", body: "Se l'istanza spot viene revocata, Ventic rischedula il workload e ripristina l'operatività da solo, anche su un altro provider." },
      { title: "Multi-utente, equo", body: "Una macchina condivisa fra più persone: finestre di contesto prevedibili e workload schedulato in modo esatto." },
      { title: "Nessun IP pubblico", body: "La rete overlay cifrata attraversa i NAT e arriva al server anche se non è esposto su internet. Si autoconfigura: nessuna configurazione fragile da mantenere." },
      { title: "Observability", body: "GPU, CPU e sistema operativo sotto controllo, consumo token per utente in tempo reale, allarmi sul canale che preferisci." },
      { title: "Account e API key", body: "Pannello per creare utenti e chiavi, revocarle e ruotarle. Autenticazione a due fattori e integrazione con provider auth esterni." },
      { title: "Scale to zero", body: "Se nessuno sta usando l'LLM l'istanza si spegne, e riparte alla prima richiesta che arriva. Niente ore bruciate nel vuoto." },
      { title: "Policy sulle sessioni", body: "Vedi come vengono usate le sessioni e applichi policy restrittive sui contenuti, per utente o per chiave." },
      { title: "Modelli uncensored", body: "Utili dove i filtri dei modelli commerciali bloccano il lavoro: hardening, red teaming, bug bounty." },
      { title: "Multicloud", body: "Lo stesso LLM su più provider, in ridondanza o in failover: se un fornitore si ferma, il servizio no." },
    ],
  },

  models: {
    id: "modelli",
    plate: "Modelli",
    title: ["Il meglio dell'open-weight,", "per coding e agenti."],
    lead: "Lo stato dell'arte in tre fasce di costo e intelligenza. Il modello lo scegliamo insieme, in base al lavoro che deve fare e alla GPU che hai davanti.",
    th: ["Modello", "Fascia", "Ideale per"],
    rows: [
      { name: "Qwen 3.8 27B", tier: "Efficiente", use: "Volumi alti e coding assistito, al costo per risposta più basso.", top: false },
      { name: "Qwen 3.8 Flash Next", tier: "Veloce", use: "Agenti che fanno molti passi, dove la latenza pesa più della profondità.", top: false },
      { name: "Deepseek v4 Flash 0731", tier: "Bilanciata", use: "Il compromesso di riferimento fra qualità sul codice e throughput.", top: false },
      { name: "Kimi K3", tier: "Frontier", use: "Il lavoro agentico più difficile, quando serve il massimo dell'open-weight.", top: true },
    ],
    note: "Requisiti di VRAM, finestra di contesto e configurazione vLLM li fissiamo insieme durante l'analisi del server.",
    china: {
      title: ["Pesi cinesi,", "server europeo."],
      p1: "Oggi i migliori modelli open-weight arrivano dalla Cina. Usarli tramite le loro API significa mandare i dati sui loro server: per molte aziende è una strada chiusa.",
      p2: "Con Ventic scarichi i pesi e li fai girare sulla tua macchina, dove l'hai scelta tu. Il modello viene dalla Cina; i tuoi dati non ci vanno mai.",
      tags: ["UE", "US", "on-prem"],
    },
    stable: {
      label: "Pesi fissi, risultati fissi",
      body: "Il modello che installiamo oggi è lo stesso fra sei mesi, byte per byte. Nessun aggiornamento silenzioso: le tue valutazioni restano valide, i tuoi prompt continuano a comportarsi allo stesso modo.",
    },
  },

  pricing: {
    id: "prezzi",
    plate: "Prezzi",
    title: ["Tre numeri.", "Nessuna sorpresa."],
    lead: "Non fatturiamo a token: il conto non dipende da quanto lavora il modello, ma da quante ore il server è acceso e da quante persone ci devono lavorare sopra.",
    link: "Confronto e costi per utente",
    cards: [
      { tag: "BYOH · consulenza", price: "80 €", unit: "/ h + IVA", body: "Analisi, setup dello stack e del Ventic Agent sul tuo hardware. Poi nessun costo ricorrente.", warm: false },
      { tag: "PaaS · Ventic 16", price: "1 €", unit: "/ h + IVA", body: "Qwen 3.8 27B. 16 utenti attivi in contemporanea, fino a 100 in organico. 160 €/mese su orario lavorativo.", warm: true },
      { tag: "PaaS · Ventic 64", price: "6 €", unit: "/ h + IVA", body: "Deepseek v4 Flash 0731. 64 utenti attivi in contemporanea, fino a 500 in organico. 960 €/mese su orario lavorativo.", warm: true },
    ],
    foot: "Prezzi di lancio, IVA esclusa · orario lavorativo = 8 h × 20 giorni = 160 h/mese · hardware, setup e assistenza inclusi",
  },

  cta: {
    plate: "Primo passo",
    title: ["Un'ora per sapere", "se il tuo server è pronto."],
    body: "Guardiamo il tuo hardware, ti diciamo che modello ci gira davvero e a che velocità. Se il ferro non basta te lo diciamo prima, non dopo.",
    btn: "Prenota una call tecnica",
    mail: "Scrivici: info@ventic.it",
  },

  footer: {
    legal: "Netter srl · P.IVA IT03569900545 · Via Indipendenza, 06081 Assisi (PG), Italy",
    region: "Dati in UE o US, a tua scelta",
    mail: "info@ventic.it",
    links: [
      { label: "Admin panel", href: "/admin-panel" },
      { label: "Prezzi", href: "/pricing" },
      { label: "Privacy", href: "#" },
      { label: "Termini", href: "#" },
    ],
  },
  pricingPage: {
    plate: "Prezzi e confronto",
    title: ["Quanto costa,", "e rispetto a cosa."],
    lead: "Ventic non fattura a token. Paghi le ore di consulenza, oppure una tariffa oraria fissa per pacchetto. Quanto lavora il modello non cambia il conto.",
    byoh: {
      head: "BYOH · il ferro è tuo",
      price: "80 €",
      unit: "/ ora + IVA",
      desc: "Consulenza specializzata di un nostro tecnico, fatturata a ore effettive.",
      ticks: [
        "Analisi del server e verifica di compatibilità — max 1 h",
        "Setup dello stack di inferenza, tunato su modello e hardware",
        "Ventic Agent installato per l'accesso remoto",
      ],
      note: "Dopo il setup il server resta tuo e non ci paghi nulla di ricorrente. L'assistenza successiva è a ore, quando serve.",
    },
    paas: {
      head: "PaaS · tutto incluso",
      price: "1 €",
      unit: "/ ora + IVA · a partire da",
      desc: "Hardware, provisioning e assistenza in un'unica tariffa oraria. Il pacchetto si sceglie in base a quante persone devono lavorarci.",
      ticks: [
        "Discovery del server su criteri tuoi, acquisto con bonifico SEPA immediato",
        "Provisioning, rete overlay cifrata, pannello e observability inclusi",
        "Scale to zero: se nessuno lo usa, la macchina si spegne e smette di costare",
        "Multicloud per ridondanza o failover, quando il servizio è critico",
      ],
      note: "Due pacchetti disponibili oggi, qui sotto. Prezzi di lancio: restano bloccati per la durata del contratto.",
    },
    packages: {
      plate: "Pacchetti PaaS",
      title: "Due tagli, tariffa oraria fissa",
      meta: "prezzi di lancio · IVA esclusa",
      labels: {
        model: "Modello",
        unit: "/ h + IVA",
        active: "utenti attivi in contemporanea",
        seats: "utenti in organico, uso intermedio",
        cost: "Costo",
        h1: "8 h × 20 gg",
        h2: "24 / 7",
        month: "al mese",
        perActive: "per utente attivo",
        perSeat: "per utente in organico",
      },
      items: [
        {
          name: "Ventic 16", model: "Qwen 3.8 27B", price: "1 €", active: "16", seats: "100",
          month: ["160 €", "720 €"], perActive: ["10,00 €", "45,00 €"], perSeat: ["1,60 €", "7,20 €"],
        },
        {
          name: "Ventic 64", model: "Deepseek v4 Flash 0731", price: "6 €", active: "64", seats: "500",
          month: ["960 €", "4.320 €"], perActive: ["15,00 €", "67,50 €"], perSeat: ["1,92 €", "8,64 €"],
        },
      ],
      foot1: "Orario lavorativo = 8 h × 20 giorni = 160 h/mese · continuo = 24 h × 30 giorni = 720 h/mese.",
      foot2: "Hardware, provisioning, rete overlay, pannello, observability e assistenza sono compresi nella tariffa oraria.",
    },
    matrix: {
      title: "Ventic contro le alternative",
      meta: "stesso lavoro, quattro modi di pagarlo",
      cols: ["Criterio", "Subscription frontier", "Pagamento a token", "Ventic BYOH", "Ventic PaaS"],
      rows: [
        { label: "Costo prevedibile a fine mese", cells: [
          { mark: "yes", text: "Canone fisso" }, { mark: "no", text: "Dipende dal consumo" },
          { mark: "yes", text: "Zero ricorrente" }, { mark: "yes", text: "Ore × tariffa" }] },
        { label: "Tetto di token o rate limit", cells: [
          { mark: "no", text: "Finestra stretta, poi ti fermi" }, { mark: "dash", text: "Nessun tetto, ma paghi tutto" },
          { mark: "yes", text: "Solo il limite della GPU" }, { mark: "yes", text: "Solo il limite della GPU" }] },
        { label: "Continuità durante un outage del provider", cells: [
          { mark: "no", text: "Ti fermi con loro" }, { mark: "no", text: "Ti fermi con loro" },
          { mark: "yes", text: "Dipende solo dal tuo server" }, { mark: "yes", text: "Rischedula da solo, anche su un altro provider" }] },
        { label: "Ridondanza multicloud", cells: [
          { mark: "no", text: "Non prevista" }, { mark: "no", text: "Non prevista" },
          { mark: "dash", text: "Se hai più di un server" }, { mark: "yes", text: "Sì, ridondanza attiva o failover" }] },
        { label: "Stabilità del modello nel tempo", cells: [
          { mark: "no", text: "Cambia senza preavviso" }, { mark: "dash", text: "Dipende dal provider" },
          { mark: "yes", text: "Pesi fissi, aggiorni quando vuoi" }, { mark: "yes", text: "Pesi fissi, aggiorni quando vuoi" }] },
        { label: "Dove risiedono i dati", cells: [
          { mark: "no", text: "Sui server del provider" }, { mark: "no", text: "Server del provider, Cina inclusa" },
          { mark: "yes", text: "Sulla tua macchina" }, { mark: "yes", text: "Regione scelta da te: UE o US" }] },
        { label: "Accesso alla macchina", cells: [
          { mark: "no", text: "Nessuno" }, { mark: "no", text: "Nessuno" },
          { mark: "yes", text: "Console, SSH, come preferisci" }, { mark: "yes", text: "Console, SSH, come preferisci" }] },
        { label: "Modelli uncensored per security research", cells: [
          { mark: "no", text: "No" }, { mark: "no", text: "No" },
          { mark: "yes", text: "Sì, sul tuo hardware" }, { mark: "yes", text: "Sì, sul server dedicato" }] },
        { label: "Hardware", cells: [
          { mark: "dash", text: "Non serve" }, { mark: "dash", text: "Non serve" },
          { mark: "dash", text: "Tuo, già in casa o da comprare" }, { mark: "dash", text: "Dal nostro catalogo, fatturato da noi" }] },
        { label: "Quanto paghi a Ventic", cells: [
          { mark: "dash", text: "—" }, { mark: "dash", text: "—" },
          { mark: "yes", text: "80 €/h + IVA, una tantum" }, { mark: "yes", text: "da 1 €/h + IVA, tutto incluso" }] },
      ] as { label: string; cells: Cell[] }[],
    },
    sizing: {
      plate: "Come si dimensiona",
      title: ["Non un contatore.", "Un banco di lavoro."],
      body: "Il pacchetto si sceglie sulle persone che devono lavorare nello stesso momento, non sui token che consumano. Quando servono più posti si aggiunge un nodo: un numero in più sul contratto, non una sorpresa in fattura.",
      items: [
        { label: "Istanza", body: "Dedicata al tuo tenant. Su istanze spot la tariffa oraria scende ancora e la revoca la gestisce l'agent, senza che tu te ne accorga." },
        { label: "Ridondanza", body: "Nodo singolo, oppure lo stesso modello su più cloud: ridondanza attiva per reggere il carico, o failover per riprendere dove il provider si è fermato." },
        { label: "SLA", body: "Variabili in base al servizio e al livello di ridondanza scelto: si fissano insieme, prima della firma." },
        { label: "Inattività", body: "Le ore in cui nessuno usa l'LLM non le paghi: la macchina si spegne e riparte alla prima richiesta." },
      ],
    },
    notes: {
      plate: "Da tenere presente",
      items: [
        "I pacchetti qui sopra sono su istanza dedicata. Su istanze spot la tariffa scende ancora, con la revoca gestita da Ventic.",
        "In multicloud lo stesso modello resta raggiungibile su un secondo provider, in ridondanza attiva o in failover.",
        "Prezzi al netto di IVA. SLA variabili in base al servizio e al livello di ridondanza scelto.",
      ],
      ctaTitle: "Partiamo dall'analisi.",
      ctaBody: "Un'ora per capire cosa gira davvero sul tuo hardware, e a che velocità.",
      ctaBtn: "Prenota una call tecnica",
    },
    foot: {
      left: "Ventic — Netter srl · P.IVA IT03569900545 · Via Indipendenza, 06081 Assisi (PG) · info@ventic.it",
      right: "Prezzi di lancio · valori in euro, IVA esclusa",
    },
  },

  adminPanelPage: {
    plate: "Guida al pannello",
    title: ["Il pannello di controllo,", "spiegato riga per riga."],
    lead: "Tutto quello che il tuo team amministra da qui: chi entra, chi parla con quale modello, come scala l'inventario — e come lo rivendi sotto il tuo brand se fai da cloud provider.",
    sections: [
      {
        id: "utenti",
        icon: "users",
        plate: "Utenti e accessi",
        title: "Chi entra, e con che chiave",
        lead: "L'anagrafica di chi può parlare con i tuoi modelli, organizzata per come è fatta davvero la tua azienda — o quella dei tuoi clienti.",
        points: [
          { title: "Utenti", body: "Stato attivo, data di scadenza dell'accesso e revoca immediata, uno per uno o in blocco." },
          { title: "Gruppi", body: "Utenti raggruppati per team o funzione: RBAC e quote si applicano al gruppo, non persona per persona." },
          { title: "Domini", body: "Accesso legato al dominio email dell'organizzazione: chi arriva da @tuaazienda.com entra con le regole già pronte." },
          { title: "Tenant", body: "Separazione completa fra organizzazioni diverse sullo stesso pannello: dati, quote e modelli visibili non si mescolano mai." },
          { title: "API token", body: "Ogni chiave ha un proprietario, uno scope e una scadenza. Si crea, ruota e revoca da qui, senza toccare il codice del cliente." },
          { title: "OAuth e SSO", body: "Autenticazione dal tuo provider — Google Workspace, Microsoft Entra ID, Okta o un OIDC qualsiasi — con due fattori applicabili in policy." },
        ],
      },
      {
        id: "ruoli",
        icon: "shield",
        plate: "Ruoli e RBAC",
        title: "Chi può fare cosa, endpoint per endpoint",
        lead: "Il controllo degli accessi non si ferma a \"chi entra\": decide anche cosa può toccare, una volta dentro.",
        points: [
          { title: "Quattro livelli", body: "Utente, developer, admin e superadmin: ruoli distinti per l'uso dei modelli e per l'amministrazione del pannello stesso." },
          { title: "Permessi per endpoint", body: "Una matrice dice, endpoint per endpoint, quale ruolo può leggere, scrivere o amministrare quella risorsa." },
          { title: "Regole di binding", body: "Utenti, gruppi, domini e tenant si legano ai singoli modelli con regole esplicite di allow o deny." },
          { title: "Quota ereditata", body: "Ogni regola porta con sé una quota: il limite si applica in automatico a chiunque rientri in quel gruppo, dominio o tenant." },
        ],
      },
      {
        id: "modelli",
        icon: "provisioning",
        plate: "Gestione modelli",
        title: "L'inventario che decide cosa gira, e come",
        lead: "Chat, multimodale ed embedding in un solo posto: dall'installazione alla messa a riposo.",
        points: [
          { title: "Catalogo Ventic", body: "Deploy di un modello nuovo scegliendolo dai template pronti, già tunati per l'hardware disponibile." },
          { title: "Inventario installato", body: "Elenco dei modelli attivi con nodo, finestra di contesto, quota e numero di repliche." },
          { title: "Quote e allow/deny", body: "Limiti di utilizzo per utente, gruppo o tenant, e liste esplicite di chi può o non può chiamare un modello." },
          { title: "Scaling out e in", body: "Repliche aggiunte o tolte a mano o su soglia, per assorbire i picchi senza tenere GPU accese a vuoto." },
          { title: "Auto shutdown e start", body: "Politiche di spegnimento quando nessuno lo usa, e riavvio automatico alla prima richiesta in coda." },
          { title: "Restrizioni semantiche", body: "Wording e concetti vietati impostabili per modello, per applicare policy di contenuto senza toccare il prompt di sistema." },
          { title: "Sorgenti RAG", body: "Collection e basi di conoscenza collegate al modello direttamente da qui, senza configurazione lato client." },
        ],
      },
      {
        id: "telemetria",
        icon: "ops",
        plate: "Telemetria",
        title: "Tutto il consumo, sotto gli occhi",
        lead: "Non solo dashboard estetiche: i numeri che servono per capire se stai spendendo bene o stai per andare in saturazione.",
        points: [
          { title: "Token al minuto", body: "Andamento sulle ultime 24 ore, per modello e in aggregato." },
          { title: "GPU, VRAM e potenza", body: "Occupazione nodo per nodo, per capire dove stai spingendo e dove hai margine." },
          { title: "Consumo per utente", body: "Chi sta usando quanto, per addebitare correttamente o individuare un uso anomalo." },
          { title: "Allarmi in tempo reale", body: "Notifica sul canale che preferisci quando una soglia viene superata o un'istanza spot viene revocata." },
        ],
      },
      {
        id: "wiring",
        icon: "overlay",
        plate: "Wiring esterni",
        title: "I componenti opzionali, collegati da qui",
        lead: "RAG e harness agentici non sono a parte: si agganciano al pannello come tutto il resto.",
        points: [
          { title: "OpenRAG e Qdrant", body: "Collection sorgenti e modello di embedding che le indicizza, configurati e monitorati dal pannello." },
          { title: "Harness agentici", body: "Gli agenti di coding e gli automated harness si legano al modello a cui devono parlare, con le stesse regole di RBAC." },
          { title: "Wiring tool", body: "L'endpoint giusto arriva in automatico sui client del team — niente URL o chiavi da distribuire a mano." },
        ],
      },
    ],
    whiteLabel: {
      icon: "cloud",
      plate: "White label",
      title: ["Il tuo brand,", "la nostra piattaforma."],
      lead: "Il pannello supporta la separazione per tenant fin dal primo giorno: puoi usarlo per amministrare la tua azienda, oppure per rivendere l'accesso ai tuoi clienti come se fosse tuo.",
      points: [
        { title: "Multi-tenant nativo", body: "Ogni cliente è un tenant isolato: dati, utenti, modelli assegnati e consumi non si vedono fra tenant diversi." },
        { title: "Rivendita come cloud provider", body: "Offri subscription o pacchetti a consumo ai tuoi clienti finali, usando la capacità che hai comprato o affittato una volta sola." },
        { title: "Ruoli per il tuo team di supporto", body: "Il tuo staff amministra tenant e utenti dei clienti con ruoli admin dedicati, senza toccare il livello superadmin della piattaforma." },
        { title: "Fatturazione per tenant", body: "Consumo e quote tracciati per singolo tenant: la base dati per fatturare ogni cliente in modo corretto è già pronta." },
      ],
      note: "Non serve un'infrastruttura separata per ogni cliente: un solo pannello, un solo pool di GPU, tanti tenant quanti servono.",
    },
  },
};

const en: typeof it = {
  seo: {
    home: {
      title: "Ventic — private AI on dedicated GPUs",
      desc: "From a bare VM or metal with raw GPUs to a private OpenAI- and Anthropic-compatible endpoint. Turnkey: open-weight models, vLLM tuned to your hardware, ongoing support.",
    },
    pricing: {
      title: "Pricing and comparison — Ventic",
      desc: "BYOH at €80/h of consulting, PaaS packages from €1/h all included. Per-user costs and a comparison with frontier subscriptions and pay-per-token.",
    },
    adminPanel: {
      title: "Ventic admin panel — users, roles, models, white label",
      desc: "How the Ventic admin panel works: users and access, endpoint-level RBAC, model management and scaling, RAG and agentic harness wiring, multi-tenant white labeling.",
    },
  },

  nav: {
    links: [
      { label: "Why", href: "/en/#why" },
      { label: "How it works", href: "/en/#how-it-works" },
      { label: "Architecture", href: "/en/#stack" },
      { label: "Models", href: "/en/#models" },
      { label: "Admin panel", href: "/en/admin-panel" },
      { label: "Pricing", href: "/en/pricing" },
    ],
    cta: "Book a call",
    skip: "Skip to content",
    langLabel: "Language",
  },

  hero: {
    plate: "Private inference · Dedicated GPUs · EU / US",
    title: ["Your AI.", "Private,", "under your control."],
    lead: "From a bare VM or metal with raw GPUs to an OpenAI- and Anthropic-compatible endpoint, with the platform to roll it out to your internal users: roles, access, RBAC. Turnkey: state-of-the-art open-weight models, vLLM tuned to your hardware, ongoing support.",
    sub: "Your hardware, your data. Our know-how.",
    cta1: "Book a technical call",
    cta2: "How it works",
    micro: "Compatibility check in 1 hour · €80/h + VAT · no commitment after",
  },

  panel: {
    title: "Ventic Agent",
    status: "ONLINE",
    node: "node-01 · eu-central · spot · 2× GPU",
    gauges: [
      { label: "GPU 0", value: "94%", pct: 94, warm: true },
      { label: "GPU 1", value: "91%", pct: 91, warm: true },
      { label: "VRAM", value: "71G", pct: 89, warm: false },
    ],
    stats: [
      { label: "Prefill", value: "12.4k", unit: "tok/s" },
      { label: "Decode", value: "1.86k", unit: "tok/s" },
      { label: "Sessions", value: "37", unit: "0 queued" },
    ],
    chips: ["qwen3.8-27b", "vLLM · TP 2", "embed · bge-m3"],
    chipLive: "overlay up",
    sample: "sample data",
  },

  heroShots: {
    label: "Admin panel",
    host: "admin.ventic.local",
    note: "Platform screenshots",
  },

  problem: {
    id: "why",
    plate: "The problem",
    title: ["Frontier model APIs", "are not infrastructure."],
    lead: "They are fine for trying things out. They become a risk the moment you build a product on them, or leave autonomous agents working on them all night.",
    cards: [
      { tag: "01 — Subscription", title: "Narrow windows", body: "Quota spent, work stopped. For a person that is a wait; for an agent running overnight it is a failure, and you find out the next morning." },
      { tag: "02 — Subscription", title: "Upstream outages", body: "When the provider goes down, your product goes down with it. No failover saves you if the model only lives at their place." },
      { tag: "03 — Subscription", title: "Moving targets", body: "Frontier models change often and without notice: the same prompts give different results over time. Little transparency, no reproducibility." },
      { tag: "04 — Per token", title: "Price per token", body: "On US frontier models the cost per token stays high, and it grows exactly as fast as your product succeeds." },
      { tag: "05 — Per token", title: "Compliance", body: "The Chinese alternatives are cheap, but they run on Chinese servers. If your data has to stay in the EU, that road is closed from the start." },
      { tag: "06 — Per token", title: "Open-ended budget", body: "LLM consumption is unpredictable by nature. Inside a company it becomes a cost line nobody can close at the start of the year." },
    ],
  },

  modes: {
    id: "engagement-models",
    plate: "Two ways to work",
    title: ["You bring the metal,", "or we bring it."],
    lead: "Either way you get the same thing: a private OpenAI- and Anthropic-compatible endpoint, on a machine you can log into whenever you want.",
    byoh: {
      tag: "BYOH",
      title: "The metal is yours",
      desc: "You already have the servers, or you would rather buy them yourself. We bring the stack: compatibility check, vLLM tuned to your GPU, Ventic Agent, encrypted overlay network, dashboard and observability.",
      priceLabel: "Specialist technical consulting",
      price: "€80",
      unit: "/ hour + VAT",
      ticks: [
        "Server analysis and compatibility check — 1 hour maximum",
        "Full setup of the inference stack",
        "Ventic Agent installed for remote access",
      ],
      note: "Once setup is done the server stays yours, and you pay us nothing recurring.",
    },
    paas: {
      tag: "PaaS",
      title: "We handle it",
      desc: "We find the right server at the right price in our catalogue, put it into production and invoice it together with the service. All included, no hardware to buy.",
      priceLabel: "Hourly packages, all included",
      price: "from €1",
      unit: "/ hour + VAT",
      ticks: [
        "Discovery on your criteria: spot or dedicated, EU or US, datacentre or not",
        "Bought from the marketplace with an instant SEPA transfer",
        "Automatic shutdown when nobody needs the machine",
        "Multicloud setup for redundancy or failover, when the service is critical",
      ],
      note: "You pay only for the hours the server is on. Never a cent per token.",
    },
  },

  how: {
    id: "how-it-works",
    plate: "How it works",
    title: ["One agent on the server.", "It does the rest."],
    lead: "The Ventic Agent, our own software, runs on your server. It keeps the LLM up, exposes it securely and shares it fairly between your users — with nobody left fiddling with drivers, kernels and vLLM flags.",
    steps: [
      { title: "Discovery", body: "We find the right machine at the right price across marketplaces, on the criteria you chose. Bought with an instant SEPA transfer.", tag: "PaaS only" },
      { title: "Provisioning", body: "vLLM configured and tuned for that model on that hardware, LLM and embedding model together. Automated: on hourly rental, every minute saved is money.", tag: "in minutes" },
      { title: "Encrypted overlay network", body: "A private, encrypted network that configures itself, traverses NAT and reaches server and endpoint with no public IP. No VPN to wire up by hand, no ports open to the world.", tag: "zero exposure" },
      { title: "Operations", body: "Fair scheduling between users, automatic recovery after a spot outage, shutdown in the quiet hours, metrics and alerts. With our support behind it.", tag: "continuous" },
    ],
  },

  stackDiagram: {
    label: "Schematic",
    clients: { label: "Workstations", items: ["Coding agents", "Internal apps and services", "OpenAI / Anthropic clients"] },
    infra: { label: "Your infrastructure", items: ["LLM proxy", "Admin panel", "Observability"] },
    nodesLabel: "GPU nodes",
    nodes: [
      { name: "gpu-node-01", meta: "2×H100 80GB", filled: 2 },
      { name: "gpu-node-02", meta: "2×MI300X", filled: 1 },
    ],
    autoNode: { name: "gpu-node-03", meta: "started on demand", tag: "auto" },
    flowA: "OpenAI / Anthropic API",
    flowB: "Encrypted overlay · NAT traversal",
    replicaLabel: "replicas",
    scale: {
      label: "Autoscaling",
      rules: [
        "Above 80% utilisation Ventic adds a replica.",
        "Below 25% for 10 minutes it takes one away.",
        "No requests for 15 minutes: the node shuts down, and comes back by itself on the first call.",
      ],
    },
  },

  stack: {
    id: "stack",
    plate: "Architecture",
    title: ["The Ventic", "Inference Stack."],
    lead: "Ventic is not a service you ship your data to: it is a stack you install. The panel, the proxy and the observability run on your own Docker infrastructure; our agent runs on the GPU nodes; between them sits an encrypted overlay network that configures itself, traverses NAT and asks for no public IPs and no VPN to hand-maintain.",
    legend: { own: "Always included", opt: "Optional" },
    planes: [
      {
        idx: "01",
        title: "Your workstations",
        where: "On the desktops doing the work",
        items: [
          { name: "Coding Agent wiring tool", body: "Configures the coding agent your team already uses, on its own. No procedure to follow by hand, no endpoint to paste.", opt: false },
        ],
      },
      {
        idx: "02",
        title: "Your Docker infrastructure",
        where: "Wherever you decide — on-prem or cloud",
        items: [
          { name: "Admin panel", body: "Users, roles, models, quotas and policy. It is the panel shown below.", opt: false },
          { name: "LLM proxy", body: "One endpoint, compatible with the OpenAI and Anthropic APIs. Existing clients stay as they are.", opt: false },
          { name: "LGTM stack", body: "Logs, metrics and traces with Grafana in front. Usage data never leaves your side.", opt: false },
          { name: "OpenRAG", body: "Retrieval pipelines over your own documents.", opt: true },
          { name: "Qdrant", body: "Vector database backing the RAG collections.", opt: true },
          { name: "Embedding model", body: "Indexing served by the same inference stack.", opt: true },
          { name: "Deepseek harness", body: "Agentic harness, ready to wire to a model.", opt: true },
          { name: "Openclaw", body: "Alternative agentic harness, same wiring procedure.", opt: true },
        ],
      },
      {
        idx: "03",
        title: "Encrypted overlay network",
        where: "Relays on the public network, nodes not",
        items: [
          { name: "Relay node", body: "Routes traffic to hosts that expose nothing to the internet. The relay may sit on a public network; your nodes stay closed, NAT included.", opt: false },
        ],
      },
      {
        idx: "04",
        title: "The inference nodes",
        where: "On the GPUs — yours or from the catalogue",
        items: [
          { name: "Ventic host agent", body: "Keeps the LLM up, exposes it over the overlay and shares it fairly between users. It is the only piece running on the node.", opt: false },
          { name: "vLLM runtime", body: "Tuned for that model on that GPU, serving the LLM and the embedding model together.", opt: false },
        ],
      },
    ],
    links: [
      "OpenAI and Anthropic compatible endpoint",
      "Self-configuring encrypted overlay — no public IPs",
      "After a spot outage the agent reconnects itself",
    ],
    note: "Optional parts are switched on only if you need them: the minimum stack is agent, overlay and proxy.",
  },

  adminPanel: {
    id: "panel",
    plate: "Admin panel",
    title: ["Who uses what,", "decided by you."],
    lead: "The panel runs next to the proxy, on your own infrastructure. From there you install models, issue and revoke keys, set which user may talk to which model, and watch what each of them is consuming.",
    chrome: "admin.ventic.local",
    shots: [
      {
        id: "inventory", tab: "Models", src: "/admin/inventory.webp", w: 1440, h: 1331,
        title: "Model inventory",
        body: "Chat, multimodal and embedding in a single list, with node, context window, quota and replicas. From here you install a new model from the Ventic catalogue, scale replicas, and set auto-shutdown, per-user quotas, allows and denies, semantic restrictions and RAG sources.",
        alt: "Model inventory screen: table of installed models with node, context, quota and state, template catalogue on the right, and scaling, quota and semantic restriction panels below.",
      },
      {
        id: "users", tab: "Users and keys", src: "/admin/users.webp", w: 1440, h: 1450,
        title: "Users and access",
        body: "Active users, expiries and revocations, split by group, domain and tenant. Every API key carries an owner, a scope and an expiry, and is revoked from here. Authentication can come from your own provider — Google Workspace, Entra ID, Okta or any OIDC — with 2FA enforced.",
        alt: "Users and access screen: user list with tenant, role, expiry and token consumption, external authentication providers panel, and API token table.",
      },
      {
        id: "rbac", tab: "Roles", src: "/admin/rbac.webp", w: 1440, h: 1350,
        title: "Roles and RBAC",
        body: "Four tiers — user, developer, admin, superadmin — and a matrix saying, endpoint by endpoint, who may do what. Below it, the rules binding users, groups, domains and tenants to individual models, each carrying its own quota.",
        alt: "Roles and RBAC screen: endpoint permission matrix across the four roles, and a table of rules binding users, groups, domains and tenants to models.",
      },
      {
        id: "telemetry", tab: "Telemetry", src: "/admin/telemetry.webp", w: 1440, h: 1293,
        title: "Telemetry",
        body: "Tokens per minute over the last 24 hours, GPU, VRAM and power draw node by node, and consumption per individual user. Alerts go out on the channel you prefer when a threshold is crossed or a spot instance is reclaimed.",
        alt: "Telemetry screen: tokens-per-minute chart over the last 24 hours, GPU and VRAM gauges per node, per-user consumption and a list of recent alerts.",
      },
      {
        id: "wirings", tab: "Wiring", src: "/admin/wirings.webp", w: 1440, h: 1133,
        title: "External wirings",
        body: "The optional components connect here: OpenRAG and Qdrant with their collections and the model indexing them, the agentic harnesses with the model they are bound to, and the wiring tool that pushes the right endpoint to the team's desktops.",
        alt: "External wirings screen: RAG connectors with source collections, platform component health, agentic harnesses and coding agent configuration.",
      },
    ],
    note: "Interface mockup: the numbers, names and nodes shown are sample data.",
    more: "Full admin panel guide",
    moreHref: "/en/admin-panel",
  },

  caps: {
    id: "what-you-get",
    plate: "What you get",
    title: ["Everything you need,", "so you stop thinking about it."],
    cta: "Book a technical call",
    items: [
      { title: "Always up", body: "If the spot instance is reclaimed, Ventic reschedules the workload and brings the service back on its own — on another provider if it has to." },
      { title: "Multi-user, fair", body: "One machine shared between many people: predictable context windows and workload scheduled exactly." },
      { title: "No public IP", body: "The encrypted overlay network traverses NAT and reaches the server even when it is not exposed to the internet. It configures itself: no fragile configuration to keep alive." },
      { title: "Observability", body: "GPU, CPU and OS under control, per-user token consumption in real time, alerts on whatever channel you prefer." },
      { title: "Accounts and API keys", body: "A panel to create users and keys, revoke and rotate them. Two-factor authentication and integration with external auth providers." },
      { title: "Scale to zero", body: "If nobody is using the LLM the instance shuts down, and comes back on the first request. No hours burned on an idle box." },
      { title: "Session policies", body: "See how sessions are being used and apply restrictive content policies, per user or per key." },
      { title: "Uncensored models", body: "Useful where commercial model filters block the work: hardening, red teaming, bug bounty." },
      { title: "Multicloud", body: "The same LLM across several providers, in redundancy or failover: if one of them stops, the service does not." },
    ],
  },

  models: {
    id: "models",
    plate: "Models",
    title: ["The best open weights,", "for coding and agents."],
    lead: "State of the art across three tiers of cost and intelligence. We pick the model with you, based on the work it has to do and the GPU in front of you.",
    th: ["Model", "Tier", "Best for"],
    rows: [
      { name: "Qwen 3.8 27B", tier: "Efficient", use: "High volume and assisted coding, at the lowest cost per answer.", top: false },
      { name: "Qwen 3.8 Flash Next", tier: "Fast", use: "Agents that take many steps, where latency matters more than depth.", top: false },
      { name: "Deepseek v4 Flash 0731", tier: "Balanced", use: "The reference trade-off between code quality and throughput.", top: false },
      { name: "Kimi K3", tier: "Frontier", use: "The hardest agentic work, when you need the very best open weights.", top: true },
    ],
    note: "VRAM requirements, context window and vLLM configuration are settled together during the server analysis.",
    china: {
      title: ["Chinese weights,", "European server."],
      p1: "Today the best open-weight models come out of China. Using them through their APIs means sending your data to their servers: for many companies that is a non-starter.",
      p2: "With Ventic you download the weights and run them on your own machine, wherever you chose to put it. The model comes from China; your data never goes there.",
      tags: ["EU", "US", "on-prem"],
    },
    stable: {
      label: "Fixed weights, fixed results",
      body: "The model we install today is the same model in six months, byte for byte. No silent updates: your evals stay valid, your prompts keep behaving the same way.",
    },
  },

  pricing: {
    id: "pricing",
    plate: "Pricing",
    title: ["Three numbers.", "No surprises."],
    lead: "We do not bill per token: the bill does not depend on how hard the model works, but on how many hours the server is on and how many people have to work on it.",
    link: "Comparison and per-user cost",
    cards: [
      { tag: "BYOH · consulting", price: "€80", unit: "/ h + VAT", body: "Analysis, setup of the stack and the Ventic Agent on your hardware. Then no recurring cost.", warm: false },
      { tag: "PaaS · Ventic 16", price: "€1", unit: "/ h + VAT", body: "Qwen 3.8 27B. 16 concurrent active users, up to 100 on the roster. €160/month over business hours.", warm: true },
      { tag: "PaaS · Ventic 64", price: "€6", unit: "/ h + VAT", body: "Deepseek v4 Flash 0731. 64 concurrent active users, up to 500 on the roster. €960/month over business hours.", warm: true },
    ],
    foot: "Launch pricing, VAT excluded · business hours = 8 h × 20 days = 160 h/month · hardware, setup and support included",
  },

  cta: {
    plate: "First step",
    title: ["One hour to know", "if your server is ready."],
    body: "We look at your hardware and tell you which model actually runs on it, and how fast. If the metal is not enough we say so before, not after.",
    btn: "Book a technical call",
    mail: "Email us: info@ventic.it",
  },

  footer: {
    legal: "Netter srl · VAT IT03569900545 · Via Indipendenza, 06081 Assisi (PG), Italy",
    region: "Data in the EU or the US, your choice",
    mail: "info@ventic.it",
    links: [
      { label: "Admin panel", href: "/en/admin-panel" },
      { label: "Pricing", href: "/en/pricing" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },

  pricingPage: {
    plate: "Pricing and comparison",
    title: ["What it costs,", "and compared to what."],
    lead: "Ventic does not bill per token. You pay for consulting hours, or a fixed hourly rate per package. How hard the model works does not change the bill.",
    byoh: {
      head: "BYOH · the metal is yours",
      price: "€80",
      unit: "/ hour + VAT",
      desc: "Specialist consulting from one of our engineers, billed on hours actually worked.",
      ticks: [
        "Server analysis and compatibility check — max 1 h",
        "Inference stack setup, tuned to model and hardware",
        "Ventic Agent installed for remote access",
      ],
      note: "After setup the server stays yours and you pay us nothing recurring. Later support is hourly, when you need it.",
    },
    paas: {
      head: "PaaS · all included",
      price: "€1",
      unit: "/ hour + VAT · starting from",
      desc: "Hardware, provisioning and support in a single hourly rate. The package is chosen on how many people need to work on it.",
      ticks: [
        "Server discovery on your criteria, bought with an instant SEPA transfer",
        "Provisioning, encrypted overlay network, dashboard and observability included",
        "Scale to zero: if nobody uses it, the machine shuts down and stops costing",
        "Multicloud for redundancy or failover, when the service is critical",
      ],
      note: "Two packages available today, below. Launch pricing: locked for the duration of the contract.",
    },
    packages: {
      plate: "PaaS packages",
      title: "Two sizes, one fixed hourly rate",
      meta: "launch pricing · VAT excluded",
      labels: {
        model: "Model",
        unit: "/ h + VAT",
        active: "concurrent active users",
        seats: "users on the roster, intermediate use",
        cost: "Cost",
        h1: "8 h × 20 days",
        h2: "24 / 7",
        month: "per month",
        perActive: "per active user",
        perSeat: "per user on the roster",
      },
      items: [
        {
          name: "Ventic 16", model: "Qwen 3.8 27B", price: "€1", active: "16", seats: "100",
          month: ["€160", "€720"], perActive: ["€10.00", "€45.00"], perSeat: ["€1.60", "€7.20"],
        },
        {
          name: "Ventic 64", model: "Deepseek v4 Flash 0731", price: "€6", active: "64", seats: "500",
          month: ["€960", "€4,320"], perActive: ["€15.00", "€67.50"], perSeat: ["€1.92", "€8.64"],
        },
      ],
      foot1: "Business hours = 8 h × 20 days = 160 h/month · continuous = 24 h × 30 days = 720 h/month.",
      foot2: "Hardware, provisioning, overlay network, dashboard, observability and support are all included in the hourly rate.",
    },
    matrix: {
      title: "Ventic against the alternatives",
      meta: "same work, four ways to pay for it",
      cols: ["Criterion", "Frontier subscription", "Pay per token", "Ventic BYOH", "Ventic PaaS"],
      rows: [
        { label: "Predictable cost at month end", cells: [
          { mark: "yes", text: "Flat fee" }, { mark: "no", text: "Depends on usage" },
          { mark: "yes", text: "Nothing recurring" }, { mark: "yes", text: "Hours × rate" }] },
        { label: "Token cap or rate limit", cells: [
          { mark: "no", text: "Narrow window, then you stop" }, { mark: "dash", text: "No cap, but you pay for all of it" },
          { mark: "yes", text: "Only what the GPU can do" }, { mark: "yes", text: "Only what the GPU can do" }] },
        { label: "Continuity during a provider outage", cells: [
          { mark: "no", text: "You stop when they stop" }, { mark: "no", text: "You stop when they stop" },
          { mark: "yes", text: "Depends only on your server" }, { mark: "yes", text: "Reschedules itself, on another provider if needed" }] },
        { label: "Multicloud redundancy", cells: [
          { mark: "no", text: "Not available" }, { mark: "no", text: "Not available" },
          { mark: "dash", text: "If you own more than one server" }, { mark: "yes", text: "Yes, active redundancy or failover" }] },
        { label: "Model stability over time", cells: [
          { mark: "no", text: "Changes without notice" }, { mark: "dash", text: "Up to the provider" },
          { mark: "yes", text: "Fixed weights, you update when you choose" }, { mark: "yes", text: "Fixed weights, you update when you choose" }] },
        { label: "Where the data lives", cells: [
          { mark: "no", text: "On the provider servers" }, { mark: "no", text: "Provider servers, China included" },
          { mark: "yes", text: "On your own machine" }, { mark: "yes", text: "Region of your choice: EU or US" }] },
        { label: "Access to the machine", cells: [
          { mark: "no", text: "None" }, { mark: "no", text: "None" },
          { mark: "yes", text: "Console, SSH, however you like" }, { mark: "yes", text: "Console, SSH, however you like" }] },
        { label: "Uncensored models for security research", cells: [
          { mark: "no", text: "No" }, { mark: "no", text: "No" },
          { mark: "yes", text: "Yes, on your hardware" }, { mark: "yes", text: "Yes, on the dedicated server" }] },
        { label: "Hardware", cells: [
          { mark: "dash", text: "Not needed" }, { mark: "dash", text: "Not needed" },
          { mark: "dash", text: "Yours, in house or to buy" }, { mark: "dash", text: "From our catalogue, invoiced by us" }] },
        { label: "What you pay Ventic", cells: [
          { mark: "dash", text: "—" }, { mark: "dash", text: "—" },
          { mark: "yes", text: "€80/h + VAT, one-off" }, { mark: "yes", text: "from €1/h + VAT, all included" }] },
      ] as { label: string; cells: Cell[] }[],
    },
    sizing: {
      plate: "How it is sized",
      title: ["Not a meter.", "A workbench."],
      body: "The package is sized on the people who need to work at the same time, not on the tokens they burn. When you need more seats you add a node: one more number on the contract, not a surprise on the invoice.",
      items: [
        { label: "Instance", body: "Dedicated to your tenant. On spot instances the hourly rate drops further, and the agent handles reclaims without you noticing." },
        { label: "Redundancy", body: "A single node, or the same model across several clouds: active redundancy to carry the load, or failover to pick up where a provider stopped." },
        { label: "SLA", body: "They vary with the service and the level of redundancy chosen: we agree them together, before signing." },
        { label: "Idle time", body: "You do not pay for the hours nobody uses the LLM: the machine shuts down and comes back on the first request." },
      ],
    },
    notes: {
      plate: "Worth knowing",
      items: [
        "The packages above run on a dedicated instance. On spot instances the rate drops further, with reclaims handled by Ventic.",
        "In multicloud the same model stays reachable on a second provider, in active redundancy or failover.",
        "Prices exclude VAT. SLAs vary with the service and the level of redundancy chosen.",
      ],
      ctaTitle: "Start with the analysis.",
      ctaBody: "One hour to find out what actually runs on your hardware, and how fast.",
      ctaBtn: "Book a technical call",
    },
    foot: {
      left: "Ventic — Netter srl · VAT IT03569900545 · Via Indipendenza, 06081 Assisi (PG), Italy · info@ventic.it",
      right: "Launch pricing · values in euro, VAT excluded",
    },
  },

  adminPanelPage: {
    plate: "Panel guide",
    title: ["The control panel,", "explained line by line."],
    lead: "Everything your team administers from here: who gets in, who talks to which model, how the inventory scales — and how you resell it under your own brand if you run it as a cloud provider.",
    sections: [
      {
        id: "users",
        icon: "users",
        plate: "Users and access",
        title: "Who gets in, and with what key",
        lead: "The registry of who may talk to your models, organised the way your company — or your clients' companies — actually work.",
        points: [
          { title: "Users", body: "Active status, access expiry date and immediate revocation, one by one or in bulk." },
          { title: "Groups", body: "Users grouped by team or function: RBAC and quotas apply to the group, not person by person." },
          { title: "Domains", body: "Access tied to the organisation's email domain: whoever arrives from @yourcompany.com gets in with the rules already set." },
          { title: "Tenants", body: "Full separation between different organisations on the same panel: data, quotas and visible models never mix." },
          { title: "API tokens", body: "Every key carries an owner, a scope and an expiry. Created, rotated and revoked from here, without touching the client's code." },
          { title: "OAuth and SSO", body: "Authentication from your own provider — Google Workspace, Microsoft Entra ID, Okta or any OIDC — with two-factor enforceable by policy." },
        ],
      },
      {
        id: "roles",
        icon: "shield",
        plate: "Roles and RBAC",
        title: "Who can do what, endpoint by endpoint",
        lead: "Access control does not stop at \"who gets in\": it also decides what they can touch once inside.",
        points: [
          { title: "Four tiers", body: "User, developer, admin and superadmin: distinct roles for using the models and for administering the panel itself." },
          { title: "Per-endpoint permissions", body: "A matrix says, endpoint by endpoint, which role may read, write or administer that resource." },
          { title: "Binding rules", body: "Users, groups, domains and tenants bind to individual models through explicit allow or deny rules." },
          { title: "Inherited quota", body: "Every rule carries a quota with it: the limit applies automatically to anyone in that group, domain or tenant." },
        ],
      },
      {
        id: "models",
        icon: "provisioning",
        plate: "Model management",
        title: "The inventory that decides what runs, and how",
        lead: "Chat, multimodal and embedding in one place: from installation to standing down.",
        points: [
          { title: "Ventic catalogue", body: "Deploy a new model by picking it from ready-made templates, already tuned for the hardware available." },
          { title: "Installed inventory", body: "List of active models with node, context window, quota and replica count." },
          { title: "Quotas and allow/deny", body: "Usage limits per user, group or tenant, and explicit lists of who may or may not call a model." },
          { title: "Scaling out and in", body: "Replicas added or removed by hand or on a threshold, to absorb spikes without idle GPUs burning hours." },
          { title: "Auto shutdown and start", body: "Shutdown policies when nobody is using it, and automatic restart on the first request in queue." },
          { title: "Semantic restrictions", body: "Banned wording and concepts set per model, to apply content policy without touching the system prompt." },
          { title: "RAG sourcing", body: "Collections and knowledge bases wired to the model straight from here, with no client-side configuration." },
        ],
      },
      {
        id: "telemetry",
        icon: "ops",
        plate: "Telemetry",
        title: "All the consumption, in plain sight",
        lead: "Not just pretty dashboards: the numbers that tell you whether you are spending well or heading into saturation.",
        points: [
          { title: "Tokens per minute", body: "Trend over the last 24 hours, per model and in aggregate." },
          { title: "GPU, VRAM and power", body: "Occupancy node by node, to see where you are pushing hard and where you have headroom." },
          { title: "Per-user consumption", body: "Who is using how much, to bill correctly or spot anomalous usage." },
          { title: "Real-time alerts", body: "Notification on the channel you prefer when a threshold is crossed or a spot instance is reclaimed." },
        ],
      },
      {
        id: "wiring",
        icon: "overlay",
        plate: "External wirings",
        title: "The optional components, wired in from here",
        lead: "RAG and agentic harnesses are not bolted on the side: they hook into the panel like everything else.",
        points: [
          { title: "OpenRAG and Qdrant", body: "Source collections and the embedding model that indexes them, configured and monitored from the panel." },
          { title: "Agentic harnesses", body: "Coding agents and automated harnesses bind to the model they need to talk to, under the same RBAC rules." },
          { title: "Wiring tool", body: "The right endpoint lands automatically on the team's clients — no URLs or keys to hand out by hand." },
        ],
      },
    ],
    whiteLabel: {
      icon: "cloud",
      plate: "White label",
      title: ["Your brand,", "our platform."],
      lead: "The panel supports tenant separation from day one: use it to administer your own company, or resell access to your clients as if it were your own.",
      points: [
        { title: "Native multi-tenancy", body: "Every client is an isolated tenant: data, users, assigned models and consumption never show across tenants." },
        { title: "Resell as a cloud provider", body: "Offer subscriptions or pay-as-you-go packages to your own end clients, on capacity you bought or rented once." },
        { title: "Roles for your support team", body: "Your staff administers client tenants and users with dedicated admin roles, without ever touching the platform's superadmin level." },
        { title: "Per-tenant billing", body: "Consumption and quotas tracked per tenant: the data you need to bill each client correctly is already there." },
      ],
      note: "No need for a separate stack per client: one panel, one GPU pool, as many tenants as you need.",
    },
  },
};

export type Site = typeof it;
export const content: Record<Lang, Site> = { it, en };

export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split("/");
  return seg in languages ? (seg as Lang) : defaultLang;
}

/** Same page in the other language. */
export function alternatePath(pathname: string, target: Lang): string {
  const current = getLangFromUrl(new URL(pathname, "https://ventic.it"));
  let base = pathname;
  if (current !== defaultLang) base = base.replace(new RegExp(`^/${current}`), "") || "/";
  if (target === defaultLang) return base;
  return base === "/" ? `/${target}/` : `/${target}${base}`;
}
