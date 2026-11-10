import type { Lang } from "./content";
import { pick } from "./onprem";

/* Copy for the redesigned home: routing hero, steps, architecture, capabilities. */

export type TargetKey = "cloud" | "neocloud" | "local";

export function home(lang: Lang) {
  const t = pick(lang);
  const pre = lang === "it" ? "" : "/en";

  return {
    hero: {
      plate: t("Infrastruttura LLM ibrida · per aziende e provider", "Hybrid LLM infrastructure · for companies and providers"),
      title: [t("Cloud, neocloud e GPU in casa.", "Cloud, neocloud and on‑prem GPUs."), t("Un endpoint, le tue regole.", "One endpoint, your rules.")] as [string, string],
      lead: t(
        "Smetti di dipendere da un solo provider LLM estero. Con Ventic mixi il traffico di inferenza tra provider cloud, GPU dedicate in neocloud e macchine locali, le metti in produzione con un manifest e decidi con regole quale modello, e in quale quantizzazione, serve ogni richiesta.",
        "Stop depending on a single foreign LLM provider. With Ventic you mix inference traffic across cloud providers, dedicated neocloud GPUs and local machines, put them in production with a manifest, and decide with rules which model, in which quantization, serves each request.",
      ),
      cta1: t("Richiedi la demo di 30 giorni", "Request the 30-day demo"),
      cta2: t("Come funziona", "How it works"),
      how: `${pre}/how-it-works/`,
      tabs: { today: t("Oggi: un provider estero", "Today: one foreign provider"), ventic: t("Con Ventic: le tue regole", "With Ventic: your rules") },
      compareLabel: t("Confronto", "Comparison"),
      ruleLabel: t("Regola", "Rule"),
      sources: { label: t("Le tue richieste", "Your requests"), items: [t("Agenti di coding", "Coding agents"), t("App interne", "Internal apps"), t("Chat aziendale", "Company chat")] },
      today: {
        flow: t("100% del traffico", "100% of traffic"),
        title: t("Un provider LLM estero, in cloud", "One foreign LLM provider, in the cloud"),
        badge: t("Punto unico di guasto", "Single point of failure"),
        issues: [
          [t("Limiti di token", "Token limits"), t("Finita la quota, gli agenti si fermano.", "Quota gone, agents stop.")],
          [t("Dati fuori UE", "Data outside the EU"), t("Ogni prompt esce dal tuo perimetro.", "Every prompt leaves your perimeter.")],
          [t("Prezzo per token", "Per-token pricing"), t("Il costo cresce con il successo.", "Cost grows with success.")],
          [t("Outage e deprecazioni", "Outages and deprecations"), t("Se cambia o cade il modello, cadi tu.", "If the model changes or fails, so do you.")],
        ] as [string, string][],
        cta: t("Guarda con Ventic", "See it with Ventic"),
      },
      router: {
        endpoint: t("endpoint unico · /v1", "single endpoint · /v1"),
        protocols: "OpenAI · Anthropic",
        active: t("Regola attiva", "Active rule"),
        split: t("ripartizione del traffico", "traffic split"),
        log: t("Richieste in tempo reale", "Live requests"),
        req: t("richieste", "requests"),
      },
      targets: [
        { key: "cloud" as TargetKey, name: t("Provider cloud", "Cloud provider"), sub: t("API · chiave tua", "API · your key"), foot: t("pagamento a token · solo quando serve", "pay per token · only when needed"),
          models: [{ id: "frontier", name: t("modello-frontier", "frontier-model"), q: "API" }, { id: "mini", name: "glm-5.3-flash", q: "API" }] },
        { key: "neocloud" as TargetKey, name: "Neocloud", sub: t("GPU dedicate · UE", "dedicated GPUs · EU"), foot: t("8×B300 · autoscaling 1→4 · ComputePool", "8×B300 · autoscaling 1→4 · ComputePool"),
          models: [{ id: "kimi", name: "kimi-k3.1-pro", q: "MXFP4" }, { id: "ds-nc", name: "deepseek-v4.1-flash", q: "NVFP4" }] },
        { key: "local" as TargetKey, name: t("In locale", "On-prem"), sub: t("il tuo server", "your server"), foot: t("Ryzen AI Max+ 495 · 192 GB · Ventic Agent (WSS in uscita)", "Ryzen AI Max+ 495 · 192 GB · Ventic Agent (outbound WSS)"),
          models: [{ id: "qwen", name: "qwen3.8-flash-next", q: "Q4" }, { id: "ds-loc", name: "glm-5.3-flash", q: "IQ4_XS" }] },
      ],
      scenarios: [
        { key: "Vibe coding", rule: [["match", t("team: dev · task: coding", "team: dev · task: coding")], ["split", t("neocloud 55 · locale 35 · cloud 10", "neocloud 55 · on-prem 35 · cloud 10")], ["fallback", t("locale → neocloud", "on-prem → neocloud")]], pct: [10, 55, 35], active: ["frontier", "kimi", "qwen"] },
        { key: t("Dati personali", "Personal data"), rule: [["match", t("pii: rilevata", "pii: detected")], [t("residenza", "residency"), t("solo UE", "EU only")], ["split", t("locale 70 · neocloud UE 30", "on-prem 70 · EU neocloud 30")]], pct: [0, 30, 70], active: [null, "ds-nc", "ds-loc"] },
        { key: t("Ragionamento", "Reasoning"), rule: [["match", "effort: high"], ["split", "cloud 70 · neocloud 30"], ["budget", t("max €0,50 / richiesta", "max €0.50 / request")]], pct: [70, 30, 0], active: ["frontier", "kimi", null] },
        { key: t("Picco di carico", "Load peak"), rule: [["match", t("coda locale > 80%", "on-prem queue > 80%")], ["scaling", t("neocloud 1 → 4 nodi", "neocloud 1 → 4 nodes")], ["split", t("locale 40 · neocloud 35 · cloud 25", "on-prem 40 · neocloud 35 · cloud 25")]], pct: [25, 35, 40], active: ["mini", "ds-nc", "qwen"] },
      ] as { key: string; rule: [string, string][]; pct: [number, number, number]; active: (string | null)[] }[],
      add: t("+ Aggiungi un target con un manifest", "+ Add a target with one manifest"),
      addCmd: "$ venticli apply -f neocloud.yaml",
    },

    steps: {
      id: t("come-funziona", "how-it-works"),
      plate: t("Come funziona", "How it works"),
      title: [t("Come un Kubernetes enterprise,", "Like an enterprise Kubernetes,"), t("ma per LLM.", "but for LLMs.")] as [string, string],
      lead: t(
        "Dichiari l'intento dal pannello o con venticli. Ventic riconcilia lo stato desiderato su tutti i tuoi target, in continuo.",
        "Declare intent from the console or with venticli. Ventic reconciles the desired state across all your targets, continuously.",
      ),
      link: t("Segui una richiesta passo per passo", "Follow a request step by step"),
      items: [
        { title: t("Dichiari l'intento", "Declare intent"), body: t("Pool di GPU, deployment, routing e autoscaling sono risorse dichiarative. Le scrivi in YAML o le crei dal pannello.", "GPU pools, deployments, routing and autoscaling are declarative resources. Write them in YAML or create them in the console."), code: "kind: InferenceDeployment\nspec:\n  runtime: vllm\n  model: qwen3.8-flash-next\n  computePoolRef: gpu-pool" },
        { title: t("Ventic riconcilia", "Ventic reconciles"), body: t("Valida, ordina le dipendenze e porta ogni risorsa allo stato desiderato: provisioning, agent, pubblicazione del modello, scaling.", "Validates, orders dependencies and brings each resource to the desired state: provisioning, agent, model publication, scaling."), code: "$ venticli apply -f team.yaml\n✓ ComputePool          Ready\n✓ InferenceDeployment  Ready" },
        { title: t("Usi l'endpoint", "Use the endpoint"), body: t("Team e agenti puntano i client OpenAI o Anthropic che già usano. Ogni richiesta passa per identità, policy, PII e budget.", "Teams and agents point the OpenAI or Anthropic clients they already use. Every request goes through identity, policy, PII and budget."), code: 'base_url = "https://llm.your-company/v1"\nmodel    = "qwen3.8-flash-next"' },
      ],
    },

    arch: {
      id: t("architettura", "architecture"),
      plate: t("Architettura", "Architecture"),
      title: [t("Tutto nel tuo perimetro.", "Everything inside your perimeter."), t("Nessuna porta esposta.", "No exposed ports.")] as [string, string],
      lead: t(
        "La piattaforma gira sul tuo Kubernetes. Gli agent sui server GPU si collegano in uscita: niente IP pubblico, niente VPN, niente porte in ingresso.",
        "The platform runs on your Kubernetes. Agents on GPU servers connect outbound: no public IP, no VPN, no inbound ports.",
      ),
      clients: { label: t("Chi usa gli LLM", "Who uses LLMs"), items: [t("Agenti di coding", "Coding agents"), t("App e servizi interni", "Internal apps and services"), t("Chat aziendale (Open WebUI)", "Company chat (Open WebUI)"), t("SDK OpenAI / Anthropic", "OpenAI / Anthropic SDKs")] },
      inLabel: "HTTPS · /v1",
      platform: {
        label: t("Piattaforma Ventic · Kubernetes", "Ventic platform · Kubernetes"),
        gateway: "Gateway", gatewayMeta: t("protocolli · streaming", "protocols · streaming"),
        services: [
          ["Control", t("identità, policy, route", "identity, policy, routes")],
          ["Billing", t("wallet, riserve, saldo", "wallets, holds, settlement")],
          ["PII", t("mascheramento reversibile", "reversible masking")],
          ["Reconciler", t("stato desiderato", "desired state")],
        ] as [string, string][],
      },
      outLabel: t("← WSS in uscita", "← outbound WSS"),
      nodes: { label: t("Target · Ventic Agent", "Targets · Ventic Agent"), items: [
        { name: "gpu-node-01", meta: "2×H100 80GB", pct: 94, tone: "accent" },
        { name: "neocloud-eu-02", meta: "8×H100 · FP8", pct: 62, tone: "mid" },
        { name: "spot-eu-03", meta: "1×A100 · spot", pct: 28, tone: "amber" },
      ] },
      foot: t(
        "Runtime supportati: vLLM, SGLang, llama.cpp, Ollama e altri. I provider cloud si collegano con la tua chiave (BYOK).",
        "Supported runtimes: vLLM, SGLang, llama.cpp, Ollama and more. Cloud providers connect with your own key (BYOK).",
      ),
    },

    caps: {
      plate: t("Capacità", "Capabilities"),
      title: [t("L'esperienza di un provider.", "The experience of a provider."), t("Il controllo di un proprietario.", "The control of an owner.")] as [string, string],
      items: [
        { icon: "provisioning", tone: "", title: t("GPU tue o a noleggio", "Your GPUs or rented ones"), body: t("Compute pool su hardware tuo, in neocloud o in cloud, con autoscaling dichiarativo.", "Compute pools on your hardware, in a neocloud or in the cloud, with declarative autoscaling.") },
        { icon: "sliders", tone: "", title: t("Routing Switchyard", "Switchyard routing"), body: t("Sceglie fra le route autorizzate la più idonea, ordinata per costo. Il frontier solo quando serve.", "Picks the most suitable authorised route, ranked by cost. Frontier only when needed.") },
        { icon: "shield", tone: "amber", title: t("PII reversibile", "Reversible PII"), body: t("Dati personali sostituiti da segnaposto prima del modello e ripristinati nella risposta.", "Personal data replaced with placeholders before the model and restored in the response.") },
        { icon: "lock", tone: "amber", title: t("Budget garantito", "Guaranteed budget"), body: t("Ogni richiesta riserva il costo massimo sul wallet prima di partire. Mai sforamenti.", "Every request reserves its maximum cost on the wallet before it runs. Never overspend.") },
        { icon: "users", tone: "", title: t("SSO e RBAC", "SSO and RBAC"), body: t("Accesso OIDC, team, ruoli e chiavi API con limiti di modello, rate e spesa.", "OIDC sign-in, teams, roles and API keys with model, rate and spend limits.") },
        { icon: "globe", tone: "", title: t("Multi-tenant e reseller", "Multi-tenant and resellers"), body: t("Tenant isolati, white label e commissioni ai reseller calcolate sull'uso saldato.", "Isolated tenants, white label and reseller commissions computed on settled usage.") },
        { icon: "terminal", tone: "jade", title: t("Chat aziendale", "Company chat"), body: t("Open WebUI integrata, con contenuti cifrati e accesso legato al tenant.", "Integrated Open WebUI, with encrypted content and tenant-bound access.") },
        { icon: "activity", tone: "jade", title: t("Telemetria", "Telemetry"), body: t("Metriche, log e allarmi per ogni servizio e nodo GPU.", "Metrics, logs and alerts for every service and GPU node.") },
      ],
    },
  };
}
