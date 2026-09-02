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
    privacy: {
      title: "Privacy policy — Ventic",
      desc: "Informativa privacy GDPR di Ventic (Netter srl): dati trattati, finalità, basi giuridiche, cookie, diritti e contatti del titolare.",
    },
    termini: {
      title: "Termini — Early Access Alpha — Ventic",
      desc: "Termini Early Access Alpha di Ventic (Netter srl): servizio sperimentale su invito, limitazioni, assenza di SLA, prezzi di lancio, garanzie e responsabilità in fase alpha.",
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
    micro: "Setup in giornata · Licenza da €69,90/mese · Mai a token · Alpha stage — accesso su invito",
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
      { tag: "02 — Subscription", title: "Outage del provider", body: "Se il provider va giù, va giù anche il tuo prodotto. Nessun failover ti salva se il modello vive solo da loro." },
      { tag: "03 — Subscription", title: "Modelli deprecati", body: "Gli stessi prompt danno risultati diversi nel tempo. Aggiornamenti silenziosi, poca trasparenza, nessuna riproducibilità." },
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
    foot: "Prezzi di lancio, IVA esclusa · licenza solo su BYOH: €69,90/mese per 5 postazioni + €39,99 ogni 10 aggiuntive · orario d’ufficio = 8 h × 20 gg = 160 h/mese · PaaS: hardware e licenza inclusi nella tariffa oraria · I prezzi indicati sono riservati alla early access alpha",
  },

  cta: {
    plate: "Inizia ora",
    title: ["Contattaci", "per cominciare subito."],
    body: "Ti aiutiamo a scegliere il setup giusto — BYOH con i tuoi server o PaaS con i nostri — e partiamo direttamente dal workload che vuoi portare in produzione. Accesso in Alpha stage su invito.",
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
      { label: "Termini", href: "/termini/" },
      { label: "Privacy", href: "/privacy/" },
      { label: "Cookie", href: "/privacy/#cookie" },
    ],
    disclaimer: "OpenAI e Anthropic sono marchi registrati dei rispettivi proprietari. Ogni diritto è riservato ai legittimi titolari. Ventic non è affiliato ad OpenAI, Inc. né ad Anthropic PBC. Servizio in Early Access Alpha — funzionalità e prezzi soggetti a modifica senza preavviso.",
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
      meta: "prezzi di lancio · IVA esclusa · I prezzi indicati sono riservati alla early access alpha",
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
        "I prezzi indicati sono riservati alla early access alpha.",
      ],
      ctaTitle: "Partiamo dall’analisi.",
      ctaBody: "Un’ora per capire cosa gira davvero sul tuo hardware, e a che velocità.",
      ctaBtn: "Prenota una call tecnica",
    },
    foot: {
      left: "Ventic — Netter srl · P.IVA IT03569900545 · Via Indipendenza, 06081 Assisi (PG) · verifica sul sito per contatti",
      leftPrefix: "Ventic — Netter srl · P.IVA IT03569900545 · Via Indipendenza, 06081 Assisi (PG) · ",
      right: "Prezzi di lancio · licenza + hardware · IVA esclusa · I prezzi indicati sono riservati alla early access alpha",
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
  privacy: {
    hero: {
      plate: "Informativa privacy",
      title: ["Privacy policy", "di ventic.it"],
      lead: "Informativa resa ai sensi degli artt. 13–14 del Regolamento (UE) 2016/679 (GDPR), del D.Lgs. 196/2003 come modificato dal D.Lgs. 101/2018 e delle Linee Guida EDPB. Descrive come Netter srl tratta i dati personali degli utenti che visitano ventic.it e contattano Ventic.",
      updatedLabel: "Ultimo aggiornamento",
      updatedDate: "15 maggio 2026",
      tocTitle: "Indice",
      printLabel: "Stampa / Salva PDF",
    },
    intro: {
      note: "Questa informativa riguarda esclusivamente il sito vetrina ventic.it. Non disciplina i trattamenti che avvengono dentro l’infrastruttura Ventic del cliente (BYOH / PaaS — modelli, prompt, dati caricati su GPU, collection RAG, log di inferenza): per quei trattamenti Netter opera come fornitore dello stack tecnologico e, rispetto ai dati del cliente finale, come responsabile del trattamento ex art. 28 GDPR quando previsto dal contratto; i relativi dettagli sono nel contratto e nel DPA dedicato.",
      also: "Se sei già cliente Ventic, resta valido quanto concordato nell’accordo contrattuale e nell’eventuale Data Processing Agreement (DPA).",
    },
    sections: [
      {
        id: "titolare",
        title: "1. Titolare del trattamento e contatti",
        html: "<p><strong>Titolare:</strong> <strong>Netter srl</strong>, con sede legale in Via Indipendenza, 06081 Assisi (PG), Italia — P.IVA <strong>IT03569900545</strong>.</p><p><strong>Contatti privacy:</strong> email <a href=\"mailto:info@ventic.it\">info@ventic.it</a> (oggetto: “Privacy — Ventic”). Rispondiamo di norma entro 15 giorni lavorativi. Per comunicazioni formali puoi scrivere alla sede legale all’attenzione “Privacy — Ventic”.</p><p>Non è stato designato un Responsabile della Protezione dei Dati (DPO) ai sensi dell’art. 37 GDPR, non ricorrendone i presupposti; la valutazione viene riesaminata periodicamente. Se in futuro sarà nominato, i recapiti saranno pubblicati qui.</p>",
      },
      {
        id: "ambito",
        title: "2. Ambito di applicazione",
        html: "<p>Questa informativa si applica alla navigazione del sito <strong>ventic.it</strong>, alle richieste di contatto e alla prenotazione di call tecniche effettuate tramite il sito (link Calendly/esterni e email). Si applica anche agli eventuali form, moduli o canali di contatto attivati sul dominio ventic.it e sui sottodomini funzionali (es. documentazione, status). Non si applica a siti terzi raggiungibili tramite link.</p><p>Lingua e versioni: in caso di contrasto tra versione italiana e traduzione inglese, prevale la versione italiana per gli utenti soggetti alla normativa italiana/UE.</p>",
      },
      {
        id: "tipologie",
        title: "3. Categorie di dati trattati",
        html: "<h4 class=\"h4\">3.1 Dati di navigazione e log tecnici</h4><p>I sistemi informatici e le procedure software preposte al funzionamento del sito acquisiscono, nel corso del loro normale esercizio, alcuni dati personali la cui trasmissione è implicita nell’uso dei protocolli di comunicazione di Internet. Rientrano tra questi: indirizzo IP, tipo di browser e dispositivo, sistema operativo, pagine visitate, tempi di permanenza, referrer, eventuali errori, data/ora della richiesta e altri parametri del dispositivo o dell’ambiente (es. header HTTP).</p><p>Questi dati sono necessari per rendere fruibile il sito, garantirne la sicurezza e misurare in forma aggregata le performance.</p><h4 class=\"h4\">3.2 Dati forniti volontariamente dall’utente</h4><ul><li>contenuto di email e messaggi inviati a <strong>info@ventic.it</strong> o tramite i pulsanti “Prenota una call” / “Scrivici”;</li><li>nome, cognome, azienda, ruolo, recapiti e informazioni condivise volontariamente per richiedere demo, informazioni commerciali, supporto o selezione di configurazione (BYOH / PaaS);</li><li>quando prenoti una call via fornitore esterno (es. Calendly), i dati inseriti nel form del fornitore stesso (nome, email, messaggi, preferenze orario).</li></ul><h4 class=\"h4\">3.3 Dati anti-abuso e verifica umana</h4><p>Per proteggere l’indirizzo email e i form da scraping e spam utilizziamo soluzioni anti-bot (Cloudflare Turnstile e/o TrustCaptcha). Durante la verifica possono essere elaborati identificatori tecnici quali IP, header browser, segnali di interazione e il token di verifica; non elaboriamo fingerprint invasivi né dati biometrici.</p><h4 class=\"h4\">3.4 Dati dei cookie e tecnologie simili</h4><p>Vedi sezione 4 “Cookie e tecnologie simili”.</p><p><strong>Non raccogliamo</strong> tramite il sito categorie particolari di dati (art. 9 GDPR) né dati relativi a condanne penali. Ti invitiamo a non inviare dati non necessari o di terzi senza base giuridica.</p>",
      },
      {
        id: "cookie",
        title: "4. Cookie e tecnologie simili",
        html: "<p>Il sito è volutamente leggero. <strong>Non utilizziamo cookie di profilazione né cookie di tracciamento pubblicitario</strong> di prima parte e non vendiamo dati a terzi.</p><h4 class=\"h4\">4.1 Cosa usiamo davvero</h4><table class=\"legal-table\"><thead><tr><th>Categoria</th><th>Nome / origine</th><th>Finalità</th><th>Durata</th><th>Base giuridica</th></tr></thead><tbody><tr><td>Cookie tecnici necessari</td><td>Eventuali cookie di bilanciamento o preferenza lingua (solo se attivati in futuro)</td><td>Mantenere lingua e preferenze essenziali</td><td>Sessione / 12 mesi</td><td>Necessità tecnica — non richiedono consenso (art. 122 Codice Privacy / ePrivacy)</td></tr><tr><td>Anti-abuso</td><td><code>__cf_turnstile</code>, <code>trustcaptcha_*</code> (Cloudflare / TrustCaptcha)</td><td>Verificare che la richiesta provenga da persona umana e prevenire abuso dei form/email</td><td>Sessione / fino a 24h</td><td>Legittimo interesse a proteggere il servizio (art. 6.1.f) + esecuzione di misure precontrattuali su tua richiesta</td></tr><tr><td>Font</td><td>Google Fonts (fonts.googleapis.com / fonts.gstatic.com)</td><td>Fornire il font IBM Plex Sans</td><td>Cache browser</td><td>Legittimo interesse a rendere il sito leggibile; caricamento con preconnect. IP visibile a Google come fornitore tecnico</td></tr></tbody></table><h4 class=\"h4\">4.2 Cookie di terze parti (eventuali)</h4><p>Se prenoti una call, verrai indirizzato a un fornitore esterno (es. Calendly). Quel fornitore può impostare propri cookie secondo la sua cookie policy. Prima del reindirizzamento non impostiamo cookie del fornitore.</p><h4 class=\"h4\">4.3 Come gestire i cookie</h4><p>Puoi bloccare o cancellare i cookie dalle impostazioni del browser (Chrome, Firefox, Safari, Edge). Il blocco dei cookie tecnici o anti-abuso può impedire il corretto funzionamento del sito (es. reveal dell’email o invio del form). Non è presente un banner di consenso perché non usiamo cookie che lo richiedano; se in futuro introdurremo cookie di misurazione o profilazione, mostreremo un banner conforme alle Linee Guida Garante Cookie 2021 e raccoglieremo il consenso preventivo.</p><p>Strumenti utili: <a href=\"https://www.garanteprivacy.it/cookie\" target=\"_blank\" rel=\"noopener\">guida Garante sui cookie</a>, <a href=\"https://www.youronlinechoices.com/it/\" target=\"_blank\" rel=\"noopener\">youronlinechoices.com</a>.</p>",
      },
      {
        id: "finalita",
        title: "5. Finalità e basi giuridiche",
        html: "<p>Trattiamo i tuoi dati solo quando abbiamo una base giuridica. Di seguito le finalità principali:</p><table class=\"legal-table\"><thead><tr><th>Finalità</th><th>Dati</th><th>Base giuridica (GDPR)</th></tr></thead><tbody><tr><td>Rendere disponibile il sito, garantirne sicurezza e prevenire abusi (incluso anti-bot)</td><td>Dati di navigazione, IP, token anti-abuso, log</td><td>Legittimo interesse (art. 6.1.f) — proteggere e amministrare il sito; obbligo legale di sicurezza (art. 32)</td></tr><tr><td>Rispondere a richieste di informazioni, demo, preventivi e prenotazione call</td><td>Dati forniti volontariamente, contenuto messaggi</td><td>Esecuzione di misure precontrattuali su tua richiesta (art. 6.1.b); legittimo interesse a gestire le richieste</td></tr><tr><td>Gestione del rapporto precontrattuale / contrattuale (BYOH, PaaS, analisi server, offerte)</td><td>Dati anagrafici aziendali, referenti, contenuti tecnici condivisi</td><td>Esecuzione contratto / misure precontrattuali (art. 6.1.b); adempimento obblighi legali (art. 6.1.c) per fatturazione</td></tr><tr><td>Adempimenti amministrativi, contabili e fiscali</td><td>Dati di fatturazione e contrattuali</td><td>Obbligo legale (art. 6.1.c)</td></tr><tr><td>Tutela dei diritti e difesa in giudizio</td><td>Log, corrispondenza, dati contrattuali</td><td>Legittimo interesse (art. 6.1.f) e obbligo legale</td></tr><tr><td>Comunicazioni di servizio su Ventic richieste dall’utente (follow-up)</td><td>Email e contenuto richiesta</td><td>Esecuzione di misure precontrattuali / consenso se richiesto</td></tr></tbody></table><p>Non effettuiamo processi decisionali automatizzati che producano effetti giuridici né profilazione ai sensi dell’art. 22 GDPR tramite il sito vetrina.</p>",
      },
      {
        id: "modalita",
        title: "6. Modalità di trattamento e misure di sicurezza",
        html: "<p>Il trattamento avviene con strumenti elettronici e, ove necessario, cartacei, con logiche strettamente correlate alle finalità e con misure tecniche e organizzative adeguate (art. 32 GDPR): cifratura in transito (TLS/HTTPS), minimizzazione, controllo degli accessi, logging, backup, aggiornamenti e segregazione dei ruoli. L’accesso ai dati è limitato al personale autorizzato di Netter srl e a responsabili/fornitori vincolati contrattualmente.</p><p>L’overlay cifrato mTLS e le GPU descritte nel sito riguardano il <em>prodotto</em> Ventic distribuito al cliente: quei sistemi non trattano dati dei visitatori del sito vetrina, salvo quanto necessario a erogare il servizio contrattuale e descritto nel relativo DPA.</p>",
      },
      {
        id: "luogo",
        title: "7. Luogo del trattamento",
        html: "<p>I dati del sito sono trattati presso la sede del Titolare e, per erogazione tecnica, presso fornitori di hosting / CDN ed email situati in massima parte nello Spazio Economico Europeo (SEE). Alcuni servizi tecnici (es. Google Fonts, anti-bot Cloudflare/TrustCaptcha, schedulazione call) possono comportare contatti con server ubicati anche fuori dal SEE: vedi §10.</p>",
      },
      {
        id: "conservazione",
        title: "8. Periodi di conservazione",
        html: "<table class=\"legal-table\"><thead><tr><th>Categoria</th><th>Conservazione</th></tr></thead><tbody><tr><td>Log tecnici di sicurezza e anti-abuso</td><td>fino a 12 mesi, salvo proroga per esigenze di sicurezza, esigenze difensive o richieste dell’autorità</td></tr><tr><td>Richieste di contatto / email / messaggi</td><td>24 mesi dall’ultimo contatto utile, salvo trasformazione in rapporto contrattuale</td></tr><tr><td>Dati precontrattuali e offerte</td><td>24 mesi o fino a revoca del tuo interesse</td></tr><tr><td>Dati contrattuali, fatture e adempimenti fiscali</td><td>10 anni ex art. 2220 c.c. e normativa fiscale</td></tr><tr><td>Corrispondenza necessaria a difesa in giudizio</td><td>fino a definizione del contenzioso e termini di prescrizione</td></tr></tbody></table><p>Alla scadenza i dati sono cancellati o anonimizzati. I tempi possono allungarsi solo per obblighi di legge o ordini dell’autorità.</p>",
      },
      {
        id: "destinatari",
        title: "9. Destinatari e responsabili del trattamento",
        html: "<p>I dati possono essere comunicati a:</p><ul><li><strong>Fornitori tecnici nominati responsabili ex art. 28 GDPR</strong> quando trattano dati per nostro conto: fornitore di hosting/CDN del sito statico, fornitore email, fornitori anti-bot (Cloudflare — Turnstile; TrustCaptcha / TrustComponent), fornitore di schedulazione call (es. Calendly) se utilizzi il link di prenotazione, consulenti IT/legali vincolati a riservatezza.</li><li><strong>Titolari autonomi</strong>: autorità giudiziarie, amministrative o di controllo quando previsto dalla legge; Google LLC per la fornitura del font come titolare autonomo secondo la sua privacy policy.</li><li><strong>Personale autorizzato</strong> di Netter srl (art. 29 GDPR).</li></ul><p>L’elenco aggiornato dei responsabili può essere richiesto al contatto privacy. Non diffondiamo i dati.</p>",
      },
      {
        id: "trasferimenti",
        title: "10. Trasferimenti fuori dallo SEE",
        html: "<p>Alcuni fornitori possono trattare dati in paesi fuori dallo SEE (es. Stati Uniti). In tali casi il trasferimento avviene solo verso paesi con decisione di adeguatezza della Commissione (art. 45 GDPR — es. US con Data Privacy Framework ove applicabile) o, in assenza, sulla base di <em>Clausole Contrattuali Standard</em> (art. 46) e di misure supplementari valutate caso per caso. Copia delle garanzie può essere richiesta al contatto privacy.</p><p>Per Google Fonts comunichiamo solo quanto tecnicamente necessario alla consegna del font (richiesta HTTP con IP e header): non trasmettiamo identificativi di profilazione al fornitore.</p>",
      },
      {
        id: "natura",
        title: "11. Natura del conferimento",
        html: "<p>Il conferimento dei dati di navigazione è necessario alla fruizione del sito. Il conferimento dei dati per richieste di contatto è facoltativo: senza i dati indispensabili (almeno un recapito e il contenuto della richiesta) non potremo rispondere. Il consenso, quando richiesto (es. cookie non necessari futuri), è sempre revocabile senza pregiudizio per i trattamenti precedenti.</p>",
      },
      {
        id: "diritti",
        title: "12. Diritti dell’interessato (artt. 15–22 GDPR)",
        html: "<p>Hai diritto di ottenere, nei casi previsti, l’accesso ai tuoi dati, la rettifica, la cancellazione, la limitazione, l’opposizione, la portabilità, la revoca del consenso e di non essere sottoposto a decisioni automatizzate.</p><ul><li><strong>Accesso</strong> — sapere se trattiamo dati che ti riguardano e riceverne copia (art. 15).</li><li><strong>Rettifica</strong> — correggere dati inesatti (art. 16).</li><li><strong>Cancellazione</strong> (“oblio”) — art. 17, nei casi previsti (es. revoca consenso, opposizione).</li><li><strong>Limitazione</strong> — art. 18.</li><li><strong>Portabilità</strong> — ricevere i dati forniti in formato strutturato quando il trattamento si basa su consenso o contratto (art. 20).</li><li><strong>Opposizione</strong> — art. 21, in particolare al trattamento per legittimo interesse; per marketing diretto puoi opporti in qualsiasi momento.</li><li><strong>Revoca del consenso</strong> — art. 7.3, in qualsiasi momento senza effetti retroattivi.</li></ul><p>Puoi inoltre proporre reclamo al Garante (vedi §13).</p>",
      },
      {
        id: "esercizio",
        title: "13. Come esercitare i diritti e reclamo al Garante",
        html: "<p>Per esercitare i diritti scrivi a <a href=\"mailto:info@ventic.it\">info@ventic.it</a> con oggetto “Esercizio diritti privacy — Ventic” allegando copia di un documento utile a identificarti (comunque minimizzato). Riscontriamo senza ingiustificato ritardo, al più tardi entro un mese (prorogabile di due mesi nei casi complessi, art. 12.3).</p><p>Se ritieni che il trattamento violi il GDPR, hai diritto di <strong>proporre reclamo al Garante per la protezione dei dati personali</strong> — <a href=\"https://www.garanteprivacy.it\" target=\"_blank\" rel=\"noopener\">garanteprivacy.it</a> (art. 77 GDPR) — o di adire l’autorità giudiziaria (art. 79). Informazioni e modulistica sul sito del Garante.</p><p>Per contenziosi con consumatori resta ferma la possibilità di ricorrere a organismi di risoluzione extragiudiziale ove applicabili.</p>",
      },
      {
        id: "minori",
        title: "14. Minori",
        html: "<p>Il sito non è destinato a minori di 14 anni (soglia del consenso digitale in Italia, art. 2-quinquies Codice Privacy). Non raccogliamo consapevolmente dati di minori. Se ritieni che un minore ci abbia fornito dati, contattaci per la cancellazione.</p>",
      },
      {
        id: "modifiche",
        title: "15. Modifiche a questa informativa",
        html: "<p>Possiamo aggiornare questa informativa per adeguarla a novità normative, tecniche o a evoluzioni del sito/servizio. La versione vigente è quella pubblicata qui con data di “Ultimo aggiornamento”. Modifiche sostanziali saranno evidenziate con avviso sul sito. Ti invitiamo a consultare periodicamente questa pagina.</p><p>Per richieste di chiarimento o copia di estratti contrattuali (SCC, DPA) rilevanti per i trasferimenti, scrivi al contatto privacy.</p>",
      },
    ],
    footerNote: {
      title: "Nota legale",
      body: "Questa informativa è stata redatta secondo il modello del Garante e le Linee Guida EDPB, con linguaggio semplificato senza rinunciare alla completezza. Non costituisce consulenza legale individuale; per casi particolari chiedi al tuo consulente. Se hai clausole contrattuali specifiche con Netter srl, prevalgono le pattuizioni contrattuali e il relativo DPA per i trattamenti come responsabile.",
    },
    cta: {
      title: "Hai domande sulla privacy?",
      body: "Scrivici a info@ventic.it — oggetto “Privacy — Ventic”. Per richieste di contatto commerciale usa invece il pulsante qui sotto.",
      btn: "Prenota una call tecnica",
      mailLabel: "Scrivi a info@ventic.it",
    },
  },
  termini: {
    hero: {
      plate: "Termini di servizio — Early Access Alpha",
      title: ["Termini", "Early Access Alpha"],
      lead: "Ventic è in Early Access Alpha su invito: servizio sperimentale, incompleto e instabile per definizione. Funzionalità, API, modelli, prestazioni e prezzi possono cambiare senza preavviso. Nessuna promessa di continuità, nessuna SLA. Usalo sapendo che stai testando, non comprando un prodotto finito.",
      updatedLabel: "Ultimo aggiornamento",
      updatedDate: "2 settembre 2026",
      tocTitle: "Indice",
      printLabel: "Stampa / Salva PDF",
    },
    intro: {
      note: "Questi Termini regolano l’accesso e l’uso del sito ventic.it e della piattaforma Ventic in fase Early Access Alpha, fornita da Netter srl. L’accesso alla fase Alpha è su invito, revocabile e non trasferibile. Se hai firmato un’offerta, ordine o contratto specifico con Netter srl, quel documento prevale sulle parti economiche e operative ivi regolate; per il resto restano applicabili questi Termini.",
      also: "Leggi anche l’Informativa privacy su ventic.it/privacy/ e, se sei cliente PaaS/BYOH, il relativo DPA. In caso di conflitto tra versione italiana e traduzione inglese, prevale la versione italiana per gli utenti soggetti alla normativa italiana/UE.",
    },
    sections: [
      {
        id: "oggetto",
        title: "1. Oggetto, parti e natura Alpha",
        html: "<p><strong>Fornitore:</strong> <strong>Netter srl</strong>, Via Indipendenza, 06081 Assisi (PG), Italia — P.IVA <strong>IT03569900545</strong> (“<strong>Netter</strong>”, “<strong>noi</strong>”). <strong>Utente/Cliente Alpha:</strong> persona fisica o giuridica invitata a testare Ventic (“<strong>tu</strong>”).</p><p><strong>Ventic</strong> è uno stack per LLM privati (proxy, pannello Admin/Self-service, Ventic Agent, overlay mTLS, motori vLLM/SGLang, moduli opzionali RAG/Qdrant/harness) reso disponibile in due forme: <strong>BYOH</strong> (sulle tue GPU, licenza software) e <strong>PaaS</strong> (su GPU dal nostro catalogo, hardware + licenza inclusi nella tariffa oraria).</p><p><strong>Natura Early Access Alpha:</strong> il servizio è sperimentale, non rifinito, con funzionalità mancanti, bug noti e ignoti, interruzioni frequenti, breaking change senza preavviso, possibili perdite di dati/configurazione e migrazioni manuali. Lo fornisci in Alpha proprio per aiutarci a renderlo prodotto: ci aspettiamo feedback, pazienza e uso non critico. <strong>Non è un servizio di produzione con garanzie di continuità.</strong></p><p class='note-alpha' style='border-left:3px solid var(--accent);padding:10px 14px;background:#f5a83f0f;margin:12px 0;font-size:13px;color:var(--fg-mute)'><strong>Regola d’oro Alpha:</strong> non appoggiare su Ventic Alpha carichi critici senza un piano B esterno. Se il caso d’uso non tollera fermi, aspetta la Beta/GA o concorda per iscritto condizioni diverse.</p>",
      },
      {
        id: "invito",
        title: "2. Accesso su invito, account e requisiti",
        html: "<ul><li><strong>Invito personale e revocabile.</strong> L’accesso Alpha è concesso a valle di candidatura/call e può essere sospeso o revocato in qualsiasi momento, anche senza motivo, con preavviso ragionevole quando possibile.</li><li><strong>Non trasferibile.</strong> Invito, credenziali, API key e overlay non sono cedibili a terzi senza consenso scritto di Netter.</li><li><strong>Account e chiavi.</strong> Crei utenti, gruppi, tenant e API key dal pannello. Sei responsabile di custodire le chiavi, ruotarle, revocare chi lascia il team e di ogni uso fatto con le tue credenziali.</li><li><strong>Requisiti tecnici.</strong> BYOH: hardware compatibile e connettività come da verifica (max 1 h). PaaS: disponibilità GPU spot/dedicata variabile per regione. L’overlay richiede connettività uscente; i nodi non devono esporre IP pubblico.</li><li><strong>Età e capacità.</strong> Dichiari di avere poteri per impegnare l’ente che rappresenti e di avere almeno 18 anni.</li></ul>",
      },
      {
        id: "servizio",
        title: "3. Cosa forniamo (e cosa no) in Alpha",
        html: "<h4 class='h4'>3.1 Incluso</h4><ul><li>Licenza d’uso dello stack Ventic per la durata dell’Alpha, come da offerta (BYOH a postazioni; PaaS a ore, licenza inclusa).</li><li>Pannello Admin e Self-service, LLM proxy compatibile OpenAI/Anthropic, overlay mTLS, Ventic Agent sul nodo, motori di inferenza ottimizzati.</li><li>Assistenza best-effort su canale concordato (es. email/chat dedicata Alpha) in orario lavorativo CET, senza tempi garantiti.</li><li>Observability LGTM/Grafana dove attivata; telemetria e log sull’infrastruttura che ospita lo stack.</li></ul><h4 class='h4'>3.2 Opzionale / su richiesta</h4><ul><li>Moduli RAG (OpenRAG, Qdrant), embedding, harness agentici (DeepSeek/OpenClaw), adapter LangChain, nodo n8n, INP on-prem.</li><li>Multicloud/ridondanza/failover, spot dedicato, region pinning UE/US.</li><li>Setup iniziale BYOH (puoi fare da solo) e attività a ore successive.</li></ul><h4 class='h4'>3.3 Fuori perimetro</h4><p>Non forniamo: garanzie su output dei modelli, moderazione o filtraggio custom oltre le restrizioni semantiche di pannello, backup gestiti dei tuoi dati applicativi, conformità certificata per settori regolati (es. medicale, finanziario critico) — salvo diverso accordo scritto.</p>",
      },
      {
        id: "disponibilita",
        title: "4. Disponibilità, manutenzione e assenza di SLA",
        html: "<p><strong>Nessuna SLA in Alpha.</strong> Non promettiamo uptime, latenza, throughput né RTO/RPO. Il servizio è fornito <em>best effort</em>.</p><ul><li><strong>Interruzioni e breaking change.</strong> Aggiornamenti dell’agent, del proxy, dell’overlay, dei modelli e dei motori possono interrompere il servizio o cambiare API/payload senza preavviso.</li><li><strong>Manutenzione.</strong> Finestre senza avviso in Alpha; cercheremo avvisi ragionevoli dove possibile.</li><li><strong>Spot e auto-scaling.</strong> Su PaaS spot la revoca è fisiologica: l’agent tenta il rescheduling automatico su altro provider, ma non è garantito né immediato.</li><li><strong>Scale-to-zero.</strong> Inattività &gt;15 min può spegnere il nodo; la riaccensione avviene alla prima chiamata con breve attesa.</li><li><strong>Beta/GA futura.</strong> Eventuali SLA saranno concordati per iscritto fuori dall’Alpha.</li></ul>",
      },
      {
        id: "prezzi",
        title: "5. Prezzi di lancio e fatturazione in Alpha",
        html: "<p>I prezzi esposti sul sito sono <strong>di lancio e riservati all’Early Access Alpha</strong>, IVA esclusa, e possono cambiare in Beta/GA.</p><table class='legal-table'><thead><tr><th>Voce</th><th>Importo Alpha</th><th>Note</th></tr></thead><tbody><tr><td>BYOH — Licenza Ventic Stack</td><td><strong>€69,90/mese</strong> per 5 postazioni incluse + <strong>€39,99</strong> ogni 10 aggiuntive</td><td>Solo su BYOH. Sconti volumi. Setup su richiesta o fai-da-te.</td></tr><tr><td>PaaS — Ventic 16 (Qwen 3.8 27B)</td><td><strong>1 €/h</strong> + IVA</td><td>16 utenti attivi, fino a 100 in organico. 160 € / 720 € al mese (160 h / 720 h).</td></tr><tr><td>PaaS — Ventic 64 (DeepSeek v4 Flash)</td><td><strong>6 €/h</strong> + IVA</td><td>64 utenti attivi, fino a 500. 960 € / 4.320 € al mese.</td></tr></tbody></table><ul><li><strong>Tutto incluso in PaaS:</strong> hardware + licenza nella tariffa oraria. Paghi solo le ore a nodo acceso (scale-to-zero).</li><li><strong>Blocco prezzo Alpha:</strong> per chi entra in Alpha i prezzi di lancio restano bloccati per la <strong>durata del contratto Alpha</strong> sottoscritto; rinnovi post-Alpha a condizioni GA.</li><li><strong>Fatturazione.</strong> BYOH: mensile anticipata. PaaS: a ore consuntivate, conguaglio mensile. Pagamento via bonifico SEPA immediato (PaaS) o come da offerta. Ritardi: interessi legali ex D.Lgs. 231/2002.</li><li><strong>Tasse.</strong> IVA e altri oneri esclusi.</li><li><strong>Nessun costo a token.</strong> Il consumo LLM non genera addebiti a token; contano solo postazioni/ore.</li></ul><p>Netter può correggere errori materiali di prezzo con preavviso. Se non accetti il nuovo prezzo GA, puoi recedere prima del rinnovo.</p>",
      },
      {
        id: "licenza",
        title: "6. Licenza d’uso e proprietà intellettuale",
        html: "<ul><li><strong>Licenza.</strong> Licenza non esclusiva, non trasferibile, non sublicenziabile, limitata alla durata dell’Alpha e all’uso interno (o, se provider white-label, alla rivendita ai tuoi tenant finali come da contratto). Nessun trasferimento di proprietà.</li><li><strong>Componenti.</strong> Lo stack include o richiama software open-source (es. vLLM, SGLang) e pesi open-weight con le rispettive licenze: le rispetti integralmente.</li><li><strong>Divieti.</strong> Non decompilare, aggirare misure tecniche, rimuovere loghi/avvisi, né usare Ventic per addestrare modelli concorrenti in violazione di licenze a monte.</li><li><strong>Marchi.</strong> Ventic e Netter srl restano di Netter; OpenAI/Anthropic e altri marchi citati restano dei rispettivi titolari (nessuna affiliazione).</li></ul>",
      },
      {
        id: "feedback",
        title: "7. Feedback, telemetria e contributi",
        html: "<p>Ci aiuti a migliorare Ventic con feedback, bug report, log anonimizzati, prompt di test e suggerimenti (“<strong>Feedback</strong>”). Ci concedi licenza irrevocabile, perpetua, mondiale, gratuita e sublicenziabile per usare, riprodurre e integrare il Feedback nel prodotto senza obbligo di menzione o compenso. Non inviare Feedback che non puoi licenziare.</p><p>Telemetria di servizio (utilizzo, errori, performance) può essere raccolta in forma aggregata per migliorare stabilità e sicurezza. I contenuti dei tuoi prompt/dati applicativi restano tuoi e non sono usati per addestrare modelli di terzi; vedi §9 e DPA.</p>",
      },
      {
        id: "obblighi",
        title: "8. Obblighi dell’utente e uso accettabile",
        html: "<p>Usi Ventic in modo lecito, proporzionato e senza abusare dell’Alpha. In particolare ti impegni a non:</p><ul><li>violare leggi, diritti di terzi o sanzioni applicabili; generare o diffondere contenuti illegali;</li><li>tentare accessi non autorizzati, attacchi, scraping aggressivo, bypass di RBAC/quote/overlay, o uso oltre le postazioni/ore acquistate;</li><li>condividere chiavi o accessi fuori dal perimetro autorizzato, né esporre il proxy/overlay su rete pubblica senza controllo;</li><li>usare modelli uncensored per scopi illeciti: se sbloccati per hardening/red-teaming, resti unico responsabile dell’uso conforme alla legge;</li><li>caricare dati di cui non hai diritto o categorie particolari/sensibili senza base giuridica, né dati di minori.</li></ul><p>Possiamo applicare rate limit, blocchi automatici e sospensioni per tutelare la piattaforma e gli altri tester Alpha. Segnali abusi a <a href='mailto:info@ventic.it'>info@ventic.it</a>.</p>",
      },
      {
        id: "privacy",
        title: "9. Dati, privacy e sicurezza",
        html: "<p><strong>Sito vetrina:</strong> vedi <a href='/privacy/'>Informativa privacy</a> (titolare Netter srl).</p><p><strong>Dati del servizio (BYOH/PaaS):</strong> prompt, documenti RAG, log di inferenza, collection Qdrant e dati dei tuoi utenti finali sono trattati <strong>sulla tua infrastruttura / nodo dedicato</strong>. Netter fornisce lo stack e, rispetto a quei dati, opera come <strong>responsabile ex art. 28 GDPR</strong> solo dove previsto dal contratto/DPA; per il resto non accede ai contenuti se non su tua richiesta per supporto.</p><ul><li>Overlay mTLS, isolamento per tenant, RBAC/quote e revoca chiavi come misure di base.</li><li>Sei titolare dei dati che carichi; garantisci base giuridica, informativa ai tuoi interessati e, se necessario, nomina a responsabile/DPA.</li><li>Incidenti: ci avvisiamo senza ritardo secondo DPA e obblighi di legge.</li></ul><p>Replica/DR multicloud solo se acquistata e configurata; altrimenti resta su singolo nodo/regione.</p>",
      },
      {
        id: "modelli",
        title: "10. Modelli AI, output e responsabilità sui contenuti",
        html: "<p>I modelli sono <strong>open-weight</strong> (Qwen, DeepSeek, Kimi, ecc.) eseguiti localmente: pesi bloccati, non aggiornati silenziosamente. L’output è generato probabilisticamente e può essere errato, incompleto o inappropriato.</p><ul><li><strong>Nessuna garanzia sull’output.</strong> Validazione, fact-checking e supervisione umana restano a tuo carico, specie per decisioni con effetti su persone o sistemi.</li><li><strong>Policy contenuti.</strong> Puoi applicare restrizioni semantiche e filtri per utente/chiave; resti responsabile dei contenuti generati e del loro uso.</li><li><strong>Uncensored.</strong> Modelli con filtri attenuati sono offerti solo per usi leciti (security research, hardening): li usi a tuo rischio e nel rispetto della legge.</li></ul>",
      },
      {
        id: "garanzie",
        title: "11. Assenza di garanzie (As-Is)",
        html: "<p><strong>Ventic Alpha è fornito “così com’è” e “come disponibile” (as-is / as-available)</strong>, senza garanzie espresse o implicite di commerciabilità, idoneità a scopo particolare, non violazione, accuratezza, completezza, disponibilità, sicurezza o assenza di errori — nei limiti consentiti dalla legge.</p><p>Non garantiamo che il servizio soddisfi le tue esigenze, sia ininterrotto, privo di bug, compatibile con ogni hardware, o che gli output siano corretti. Ogni affidamento è a tuo rischio. Le descrizioni sul sito sono illustrative dell’intento di prodotto, non promesse contrattuali di Alpha.</p>",
      },
      {
        id: "responsabilita",
        title: "12. Limitazione di responsabilità",
        html: "<p>Nei limiti massimi consentiti dalla legge e salvo dolo o colpa grave di Netter:</p><ul><li><strong>Esclusione danni indiretti.</strong> In nessun caso Netter risponde di lucro cessante, perdita di dati/ricavi/avviamento, costi di sostituzione, danni consequenziali, indiretti o punitivi, anche se avvisata della possibilità.</li><li><strong>Tetto economico Alpha.</strong> La responsabilità complessiva di Netter per tutte le pretese relative all’Alpha è limitata all’importo <strong>effettivamente pagato da te a Netter nei 3 mesi precedenti l’evento</strong> che ha dato origine alla pretesa (o a <strong>€500</strong> se non hai pagato nulla in Alpha gratuita/POC). Se hai più contratti, vale il contratto rilevante.</li><li><strong>Eccezioni inderogabili.</strong> Nulla limita la responsabilità che la legge dichiara inderogabile (es. diritti inderogabili del consumatore ove applicabili).</li></ul><p>Sei tenuto a mitigare i danni (es. backup, ridondanza, non uso critico in Alpha). La limitazione riflette la natura sperimentale e i prezzi di lancio.</p>",
      },
      {
        id: "durata",
        title: "13. Durata, sospensione e recesso",
        html: "<ul><li><strong>Durata Alpha.</strong> Dalla concessione dell’invito fino a chiusura dell’Alpha, scadenza dell’offerta/contratto Alpha o recesso. Netter può chiudere o sospendere l’Alpha con preavviso ragionevole (anche 7 giorni via email/avviso in pannello), salvo urgenze di sicurezza.</li><li><strong>Sospensione.</strong> Possiamo sospendere o limitare l’accesso per sicurezza, abuso, mancato pagamento, violazione dei Termini o ordini dell’autorità.</li><li><strong>Tuo recesso.</strong> Puoi smettere di usare Ventic in qualsiasi momento; per BYOH disdici la licenza a fine periodo; per PaaS spegni i nodi e saldi le ore maturate.</li><li><strong>Effetti.</strong> Alla cessazione cessa la licenza, revochiamo overlay/chiavi e puoi esportare configurazioni/dati presenti sull’infrastruttura che controlli. Log/telemetria aggregata anonima può restare per finalità legittime. Eventuali importi già maturati restano dovuti.</li></ul>",
      },
      {
        id: "modifiche",
        title: "14. Modifiche al servizio e ai Termini",
        html: "<p>Essendo Alpha, <strong>servizio e Termini cambieranno spesso</strong>.</p><ul><li><strong>Servizio:</strong> possiamo aggiungere, rimuovere o modificare funzionalità, API, modelli, requisiti hardware e prezzi futuri, anche con breaking change.</li><li><strong>Termini:</strong> la versione vigente è quella pubblicata su <a href='/termini/'>ventic.it/termini/</a> con data di aggiornamento. Modifiche sostanziali saranno comunicate con avviso sul sito e/o email. Se continui a usare Ventic dopo l’entrata in vigore, accetti i Termini aggiornati; se non accetti, cessa l’uso prima della data indicata.</li></ul><p>Se hai un contratto firmato con clausole difformi, quelle clausole prevalgono per il loro oggetto fino a scadenza.</p>",
      },
      {
        id: "legge",
        title: "15. Legge applicabile e foro competente",
        html: "<p>I Termini sono regolati dalla <strong>legge italiana</strong>, senza riguardo a conflitti di legge. Per ogni controversia relativa a Ventic Alpha e a questi Termini, comprese quelle su validità, interpretazione ed esecuzione, è competente in via esclusiva il <strong>Foro di Perugia</strong>, salvo norme inderogabili a tutela del consumatore (ove qualificabile) che prevedano foro diverso.</p><p>Eventuale invalidità di una clausola non travolge le altre; la clausola sarà sostituita con altra valida più vicina all’intento originario.</p><p>Lingua: in caso di contrasto tra italiano e traduzione inglese, prevale l’italiano per i rapporti soggetti alla legge italiana/UE.</p>",
      },
      {
        id: "contatti",
        title: "16. Contatti, comunicazioni e reclami",
        html: "<p><strong>Titolare e fornitore:</strong> Netter srl, Via Indipendenza, 06081 Assisi (PG), Italia — P.IVA IT03569900545. <strong>Email:</strong> <a href='mailto:info@ventic.it'>info@ventic.it</a> (oggetto: “Termini — Ventic Alpha”). Rispondiamo di norma entro 10 giorni lavorativi.</p><p><strong>Comunicazioni formali:</strong> sede legale all’attenzione “Ventic — Termini Alpha” o PEC se comunicata in offerta.</p><p>Per contestazioni: scrivici descrivendo l’evento e il danno asserito; cercheremo soluzione bonaria. Resta fermo il diritto di adire l’autorità/giudice competente. Per utenti consumatori: informazioni su ADR/ODR disponibili su richiesta.</p>",
      },
    ],
    footerNote: {
      title: "Nota operativa Alpha",
      body: "Stai usando un prodotto in costruzione. Prezzi, funzionalità, modelli e persino questi Termini cambieranno. Se qualcosa non ti torna o ti serve una garanzia specifica per andare in produzione, parlane prima con noi: in Alpha preferiamo un “no, non ancora” onesto a una promessa che non possiamo mantenere.",
    },
    cta: {
      title: "Domande sui Termini Alpha?",
      body: "Scrivici a info@ventic.it — oggetto “Termini — Ventic Alpha”. Per entrare in Alpha o discutere un caso d’uso, prenota una call tecnica.",
      btn: "Prenota una call tecnica",
      mailLabel: "Scrivi a info@ventic.it",
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
    privacy: {
      title: "Privacy policy — Ventic",
      desc: "GDPR privacy notice for Ventic (Netter srl): data processed, purposes, legal bases, cookies, your rights and controller contact.",
    },
    termini: {
      title: "Terms — Early Access Alpha — Ventic",
      desc: "Early Access Alpha Terms for Ventic (Netter srl): experimental invite-only service, no SLA, launch pricing, warranties and liability in alpha stage.",
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
    micro: "Live in a day · License from €69.90/month · Never per-token · Alpha stage — invite-only",
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
      { tag: "02 — Subscription", title: "Provider outage", body: "When the provider goes down, your product goes with it. No failover helps if the model only lives there." },
      { tag: "03 — Subscription", title: "Deprecated models", body: "The same prompts give different results over time. Silent updates, little transparency, no reproducibility." },
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
    foot: "Launch pricing, VAT excluded · license only on BYOH: €69.90/month for 5 seats + €39.99 every 10 extra · business hours = 8 h × 20 days = 160 h/month · PaaS: hardware and license included in hourly rate · Prices indicated are reserved for early access alpha",
  },

  cta: {
    plate: "Get started",
    title: ["Get in touch", "to join the alpha."],
    body: "We help you pick the right setup — BYOH with your servers or PaaS with ours — and start directly from the workload you want to put in production. Alpha stage, invite-only.",
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
      { label: "Terms", href: "/en/termini/" },
      { label: "Privacy", href: "/en/privacy/" },
      { label: "Cookie", href: "/en/privacy/#cookie" },
    ],
    disclaimer: "OpenAI and Anthropic are registered trademarks of their respective owners. All rights reserved to their legitimate owners. Ventic is not affiliated with OpenAI, Inc. or Anthropic PBC. Early Access Alpha — features and pricing subject to change without notice.",
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
      meta: "launch pricing · VAT excluded · Prices indicated are reserved for early access alpha",
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
        "Prices indicated are reserved for early access alpha.",
      ],
      ctaTitle: "Start with the analysis.",
      ctaBody: "One hour to know what actually runs on your hardware, and how fast.",
      ctaBtn: "Book a technical call",
    },
    foot: {
      left: "Ventic — Netter srl · VAT IT03569900545 · Via Indipendenza, 06081 Assisi (PG) · verify on site for contacts",
      leftPrefix: "Ventic — Netter srl · VAT IT03569900545 · Via Indipendenza, 06081 Assisi (PG) · ",
      right: "Launch pricing · license + hardware · excl. VAT · Prices indicated are reserved for early access alpha",
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
  privacy: {
    hero: {
      plate: "Privacy notice",
      title: ["Privacy policy", "for ventic.it"],
      lead: "Information notice under Articles 13–14 of Regulation (EU) 2016/679 (GDPR), Italian Legislative Decree 196/2003 as amended, and EDPB Guidelines. It describes how Netter srl processes personal data of visitors to ventic.it and of those who contact Ventic.",
      updatedLabel: "Last updated",
      updatedDate: "15 May 2026",
      tocTitle: "Contents",
      printLabel: "Print / Save as PDF",
    },
    intro: {
      note: "This notice covers only the showcase website ventic.it. It does not govern processing that happens inside the customer’s Ventic infrastructure (BYOH / PaaS — models, prompts, data loaded on GPUs, RAG collections, inference logs): for those, Netter acts as a technology stack supplier and, with respect to the end-customer’s data, as processor under Art. 28 GDPR where foreseen by contract; details are in the contract and in the dedicated DPA.",
      also: "If you are already a Ventic customer, your contract and any Data Processing Agreement (DPA) remain applicable.",
    },
    sections: [
      {
        id: "controller",
        title: "1. Controller and contact details",
        html: "<p><strong>Controller:</strong> <strong>Netter srl</strong>, registered office at Via Indipendenza, 06081 Assisi (PG), Italy — VAT <strong>IT03569900545</strong>.</p><p><strong>Privacy contact:</strong> email <a href=\"mailto:info@ventic.it\">info@ventic.it</a> (subject: “Privacy — Ventic”). We usually reply within 15 business days. For formal communications you can also write to the registered office, attn. “Privacy — Ventic”.</p><p>No Data Protection Officer (DPO) has been appointed under Art. 37 GDPR as the conditions are not met; this is reviewed periodically. If a DPO is appointed, contact details will be published here.</p>",
      },
      {
        id: "scope",
        title: "2. Scope",
        html: "<p>This notice applies to browsing <strong>ventic.it</strong>, to contact requests and to booking of technical calls via the site (Calendly/external links and email). It also applies to any forms or contact channels enabled on the ventic.it domain and functional sub-domains (e.g. docs, status). It does not apply to third-party sites reachable via links.</p><p>Language: if there is a conflict between the Italian version and the English translation, the Italian version prevails for users subject to Italian/EU law.</p>",
      },
      {
        id: "categories",
        title: "3. Categories of personal data",
        html: "<h4 class=\"h4\">3.1 Browsing and technical logs</h4><p>IT systems and software procedures used to operate the site acquire, in normal operation, some personal data whose transmission is implicit in Internet protocols. This includes: IP address, browser and device type, OS, pages visited, dwell time, referrer, any errors, date/time of the request and other device/environment parameters (e.g. HTTP headers).</p><p>This data is needed to make the site available, keep it secure and measure performance in aggregated form.</p><h4 class=\"h4\">3.2 Data you provide voluntarily</h4><ul><li>content of emails and messages sent to <strong>info@ventic.it</strong> or via “Book a call” / “Email us” buttons;</li><li>name, surname, company, role, contact details and information you voluntarily share to request a demo, commercial information, support or to shortlist a configuration (BYOH / PaaS);</li><li>when you book a call via an external provider (e.g. Calendly), data you enter in that provider’s form (name, email, messages, time preferences).</li></ul><h4 class=\"h4\">3.3 Anti-abuse / human verification</h4><p>To protect the email address and forms from scraping and spam we use anti-bot solutions (Cloudflare Turnstile and/or TrustCaptcha). During verification technical identifiers such as IP, browser headers, interaction signals and the verification token may be processed; we do not use invasive fingerprinting or biometric data.</p><h4 class=\"h4\">3.4 Cookies and similar technologies</h4><p>See Section 4 “Cookies and similar technologies”.</p><p><strong>We do not collect</strong> special categories of data (Art. 9 GDPR) or data on criminal convictions via the showcase site. Please do not send unnecessary data or third-party data without a lawful basis.</p>",
      },
      {
        id: "cookie",
        title: "4. Cookies and similar technologies",
        html: "<p>The site is intentionally lightweight. <strong>We do not use profiling or advertising tracking cookies</strong> of our own and we do not sell data to third parties.</p><h4 class=\"h4\">4.1 What we actually use</h4><table class=\"legal-table\"><thead><tr><th>Category</th><th>Name / origin</th><th>Purpose</th><th>Duration</th><th>Legal basis</th></tr></thead><tbody><tr><td>Strictly necessary cookies</td><td>Any load-balancing or language preference cookies (only if enabled in future)</td><td>Keep language and essential preferences</td><td>Session / 12 months</td><td>Technical necessity — consent not required (Art. 122 / ePrivacy)</td></tr><tr><td>Anti-abuse</td><td><code>__cf_turnstile</code>, <code>trustcaptcha_*</code> (Cloudflare / TrustCaptcha)</td><td>Prove the request comes from a human and prevent form/email abuse</td><td>Session / up to 24h</td><td>Legitimate interest to protect the service (Art. 6(1)(f)) + pre-contractual steps at your request</td></tr><tr><td>Fonts</td><td>Google Fonts (fonts.googleapis.com / fonts.gstatic.com)</td><td>Deliver the IBM Plex Sans font</td><td>Browser cache</td><td>Legitimate interest in legibility; loaded with preconnect. IP visible to Google as technical supplier</td></tr></tbody></table><h4 class=\"h4\">4.2 Third-party cookies (if any)</h4><p>If you book a call you will be redirected to an external provider (e.g. Calendly). That provider may set its own cookies under its cookie policy. No provider cookies are set before the redirect.</p><h4 class=\"h4\">4.3 How to manage cookies</h4><p>You can block or delete cookies in your browser settings (Chrome, Firefox, Safari, Edge). Blocking strictly necessary or anti-abuse cookies may break parts of the site (e.g. email reveal or form send). No consent banner is shown because we do not use cookies that require it; if we introduce analytics or profiling cookies in the future, we will show a banner compliant with the Italian Garante Cookie Guidelines 2021 and collect prior consent.</p><p>Useful tools: <a href=\"https://www.garanteprivacy.it/cookie\" target=\"_blank\" rel=\"noopener\">Garante guide on cookies</a>, <a href=\"https://www.youronlinechoices.com/\" target=\"_blank\" rel=\"noopener\">youronlinechoices.com</a>.</p>",
      },
      {
        id: "purposes",
        title: "5. Purposes and legal bases",
        html: "<p>We process your data only when we have a lawful basis. Main purposes:</p><table class=\"legal-table\"><thead><tr><th>Purpose</th><th>Data</th><th>Legal basis (GDPR)</th></tr></thead><tbody><tr><td>Make the site available, keep it secure and prevent abuse (incl. anti-bot)</td><td>Browsing data, IP, anti-abuse tokens, logs</td><td>Legitimate interest (Art. 6(1)(f)) — protect and administer the site; legal security duty (Art. 32)</td></tr><tr><td>Reply to requests for information, demos, quotes and call bookings</td><td>Data you provide, message content</td><td>Pre-contractual steps at your request (Art. 6(1)(b)); legitimate interest in handling requests</td></tr><tr><td>Manage the pre-contractual / contractual relationship (BYOH, PaaS, server assessment, offers)</td><td>Business contact data, technical content shared</td><td>Contract / pre-contract (Art. 6(1)(b)); legal obligations (Art. 6(1)(c)) for invoicing</td></tr><tr><td>Administrative, accounting and tax compliance</td><td>Billing and contract data</td><td>Legal obligation (Art. 6(1)(c))</td></tr><tr><td>Establish, exercise or defend legal claims</td><td>Logs, correspondence, contract data</td><td>Legitimate interest (Art. 6(1)(f)) and legal obligation</td></tr><tr><td>Service follow-ups you requested</td><td>Email and request content</td><td>Pre-contractual steps / consent where required</td></tr></tbody></table><p>We do not carry out automated decision-making producing legal effects nor profiling under Art. 22 GDPR via the showcase site.</p>",
      },
      {
        id: "how",
        title: "6. How we process data and security",
        html: "<p>Processing is carried out by electronic means and, where needed, on paper, with logic strictly related to the purposes and with appropriate technical and organisational measures (Art. 32 GDPR): encryption in transit (TLS/HTTPS), minimisation, access controls, logging, backups, updates and role separation. Access is limited to authorised Netter srl personnel and to processors/suppliers bound by contract.</p><p>The encrypted mTLS overlay and GPUs described on the site concern the <em>product</em> Ventic delivered to the customer: those systems do not process visitor data of the showcase site except as needed to deliver the contracted service and as described in the relevant DPA.</p>",
      },
      {
        id: "location",
        title: "7. Place of processing",
        html: "<p>Site data are processed at the controller’s premises and, for technical delivery, at hosting / CDN and email suppliers located mostly in the European Economic Area (EEA). Some technical services (e.g. Google Fonts, anti-bot Cloudflare/TrustCaptcha, call scheduling) may involve contact with servers outside the EEA as well: see §10.</p>",
      },
      {
        id: "retention",
        title: "8. Retention periods",
        html: "<table class=\"legal-table\"><thead><tr><th>Category</th><th>Retention</th></tr></thead><tbody><tr><td>Security and anti-abuse technical logs</td><td>up to 12 months, unless extended for security, defence or authority requests</td></tr><tr><td>Contact requests / emails / messages</td><td>24 months from last useful contact, unless it becomes a contractual relationship</td></tr><tr><td>Pre-contractual data and quotes</td><td>24 months or until you withdraw interest</td></tr><tr><td>Contract data, invoices and tax records</td><td>10 years under Art. 2220 Civil Code and tax law</td></tr><tr><td>Correspondence needed for litigation</td><td>until the dispute is settled and limitation periods expire</td></tr></tbody></table><p>After expiry data are deleted or anonymised. Periods may be extended only by law or order of an authority.</p>",
      },
      {
        id: "recipients",
        title: "9. Recipients and processors",
        html: "<p>Data may be shared with:</p><ul><li><strong>Processors under Art. 28 GDPR</strong> where they process data on our behalf: static-site hosting/CDN provider, email provider, anti-bot providers (Cloudflare — Turnstile; TrustCaptcha / TrustComponent), call-scheduling provider (e.g. Calendly) if you use the booking link, IT/legal consultants bound by confidentiality.</li><li><strong>Independent controllers</strong>: courts, administrative or supervisory authorities where required by law; Google LLC for font delivery as independent controller under its privacy policy.</li><li><strong>Authorised personnel</strong> of Netter srl (Art. 29 GDPR).</li></ul><p>An up-to-date list of processors is available on request to the privacy contact. We do not disseminate data.</p>",
      },
      {
        id: "transfers",
        title: "10. Transfers outside the EEA",
        html: "<p>Some suppliers may process data in countries outside the EEA (e.g. United States). Transfers then occur only to countries with an adequacy decision (Art. 45 GDPR — e.g. US under the Data Privacy Framework where applicable) or, failing that, on the basis of <em>Standard Contractual Clauses</em> (Art. 46) plus supplementary measures assessed case by case. A copy of safeguards can be requested from the privacy contact.</p><p>For Google Fonts we transmit only what is technically needed to deliver the font (HTTP request with IP and headers): we do not transmit profiling identifiers to the provider.</p>",
      },
      {
        id: "nature",
        title: "11. Nature of provision",
        html: "<p>Browsing data are necessary to use the site. Providing data for contact requests is optional: without the minimum data (at least a contact and the request content) we cannot reply. Consent, where required (e.g. future non-essential cookies), is always withdrawable without affecting prior lawful processing.</p>",
      },
      {
        id: "rights",
        title: "12. Your rights (Arts. 15–22 GDPR)",
        html: "<p>You have the right to obtain, where foreseen, access, rectification, erasure, restriction, objection, portability, withdrawal of consent, and not to be subject to automated decisions.</p><ul><li><strong>Access</strong> — know whether we process data about you and get a copy (Art. 15).</li><li><strong>Rectification</strong> — correct inaccurate data (Art. 16).</li><li><strong>Erasure</strong> (“right to be forgotten”) — Art. 17, where applicable (e.g. consent withdrawn, objection).</li><li><strong>Restriction</strong> — Art. 18.</li><li><strong>Portability</strong> — receive data you provided in a structured format when processing is based on consent or contract (Art. 20).</li><li><strong>Objection</strong> — Art. 21, in particular to processing for legitimate interest; for direct marketing you can object at any time.</li><li><strong>Withdraw consent</strong> — Art. 7(3), at any time without retroactive effect.</li></ul><p>You may also lodge a complaint with the supervisory authority (see §13).</p>",
      },
      {
        id: "exercise",
        title: "13. How to exercise rights and lodge a complaint",
        html: "<p>To exercise rights write to <a href=\"mailto:info@ventic.it\">info@ventic.it</a> subject “Exercise of privacy rights — Ventic” attaching a copy of an ID document minimised to what is needed. We reply without undue delay, at latest within one month (extendable by two months for complex cases, Art. 12(3)).</p><p>If you believe processing infringes the GDPR, you have the right to <strong>lodge a complaint with the Italian Garante per la protezione dei dati personali</strong> — <a href=\"https://www.garanteprivacy.it\" target=\"_blank\" rel=\"noopener\">garanteprivacy.it</a> (Art. 77 GDPR) — or to seek a judicial remedy (Art. 79). Information and forms are on the Garante’s site. For your local authority in other EEA states, see the EDPB list.</p><p>For consumer disputes, out-of-court settlement bodies may be available where applicable.</p>",
      },
      {
        id: "children",
        title: "14. Children",
        html: "<p>The site is not directed at children under 14 (digital consent age in Italy, Art. 2-quinquies Privacy Code). We do not knowingly collect children’s data. If you believe a child has provided data, contact us for deletion.</p>",
      },
      {
        id: "changes",
        title: "15. Changes to this notice",
        html: "<p>We may update this notice to reflect regulatory, technical or service changes. The current version is the one published here with its “Last updated” date. Material changes will be highlighted with a notice on the site. Please review this page periodically.</p><p>For clarifications or copies of relevant contractual extracts (SCCs, DPA) for transfers, write to the privacy contact.</p>",
      },
    ],
    footerNote: {
      title: "Legal note",
      body: "This notice follows the Garante’s template and EDPB Guidelines, in plain language without loss of completeness. It is not individual legal advice; for specific cases consult your counsel. If you have specific contractual terms with Netter srl, the contract and its DPA prevail for processing as processor.",
    },
    cta: {
      title: "Questions about privacy?",
      body: "Write to info@ventic.it — subject “Privacy — Ventic”. For commercial enquiries use the button below instead.",
      btn: "Book a technical call",
      mailLabel: "Email info@ventic.it",
    },
  },
  termini: {
    hero: {
      plate: "Terms of Service — Early Access Alpha",
      title: ["Early Access Alpha", "Terms"],
      lead: "Ventic is in invite-only Early Access Alpha: an experimental, incomplete and by definition unstable service. Features, APIs, models, performance and pricing may change without notice. No promise of continuity, no SLA. Use it knowing you are testing, not buying a finished product.",
      updatedLabel: "Last updated",
      updatedDate: "2 September 2026",
      tocTitle: "Contents",
      printLabel: "Print / Save as PDF",
    },
    intro: {
      note: "These Terms govern access to and use of ventic.it and the Ventic platform in Early Access Alpha, provided by Netter srl. Access to the Alpha is invite-only, revocable and non-transferable. If you signed a specific offer, order or contract with Netter srl, that document prevails for the economic and operational parts it regulates; for the rest these Terms apply.",
      also: "Also read the Privacy notice at ventic.it/en/privacy/ and, if you are a PaaS/BYOH customer, the relevant DPA. If there is a conflict between the Italian version and the English translation, the Italian version prevails for users subject to Italian/EU law.",
    },
    sections: [
      {
        id: "scope",
        title: "1. Scope, parties and Alpha nature",
        html: "<p><strong>Provider:</strong> <strong>Netter srl</strong>, Via Indipendenza, 06081 Assisi (PG), Italy — VAT <strong>IT03569900545</strong> (“<strong>Netter</strong>”, “<strong>we</strong>”). <strong>Alpha User/Customer:</strong> natural or legal person invited to test Ventic (“<strong>you</strong>”).</p><p><strong>Ventic</strong> is a stack for private LLMs (proxy, Admin/Self-service panel, Ventic Agent, mTLS overlay, vLLM/SGLang engines, optional RAG/Qdrant/harness modules) offered as <strong>BYOH</strong> (on your GPUs, software license) and <strong>PaaS</strong> (on GPUs from our catalogue, hardware + license included in the hourly rate).</p><p><strong>Early Access Alpha nature:</strong> the service is experimental, unfinished, with missing features, known and unknown bugs, frequent interruptions, breaking changes without notice, possible loss of data/configuration and manual migrations. We run it as Alpha precisely to make it a product with your help: we expect feedback, patience and non-critical use. <strong>It is not a production service with continuity guarantees.</strong></p><p style='border-left:3px solid var(--accent);padding:10px 14px;background:#f5a83f0f;margin:12px 0;font-size:13px;color:var(--fg-mute)'><strong>Alpha golden rule:</strong> do not put critical workloads on Ventic Alpha without an external fallback. If your use case cannot tolerate downtime, wait for Beta/GA or agree different terms in writing.</p>",
      },
      {
        id: "invite",
        title: "2. Invite-only access, accounts and requirements",
        html: "<ul><li><strong>Personal, revocable invite.</strong> Alpha access follows application/call and may be suspended or revoked at any time, even without cause, with reasonable notice when possible.</li><li><strong>Non-transferable.</strong> Invite, credentials, API keys and overlay are not assignable to third parties without Netter’s written consent.</li><li><strong>Accounts and keys.</strong> You create users, groups, tenants and API keys in the panel. You are responsible for safeguarding keys, rotating them, revoking departing members and any use made with your credentials.</li><li><strong>Technical requirements.</strong> BYOH: compatible hardware and connectivity as per check (max 1 h). PaaS: variable spot/dedicated GPU availability by region. The overlay needs outbound connectivity; nodes must not expose a public IP.</li><li><strong>Eligibility.</strong> You represent you have authority to bind the entity you represent and are at least 18 years old.</li></ul>",
      },
      {
        id: "service",
        title: "3. What we provide (and what we don’t) in Alpha",
        html: "<h4 class='h4'>3.1 Included</h4><ul><li>License to use the Ventic stack for the Alpha period as per offer (BYOH per-seat; PaaS by the hour, license included).</li><li>Admin and Self-service panels, OpenAI/Anthropic-compatible LLM proxy, mTLS overlay, Ventic Agent on the node, tuned inference engines.</li><li>Best-effort support on the agreed channel (e.g. dedicated Alpha email/chat) during CET business hours, no guaranteed response times.</li><li>LGTM/Grafana observability where enabled; telemetry and logs on the infra hosting the stack.</li></ul><h4 class='h4'>3.2 Optional / on request</h4><ul><li>RAG modules (OpenRAG, Qdrant), embeddings, agentic harnesses (DeepSeek/OpenClaw), LangChain adapter, n8n node, on-prem INP.</li><li>Multicloud/redundancy/failover, dedicated spot, EU/US region pinning.</li><li>Initial BYOH setup (self-install possible) and follow-on hourly work.</li></ul><h4 class='h4'>3.3 Out of scope</h4><p>No guarantees on model output, custom moderation beyond panel semantic restrictions, managed backups of your app data, certified compliance for regulated sectors (e.g. medical, critical finance) — unless separately agreed in writing.</p>",
      },
      {
        id: "availability",
        title: "4. Availability, maintenance and no SLA",
        html: "<p><strong>No SLA in Alpha.</strong> We promise no uptime, latency, throughput or RTO/RPO. The service is <em>best effort</em>.</p><ul><li><strong>Interruptions and breaking changes.</strong> Agent, proxy, overlay, model and engine updates may interrupt service or change APIs/payloads without notice.</li><li><strong>Maintenance.</strong> Windows without notice in Alpha; we will try to give reasonable heads-up where feasible.</li><li><strong>Spot and auto-scaling.</strong> On PaaS spot, reclaim is normal: the agent tries automatic rescheduling to another provider, but it is not guaranteed or instant.</li><li><strong>Scale-to-zero.</strong> Idle &gt;15 min may power the node off; wake on first call with a short wait.</li><li><strong>Future Beta/GA.</strong> Any SLAs will be agreed in writing outside Alpha.</li></ul>",
      },
      {
        id: "pricing",
        title: "5. Launch pricing and billing in Alpha",
        html: "<p>Prices shown on the site are <strong>launch prices reserved for Early Access Alpha</strong>, VAT excluded, and may change in Beta/GA.</p><table class='legal-table'><thead><tr><th>Item</th><th>Alpha price</th><th>Notes</th></tr></thead><tbody><tr><td>BYOH — Ventic Stack license</td><td><strong>€69.90/month</strong> for 5 seats incl. + <strong>€39.99</strong> per extra 10</td><td>BYOH only. Volume discounts. Setup on request or self-install.</td></tr><tr><td>PaaS — Ventic 16 (Qwen 3.8 27B)</td><td><strong>€1/h</strong> + VAT</td><td>16 active users, up to 100 on roster. €160 / €720 per month (160 h / 720 h).</td></tr><tr><td>PaaS — Ventic 64 (DeepSeek v4 Flash)</td><td><strong>€6/h</strong> + VAT</td><td>64 active users, up to 500. €960 / €4,320 per month.</td></tr></tbody></table><ul><li><strong>All-in on PaaS:</strong> hardware + license in the hourly rate. You pay only hours the node is on (scale-to-zero).</li><li><strong>Alpha price lock:</strong> for Alpha entrants launch prices stay locked for the <strong>duration of the signed Alpha contract</strong>; post-Alpha renewals at GA terms.</li><li><strong>Billing.</strong> BYOH: monthly in advance. PaaS: hourly metered, monthly settlement. Payment via instant SEPA transfer (PaaS) or as per offer. Late payment: statutory interest under Italian law (Leg. Decree 231/2002).</li><li><strong>Taxes.</strong> VAT and other duties excluded.</li><li><strong>Never per-token.</strong> LLM consumption never creates per-token charges; only seats/hours matter.</li></ul><p>Netter may correct material pricing errors with notice. If you do not accept the new GA price, you may terminate before renewal.</p>",
      },
      {
        id: "license",
        title: "6. License and intellectual property",
        html: "<ul><li><strong>License.</strong> Non-exclusive, non-transferable, non-sublicensable license limited to the Alpha period and internal use (or, if a white-label provider, resale to your end tenants as per contract). No transfer of ownership.</li><li><strong>Components.</strong> The stack includes or pulls open-source software (e.g. vLLM, SGLang) and open-weight weights under their respective licenses: you must comply with them.</li><li><strong>Prohibitions.</strong> No decompilation, circumvention of technical measures, removal of logos/notices, or use of Ventic to train competing models in breach of upstream licenses.</li><li><strong>Trademarks.</strong> Ventic and Netter srl remain Netter’s; OpenAI/Anthropic and other marks remain their owners’ (no affiliation).</li></ul>",
      },
      {
        id: "feedback",
        title: "7. Feedback, telemetry and contributions",
        html: "<p>You help us improve Ventic with feedback, bug reports, anonymised logs, test prompts and suggestions (“<strong>Feedback</strong>”). You grant us an irrevocable, perpetual, worldwide, royalty-free, sublicensable license to use, reproduce and incorporate Feedback into the product with no attribution or compensation. Do not send Feedback you cannot license.</p><p>Service telemetry (usage, errors, performance) may be collected in aggregated form to improve stability and security. Your prompt/app data contents remain yours and are not used to train third-party models; see §9 and DPA.</p>",
      },
      {
        id: "acceptable",
        title: "8. User obligations and acceptable use",
        html: "<p>You use Ventic lawfully, proportionally and without abusing the Alpha. In particular you will not:</p><ul><li>violate laws, third-party rights or applicable sanctions; generate or disseminate illegal content;</li><li>attempt unauthorised access, attacks, aggressive scraping, bypass of RBAC/quotas/overlay, or use beyond purchased seats/hours;</li><li>share keys or access outside the authorised perimeter, or expose proxy/overlay to the public internet without control;</li><li>use uncensored models for unlawful ends: if unlocked for hardening/red-teaming, you remain solely responsible for lawful use;</li><li>upload data you have no right to, or special-category/sensitive data without lawful basis, or data about children.</li></ul><p>We may apply rate limits, automatic blocks and suspensions to protect the platform and other Alpha testers. Report abuse to <a href='mailto:info@ventic.it'>info@ventic.it</a>.</p>",
      },
      {
        id: "privacy",
        title: "9. Data, privacy and security",
        html: "<p><strong>Showcase site:</strong> see <a href='/en/privacy/'>Privacy notice</a> (controller Netter srl).</p><p><strong>Service data (BYOH/PaaS):</strong> prompts, RAG documents, inference logs, Qdrant collections and your end-user data are processed <strong>on your infra / dedicated node</strong>. Netter supplies the stack and, regarding that data, acts as <strong>processor under Art. 28 GDPR</strong> only where foreseen by contract/DPA; otherwise does not access content except at your request for support.</p><ul><li>mTLS overlay, per-tenant isolation, RBAC/quotas and key revocation as baseline.</li><li>You are controller for data you load; you warrant lawful basis, notices to your data subjects and, where needed, processor appointment/DPA.</li><li>Incidents: we notify each other without undue delay per DPA and legal duties.</li></ul><p>Multicloud/DR replication only if bought and configured; otherwise single node/region.</p>",
      },
      {
        id: "models",
        title: "10. AI models, output and content responsibility",
        html: "<p>Models are <strong>open-weight</strong> (Qwen, DeepSeek, Kimi, etc.) run locally: frozen weights, not silently updated. Output is probabilistic and may be wrong, incomplete or inappropriate.</p><ul><li><strong>No output warranty.</strong> Validation, fact-checking and human oversight remain on you, especially for decisions affecting people or systems.</li><li><strong>Content policy.</strong> You can apply semantic restrictions and per-user/key filters; you remain responsible for generated content and its use.</li><li><strong>Uncensored.</strong> Models with attenuated filters are offered only for lawful uses (security research, hardening): you use them at your own risk and in compliance with law.</li></ul>",
      },
      {
        id: "warranty",
        title: "11. No warranties (As-Is)",
        html: "<p><strong>Ventic Alpha is provided “as is” and “as available”</strong>, without express or implied warranties of merchantability, fitness for a particular purpose, non-infringement, accuracy, completeness, availability, security or lack of errors — to the fullest extent permitted by law.</p><p>We do not warrant the service will meet your requirements, be uninterrupted, bug-free, compatible with every hardware, or that outputs will be correct. Any reliance is at your own risk. Site descriptions are illustrative of product intent, not Alpha contractual promises.</p>",
      },
      {
        id: "liability",
        title: "12. Limitation of liability",
        html: "<p>To the maximum extent permitted by law and except for wilful misconduct or gross negligence of Netter:</p><ul><li><strong>Exclusion of indirect damages.</strong> In no event is Netter liable for loss of profits, data/revenue/goodwill, replacement costs, consequential, indirect or punitive damages, even if advised of the possibility.</li><li><strong>Alpha cap.</strong> Netter’s aggregate liability for all claims relating to the Alpha is limited to the amount <strong>actually paid by you to Netter in the 3 months before the event</strong> giving rise to the claim (or <strong>€500</strong> if you paid nothing in a free Alpha/POC). If you have multiple contracts, the relevant contract governs.</li><li><strong>Mandatory exceptions.</strong> Nothing limits liability that the law declares non-limitable (e.g. non-waivable consumer rights where applicable).</li></ul><p>You must mitigate damages (e.g. backups, redundancy, no critical use in Alpha). The cap reflects the experimental nature and launch pricing.</p>",
      },
      {
        id: "term",
        title: "13. Term, suspension and termination",
        html: "<ul><li><strong>Alpha term.</strong> From invite grant until Alpha closure, expiry of the Alpha offer/contract or termination. Netter may close or suspend the Alpha with reasonable notice (even 7 days via email/panel notice), save for security urgencies.</li><li><strong>Suspension.</strong> We may suspend or limit access for security, abuse, non-payment, breach or authority order.</li><li><strong>Your termination.</strong> You may stop using Ventic at any time; for BYOH cancel the license at period end; for PaaS power nodes off and settle accrued hours.</li><li><strong>Effects.</strong> On termination the license ends, we revoke overlay/keys and you can export configs/data on infra you control. Aggregated anonymised telemetry may remain for legitimate purposes. Amounts already accrued remain due.</li></ul>",
      },
      {
        id: "changes",
        title: "14. Changes to service and Terms",
        html: "<p>Being Alpha, <strong>service and Terms will change often</strong>.</p><ul><li><strong>Service:</strong> we may add, remove or change features, APIs, models, hardware requirements and future pricing, even with breaking changes.</li><li><strong>Terms:</strong> the current version is at <a href='/en/termini/'>ventic.it/en/termini/</a> with update date. Material changes will be notified via site notice and/or email. If you keep using Ventic after the effective date, you accept the updated Terms; if you do not accept, stop use before the date.</li></ul><p>If you have a signed contract with differing clauses, those clauses prevail for their subject until expiry.</p>",
      },
      {
        id: "law",
        title: "15. Governing law and jurisdiction",
        html: "<p>Terms are governed by <strong>Italian law</strong>, without regard to conflict-of-laws. For any dispute about Ventic Alpha and these Terms, including validity, interpretation and performance, the exclusive venue is the <strong>Court of Perugia</strong>, save for mandatory consumer-protection rules (where you qualify as consumer) providing a different venue.</p><p>Invalidity of one clause does not affect the others; it will be replaced with the valid clause closest to the original intent.</p><p>Language: if Italian and English conflict, Italian prevails for relationships subject to Italian/EU law.</p>",
      },
      {
        id: "contact",
        title: "16. Contact, notices and complaints",
        html: "<p><strong>Controller/provider:</strong> Netter srl, Via Indipendenza, 06081 Assisi (PG), Italy — VAT IT03569900545. <strong>Email:</strong> <a href='mailto:info@ventic.it'>info@ventic.it</a> (subject: “Terms — Ventic Alpha”). We usually reply within 10 business days.</p><p><strong>Formal notices:</strong> registered office attn. “Ventic — Alpha Terms” or PEC if given in the offer.</p><p>For disputes: write describing the event and alleged damage; we will seek an amicable solution. Your right to go to the competent authority/court remains. For consumer users: ADR/ODR info available on request.</p>",
      },
    ],
    footerNote: {
      title: "Alpha operating note",
      body: "You are using a product under construction. Pricing, features, models and even these Terms will change. If something does not add up or you need a specific guarantee to go to production, talk to us first: in Alpha we prefer an honest “not yet” to a promise we cannot keep.",
    },
    cta: {
      title: "Questions about the Alpha Terms?",
      body: "Write to info@ventic.it — subject “Terms — Ventic Alpha”. To join the Alpha or discuss a use case, book a technical call.",
      btn: "Book a technical call",
      mailLabel: "Email info@ventic.it",
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
  let base = isEn ? pathname.replace(/^\/en/, "") || "/" : pathname;
  // Normalize alias: /terms <-> /termini (canonical is /termini)
  if (base === "/terms/" || base === "/terms") base = "/termini/";
  if (target === "en") return base === "/" ? "/en/" : `/en${base}`;
  return base;
}

export function alternateLang(lang: Lang): Lang {
  return lang === "it" ? "en" : "it";
}
