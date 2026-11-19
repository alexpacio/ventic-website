import type { Lang } from "./content";
import { pick } from "./onprem";
import { VENTICODE_REPO_URL } from "./venticode";

export const VENTICODE_RELEASES_URL = `${VENTICODE_REPO_URL}/releases/latest`;

export interface InstallStep {
  n: string;
  title: string;
  body: string;
  code?: string;
  note?: string;
}

export function venticodeInstall(lang: Lang) {
  const t = pick(lang);

  return {
    releasesUrl: VENTICODE_RELEASES_URL,
    repoUrl: VENTICODE_REPO_URL,
    copy: t("Copia", "Copy"),
    copied: t("Copiato", "Copied"),

    jump: {
      server: t("01 · Parte server", "01 · Server side"),
      client: t("02 · Parti client", "02 · Client side"),
      releases: t("Scarica dalle GitHub Releases", "Download from GitHub Releases"),
      repo: t("Apri repository GitHub", "Open GitHub repository"),
    },

    artifacts: {
      plate: t("Artefatti precompilati · CI GitHub", "Prebuilt artifacts · GitHub CI"),
      title: t(
        "Un archivio pronto per ogni piattaforma, con checksum SHA-256.",
        "One ready-to-run archive per platform, with SHA-256 checksums.",
      ),
      lead: t(
        "Ogni release taggata su GitHub pubblica i binari compilati (venticode, venticode-harness, venticode-tui) e l'app web già assemblata (web/dist/) in un unico pacchetto per piattaforma, accompagnati dal file SHA256SUMS. Non serve compilare Rust né Node.js.",
        "Every tagged GitHub release ships the compiled binaries (venticode, venticode-harness, venticode-tui) together with the built web app (web/dist/) in a single archive per platform, accompanied by SHA256SUMS. No Rust or Node.js build required.",
      ),
      contentsLabel: t("Contenuto di ogni archivio:", "Included in every archive:"),
      contents: ["venticode", "venticode-harness", "venticode-tui", "web/dist/"],
      items: [
        { os: "Linux x64", file: "venticode-linux-x64.tar.gz", role: t("Server · Harness · CLI TUI", "Server · Harness · CLI TUI") },
        { os: "macOS Apple Silicon", file: "venticode-macos-arm64.tar.gz", role: t("Harness · CLI TUI · Server", "Harness · CLI TUI · Server") },
        { os: "macOS Intel", file: "venticode-macos-x64.tar.gz", role: t("Harness · CLI TUI · Server", "Harness · CLI TUI · Server") },
        { os: "Windows x64", file: "venticode-windows-x64.zip", role: t("Harness · CLI TUI · Server", "Harness · CLI TUI · Server") },
      ],
    },

    server: {
      id: "server",
      num: "01",
      plate: t("Parte server", "Server side"),
      title: [
        t("Installa il servizio centrale", "Install the central service"),
        t("sulla tua infrastruttura.", "on your infrastructure."),
      ] as [string, string],
      lead: t(
        "Il servizio Rust venticode gestisce sessioni, policy, approvazioni, metadati su PostgreSQL, trascrizioni cifrate su S3 e serve la Web UI da web/dist/. All'avvio applica da solo le migrazioni del database.",
        "The Rust venticode service handles sessions, policies, approvals, PostgreSQL metadata, encrypted S3 transcripts and serves the Web UI from web/dist/. Database migrations run automatically on startup.",
      ),
      needsTitle: t("Prerequisiti server", "Server prerequisites"),
      needs: [
        t("Host Linux x64 (o macOS/Windows) con accesso a PostgreSQL", "Linux x64 host (or macOS/Windows) with PostgreSQL access"),
        t("Un database PostgreSQL vuoto e un bucket S3 privato (AWS o compatibile)", "An empty PostgreSQL database and a private S3 bucket (AWS or compatible)"),
        t("Endpoint LLM OpenAI o Anthropic (anche il tuo gateway Ventic)", "An OpenAI- or Anthropic-compatible LLM endpoint (including your Ventic gateway)"),
        t("Reverse proxy HTTPS con WebSocket upgrade e SSE senza buffer", "HTTPS reverse proxy with WebSocket upgrades and unbuffered SSE"),
      ],
      envTitle: t("Componenti server", "Server components"),
      env: [
        { k: "venticode", v: t("Servizio HTTP/SSE/WS (default 127.0.0.1:4189)", "HTTP/SSE/WS service (default 127.0.0.1:4189)") },
        { k: "web/dist/", v: t("Web UI e TUI WebAssembly già compilate", "Prebuilt Web UI and WebAssembly TUI") },
        { k: "PostgreSQL + S3", v: t("Metadati su Postgres, trascrizioni AES-256-GCM su S3", "Metadata in Postgres, AES-256-GCM transcripts in S3") },
        { k: "connector (opz.)", v: t("Apache Camel su 127.0.0.1:4190 per bot Slack, Telegram, GitLab", "Apache Camel on 127.0.0.1:4190 for Slack, Telegram & GitLab bots") },
      ],
      steps: [
        {
          n: "01",
          title: t("Scarica l'archivio dalla release e verifica lo SHA-256", "Download the release archive and verify SHA-256"),
          body: t(
            "Prendi il pacchetto precompilato Linux x64 e il file SHA256SUMS dall'ultima release su GitHub, verifica l'integrità ed estrai binari e frontend in /opt/venticode.",
            "Fetch the prebuilt Linux x64 archive and SHA256SUMS from the latest GitHub release, verify integrity and extract binaries and web assets into /opt/venticode.",
          ),
          code: `curl -fSLO ${VENTICODE_RELEASES_URL}/download/venticode-linux-x64.tar.gz
curl -fSLO ${VENTICODE_RELEASES_URL}/download/SHA256SUMS
sha256sum --ignore-missing -c SHA256SUMS
sudo mkdir -p /opt/venticode
sudo tar -xzf venticode-linux-x64.tar.gz -C /opt/venticode`,
        },
        {
          n: "02",
          title: t("Genera UUID, token di accesso e chiave di cifratura", "Generate UUIDs, access tokens and encryption key"),
          body: t(
            "Alloca una sola volta gli UUID del workspace e dell'operatore, due token separati (almeno 32 caratteri) per login e runner, e una chiave AES-256 stabile in Base64.",
            "Allocate stable UUIDs for the workspace and operator once, two separate random tokens (at least 32 characters) for login and runner, and a stable Base64 32-byte AES key.",
          ),
          code: `export VENTICODE_WORKSPACE_ID="$(uuidgen)"
export VENTICODE_USER_ID="$(uuidgen)"
export VENTICODE_LOGIN_TOKEN="$(openssl rand -hex 32)"
export VENTICODE_HARNESS_TOKEN="$(openssl rand -hex 32)"
export VENTICODE_CONTENT_KEY="$(openssl rand -base64 32)"`,
          note: t(
            "Custodisci VENTICODE_CONTENT_KEY insieme ai backup del database e del bucket S3: cifra trascrizioni e credenziali dei bot.",
            "Store VENTICODE_CONTENT_KEY alongside your database and S3 backups: it encrypts transcripts and seals bot credentials.",
          ),
        },
        {
          n: "03",
          title: t("Configura PostgreSQL, S3 e provider LLM", "Configure PostgreSQL, S3 and LLM provider"),
          body: t(
            "Imposta origine pubblica, database, bucket privato e modello upstream. Puoi puntare a OpenAI, Anthropic, al tuo gateway Ventic o a un qualsiasi endpoint OpenAI-compatibile.",
            "Set the public origin, database, private bucket and upstream model. You can point to OpenAI, Anthropic, your Ventic gateway or any OpenAI-compatible endpoint.",
          ),
          code: `export VENTICODE_MODE="standalone"
export VENTICODE_ORIGIN="https://code.example.org"
export LISTEN="127.0.0.1:4189"
export WEB_ROOT="/opt/venticode/web/dist"

export DATABASE_URL="postgres://venticode:PASS@127.0.0.1:5432/venticode"
export S3_BUCKET="venticode-transcripts"
export AWS_REGION="eu-central-1"
# Opzionale per S3-compatibile (MinIO, Ceph, R2):
# export S3_ENDPOINT="https://s3.example.org"

export VENTICODE_LLM_PROVIDER="openai"        # "openai" oppure "anthropic"
export VENTICODE_MODEL="qwen3.8-flash-next"
export VENTICODE_LLM_BASE_URL="https://llm.example.org/v1"
export VENTICODE_LLM_API_KEY="sk-..."`,
        },
        {
          n: "04",
          title: t("Avvia il servizio dietro reverse proxy HTTPS", "Start the service behind an HTTPS reverse proxy"),
          body: t(
            "Avvia il binario venticode (ad esempio come servizio systemd): applica automaticamente le migrazioni PostgreSQL e pubblica sia l'API che la Web UI. Termina TLS sul reverse proxy.",
            "Run the venticode binary (for example as a systemd unit): it runs PostgreSQL migrations automatically and serves both the API and the Web UI. Terminate TLS at your reverse proxy.",
          ),
          code: `/opt/venticode/venticode`,
          note: t(
            "Il reverse proxy (Nginx, Traefik o Caddy) deve preservare l'header Host esterno, supportare l'upgrade WebSocket e inoltrare SSE senza buffering (es. proxy_buffering off).",
            "Your reverse proxy (Nginx, Traefik or Caddy) must preserve the external Host header, support WebSocket upgrades and stream SSE without buffering (e.g. proxy_buffering off).",
          ),
        },
        {
          n: "05",
          title: t("(Opzionale) Attiva il connettore bot per Slack, Telegram e GitLab", "(Optional) Enable the bot connector for Slack, Telegram & GitLab"),
          body: t(
            "Per usare le menzioni @ventic, avvia il connettore Apache Camel sullo stesso host o network namespace (ascolta solo su 127.0.0.1:4190). Poi apri Connessioni bot nella Web UI per inserire credenziali, completare Slack OAuth (/oauth/slack) e collegare gli account.",
            "To enable @ventic mentions, run the Apache Camel connector on the same host or network namespace (listening only on 127.0.0.1:4190). Then open Bot connections in the Web UI to add credentials, complete Slack OAuth (/oauth/slack) and link member identities.",
          ),
          code: `git clone ${VENTICODE_REPO_URL}.git
cd venticode
docker build -t venticode-connector -f connector/Dockerfile connector/
docker run -d --name venticode-connector --network host venticode-connector
# Per GitLab self-managed aggiungi: -e GITLAB_ORIGIN=https://gitlab.example.org`,
          note: t(
            "Se installi Venticode dentro la distribuzione Ventic (VENTICODE_MODE=ventic), basta abilitare venticode.enabled nel chart: host per workspace, SSO e connettore vengono gestiti dal cluster.",
            "When running inside the Ventic distribution (VENTICODE_MODE=ventic), just enable venticode.enabled in the chart: per-workspace hosts, SSO and the connector are managed by the cluster.",
          ),
        },
      ] as InstallStep[],
    },

    client: {
      id: "client",
      num: "02",
      plate: t("Parti client", "Client side"),
      title: [
        t("Collega il runner sui progetti", "Connect the project runner"),
        t("e lavora da browser o CLI TUI.", "and work from browser or CLI TUI."),
      ] as [string, string],
      lead: t(
        "Sulle macchine che ospitano i tuoi repository esegui venticode-harness con una connessione WebSocket in uscita (nessuna porta aperta). Poi accedi alla stessa sessione sia dal browser sia dal terminale con venticode-tui.",
        "On the machines hosting your repositories, run venticode-harness over an outbound WebSocket (zero inbound ports). Then work on the exact same server-side session from your browser or terminal with venticode-tui.",
      ),
      needsTitle: t("Cosa gira lato client", "What runs on the client side"),
      needs: [
        t("venticode-harness sulla workstation, server dev o build runner (Linux, macOS, Windows)", "venticode-harness on your workstation, dev server or build runner (Linux, macOS, Windows)"),
        t("Browser moderno per la Web UI (nessuna installazione locale)", "Any modern browser for the Web UI (zero local install)"),
        t("venticode-tui sul tuo laptop per usare la TUI nativa da terminale", "venticode-tui on your laptop for the native terminal TUI"),
        t("Nessuna porta in ingresso né VPN: basta HTTPS/WSS in uscita verso il server", "No inbound ports or VPN needed: outbound HTTPS/WSS to the server is enough"),
      ],
      envTitle: t("Binari client nell'archivio", "Client binaries in the archive"),
      env: [
        { k: "venticode-harness", v: t("Esegue file, shell, terminali, MCP e sub-agent come utente OS dedicato", "Runs files, shell, terminals, MCP and sub-agents under a dedicated OS user") },
        { k: "Web UI", v: t("Servita dal server su https://code.example.org", "Served directly from https://code.example.org") },
        { k: "venticode-tui", v: t("Client TUI nativo per Linux, macOS e Windows", "Native TUI client for Linux, macOS and Windows") },
      ],
      steps: [
        {
          n: "01",
          title: t("Scarica il pacchetto per la tua piattaforma", "Download the archive for your platform"),
          body: t(
            "Usa lo stesso pacchetto precompilato della release su Linux, macOS (Apple Silicon o Intel) o Windows e verifica il checksum.",
            "Grab the matching prebuilt release archive on Linux, macOS (Apple Silicon or Intel) or Windows and verify the checksum.",
          ),
          code: `# macOS Apple Silicon (sostituisci con linux-x64 o macos-x64 se serve)
curl -fSLO ${VENTICODE_RELEASES_URL}/download/venticode-macos-arm64.tar.gz
curl -fSLO ${VENTICODE_RELEASES_URL}/download/SHA256SUMS
shasum -a 256 --ignore-missing -c SHA256SUMS
tar -xzf venticode-macos-arm64.tar.gz

# Windows (PowerShell)
Invoke-WebRequest ${VENTICODE_RELEASES_URL}/download/venticode-windows-x64.zip -OutFile venticode.zip
Expand-Archive venticode.zip -DestinationPath .\\venticode`,
        },
        {
          n: "02",
          title: t("Avvia il runner remoto venticode-harness sulla macchina dei progetti", "Start the remote venticode-harness on your project machine"),
          body: t(
            "Esegui venticode-harness con un utente OS dedicato che abbia accesso solo alle cartelle di progetto che vuoi esporre. Il runner apre un WebSocket in uscita verso il server e si riconnette da solo dopo cadute di rete.",
            "Run venticode-harness under its own OS user with access only to the project folders you choose to grant. It opens an outbound WebSocket to the server and reconnects automatically after transport drops.",
          ),
          code: `export VENTICODE_SERVER_URL="https://code.example.org"
export VENTICODE_HARNESS_TOKEN="<VENTICODE_HARNESS_TOKEN-del-server>"
export VENTICODE_HARNESS_ROOTS='{"work":"/home/coder/projects"}'

./venticode-harness run`,
          note: t(
            "I comandi nativi girano con i privilegi dell'utente OS del runner. Eventuali sub-agent (Claude Code, Codex, Pi, ACP) presenti nel PATH del runner vengono esposti automaticamente.",
            "Native commands run with the runner OS user's privileges. Any sub-agents (Claude Code, Codex, Pi, ACP) installed on the runner's PATH are exposed automatically.",
          ),
        },
        {
          n: "03",
          title: t("(Opzionale) Configura e autorizza i server MCP sul runner", "(Optional) Configure and grant MCP servers on the runner"),
          body: t(
            "Registra i server MCP locali (es. PostgreSQL, GitLab, Playwright) con il comando dedicato e fissa le revisioni approvate tramite VENTICODE_HARNESS_MCP_GRANTS prima di avviare il runner.",
            "Register local MCP servers (e.g. PostgreSQL, GitLab, Playwright) with the built-in command and pin the approved server revisions via VENTICODE_HARNESS_MCP_GRANTS before starting the runner.",
          ),
          code: `./venticode-harness mcp
export VENTICODE_HARNESS_MCP_GRANTS='{"postgres":1,"gitlab":1}'
./venticode-harness run`,
        },
        {
          n: "04",
          title: t("Accedi dalla Web UI e aggiungi il primo progetto", "Sign in from the Web UI and add your first project"),
          body: t(
            "Apri https://code.example.org nel browser e accedi con VENTICODE_LOGIN_TOKEN (o dal portale Ventic se usi la distribuzione integrata). L'harness comparirà online nella barra a sinistra: seleziona una cartella autorizzata per creare il primo progetto.",
            "Open https://code.example.org in your browser and sign in with VENTICODE_LOGIN_TOKEN (or from the Ventic portal in integrated mode). The harness appears online in the left sidebar: pick a granted folder to create your first project.",
          ),
        },
        {
          n: "05",
          title: t("Avvia la CLI TUI nativa (venticode-tui) dal tuo terminale", "Launch the native CLI TUI (venticode-tui) from your terminal"),
          body: t(
            "Lavora sulle stesse conversazioni server-side dal terminale con venticode-tui. Usa --standalone con lo stesso token di accesso, oppure avvia senza flag per fare login via browser su un portale Ventic.",
            "Work on the exact same server-side conversations from your terminal with venticode-tui. Pass --standalone with the same access token, or run without flags to sign in via browser against a Ventic portal.",
          ),
          code: `# Istanza standalone (usa VENTICODE_LOGIN_TOKEN)
./venticode-tui --standalone https://code.example.org

# Con portale Ventic (login OIDC via browser, aggiungi --en per inglese)
./venticode-tui`,
          note: t(
            "Scorciatoie in TUI: F2 elenca le conversazioni del progetto corrente, F3 cambia progetto. Ogni sessione avviata da terminale è visibile in tempo reale anche nel browser.",
            "TUI shortcuts: F2 lists conversations in the active project, F3 switches projects. Any session started in the terminal streams live in the browser as well.",
          ),
        },
      ] as InstallStep[],
    },
  };
}
