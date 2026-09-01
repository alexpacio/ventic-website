// SEO helpers — JSON-LD factories per page type
const SITE = "https://ventic.it";
const ORG_ID = `${SITE}/#organization`;

export function serviceJsonLd(lang: "it" | "en") {
  const isIt = lang === "it";
  return {
    "@type": "Service",
    "@id": `${SITE}/${lang === "en" ? "en/" : ""}#service`,
    name: isIt ? "Ventic — LLM privati su GPU dedicate" : "Ventic — Private LLMs on dedicated GPUs",
    serviceType: isIt ? "LLM privato gestito" : "Managed private LLM",
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "Country", name: "Italy" },
      { "@type": "Place", name: "EU" },
      { "@type": "Place", name: "US" },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: SITE,
      availableLanguage: ["it", "en"],
    },
    description: isIt
      ? "Endpoint LLM privato compatibile OpenAI e Anthropic su GPU dedicate, dati in UE o US, modelli open-weight con vLLM ottimizzato."
      : "Private LLM endpoint OpenAI/Anthropic-compatible on dedicated GPUs, data in EU or US, open-weight models with tuned vLLM.",
    offers: [
      {
        "@type": "Offer",
        name: "Ventic Stack — BYOH",
        price: "69.90",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "69.90",
          priceCurrency: "EUR",
          unitText: "MONTH",
          referenceQuantity: { "@type": "QuantitativeValue", value: 5, unitText: "seat" },
        },
        availability: "https://schema.org/InStock",
        url: `${SITE}/${lang === "en" ? "en/pricing/" : "pricing/"}`,
      },
      {
        "@type": "Offer",
        name: "Ventic 16 — PaaS",
        price: "1",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "1",
          priceCurrency: "EUR",
          unitText: "HOUR",
        },
        availability: "https://schema.org/InStock",
        url: `${SITE}/${lang === "en" ? "en/pricing/" : "pricing/"}`,
      },
      {
        "@type": "Offer",
        name: "Ventic 64 — PaaS",
        price: "6",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "6",
          priceCurrency: "EUR",
          unitText: "HOUR",
        },
        availability: "https://schema.org/InStock",
        url: `${SITE}/${lang === "en" ? "en/pricing/" : "pricing/"}`,
      },
    ],
  };
}

export function pricingJsonLd(lang: "it" | "en") {
  const isIt = lang === "it";
  const base = `${SITE}/${lang === "en" ? "en/" : ""}pricing/`;
  const faq = {
    "@type": "FAQPage",
    "@id": `${base}#faq`,
    mainEntity: (isIt
      ? [
          { q: "Quanto costa Ventic in BYOH?", a: "€69,90/mese + IVA per 5 postazioni, €39,99 + IVA ogni 10 aggiuntive. Sconti per volumi." },
          { q: "Cosa significa PaaS da 1 €/h?", a: "Hardware e licenza inclusi: paghi solo le ore in cui il server è acceso, con spegnimento automatico quando inutilizzato." },
          { q: "I costi dipendono dai token?", a: "No. Mai a token: il conto cambia solo con ore o postazioni, non con quanto scrive il modello." },
          { q: "Dove risiedono i dati?", a: "Sulla tua macchina (BYOH) o nella regione che scegli tu, UE o US (PaaS). I pesi possono venire dalla Cina ma i dati non ci vanno mai." },
          { q: "Come si dimensiona il servizio?", a: "Sulle persone che lavorano insieme nello stesso momento, non sui token. Aggiungi un nodo quando servono più posti." },
        ]
      : [
          { q: "How much does Ventic cost on BYOH?", a: "€69.90/month + VAT for 5 seats, €39.99 + VAT per extra 10. Volume discounts." },
          { q: "What does PaaS from €1/h mean?", a: "Hardware and license included: you pay only hours the server is on, with auto-shutdown when idle." },
          { q: "Does cost depend on tokens?", a: "No. Never per-token: the bill changes with hours or seats, not how much the model writes." },
          { q: "Where does data reside?", a: "On your machine (BYOH) or EU/US region you choose (PaaS). Weights may come from China but your data never goes there." },
          { q: "How is the service sized?", a: "By people working at the same time, not tokens. Add a node when you need more seats." },
        ]
    ).map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const products = [
    {
      "@type": "Product",
      "@id": `${base}#ventic-16`,
      name: "Ventic 16",
      description: isIt
        ? "Qwen 3.8 27B su GPU dedicata — 16 utenti attivi, fino a 100 in organico. 160 €/mese su orario d'ufficio."
        : "Qwen 3.8 27B on dedicated GPU — 16 active users, up to 100 on roster. €160/month business hours.",
      brand: { "@id": ORG_ID },
      category: "LLM inference",
      offers: {
        "@type": "Offer",
        price: "1",
        priceCurrency: "EUR",
        priceSpecification: { "@type": "UnitPriceSpecification", price: "1", priceCurrency: "EUR", unitText: "HOUR" },
        availability: "https://schema.org/InStock",
        url: base,
        seller: { "@id": ORG_ID },
      },
    },
    {
      "@type": "Product",
      "@id": `${base}#ventic-64`,
      name: "Ventic 64",
      description: isIt
        ? "Deepseek v4 Flash 0731 — 64 utenti attivi, fino a 500 in organico. 960 €/mese su orario d'ufficio."
        : "Deepseek v4 Flash 0731 — 64 active users, up to 500 on roster. €960/month business hours.",
      brand: { "@id": ORG_ID },
      category: "LLM inference",
      offers: {
        "@type": "Offer",
        price: "6",
        priceCurrency: "EUR",
        priceSpecification: { "@type": "UnitPriceSpecification", price: "6", priceCurrency: "EUR", unitText: "HOUR" },
        availability: "https://schema.org/InStock",
        url: base,
        seller: { "@id": ORG_ID },
      },
    },
    {
      "@type": "Product",
      "@id": `${base}#byoh`,
      name: isIt ? "Ventic Stack BYOH" : "Ventic Stack BYOH",
      description: isIt
        ? "Licenza stack Ventic per Bring Your Own Hardware: €69,90/mese per 5 postazioni + €39,99 ogni 10."
        : "Ventic Stack license for Bring Your Own Hardware: €69.90/month for 5 seats + €39.99 per 10.",
      brand: { "@id": ORG_ID },
      category: "Software license",
      offers: {
        "@type": "Offer",
        price: "69.90",
        priceCurrency: "EUR",
        priceSpecification: { "@type": "UnitPriceSpecification", price: "69.90", priceCurrency: "EUR", unitText: "MONTH" },
        availability: "https://schema.org/InStock",
        url: base,
        seller: { "@id": ORG_ID },
      },
    },
  ];

  return [...products, faq];
}

export function adminPanelJsonLd(lang: "it" | "en") {
  const isIt = lang === "it";
  const base = `${SITE}/${lang === "en" ? "en/" : ""}admin-panel/`;
  return [
    {
      "@type": "SoftwareApplication",
      "@id": `${base}#software`,
      name: isIt ? "Ventic Admin Panel" : "Ventic Admin Panel",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Docker, Linux",
      description: isIt
        ? "Pannello di controllo Ventic per utenti, ruoli RBAC, modelli, quote, telemetria e white label multi-tenant."
        : "Ventic control panel for users, RBAC roles, models, quotas, telemetry and multi-tenant white label.",
      publisher: { "@id": ORG_ID },
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR", availability: "https://schema.org/InStock" },
      featureList: isIt
        ? "Utenti e API key, RBAC 4 livelli, gestione modelli, telemetria, wiring RAG/harness, white label"
        : "Users & API keys, 4-tier RBAC, model management, telemetry, RAG/harness wiring, white label",
      screenshot: [
        `${SITE}/admin/users.webp`,
        `${SITE}/admin/rbac.webp`,
        `${SITE}/admin/telemetry.webp`,
        `${SITE}/admin/wirings.webp`,
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${base}#faq`,
      mainEntity: (isIt
        ? [
            { q: "Cosa gestisco dal pannello?", a: "Utenti e gruppi, tenant, ruoli e permessi per endpoint, modelli e repliche, quote, telemetria e wiring di RAG e harness agentici." },
            { q: "Come funziona RBAC?", a: "Quattro livelli — utente, developer, admin, superadmin — con matrice endpoint-per-endpoint e regole che legano soggetti ai modelli." },
            { q: "Supporta white label?", a: "Sì, multi-tenant nativo: ogni cliente è un tenant isolato con dati, modelli e consumi separati." },
          ]
        : [
            { q: "What do I manage from the panel?", a: "Users and groups, tenants, endpoint RBAC, models and replicas, quotas, telemetry and RAG/harness wiring." },
            { q: "How does RBAC work?", a: "Four tiers — user, developer, admin, superadmin — with endpoint matrix and binding rules to models." },
            { q: "Is white label supported?", a: "Yes, native multi-tenant: each customer is an isolated tenant with separate data, models and usage." },
          ]
      ).map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ];
}
