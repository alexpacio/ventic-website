import type { Lang } from "./content";

const pick = (lang: Lang) => <T,>(it: T, en: T): T => (lang === "it" ? it : en);

/** Sub-pages that used to be sections of the one-page home. Same slug in both languages. */
export const pageKeys = ["why", "how", "platform", "onprem", "resellers", "compare"] as const;
export type PageKey = (typeof pageKeys)[number];

export const slugs: Record<PageKey, string> = {
  why: "why-ventic",
  how: "how-it-works",
  platform: "platform",
  onprem: "on-premise",
  resellers: "resellers",
  compare: "comparison",
};

export const pagePath = (lang: Lang, key: PageKey) => `${lang === "en" ? "/en" : ""}/${slugs[key]}/`;
export const homePath = (lang: Lang) => (lang === "en" ? "/en/" : "/");

export function pages(lang: Lang) {
  const t = pick(lang);
  return {
    why: {
      nav: t("Perché Ventic", "Why Ventic"),
      crumb: t("Perché Ventic", "Why Ventic"),
      seo: {
        title: t("Perché Ventic — oltre subscription e pagamento a token", "Why Ventic — beyond subscriptions and per-token billing"),
        desc: t(
          "Limiti di quota, outage, modelli deprecati, prezzi a token e compliance: perché i provider di LLM non bastano per il lavoro agentico e aziendale, e come Ventic governa l'AI sul tuo cluster.",
          "Quota limits, outages, deprecated models, per-token pricing and compliance: why LLM providers fall short for agentic and company work, and how Ventic governs AI on your cluster.",
        ),
      },
      hero: {
        plate: t("Perché Ventic", "Why Ventic"),
        title: t(["I provider non", "bastano più."], ["Providers are", "not enough."]),
        lead: t(
          "Cosa si rompe quando agenti e team usano un LLM in subscription o a token, e come Ventic lo governa.",
          "What breaks when agents and teams run on a subscription or per-token LLM, and how Ventic governs it.",
        ),
      },
    },
    how: {
      nav: t("Come funziona", "How it works"),
      crumb: t("Come funziona", "How it works"),
      seo: {
        title: t("Come funziona Ventic — richiesta, credito, agenti remoti", "How Ventic works — request, credit, remote agents"),
        desc: t(
          "Dall'intento al modello in produzione: agente remoto, inferenza gestita, routing, contabilità esatta e 12 capacità sotto il cofano, con gli schemi architetturali.",
          "From intent to a model in production: remote agent, managed inference, routing, exact accounting and 12 under-the-hood capabilities, with architecture diagrams.",
        ),
      },
      hero: {
        plate: t("Architettura", "Architecture"),
        title: t(["Dall'intento", "al modello."], ["From intent", "to model."]),
        lead: t(
          "Come Ventic collega un runtime, instrada una richiesta e ne contabilizza il costo, con gli schemi di ogni componente.",
          "How Ventic connects a runtime, routes a request and accounts for its cost, with a diagram of every component.",
        ),
      },
    },
    platform: {
      nav: t("Piattaforma", "Platform"),
      crumb: t("Piattaforma", "Platform"),
      seo: {
        title: t("Piattaforma Ventic — stack e funzioni", "Ventic platform — stack and features"),
        desc: t(
          "Lo stack Ventic componente per componente: gateway, billing, dati, runtime e licenza.",
          "The Ventic stack component by component: gateway, billing, data, runtimes and licence.",
        ),
      },
      hero: {
        plate: t("Piattaforma", "Platform"),
        title: t(["Tutto lo stack,", "già assemblato."], ["The whole stack,", "already assembled."]),
        lead: t(
          "I componenti e le funzioni incluse, sul tuo cluster Kubernetes.",
          "The components and the features included, on your Kubernetes cluster.",
        ),
      },
    },
    onprem: {
      nav: t("On-premise", "On-premise"),
      crumb: t("On-premise", "On-premise"),
      seo: {
        title: t("Ventic on-premise — installa la piattaforma sul tuo Kubernetes", "Ventic on-premise — install the platform on your Kubernetes"),
        desc: t(
          "Installa Ventic sulla tua infrastruttura in 8 passi: template provider, release, licenza e deploy, con la guida copiabile per il tuo agente AI.",
          "Install Ventic on your own infrastructure in 8 steps: provider template, release, license and deploy, with a guide you can copy into your AI agent.",
        ),
      },
      hero: {
        plate: t("On-premise", "On-premise"),
        title: t(["Sul tuo Kubernetes,", "in otto passi."], ["On your Kubernetes,", "in eight steps."]),
        lead: t(
          "Dal template del provider al deploy della release: tutto ciò che serve per far girare Ventic nel tuo cluster.",
          "From the provider template to the release deploy: everything needed to run Ventic in your own cluster.",
        ),
      },
    },
    resellers: {
      nav: t("Rivenditori e provider", "Resellers and providers"),
      crumb: t("Rivenditori e provider", "Resellers and providers"),
      seo: {
        title: t("Ventic per rivenditori e provider — vantaggi, soluzioni e prezzi", "Ventic for resellers and providers — advantages, solutions and prices"),
        desc: t(
          "Vendi accesso all'AI con il tuo marchio: multi-tenancy, commissioni, billing integrato. Due strade, Ventic On Premise o Netter Intelligence, con i prezzi di Licman e llm.netter.io.",
          "Sell AI access under your own brand: multi-tenancy, commissions, built-in billing. Two routes, Ventic On Premise or Netter Intelligence, with the Licman and llm.netter.io prices.",
        ),
      },
      hero: {
        plate: t("Rivenditori e provider", "Resellers and providers"),
        title: t(["Rivendi AI", "con il tuo marchio."], ["Sell AI", "under your brand."]),
        lead: t(
          "Un'installazione, molti clienti, prezzi tuoi: cosa ottieni e da dove partire.",
          "One installation, many customers, your own prices: what you get and where to start.",
        ),
      },
    },
    compare: {
      nav: t("Costi a confronto", "Cost comparison"),
      crumb: t("Costi a confronto", "Cost comparison"),
      seo: {
        title: t("Ventic a confronto — modelli open, GPU e piani Claude, Codex, Copilot", "Ventic compared — open models, GPUs and Claude, Codex, Copilot plans"),
        desc: t(
          "DeepSeek, GLM, Qwen e Kimi su GPU B300, MI300X, H100 o su un server locale: velocità per utente, sviluppatori per nodo e costo, contro API e piani Claude, Codex e Copilot.",
          "DeepSeek, GLM, Qwen and Kimi on B300, MI300X, H100 GPUs or a local server: speed per user, developers per node and cost, against APIs and Claude, Codex and Copilot plans.",
        ),
      },
      hero: {
        plate: t("Costi a confronto", "Cost comparison"),
        title: t(["Quanto veloce,", "per quanti, a che prezzo."], ["How fast,", "for how many, at what price."]),
        lead: t(
          "Modelli open con Ventic, su GPU a noleggio o in casa, contro API e piani. Prezzi di novembre 2026.",
          "Open models with Ventic, on rented GPUs or in-house, against APIs and plans. November 2026 prices.",
        ),
      },
    },
    explore: {
      plate: t("Esplora Ventic", "Explore Ventic"),
      title: t(["Tutto quello che", "c'è da sapere."], ["Everything you", "need to know."]),
      lead: t(
        "Ogni argomento ha la sua pagina: scegli da dove partire.",
        "Every topic has its own page: pick where to start.",
      ),
      cards: [
        {
          key: "why" as const,
          title: t("Perché Ventic", "Why Ventic"),
          body: t(
            "I limiti di subscription e pagamento a token, e le due strade per iniziare: installare Ventic o usare un servizio già pronto.",
            "The limits of subscriptions and per-token billing, and the two ways to start: install Ventic or use a service that is already running.",
          ),
        },
        {
          key: "how" as const,
          title: t("Come funziona", "How it works"),
          body: t(
            "Agenti remoti, inferenza gestita, ciclo di una richiesta e gli schemi architetturali di ogni componente.",
            "Remote agents, managed inference, request lifecycle and architecture diagrams of every component.",
          ),
        },
        {
          key: "platform" as const,
          title: t("Piattaforma", "Platform"),
          body: t(
            "Componenti, namespace e funzioni incluse dal primo giorno.",
            "Components, namespaces and the features included from day one.",
          ),
        },
        {
          key: "onprem" as const,
          title: t("On-premise", "On-premise"),
          body: t(
            "Installa Ventic sul tuo Kubernetes in otto passi, con la guida pronta per il tuo agente AI.",
            "Install Ventic on your Kubernetes in eight steps, with a guide ready for your AI agent.",
          ),
        },
      ],
      open: t("Apri la pagina", "Open the page"),
    },
  };
}

export interface NavItem { label: string; desc?: string; href: string }
export interface NavGroup { label: string; href?: string; items?: NavItem[] }

/** Main menu: grouped, with a one-line description for every dropdown entry. */
export function navGroups(lang: Lang): NavGroup[] {
  const t = pick(lang);
  const p = pages(lang);
  const pre = lang === "en" ? "/en" : "";
  return [
    {
      label: t("Prodotto", "Product"),
      items: [
        { label: p.why.nav, desc: t("Perché i provider non bastano", "Why providers fall short"), href: pagePath(lang, "why") },
        { label: p.how.nav, desc: t("Dall'intento al modello in produzione", "From intent to a model in production"), href: pagePath(lang, "how") },
        { label: p.platform.nav, desc: t("Componenti e funzioni", "Components and features"), href: pagePath(lang, "platform") },
        { label: p.resellers.nav, desc: t("Vendi AI con il tuo marchio", "Sell AI under your brand"), href: pagePath(lang, "resellers") },
        { label: p.compare.nav, desc: t("Modelli open, GPU e piani a confronto", "Open models, GPUs and plans compared"), href: pagePath(lang, "compare") },
        { label: t("Console", "Console"), desc: t("Persone, quote, modelli, agenti remoti", "People, quotas, models, remote agents"), href: `${pre}/admin-panel/` },
      ],
    },
    { label: t("Prezzi", "Pricing"), href: `${pre}/pricing/` },
    {
      label: t("Installa", "Deploy"),
      items: [
        { label: p.onprem.nav, desc: t("Sul tuo Kubernetes in otto passi", "On your Kubernetes in eight steps"), href: pagePath(lang, "onprem") },
        { label: t("Installa la demo", "Deploy a demo"), desc: t("Guida passo passo alla demo self-hosted", "Step-by-step self-hosted demo guide"), href: `${pre}/demo/` },
      ],
    },
  ];
}
