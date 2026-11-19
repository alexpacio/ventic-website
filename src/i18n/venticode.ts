import type { Lang } from "./content";
import { pick } from "./onprem";

export const VENTICODE_REPO_URL = "https://github.com/alexpacio/venticode";

export interface VenticodeShot {
  id: string;
  tab: string;
  title: string;
  body: string;
  src: string;
  w: number;
  h: number;
  url: string;
  alt: string;
}

export interface VenticodeAdvantage {
  icon: string;
  tone: "" | "amber" | "jade";
  tag: string;
  title: string;
  body: string;
}

export function venticode(lang: Lang) {
  const t = pick(lang);

  return {
    id: "venticode",
    plate: t("Venticode · Open source AGPL-3.0", "Venticode · Open source AGPL-3.0"),
    title: [
      t("Un agente di coding centralizzato.", "A centralized coding agent."),
      t("Web, CLI TUI e bot nel tuo perimetro.", "Web, CLI TUI and bots inside your perimeter."),
    ] as [string, string],
    lead: t(
      "Venticode è l'agente di coding e bot lato server scritto in Rust e rilasciato open source con licenza GNU AGPL-3.0. Unisce una Web UI e una CLI TUI condivise sullo stile di Pi agent a bot @ventic per Slack, Telegram e GitLab che ricevono menzioni, leggono codice e log via harness e MCP, e trattengono bozze e modifiche in coda di revisione prima di pubblicare.",
      "Venticode is the centralized, server-side coding and bot agent written in Rust and open-sourced under the GNU AGPL-3.0 licence. It pairs a shared Web and CLI TUI in the spirit of Pi agent with @ventic bots for Slack, Telegram and GitLab that pick up mentions, inspect code and logs via harness and MCP, and hold drafts and edits for review before publishing.",
    ),
    repoUrl: VENTICODE_REPO_URL,
    repoLink: t("Esplora il codice su GitHub", "Explore the code on GitHub"),
    shotsLabel: t("Schermate reali di Venticode", "Real Venticode screens"),
    shots: [
      {
        id: "workspace",
        tab: t("Web & CLI TUI", "Web & CLI TUI"),
        title: t("Stessa TUI in browser (WASM) e terminale", "Same TUI in browser (WASM) and terminal"),
        body: t(
          "A sinistra l'inventario degli harness e dei progetti, al centro il terminale TUI compilato in WebAssembly con tool call, diff e output test, a destra attività, modifiche, server MCP e contesto. Con venticode-tui apri la stessa sessione server-side dal tuo terminale.",
          "Harness and project inventory on the left, the WebAssembly TUI terminal with tool calls, diffs and test output in the centre, and tasks, changes, MCP servers and context on the right. Open the exact same server-side session from your terminal with venticode-tui.",
        ),
        src: "/venticode/workspace.webp",
        w: 1440,
        h: 860,
        url: "workspace.code.example.org/c/harness-project-access",
        alt: t(
          "Interfaccia reale di Venticode: inventario degli harness a sinistra, terminale WebAssembly TUI con read_file, write_file, diff SQL e cargo test al centro, pannello attività e server MCP a destra.",
          "Real Venticode workspace UI: harness inventory on the left, WebAssembly TUI terminal showing read_file, write_file SQL diff and cargo test in the centre, tasks and MCP servers on the right.",
        ),
      },
      {
        id: "approval",
        tab: t("Permessi lato server", "Server-side permissions"),
        title: t("Consenso esplicito prima di modifiche e comandi", "Explicit consent before edits and commands"),
        body: t(
          "In modalità ask ogni scrittura o comando sull'harness si ferma in attesa di approvazione: Consenti una volta, Consenti sempre in questo progetto o Nega. Le policy (plan, ask, auto_edit, YOLO per harness) sono imposte dal server Rust, mai aggirabili dal client.",
          "In ask mode every write or command on the harness pauses for approval: Allow once, Always allow in this project, or Deny. Policies (plan, ask, auto_edit, per-harness YOLO) are enforced by the Rust server, never bypassable by the client.",
        ),
        src: "/venticode/approval.webp",
        w: 1440,
        h: 860,
        url: "workspace.code.example.org/c/update-readme",
        alt: t(
          "Schermata reale di Venticode in attesa di consenso: banner di approvazione per edit_file su dev-workstation con scelte Consenti una volta, Consenti sempre in questo progetto e Nega.",
          "Real Venticode permission gate: approval banner for edit_file on dev-workstation with Allow once, Always allow in this project, and Deny actions.",
        ),
      },
      {
        id: "bots",
        tab: t("Bot @ventic", "@ventic bots"),
        title: t("Slack, Telegram e GitLab con revisione umana", "Slack, Telegram and GitLab with human review"),
        body: t(
          "Lo stesso agente risponde alle menzioni @ventic nei canali Slack, nelle chat Telegram e sulle merge request GitLab usando gli strumenti sull'harness del repository. Bozze e scritture restano in coda di revisione finché un membro non clicca Approva e pubblica.",
          "The exact same agent replies to @ventic mentions in Slack channels, Telegram chats and GitLab merge requests using tools on the repository's harness. Drafts and edits remain held for review until a team member clicks Approve and post.",
        ),
        src: "/venticode/bots.webp",
        w: 1440,
        h: 860,
        url: "workspace.code.example.org/bots/ventic",
        alt: t(
          "Schermata reale dei bot @ventic in Venticode: menzione GitLab in attesa di revisione con pulsanti Approva e pubblica e Scarta, menzione Slack risolta via MCP e pannello canali e permessi strumenti a destra.",
          "Real Venticode @ventic bots view: GitLab merge request mention held for review with Approve and post and Discard buttons, Slack mention answered via MCP, and channel and tool policy panel on the right.",
        ),
      },
    ] as VenticodeShot[],

    archLabel: t("Architettura centralizzata", "Centralized architecture"),
    arch: {
      surfaces: {
        label: t("Interfacce condivise", "Shared surfaces"),
        items: [
          t("Web UI (TUI WebAssembly)", "Web UI (WebAssembly TUI)"),
          t("CLI nativa (venticode-tui)", "Native CLI (venticode-tui)"),
          t("Bot @ventic · Slack, Telegram, GitLab", "@ventic bots · Slack, Telegram, GitLab"),
        ],
      },
      inLink: t("HTTPS · SSE senza buffer", "HTTPS · unbuffered SSE"),
      server: {
        label: t("Venticode Server · Rust", "Venticode Server · Rust"),
        badge: "AGPL-3.0",
        items: [
          t("Sessioni, policy e approvazioni su PostgreSQL", "Sessions, policies and approvals in PostgreSQL"),
          t("Trascrizioni, diff e output cifrati AES-256-GCM su S3", "Transcripts, diffs and output encrypted AES-256-GCM in S3"),
          t("Connettore Apache Camel su loopback per i bot", "Loopback Apache Camel connector for bots"),
        ],
      },
      outLink: t("← WSS in uscita", "← outbound WSS"),
      harness: {
        label: t("venticode-harness · remoto", "venticode-harness · remote"),
        items: [
          t("File, shell e terminali live come utente OS dedicato", "Files, shell and live terminals as a dedicated OS user"),
          t("Server MCP con grant per revisione", "MCP servers with revision-pinned grants"),
          t("Sub-agent nativi: Claude Code, Codex, Pi, ACP", "Native sub-agents: Claude Code, Codex, Pi, ACP"),
        ],
      },
    },

    advLabel: t("Perché un agente centralizzato lato server", "Why a centralized server-side agent"),
    advantages: [
      {
        icon: "terminal",
        tone: "",
        tag: t("Stile Pi agent", "Pi-agent ergonomics"),
        title: t("Web + CLI TUI sulla stessa sessione", "Web + CLI TUI on the same session"),
        body: t(
          "Lo stesso renderer TUI gira nativo nel terminale (venticode-tui) e in WebAssembly nel browser. Inizi un task dalla shell, lo continui dal browser o da un altro dispositivo: lo stato e lo stream SSE vivono sul server e non spariscono quando chiudi il terminale.",
          "The same TUI renderer runs natively in the terminal (venticode-tui) and in WebAssembly in the browser. Start a task from your shell, pick it up from the browser or another device: state and SSE streams live on the server and survive closing your terminal.",
        ),
      },
      {
        icon: "users",
        tone: "amber",
        tag: t("Bot operativi · @ventic", "Operational bots · @ventic"),
        title: t("Come funziona @ventic su Slack, Telegram e GitLab", "How @ventic works on Slack, Telegram & GitLab"),
        body: t(
          "Quando un collega menziona @ventic in un canale, in DM o in una merge request, il connettore Apache Camel su loopback inoltra la richiesta al server. L'agente verifica identità collegata, canali autorizzati e limite orario, consulta file e log CI via harness e MCP, e trattiene scritture e bozze di risposta in coda di revisione finché un umano non approva e pubblica.",
          "When a teammate mentions @ventic in a channel, DM or merge request, the loopback Apache Camel connector relays the event to the server. The agent checks linked user identity, allowed channels and hourly rate limits, inspects files and CI logs through the harness and MCP, and holds edits and draft replies in the review queue until a human approves and posts.",
        ),
      },
      {
        icon: "overlay",
        tone: "",
        tag: t("Zero porte in ingresso", "Zero inbound ports"),
        title: t("Runner remoto venticode-harness", "Remote venticode-harness runner"),
        body: t(
          "Colleghi workstation, server di sviluppo o build runner tramite un WebSocket in uscita: niente SSH, VPN o firewall da aprire. Ogni harness gira con il proprio utente OS, limita le cartelle autorizzate ed esegue file, shell, terminali live, MCP e sub-agent come Claude Code, Codex o Pi.",
          "Connect workstations, dev servers or build runners over an outbound WebSocket: no SSH, VPN or firewall holes to open. Each harness runs under its own OS user, restricts granted root folders, and executes files, shell, live terminals, MCP and sub-agents like Claude Code, Codex or Pi.",
        ),
      },
      {
        icon: "shield",
        tone: "amber",
        tag: t("Sicurezza by design", "Security by design"),
        title: t("Permessi e controlli imposti dal server", "Server-enforced permissions & controls"),
        body: t(
          "Modalità plan (sola lettura), ask (chiede prima di ogni scrittura o comando), auto_edit e YOLO esplicito per harness. Autorizzazioni, idempotenza delle richieste, controllo Origin stretto per workspace e limiti orari dei bot sono garantiti dal backend Rust.",
          "Plan (read-only), ask (prompts before every write or command), auto_edit and explicit per-harness YOLO. Authorization, idempotent message IDs, exact workspace-host Origin checks and bot rate limits are enforced by the Rust backend.",
        ),
      },
      {
        icon: "lock",
        tone: "jade",
        tag: t("Audit e compliance", "Audit & compliance"),
        title: t("Trascrizioni cifrate e cronologia di team", "Encrypted transcripts & team continuity"),
        body: t(
          "Nessuna conversazione dispersa sui laptop locali: metadati, progetti, approvazioni e consumi stanno in PostgreSQL, mentre trascrizioni complete, diff e output degli strumenti sono cifrati AES-256-GCM su S3 nel tuo perimetro. Ideale per audit, onboarding e lavoro in team.",
          "No conversation history scattered across local laptops: metadata, projects, approvals and usage stay in PostgreSQL while full transcripts, diffs and tool outputs are encrypted with AES-256-GCM in S3 inside your perimeter. Built for audit, onboarding and team continuity.",
        ),
      },
      {
        icon: "globe",
        tone: "jade",
        tag: t("Open source · GNU AGPL-3.0", "Open source · GNU AGPL-3.0"),
        title: t("Libero da lock-in, standalone o con Ventic", "Zero lock-in, standalone or with Ventic"),
        body: t(
          "Venticode è open source sotto licenza GNU AGPL-3.0: puoi ispezionare il codice, estenderlo e installarlo in autonomia su qualsiasi endpoint OpenAI o Anthropic. Dentro Ventic eredita automaticamente host per workspace, SSO, quote prepagate, filtro PII e routing Switchyard.",
          "Venticode is open-sourced under the GNU AGPL-3.0 licence: inspect the code, extend it and self-host standalone against any OpenAI- or Anthropic-compatible endpoint. Inside Ventic it automatically inherits per-workspace hosts, SSO, prepaid quotas, PII masking and Switchyard routing.",
        ),
      },
    ] as VenticodeAdvantage[],

    browser: {
      label: t("Browser sandboxato su Kubernetes · senza VM", "Sandboxed browser on Kubernetes · VM-free"),
      title: t(
        "Navigazione autonoma isolata con gVisor e takeover umano.",
        "Isolated autonomous browsing with gVisor and human takeover.",
      ),
      lead: t(
        "Per i task web autonomi, il servizio agente avvia un pod browser effimero per sessione isolato con gVisor in modalità systrap — nessun hypervisor né VM guest. Osservi in diretta le schede su cui lavora l'agente, prendi il controllo esclusivo quando serve e, se il pod cade, la conversazione sopravvive.",
        "For autonomous web tasks, the agent service launches one disposable browser pod per active session isolated with gVisor in systrap mode — no guest VM or hardware virtualization. You watch the live tabs, take exclusive control whenever needed, and if the pod dies the chat survives.",
      ),
      flow: [
        t("Viewer live + Takeover + Tool MCP", "Live viewer + Takeover + MCP tools"),
        t("CDP privato (solo servizio agente)", "Private CDP (agent service only)"),
        t("Pod browser effimero · gVisor systrap", "Disposable browser pod · gVisor systrap"),
      ] as [string, string, string],
      points: [
        {
          k: t("Isolamento senza VM", "VM-free isolation"),
          title: t("gVisor in modalità systrap (runsc)", "gVisor in systrap mode (runsc)"),
          body: t(
            "Node pool Linux dedicato con runtimeClassName: gvisor obbligatorio (i pod senza gVisor vengono rifiutati). Il kernel userspace intercetta le syscall senza VM guest; ogni sessione usa un pod effimero con immagini pinnate dal tuo registry, risorse limitate ed egress ristretto.",
            "Dedicated Linux node pool enforcing runtimeClassName: gvisor (pods without gVisor are rejected). The userspace kernel intercepts syscalls without guest VMs; each active session gets a disposable pod from pinned builds in your registry with bounded resources and restricted egress.",
          ),
        },
        {
          k: t("Un solo canale CDP", "Single CDP channel"),
          title: t("Viewer live e tool MCP sulla stessa sessione", "Live viewer & MCP tools on one session"),
          body: t(
            "L'endpoint CDP è raggiungibile solo dal servizio agente ed è condiviso tra i tool MCP e il viewer integrato, che trasmette in diretta la scheda attiva e la barra delle schede.",
            "The CDP endpoint is reachable only by the agent service and shared between MCP tools and the built-in viewer, screencasting the active tab and tab strip in real time.",
          ),
        },
        {
          k: t("Controllo condiviso", "Human-in-the-loop"),
          title: t("Takeover esclusivo e rilascio con snapshot", "Exclusive takeover & fresh-snapshot handback"),
          body: t(
            "Quando premi takeover ottieni l'input esclusivo sul browser (utile per autenticazioni, MFA o conferme manuali). Al rilascio, l'agente riceve uno snapshot aggiornato della pagina e riprende da dove ti sei fermato.",
            "During takeover you have exclusive browser input (ideal for sign-ins, MFA or manual checks). On release, the agent receives a fresh page snapshot and resumes right where you left off.",
          ),
        },
        {
          k: t("Resilienza e segreti", "Resilience & secrets"),
          title: t("Stato e credenziali fuori dal pod browser", "State & credentials outside the browser pod"),
          body: t(
            "Credenziali, identità e cronologia restano nel servizio agente Ventic (Keycloak, PostgreSQL e gateway di inferenza). Se il pod browser termina o viene riciclato, la chat resta intatta e il browser successivo parte pulito.",
            "Credentials, identity and durable state stay in the Ventic agent service (Keycloak, PostgreSQL and the inference gateway). If the browser pod dies or is recycled, the chat survives intact and the next browser starts fresh.",
          ),
        },
      ],
    },

    deploy: {
      standalone: {
        tag: t("Open source · GNU AGPL-3.0", "Open source · GNU AGPL-3.0"),
        title: t("Usa Venticode in autonomia (Standalone)", "Run Venticode standalone"),
        body: t(
          "Compili ed esegui il servizio Rust venticode e il runner venticode-harness sulla tua infrastruttura con PostgreSQL, S3 e qualsiasi provider OpenAI o Anthropic (anche modelli locali). Stessa Web UI WASM, stessa CLI TUI e stesso connettore bot Apache Camel.",
          "Build and run the Rust venticode service and venticode-harness runner on your own infrastructure with PostgreSQL, S3 and any OpenAI- or Anthropic-compatible endpoint (including local models). Same WASM Web UI, same CLI TUI and same Apache Camel bot connector.",
        ),
        cmd: "venticode-tui --standalone https://code.example.org",
        cta: t("Apri github.com/alexpacio/venticode", "Open github.com/alexpacio/venticode"),
        guide: t("Guida di installazione passo passo", "Step-by-step install guide"),
      },
      ventic: {
        tag: t("Incluso nella distribuzione Ventic", "Included in the Ventic distribution"),
        title: t("Attivalo dentro Ventic (Multi-tenant)", "Enable it inside Ventic (Multi-tenant)"),
        body: t(
          "In modalità Ventic ogni workspace ottiene il proprio host isolato (<workspace>.code.<domain>) con handoff a ticket monouso dal portale, SSO aziendale, budget per team, mascheramento PII reversibile e routing Switchyard sui tuoi modelli cloud, neocloud o on-prem.",
          "In Ventic mode every workspace gets its own isolated host (<workspace>.code.<domain>) with one-time ticket handoff from the portal, company SSO, team budgets, reversible PII masking and Switchyard routing across your cloud, neocloud or on-prem models.",
        ),
        cmd: "venticode.enabled = true  # <workspace>.code.<domain>",
      },
      cta: t("Parliamone in una call tecnica", "Talk about it on a technical call"),
    },
  };
}
