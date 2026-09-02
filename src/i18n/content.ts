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
      title: "Ventic — LLM privati su GPU dedicate",
      desc: "Il tuo endpoint LLM privato, compatibile OpenAI e Anthropic. Gira sulle tue GPU — dati in UE o US — con modelli open-weight, motore di inferenza ottimizzato (vLLM, SGLang) e assistenza inclusa.",
    },
    pricing: {
      title: "Prezzi e confronto — Ventic",
      desc: "BYOH su offerta, PaaS da 1 €/h tutto incluso. Costi per utente e confronto con subscription e pagamento a token.",
    },
    adminPanel: {
      title: "Admin panel Ventic — utenti, ruoli, modelli, white label",
      desc: "Il pannello Ventic: utenti e accessi, RBAC per endpoint, gestione modelli e scaling, RAG e harness agentici, white label multi-tenant.",
    },
  },

  nav: {
    links: [
      { label: "Perché Ventic", href: "/#perche" },
      { label: "Come funziona", href: "/#come-funziona" },
      { label: "Piattaforma", href: "/#stack" },
      { label: "Prezzi", href: "/pricing/" },
      { label: "Pannello", href: "/admin-panel/" },
    ],
    cta: "Prenota una call",
    skip: "Vai al contenuto",
    langLabel: "Lingua",
  },

  hero: {
    plate: "LLM privati · GPU dedicate · Dati in UE / US",
    title: ["Crea il tuo", "LLM privato.", "Usalo come e quando vuoi."],
    lead: "Ventic è uno stack tecnologico chiavi in mano che consente di creare, gestire e configurare LLM privati. Puoi installarlo nella tua infrastruttura IT e diventa un tuo componente privato. Non dipenderai più da nessuno.",
    sub: "Pannello di controllo Admin e Self-service, gestione centralizzata, autotuning dei modelli. Fare da soli non conviene con Ventic!",
    cta1: "Prenota una call tecnica",
    cta2: "Vedi come funziona",
    micro: "Setup in giornata · Licenza da €69,90/mese · Mai a token · Alpha privata — accesso su invito",
    trust: ["Dati in UE o US, a tua scelta", "Compatibile OpenAI & Anthropic"],
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
    chips: ["qwen3.8-27b", "motore · TP 2", "embed · bge-m3"],
    chipLive: "overlay cifrato attivo",
    sample: "dati di esempio · anteprima live",
  },

  heroShots: {
    label: "Admin panel",
    host: "admin.ventic.local",
    note: "Pannello reale — dati di esempio",
  },

  problem: {
    id: "perche",
    plate: "Perché Ventic",
    title: ["I provider di LLM", "sono inadeguati."],
    lead: "Gli LLM dei Provider sono perfetti per attività estremamente specifiche e personali. Inadeguati per lavoro agentico e aziendale.",
    cards: [
      { tag: "01 — Subscription", title: "Finestre strette", body: "Quota finita, lavoro fermo. Per una persona è attesa; per un agente notturno è un guasto che scopri al mattino." },
      { tag: "02 — Subscription", title: "Outage a monte", body: "Se il provider va giù, va giù anche il tuo prodotto. Nessun failover ti salva se il modello vive solo da loro." },
      { tag: "03 — Subscription", title: "Modelli che cambiano", body: "Gli stessi prompt danno risultati diversi nel tempo. Aggiornamenti silenziosi, poca trasparenza, nessuna riproducibilità." },
      { tag: "04 — A token", title: "Prezzo per token", body: "Sui modelli di frontiera USA il costo per token è alto e cresce proprio quando il tuo prodotto ha successo." },
      { tag: "05 — A token", title: "Compliance", body: "Le alternative economiche girano su server fuori UE. Se i tuoi dati devono restare in UE, quella strada è chiusa." },
      { tag: "06 — A token", title: "Budget imprevedibile", body: "Il consumo LLM è imprevedibile per natura. In azienda diventa una voce che nessuno riesce a chiudere a budget." },
    ],
  },

  modes: {
    id: "modelli-di-ingaggio",
    plate: "Due modi di iniziare",
    title: ["Usi il tuo server,", "oppure lo troviamo noi."],
    lead: "In entrambi i casi ottieni la stessa cosa: un endpoint privato compatibile OpenAI e Anthropic, su una macchina a cui accedi quando vuoi.",
    byoh: {
      tag: "BYOH — Bring Your Own Hardware",
      title: "Utilizza i tuoi server",
      desc: "Hai già le GPU o le compri tu. Noi installiamo lo stack: verifica di compatibilità, motore di inferenza ottimizzato per la tua GPU (vLLM / SGLang), Ventic Agent, rete overlay cifrata, pannello e observability.",
      priceLabel: "Licenza Ventic + setup",
      price: "€69,90",
      unit: "/ mese + IVA",
      ticks: [
        "Verifica server e compatibilità — max 1 ora",
        "Installazione completa dello stack di inferenza",
        "Ventic Agent per accesso remoto cifrato",
      ],
      note: "Licenza Ventic Stack solo su BYOH: €69,90/mese + IVA per 5 postazioni, €39,99 + IVA ogni 10 aggiuntive. Sconti per volumi. Setup iniziale su richiesta — puoi anche fare da solo.",
    },
    paas: {
      tag: "PaaS",
      title: "Utilizza i nostri server",
      desc: "Troviamo il server giusto al prezzo giusto nel nostro catalogo, lo mettiamo in produzione e te lo fatturiamo insieme al servizio. Tutto incluso — hardware e licenza compresi.",
      priceLabel: "Tutto incluso, a ore",
      price: "da 1 €",
      unit: "/ ora + IVA",
      ticks: [
        "Scelta su tuoi criteri: spot o dedicato, UE o US, datacenter o no",
        "Acquisto con bonifico SEPA immediato",
        "Spegnimento automatico quando nessuno lo usa",
        "Multicloud per ridondanza o failover, se il servizio è critico",
      ],
      note: "Paghi solo le ore in cui il server è acceso, licenza inclusa. Mai a token.",
    },
  },

  how: {
    id: "come-funziona",
    plate: "Come funziona",
    title: ["LLM per Aziende e Provider", "in uno stack."],
    lead: "Una soluzione completa per rilasciare LLM a persone ed agenti in modo controllato. Come un Kubernetes enterprise per LLM: dichiari l'intento via GUI o manifest CLI, Ventic riconcilia lo stato desiderato — senza farti toccare driver, kernel o flag del motore di inferenza.",
    steps: [
      { title: "Troviamo il server", body: "Cerchiamo la macchina giusta al prezzo giusto, secondo i criteri che scegli. Acquisto con bonifico SEPA immediato.", tag: "solo PaaS" },
      { title: "Se non hai server, te lo diamo noi", body: "In pochi minuti configuriamo il tuo server. Oppure te lo forniamo noi, adeguato ai modelli che vuoi far girare con le caratteristiche che ti servono per il tuo workload — LLM ed embedding insieme su motore di inferenza ottimizzato (vLLM, SGLang).", tag: "in pochi minuti" },
      { title: "Lo raggiungiamo senza aprire porte", body: "Rete overlay privata e cifrata che si autoconfigura e attraversa i NAT. Niente IP pubblico, niente VPN da mantenere, nessuna porta esposta.", tag: "zero esposizione" },
      { title: "Gestiamo la lifecycle", body: "Scheduling equo fra utenti, ripristino automatico dopo outage spot, spegnimento nei momenti morti, metriche e allarmi. Con la nostra assistenza.", tag: "continuo" },
    ],
  },

  stackDiagram: {
    label: "Come interagiscono i componenti e dove sono",
    clients: { label: "Postazioni di lavoro", items: ["Agenti di coding", "App e servizi interni", "Client OpenAI / Anthropic"] },
    infra: { label: "Tua infrastruttura Docker", items: ["LLM proxy", "Admin panel", "Observability (LGTM)"] },
    nodesLabel: "Nodi GPU",
    nodes: [
      { name: "gpu-node-01", meta: "2×H100 80GB", filled: 2 },
      { name: "gpu-node-02", meta: "2×MI300X", filled: 1 },
    ],
    autoNode: { name: "gpu-node-03", meta: "si accende al bisogno", tag: "auto" },
    flowA: "API OpenAI / Anthropic",
    flowB: "Overlay cifrato · attraversa i NAT",
    replicaLabel: "repliche",
    scale: {
      label: "Autoscaling & scale-to-zero",
      rules: [
        "Oltre 80% di carico: aggiunge una replica.",
        "Sotto 25% per 10 minuti: ne toglie una.",
        "0 richieste per 15 minuti: spegne il nodo. Si riaccende alla prima chiamata.",
      ],
    },
    provisioner: {
      label: "Inference Node Provisioner (INP)",
      onPrem: { title: "INP on-premise (opzionale)", badge: "solo tue macchine", body: "Gira nella tua infra. Vede e gestisce solo le macchine del cliente: le accende/spegne secondo i manifest. Se non c'è, lo scaling è delegato al Provisioner Ventic." },
      paas: { title: "INP PaaS — lato Ventic (sempre presente)", badge: "sempre attivo", body: "Gira sul control plane Ventic. Acquisisce GPU in cloud (spot/dedicato, UE/US) e le aggancia via overlay al tuo stack — anche quando parti da on-prem e devi scalare oltre le tue macchine." },
      billing: { title: "Billing & Resale", badge: "in arrivo", body: "Contabilizza uso per tenant e prepara rivendita a subscription o a token. Architettura già predisposta — funzionalità in arrivo." },
    },
    nodesNote: "Slot accesi = repliche del modello attive su quel nodo.",
    net: {
      hint: "Scorri lo schema per intero →",
      zones: {
        clients: { t: "Postazioni di lavoro", s: "SDK invariato — cambia solo l'URL" },
        infra: { t: "La tua infrastruttura Docker", s: "on-prem o cloud — i dati restano qui" },
        overlay: { t: "Overlay", s: "cifrato mTLS" },
        nodes: { t: "Nodi di inferenza", s: "GPU tue o dal catalogo" },
        control: { t: "Control plane Ventic", s: "remoto — gestito da noi, sempre presente" },
      },
      boxes: {
        wsA: { t: "AGENTI DI CODING", s: "Claude Code · Copilot · Cursor" },
        wsB: { t: "APP E SERVIZI", s: "backend · job · automazioni" },
        wsC: { t: "OPENAI / ANTHROPIC", s: "SDK e tool esistenti" },
        proxy: { t: "LLM PROXY", s: "endpoint unico · auth · RBAC · quote" },
        panel: { t: "ADMIN PANEL", s: "utenti · modelli · policy" },
        obs: { t: "OBSERVABILITY LGTM", s: "log · metriche · tracce" },
        inpOn: { t: "INP ON-PREM", s: "vede e gestisce solo le tue macchine" },
        extras: { t: "OPENRAG · QDRANT · HARNESS", s: "moduli attivabili a richiesta" },
        relay: { t: "RELAY", s: "mTLS · NAT" },
        inpPaas: { t: "INP PAAS", s: "riceve l'intento e procura i nodi", s2: "scala oltre le tue macchine, anche da on-prem" },
        catalog: { t: "CATALOGO GPU CLOUD", s: "spot o dedicato · UE / US", s2: "acquisto SEPA immediato" },
        billing: { t: "BILLING & RESALE", s: "uso per tenant · rivendita", s2: "subscription o a token" },
      },
      badges: { opt: "opzionale", on: "sempre attivo", soon: "in arrivo", auto: "auto" },
      edges: {
        api: "API OpenAI / Anthropic",
        overlayShort: "overlay mTLS",
        overlay: "Nodi chiusi · nessun IP pubblico · mTLS",
        manage: "accende / spegne — solo le tue macchine",
        intent: "intento · manifest",
        acquire: "acquisisce",
        attach: "aggancia il nodo al tuo overlay",
      },
      notes: { noIp: "nessun IP pubblico", noVpn: "nessuna VPN da gestire" },
      legend: {
        data: "Percorso dati — richiesta e risposta",
        mtls: "Overlay cifrato mTLS",
        ctrl: "Percorso di controllo — provisioning",
        opt: "Opzionale o in arrivo",
      },
    },
  },

  infraFlow: {
    plate: "Flusso di una richiesta",
    title: "Lifecycle di una richiesta",
    lead: "La tua app parla al proxy come se fosse OpenAI. Il proxy inoltra sull’overlay cifrato fino al Ventic Agent sul nodo GPU. La risposta torna dalla stessa strada — nessun hop pubblico.",
    steps: [
      { k: "01", label: "La tua app", desc: "SDK OpenAI / Anthropic invariato. Cambia solo l’URL dell’endpoint." },
      { k: "02", label: "LLM proxy", desc: "Un unico endpoint. Autentica, applica RBAC e quote, poi inoltra." },
      { k: "03", label: "Overlay cifrato", desc: "Canale mTLS che attraversa i NAT. I nodi non espongono porte." },
      { k: "04", label: "Ventic Agent", desc: "Riceve, accoda in modo equo, alimenta il motore di inferenza." },
      { k: "05", label: "Motore di inferenza", desc: "Inferenza ottimizzata per quel modello su quella GPU (vLLM / SGLang). Risponde al proxy, il proxy a te." },
    ],
    note: "Senza IP pubblico. Senza VPN manuale. Il relay può stare in rete pubblica; i tuoi nodi restano chiusi.",
    net: {
      hint: "Scorri il percorso →",
      lane: "Percorso della richiesta",
      boxes: [
        { t: "APP", s: "SDK invariato" },
        { t: "LLM PROXY", s: "auth · RBAC · quote" },
        { t: "OVERLAY mTLS", s: "attraversa i NAT" },
        { t: "VENTIC AGENT", s: "coda equa" },
        { t: "MOTORE", s: "vLLM · SGLang" },
      ],
      back: "risposta — stessa strada al contrario",
      ctrl: "Il control plane e il provisioner restano fuori dal percorso dati",
    },
  },

  lifecycle: {
    plate: "Ciclo di vita",
    title: "Si adatta al carico. Si spegne quando non serve.",
    rules: [
      { label: "> 80% carico", body: "Aggiunge una replica GPU per assorbire il picco." },
      { label: "< 25% per 10 min", body: "Rimuove una replica. Paghi solo ciò che usi." },
      { label: "0 richieste per 15 min", body: "Spegne il nodo. Si riaccende da solo alla prima chiamata." },
      { label: "Spot revocato", body: "L’agent rischedula su un altro provider senza intervento manuale." },
    ],
    foot: "Tutto automatico. Nessun intervento notturno.",
    net: {
      hint: "Scorri il diagramma →",
      actor: { t: "INFERENCE NODE PROVISIONER", s: "osserva il carico, decide e attua — on-prem o lato Ventic" },
      states: {
        run: { t: "IN ESERCIZIO", s: "n repliche attive" },
        out: { t: "SCALE OUT", s: "+1 replica GPU" },
        inn: { t: "SCALE IN", s: "−1 replica" },
        off: { t: "SPENTO", s: "scale-to-zero · costo 0" },
        spot: { t: "SPOT REVOCATO", s: "re-provisioning automatico" },
      },
      edges: {
        up: "> 80% di carico",
        down: "< 25% per 10 min",
        off: "0 richieste per 15 min",
        wake: "1ª chiamata → riaccensione",
        resched: "rischedula su un altro provider",
      },
    },
  },

  stack: {
    id: "stack",
    plate: "Piattaforma",
    title: ["Uno stack che possiedi,", "non un servizio a cui invii i dati."],
    lead: "Pannello, proxy e observability girano sulla tua infrastruttura Docker — i dati restano da te. Sui nodi GPU gira solo il nostro agent. In mezzo, una rete overlay cifrata che si autoconfigura e attraversa i NAT senza IP pubblici né VPN da mantenere. Un Kubernetes enterprise per LLM: intent-based, gestisci tutto da GUI o via CLI con manifest file — dichiari lo stato desiderato, Ventic lo riconcilia.",
    legend: { own: "Sempre incluso", opt: "Opzionale — attivi solo se ti serve" },
    planes: [
      {
        idx: "01",
        title: "Le tue postazioni",
        where: "Sui desktop del team",
        items: [
          { name: "Coding Agent wiring tool", body: "Configura da solo l’agente di coding che già usate. Nessun endpoint da incollare a mano.", opt: false },
        ],
      },
      {
        idx: "02",
        title: "La tua infrastruttura Docker",
        where: "Dove decidi tu — on-prem o cloud",
        items: [
          { name: "Admin panel", body: "Utenti, ruoli, modelli, quote e policy. È il pannello che vedi qui sotto.", opt: false },
          { name: "LLM proxy", body: "Un endpoint solo, compatibile OpenAI e Anthropic. I client esistenti non cambiano.", opt: false },
          { name: "Observability (LGTM + Grafana)", body: "Log, metriche e tracce. I dati di utilizzo restano sulla tua infra.", opt: false },
          { name: "Inference Node Provisioner (on-prem)", body: "Opzionale. Gira nella tua infra e vede solo le tue macchine: le accende/spegne secondo i manifest. Se non c'è, lo scaling è delegato al Provisioner Ventic.", opt: true },
          { name: "OpenRAG", body: "Pipeline di retrieval sui tuoi documenti.", opt: true },
          { name: "Qdrant", body: "Database vettoriale per le collection RAG.", opt: true },
          { name: "Embedding model", body: "Indicizzazione servita dallo stesso stack di inferenza.", opt: true },
          { name: "Deepseek harness", body: "Harness agentico pronto da collegare a un modello.", opt: true },
          { name: "Openclaw", body: "Harness agentico alternativo, stessa procedura.", opt: true },
          { name: "Adapter LangChain", body: "Integrazione nativa con LangChain: i tuoi chain e tool chiamano Ventic come fosse OpenAI, con tracing OpenTelemetry completo.", opt: true },
          { name: "Nodo n8n", body: "Workflow n8n con nodo Ventic: automazioni no-code che restano dentro la tua rete, senza inviare dati a provider esterni.", opt: true },
          { name: "Observability agentica", body: "Tracciamento di ogni chiamata agente in Grafana/LGTM: latenza, token, errori e allarmi sul canale che preferisci.", opt: true },
        ],
      },
      {
        idx: "03",
        title: "Rete overlay cifrata",
        where: "Relay in rete pubblica, nodi chiusi",
        items: [
          { name: "Relay node", body: "Instrada il traffico verso host che non espongono nulla su internet. I tuoi nodi restano chiusi anche dietro NAT.", opt: false },
        ],
      },
      {
        idx: "04",
        title: "I nodi di inferenza",
        where: "Sulle GPU — tue o dal catalogo",
        items: [
          { name: "Ventic host agent", body: "Tiene in piedi il modello, lo espone sull’overlay e lo condivide equamente. È l’unico pezzo sul nodo.", opt: false },
          { name: "Motore di inferenza", body: "Basato su vLLM e SGLang, ottimizzato per quel modello su quella GPU. Serve LLM ed embedding insieme.", opt: false },
        ],
      },
      {
        idx: "05",
        title: "Control Plane Ventic (remoto)",
        where: "Gestito da noi — sempre presente",
        items: [
          { name: "Inference Node Provisioner (PaaS)", body: "Sempre attivo lato Ventic. Riceve l'intento dal tuo stack, acquisisce GPU in cloud (spot/dedicato, UE/US) e le aggancia via overlay — anche quando parti da on-prem e devi scalare oltre le tue macchine.", opt: false },
          { name: "Billing & Resale — in arrivo", body: "Contabilizza uso per tenant e prepara rivendita a subscription o a token. Architettura già predisposta — funzionalità in arrivo.", opt: true },
        ],
      },
    ],
    links: [
      "Endpoint compatibile OpenAI e Anthropic",
      "Overlay cifrato autoconfigurante — nessun IP pubblico",
      "Dopo uno spot reclaim l’agent si riconnette da solo",
    ],
    note: "Parti dal minimo (agent + overlay + proxy) e aggiungi solo ciò che ti serve. INP PaaS lato Ventic è sempre presente e può rifornire anche lo stack on-prem; INP on-prem è opzionale e vede solo le tue macchine.",
  },

  adminPanel: {
    id: "pannello",
    plate: "Admin panel",
    title: ["Chi usa cosa,", "lo decidi tu."],
    lead: "Gira accanto al proxy, sulla tua infrastruttura. Da qui installi i modelli, emetti e revochi le chiavi, decidi chi può parlare con quale modello e vedi quanto consuma ciascuno — in tempo reale.",
    chrome: "admin.ventic.local",
    shots: [
      {
        id: "users", tab: "Utenti e chiavi", src: "/admin/users.webp", w: 1440, h: 1450,
        title: "Utenti e accessi",
        body: "Utenti attivi, scadenze e revoche per gruppo, dominio e tenant. Ogni API key ha proprietario, scope e scadenza — si revoca da qui. Auth dal tuo provider (Google Workspace, Entra ID, Okta, OIDC qualsiasi) con 2FA.",
        alt: "Utenti e accessi: utenti con tenant, ruolo, scadenza e consumo token, pannello provider di autenticazione e tabella API key.",
      },
      {
        id: "rbac", tab: "Ruoli", src: "/admin/rbac.webp", w: 1440, h: 1350,
        title: "Ruoli e permessi (RBAC)",
        body: "Quattro livelli — utente, developer, admin, superadmin — e una matrice endpoint-per-endpoint su chi può fare cosa. Sotto, le regole che legano utenti, gruppi, domini e tenant ai singoli modelli, con quota annessa.",
        alt: "Ruoli e RBAC: matrice permessi per endpoint sui quattro ruoli e regole che legano soggetti ai modelli.",
      },
      {
        id: "telemetry", tab: "Telemetria", src: "/admin/telemetry.webp", w: 1440, h: 1293,
        title: "Telemetria",
        body: "Token al minuto ultime 24h, occupazione GPU/VRAM/potenza per nodo, consumo per utente. Allarmi sul canale che preferisci quando una soglia scatta o uno spot viene revocato.",
        alt: "Telemetria: grafico token al minuto, gauge GPU/VRAM per nodo, consumo per utente e allarmi recenti.",
      },
      {
        id: "wirings", tab: "Wiring", src: "/admin/wirings.webp", w: 1440, h: 1133,
        title: "Wiring esterni",
        body: "I componenti opzionali si collegano da qui: OpenRAG e Qdrant con collection e modello di embedding, harness agentici con il modello a cui sono legati, wiring tool che spinge l’endpoint sui desktop del team.",
        alt: "Wiring esterni: connettori RAG, stato componenti, harness agentici e configurazione coding agent.",
      },
    ],
  },

  selfServicePanel: {
    id: "self-service",
    plate: "Self-service",
    title: ["La chat, le chiavi,", "il wiring in un click."],
    lead: "L'utente finale non apre ticket: parla con i modelli in chat multimodale, ruota le proprie API key e incolla il wiring per Cursor, Cline, Continue o Muse — tutto sull'overlay cifrato, con le stesse quote dell'admin.",
    chrome: "llm.ventic.local",
    shots: [
      {
        id: "chat", tab: "Chat harness", src: "/selfservice/chat.webp", w: 1440, h: 900,
        title: "Chat harness multimodale",
        body: "Harness in stile ChatGPT con streaming, allegati image/file, picker modello e tool cards che aprono chiavi, wiring o quote senza uscire dalla conversazione. Vision via Qwen3-VL 32B.",
        alt: "Self-service chat: harness multimodale con selezione modello, suggerimenti e pannello conversazioni, su sfondo scuro Ventic.",
      },
      {
        id: "keys", tab: "API keys", src: "/selfservice/keys.webp", w: 1440, h: 900,
        title: "Le tue API key",
        body: "Chiavi personali tenant-scoped, create e ruotate in un click con preview sk-…xxxx. Stessa chiave per OpenAI e Anthropic, revoca immediata e rotazione zero-downtime di 5 minuti.",
        alt: "Self-service API keys: lista chiavi personali con scope, scadenza e pulsanti ruota, revoca, elimina.",
      },
      {
        id: "wiring", tab: "Wiring", src: "/selfservice/wiring.webp", w: 1440, h: 1951,
        title: "Wiring per coding agent",
        body: "Un copia-incolla per Cursor, Continue, Cline, Copilot, Codex, Muse e Windsurf: inietta OPENAI_BASE_URL / ANTHROPIC_BASE_URL e la tua chiave sull'overlay 10.88.0.0/16, QUIC + mTLS, nessun IP pubblico.",
        alt: "Self-service wiring: selettore tool, modello e chiave, snippet copiabile e griglia preset per IDE.",
      },
      {
        id: "playground", tab: "Playground", src: "/selfservice/playground.webp", w: 1440, h: 1309,
        title: "Playground modelli",
        body: "Prova al volo ogni modello con system prompt, temperature e file: stesso proxy e stesse quote della chat, risposta in streaming mock pronta per la produzione.",
        alt: "Playground: form richiesta con modello, system prompt e allegati, e pannello risposta in streaming.",
      },
      {
        id: "usage", tab: "Usage", src: "/selfservice/usage.webp", w: 1440, h: 1441,
        title: "Quota e consumo",
        body: "Grafico a barre per ora, quote per modello e stima costi giornaliera — tutto tenant-wide, con reset a mezzanotte Europe/Rome.",
        alt: "Usage self-service: barre consumo orario, quote per modello e stima costo giornaliera.",
      },
    ],
  },

  caps: {
    id: "cosa-ottieni",
    plate: "Cosa ottieni",
    title: ["Tutto ciò che serve", "per non doverci pensare."],
    cta: "Prenota una call tecnica",
    items: [
      { title: "Sempre in piedi", body: "Se l’istanza spot viene revocata, Ventic rischedula e ripristina da solo — anche su un altro provider." },
      { title: "Multi-utente equo", body: "Una macchina condivisa fra più persone: finestre di contesto prevedibili, workload schedulato in modo esatto." },
      { title: "Nessun IP pubblico", body: "L’overlay cifrato attraversa i NAT e raggiunge il server anche se non è esposto. Si autoconfigura: niente porte aperte." },
      { title: "Observability", body: "GPU, CPU e OS sotto controllo, consumo token per utente in tempo reale, allarmi sul canale che preferisci." },
      { title: "Account e API key", body: "Crei, ruoti e revochi utenti e chiavi dal pannello. 2FA e integrazione con provider esterni." },
      { title: "Scale to zero", body: "Se nessuno usa l’LLM, l’istanza si spegne e riparte alla prima richiesta. Zero ore bruciate." },
      { title: "Policy sui contenuti", body: "Vedi come sono usate le sessioni e applichi filtri per utente o per chiave." },
      { title: "Modelli uncensored", body: "Quando i filtri commerciali bloccano il lavoro: hardening, red teaming, bug bounty." },
      { title: "Multicloud", body: "Stesso modello su più provider, in ridondanza o failover: se uno si ferma, il servizio no." },
      { title: "Agenti autonomi 24/7", body: "LangChain, n8n e harness OpenClaw/DeepSeek: i tuoi agenti girano tutta la notte sull'endpoint privato, senza finestre né rate limit del provider." },
      { title: "Workflow n8n & automazioni", body: "Un nodo n8n che chiama Ventic come fosse OpenAI: pipeline no-code interne, senza webhook verso l’esterno né dati che lasciano la rete." },
      { title: "Observability agentica", body: "Tracce OpenTelemetry su ogni chiamata agente — latenza, token ed errori in Grafana/LGTM, con allarmi sul canale che preferisci." },
    ],
  },

  models: {
    id: "modelli",
    plate: "Modelli",
    title: ["Il meglio dell’open-weight,", "per coding e agenti."],
    lead: "Tre fasce di costo e intelligenza. Scegliamo il modello insieme, in base al lavoro e alla GPU che hai davanti.",
    th: ["Modello", "Fascia", "Ideale per"],
    rows: [
      { name: "Qwen 3.8 27B", tier: "Efficiente", use: "Volumi alti e coding assistito, al costo per risposta più basso.", top: false },
      { name: "Qwen 3.8 Flash Next", tier: "Veloce", use: "Agenti con molti passi: dove la latenza pesa più della profondità.", top: false },
      { name: "Deepseek v4 Flash 0731", tier: "Bilanciata", use: "Il compromesso di riferimento fra qualità sul codice e throughput.", top: false },
      { name: "Kimi K3", tier: "Frontier", use: "Lavoro agentico più difficile, quando serve il massimo dell’open-weight.", top: true },
    ],
    note: "VRAM, finestra di contesto e configurazione del motore di inferenza li fissiamo insieme durante l’analisi del server.",
    china: {
      title: ["Pesi open-weight,", "server tuo."],
      p1: "I migliori open-weight sono disponibili pubblicamente. Usarli via API esterna significa mandare i dati sui server di terzi — per molte aziende è inaccettabile.",
      p2: "Con Ventic scarichi i pesi e li fai girare sulla tua macchina, dove hai deciso tu. Il modello è aperto; i tuoi dati restano da te.",
      tags: ["UE", "US", "on-prem"],
    },
    stable: {
      label: "Pesi bloccati, risultati stabili",
      body: "Il modello installato oggi è identico fra sei mesi, byte per byte. Nessun aggiornamento silenzioso: le valutazioni restano valide, i prompt si comportano allo stesso modo.",
    },
  },

  pricing: {
    id: "prezzi",
    plate: "Prezzi",
    title: ["Tre numeri.", "Nessuna sorpresa."],
    lead: "Non fatturiamo a token. In BYOH (Bring Your Own Hardware) paghi la licenza a postazioni. In PaaS paghi a ore, licenza inclusa. Quanto scrive il modello non cambia il conto.",
    link: "Confronto e costi per utente",
    cards: [
      { tag: "BYOH · Licenza Ventic Stack", price: "€69,90", unit: "/ mese + IVA", body: "Solo su BYOH: 5 postazioni incluse. Ogni blocco di 10 aggiuntive: €39,99 + IVA. Sconti per volumi. Setup su richiesta, fai-da-te possibile.", warm: false },
      { tag: "PaaS · Ventic 16", price: "1 €", unit: "/ h + IVA", body: "Qwen 3.8 27B. 16 utenti attivi, fino a 100 in organico. 160 €/mese su orario d’ufficio, licenza inclusa.", warm: true },
      { tag: "PaaS · Ventic 64", price: "6 €", unit: "/ h + IVA", body: "Deepseek v4 Flash 0731. 64 utenti attivi, fino a 500 in organico. 960 €/mese su orario d’ufficio, licenza inclusa.", warm: true },
    ],
    foot: "Prezzi di lancio, IVA esclusa · licenza solo su BYOH: €69,90/mese per 5 postazioni + €39,99 ogni 10 aggiuntive · orario d’ufficio = 8 h × 20 gg = 160 h/mese · PaaS: hardware e licenza inclusi nella tariffa oraria",
  },

  cta: {
    plate: "Inizia ora",
    title: ["Contattaci", "per cominciare subito."],
    body: "Ti aiutiamo a scegliere il setup giusto — BYOH con i tuoi server o PaaS con i nostri — e partiamo direttamente dal workload che vuoi portare in produzione. Accesso in alpha privata su invito.",
    btn: "Prenota una call tecnica",
    mail: "Scrivici: verifica per mostrare",
    mailPrefix: "Scrivici: ",
  },

  footer: {
    legal: "Netter srl · P.IVA IT03569900545 · Via Indipendenza, 06081 Assisi (PG), Italy",
    region: "Dati in UE o US, a tua scelta",
    mail: "Mostra email",
    links: [
      { label: "Pannello", href: "/admin-panel/" },
      { label: "Prezzi", href: "/pricing/" },
      { label: "Privacy", href: "#" },
      { label: "Termini", href: "#" },
    ],
    disclaimer: "OpenAI e Anthropic sono marchi registrati dei rispettivi proprietari. Ogni diritto è riservato ai legittimi titolari. Ventic non è affiliato ad OpenAI, Inc. né ad Anthropic PBC. — Ventic è in alpha privata (accesso su invito): funzionalità e prezzi in evoluzione.",
  },
  pricingPage: {
    plate: "Prezzi e confronto",
    title: ["Risparmia e", "fai tuo l'LLM."],
    lead: "Ventic non fattura a token. In BYOH (Bring Your Own Hardware) paghi la licenza a postazioni; in PaaS paghi a ore, licenza inclusa. Quanto lavora il modello non cambia il conto.",
    byoh: {
      head: "BYOH — Bring Your Own Hardware",
      price: "€69,90",
      unit: "/ mese + IVA",
      desc: "Licenza Ventic Stack per 5 postazioni incluse. Ogni blocco di 10 aggiuntive: €39,99 + IVA. Sconti per volumi.",
      ticks: [
        "Analisi server e compatibilità — max 1 h",
        "Setup stack di inferenza ottimizzato su modello e hardware",
        "Ventic Agent per accesso remoto cifrato",
      ],
      note: "Setup iniziale su richiesta — puoi anche fare da solo. Licenza solo su BYOH: €69,90/mese per 5 postazioni, €39,99 ogni 10 aggiuntive.",
    },
    paas: {
      head: "PaaS · tutto incluso",
      price: "1 €",
      unit: "/ ora + IVA · a partire da",
      desc: "Hardware, provisioning e assistenza in un’unica tariffa oraria, licenza inclusa. Un’unica fattura: hardware + licenza Ventic.",
      ticks: [
        "Scelta server sui tuoi criteri, acquisto con bonifico SEPA immediato",
        "Provisioning, rete overlay, pannello e observability inclusi",
        "Scale to zero: se nessuno lo usa, si spegne e smette di costare",
        "Multicloud per ridondanza o failover, quando il servizio è critico",
      ],
      note: "Licenza inclusa nella tariffa oraria. Due pacchetti disponibili oggi, qui sotto. Prezzi di lancio bloccati per la durata del contratto.",
    },
    packages: {
      plate: "Pacchetti PaaS",
      title: "Due tagli, tariffa oraria — licenza inclusa",
      meta: "prezzi di lancio · IVA esclusa",
      labels: {
        model: "Modello",
        unit: "/ h + IVA",
        active: "utenti attivi insieme",
        seats: "utenti in organico (uso intermedio)",
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
      foot1: "Orario d’ufficio = 8 h × 20 giorni = 160 h/mese · continuo = 24 h × 30 giorni = 720 h/mese. Tariffa oraria PaaS include hardware + licenza.",
      foot2: "BYOH: licenza a parte €69,90/mese per 5 posti + €39,99 ogni 10 (IVA escl.) — es. 15 posti = €109,89/mese, 25 posti = €149,88/mese. Sconti per volumi.",
    },
    matrix: {
      title: "Ventic contro le alternative",
      meta: "stesso lavoro, quattro modi di pagarlo",
      cols: ["Criterio", "Subscription frontier", "Pagamento a token", "Ventic BYOH", "Ventic PaaS"],
      rows: [
        { label: "Costo prevedibile a fine mese", cells: [
          { mark: "yes", text: "Canone fisso" }, { mark: "no", text: "Dipende dal consumo" },
          { mark: "yes", text: "Licenza fissa a postazioni" }, { mark: "yes", text: "Ore × tariffa, licenza inclusa" }] },
        { label: "Tetto di token o rate limit", cells: [
          { mark: "no", text: "Finestra stretta, poi ti fermi" }, { mark: "dash", text: "Nessun tetto, ma paghi tutto" },
          { mark: "yes", text: "Solo il limite della GPU" }, { mark: "yes", text: "Solo il limite della GPU" }] },
        { label: "Continuità durante un outage", cells: [
          { mark: "no", text: "Ti fermi con loro" }, { mark: "no", text: "Ti fermi con loro" },
          { mark: "yes", text: "Dipende solo dal tuo server" }, { mark: "yes", text: "Si rischedula da solo, anche su altro provider" }] },
        { label: "Ridondanza multicloud", cells: [
          { mark: "no", text: "Non prevista" }, { mark: "no", text: "Non prevista" },
          { mark: "dash", text: "Se hai più di un server" }, { mark: "yes", text: "Sì, ridondanza o failover" }] },
        { label: "Stabilità del modello nel tempo", cells: [
          { mark: "no", text: "Cambia senza preavviso" }, { mark: "dash", text: "Dipende dal provider" },
          { mark: "yes", text: "Pesi fissi, aggiorni quando vuoi" }, { mark: "yes", text: "Pesi fissi, aggiorni quando vuoi" }] },
        { label: "Dove risiedono i dati", cells: [
          { mark: "no", text: "Sui server del provider" }, { mark: "no", text: "Sui server del provider, fuori UE" },
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
          { mark: "yes", text: "€69,90/mese + €39,99 ogni 10 posti" }, { mark: "yes", text: "da 1 €/h + IVA, tutto incluso" }] },
      ] as { label: string; cells: Cell[] }[],
    },
    sizing: {
      plate: "Come si dimensiona",
      title: ["Non un contatore.", "Un banco di lavoro."],
      body: "Il pacchetto si sceglie sulle persone che lavorano insieme nello stesso momento, non sui token. Quando servono più posti aggiungi un nodo: un numero in più sul contratto, non una sorpresa in fattura.",
      items: [
        { label: "Istanza", body: "Dedicata al tuo tenant. Su spot la tariffa scende ancora e la revoca la gestisce l’agent senza che tu te ne accorga." },
        { label: "Ridondanza", body: "Nodo singolo o stesso modello su più cloud: ridondanza attiva per reggere il carico, o failover per riprendere dove il provider si è fermato." },
        { label: "SLA", body: "Dipende da servizio e ridondanza scelta: lo fissiamo insieme prima della firma." },
        { label: "Inattività", body: "Le ore in cui nessuno usa l’LLM non le paghi: la macchina si spegne e riparte alla prima richiesta." },
      ],
    },
    notes: {
      plate: "Da tenere presente",
      items: [
        "Licenza: €69,90/mese + IVA per 5 postazioni, €39,99 + IVA ogni 10 aggiuntive. Sconti per volumi.",
        "Setup iniziale su richiesta — puoi anche installare da solo. Assistenza successiva a ore, quando serve.",
        "Pacchetti PaaS su istanza dedicata. Su spot la tariffa oraria scende ancora, con revoca gestita da Ventic.",
        "In multicloud lo stesso modello resta raggiungibile su un secondo provider (ridondanza attiva o failover).",
        "Prezzi al netto di IVA. SLA in base a servizio e ridondanza scelti.",
      ],
      ctaTitle: "Partiamo dall’analisi.",
      ctaBody: "Un’ora per capire cosa gira davvero sul tuo hardware, e a che velocità.",
      ctaBtn: "Prenota una call tecnica",
    },
    foot: {
      left: "Ventic — Netter srl · P.IVA IT03569900545 · Via Indipendenza, 06081 Assisi (PG) · verifica sul sito per contatti",
      leftPrefix: "Ventic — Netter srl · P.IVA IT03569900545 · Via Indipendenza, 06081 Assisi (PG) · ",
      right: "Prezzi di lancio · licenza + hardware · IVA esclusa",
    },
  },

  adminPanelPage: {
    plate: "Guida al pannello",
    title: ["Admin e Utenti", "interagiscono via UI."],
    lead: "Admin e utenti interagiscono con lo stack mediante una UI — GUI o CLI con manifest: chi entra, chi parla con quale modello, come scala l'inventario — e come lo rivendi con il tuo brand se fai da provider.",
    sections: [
      {
        id: "utenti",
        icon: "users",
        plate: "Utenti e accessi",
        title: "Chi entra, e con quale chiave",
        lead: "L’anagrafica di chi può usare i tuoi modelli, organizzata come è fatta la tua azienda — o quella dei tuoi clienti.",
        points: [
          { title: "Utenti", body: "Stato attivo, scadenza e revoca immediata — uno per uno o in blocco." },
          { title: "Gruppi", body: "Team o funzione: RBAC e quote si applicano al gruppo, non persona per persona." },
          { title: "Domini", body: "Accesso legato al dominio email: chi arriva da @tuaazienda.com entra con le regole già pronte." },
          { title: "Tenant", body: "Separazione completa fra organizzazioni sullo stesso pannello: dati, quote e modelli non si mescolano." },
          { title: "API token", body: "Ogni chiave ha proprietario, scope e scadenza. Si crea, ruota e revoca da qui, senza toccare codice." },
          { title: "OAuth e SSO", body: "Dal tuo provider — Google Workspace, Entra ID, Okta o OIDC qualsiasi — con 2FA applicabile in policy." },
        ],
      },
      {
        id: "ruoli",
        icon: "shield",
        plate: "Ruoli e permessi",
        title: "Chi può fare cosa, endpoint per endpoint",
        lead: "Non solo “chi entra”: decidi cosa può toccare, una volta dentro.",
        points: [
          { title: "Quattro livelli", body: "Utente, developer, admin e superadmin: ruoli per l’uso dei modelli e per l’amministrazione del pannello." },
          { title: "Permessi per endpoint", body: "Matrice che dice, endpoint per endpoint, chi può leggere, scrivere o amministrare." },
          { title: "Regole di binding", body: "Utenti, gruppi, domini e tenant legati ai singoli modelli con allow/deny espliciti." },
          { title: "Quota ereditata", body: "Ogni regola porta una quota: il limite si applica a chiunque rientri in quel gruppo o tenant." },
        ],
      },
      {
        id: "modelli",
        icon: "provisioning",
        plate: "Gestione modelli",
        title: "L’inventario che decide cosa gira, e come",
        lead: "Chat, multimodale ed embedding in un solo posto: dall’installazione alla messa a riposo.",
        points: [
          { title: "Catalogo Ventic", body: "Nuovo modello dai template pronti, già ottimizzati per l’hardware disponibile." },
          { title: "Inventario installato", body: "Elenco modelli attivi con nodo, finestra di contesto, quota e repliche." },
          { title: "Quote e allow/deny", body: "Limiti per utente/gruppo/tenant e liste esplicite di chi può chiamare un modello." },
          { title: "Scaling out e in", body: "Repliche aggiunte o tolte a mano o su soglia, per assorbire picchi senza tenere GPU accese a vuoto." },
          { title: "Auto shutdown e start", body: "Spegnimento quando nessuno lo usa, riavvio automatico alla prima richiesta." },
          { title: "Restrizioni semantiche", body: "Parole e concetti vietati per modello, per policy di contenuto senza toccare il prompt." },
          { title: "Sorgenti RAG", body: "Collection e basi di conoscenza collegate al modello direttamente da qui." },
        ],
      },
      {
        id: "telemetria",
        icon: "ops",
        plate: "Telemetria",
        title: "Tutto il consumo, sotto gli occhi",
        lead: "Non dashboard decorative: i numeri per capire se stai spendendo bene o stai per saturare.",
        points: [
          { title: "Token al minuto", body: "Andamento ultime 24 ore, per modello e in aggregato." },
          { title: "GPU, VRAM e potenza", body: "Occupazione per nodo: dove spingi e dove hai margine." },
          { title: "Consumo per utente", body: "Chi usa quanto — per addebitare o individuare abusi." },
          { title: "Allarmi in tempo reale", body: "Notifica sul canale che preferisci quando una soglia scatta o uno spot viene revocato." },
        ],
      },
      {
        id: "wiring",
        icon: "overlay",
        plate: "Wiring esterni",
        title: "I componenti opzionali, collegati da qui",
        lead: "RAG e harness agentici non sono a parte: si agganciano al pannello come il resto.",
        points: [
          { title: "OpenRAG e Qdrant", body: "Collection sorgenti e modello di embedding che le indicizza, configurati dal pannello." },
          { title: "Harness agentici", body: "Agenti e harness legati al modello a cui devono parlare, con le stesse regole RBAC." },
          { title: "Wiring tool", body: "L’endpoint giusto arriva sui desktop del team — niente URL o chiavi da distribuire a mano." },
        ],
      },
    ],
    whiteLabel: {
      icon: "cloud",
      plate: "White label",
      title: ["Il tuo brand,", "la nostra piattaforma."],
      lead: "Separazione per tenant fin dal primo giorno: amministri la tua azienda, oppure rivendi l’accesso ai tuoi clienti come fosse tuo.",
      points: [
        { title: "Multi-tenant nativo", body: "Ogni cliente è un tenant isolato: dati, utenti, modelli e consumi non si vedono fra tenant." },
        { title: "Rivendita come provider", body: "Offri subscription o pacchetti a consumo usando la capacità che hai già comprato una volta." },
        { title: "Ruoli per il tuo supporto", body: "Il tuo staff amministra tenant e clienti con ruoli admin, senza toccare il superadmin di piattaforma." },
        { title: "Fatturazione per tenant", body: "Consumo e quote tracciati per tenant: la base per fatturare ogni cliente è già pronta." },
      ],
      note: "Non serve un’infra separata per cliente: un pool di GPU, tanti tenant quanto servono.",
    },
  },
};

const en: typeof it = {
  seo: {
    home: {
      title: "Ventic — private LLMs on dedicated GPUs",
      desc: "Your private LLM endpoint, OpenAI- and Anthropic-compatible. Runs on your GPUs — data in the EU or US — with open-weight models, tuned inference engine (vLLM, SGLang) and support included.",
    },
    pricing: {
      title: "Pricing and comparison — Ventic",
      desc: "BYOH on request, PaaS from €1/h all-in. Per-user costs vs frontier subscriptions and pay-per-token.",
    },
    adminPanel: {
      title: "Ventic admin panel — users, roles, models, white label",
      desc: "The Ventic panel: users and access, endpoint RBAC, model management and scaling, RAG and harness wiring, multi-tenant white label.",
    },
  },

  nav: {
    links: [
      { label: "Why Ventic", href: "/en/#why" },
      { label: "How it works", href: "/en/#how-it-works" },
      { label: "Platform", href: "/en/#stack" },
      { label: "Pricing", href: "/en/pricing/" },
      { label: "Panel", href: "/en/admin-panel/" },
    ],
    cta: "Book a call",
    skip: "Skip to content",
    langLabel: "Language",
  },

  hero: {
    plate: "Private LLMs · Dedicated GPUs · Data in EU / US",
    title: ["Create your", "private LLM.", "Use it as you want."],
    lead: "Ventic is a turnkey technology stack that lets you create, manage and configure private LLMs. You can install it in your IT infrastructure and it becomes your own private component. You will no longer depend on anyone.",
    sub: "Admin and Self-service control panel, centralized management, model autotuning. Doing it alone doesn't pay off with Ventic!",
    cta1: "Book a technical call",
    cta2: "See how it works",
    micro: "Live in a day · License from €69.90/month · Never per-token · Private alpha — invite-only",
    trust: ["Data in EU or US, your choice", "OpenAI & Anthropic compatible"],
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
    chips: ["qwen3.8-27b", "engine · TP 2", "embed · bge-m3"],
    chipLive: "encrypted overlay up",
    sample: "sample data · live preview",
  },

  heroShots: {
    label: "Admin panel",
    host: "admin.ventic.local",
    note: "Real panel — sample data",
  },

  problem: {
    id: "why",
    plate: "Why Ventic",
    title: ["LLM providers", "are inadequate."],
    lead: "Provider LLMs are perfect for very specific, personal tasks. Inadequate for agentic and business work.",
    cards: [
      { tag: "01 — Subscription", title: "Narrow windows", body: "Quota spent, work stopped. For a person it’s a wait; for a night agent it’s a failure you discover in the morning." },
      { tag: "02 — Subscription", title: "Upstream outages", body: "When the provider goes down, your product goes with it. No failover helps if the model only lives there." },
      { tag: "03 — Subscription", title: "Moving targets", body: "The same prompts give different results over time. Silent updates, little transparency, no reproducibility." },
      { tag: "04 — Per token", title: "Price per token", body: "On US frontier models the cost per token is high — and grows exactly as your product succeeds." },
      { tag: "05 — Per token", title: "Compliance", body: "Cheap alternatives run on servers outside the EU. If your data must stay in the EU, that’s a dead end." },
      { tag: "06 — Per token", title: "Open-ended budget", body: "LLM usage is unpredictable by nature. Inside a company it becomes a line no one can close at budget time." },
    ],
  },

  modes: {
    id: "engagement-models",
    plate: "Two ways to start",
    title: ["You bring the server,", "or we source it."],
    lead: "Either way you get the same: a private OpenAI- and Anthropic-compatible endpoint on a machine you can log into anytime.",
    byoh: {
      tag: "BYOH — Bring Your Own Hardware",
      title: "Use your own servers",
      desc: "You already have GPUs or prefer to buy them. We install the stack: compatibility check, inference engine tuned to your GPU (vLLM / SGLang), Ventic Agent, encrypted overlay, panel and observability.",
      priceLabel: "Ventic Stack license + setup",
      price: "€69.90",
      unit: "/ month + VAT",
      ticks: [
        "Server and compatibility check — max 1 hour",
        "Full inference stack install",
        "Ventic Agent for encrypted remote access",
      ],
      note: "Ventic Stack license only for BYOH: €69.90/month + VAT for 5 seats, €39.99 + VAT for each extra block of 10 seats. Volume discounts. Initial setup on request — you can also install yourself.",
    },
    paas: {
      tag: "PaaS",
      title: "Use our servers",
      desc: "We find the right server at the right price in our catalogue, put it into production and invoice it with the service. All-in — hardware and license included.",
      priceLabel: "All-in, by the hour",
      price: "from €1",
      unit: "/ hour + VAT",
      ticks: [
        "Sourced to your criteria: spot or dedicated, EU or US, datacentre or not",
        "Bought with an instant SEPA transfer",
        "Auto-shutdown when nobody needs it",
        "Multicloud for redundancy or failover when critical",
      ],
      note: "You pay only for hours the server is on, license included. Never per token.",
    },
  },

  how: {
    id: "how-it-works",
    plate: "How it works",
    title: ["LLMs for Enterprises and Providers", "in one stack."],
    lead: "A complete solution to deliver LLMs to people and agents in a controlled way. Like an enterprise Kubernetes for LLMs: declare intent via GUI or CLI manifests, Ventic reconciles desired state — without touching drivers, kernels or inference engine flags.",
    steps: [
      { title: "Server sourcing", body: "The right machine sourced at the right price on your criteria. Purchased with an instant SEPA transfer.", tag: "PaaS only" },
      { title: "Provisioned ready", body: "Your server configured in minutes. Or provisioned from catalogue, sized for the models and workload characteristics you need — LLM and embedding together on a tuned inference engine (vLLM, SGLang).", tag: "in minutes" },
      { title: "Zero-exposure reach", body: "Private encrypted overlay that self-configures and traverses NAT. No public IP, no hand-rolled VPN, no ports open to the world.", tag: "zero exposure" },
      { title: "Lifecycle management", body: "Fair scheduling, auto-recovery after spot reclaim, shutdown in quiet hours, metrics and alerts. With support included.", tag: "continuous" },
    ],
  },

  stackDiagram: {
    label: "How components interact and where they run",
    clients: { label: "Workstations", items: ["Coding agents", "Internal apps & services", "OpenAI / Anthropic clients"] },
    infra: { label: "Your Docker infra", items: ["LLM proxy", "Admin panel", "Observability (LGTM)"] },
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
      label: "Autoscaling & scale-to-zero",
      rules: [
        "Above 80% load: adds a replica.",
        "Below 25% for 10 minutes: removes one.",
        "No requests for 15 minutes: powers the node off. Wakes on next call.",
      ],
    },
    provisioner: {
      label: "Inference Node Provisioner (INP)",
      onPrem: { title: "INP on-prem (optional)", badge: "your machines only", body: "Runs in your infra. Sees and manages only customer machines: powers them on/off per manifests. If absent, scaling is delegated to Ventic's Provisioner." },
      paas: { title: "INP PaaS — Ventic side (always present)", badge: "always on", body: "Runs on Ventic control plane. Acquires cloud GPUs (spot/dedicated, EU/US) and attaches them via overlay to your stack — even when you start on-prem and need to burst beyond your machines." },
      billing: { title: "Billing & Resale", badge: "coming soon", body: "Will meter per-tenant usage for resale as subscription or per-token. Architecture ready — feature coming soon." },
    },
    nodesNote: "Lit slots = model replicas currently running on that node.",
    net: {
      hint: "Scroll to see the whole map →",
      zones: {
        clients: { t: "Workstations", s: "SDK unchanged — only the URL moves" },
        infra: { t: "Your Docker infrastructure", s: "on-prem or cloud — data stays here" },
        overlay: { t: "Overlay", s: "encrypted mTLS" },
        nodes: { t: "Inference nodes", s: "your GPUs or from the catalogue" },
        control: { t: "Ventic control plane", s: "remote — run by us, always present" },
      },
      boxes: {
        wsA: { t: "CODING AGENTS", s: "Claude Code · Copilot · Cursor" },
        wsB: { t: "APPS & SERVICES", s: "backends · jobs · automations" },
        wsC: { t: "OPENAI / ANTHROPIC", s: "existing SDKs and tools" },
        proxy: { t: "LLM PROXY", s: "single endpoint · auth · RBAC · quotas" },
        panel: { t: "ADMIN PANEL", s: "users · models · policy" },
        obs: { t: "OBSERVABILITY LGTM", s: "logs · metrics · traces" },
        inpOn: { t: "ON-PREM INP", s: "sees and drives your machines only" },
        extras: { t: "OPENRAG · QDRANT · HARNESSES", s: "modules enabled on request" },
        relay: { t: "RELAY", s: "mTLS · NAT" },
        inpPaas: { t: "INP PAAS", s: "takes the intent, sources the nodes", s2: "bursts beyond your machines, even on-prem" },
        catalog: { t: "CLOUD GPU CATALOGUE", s: "spot or dedicated · EU / US", s2: "instant SEPA purchase" },
        billing: { t: "BILLING & RESALE", s: "per-tenant usage · resale", s2: "subscription or per-token" },
      },
      badges: { opt: "optional", on: "always on", soon: "coming soon", auto: "auto" },
      edges: {
        api: "OpenAI / Anthropic API",
        overlayShort: "mTLS overlay",
        overlay: "Closed nodes · no public IP · mTLS",
        manage: "powers on / off — your machines only",
        intent: "intent · manifest",
        acquire: "acquires",
        attach: "attaches the node to your overlay",
      },
      notes: { noIp: "no public IP", noVpn: "no VPN to maintain" },
      legend: {
        data: "Data path — request and response",
        mtls: "Encrypted mTLS overlay",
        ctrl: "Control path — provisioning",
        opt: "Optional or coming soon",
      },
    },
  },

  infraFlow: {
    plate: "Request flow",
    title: "Request lifecycle",
    lead: "Your app talks to the proxy as if it were OpenAI. The proxy forwards over the encrypted overlay to Ventic Agent on the GPU node. The answer comes back the same way — no public hop.",
    steps: [
      { k: "01", label: "Your app", desc: "OpenAI / Anthropic SDK unchanged. Only the endpoint URL changes." },
      { k: "02", label: "LLM proxy", desc: "Single endpoint. Authenticates, enforces RBAC and quotas, then forwards." },
      { k: "03", label: "Encrypted overlay", desc: "mTLS channel that traverses NAT. Nodes expose no ports." },
      { k: "04", label: "Ventic Agent", desc: "Receives, queues fairly, feeds the inference engine." },
      { k: "05", label: "Inference engine", desc: "Inference tuned for that model on that GPU (vLLM / SGLang). Replies to the proxy, proxy to you." },
    ],
    note: "No public IP. No manual VPN. The relay may be public; your nodes stay closed.",
    net: {
      hint: "Scroll the path →",
      lane: "Request path",
      boxes: [
        { t: "APP", s: "SDK unchanged" },
        { t: "LLM PROXY", s: "auth · RBAC · quotas" },
        { t: "mTLS OVERLAY", s: "NAT traversal" },
        { t: "VENTIC AGENT", s: "fair queue" },
        { t: "ENGINE", s: "vLLM · SGLang" },
      ],
      back: "response — same path back",
      ctrl: "Control plane and provisioner stay out of the data path",
    },
  },

  lifecycle: {
    plate: "Lifecycle",
    title: "Scales with load. Shuts down when idle.",
    rules: [
      { label: "> 80% load", body: "Adds a GPU replica to absorb the spike." },
      { label: "< 25% for 10 min", body: "Removes a replica. You pay only for what you use." },
      { label: "0 requests for 15 min", body: "Powers the node off. Wakes on the next call." },
      { label: "Spot reclaimed", body: "Agent reschedules to another provider with no hands on keyboard." },
    ],
    foot: "All automatic. No night ops.",
    net: {
      hint: "Scroll the diagram →",
      actor: { t: "INFERENCE NODE PROVISIONER", s: "watches load, decides and acts — on-prem or Ventic side" },
      states: {
        run: { t: "RUNNING", s: "n replicas live" },
        out: { t: "SCALE OUT", s: "+1 GPU replica" },
        inn: { t: "SCALE IN", s: "−1 replica" },
        off: { t: "POWERED OFF", s: "scale-to-zero · zero cost" },
        spot: { t: "SPOT RECLAIMED", s: "automatic re-provisioning" },
      },
      edges: {
        up: "> 80% load",
        down: "< 25% for 10 min",
        off: "0 requests for 15 min",
        wake: "first call → wakes up",
        resched: "reschedules on another provider",
      },
    },
  },

  stack: {
    id: "stack",
    plate: "Platform",
    title: ["A stack you own,", "not a service you ship data to."],
    lead: "Panel, proxy and observability run on your Docker infra — data stays with you. Only our agent runs on the GPU nodes. Between them, an encrypted overlay that self-configures and traverses NAT with no public IPs or VPN to maintain. An enterprise Kubernetes for LLMs: intent-based, manage everything from GUI or via CLI with manifest files — declare desired state, Ventic reconciles it.",
    legend: { own: "Always included", opt: "Optional — enable only if needed" },
    planes: [
      {
        idx: "01",
        title: "Your workstations",
        where: "On the desktops doing the work",
        items: [
          { name: "Coding Agent wiring tool", body: "Configures the coding agent your team already uses. No hand procedure, no endpoint to paste.", opt: false },
        ],
      },
      {
        idx: "02",
        title: "Your Docker infrastructure",
        where: "Wherever you decide — on-prem or cloud",
        items: [
          { name: "Admin panel", body: "Users, roles, models, quotas and policy. The panel shown below.", opt: false },
          { name: "LLM proxy", body: "One endpoint, OpenAI- and Anthropic-compatible. Existing clients stay as they are.", opt: false },
          { name: "LGTM stack", body: "Logs, metrics and traces with Grafana in front. Usage data never leaves you.", opt: false },
          { name: "Inference Node Provisioner (on-prem)", body: "Optional. Runs in your infra and sees only your machines: powers them on/off per manifests. If absent, scaling is delegated to Ventic's Provisioner.", opt: true },
          { name: "OpenRAG", body: "Retrieval pipelines over your own documents.", opt: true },
          { name: "Qdrant", body: "Vector database backing the RAG collections.", opt: true },
          { name: "Embedding model", body: "Indexing served by the same inference stack.", opt: true },
          { name: "Deepseek harness", body: "Agentic harness, ready to wire to a model.", opt: true },
          { name: "Openclaw", body: "Alternative agentic harness, same wiring.", opt: true },
          { name: "LangChain adapter", body: "Native LangChain integration: your chains and tools call Ventic as OpenAI, with full OpenTelemetry tracing.", opt: true },
          { name: "n8n node", body: "n8n workflow node for Ventic: internal no-code automations that stay inside your network, no data to external providers.", opt: true },
          { name: "Agentic observability", body: "Every agent call traced in Grafana/LGTM: latency, tokens, errors and alerts on the channel you choose.", opt: true },
        ],
      },
      {
        idx: "03",
        title: "Encrypted overlay network",
        where: "Relays public, nodes closed",
        items: [
          { name: "Relay node", body: "Routes traffic to hosts that expose nothing to the internet. Relay may be public; your nodes stay closed behind NAT.", opt: false },
        ],
      },
      {
        idx: "04",
        title: "The inference nodes",
        where: "On the GPUs — yours or from the catalogue",
        items: [
          { name: "Ventic host agent", body: "Keeps the LLM up, exposes it over the overlay and shares it fairly. The only piece on the node.", opt: false },
          { name: "Inference engine", body: "Based on vLLM and SGLang, tuned for that model on that GPU, serving LLM and embedding together.", opt: false },
        ],
      },
      {
        idx: "05",
        title: "Ventic Control Plane (remote)",
        where: "Managed by us — always present",
        items: [
          { name: "Inference Node Provisioner (PaaS)", body: "Always on, Ventic side. Receives intent from your stack, acquires cloud GPUs (spot/dedicated, EU/US) and attaches them via overlay — even when you start on-prem and need to burst beyond your machines.", opt: false },
          { name: "Billing & Resale — coming soon", body: "Meters per-tenant usage and prepares resale as subscription or per-token. Architecture ready — feature coming soon.", opt: true },
        ],
      },
    ],
    links: [
      "OpenAI- and Anthropic-compatible endpoint",
      "Self-configuring encrypted overlay — no public IPs",
      "After a spot reclaim the agent reconnects itself",
    ],
    note: "Optional parts are switched on only if you need them: the minimum stack is agent, overlay and proxy. Ventic PaaS INP is always present and can supply even on-prem stacks; on-prem INP is optional and sees only your machines.",
  },

  adminPanel: {
    id: "panel",
    plate: "Admin panel",
    title: ["Who uses what,", "decided by you."],
    lead: "Runs next to the proxy on your infra. From there you install models, issue and revoke keys, set who may talk to which model, and see what each is consuming — live.",
    chrome: "admin.ventic.local",
    shots: [
      {
        id: "users", tab: "Users and keys", src: "/admin/users.webp", w: 1440, h: 1450,
        title: "Users and access",
        body: "Active users, expiries and revocations by group, domain and tenant. Every API key has owner, scope and expiry — revoked here. Auth from your provider (Google Workspace, Entra ID, Okta, any OIDC) with 2FA.",
        alt: "Users and access: users with tenant, role, expiry and token usage, auth provider panel and API token table.",
      },
      {
        id: "rbac", tab: "Roles", src: "/admin/rbac.webp", w: 1440, h: 1350,
        title: "Roles and RBAC",
        body: "Four tiers — user, developer, admin, superadmin — and a matrix for who may do what endpoint by endpoint. Below, rules binding users, groups, domains and tenants to models, each with its quota.",
        alt: "Roles and RBAC: endpoint permission matrix across four roles and rules binding subjects to models.",
      },
      {
        id: "telemetry", tab: "Telemetry", src: "/admin/telemetry.webp", w: 1440, h: 1293,
        title: "Telemetry",
        body: "Tokens per minute last 24h, GPU/VRAM/power per node, consumption per user. Alerts on the channel you choose when a threshold fires or a spot is reclaimed.",
        alt: "Telemetry: tokens-per-minute chart, GPU/VRAM gauges per node, per-user consumption and recent alerts.",
      },
      {
        id: "wirings", tab: "Wiring", src: "/admin/wirings.webp", w: 1440, h: 1133,
        title: "External wirings",
        body: "Optional components connect here: OpenRAG and Qdrant with collections and indexing model, agentic harnesses with their bound model, and the wiring tool that pushes the right endpoint to team desktops.",
        alt: "External wirings: RAG connectors, platform health, agentic harnesses and coding agent config.",
      },
    ],
  },

  selfServicePanel: {
    id: "self-service",
    plate: "Self-service",
    title: ["Chat, keys,", "wiring in one paste."],
    lead: "No tickets: end users chat with models multimodally, rotate their own API keys and paste wiring for Cursor, Cline, Continue or Muse — all over the encrypted overlay, under the same quotas as admin.",
    chrome: "llm.ventic.local",
    shots: [
      {
        id: "chat", tab: "Chat harness", src: "/selfservice/chat.webp", w: 1440, h: 900,
        title: "Multimodal chat harness",
        body: "ChatGPT-style with streaming, image/file attachments, model picker and tool cards that open keys, wiring or quotas without leaving the conversation. Vision via Qwen3-VL 32B.",
        alt: "Self-service chat: multimodal harness with model picker, suggestions and conversation panel on Ventic dark background.",
      },
      {
        id: "keys", tab: "API keys", src: "/selfservice/keys.webp", w: 1440, h: 900,
        title: "Your API keys",
        body: "Personal tenant-scoped keys, created and rotated in one click with sk-…xxxx preview. Same key for OpenAI and Anthropic, instant revoke and 5-minute zero-downtime rotation.",
        alt: "Self-service API keys: list of personal keys with scope, expiry and rotate/revoke/delete buttons.",
      },
      {
        id: "wiring", tab: "Wiring", src: "/selfservice/wiring.webp", w: 1440, h: 1951,
        title: "Coding agent wiring",
        body: "One paste for Cursor, Continue, Cline, Copilot, Codex, Muse and Windsurf: injects OPENAI_BASE_URL / ANTHROPIC_BASE_URL and your key on the 10.88.0.0/16 overlay, QUIC + mTLS, no public IP.",
        alt: "Self-service wiring: tool, model and key selectors, copyable snippet and preset grid for IDEs.",
      },
      {
        id: "playground", tab: "Playground", src: "/selfservice/playground.webp", w: 1440, h: 1309,
        title: "Model playground",
        body: "Try any model on the fly with system prompt, temperature and files: same proxy and same quotas as chat, mock streaming response ready for production.",
        alt: "Playground: request form with model, system prompt and attachments, and streaming response panel.",
      },
      {
        id: "usage", tab: "Usage", src: "/selfservice/usage.webp", w: 1440, h: 1441,
        title: "Quota and usage",
        body: "Hourly bar chart, per-model quotas and daily cost estimate — all tenant-wide, reset at midnight Europe/Rome.",
        alt: "Self-service usage: hourly consumption bars, per-model quotas and daily cost estimate.",
      },
    ],
  },

  caps: {
    id: "what-you-get",
    plate: "What you get",
    title: ["Everything you need,", "so you stop thinking about it."],
    cta: "Book a technical call",
    items: [
      { title: "Always up", body: "If the spot is reclaimed, Ventic reschedules and restores on its own — on another provider if needed." },
      { title: "Multi-user, fair", body: "One machine shared fairly: predictable context windows and exactly scheduled workload." },
      { title: "No public IP", body: "Encrypted overlay traverses NAT to reach the server even if it’s not exposed. Self-configuring: no fragile config." },
      { title: "Observability", body: "GPU, CPU and OS in view, per-user token usage live, alerts on any channel you choose." },
      { title: "Accounts and API keys", body: "Panel to create, rotate and revoke users and keys. 2FA and external auth providers." },
      { title: "Scale to zero", body: "If nobody uses the LLM the instance powers off and wakes on the next request. No hours burned idle." },
      { title: "Session policies", body: "See how sessions are used and apply content restrictions per user or key." },
      { title: "Uncensored models", body: "For when commercial filters block the work: hardening, red teaming, bug bounty." },
      { title: "Multicloud", body: "Same model across providers, in redundancy or failover: if one stops, the service doesn’t." },
      { title: "Autonomous agents 24/7", body: "LangChain, n8n and OpenClaw/DeepSeek harnesses: your agents run all night on the private endpoint, with no provider windows or rate limits." },
      { title: "n8n workflows & automation", body: "An n8n node that calls Ventic as if it were OpenAI: internal no-code pipelines with no webhooks to the outside and no data leaving your network." },
      { title: "Agentic observability", body: "OpenTelemetry traces on every agent call — latency, tokens and errors in Grafana/LGTM, with alerts on the channel you choose." },
    ],
  },

  models: {
    id: "models",
    plate: "Models",
    title: ["The best open weights,", "for coding and agents."],
    lead: "State of the art across three tiers of cost and intelligence. We choose the model with you, based on the job and the GPU in front of you.",
    th: ["Model", "Tier", "Best for"],
    rows: [
      { name: "Qwen 3.8 27B", tier: "Efficient", use: "High volume and assisted coding, at the lowest cost per answer.", top: false },
      { name: "Qwen 3.8 Flash Next", tier: "Fast", use: "Agents with many steps: where latency matters more than depth.", top: false },
      { name: "Deepseek v4 Flash 0731", tier: "Balanced", use: "The reference trade-off between code quality and throughput.", top: false },
      { name: "Kimi K3", tier: "Frontier", use: "The hardest agentic work, when you need the best open weights.", top: true },
    ],
    note: "VRAM, context window and inference engine settings are decided together during server analysis.",
    china: {
      title: ["Open weights,", "your server."],
      p1: "The best open weights are publicly available. Using them via external APIs means sending data to third-party servers — a non-starter for many companies.",
      p2: "With Ventic you download the weights and run them on your machine, where you chose to put it. The model is open; your data stays with you.",
      tags: ["EU", "US", "on-prem"],
    },
    stable: {
      label: "Fixed weights, fixed results",
      body: "The model installed today is the same in six months, byte for byte. No silent updates: evals stay valid, prompts keep behaving the same.",
    },
  },

  pricing: {
    id: "pricing",
    plate: "Pricing",
    title: ["Three numbers.", "No surprises."],
    lead: "We don’t bill per token. BYOH (Bring Your Own Hardware) pays per-seat license. PaaS pays by the hour, license included. How much the model writes doesn’t change the bill.",
    link: "Comparison and per-user cost",
    cards: [
      { tag: "BYOH · Ventic Stack license", price: "€69.90", unit: "/ month + VAT", body: "BYOH only: 5 seats included. Each extra block of 10 seats: €39.99 + VAT. Volume discounts. Setup on request, self-install possible.", warm: false },
      { tag: "PaaS · Ventic 16", price: "€1", unit: "/ h + VAT", body: "Qwen 3.8 27B. 16 active users, up to 100 on roster. €160/month business hours, license included.", warm: true },
      { tag: "PaaS · Ventic 64", price: "€6", unit: "/ h + VAT", body: "Deepseek v4 Flash 0731. 64 active users, up to 500 on roster. €960/month business hours, license included.", warm: true },
    ],
    foot: "Launch pricing, VAT excluded · license only on BYOH: €69.90/month for 5 seats + €39.99 every 10 extra · business hours = 8 h × 20 days = 160 h/month · PaaS: hardware and license included in hourly rate",
  },

  cta: {
    plate: "Get started",
    title: ["Get in touch", "to join the alpha."],
    body: "We help you pick the right setup — BYOH with your servers or PaaS with ours — and start directly from the workload you want to put in production. Private alpha, invite-only.",
    btn: "Book a technical call",
    mail: "Email us: verify to show",
    mailPrefix: "Email us: ",
  },

  footer: {
    legal: "Netter srl · VAT IT03569900545 · Via Indipendenza, 06081 Assisi (PG), Italy",
    region: "Data in the EU or the US, your choice",
    mail: "Show email",
    links: [
      { label: "Panel", href: "/en/admin-panel/" },
      { label: "Pricing", href: "/en/pricing/" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
    disclaimer: "OpenAI and Anthropic are registered trademarks of their respective owners. All rights reserved to their legitimate owners. Ventic is not affiliated with OpenAI, Inc. or Anthropic PBC. — Ventic is in private alpha (invite-only): features and pricing subject to change.",
  },
  pricingPage: {
    plate: "Pricing and comparison",
    title: ["Save and", "own your LLM."],
    lead: "Ventic doesn’t bill per token. BYOH (Bring Your Own Hardware) pays per-seat license. PaaS pays by the hour, license included. How hard the model works doesn’t change the bill.",
    byoh: {
      head: "BYOH — Bring Your Own Hardware",
      price: "€69.90",
      unit: "/ month + VAT",
      desc: "Ventic Stack license for 5 seats included. Each extra block of 10 seats: €39.99 + VAT. Volume discounts.",
      ticks: [
        "Server and compatibility check — max 1 h",
        "Inference stack optimized for model and hardware",
        "Ventic Agent for encrypted remote access",
      ],
      note: "Initial setup on request — you can also install yourself. Recurring license: €69.90/month for 5 seats, €39.99 per extra 10.",
    },
    paas: {
      head: "PaaS · all included",
      price: "€1",
      unit: "/ hour + VAT · starting from",
      desc: "Hardware, provisioning and support in one hourly rate, license included. The PaaS hourly covers hardware + Ventic license.",
      ticks: [
        "Server sourced to your criteria, bought with instant SEPA transfer",
        "Provisioning, encrypted overlay, panel and observability included",
        "Scale to zero: if nobody uses it, it powers off and stops costing",
        "Multicloud for redundancy or failover when critical",
      ],
      note: "Hardware by the hour, license included. Launch pricing locked for the contract duration.",
    },
    packages: {
      plate: "PaaS packages",
      title: "Two sizes, one fixed hourly rate — license included",
      meta: "launch pricing · VAT excluded",
      labels: {
        model: "Model",
        unit: "/ h + VAT",
        active: "concurrent active users",
        seats: "users on roster (intermediate use)",
        cost: "Hardware cost",
        h1: "8 h × 20 days",
        h2: "24 / 7",
        month: "per month (hw)",
        perActive: "per active user (hw)",
        perSeat: "per user on roster (hw)",
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
      foot1: "Business hours = 8 h × 20 days = 160 h/month · continuous = 24 h × 30 days = 720 h/month. Hardware costs above; license included.",
      foot2: "BYOH license separate: €69.90/month for 5 seats + €39.99 per extra 10 (VAT excl.). E.g. 15 seats = €109.89/month, 25 seats = €149.88/month. Volume discounts. Setup on request.",
    },
    matrix: {
      title: "Ventic vs the alternatives",
      meta: "same work, four ways to pay",
      cols: ["Criterion", "Frontier subscription", "Pay per token", "Ventic BYOH", "Ventic PaaS"],
      rows: [
        { label: "Predictable cost at month end", cells: [
          { mark: "yes", text: "Flat fee" }, { mark: "no", text: "Depends on usage" },
          { mark: "yes", text: "Flat license per seats" }, { mark: "yes", text: "Hours × rate, license included" }] },
        { label: "Token cap or rate limit", cells: [
          { mark: "no", text: "Narrow window, then you stop" }, { mark: "dash", text: "No cap, but you pay for all" },
          { mark: "yes", text: "Only the GPU limit" }, { mark: "yes", text: "Only the GPU limit" }] },
        { label: "Continuity during an outage", cells: [
          { mark: "no", text: "You stop when they do" }, { mark: "no", text: "You stop when they do" },
          { mark: "yes", text: "Depends only on your server" }, { mark: "yes", text: "Reschedules itself, even to another provider" }] },
        { label: "Multicloud redundancy", cells: [
          { mark: "no", text: "Not available" }, { mark: "no", text: "Not available" },
          { mark: "dash", text: "If you own more than one server" }, { mark: "yes", text: "Yes, active or failover" }] },
        { label: "Model stability over time", cells: [
          { mark: "no", text: "Changes without notice" }, { mark: "dash", text: "Up to the provider" },
          { mark: "yes", text: "Fixed weights, you update when you want" }, { mark: "yes", text: "Fixed weights, you update when you want" }] },
        { label: "Where the data lives", cells: [
          { mark: "no", text: "On the provider’s servers" }, { mark: "no", text: "Provider servers, outside EU" },
          { mark: "yes", text: "On your machine" }, { mark: "yes", text: "Region you choose: EU or US" }] },
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
          { mark: "yes", text: "€69.90/mo + €39.99 per 10 seats" }, { mark: "yes", text: "from €1/h + VAT, license included" }] },
      ] as { label: string; cells: Cell[] }[],
    },
    sizing: {
      plate: "How it is sized",
      title: ["Not a meter.", "A workbench."],
      body: "Sized by people working at the same time, not tokens burned. Need more seats? Add a node: one more number on the contract, not a surprise on the invoice.",
      items: [
        { label: "Instance", body: "Dedicated to your tenant. On spot the rate drops further and reclaims are handled by the agent." },
        { label: "Redundancy", body: "Single node or same model across clouds: active to carry load, or failover to resume where the provider stopped." },
        { label: "SLA", body: "Vary by service and redundancy: agreed together before signing." },
        { label: "Idle time", body: "Hours nobody uses the LLM cost nothing: the machine powers off and wakes on the next request." },
      ],
    },
    notes: {
      plate: "Worth knowing",
      items: [
        "License: €69.90/month + VAT for 5 seats, €39.99 + VAT per extra 10. Volume discounts.",
        "Initial setup on request — you can also install yourself. Further support hourly when needed.",
        "PaaS packages on dedicated instances. On spot the hourly rate drops further, reclaims handled by Ventic, license still included.",
        "In multicloud the same model stays reachable on a second provider (active or failover).",
        "Prices excl. VAT. SLAs depend on service and redundancy.",
      ],
      ctaTitle: "Start with the analysis.",
      ctaBody: "One hour to know what actually runs on your hardware, and how fast.",
      ctaBtn: "Book a technical call",
    },
    foot: {
      left: "Ventic — Netter srl · VAT IT03569900545 · Via Indipendenza, 06081 Assisi (PG) · verify on site for contacts",
      leftPrefix: "Ventic — Netter srl · VAT IT03569900545 · Via Indipendenza, 06081 Assisi (PG) · ",
      right: "Launch pricing · license + hardware · excl. VAT",
    },
  },

  adminPanelPage: {
    plate: "Panel guide",
    title: ["Admin and Users", "interact via UI."],
    lead: "Admins and users interact with the stack via UI — GUI or CLI with manifests: who gets in, who may talk to which model, how inventory scales — and how you resell it under your brand as a provider.",
    sections: [
      {
        id: "users",
        icon: "users",
        plate: "Users and access",
        title: "Who gets in, and with which key",
        lead: "The roster of who may talk to your models, shaped like your org — or your customers’.",
        points: [
          { title: "Users", body: "Active state, access expiry and instant revocation — one by one or in bulk." },
          { title: "Groups", body: "By team or function: RBAC and quotas apply to the group, not person by person." },
          { title: "Domains", body: "Tied to the org email domain: anyone from @company.com enters with rules already set." },
          { title: "Tenants", body: "Full separation between orgs on the same panel: data, quotas and visible models never mix." },
          { title: "API tokens", body: "Every key has owner, scope and expiry. Create, rotate and revoke here without touching client code." },
          { title: "OAuth & SSO", body: "From your provider — Google Workspace, Entra ID, Okta or any OIDC — with 2FA enforceable by policy." },
        ],
      },
      {
        id: "roles",
        icon: "shield",
        plate: "Roles & RBAC",
        title: "Who may do what, endpoint by endpoint",
        lead: "Access control doesn’t stop at “who gets in”: it decides what they may touch once inside.",
        points: [
          { title: "Four tiers", body: "User, developer, admin and superadmin: distinct roles for model use and for panel administration." },
          { title: "Endpoint permissions", body: "A matrix saying, endpoint by endpoint, which role may read, write or administer that resource." },
          { title: "Binding rules", body: "Users, groups, domains and tenants bound to individual models with explicit allow or deny." },
          { title: "Inherited quota", body: "Each rule carries a quota: the limit applies automatically to anyone in that group, domain or tenant." },
        ],
      },
      {
        id: "models",
        icon: "provisioning",
        plate: "Model management",
        title: "The inventory that decides what runs — and how",
        lead: "Chat, multimodal and embedding in one place: from install to retirement.",
        points: [
          { title: "Ventic catalogue", body: "Deploy a new model from ready templates, already tuned for available hardware." },
          { title: "Installed inventory", body: "List of active models with node, context window, quota and replica count." },
          { title: "Quotas & allow/deny", body: "Usage limits per user/group/tenant and explicit lists of who may or may not call a model." },
          { title: "Scaling out and in", body: "Replicas added or removed by hand or on threshold, to absorb peaks without idling GPUs." },
          { title: "Auto shutdown & start", body: "Powers down when idle, restarts automatically on the first queued request." },
          { title: "Semantic restrictions", body: "Banned words and concepts per model, to enforce content policy without touching the system prompt." },
          { title: "RAG sources", body: "Collections and knowledge bases wired to the model directly from here." },
        ],
      },
      {
        id: "telemetry",
        icon: "ops",
        plate: "Telemetry",
        title: "All consumption, in view",
        lead: "Not vanity dashboards: the numbers you need to know if you’re spending well or about to saturate.",
        points: [
          { title: "Tokens per minute", body: "Last 24 hours, per model and aggregated." },
          { title: "GPU, VRAM & power", body: "Per node — where you’re pushing and where you have headroom." },
          { title: "Per-user consumption", body: "Who uses how much — to bill correctly or spot anomalies." },
          { title: "Real-time alerts", body: "On the channel you choose when a threshold trips or a spot is reclaimed." },
        ],
      },
      {
        id: "wiring",
        icon: "overlay",
        plate: "External wiring",
        title: "Optional components, wired from here",
        lead: "RAG and agentic harnesses aren’t separate — they plug into the panel like everything else.",
        points: [
          { title: "OpenRAG & Qdrant", body: "Source collections and the embedding model indexing them, configured from the panel." },
          { title: "Agentic harnesses", body: "Coding agents and harnesses bound to the model they must talk to, under the same RBAC." },
          { title: "Wiring tool", body: "The right endpoint lands on team desktops automatically — no URL or key to hand out." },
        ],
      },
    ],
    whiteLabel: {
      icon: "cloud",
      plate: "White label",
      title: ["Your brand,", "our platform."],
      lead: "Tenant separation from day one: run your own company, or resell access to your customers as if it were yours.",
      points: [
        { title: "Native multi-tenant", body: "Each customer is an isolated tenant: data, users, assigned models and usage never show across tenants." },
        { title: "Resell as a cloud provider", body: "Offer subscriptions or pay-as-you-go to end customers using capacity you bought once." },
        { title: "Support roles", body: "Your staff administers customer tenants and users with dedicated admin roles, without touching platform superadmin." },
        { title: "Per-tenant billing", body: "Usage and quotas tracked per tenant: the dataset to bill each customer correctly is already there." },
      ],
      note: "No separate infra per customer: one panel, one GPU pool, as many tenants as needed.",
    },
  },
};

export const content = { it, en } as const;

export function getLangFromUrl(url: URL): Lang {
  const seg = url.pathname.split("/").filter(Boolean)[0];
  return seg === "en" ? "en" : "it";
}

export function alternatePath(pathname: string, target: Lang): string {
  const isEn = pathname.startsWith("/en");
  const base = isEn ? pathname.replace(/^\/en/, "") || "/" : pathname;
  if (target === "en") return base === "/" ? "/en/" : `/en${base}`;
  return base;
}

export function alternateLang(lang: Lang): Lang {
  return lang === "it" ? "en" : "it";
}
