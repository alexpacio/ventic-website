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
      "Venticode è l'agente di coding e bot lato server scritto in Rust e rilasciato open source con licenza GNU AGPL-3.0. Unisce una Web UI e una CLI TUI condivise sullo stile di Pi agent con bot @ventic per Slack, Telegram e GitLab sullo stile di Grok Bot e Rakazo, eseguendo gli strumenti in remoto sulle tue macchine senza porte aperte.",
      "Venticode is the centralized, server-side coding and bot agent written in Rust and open-sourced under the GNU AGPL-3.0 licence. It pairs a shared Web and CLI TUI in the spirit of Pi agent with @ventic bots for Slack, Telegram and GitLab like Grok Bot or Rakazo, running tools remotely on your machines with no open ports.",
    ),
    repoUrl: VENTICODE_REPO_URL,
    repoLink: t("Esplora il codice su GitHub", "Explore the code on GitHub"),
    shotsLabel: t("Schermate reali di Venticode", "Real Venticode screens"),
    shots: [
      {
        id: "workspace",
        tab: t("Web & CLI TUI", "Web & CLI TUI"),
        title: t("Stesso FrankenTUI in browser (WASM) e terminale", "Same FrankenTUI in browser (WASM) and terminal"),
        body: t(
          "A sinistra l'inventario degli harness e dei progetti, al centro il terminale FrankenTUI compilato in WebAssembly con tool call, diff e output test, a destra attività, modifiche, server MCP e contesto. Con venticode-tui apri la stessa sessione server-side dal tuo terminale.",
          "Harness and project inventory on the left, the WebAssembly FrankenTUI terminal with tool calls, diffs and test output in the centre, and tasks, changes, MCP servers and context on the right. Open the exact same server-side session from your terminal with venticode-tui.",
        ),
        src: "/venticode/workspace.webp",
        w: 1440,
        h: 860,
        url: "workspace.code.example.org/c/harness-project-access",
        alt: t(
          "Interfaccia reale di Venticode: inventario degli harness a sinistra, terminale WebAssembly FrankenTUI con read_file, write_file, diff SQL e cargo test al centro, pannello attività e server MCP a destra.",
          "Real Venticode workspace UI: harness inventory on the left, WebAssembly FrankenTUI terminal showing read_file, write_file SQL diff and cargo test in the centre, tasks and MCP servers on the right.",
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
          t("Web UI (FrankenTUI WASM)", "Web UI (FrankenTUI WASM)"),
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
          "Lo stesso renderer FrankenTUI gira nativo nel terminale (venticode-tui) e in WebAssembly nel browser. Inizi un task dalla shell, lo continui dal browser o da un altro dispositivo: lo stato e lo stream SSE vivono sul server e non spariscono quando chiudi il terminale.",
          "The same FrankenTUI renderer runs natively in the terminal (venticode-tui) and in WebAssembly in the browser. Start a task from your shell, pick it up from the browser or another device: state and SSE streams live on the server and survive closing your terminal.",
        ),
      },
      {
        icon: "users",
        tone: "amber",
        tag: t("Stile Grok Bot e Rakazo", "Like Grok Bot & Rakazo"),
        title: t("Bot @ventic su Slack, Telegram e GitLab", "@ventic bots on Slack, Telegram & GitLab"),
        body: t(
          "Un unico agente operativo risponde alle menzioni in chat e nelle merge request, interrogando i repository reali e i log CI via MCP. A differenza dei bot cloud generici, ha accesso governato al tuo codice e trattiene bozze e modifiche per revisione umana prima di pubblicare.",
          "One operational agent answers mentions in chat and merge requests, querying real repositories and CI logs over MCP. Unlike generic cloud bots, it has governed access to your code and holds drafts and edits for human review before posting.",
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
