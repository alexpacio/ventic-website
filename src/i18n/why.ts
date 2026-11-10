import type { Lang } from "./content";
import { pick } from "./onprem";

/* Home: what Ventic is, why it pays off for a company, and the security built in. */
export function why(lang: Lang) {
  const t = pick(lang);
  return {
    what: {
      id: t("cos-e-ventic", "what-is-ventic"),
      plate: t("Cos'è Ventic", "What Ventic is"),
      title: [t("L'AI della tua azienda,", "Your company's AI,"), t("alle tue condizioni.", "on your terms.")] as [string, string],
      lead: t(
        "Ventic è la piattaforma che porta i modelli di intelligenza artificiale dentro l'azienda come un servizio interno: un unico endpoint compatibile OpenAI e Anthropic che smista ogni richiesta tra GPU tue, GPU a noleggio in Europa e provider cloud, con identità, budget, privacy e sicurezza già inclusi.",
        "Ventic is the platform that brings AI models into the company as an internal service: one OpenAI- and Anthropic-compatible endpoint that routes every request across your GPUs, rented GPUs in Europe and cloud providers, with identity, budgets, privacy and security built in.",
      ),
      benefitsLabel: t("Perché conviene all'azienda", "Why it pays off for a company"),
      benefits: [
        { k: t("Spendi meno", "Spend less"), t: t("Costi più bassi e prevedibili", "Lower, predictable costs"), b: t("Il grosso del lavoro gira su modelli open, su hardware tuo o a noleggio: paghi la capacità, non ogni token. Il modello frontier si usa solo quando serve davvero.", "Most of the work runs on open models, on your own or rented hardware: you pay for capacity, not for every token. The frontier model is used only when it is really needed.") },
        { k: t("Dati protetti", "Data protected"), t: t("I dati restano in azienda", "Data stays in the company"), b: t("Prompt, documenti e codice restano nel tuo perimetro o in UE. I dati personali vengono mascherati prima del modello e ripristinati nella risposta: puoi usare modelli open anche da provider fuori UE, ad esempio negli USA, senza esporre PII. Più semplice rispettare GDPR e AI Act.", "Prompts, documents and code stay inside your perimeter or in the EU. Personal data is masked before the model and restored in the response: you can use open models even from providers outside your region, such as the US, without exposing PII. GDPR and AI Act compliance gets simpler.") },
        { k: t("Nessun lock-in", "No lock-in"), t: t("Libero da un solo fornitore", "Free from a single vendor"), b: t("Se un provider alza i prezzi, cambia il modello o va giù, sposti il traffico con una regola. Il lavoro dei team non si ferma.", "If a provider raises prices, changes the model or goes down, you move traffic with one rule. Your teams keep working.") },
        { k: t("Spesa sotto controllo", "Spend under control"), t: t("Budget per team, mai sforamenti", "Budgets per team, no overspend"), b: t("Ogni team, progetto e chiave ha il suo budget. Ogni richiesta riserva il costo massimo prima di partire: la fattura non riserva sorprese.", "Every team, project and key has its own budget. Each request reserves its maximum cost before it runs: no surprises on the invoice.") },
        { k: t("Subito operativo", "Ready on day one"), t: t("Nessun software da riscrivere", "No software to rewrite"), b: t("Agenti di coding, app e SDK OpenAI o Anthropic funzionano cambiando solo l'indirizzo. Chat aziendale e accesso SSO sono già inclusi.", "Coding agents, apps and OpenAI or Anthropic SDKs work by changing only the address. Company chat and SSO sign-in are already included.") },
        { k: t("Sicuro di serie", "Secure by default"), t: t("Cybersecurity inclusa", "Cybersecurity included"), b: t("Core in Rust, WAF integrato, nessuna porta esposta sui server GPU. Non devi comprare né integrare altri prodotti per proteggerlo.", "Rust core, built-in WAF, no exposed ports on GPU servers. You do not need to buy or wire up other products to protect it.") },
      ],
      usesLabel: t("A cosa serve", "What it is for"),
      uses: [
        [t("Agenti di coding", "Coding agents"), t("Assistenti e agenti per gli sviluppatori, senza limiti di quota e senza che il codice esca dall'azienda.", "Assistants and agents for developers, with no quota limits and without code leaving the company.")],
        [t("Chat aziendale", "Company chat"), t("Un assistente in stile ChatGPT per tutti i dipendenti, con accesso aziendale e conversazioni cifrate.", "A ChatGPT-style assistant for every employee, with company sign-in and encrypted conversations.")],
        [t("App e automazioni", "Apps and automations"), t("Un solo endpoint per le applicazioni interne, i flussi documentali e gli assistenti clienti.", "One endpoint for internal applications, document workflows and customer assistants.")],
        [t("Modelli open da ogni provider", "Open models from any provider"), t("Usa i modelli open più convenienti anche da provider non regionali (UE, USA e altri): il PII viene mascherato prima di uscire e ripristinato al ritorno.", "Use the cheapest open models even from non-regional providers (EU, US and others): PII is masked before it leaves and restored on the way back.")],
        [t("Dati sensibili", "Sensitive data"), t("Le richieste con dati personali o riservati vanno solo su modelli locali o in UE, per regola.", "Requests with personal or confidential data go only to local or EU models, by rule.")],
        [t("Rivendere AI", "Reselling AI"), t("Provider e system integrator offrono AI ai propri clienti, con tenant isolati, white label e fatturazione.", "Providers and system integrators offer AI to their customers, with isolated tenants, white label and billing.")],
      ] as [string, string][],
    },

    platform: {
      id: t("piattaforma", "platform"),
      plate: t("La piattaforma", "The platform"),
      title: [t("Un pannello per tutto.", "One console for everything."), t("Persone, modelli, GPU e budget.", "People, models, GPUs and budgets.")] as [string, string],
      lead: t(
        "Dal portale gestisci team e quote, colleghi i runtime, pubblichi i modelli e controlli credito e consumi. Senza YAML, se non vuoi.",
        "From the portal you manage teams and quotas, connect runtimes, publish models and track credit and usage. No YAML, unless you want it.",
      ),
      link: t("Scopri la piattaforma", "Explore the platform"),
    },

    hw: {
      label: t("Inferenza locale: dal PC al rack", "Local inference: from PC to rack"),
      items: [
        { src: "/hw/ai-pc.svg", t: t("PC AI da scrivania", "Desktop AI PC"), b: t("Ryzen AI Max+ 495 con 192 GB di memoria unificata: modelli open per un team di sviluppatori, sotto la scrivania.", "Ryzen AI Max+ 495 with 192 GB of unified memory: open models for a developer team, under the desk."), alt: t("Illustrazione di un PC AI compatto con Ryzen AI Max+ 495 e 192 GB", "Illustration of a compact AI PC with Ryzen AI Max+ 495 and 192 GB") },
        { src: "/hw/gpu-rack.svg", t: t("Server GPU a rack", "Rack GPU servers"), b: t("Nodi multi-GPU nel tuo datacenter per tutta l'azienda: Ventic li gestisce come un unico compute pool, con autoscaling.", "Multi-GPU nodes in your datacenter for the whole company: Ventic manages them as one compute pool, with autoscaling."), alt: t("Illustrazione di un armadio rack con server multi-GPU", "Illustration of a rack cabinet with multi-GPU servers") },
      ],
    },

    secure: {
      id: t("sicurezza", "security"),
      plate: t("Prestazioni e sicurezza", "Performance and security"),
      title: [t("Scritto in Rust.", "Written in Rust."), t("Veloce, scalabile, protetto.", "Fast, scalable, protected.")] as [string, string],
      lead: t(
        "Prestazioni, affidabilità mission critical e cybersecurity non sono moduli da aggiungere dopo: arrivano con l'installazione. Il codice è veloce e sicuro per costruzione, scala in orizzontale e il traffico passa da un web application firewall già configurato.",
        "Performance, mission-critical reliability and cybersecurity are not add-ons for later: they ship with the install. The code is fast and safe by construction, scales horizontally, and traffic goes through a web application firewall that is already configured.",
      ),
      rust: {
        title: t("Il cuore della piattaforma è in Rust", "The core of the platform is Rust"),
        body: t(
          "Gateway, control plane, billing, worker, agent sui server GPU e venticli sono scritti in Rust, il linguaggio scelto per i componenti critici di sistemi operativi, browser e cloud.",
          "Gateway, control plane, billing, worker, the agent on GPU servers and venticli are written in Rust, the language chosen for the critical components of operating systems, browsers and clouds.",
        ),
        points: [
          [t("Memoria sicura", "Memory safe"), t("Niente buffer overflow e use-after-free: le classi di vulnerabilità più sfruttate sono escluse dal compilatore.", "No buffer overflows or use-after-free: the most exploited vulnerability classes are ruled out by the compiler.")],
          [t("Veloce e leggero", "Fast and lean"), t("Nessun garbage collector: latenza bassa e costante sullo streaming, consumi di CPU e memoria contenuti.", "No garbage collector: low, steady latency on streaming, modest CPU and memory use.")],
          [t("Binari firmati", "Signed binaries"), t("Rilasci verificati con firma, agent con identità legata all'installazione.", "Releases verified by signature, agents with installation-bound identity.")],
        ] as [string, string][],
      },
      perf: {
        title: t("Performante e pensato per il mission critical", "High performance, built for mission-critical use"),
        body: t(
          "Ventic è pensato per carichi mission critical: regge traffico sostenuto da interi team di sviluppatori, agenti e applicazioni che chiamano i modelli tutto il giorno, resta in piedi quando un nodo o un provider cade e cresce aggiungendo repliche invece di comprare server più grandi.",
          "Ventic is designed for mission-critical workloads: it carries sustained traffic from whole teams of developers, agents and applications calling models all day long, stays up when a node or provider fails, and grows by adding replicas instead of buying bigger servers.",
        ),
        items: [
          [t("I/O asincrono", "Asynchronous I/O"), t("Gateway Rust su Tokio: molti stream concorrenti per replica, senza un thread per richiesta.", "Rust gateway on Tokio: many concurrent streams per replica, without a thread per request.")],
          [t("Scalabilità orizzontale", "Horizontal scaling"), t("Gateway, control e billing sono senza stato: lo stato vive in PostgreSQL e Valkey, quindi aggiungi repliche dietro il bilanciatore. Due repliche già di default.", "Gateway, control and billing are stateless: state lives in PostgreSQL and Valkey, so you add replicas behind the load balancer. Two replicas by default.")],
          [t("Autoscaling delle GPU", "GPU autoscaling"), t("I compute pool crescono e si riducono da soli con il carico, su hardware tuo o in neocloud.", "Compute pools grow and shrink on their own with load, on your hardware or in a neocloud.")],
          [t("Nessun punto unico di guasto", "No single point of failure"), t("Più repliche per servizio e più target per modello: se un nodo o un provider cade, il traffico passa agli altri.", "Several replicas per service and several targets per model: if a node or provider fails, traffic moves to the others.")],
        ] as [string, string][],
      },
      waf: {
        title: t("WAF integrato", "Built-in WAF"),
        body: t(
          "Ogni richiesta verso portali e API passa da Nginx con ModSecurity e OWASP Core Rule Set, configurabile dal pannello di amministrazione.",
          "Every request to portals and APIs goes through Nginx with ModSecurity and the OWASP Core Rule Set, configurable from the admin console.",
        ),
        items: [
          [t("OWASP Core Rule Set v4", "OWASP Core Rule Set v4"), t("Blocca SQL injection, XSS, remote code execution, path traversal e violazioni di protocollo.", "Blocks SQL injection, XSS, remote code execution, path traversal and protocol violations.")],
          [t("Anomaly scoring regolabile", "Tunable anomaly scoring"), t("Livello di paranoia e soglia di anomalia configurabili; modalità solo rilevamento o blocco.", "Configurable paranoia level and anomaly threshold; detection-only or blocking mode.")],
          [t("Rate limiting per IP", "Per-IP rate limiting"), t("Limiti separati per login, API e portali, con burst e richieste al minuto: argina brute force e abusi.", "Separate limits for login, API and portals, with burst and requests per minute: stops brute force and abuse.")],
          [t("Limiti di connessioni", "Connection limits"), t("Richieste simultanee per IP e totali, dimensione massima del body: protegge dai picchi e dal DoS applicativo.", "Concurrent requests per IP and in total, maximum body size: protects against spikes and application-level DoS.")],
          [t("Blocklist e threat feed", "Blocklists and threat feeds"), t("IP e reti bloccati a mano, più le liste pubbliche di IP malevoli, con eccezioni per le tue reti.", "IPs and networks blocked by hand, plus public lists of malicious IPs, with exceptions for your networks.")],
          [t("Difesa in profondità", "Defence in depth"), t("TLS automatico, NetworkPolicy default-deny e agent GPU senza porte in ingresso.", "Automatic TLS, default-deny NetworkPolicies and GPU agents with no inbound ports.")],
        ] as [string, string][],
      },
    },
  };
}
