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
      title: "Ventic — piattaforma AI multi-tenant sul tuo Kubernetes",
      desc: "Gateway compatibile OpenAI e Anthropic con credito prepagato, quote per gruppo, filtro PII reversibile e runtime locali collegati in uscita. Si installa sul tuo cluster Kubernetes, con licenza Licman.",
    },
    pricing: {
      title: "Prezzi e confronto — Ventic",
      desc: "Listino licenze Ventic: On Premise a €29/host o €299/mese per azienda. Confronto con subscription e pagamento a token.",
    },
    adminPanel: {
      title: "Console Ventic — persone, quote, modelli, agenti remoti, audit",
      desc: "Il portale Ventic: team e gruppi, credito e allocazioni, catalogo modelli e Switchyard, agenti remoti con approvazione, runtime certificati, chiavi API e laboratorio.",
    },
    privacy: {
      title: "Privacy policy — Ventic",
      desc: "Informativa privacy GDPR di Ventic (Netter srl): dati trattati, finalità, basi giuridiche, cookie, diritti e contatti del titolare.",
    },
    termini: {
      title: "Termini di servizio — Ventic",
      desc: "Termini di servizio di Ventic (Netter srl): limitazioni, assenza di SLA, listino, garanzie e responsabilità.",
    },
  },
  nav: {
    cta: "Prenota una call",
    skip: "Vai al contenuto",
    langLabel: "Lingua",
  },

  hero: {
    plate: "Aziende e provider · Gateway AI governato",
    title: ["Ti presento", "Ventic."],
    lead: "Una piattaforma AI multi-tenant che installi sul tuo Kubernetes: un endpoint compatibile OpenAI e Anthropic, credito prepagato con quote per gruppo, filtro PII reversibile e modelli cloud o locali sotto le stesse regole.",
    startTitle: "Inizia con Ventic.",
    startPre: "Scrivici a",
    startPost: "o mandami un messaggio diretto per richiedere l'accesso.",
    cta1: "Richiedi l'accesso",
    cta2: "Vedi come funziona",
  },
  pains: {
    plate: "Ti suona familiare?",
    title: "Ti capisco.",
    cards: [
      {
        title: "Chiavi condivise, costi che nessuno governa?",
        body: "Chat, agenti e applicazioni consumano da account diversi, con chiavi che girano per il team e nessuna visibilità su chi spende cosa. Con Ventic tutto passa da un solo gateway: credito prepagato, quote per persona e gruppo, chiavi dedicate con limiti di spesa e consumo registrato richiesta per richiesta.",
      },
      {
        title: "Dati personali verso provider che non controlli?",
        body: "Vuoi usare modelli cloud dove servono e modelli locali dove i dati non devono uscire. Con Ventic scegli per modello e per policy dove va ogni richiesta: i dati personali possono essere sostituiti da segnaposto prima dell'invio e ripristinati nella risposta, e i runtime sul tuo hardware si collegano in uscita, senza porte aperte.",
      },
    ],
  },
  highlights: [
    { icon: "provisioning", title: "Cloud o hardware tuo", body: "DeepSeek e OpenRouter per ampiezza di catalogo; runtime locali collegati con un agente remoto che l'amministratore approva." },
    { icon: "sliders", title: "Credito e quote", body: "Wallet prepagato: riserva prima della richiesta, liquidazione sul consumo misurato, quote per gruppo, persona e chiave API." },
    { icon: "activity", title: "Osservabilità e audit", body: "Metriche, log e tracce OpenTelemetry filtrati per azienda e un registro attività append-only." },
    { icon: "shield", title: "PII reversibile", body: "Rilevamento locale nel testo, mappe cifrate, ripristino nello stream. Opzionale e disattivato di default." },
  ],
  heroShots: {
    label: "Console",
    host: "portal.example.org",
    note: "Portale reale — dati sintetici",
  },
  problem: {
    id: "perche",
    plate: "Perché Ventic",
    title: ["I provider di LLM", "sono inadeguati."],
    lead: "Gli LLM dei Provider sono perfetti per attività estremamente specifiche e personali. Inadeguati per lavoro agentico e aziendale.",
    cards: [
      { tag: "01 — Subscription", title: "Finestre strette", body: "Quota finita, lavoro fermo. Per una persona è attesa; per un agente notturno è un guasto che scopri al mattino." },
      { tag: "02 — Subscription", title: "Outage del provider", body: "Se il provider va giù, va giù anche il tuo prodotto. Un solo punto di accesso, nessuna alternativa che controlli tu." },
      { tag: "03 — Subscription", title: "Modelli deprecati", body: "Gli stessi prompt danno risultati diversi nel tempo. Aggiornamenti silenziosi, poca trasparenza, nessuna riproducibilità." },
      { tag: "04 — A token", title: "Prezzo per token", body: "Sui modelli di frontiera il costo per token è alto e cresce proprio quando il tuo prodotto ha successo." },
      { tag: "05 — A token", title: "Compliance", body: "Non sai dove passa ogni richiesta. Con Ventic decidi per modello e policy se può uscire dal cluster; con un runtime locale non esce." },
      { tag: "06 — A token", title: "Budget imprevedibile", body: "Il consumo LLM è imprevedibile per natura. In azienda diventa una voce che nessuno riesce a chiudere a budget." },
    ],
  },
  modes: {
    id: "come-ottenerlo",
    plate: "Come si ottiene",
    title: ["Un prodotto da installare.", "Un servizio, se preferisci."],
    lead: "Ventic è un software che installi sul tuo cluster Kubernetes, con licenza mensile per host o per azienda. Se non vuoi installare nulla, esiste un servizio gestito a parte: Netter Intelligence su llm.netter.io.",
    byoh: {
      tag: "On Premise — il prodotto",
      title: "Installa Ventic sul tuo Kubernetes",
      desc: "Kubernetes 1.36 o 1.37, Helm e una release firmata: portale, gateway, billing, PII, chat Open WebUI e telemetria. I modelli arrivano da provider cloud o da runtime collegati con l'agente remoto.",
      ticks: [
        "Release firmata, verificata con la chiave pubblica del proprietario",
        "Quattro namespace per installazione; le aziende clienti sono tenant applicativi",
        "Agente remoto in uscita: nessuna porta pubblica sul nodo del modello",
        "Demo gratuita di 30 giorni, poi licenza su Licman",
      ],
      note: "Licenza mensile, per host o per azienda: vedi il listino nella pagina Prezzi. Hardware, hosting e consumo AI sono a parte.",
    },
    hosted: {
      tag: "Servizio — venduto a parte",
      title: "Preferisci un servizio? Netter Intelligence",
      desc: "Non vuoi procurare né installare nulla? llm.netter.io è un servizio Ventic già attivo, ospitato e gestito da Netter. Non fa parte della licenza del prodotto.",
      endpointLabel: "Servizio",
      host: "llm.netter.io",
      url: "https://llm.netter.io",
      cta: "Apri llm.netter.io",
      ticks: [
        "Nessun cluster da procurare, installare o gestire",
        "Ventic già in esecuzione, ospitato e gestito da Netter",
        "Stesso gateway compatibile OpenAI e Anthropic",
      ],
      note: "Condizioni e piani del servizio sono su llm.netter.io.",
    },
  },
  how: {
    id: "come-funziona",
    plate: "Come funziona",
    title: ["Dall'intento", "al modello in produzione."],
    lead: "Dichiari risorse dal portale o con venticli: Ventic le valida, le fa approvare quando serve e le riconcilia. Ogni richiesta passa poi dallo stesso gateway — identità, policy, credito, modello.",
    steps: [
      { title: "Collega un runtime", body: "Un agente Rust apre un WebSocket in uscita verso il portale. L'amministratore del tenant confronta l'impronta SHA-256 e approva modelli e capability. Nessuna porta in ingresso.", tag: "WSS in uscita" },
      { title: "Oppure fallo creare", body: "Con l'inferenza gestita descrivi compute pool e deployment: un modulo OpenTofu revisionato crea le VM, installa runtime e agente, e un amministratore approva il piano.", tag: "piano approvato" },
      { title: "Pubblica e instrada", body: "Il modello compare nel catalogo con un nome pubblico e prezzi espliciti. Policy e mapping decidono chi lo usa; routing leastBusy, weighted o failover fra repliche equivalenti.", tag: "catalogo governato" },
      { title: "Misura e riconcilia", body: "Il credito è riservato prima e liquidato dopo sul consumo reale; un esito incerto resta bloccato finché non c'è prova. Telemetria e audit per ogni modifica.", tag: "contabilità esatta" },
    ],
  },
  stack: {
    id: "stack",
    plate: "Piattaforma",
    title: ["Una piattaforma che installi,", "non un servizio a cui invii i dati."],
    lead: "Portale, gateway, billing e dati girano sul tuo Kubernetes. I modelli sono cloud o locali, dietro lo stesso confine di policy e contabilità. Gestisci tutto dal portale o con venticli e manifest dichiarativi.",
    legend: { own: "Sempre incluso", opt: "Opzionale — attivi solo se ti serve" },
    planes: [
      {
        idx: "01",
        title: "Persone e applicazioni",
        where: "Browser, API e terminale",
        items: [
          { name: "Portale IT/EN", body: "Team, quote, credito, chiavi, catalogo modelli, agenti remoti, audit e laboratorio API.", opt: false },
          { name: "API compatibili", body: "Chat Completions, Responses, Messages, FIM, conteggio token, embedding, visione, voce e trascrizione, con SSE senza buffer.", opt: false },
          { name: "venticli e OpenCode", body: "CLI per risorse dichiarative con login da browser o device; launcher OpenCode con catalogo dinamico dei modelli autorizzati.", opt: true },
          { name: "Chat Open WebUI", body: "Conversazioni cifrate, MCP e ricerca privata, legate al tenant; mantiene il proprio brand e la propria licenza.", opt: true },
        ],
      },
      {
        idx: "02",
        title: "Gateway e governance",
        where: "Namespace app e ops",
        items: [
          { name: "Control", body: "Identità, tenant, catalogo, policy, chiavi API, agenti remoti e job di runtime dal catalogo fisso.", opt: false },
          { name: "Gateway e Switchyard", body: "Protocolli nativi, routing e scelta del modello più adatto fra i candidati autorizzati, ordinati per costo Decimal.", opt: false },
          { name: "Billing", body: "Wallet, riserve, ledger bilanciato, ricariche con Stripe o bonifico, fatture e commissioni reseller.", opt: false },
          { name: "PII", body: "Rilevamento locale dei dati personali nel testo, segnaposto reversibili e mappe cifrate.", opt: true },
        ],
      },
      {
        idx: "03",
        title: "Dati e sicurezza",
        where: "Namespace data ed edge",
        items: [
          { name: "PostgreSQL e Valkey", body: "CloudNativePG con backup Barman nel profilo bundled, oppure servizi esterni; Valkey per rate limit e stato effimero.", opt: false },
          { name: "WAF e TLS", body: "Traefik, Nginx con ModSecurity CRS, certificati cert-manager; NetworkPolicy default-deny.", opt: false },
          { name: "Keycloak e OpenBao", body: "Accesso OIDC con Google, passkey e TOTP; segreti e credenziali di infrastruttura custoditi in OpenBao.", opt: false },
        ],
      },
      {
        idx: "04",
        title: "Runtime dei modelli",
        where: "Sul tuo hardware o su VM create da Ventic",
        items: [
          { name: "Agente remoto", body: "Agente Rust per Linux e Windows: connessione WSS in uscita, pairing con invito di 15 minuti, approvazione dell'amministratore.", opt: false },
          { name: "Runtime certificati", body: "Strata e llama.cpp risultano collaudati; vLLM, Ollama e SGLang sono accettati ma non ancora certificati.", opt: false },
          { name: "Inferenza gestita", body: "Compute pool e deployment via OpenTofu con piani approvati, routing e autoscaling autorizzato. Una VM, una replica completa.", opt: true },
        ],
      },
      {
        idx: "05",
        title: "Provider e licenza",
        where: "Servizi esterni",
        items: [
          { name: "DeepSeek e OpenRouter", body: "Modelli cloud con nomi pubblici, permessi e prezzi gestiti dal catalogo; tariffe e cambi verificati separati dai prezzi pubblici.", opt: false },
          { name: "Licman", body: "Lease firmato Ed25519 di massimo 72 ore. A licenza scaduta si fermano nuove richieste, ma liquidazione, riconciliazione, export e cancellazione restano disponibili.", opt: false },
          { name: "SMTP, S3, Stripe", body: "Email di accesso e inviti, archivio dati e backup, pagamenti online: integrazioni del provider.", opt: true },
        ],
      },
    ],
    links: [
      "Portale e API sullo stesso gateway",
      "Policy, credito e PII prima del modello",
      "Agente in uscita — nessuna porta aperta",
      "Licenza verificata, contabilità sempre disponibile",
    ],
    note: "Il chart non installa gli operatori del cluster (KEDA, cert-manager, Traefik, CloudNativePG): li fornisce l'amministratore del cluster. Un'installazione usa quattro namespace e non consuma un'ulteriore licenza per replica o Job.",
  },
  adminPanel: {
    id: "pannello",
    plate: "Console",
    title: ["Chi usa cosa,", "lo decidi tu."],
    lead: "Il portale gira sul tuo cluster. Da qui inviti persone, assegni quote, scegli i modelli, approvi gli agenti remoti e controlli chi ha fatto cosa.",
    chrome: "portal.example.org",
    shots: [
      {
        id: "team", tab: "Team e gruppi", src: "/admin/team.webp", w: 1440, h: 760,
        title: "Persone, gruppi e quote",
        body: "Membri con ruolo e quota disponibile, gruppi con budget riservato e inviti. Accesso con email e password, Google o passkey; il secondo fattore TOTP o passkey è facoltativo.",
        alt: "Portale Ventic, Team e gruppi: elenco persone con ruolo e quota disponibile, schede Membri, Gruppi e quote, Inviti.",
      },
      {
        id: "credit", tab: "Credito", src: "/admin/credit.webp", w: 1440, h: 1000,
        title: "Credito e allocazioni",
        body: "Saldo complessivo, quote riservate ai gruppi e quanto resta non allocato. Ripartizioni ricorrenti automatiche; ogni movimento ha il suo posto nel ledger.",
        alt: "Allocazioni del credito: saldo complessivo, distribuzione del credito fra gruppi, quote riservate e pianificazioni automatiche.",
      },
      {
        id: "models", tab: "Modelli", src: "/admin/models.webp", w: 1440, h: 780,
        title: "Catalogo e Switchyard",
        body: "Il catalogo mostra solo ciò che sei autorizzato a usare: modelli di piattaforma, alias e chiavi proprie. Switchyard sceglie fra i candidati autorizzati per idoneità, effort e costo; il casting PII è attivo quando la policy lo richiede.",
        alt: "Catalogo modelli: filtri per tipo e origine, elenco con switchyard e modelli demo, dettaglio con protocolli chat, messages e responses.",
      },
      {
        id: "agents", tab: "Agenti remoti", src: "/admin/agents.webp", w: 1440, h: 680,
        title: "Agenti remoti con approvazione",
        body: "Un runtime sul tuo hardware compare in attesa di approvazione: confronti l'impronta SHA-256 letta sul computer e approvi modelli e capability. Un agente offline esce dal catalogo.",
        alt: "Agenti remoti: avviso di agenti in attesa di approvazione e tabella con stato, disponibilità, ultimo contatto e modelli.",
      },
      {
        id: "runtimes", tab: "Runtime", src: "/admin/runtimes.webp", w: 1440, h: 700,
        title: "Runtime certificati",
        body: "La compatibilità API non equivale a una certificazione: solo versioni e funzioni collaudate risultano testate. Nella release corrente Strata e llama.cpp; vLLM, Ollama e SGLang non sono certificati.",
        alt: "Runtime certificati: Strata e llama.cpp testati, vLLM, Ollama e SGLang non certificati, con i protocolli verificati.",
      },
    ],
  },
  selfServicePanel: {
    id: "self-service",
    plate: "Self-service",
    title: ["Credito, chiavi,", "laboratorio API."],
    lead: "Ogni persona vede il proprio credito, crea chiavi con limiti di spesa e prova ogni operazione del gateway nel Laboratorio, con le stesse policy della produzione. La chat Open WebUI usa lo stesso credito e le stesse quote.",
    chrome: "portal.example.org",
    shots: [
      {
        id: "overview", tab: "Panoramica", src: "/selfservice/overview.webp", w: 1440, h: 1100,
        title: "Panoramica del workspace",
        body: "Credito disponibile e riservato, consumi degli ultimi sette giorni per categoria, decisioni in sospeso e modelli più usati.",
        alt: "Panoramica: credito disponibile, prenotato, consumo registrato, grafico dei consumi a sette giorni e modelli più usati.",
      },
      {
        id: "playground", tab: "Laboratorio API", src: "/selfservice/playground.webp", w: 1440, h: 1100,
        title: "Laboratorio API",
        body: "Prova Chat, Responses, Messages, embedding, voce, trascrizione, FIM, previsione e file con la tua sessione. Consuma credito reale e genera la richiesta in curl, Python o TypeScript.",
        alt: "Laboratorio API: schede per operazione, form di richiesta con modello, temperatura e streaming SSE, snippet curl copiabile.",
      },
      {
        id: "keys", tab: "Chiavi API", src: "/selfservice/keys.webp", w: 1440, h: 900,
        title: "Chiavi con limiti",
        body: "Ogni chiave ha i modelli consentiti, un massimo per richiesta, un budget totale e una scadenza. Il segreto si vede solo alla creazione; si può disabilitare, rigenerare o revocare.",
        alt: "Finestra Crea chiave API: nome, modelli consentiti, massimo per richiesta, budget totale e validità.",
      },
      {
        id: "billing", tab: "Credito", src: "/selfservice/billing.webp", w: 1440, h: 1100,
        title: "Credito e consumi",
        body: "Ricariche con Stripe o bonifico: il credito diventa disponibile solo a pagamento confermato. Riserve, consumi e crediti del workspace con importi esatti, IVA esclusa.",
        alt: "Credito e consumi: disponibile, prenotato, consumato nel mese, elenco ricariche con stato e metodo.",
      },
    ],
  },
  caps: {
    id: "cosa-ottieni",
    plate: "Cosa ottieni",
    title: ["Tutto ciò che serve", "per governare l'AI."],
    cta: "Prenota una call tecnica",
    items: [
      { title: "Credito prepagato", body: "Wallet per azienda: riserva prima di ogni richiesta, liquidazione sul consumo misurato. Il credito arriva solo a pagamento confermato." },
      { title: "Quote per gruppo", body: "Plafond per persone e gruppi, ripartizioni ricorrenti, commissioni reseller calcolate sul consumo liquidato." },
      { title: "Chiavi API governate", body: "Modelli consentiti, massimo per richiesta, budget, scadenza e revoca. Le policy correnti valgono anche per client con un catalogo vecchio." },
      { title: "PII reversibile", body: "Segnaposto prima del modello, originali ripristinati nello stream. Opzionale, solo testo: immagini e audio richiedono policy specifiche." },
      { title: "Switchyard", body: "Sceglie fra i modelli autorizzati per idoneità, effort e costo Decimal esatto. Le chiamate di selezione sono contabilizzate." },
      { title: "Agenti remoti", body: "Runtime sul tuo hardware via WSS in uscita, con approvazione e consenso esplicito prima di condividere con altre aziende." },
      { title: "Inferenza gestita", body: "Compute pool e deployment con OpenTofu, routing leastBusy, weighted o failover e autoscaling con limiti approvati." },
      { title: "Multi-tenant e reseller", body: "Aziende clienti come tenant applicativi, deleghe reseller e accordi di commissione, senza un cluster per cliente." },
      { title: "Chat e integrazioni", body: "Open WebUI con conversazioni cifrate, OpenCode con catalogo dinamico, venticli per risorse dichiarative." },
      { title: "Export e cancellazione", body: "Contenuti cifrati, export JSON, richiesta di cancellazione e archivio opzionale delle inferenze future su S3 dell'azienda." },
      { title: "Osservabilità e audit", body: "Metriche, log e tracce OpenTelemetry, dashboard Perses filtrate per azienda e registro attività append-only." },
      { title: "Licenza e continuità", body: "Lease firmato Licman di massimo 72 ore. A scadenza si ferma l'inferenza; liquidazione, export e cancellazione restano." },
    ],
  },
  pricing: {
    id: "prezzi",
    plate: "Prezzi",
    title: ["Un listino.", "Nessuna sorpresa."],
    lead: "Ventic è un prodotto: paghi una licenza mensile, per host o per azienda, sulla tua infrastruttura. La licenza non dipende dai token: il consumo dei modelli è credito prepagato a parte.",
    link: "Listino completo e confronto",
    cards: [
      { tag: "On Premise · per host", price: "€29", unit: "/ host / mese + IVA", body: "Il software gira sulla tua infrastruttura. Paghi per ogni host su cui è installato.", warm: false },
      { tag: "On Premise · per azienda", price: "€299", unit: "/ mese + IVA", body: "Canone unico per l’azienda, senza contare gli host. Conviene quando la flotta cresce.", warm: true },
      { tag: "Demo · 30 giorni", price: "Gratis", unit: "su Licman", body: "Installa la demo self-hosted, provala sui tuoi dati, poi passa alla licenza senza reinstallare.", warm: true },
    ],
    foot: "Prezzi in EUR, IVA esclusa · fatturazione mensile, impegno di un mese · licenze e demo si richiedono su Licman · hardware, hosting e consumo AI a parte · cerchi un servizio gestito? llm.netter.io",
  },
  cta: {
    plate: "Inizia ora",
    title: ["Contattaci", "per cominciare subito."],
    body: "Ti aiutiamo a installare Ventic sulla tua infrastruttura e partiamo direttamente dal workload che vuoi portare in produzione.",
    btn: "Prenota una call tecnica",
    mail: "Scrivici: verifica per mostrare",
    mailPrefix: "Scrivici: ",
  },

  footer: {
    legal: "Netter srl · P.IVA IT03569900545 · Via Indipendenza, 06081 Assisi (PG), Italy",
    region: "Sulla tua infrastruttura",
    mail: "Mostra email",
    cols: ["Prodotto", "Contatti", "Legale"],
    links: [
      { label: "Console", href: "/admin-panel/" },
      { label: "Installa la demo", href: "/demo/" },
      { label: "Prezzi", href: "/pricing/" },
      { label: "Contatti", href: "/contatti/" },
      { label: "Termini", href: "/termini/" },
      { label: "Privacy", href: "/privacy/" },
      { label: "Cookie", href: "/privacy/#cookie" },
    ],
    disclaimer: "OpenAI e Anthropic sono marchi registrati dei rispettivi proprietari. Ogni diritto è riservato ai legittimi titolari. Ventic non è affiliato ad OpenAI, Inc. né ad Anthropic PBC. Funzionalità e prezzi soggetti a modifica senza preavviso.",
  },
  pricingPage: {
    plate: "Prezzi e confronto",
    title: ["Risparmia e", "governa l'AI."],
    lead: "Ventic è un prodotto: paghi una licenza mensile, per host o per azienda, sulla tua infrastruttura. La licenza non dipende dai token; il consumo dei modelli è credito prepagato che governi per gruppo e per chiave.",
    matrix: {
      title: "Ventic contro le alternative",
      meta: "stesso lavoro, tre modi di pagarlo",
      cols: ["Criterio", "Subscription frontier", "Pagamento a token", "Ventic On Premise"],
      rows: [
        { label: "Costo prevedibile a fine mese", cells: [
          { mark: "yes", text: "Canone fisso" }, { mark: "no", text: "Dipende dal consumo" },
          { mark: "dash", text: "Licenza fissa; il consumo AI è credito prepagato a parte" } ] },
        { label: "Controllo della spesa", cells: [
          { mark: "no", text: "Per account, poco visibile" }, { mark: "dash", text: "Dashboard del provider" },
          { mark: "yes", text: "Quote per gruppo, limiti per chiave, riserva prima di ogni richiesta" } ] },
        { label: "Dove passa il dato", cells: [
          { mark: "no", text: "Sui server del provider" }, { mark: "no", text: "Sui server del provider" },
          { mark: "yes", text: "Lo decidi per modello: cloud o runtime locale, PII opzionale" } ] },
        { label: "Scelta dei modelli", cells: [
          { mark: "no", text: "Quelli del provider" }, { mark: "dash", text: "Catalogo del provider" },
          { mark: "yes", text: "DeepSeek, OpenRouter e runtime tuoi, con alias stabili" } ] },
        { label: "Stabilità del modello nel tempo", cells: [
          { mark: "no", text: "Cambia senza preavviso" }, { mark: "dash", text: "Dipende dal provider" },
          { mark: "dash", text: "Alias stabili; sui runtime locali i pesi li governi tu" } ] },
        { label: "Continuità durante un outage", cells: [
          { mark: "no", text: "Ti fermi con loro" }, { mark: "no", text: "Ti fermi con loro" },
          { mark: "dash", text: "Con più target equivalenti e routing failover" } ] },
        { label: "Audit e contabilità", cells: [
          { mark: "no", text: "Non prevista" }, { mark: "dash", text: "Report del provider" },
          { mark: "yes", text: "Ledger bilanciato, registro attività, export" } ] },
        { label: "Più aziende e rivendita", cells: [
          { mark: "no", text: "No" }, { mark: "no", text: "No" },
          { mark: "yes", text: "Tenant, reseller e commissioni" } ] },
        { label: "Infrastruttura", cells: [
          { mark: "dash", text: "Non serve" }, { mark: "dash", text: "Non serve" },
          { mark: "dash", text: "Un cluster Kubernetes tuo; GPU solo per i modelli locali" } ] },
      ] as { label: string; cells: Cell[] }[],
    },
    sizing: {
      plate: "Come si dimensiona",
      title: ["Non un contatore.", "Un cluster da dimensionare."],
      body: "Il dimensionamento parte dalle persone e dalle applicazioni che lavorano insieme e dai modelli che vuoi servire, non dai token. Ogni VM di un deployment gestito ospita una replica completa del modello.",
      items: [
        { label: "Installazione", body: "Quattro namespace dedicati. Le aziende clienti sono tenant applicativi: non hanno un cluster né un database proprio." },
        { label: "Capacità", body: "Aggiungi repliche o target equivalenti; il routing distribuisce con leastBusy, weighted o failover." },
        { label: "SLA", body: "Nessuna SLA salvo accordo scritto: la disponibilità dipende da cluster, modelli e provider scelti." },
        { label: "Inattività", body: "Con un autoscaling autorizzato i deployment gestiti si fermano e ripartono su richiesta. Durante l'avvio il gateway risponde 503 model_starting con Retry-After di 15 secondi." },
      ],
    },
    notes: {
      plate: "Da tenere presente",
      items: [
        "Licenza mensile con impegno di un mese. Le modifiche di listino valgono per le nuove richieste; gli abbonamenti già concordati mantengono il loro importo.",
        "Hardware, hosting, consumo AI, SMTP, storage S3, pagamenti e licenze di terze parti sono a parte. La demo non include credito AI.",
        "Setup iniziale su richiesta — puoi anche installare da solo con la guida. Assistenza successiva a ore, quando serve.",
        "Prezzi al netto di IVA. SLA solo se concordata per iscritto.",
      ],
      ctaTitle: "Partiamo dall’analisi.",
      ctaBody: "Un’ora per capire che cosa vuoi governare, quali modelli servono e dove devono girare.",
      ctaBtn: "Prenota una call tecnica",
    },
    foot: {
      left: "Ventic — Netter srl · P.IVA IT03569900545 · Via Indipendenza, 06081 Assisi (PG) · verifica sul sito per contatti",
      leftPrefix: "Ventic — Netter srl · P.IVA IT03569900545 · Via Indipendenza, 06081 Assisi (PG) · ",
      right: "Licenza mensile · hardware e consumo AI a parte · IVA esclusa",
    },
  },
  adminPanelPage: {
    plate: "Guida alla console",
    title: ["Admin e persone", "nello stesso portale."],
    lead: "Admin e utenti interagiscono con la piattaforma dal portale o con venticli: chi entra, chi usa quale modello, quanto credito ha ciascuno — e come lo rivendi con il tuo brand se fai da provider.",
    sections: [
      {
        id: "utenti",
        icon: "users",
        plate: "Persone e accessi",
        title: "Chi entra, e con quale chiave",
        lead: "Le persone, i gruppi e le chiavi di ogni azienda, con un workspace selezionato per volta.",
        points: [
          { title: "Persone", body: "Ruolo e quota disponibile per ciascuno, con ricerca e gestione dal menu di riga." },
          { title: "Gruppi e quote", body: "Un gruppo riceve credito riservato e lo ripartisce; ripartizioni ricorrenti pianificabili." },
          { title: "Inviti", body: "Invito via email con ruolo iniziale; la coda email è gestita dal sistema." },
          { title: "Chiavi API", body: "Modelli consentiti, massimo per richiesta, budget, scadenza; rigenerazione immediata e revoca definitiva." },
          { title: "Accesso", body: "Email e password, Google o passkey, con secondo fattore TOTP o passkey facoltativo, tramite Keycloak OIDC." },
          { title: "Verifica aziendale", body: "Identità e prove dell'azienda sono riviste da un operatore prima di sbloccare pagamenti e funzioni reseller." },
        ],
      },
      {
        id: "ruoli",
        icon: "shield",
        plate: "Ruoli e permessi",
        title: "Chi può fare cosa, deciso dal server",
        lead: "Il menu aiuta a trovare le funzioni, ma ogni operazione è autorizzata dal server: un link diretto non concede privilegi.",
        points: [
          { title: "Quattro ruoli cliente", body: "Membro, responsabile gruppo, amministratore aziendale e amministratore reseller, con ambiti distinti." },
          { title: "Ruoli di piattaforma", body: "Distinti dai ruoli aziendali: essere admin della propria azienda non rende admin della piattaforma." },
          { title: "Policy a cascata", body: "Piattaforma, azienda, gruppi e utente: i vincoli superiori valgono anche per le configurazioni più specifiche." },
          { title: "Verifica permessi", body: "Chiedi al servizio se la tua sessione può eseguire un'azione, con la spiegazione della decisione." },
        ],
      },
      {
        id: "modelli",
        icon: "provisioning",
        plate: "Modelli e policy",
        title: "Cosa gira, per chi, a che prezzo",
        lead: "Cloud, runtime locali e modelli gestiti nello stesso catalogo, con le stesse regole.",
        points: [
          { title: "Catalogo e mapping", body: "Nomi pubblici separati dal target upstream; ogni funzione dipende da ciò che il target supporta." },
          { title: "Provider upstream e chiavi proprie", body: "Credenziali personali cifrate, condivisione esplicita e commissioni di servizio governate." },
          { title: "Policy effettive", body: "Modelli consentiti, modello predefinito, PII richiesto e massimo per richiesta, per ambito." },
          { title: "Switchyard", body: "Selezione fra i candidati autorizzati per idoneità, effort e costo." },
          { title: "Inferenza gestita", body: "Compute pool, deployment, routing e autoscaling con piani e limiti approvati." },
          { title: "Listino e commissioni", body: "Prezzi pubblici separati da tariffe e cambi verificati; commissioni reseller dal consumo liquidato." },
        ],
      },
      {
        id: "telemetria",
        icon: "ops",
        plate: "Monitoraggio e audit",
        title: "Quanto si consuma, e chi ha cambiato cosa",
        lead: "Non contenuti delle conversazioni: telemetria operativa e registro delle azioni amministrative.",
        points: [
          { title: "Richieste e prestazioni", body: "Richieste, errori e latenza del workspace, con apertura in Perses." },
          { title: "Traffico e consumi", body: "Quanto si consuma per modello e per periodo, calcolato dagli eventi disponibili." },
          { title: "Log e tracce", body: "Log operativi e tracce lente OpenTelemetry, filtrati per azienda." },
          { title: "Registro attività", body: "Append-only: chi ha agito, su quale risorsa e quali campi sono cambiati." },
        ],
      },
      {
        id: "wiring",
        icon: "overlay",
        plate: "Agenti remoti e CLI",
        title: "Hardware tuo e automazione",
        lead: "Runtime locali e risorse dichiarative sono parte del portale, non strumenti a parte.",
        points: [
          { title: "Agenti remoti", body: "Invito, pairing, approvazione dell'impronta e pubblicazione dei modelli, con consenso esplicito alla condivisione." },
          { title: "Runtime certificati", body: "Un elenco onesto di ciò che è stato collaudato e di ciò che è solo compatibile." },
          { title: "venticli", body: "Validate, diff, apply e wait su risorse dichiarative, con le stesse autorizzazioni del portale." },
          { title: "OpenCode", body: "Il launcher legge il catalogo autorizzato e lo aggiorna all'avvio." },
        ],
      },
    ],
    whiteLabel: {
      icon: "cloud",
      plate: "Provider e rivendita",
      title: ["Il tuo brand,", "la nostra piattaforma."],
      lead: "Amministri la tua azienda, oppure gestisci un'installazione con clienti, modelli e prezzi tuoi.",
      points: [
        { title: "Multi-tenant applicativo", body: "Ogni cliente è un tenant: dati, persone, quote e catalogo separati, senza un cluster per cliente." },
        { title: "Reseller e commissioni", body: "Deleghe di amministrazione e commissioni calcolate sul consumo liquidato." },
        { title: "Profilo del provider", body: "Brand, domini, contatti e documenti legali forniti dal proprietario. Open WebUI mantiene il proprio brand e la propria licenza." },
        { title: "Pagamenti e fatture", body: "Ricariche con Stripe o bonifico, fatture e consumo per tenant." },
      ],
      note: "Un'installazione, tanti tenant: capacità e costi dipendono dalla tua infrastruttura e dai servizi AI a monte.",
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
      note: "Questa informativa riguarda esclusivamente il sito vetrina ventic.it. Non disciplina i trattamenti che avvengono dentro l’infrastruttura Ventic del cliente (On Premise — modelli, prompt, contenuti conservati, log di inferenza e di contabilità): per quei trattamenti Netter opera come fornitore dello stack tecnologico e, rispetto ai dati del cliente finale, come responsabile del trattamento ex art. 28 GDPR quando previsto dal contratto; i relativi dettagli sono nel contratto e nel DPA dedicato.",
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
        html: "<h4 class=\"h4\">3.1 Dati di navigazione e log tecnici</h4><p>I sistemi informatici e le procedure software preposte al funzionamento del sito acquisiscono, nel corso del loro normale esercizio, alcuni dati personali la cui trasmissione è implicita nell’uso dei protocolli di comunicazione di Internet. Rientrano tra questi: indirizzo IP, tipo di browser e dispositivo, sistema operativo, pagine visitate, tempi di permanenza, referrer, eventuali errori, data/ora della richiesta e altri parametri del dispositivo o dell’ambiente (es. header HTTP).</p><p>Questi dati sono necessari per rendere fruibile il sito, garantirne la sicurezza e misurare in forma aggregata le performance.</p><h4 class=\"h4\">3.2 Dati forniti volontariamente dall’utente</h4><ul><li>contenuto di email, messaggi inviati dal form di contatto o dalla chat dal vivo, e messaggi inviati a <strong>info@ventic.it</strong> o tramite i pulsanti “Prenota una call” / “Scrivici”;</li><li>nome, cognome, azienda, ruolo, recapiti e informazioni condivise volontariamente per richiedere demo, informazioni commerciali, supporto o selezione di configurazione;</li><li>quando prenoti una call via fornitore esterno (es. Calendly), i dati inseriti nel form del fornitore stesso (nome, email, messaggi, preferenze orario).</li></ul><h4 class=\"h4\">3.3 Dati anti-abuso e verifica umana</h4><p>Per proteggere l’indirizzo email e i form da scraping e spam utilizziamo soluzioni anti-bot (Cloudflare Turnstile e/o TrustCaptcha). Durante la verifica possono essere elaborati identificatori tecnici quali IP, header browser, segnali di interazione e il token di verifica; non elaboriamo fingerprint invasivi né dati biometrici.</p><h4 class=\"h4\">3.4 Dati dei cookie e tecnologie simili</h4><p>Vedi sezione 4 “Cookie e tecnologie simili”.</p><p><strong>Non raccogliamo</strong> tramite il sito categorie particolari di dati (art. 9 GDPR) né dati relativi a condanne penali. Ti invitiamo a non inviare dati non necessari o di terzi senza base giuridica.</p>",
      },
      {
        id: "cookie",
        title: "4. Cookie e tecnologie simili",
        html: "<p>Il sito è volutamente leggero. <strong>Non utilizziamo cookie di profilazione né cookie di tracciamento pubblicitario</strong> di prima parte e non vendiamo dati a terzi.</p><h4 class=\"h4\">4.1 Cosa usiamo davvero</h4><table class=\"legal-table\"><thead><tr><th>Categoria</th><th>Nome / origine</th><th>Finalità</th><th>Durata</th><th>Base giuridica</th></tr></thead><tbody><tr><td>Cookie tecnici necessari</td><td>Eventuali cookie di bilanciamento o preferenza lingua (solo se attivati in futuro)</td><td>Mantenere lingua e preferenze essenziali</td><td>Sessione / 12 mesi</td><td>Necessità tecnica — non richiedono consenso (art. 122 Codice Privacy / ePrivacy)</td></tr><tr><td>Anti-abuso</td><td><code>__cf_turnstile</code>, <code>trustcaptcha_*</code> (Cloudflare / TrustCaptcha)</td><td>Verificare che la richiesta provenga da persona umana e prevenire abuso dei form/email</td><td>Sessione / fino a 24h</td><td>Legittimo interesse a proteggere il servizio (art. 6.1.f) + esecuzione di misure precontrattuali su tua richiesta</td></tr><tr><td>Font</td><td>Google Fonts (fonts.googleapis.com / fonts.gstatic.com)</td><td>Fornire il font IBM Plex Sans</td><td>Cache browser</td><td>Legittimo interesse a rendere il sito leggibile; caricamento con preconnect. IP visibile a Google come fornitore tecnico</td></tr></tbody></table><h4 class=\"h4\">4.2 Cookie di terze parti (eventuali)</h4><p>Se prenoti una call, verrai indirizzato a un fornitore esterno (es. Calendly). Quel fornitore può impostare propri cookie secondo la sua cookie policy. Prima del reindirizzamento non impostiamo cookie del fornitore.</p><h4 class=\"h4\">4.3 Come gestire i cookie</h4><p>Puoi bloccare o cancellare i cookie dalle impostazioni del browser (Chrome, Firefox, Safari, Edge). Il blocco dei cookie tecnici o anti-abuso può impedire il corretto funzionamento del sito (es. reveal dell’email o invio del form). Non è presente un banner di consenso perché non usiamo cookie che lo richiedano; se in futuro introdurremo cookie di misurazione o profilazione, mostreremo un banner conforme alle Linee Guida Garante Cookie 2021 e raccoglieremo il consenso preventivo.</p><p>Strumenti utili: <a href=\"https://www.garanteprivacy.it/cookie\" target=\"_blank\" rel=\"noopener\">guida Garante sui cookie</a>, <a href=\"https://www.youronlinechoices.com/it/\" target=\"_blank\" rel=\"noopener\">youronlinechoices.com</a>.</p>",
      },
      {
        id: "finalita",
        title: "5. Finalità e basi giuridiche",
        html: "<p>Trattiamo i tuoi dati solo quando abbiamo una base giuridica. Di seguito le finalità principali:</p><table class=\"legal-table\"><thead><tr><th>Finalità</th><th>Dati</th><th>Base giuridica (GDPR)</th></tr></thead><tbody><tr><td>Rendere disponibile il sito, garantirne sicurezza e prevenire abusi (incluso anti-bot)</td><td>Dati di navigazione, IP, token anti-abuso, log</td><td>Legittimo interesse (art. 6.1.f) — proteggere e amministrare il sito; obbligo legale di sicurezza (art. 32)</td></tr><tr><td>Rispondere a richieste di informazioni, demo, preventivi e prenotazione call</td><td>Dati forniti volontariamente, contenuto messaggi</td><td>Esecuzione di misure precontrattuali su tua richiesta (art. 6.1.b); legittimo interesse a gestire le richieste</td></tr><tr><td>Gestione del rapporto precontrattuale / contrattuale (licenze, analisi server, offerte)</td><td>Dati anagrafici aziendali, referenti, contenuti tecnici condivisi</td><td>Esecuzione contratto / misure precontrattuali (art. 6.1.b); adempimento obblighi legali (art. 6.1.c) per fatturazione</td></tr><tr><td>Adempimenti amministrativi, contabili e fiscali</td><td>Dati di fatturazione e contrattuali</td><td>Obbligo legale (art. 6.1.c)</td></tr><tr><td>Tutela dei diritti e difesa in giudizio</td><td>Log, corrispondenza, dati contrattuali</td><td>Legittimo interesse (art. 6.1.f) e obbligo legale</td></tr><tr><td>Comunicazioni di servizio su Ventic richieste dall’utente (follow-up)</td><td>Email e contenuto richiesta</td><td>Esecuzione di misure precontrattuali / consenso se richiesto</td></tr></tbody></table><p>Non effettuiamo processi decisionali automatizzati che producano effetti giuridici né profilazione ai sensi dell’art. 22 GDPR tramite il sito vetrina.</p>",
      },
      {
        id: "modalita",
        title: "6. Modalità di trattamento e misure di sicurezza",
        html: "<p>Il trattamento avviene con strumenti elettronici e, ove necessario, cartacei, con logiche strettamente correlate alle finalità e con misure tecniche e organizzative adeguate (art. 32 GDPR): cifratura in transito (TLS/HTTPS), minimizzazione, controllo degli accessi, logging, backup, aggiornamenti e segregazione dei ruoli. L’accesso ai dati è limitato al personale autorizzato di Netter srl e a responsabili/fornitori vincolati contrattualmente.</p><p>I componenti descritti nel sito (portale, gateway, agenti remoti e runtime) riguardano il <em>prodotto</em> Ventic distribuito al cliente: quei sistemi non trattano dati dei visitatori del sito vetrina, salvo quanto necessario a erogare il servizio contrattuale e descritto nel relativo DPA.</p>",
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
        html: "<p>I dati possono essere comunicati a:</p><ul><li><strong>Fornitori tecnici nominati responsabili ex art. 28 GDPR</strong> quando trattano dati per nostro conto: fornitore di hosting/CDN del sito statico, fornitore del form di contatto, fornitore di chat dal vivo (Crisp o Tawk.to, caricato solo quando clicchi “Chatta con noi”), fornitore email, fornitori anti-bot (Cloudflare — Turnstile; TrustCaptcha / TrustComponent), fornitore di schedulazione call (es. Calendly) se utilizzi il link di prenotazione, consulenti IT/legali vincolati a riservatezza.</li><li><strong>Titolari autonomi</strong>: autorità giudiziarie, amministrative o di controllo quando previsto dalla legge; Google LLC per la fornitura del font come titolare autonomo secondo la sua privacy policy.</li><li><strong>Personale autorizzato</strong> di Netter srl (art. 29 GDPR).</li></ul><p>L’elenco aggiornato dei responsabili può essere richiesto al contatto privacy. Non diffondiamo i dati.</p>",
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
      plate: "Termini di servizio",
      title: ["Termini", "di servizio"],
      lead: "Ventic è fornito da Netter srl secondo questi Termini. Funzionalità, API, modelli, prestazioni e prezzi possono evolvere. Nessuna SLA salvo accordo scritto. Leggi con attenzione limiti, garanzie e responsabilità.",
      updatedLabel: "Ultimo aggiornamento",
      updatedDate: "2 settembre 2026",
      tocTitle: "Indice",
      printLabel: "Stampa / Salva PDF",
    },
    intro: {
      note: "Questi Termini regolano l’accesso e l’uso del sito ventic.it e della piattaforma Ventic fornita da Netter srl. L’accesso è personale, revocabile e non trasferibile. Se hai firmato un’offerta, ordine o contratto specifico con Netter srl, quel documento prevale sulle parti economiche e operative ivi regolate; per il resto restano applicabili questi Termini.",
      also: "Leggi anche l’Informativa privacy su ventic.it/privacy/ e, se sei cliente On Premise, il relativo DPA. In caso di conflitto tra versione italiana e traduzione inglese, prevale la versione italiana per gli utenti soggetti alla normativa italiana/UE.",
    },
    sections: [
      {
        id: "oggetto",
        title: "1. Oggetto, parti e natura del servizio",
        html: "<p><strong>Fornitore:</strong> <strong>Netter srl</strong>, Via Indipendenza, 06081 Assisi (PG), Italia — P.IVA <strong>IT03569900545</strong> (“<strong>Netter</strong>”, “<strong>noi</strong>”). <strong>Utente/Cliente:</strong> persona fisica o giuridica che accede a Ventic (“<strong>tu</strong>”).</p><p><strong>Ventic</strong> è una piattaforma AI multi-tenant (portale, gateway compatibile OpenAI/Anthropic, billing, filtro PII opzionale, agente remoto, chat Open WebUI opzionale) concessa in licenza software per l’installazione <strong>On Premise</strong>, sul tuo cluster Kubernetes. Il servizio gestito Netter Intelligence (llm.netter.io) è venduto a parte e ha condizioni proprie.</p><p><strong>Natura del servizio:</strong> Ventic è fornito senza garanzie di continuità, nei limiti e alle condizioni di questi Termini; funzionalità, modelli e prestazioni possono evolvere nel tempo. Per carichi che richiedono garanzie specifiche di continuità, concorda per iscritto condizioni diverse.</p>",
      },
      {
        id: "invito",
        title: "2. Accesso su invito, account e requisiti",
        html: "<ul><li><strong>Accesso personale e revocabile.</strong> L’accesso è concesso a valle di candidatura/call e può essere sospeso o revocato in qualsiasi momento, anche senza motivo, con preavviso ragionevole quando possibile.</li><li><strong>Non trasferibile.</strong> Credenziali, API key e chiavi di licenza non sono cedibili a terzi senza consenso scritto di Netter.</li><li><strong>Account e chiavi.</strong> Crei utenti, gruppi, tenant e API key dal pannello. Sei responsabile di custodire le chiavi, ruotarle, revocare chi lascia il team e di ogni uso fatto con le tue credenziali.</li><li><strong>Requisiti tecnici.</strong> Cluster Kubernetes compatibile e connettività come da verifica (max 1 h). L’agente remoto richiede connettività in uscita; i nodi dei modelli non devono esporre porte pubbliche per l’agente.</li><li><strong>Età e capacità.</strong> Dichiari di avere poteri per impegnare l’ente che rappresenti e di avere almeno 18 anni.</li></ul>",
      },
      {
        id: "servizio",
        title: "3. Cosa forniamo (e cosa no)",
        html: "<h4 class='h4'>3.1 Incluso</h4><ul><li>Licenza d’uso dello stack Ventic per la durata prevista dall’offerta o dal contratto (licenza mensile per host o per azienda).</li><li>Portale (console e self-service), gateway compatibile OpenAI/Anthropic, billing, agente remoto per i runtime locali e licenza con lease firmato.</li><li>Assistenza best-effort su canale concordato (es. email/chat dedicata) in orario lavorativo CET, senza tempi garantiti.</li><li>Observability LGTM/Grafana dove attivata; telemetria e log sull’infrastruttura che ospita lo stack.</li></ul><h4 class='h4'>3.2 Opzionale / su richiesta</h4><ul><li>Filtro PII, chat Open WebUI, inferenza gestita con OpenTofu, archivio chat su S3 dell’azienda, venticli e OpenCode.</li><li>Più target equivalenti con routing failover, branding e profilo del provider.</li><li>Setup iniziale (puoi fare da solo) e attività a ore successive.</li></ul><h4 class='h4'>3.3 Fuori perimetro</h4><p>Non forniamo: garanzie su output dei modelli, moderazione o filtraggio custom oltre le restrizioni semantiche di pannello, backup gestiti dei tuoi dati applicativi, conformità certificata per settori regolati (es. medicale, finanziario critico) — salvo diverso accordo scritto.</p>",
      },
      {
        id: "disponibilita",
        title: "4. Disponibilità, manutenzione e assenza di SLA",
        html: "<p><strong>Nessuna SLA salvo accordo scritto.</strong> Non promettiamo uptime, latenza, throughput né RTO/RPO. Il servizio è fornito <em>best effort</em>.</p><ul><li><strong>Interruzioni e breaking change.</strong> Aggiornamenti dell’agente remoto, del gateway, dei modelli e dei runtime possono interrompere il servizio o cambiare API/payload senza preavviso.</li><li><strong>Manutenzione.</strong> Finestre di manutenzione anche senza avviso; cercheremo avvisi ragionevoli dove possibile.</li><li><strong>Scale-to-zero.</strong> Inattività &gt;15 min può spegnere il nodo; la riaccensione avviene alla prima chiamata con breve attesa.</li><li><strong>SLA.</strong> Eventuali SLA saranno concordati per iscritto.</li></ul>",
      },
      {
        id: "prezzi",
        title: "5. Prezzi e fatturazione",
        html: "<p>I prezzi esposti sul sito sono <strong>prezzi di listino</strong> in EUR, IVA esclusa, con fatturazione mensile e impegno di un mese, e possono cambiare.</p><table class='legal-table'><thead><tr><th>Voce</th><th>Importo</th><th>Note</th></tr></thead><tbody><tr><td>Ventic — On Premise, per host</td><td><strong>€29/mese</strong> per host</td><td>Software installato sulla tua infrastruttura.</td></tr><tr><td>Ventic — On Premise, per azienda</td><td><strong>€299/mese</strong></td><td>Canone unico, host non conteggiati.</td></tr></tbody></table><ul><li><strong>Modifiche di listino:</strong> valgono per le nuove richieste; offerte, preventivi e abbonamenti già concordati mantengono il loro importo.</li><li><strong>Fatturazione.</strong> Mensile anticipata, come da offerta. Ritardi: interessi legali ex D.Lgs. 231/2002.</li><li><strong>Tasse.</strong> IVA e altri oneri esclusi.</li><li><strong>La licenza non dipende dai token.</strong> Il consumo dei modelli è credito prepagato, separato dalla licenza e dal listino.</li></ul><p>Netter può correggere errori materiali di prezzo con preavviso. Se non accetti il nuovo prezzo, puoi recedere prima del rinnovo.</p>",
      },
      {
        id: "licenza",
        title: "6. Licenza d’uso e proprietà intellettuale",
        html: "<ul><li><strong>Licenza.</strong> Licenza non esclusiva, non trasferibile, non sublicenziabile, limitata alla durata del contratto e all’uso interno (o, se provider white-label, alla rivendita ai tuoi tenant finali come da contratto). Nessun trasferimento di proprietà.</li><li><strong>Componenti.</strong> Lo stack include o richiama software open-source (es. Open WebUI e i runtime di inferenza) e pesi open-weight con le rispettive licenze: le rispetti integralmente.</li><li><strong>Divieti.</strong> Non decompilare, aggirare misure tecniche, rimuovere loghi/avvisi, né usare Ventic per addestrare modelli concorrenti in violazione di licenze a monte.</li><li><strong>Marchi.</strong> Ventic e Netter srl restano di Netter; OpenAI/Anthropic e altri marchi citati restano dei rispettivi titolari (nessuna affiliazione).</li></ul>",
      },
      {
        id: "feedback",
        title: "7. Feedback, telemetria e contributi",
        html: "<p>Ci aiuti a migliorare Ventic con feedback, bug report, log anonimizzati, prompt di test e suggerimenti (“<strong>Feedback</strong>”). Ci concedi licenza irrevocabile, perpetua, mondiale, gratuita e sublicenziabile per usare, riprodurre e integrare il Feedback nel prodotto senza obbligo di menzione o compenso. Non inviare Feedback che non puoi licenziare.</p><p>Telemetria di servizio (utilizzo, errori, performance) può essere raccolta in forma aggregata per migliorare stabilità e sicurezza. I contenuti dei tuoi prompt/dati applicativi restano tuoi e non sono usati per addestrare modelli di terzi; vedi §9 e DPA.</p>",
      },
      {
        id: "obblighi",
        title: "8. Obblighi dell’utente e uso accettabile",
        html: "<p>Usi Ventic in modo lecito, proporzionato e senza abusare del servizio. In particolare ti impegni a non:</p><ul><li>violare leggi, diritti di terzi o sanzioni applicabili; generare o diffondere contenuti illegali;</li><li>tentare accessi non autorizzati, attacchi, scraping aggressivo, bypass di ruoli/quote/policy, o uso oltre gli host o l’ambito di licenza acquistati;</li><li>condividere chiavi o accessi fuori dal perimetro autorizzato, né esporre gateway o agente su rete pubblica senza controllo;</li><li>usare i modelli per scopi illeciti: resti unico responsabile dell’uso conforme alla legge dei modelli e dei runtime che colleghi;</li><li>caricare dati di cui non hai diritto o categorie particolari/sensibili senza base giuridica, né dati di minori.</li></ul><p>Possiamo applicare rate limit, blocchi automatici e sospensioni per tutelare la piattaforma e gli altri utenti. Segnali abusi a <a href='mailto:info@ventic.it'>info@ventic.it</a>.</p>",
      },
      {
        id: "privacy",
        title: "9. Dati, privacy e sicurezza",
        html: "<p><strong>Sito vetrina:</strong> vedi <a href='/privacy/'>Informativa privacy</a> (titolare Netter srl).</p><p><strong>Dati del servizio (On Premise):</strong> prompt, documenti RAG, log di inferenza, collection Qdrant e dati dei tuoi utenti finali sono trattati <strong>sulla tua infrastruttura / nodo dedicato</strong>. Netter fornisce lo stack e, rispetto a quei dati, opera come <strong>responsabile ex art. 28 GDPR</strong> solo dove previsto dal contratto/DPA; per il resto non accede ai contenuti se non su tua richiesta per supporto.</p><ul><li>Isolamento per tenant, ruoli, quote, revoca delle chiavi e contenuti cifrati come misure di base.</li><li>Sei titolare dei dati che carichi; garantisci base giuridica, informativa ai tuoi interessati e, se necessario, nomina a responsabile/DPA.</li><li>Incidenti: ci avvisiamo senza ritardo secondo DPA e obblighi di legge.</li></ul><p>Replica/DR multicloud solo se acquistata e configurata; altrimenti resta su singolo nodo/regione.</p>",
      },
      {
        id: "modelli",
        title: "10. Modelli AI, output e responsabilità sui contenuti",
        html: "<p>I modelli sono forniti da provider cloud o da runtime che colleghi tu: disponibilità, capacità e licenze dipendono dal target configurato, e i modelli locali restano sotto la tua responsabilità. L’output è generato probabilisticamente e può essere errato, incompleto o inappropriato.</p><ul><li><strong>Nessuna garanzia sull’output.</strong> Validazione, fact-checking e supervisione umana restano a tuo carico, specie per decisioni con effetti su persone o sistemi.</li><li><strong>Policy contenuti.</strong> Puoi applicare policy e filtri (ad esempio PII) per ambito, gruppo, utente o chiave; resti responsabile dei contenuti generati e del loro uso.</li><li><strong>Runtime e pesi propri.</strong> Se colleghi modelli o runtime tuoi, licenze dei pesi, filtri di sicurezza e uso lecito restano a tuo carico.</li></ul>",
      },
      {
        id: "garanzie",
        title: "11. Assenza di garanzie (As-Is)",
        html: "<p><strong>Ventic è fornito “così com’è” e “come disponibile” (as-is / as-available)</strong>, senza garanzie espresse o implicite di commerciabilità, idoneità a scopo particolare, non violazione, accuratezza, completezza, disponibilità, sicurezza o assenza di errori — nei limiti consentiti dalla legge.</p><p>Non garantiamo che il servizio soddisfi le tue esigenze, sia ininterrotto, privo di bug, compatibile con ogni hardware, o che gli output siano corretti. Ogni affidamento è a tuo rischio. Le descrizioni sul sito sono illustrative dell’intento di prodotto, non promesse contrattuali.</p>",
      },
      {
        id: "responsabilita",
        title: "12. Limitazione di responsabilità",
        html: "<p>Nei limiti massimi consentiti dalla legge e salvo dolo o colpa grave di Netter:</p><ul><li><strong>Esclusione danni indiretti.</strong> In nessun caso Netter risponde di lucro cessante, perdita di dati/ricavi/avviamento, costi di sostituzione, danni consequenziali, indiretti o punitivi, anche se avvisata della possibilità.</li><li><strong>Tetto economico.</strong> La responsabilità complessiva di Netter per tutte le pretese relative al servizio è limitata all’importo <strong>effettivamente pagato da te a Netter nei 3 mesi precedenti l’evento</strong> che ha dato origine alla pretesa (o a <strong>€500</strong> se non hai pagato nulla, ad esempio in prova gratuita/POC). Se hai più contratti, vale il contratto rilevante.</li><li><strong>Eccezioni inderogabili.</strong> Nulla limita la responsabilità che la legge dichiara inderogabile (es. diritti inderogabili del consumatore ove applicabili).</li></ul><p>Sei tenuto a mitigare i danni (es. backup, ridondanza, non uso critico senza piano di continuità). La limitazione riflette i prezzi di lancio.</p>",
      },
      {
        id: "durata",
        title: "13. Durata, sospensione e recesso",
        html: "<ul><li><strong>Durata.</strong> Dalla concessione dell’accesso fino a scadenza dell’offerta/contratto o recesso. Netter può chiudere o sospendere il servizio con preavviso ragionevole (anche 7 giorni via email/avviso in pannello), salvo urgenze di sicurezza.</li><li><strong>Sospensione.</strong> Possiamo sospendere o limitare l’accesso per sicurezza, abuso, mancato pagamento, violazione dei Termini o ordini dell’autorità.</li><li><strong>Tuo recesso.</strong> Puoi smettere di usare Ventic in qualsiasi momento; disdici la licenza a fine periodo.</li><li><strong>Effetti.</strong> Alla cessazione cessa la licenza, revochiamo chiavi e licenze e puoi esportare configurazioni/dati presenti sull’infrastruttura che controlli. Log/telemetria aggregata anonima può restare per finalità legittime. Eventuali importi già maturati restano dovuti.</li></ul>",
      },
      {
        id: "modifiche",
        title: "14. Modifiche al servizio e ai Termini",
        html: "<p><strong>Servizio e Termini possono cambiare nel tempo</strong>.</p><ul><li><strong>Servizio:</strong> possiamo aggiungere, rimuovere o modificare funzionalità, API, modelli, requisiti hardware e prezzi futuri, anche con breaking change.</li><li><strong>Termini:</strong> la versione vigente è quella pubblicata su <a href='/termini/'>ventic.it/termini/</a> con data di aggiornamento. Modifiche sostanziali saranno comunicate con avviso sul sito e/o email. Se continui a usare Ventic dopo l’entrata in vigore, accetti i Termini aggiornati; se non accetti, cessa l’uso prima della data indicata.</li></ul><p>Se hai un contratto firmato con clausole difformi, quelle clausole prevalgono per il loro oggetto fino a scadenza.</p>",
      },
      {
        id: "legge",
        title: "15. Legge applicabile e foro competente",
        html: "<p>I Termini sono regolati dalla <strong>legge italiana</strong>, senza riguardo a conflitti di legge. Per ogni controversia relativa a Ventic e a questi Termini, comprese quelle su validità, interpretazione ed esecuzione, è competente in via esclusiva il <strong>Foro di Perugia</strong>, salvo norme inderogabili a tutela del consumatore (ove qualificabile) che prevedano foro diverso.</p><p>Eventuale invalidità di una clausola non travolge le altre; la clausola sarà sostituita con altra valida più vicina all’intento originario.</p><p>Lingua: in caso di contrasto tra italiano e traduzione inglese, prevale l’italiano per i rapporti soggetti alla legge italiana/UE.</p>",
      },
      {
        id: "contatti",
        title: "16. Contatti, comunicazioni e reclami",
        html: "<p><strong>Titolare e fornitore:</strong> Netter srl, Via Indipendenza, 06081 Assisi (PG), Italia — P.IVA IT03569900545. <strong>Email:</strong> <a href='mailto:info@ventic.it'>info@ventic.it</a> (oggetto: “Termini — Ventic”). Rispondiamo di norma entro 10 giorni lavorativi.</p><p><strong>Comunicazioni formali:</strong> sede legale all’attenzione “Ventic — Termini” o PEC se comunicata in offerta.</p><p>Per contestazioni: scrivici descrivendo l’evento e il danno asserito; cercheremo soluzione bonaria. Resta fermo il diritto di adire l’autorità/giudice competente. Per utenti consumatori: informazioni su ADR/ODR disponibili su richiesta.</p>",
      },
    ],
    footerNote: {
      title: "Nota operativa",
      body: "Prezzi, funzionalità, modelli e persino questi Termini possono cambiare. Se qualcosa non ti torna o ti serve una garanzia specifica per andare in produzione, parlane prima con noi: preferiamo un “no, non ancora” onesto a una promessa che non possiamo mantenere.",
    },
    cta: {
      title: "Domande sui Termini?",
      body: "Scrivici a info@ventic.it — oggetto “Termini — Ventic”. Per attivare Ventic o discutere un caso d’uso, prenota una call tecnica.",
      btn: "Prenota una call tecnica",
      mailLabel: "Scrivi a info@ventic.it",
    },
  },

};

const en: typeof it = {
  seo: {
    home: {
      title: "Ventic — multi-tenant AI platform on your Kubernetes",
      desc: "OpenAI- and Anthropic-compatible gateway with prepaid credit, group quotas, reversible PII filtering and local runtimes that connect outbound. Installs on your Kubernetes cluster, licensed through Licman.",
    },
    pricing: {
      title: "Pricing and comparison — Ventic",
      desc: "Ventic licence price list: On Premise at €29/host or €299/month per company. Compared with subscriptions and per-token billing.",
    },
    adminPanel: {
      title: "Ventic console — people, quotas, models, remote agents, audit",
      desc: "The Ventic portal: teams and groups, credit and allocations, model catalogue and Switchyard, remote agents with approval, certified runtimes, API keys and the API lab.",
    },
    privacy: {
      title: "Privacy policy — Ventic",
      desc: "Ventic (Netter srl) GDPR privacy notice: data processed, purposes, legal bases, cookies, rights and controller contacts.",
    },
    termini: {
      title: "Terms of Service — Ventic",
      desc: "Terms of Service for Ventic (Netter srl): limitations, no SLA unless agreed, price list, warranties and liability.",
    },
  },
  nav: {
    cta: "Book a call",
    skip: "Skip to content",
    langLabel: "Language",
  },

  hero: {
    plate: "Companies and providers · Governed AI gateway",
    title: ["Meet", "Ventic."],
    lead: "A multi-tenant AI platform you install on your own Kubernetes: one OpenAI- and Anthropic-compatible endpoint, prepaid credit with group quotas, reversible PII filtering, and cloud or local models under the same rules.",
    startTitle: "Get started with Ventic.",
    startPre: "Write to",
    startPost: "or send me a direct message to request access.",
    cta1: "Request access",
    cta2: "See how it works",
  },
  pains: {
    plate: "Sound familiar?",
    title: "I get it.",
    cards: [
      {
        title: "Shared keys, costs nobody governs?",
        body: "Chat, agents and applications spend from different accounts, with keys passed around the team and no view of who spends what. With Ventic everything goes through one gateway: prepaid credit, quotas per person and group, dedicated keys with spending limits, and usage recorded request by request.",
      },
      {
        title: "Personal data heading to providers you don't control?",
        body: "You want cloud models where they help and local models where data must not leave. With Ventic you choose per model and per policy where each request goes: personal data can be replaced by placeholders before sending and restored in the reply, and runtimes on your hardware connect outbound, with no open ports.",
      },
    ],
  },
  highlights: [
    { icon: "provisioning", title: "Cloud or your own hardware", body: "DeepSeek and OpenRouter for catalogue breadth; local runtimes connected through a remote agent your administrator approves." },
    { icon: "sliders", title: "Credit and quotas", body: "Prepaid wallet: reserve before the request, settle on measured usage, quotas per group, person and API key." },
    { icon: "activity", title: "Observability and audit", body: "OpenTelemetry metrics, logs and traces filtered by company, plus an append-only activity log." },
    { icon: "shield", title: "Reversible PII", body: "Local detection in text, encrypted maps, restoration in the stream. Optional and off by default." },
  ],
  heroShots: {
    label: "Console",
    host: "portal.example.org",
    note: "Real portal — synthetic data",
  },
  problem: {
    id: "why",
    plate: "Why Ventic",
    title: ["LLM providers", "fall short."],
    lead: "Provider LLMs are perfect for very specific, personal tasks. They fall short for agentic and company work.",
    cards: [
      { tag: "01 — Subscription", title: "Tight windows", body: "Quota gone, work stopped. For a person it is a wait; for an overnight agent it is a failure you discover in the morning." },
      { tag: "02 — Subscription", title: "Provider outages", body: "If the provider goes down, so does your product. One point of access, no alternative you control." },
      { tag: "03 — Subscription", title: "Deprecated models", body: "The same prompts give different results over time. Silent updates, little transparency, no reproducibility." },
      { tag: "04 — Per token", title: "Price per token", body: "On frontier models the per-token cost is high and grows exactly when your product succeeds." },
      { tag: "05 — Per token", title: "Compliance", body: "You don't know where each request goes. With Ventic you decide per model and policy whether it can leave the cluster; with a local runtime it does not." },
      { tag: "06 — Per token", title: "Unpredictable budget", body: "LLM consumption is unpredictable by nature. In a company it becomes a line nobody can close to budget." },
    ],
  },
  modes: {
    id: "how-to-get-it",
    plate: "How to get it",
    title: ["A product you install.", "A service, if you prefer."],
    lead: "Ventic is software you install on your own Kubernetes cluster, with a monthly licence per host or per company. If you'd rather not install anything, a managed service is sold separately: Netter Intelligence at llm.netter.io.",
    byoh: {
      tag: "On Premise — the product",
      title: "Install Ventic on your Kubernetes",
      desc: "Kubernetes 1.36 or 1.37, Helm and a signed release: portal, gateway, billing, PII, Open WebUI chat and telemetry. Models come from cloud providers or from runtimes connected through the remote agent.",
      ticks: [
        "Signed release, verified with the owner's public key",
        "Four namespaces per installation; customer companies are application tenants",
        "Outbound remote agent: no public port on the model node",
        "Free 30-day demo, then a licence on Licman",
      ],
      note: "Monthly licence, per host or per company: see the price list on the Pricing page. Hardware, hosting and AI consumption are separate.",
    },
    hosted: {
      tag: "Service — sold separately",
      title: "Prefer a service? Netter Intelligence",
      desc: "Don't want to source or install anything? llm.netter.io is an already-running Ventic service, hosted and operated by Netter. It is not part of the product licence.",
      endpointLabel: "Service",
      host: "llm.netter.io",
      url: "https://llm.netter.io",
      cta: "Open llm.netter.io",
      ticks: [
        "No cluster to source, install or run",
        "Ventic already running, hosted and operated by Netter",
        "The same OpenAI- and Anthropic-compatible gateway",
      ],
      note: "Service terms and plans are on llm.netter.io.",
    },
  },
  how: {
    id: "how-it-works",
    plate: "How it works",
    title: ["From intent", "to a model in production."],
    lead: "You declare resources from the portal or with venticli: Ventic validates them, has them approved where needed and reconciles them. Every request then goes through the same gateway — identity, policy, credit, model.",
    steps: [
      { title: "Connect a runtime", body: "A Rust agent opens an outbound WebSocket to the portal. The tenant administrator compares the SHA-256 fingerprint and approves models and capabilities. No inbound port.", tag: "outbound WSS" },
      { title: "Or have it created", body: "With managed inference you describe a compute pool and a deployment: a reviewed OpenTofu module creates the VMs and installs runtime and agent, and an administrator approves the plan.", tag: "approved plan" },
      { title: "Publish and route", body: "The model appears in the catalogue with a public name and explicit prices. Policies and mappings decide who uses it; leastBusy, weighted or failover routing across equivalent replicas.", tag: "governed catalogue" },
      { title: "Measure and reconcile", body: "Credit is reserved first and settled afterwards on actual usage; an uncertain outcome stays held until there is evidence. Telemetry and audit for every change.", tag: "exact accounting" },
    ],
  },
  stack: {
    id: "stack",
    plate: "Platform",
    title: ["A platform you install,", "not a service you send data to."],
    lead: "Portal, gateway, billing and data run on your Kubernetes. Models are cloud or local, behind the same policy and accounting boundary. Manage everything from the portal or with venticli and declarative manifests.",
    legend: { own: "Always included", opt: "Optional — only if you need it" },
    planes: [
      {
        idx: "01",
        title: "People and applications",
        where: "Browser, API and terminal",
        items: [
          { name: "IT/EN portal", body: "Teams, quotas, credit, keys, model catalogue, remote agents, audit and API lab.", opt: false },
          { name: "Compatible APIs", body: "Chat Completions, Responses, Messages, FIM, token counting, embeddings, vision, speech and transcription, with unbuffered SSE.", opt: false },
          { name: "venticli and OpenCode", body: "A CLI for declarative resources with browser or device sign-in; an OpenCode launcher with a dynamic catalogue of authorised models.", opt: true },
          { name: "Open WebUI chat", body: "Encrypted conversations, MCP and private search, bound to the tenant; it keeps its own branding and licence.", opt: true },
        ],
      },
      {
        idx: "02",
        title: "Gateway and governance",
        where: "App and ops namespaces",
        items: [
          { name: "Control", body: "Identity, tenants, catalogue, policies, API keys, remote agents and runtime jobs from a fixed catalogue.", opt: false },
          { name: "Gateway and Switchyard", body: "Native protocols, routing and choice of the most suitable model among authorised candidates, ranked by exact Decimal cost.", opt: false },
          { name: "Billing", body: "Wallets, reservations, a balanced ledger, top-ups by Stripe or bank transfer, invoices and reseller commissions.", opt: false },
          { name: "PII", body: "Local detection of personal data in text, reversible placeholders and encrypted maps.", opt: true },
        ],
      },
      {
        idx: "03",
        title: "Data and security",
        where: "Data and edge namespaces",
        items: [
          { name: "PostgreSQL and Valkey", body: "CloudNativePG with Barman backups in the bundled profile, or external services; Valkey for rate limits and ephemeral state.", opt: false },
          { name: "WAF and TLS", body: "Traefik, Nginx with ModSecurity CRS, cert-manager certificates; default-deny NetworkPolicies.", opt: false },
          { name: "Keycloak and OpenBao", body: "OIDC sign-in with Google, passkeys and TOTP; secrets and infrastructure credentials held in OpenBao.", opt: false },
        ],
      },
      {
        idx: "04",
        title: "Model runtimes",
        where: "On your hardware or on VMs Ventic creates",
        items: [
          { name: "Remote agent", body: "A Rust agent for Linux and Windows: outbound WSS connection, pairing with a 15-minute invitation, administrator approval.", opt: false },
          { name: "Certified runtimes", body: "Strata and llama.cpp are tested; vLLM, Ollama and SGLang are accepted but not yet certified.", opt: false },
          { name: "Managed inference", body: "Compute pools and deployments through OpenTofu with approved plans, routing and authorised autoscaling. One VM, one complete replica.", opt: true },
        ],
      },
      {
        idx: "05",
        title: "Providers and licence",
        where: "External services",
        items: [
          { name: "DeepSeek and OpenRouter", body: "Cloud models with public names, permissions and prices managed in the catalogue; verified tariffs and FX kept apart from public prices.", opt: false },
          { name: "Licman", body: "An Ed25519-signed lease of at most 72 hours. On expiry new requests stop, but settlement, reconciliation, export and erasure remain available.", opt: false },
          { name: "SMTP, S3, Stripe", body: "Sign-in and invitation email, data archive and backups, online payments: provider integrations.", opt: true },
        ],
      },
    ],
    links: [
      "Portal and API on the same gateway",
      "Policy, credit and PII before the model",
      "Outbound agent — no open port",
      "Licence verified, accounting always available",
    ],
    note: "The chart does not install cluster operators (KEDA, cert-manager, Traefik, CloudNativePG): the cluster administrator provides them. An installation uses four namespaces and does not consume an extra licence per replica or Job.",
  },
  adminPanel: {
    id: "panel",
    plate: "Console",
    title: ["Who uses what,", "is up to you."],
    lead: "The portal runs on your cluster. From here you invite people, assign quotas, choose models, approve remote agents and see who did what.",
    chrome: "portal.example.org",
    shots: [
      {
        id: "team", tab: "Team and groups", src: "/admin/team.webp", w: 1440, h: 760,
        title: "People, groups and quotas",
        body: "Members with role and available quota, groups with reserved budget, and invitations. Sign in with email and password, Google or a passkey; a TOTP or passkey second factor is optional.",
        alt: "Ventic portal, Team and groups: people with role and available quota, with Members, Groups and quotas and Invitations tabs.",
      },
      {
        id: "credit", tab: "Credit", src: "/admin/credit.webp", w: 1440, h: 1000,
        title: "Credit and allocations",
        body: "Total balance, quotas reserved to groups and what remains unallocated. Automatic recurring allocations; every movement has its place in the ledger.",
        alt: "Credit allocations: total balance, credit distribution across groups, reserved quotas and automatic schedules.",
      },
      {
        id: "models", tab: "Models", src: "/admin/models.webp", w: 1440, h: 780,
        title: "Catalogue and Switchyard",
        body: "The catalogue shows only what you are authorised to use: platform models, aliases and your own keys. Switchyard picks among authorised candidates by suitability, effort and cost; PII casting is active when policy requires it.",
        alt: "Model catalogue: filters by type and origin, a list with switchyard and demo models, and a detail pane with chat, messages and responses protocols.",
      },
      {
        id: "agents", tab: "Remote agents", src: "/admin/agents.webp", w: 1440, h: 680,
        title: "Remote agents with approval",
        body: "A runtime on your hardware appears awaiting approval: you compare the SHA-256 fingerprint read on the machine and approve models and capabilities. An offline agent leaves the catalogue.",
        alt: "Remote agents: a notice of agents awaiting approval and a table with state, availability, last contact and models.",
      },
      {
        id: "runtimes", tab: "Runtimes", src: "/admin/runtimes.webp", w: 1440, h: 700,
        title: "Certified runtimes",
        body: "API compatibility is not a certification: only versions and functions that were tested are marked as such. In the current release, Strata and llama.cpp; vLLM, Ollama and SGLang are not certified.",
        alt: "Certified runtimes: Strata and llama.cpp tested, vLLM, Ollama and SGLang not certified, with the verified protocols.",
      },
    ],
  },
  selfServicePanel: {
    id: "self-service",
    plate: "Self-service",
    title: ["Credit, keys,", "API lab."],
    lead: "Everyone sees their own credit, creates keys with spending limits and tries every gateway operation in the Lab, under the same policies as production. Open WebUI chat uses the same credit and quotas.",
    chrome: "portal.example.org",
    shots: [
      {
        id: "overview", tab: "Overview", src: "/selfservice/overview.webp", w: 1440, h: 1100,
        title: "Workspace overview",
        body: "Available and reserved credit, usage over the last seven days by category, pending decisions and most-used models.",
        alt: "Overview: available credit, reserved, recorded usage, a seven-day usage chart and most-used models.",
      },
      {
        id: "playground", tab: "API lab", src: "/selfservice/playground.webp", w: 1440, h: 1100,
        title: "API lab",
        body: "Try Chat, Responses, Messages, embeddings, speech, transcription, FIM, forecasting and files with your session. It spends real credit and generates the request in curl, Python or TypeScript.",
        alt: "API lab: tabs per operation, a request form with model, temperature and SSE streaming, and a copyable curl snippet.",
      },
      {
        id: "keys", tab: "API keys", src: "/selfservice/keys.webp", w: 1440, h: 900,
        title: "Keys with limits",
        body: "Each key has its allowed models, a per-request maximum, a total budget and an expiry. The secret is shown only at creation; you can disable, regenerate or revoke it.",
        alt: "Create API key dialog: name, allowed models, per-request maximum, total budget and validity.",
      },
      {
        id: "billing", tab: "Credit", src: "/selfservice/billing.webp", w: 1440, h: 1100,
        title: "Credit and usage",
        body: "Top-ups by Stripe or bank transfer: credit becomes available only once payment is confirmed. Reservations, usage and workspace credits with exact amounts, VAT excluded.",
        alt: "Credit and usage: available, reserved, used this month, and a list of top-ups with status and method.",
      },
    ],
  },
  caps: {
    id: "what-you-get",
    plate: "What you get",
    title: ["Everything you need", "to govern AI."],
    cta: "Book a technical call",
    items: [
      { title: "Prepaid credit", body: "A wallet per company: reserve before every request, settle on measured usage. Credit arrives only once payment is confirmed." },
      { title: "Group quotas", body: "Allowances for people and groups, recurring allocations, reseller commissions calculated on settled usage." },
      { title: "Governed API keys", body: "Allowed models, per-request maximum, budget, expiry and revocation. Current policies also apply to clients holding an old catalogue." },
      { title: "Reversible PII", body: "Placeholders before the model, originals restored in the stream. Optional, text only: images and audio need specific policies." },
      { title: "Switchyard", body: "Chooses among authorised models by suitability, effort and exact Decimal cost. Selection calls are accounted for." },
      { title: "Remote agents", body: "Runtimes on your hardware over outbound WSS, with approval and explicit consent before sharing with other companies." },
      { title: "Managed inference", body: "Compute pools and deployments with OpenTofu, leastBusy, weighted or failover routing, and autoscaling within approved limits." },
      { title: "Multi-tenant and reseller", body: "Customer companies as application tenants, reseller delegation and commission agreements, without a cluster per customer." },
      { title: "Chat and integrations", body: "Open WebUI with encrypted conversations, OpenCode with a dynamic catalogue, venticli for declarative resources." },
      { title: "Export and erasure", body: "Encrypted content, JSON export, erasure requests and an optional archive of future inference to the company's S3." },
      { title: "Observability and audit", body: "OpenTelemetry metrics, logs and traces, Perses dashboards filtered by company and an append-only activity log." },
      { title: "Licence and continuity", body: "A signed Licman lease of at most 72 hours. On expiry inference stops; settlement, export and erasure remain." },
    ],
  },
  pricing: {
    id: "pricing",
    plate: "Pricing",
    title: ["One price list.", "No surprises."],
    lead: "Ventic is a product: you pay a monthly licence, per host or per company, on your own infrastructure. The licence doesn't depend on tokens: model consumption is separate prepaid credit.",
    link: "Full price list and comparison",
    cards: [
      { tag: "On Premise · per host", price: "€29", unit: "/ host / month + VAT", body: "The software runs on your infrastructure. You pay for each host it is installed on.", warm: false },
      { tag: "On Premise · per company", price: "€299", unit: "/ month + VAT", body: "A single fee for the company, regardless of host count. Better value as the fleet grows.", warm: true },
      { tag: "Demo · 30 days", price: "Free", unit: "on Licman", body: "Install the self-hosted demo, try it on your own data, then move to the licence without reinstalling.", warm: true },
    ],
    foot: "Prices in EUR, VAT excluded · monthly billing, one-month commitment · licences and demos are requested on Licman · hardware, hosting and AI consumption separate · looking for a managed service? llm.netter.io",
  },
  cta: {
    plate: "Get started",
    title: ["Get in touch", "to get started."],
    body: "We help you install Ventic on your infrastructure and start directly from the workload you want to put in production.",
    btn: "Book a technical call",
    mail: "Email us: verify to show",
    mailPrefix: "Email us: ",
  },

  footer: {
    legal: "Netter srl · VAT IT03569900545 · Via Indipendenza, 06081 Assisi (PG), Italy",
    region: "On your own infrastructure",
    mail: "Show email",
    cols: ["Product", "Contact", "Legal"],
    links: [
      { label: "Console", href: "/en/admin-panel/" },
      { label: "Deploy a demo", href: "/en/demo/" },
      { label: "Pricing", href: "/en/pricing/" },
      { label: "Contact", href: "/en/contatti/" },
      { label: "Terms", href: "/en/termini/" },
      { label: "Privacy", href: "/en/privacy/" },
      { label: "Cookie", href: "/en/privacy/#cookie" },
    ],
    disclaimer: "OpenAI and Anthropic are registered trademarks of their respective owners. All rights reserved to their legitimate owners. Ventic is not affiliated with OpenAI, Inc. or Anthropic PBC. Features and pricing subject to change without notice.",
  },
  pricingPage: {
    plate: "Pricing and comparison",
    title: ["Save, and", "govern AI."],
    lead: "Ventic is a product: you pay a monthly licence, per host or per company, on your own infrastructure. The licence doesn't depend on tokens; model consumption is prepaid credit you govern per group and per key.",
    matrix: {
      title: "Ventic vs the alternatives",
      meta: "same work, three ways to pay for it",
      cols: ["Criterion", "Frontier subscription", "Pay per token", "Ventic On Premise"],
      rows: [
        { label: "Predictable end-of-month cost", cells: [
          { mark: "yes", text: "Flat fee" }, { mark: "no", text: "Depends on usage" },
          { mark: "dash", text: "Fixed licence; AI usage is separate prepaid credit" } ] },
        { label: "Spending control", cells: [
          { mark: "no", text: "Per account, little visibility" }, { mark: "dash", text: "Provider dashboard" },
          { mark: "yes", text: "Group quotas, per-key limits, reservation before every request" } ] },
        { label: "Where the data goes", cells: [
          { mark: "no", text: "On the provider's servers" }, { mark: "no", text: "On the provider's servers" },
          { mark: "yes", text: "You decide per model: cloud or local runtime, optional PII" } ] },
        { label: "Choice of models", cells: [
          { mark: "no", text: "The provider's" }, { mark: "dash", text: "Provider catalogue" },
          { mark: "yes", text: "DeepSeek, OpenRouter and your own runtimes, with stable aliases" } ] },
        { label: "Model stability over time", cells: [
          { mark: "no", text: "Changes without notice" }, { mark: "dash", text: "Depends on the provider" },
          { mark: "dash", text: "Stable aliases; on local runtimes you govern the weights" } ] },
        { label: "Continuity during an outage", cells: [
          { mark: "no", text: "You stop with them" }, { mark: "no", text: "You stop with them" },
          { mark: "dash", text: "With several equivalent targets and failover routing" } ] },
        { label: "Audit and accounting", cells: [
          { mark: "no", text: "Not provided" }, { mark: "dash", text: "Provider reports" },
          { mark: "yes", text: "Balanced ledger, activity log, export" } ] },
        { label: "Multiple companies and resale", cells: [
          { mark: "no", text: "No" }, { mark: "no", text: "No" },
          { mark: "yes", text: "Tenants, resellers and commissions" } ] },
        { label: "Infrastructure", cells: [
          { mark: "dash", text: "Not needed" }, { mark: "dash", text: "Not needed" },
          { mark: "dash", text: "Your own Kubernetes cluster; GPUs only for local models" } ] },
      ] as { label: string; cells: Cell[] }[],
    },
    sizing: {
      plate: "How to size it",
      title: ["Not a meter.", "A cluster to size."],
      body: "Sizing starts from the people and applications working together and the models you want to serve, not from tokens. Each VM of a managed deployment hosts one complete replica of the model.",
      items: [
        { label: "Installation", body: "Four dedicated namespaces. Customer companies are application tenants: they get neither a cluster nor a database of their own." },
        { label: "Capacity", body: "Add replicas or equivalent targets; routing distributes with leastBusy, weighted or failover." },
        { label: "SLA", body: "No SLA unless agreed in writing: availability depends on the cluster, models and providers you choose." },
        { label: "Idle time", body: "With authorised autoscaling, managed deployments stop and restart on demand. While starting, the gateway answers 503 model_starting with a Retry-After of 15 seconds." },
      ],
    },
    notes: {
      plate: "Worth keeping in mind",
      items: [
        "Monthly licence with a one-month commitment. Price list changes apply to new requests; subscriptions already agreed keep their amount.",
        "Hardware, hosting, AI consumption, SMTP, S3 storage, payments and third-party licences are separate. The demo includes no AI credit.",
        "Initial setup on request — you can also install it yourself with the guide. Later support by the hour, when needed.",
        "Prices exclude VAT. SLA only if agreed in writing.",
      ],
      ctaTitle: "Let's start with the analysis.",
      ctaBody: "One hour to understand what you want to govern, which models you need and where they must run.",
      ctaBtn: "Book a technical call",
    },
    foot: {
      left: "Ventic — Netter srl · VAT IT03569900545 · Via Indipendenza, 06081 Assisi (PG) · see the site for contacts",
      leftPrefix: "Ventic — Netter srl · VAT IT03569900545 · Via Indipendenza, 06081 Assisi (PG) · ",
      right: "Monthly licence · hardware and AI usage separate · VAT excluded",
    },
  },
  adminPanelPage: {
    plate: "Console guide",
    title: ["Admins and people", "in the same portal."],
    lead: "Admins and users interact with the platform from the portal or with venticli: who gets in, who uses which model, how much credit each one has — and how you resell it under your brand if you act as a provider.",
    sections: [
      {
        id: "users",
        icon: "users",
        plate: "People and access",
        title: "Who gets in, and with which key",
        lead: "The people, groups and keys of each company, one selected workspace at a time.",
        points: [
          { title: "People", body: "Role and available quota for each person, with search and a row menu." },
          { title: "Groups and quotas", body: "A group receives reserved credit and distributes it; recurring allocations can be scheduled." },
          { title: "Invitations", body: "Email invitation with an initial role; the email queue is handled by the system." },
          { title: "API keys", body: "Allowed models, per-request maximum, budget, expiry; instant regeneration and permanent revocation." },
          { title: "Sign-in", body: "Email and password, Google or a passkey, with an optional TOTP or passkey second factor, through Keycloak OIDC." },
          { title: "Company review", body: "Company identity and evidence are reviewed by an operator before payments and reseller features unlock." },
        ],
      },
      {
        id: "roles",
        icon: "shield",
        plate: "Roles and permissions",
        title: "Who can do what, decided by the server",
        lead: "The menu helps you find features, but every operation is authorised by the server: a direct link grants no privileges.",
        points: [
          { title: "Four customer roles", body: "Member, group manager, company administrator and reseller administrator, with distinct scopes." },
          { title: "Platform roles", body: "Separate from company roles: being admin of your own company does not make you a platform admin." },
          { title: "Cascading policy", body: "Platform, company, groups and user: higher constraints also apply to more specific configurations." },
          { title: "Permission check", body: "Ask the service whether your session can perform an action, with an explanation of the decision." },
        ],
      },
      {
        id: "models",
        icon: "provisioning",
        plate: "Models and policy",
        title: "What runs, for whom, at what price",
        lead: "Cloud, local runtimes and managed models in the same catalogue, under the same rules.",
        points: [
          { title: "Catalogue and mappings", body: "Public names kept apart from the upstream target; each feature depends on what the target supports." },
          { title: "Upstream providers and own keys", body: "Encrypted personal credentials, explicit sharing and governed service fees." },
          { title: "Effective policies", body: "Allowed models, default model, PII required and per-request maximum, per scope." },
          { title: "Switchyard", body: "Selection among authorised candidates by suitability, effort and cost." },
          { title: "Managed inference", body: "Compute pools, deployments, routing and autoscaling with approved plans and limits." },
          { title: "Price list and commissions", body: "Public prices kept apart from verified tariffs and FX; reseller commissions from settled usage." },
        ],
      },
      {
        id: "telemetry",
        icon: "ops",
        plate: "Monitoring and audit",
        title: "How much is used, and who changed what",
        lead: "Not conversation content: operational telemetry and a record of administrative actions.",
        points: [
          { title: "Requests and performance", body: "Requests, errors and latency for the workspace, with a link into Perses." },
          { title: "Traffic and usage", body: "How much is used per model and period, computed from the available events." },
          { title: "Logs and traces", body: "Operational logs and slow OpenTelemetry traces, filtered by company." },
          { title: "Activity log", body: "Append-only: who acted, on which resource and which fields changed." },
        ],
      },
      {
        id: "wiring",
        icon: "overlay",
        plate: "Remote agents and CLI",
        title: "Your hardware and automation",
        lead: "Local runtimes and declarative resources are part of the portal, not separate tools.",
        points: [
          { title: "Remote agents", body: "Invitation, pairing, fingerprint approval and model publication, with explicit consent to sharing." },
          { title: "Certified runtimes", body: "An honest list of what has been tested and what is merely compatible." },
          { title: "venticli", body: "Validate, diff, apply and wait on declarative resources, with the same authorisations as the portal." },
          { title: "OpenCode", body: "The launcher reads the authorised catalogue and refreshes it at startup." },
        ],
      },
    ],
    whiteLabel: {
      icon: "cloud",
      plate: "Providers and resale",
      title: ["Your brand,", "our platform."],
      lead: "You administer your own company, or run an installation with your own customers, models and prices.",
      points: [
        { title: "Application multi-tenancy", body: "Each customer is a tenant: data, people, quotas and catalogue are separate, without a cluster per customer." },
        { title: "Resellers and commissions", body: "Administration delegation and commissions calculated on settled usage." },
        { title: "Provider profile", body: "Branding, domains, contacts and legal documents supplied by the owner. Open WebUI keeps its own branding and licence." },
        { title: "Payments and invoices", body: "Top-ups by Stripe or bank transfer, invoices and per-tenant usage." },
      ],
      note: "One installation, many tenants: capacity and costs depend on your infrastructure and the upstream AI services.",
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
      note: "This notice covers only the showcase website ventic.it. It does not govern processing that happens inside the customer’s Ventic infrastructure (On Premise — models, prompts, retained content, inference and accounting logs): for those, Netter acts as a technology stack supplier and, with respect to the end-customer’s data, as processor under Art. 28 GDPR where foreseen by contract; details are in the contract and in the dedicated DPA.",
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
        html: "<h4 class=\"h4\">3.1 Browsing and technical logs</h4><p>IT systems and software procedures used to operate the site acquire, in normal operation, some personal data whose transmission is implicit in Internet protocols. This includes: IP address, browser and device type, OS, pages visited, dwell time, referrer, any errors, date/time of the request and other device/environment parameters (e.g. HTTP headers).</p><p>This data is needed to make the site available, keep it secure and measure performance in aggregated form.</p><h4 class=\"h4\">3.2 Data you provide voluntarily</h4><ul><li>content of emails and messages sent to <strong>info@ventic.it</strong> or via “Book a call” / “Email us” buttons;</li><li>name, surname, company, role, contact details and information you voluntarily share to request a demo, commercial information, support or to shortlist a configuration;</li><li>when you book a call via an external provider (e.g. Calendly), data you enter in that provider’s form (name, email, messages, time preferences).</li></ul><h4 class=\"h4\">3.3 Anti-abuse / human verification</h4><p>To protect the email address and forms from scraping and spam we use anti-bot solutions (Cloudflare Turnstile and/or TrustCaptcha). During verification technical identifiers such as IP, browser headers, interaction signals and the verification token may be processed; we do not use invasive fingerprinting or biometric data.</p><h4 class=\"h4\">3.4 Cookies and similar technologies</h4><p>See Section 4 “Cookies and similar technologies”.</p><p><strong>We do not collect</strong> special categories of data (Art. 9 GDPR) or data on criminal convictions via the showcase site. Please do not send unnecessary data or third-party data without a lawful basis.</p>",
      },
      {
        id: "cookie",
        title: "4. Cookies and similar technologies",
        html: "<p>The site is intentionally lightweight. <strong>We do not use profiling or advertising tracking cookies</strong> of our own and we do not sell data to third parties.</p><h4 class=\"h4\">4.1 What we actually use</h4><table class=\"legal-table\"><thead><tr><th>Category</th><th>Name / origin</th><th>Purpose</th><th>Duration</th><th>Legal basis</th></tr></thead><tbody><tr><td>Strictly necessary cookies</td><td>Any load-balancing or language preference cookies (only if enabled in future)</td><td>Keep language and essential preferences</td><td>Session / 12 months</td><td>Technical necessity — consent not required (Art. 122 / ePrivacy)</td></tr><tr><td>Anti-abuse</td><td><code>__cf_turnstile</code>, <code>trustcaptcha_*</code> (Cloudflare / TrustCaptcha)</td><td>Prove the request comes from a human and prevent form/email abuse</td><td>Session / up to 24h</td><td>Legitimate interest to protect the service (Art. 6(1)(f)) + pre-contractual steps at your request</td></tr><tr><td>Fonts</td><td>Google Fonts (fonts.googleapis.com / fonts.gstatic.com)</td><td>Deliver the IBM Plex Sans font</td><td>Browser cache</td><td>Legitimate interest in legibility; loaded with preconnect. IP visible to Google as technical supplier</td></tr></tbody></table><h4 class=\"h4\">4.2 Third-party cookies (if any)</h4><p>If you book a call you will be redirected to an external provider (e.g. Calendly). That provider may set its own cookies under its cookie policy. No provider cookies are set before the redirect.</p><h4 class=\"h4\">4.3 How to manage cookies</h4><p>You can block or delete cookies in your browser settings (Chrome, Firefox, Safari, Edge). Blocking strictly necessary or anti-abuse cookies may break parts of the site (e.g. email reveal or form send). No consent banner is shown because we do not use cookies that require it; if we introduce analytics or profiling cookies in the future, we will show a banner compliant with the Italian Garante Cookie Guidelines 2021 and collect prior consent.</p><p>Useful tools: <a href=\"https://www.garanteprivacy.it/cookie\" target=\"_blank\" rel=\"noopener\">Garante guide on cookies</a>, <a href=\"https://www.youronlinechoices.com/\" target=\"_blank\" rel=\"noopener\">youronlinechoices.com</a>.</p>",
      },
      {
        id: "purposes",
        title: "5. Purposes and legal bases",
        html: "<p>We process your data only when we have a lawful basis. Main purposes:</p><table class=\"legal-table\"><thead><tr><th>Purpose</th><th>Data</th><th>Legal basis (GDPR)</th></tr></thead><tbody><tr><td>Make the site available, keep it secure and prevent abuse (incl. anti-bot)</td><td>Browsing data, IP, anti-abuse tokens, logs</td><td>Legitimate interest (Art. 6(1)(f)) — protect and administer the site; legal security duty (Art. 32)</td></tr><tr><td>Reply to requests for information, demos, quotes and call bookings</td><td>Data you provide, message content</td><td>Pre-contractual steps at your request (Art. 6(1)(b)); legitimate interest in handling requests</td></tr><tr><td>Manage the pre-contractual / contractual relationship (licences, server assessment, offers)</td><td>Business contact data, technical content shared</td><td>Contract / pre-contract (Art. 6(1)(b)); legal obligations (Art. 6(1)(c)) for invoicing</td></tr><tr><td>Administrative, accounting and tax compliance</td><td>Billing and contract data</td><td>Legal obligation (Art. 6(1)(c))</td></tr><tr><td>Establish, exercise or defend legal claims</td><td>Logs, correspondence, contract data</td><td>Legitimate interest (Art. 6(1)(f)) and legal obligation</td></tr><tr><td>Service follow-ups you requested</td><td>Email and request content</td><td>Pre-contractual steps / consent where required</td></tr></tbody></table><p>We do not carry out automated decision-making producing legal effects nor profiling under Art. 22 GDPR via the showcase site.</p>",
      },
      {
        id: "how",
        title: "6. How we process data and security",
        html: "<p>Processing is carried out by electronic means and, where needed, on paper, with logic strictly related to the purposes and with appropriate technical and organisational measures (Art. 32 GDPR): encryption in transit (TLS/HTTPS), minimisation, access controls, logging, backups, updates and role separation. Access is limited to authorised Netter srl personnel and to processors/suppliers bound by contract.</p><p>The components described on the site (portal, gateway, remote agents and runtimes) concern the <em>product</em> Ventic delivered to the customer: those systems do not process visitor data of the showcase site except as needed to deliver the contracted service and as described in the relevant DPA.</p>",
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
        html: "<p>Data may be shared with:</p><ul><li><strong>Processors under Art. 28 GDPR</strong> where they process data on our behalf: static-site hosting/CDN provider, contact-form provider, live-chat provider (Crisp or Tawk.to, loaded only when you click “Chat with us”), email provider, anti-bot providers (Cloudflare — Turnstile; TrustCaptcha / TrustComponent), call-scheduling provider (e.g. Calendly) if you use the booking link, IT/legal consultants bound by confidentiality.</li><li><strong>Independent controllers</strong>: courts, administrative or supervisory authorities where required by law; Google LLC for font delivery as independent controller under its privacy policy.</li><li><strong>Authorised personnel</strong> of Netter srl (Art. 29 GDPR).</li></ul><p>An up-to-date list of processors is available on request to the privacy contact. We do not disseminate data.</p>",
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
      plate: "Terms of Service",
      title: ["Terms", "of Service"],
      lead: "Ventic is provided by Netter srl under these Terms. Features, APIs, models, performance and pricing may evolve. No SLA unless agreed in writing. Read the limits, warranties and liability carefully.",
      updatedLabel: "Last updated",
      updatedDate: "2 September 2026",
      tocTitle: "Contents",
      printLabel: "Print / Save as PDF",
    },
    intro: {
      note: "These Terms govern access to and use of ventic.it and the Ventic platform provided by Netter srl. Access is personal, revocable and non-transferable. If you signed a specific offer, order or contract with Netter srl, that document prevails for the economic and operational parts it regulates; for the rest these Terms apply.",
      also: "Also read the Privacy notice at ventic.it/en/privacy/ and, if you are an On Premise customer, the relevant DPA. If there is a conflict between the Italian version and the English translation, the Italian version prevails for users subject to Italian/EU law.",
    },
    sections: [
      {
        id: "scope",
        title: "1. Scope, parties and nature of the service",
        html: "<p><strong>Provider:</strong> <strong>Netter srl</strong>, Via Indipendenza, 06081 Assisi (PG), Italy — VAT <strong>IT03569900545</strong> (“<strong>Netter</strong>”, “<strong>we</strong>”). <strong>User/Customer:</strong> natural or legal person accessing Ventic (“<strong>you</strong>”).</p><p><strong>Ventic</strong> is a multi-tenant AI platform (portal, OpenAI/Anthropic-compatible gateway, billing, optional PII filtering, remote agent, optional Open WebUI chat) licensed as software for <strong>On Premise</strong> installation, on your Kubernetes cluster. The managed service Netter Intelligence (llm.netter.io) is sold separately and has its own terms.</p><p><strong>Nature of the service:</strong> Ventic is provided without continuity guarantees, within the limits and conditions of these Terms; features, models and performance may evolve over time. For workloads that need specific continuity guarantees, agree different terms in writing.</p>",
      },
      {
        id: "invite",
        title: "2. Invite-only access, accounts and requirements",
        html: "<ul><li><strong>Personal, revocable access.</strong> Access follows application/call and may be suspended or revoked at any time, even without cause, with reasonable notice when possible.</li><li><strong>Non-transferable.</strong> Credentials, API keys and licence keys are not assignable to third parties without Netter’s written consent.</li><li><strong>Accounts and keys.</strong> You create users, groups, tenants and API keys in the panel. You are responsible for safeguarding keys, rotating them, revoking departing members and any use made with your credentials.</li><li><strong>Technical requirements.</strong> A compatible Kubernetes cluster and connectivity as per check (max 1 h). The remote agent needs outbound connectivity; model nodes must not expose public ports for the agent.</li><li><strong>Eligibility.</strong> You represent you have authority to bind the entity you represent and are at least 18 years old.</li></ul>",
      },
      {
        id: "service",
        title: "3. What we provide (and what we don’t)",
        html: "<h4 class='h4'>3.1 Included</h4><ul><li>License to use the Ventic stack for the period set by the offer or contract (monthly licence per host or per company).</li><li>Portal (console and self-service), OpenAI/Anthropic-compatible gateway, billing, remote agent for local runtimes and a signed-lease licence.</li><li>Best-effort support on the agreed channel (e.g. dedicated email/chat) during CET business hours, no guaranteed response times.</li><li>LGTM/Grafana observability where enabled; telemetry and logs on the infra hosting the stack.</li></ul><h4 class='h4'>3.2 Optional / on request</h4><ul><li>PII filtering, Open WebUI chat, managed inference with OpenTofu, chat archive on the company’s S3, venticli and OpenCode.</li><li>Several equivalent targets with failover routing, branding and the provider profile.</li><li>Initial setup (self-install possible) and follow-on hourly work.</li></ul><h4 class='h4'>3.3 Out of scope</h4><p>No guarantees on model output, custom moderation beyond panel semantic restrictions, managed backups of your app data, certified compliance for regulated sectors (e.g. medical, critical finance) — unless separately agreed in writing.</p>",
      },
      {
        id: "availability",
        title: "4. Availability, maintenance and no SLA",
        html: "<p><strong>No SLA unless agreed in writing.</strong> We promise no uptime, latency, throughput or RTO/RPO. The service is <em>best effort</em>.</p><ul><li><strong>Interruptions and breaking changes.</strong> Remote agent, gateway, model and runtime updates may interrupt service or change APIs/payloads without notice.</li><li><strong>Maintenance.</strong> Maintenance windows, possibly without notice; we will try to give reasonable heads-up where feasible.</li><li><strong>Scale-to-zero.</strong> Idle &gt;15 min may power the node off; wake on first call with a short wait.</li><li><strong>SLA.</strong> Any SLAs will be agreed in writing.</li></ul>",
      },
      {
        id: "pricing",
        title: "5. Price list and billing",
        html: "<p>Prices shown on the site are <strong>list prices</strong> in EUR, VAT excluded, billed monthly with a one-month commitment, and may change.</p><table class='legal-table'><thead><tr><th>Item</th><th>Price</th><th>Notes</th></tr></thead><tbody><tr><td>Ventic — On Premise, per host</td><td><strong>€29/month</strong> per host</td><td>Software installed on your infrastructure.</td></tr><tr><td>Ventic — On Premise, per company</td><td><strong>€299/month</strong></td><td>One fee, hosts not counted.</td></tr></tbody></table><ul><li><strong>List changes:</strong> apply to new requests; quotes, offers and subscriptions already agreed keep their amount.</li><li><strong>Billing.</strong> Monthly in advance, as per offer. Late payment: statutory interest under Italian law (Leg. Decree 231/2002).</li><li><strong>Taxes.</strong> VAT and other duties excluded.</li><li><strong>The licence does not depend on tokens.</strong> Model usage is prepaid credit, separate from the licence and the price list.</li></ul><p>Netter may correct material pricing errors with notice. If you do not accept the new price, you may terminate before renewal.</p>",
      },
      {
        id: "license",
        title: "6. License and intellectual property",
        html: "<ul><li><strong>License.</strong> Non-exclusive, non-transferable, non-sublicensable license limited to the contract term and internal use (or, if a white-label provider, resale to your end tenants as per contract). No transfer of ownership.</li><li><strong>Components.</strong> The stack includes or pulls open-source software (e.g. Open WebUI and the inference runtimes) and open-weight weights under their respective licenses: you must comply with them.</li><li><strong>Prohibitions.</strong> No decompilation, circumvention of technical measures, removal of logos/notices, or use of Ventic to train competing models in breach of upstream licenses.</li><li><strong>Trademarks.</strong> Ventic and Netter srl remain Netter’s; OpenAI/Anthropic and other marks remain their owners’ (no affiliation).</li></ul>",
      },
      {
        id: "feedback",
        title: "7. Feedback, telemetry and contributions",
        html: "<p>You help us improve Ventic with feedback, bug reports, anonymised logs, test prompts and suggestions (“<strong>Feedback</strong>”). You grant us an irrevocable, perpetual, worldwide, royalty-free, sublicensable license to use, reproduce and incorporate Feedback into the product with no attribution or compensation. Do not send Feedback you cannot license.</p><p>Service telemetry (usage, errors, performance) may be collected in aggregated form to improve stability and security. Your prompt/app data contents remain yours and are not used to train third-party models; see §9 and DPA.</p>",
      },
      {
        id: "acceptable",
        title: "8. User obligations and acceptable use",
        html: "<p>You use Ventic lawfully, proportionally and without abusing the service. In particular you will not:</p><ul><li>violate laws, third-party rights or applicable sanctions; generate or disseminate illegal content;</li><li>attempt unauthorised access, attacks, aggressive scraping, bypass of roles/quotas/policy, or use beyond the hosts or licence scope purchased;</li><li>share keys or access outside the authorised perimeter, or expose the gateway or agent to the public internet without control;</li><li>use models for unlawful ends: you remain solely responsible for lawful use of the models and runtimes you connect;</li><li>upload data you have no right to, or special-category/sensitive data without lawful basis, or data about children.</li></ul><p>We may apply rate limits, automatic blocks and suspensions to protect the platform and other users. Report abuse to <a href='mailto:info@ventic.it'>info@ventic.it</a>.</p>",
      },
      {
        id: "privacy",
        title: "9. Data, privacy and security",
        html: "<p><strong>Showcase site:</strong> see <a href='/en/privacy/'>Privacy notice</a> (controller Netter srl).</p><p><strong>Service data (On Premise):</strong> prompts, RAG documents, inference logs, Qdrant collections and your end-user data are processed <strong>on your infra / dedicated node</strong>. Netter supplies the stack and, regarding that data, acts as <strong>processor under Art. 28 GDPR</strong> only where foreseen by contract/DPA; otherwise does not access content except at your request for support.</p><ul><li>Per-tenant isolation, roles, quotas, key revocation and encrypted content as baseline.</li><li>You are controller for data you load; you warrant lawful basis, notices to your data subjects and, where needed, processor appointment/DPA.</li><li>Incidents: we notify each other without undue delay per DPA and legal duties.</li></ul><p>Multicloud/DR replication only if bought and configured; otherwise single node/region.</p>",
      },
      {
        id: "models",
        title: "10. AI models, output and content responsibility",
        html: "<p>Models come from cloud providers or from runtimes you connect: availability, capacity and licences depend on the configured target, and local models remain your responsibility. Output is probabilistic and may be wrong, incomplete or inappropriate.</p><ul><li><strong>No output warranty.</strong> Validation, fact-checking and human oversight remain on you, especially for decisions affecting people or systems.</li><li><strong>Content policy.</strong> You can apply policies and filters (for example PII) per scope, group, user or key; you remain responsible for generated content and its use.</li><li><strong>Your own runtimes and weights.</strong> If you connect your own models or runtimes, weight licences, safety filters and lawful use remain your responsibility.</li></ul>",
      },
      {
        id: "warranty",
        title: "11. No warranties (As-Is)",
        html: "<p><strong>Ventic is provided “as is” and “as available”</strong>, without express or implied warranties of merchantability, fitness for a particular purpose, non-infringement, accuracy, completeness, availability, security or lack of errors — to the fullest extent permitted by law.</p><p>We do not warrant the service will meet your requirements, be uninterrupted, bug-free, compatible with every hardware, or that outputs will be correct. Any reliance is at your own risk. Site descriptions are illustrative of product intent, not contractual promises.</p>",
      },
      {
        id: "liability",
        title: "12. Limitation of liability",
        html: "<p>To the maximum extent permitted by law and except for wilful misconduct or gross negligence of Netter:</p><ul><li><strong>Exclusion of indirect damages.</strong> In no event is Netter liable for loss of profits, data/revenue/goodwill, replacement costs, consequential, indirect or punitive damages, even if advised of the possibility.</li><li><strong>Liability cap.</strong> Netter’s aggregate liability for all claims relating to the service is limited to the amount <strong>actually paid by you to Netter in the 3 months before the event</strong> giving rise to the claim (or <strong>€500</strong> if you paid nothing, e.g. in a free trial/POC). If you have multiple contracts, the relevant contract governs.</li><li><strong>Mandatory exceptions.</strong> Nothing limits liability that the law declares non-limitable (e.g. non-waivable consumer rights where applicable).</li></ul><p>You must mitigate damages (e.g. backups, redundancy, no critical use without a continuity plan). The cap reflects launch pricing.</p>",
      },
      {
        id: "term",
        title: "13. Term, suspension and termination",
        html: "<ul><li><strong>Term.</strong> From access grant until expiry of the offer/contract or termination. Netter may close or suspend the service with reasonable notice (even 7 days via email/panel notice), save for security urgencies.</li><li><strong>Suspension.</strong> We may suspend or limit access for security, abuse, non-payment, breach or authority order.</li><li><strong>Your termination.</strong> You may stop using Ventic at any time; cancel the licence at period end.</li><li><strong>Effects.</strong> On termination the license ends, we revoke keys and licences and you can export configs/data on infra you control. Aggregated anonymised telemetry may remain for legitimate purposes. Amounts already accrued remain due.</li></ul>",
      },
      {
        id: "changes",
        title: "14. Changes to service and Terms",
        html: "<p><strong>Service and Terms may change over time</strong>.</p><ul><li><strong>Service:</strong> we may add, remove or change features, APIs, models, hardware requirements and future pricing, even with breaking changes.</li><li><strong>Terms:</strong> the current version is at <a href='/en/termini/'>ventic.it/en/termini/</a> with update date. Material changes will be notified via site notice and/or email. If you keep using Ventic after the effective date, you accept the updated Terms; if you do not accept, stop use before the date.</li></ul><p>If you have a signed contract with differing clauses, those clauses prevail for their subject until expiry.</p>",
      },
      {
        id: "law",
        title: "15. Governing law and jurisdiction",
        html: "<p>Terms are governed by <strong>Italian law</strong>, without regard to conflict-of-laws. For any dispute about Ventic and these Terms, including validity, interpretation and performance, the exclusive venue is the <strong>Court of Perugia</strong>, save for mandatory consumer-protection rules (where you qualify as consumer) providing a different venue.</p><p>Invalidity of one clause does not affect the others; it will be replaced with the valid clause closest to the original intent.</p><p>Language: if Italian and English conflict, Italian prevails for relationships subject to Italian/EU law.</p>",
      },
      {
        id: "contact",
        title: "16. Contact, notices and complaints",
        html: "<p><strong>Controller/provider:</strong> Netter srl, Via Indipendenza, 06081 Assisi (PG), Italy — VAT IT03569900545. <strong>Email:</strong> <a href='mailto:info@ventic.it'>info@ventic.it</a> (subject: “Terms — Ventic”). We usually reply within 10 business days.</p><p><strong>Formal notices:</strong> registered office attn. “Ventic — Terms” or PEC if given in the offer.</p><p>For disputes: write describing the event and alleged damage; we will seek an amicable solution. Your right to go to the competent authority/court remains. For consumer users: ADR/ODR info available on request.</p>",
      },
    ],
    footerNote: {
      title: "Operating note",
      body: "Pricing, features, models and even these Terms may change. If something does not add up or you need a specific guarantee to go to production, talk to us first: we prefer an honest “not yet” to a promise we cannot keep.",
    },
    cta: {
      title: "Questions about the Terms?",
      body: "Write to info@ventic.it — subject “Terms — Ventic”. To get started with Ventic or discuss a use case, book a technical call.",
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
