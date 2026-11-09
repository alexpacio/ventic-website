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
      ? "Endpoint LLM privato compatibile OpenAI e Anthropic su GPU dedicate, dati in UE o US, modelli open-weight con motore di inferenza ottimizzato (vLLM, SGLang)."
      : "Private LLM endpoint OpenAI/Anthropic-compatible on dedicated GPUs, data in EU or US, open-weight models with tuned inference engine (vLLM, SGLang).",
    offers: [
      {
        "@type": "Offer",
        name: "Ventic — On Premise (per host)",
        price: "29.00",
        priceCurrency: "EUR",
        priceSpecification: { "@type": "UnitPriceSpecification", price: "29.00", priceCurrency: "EUR", unitText: "MONTH", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitText: "host" } },
        availability: "https://schema.org/InStock",
        url: `${SITE}/${lang === "en" ? "en/pricing/" : "pricing/"}`,
      },
      {
        "@type": "Offer",
        name: "Ventic — On Premise (per company)",
        price: "299.00",
        priceCurrency: "EUR",
        priceSpecification: { "@type": "UnitPriceSpecification", price: "299.00", priceCurrency: "EUR", unitText: "MONTH" },
        availability: "https://schema.org/InStock",
        url: `${SITE}/${lang === "en" ? "en/pricing/" : "pricing/"}`,
      },
      {
        "@type": "Offer",
        name: "Ventic — Cloud Hosted (Netter Intelligence)",
        price: "99.00",
        priceCurrency: "EUR",
        priceSpecification: { "@type": "UnitPriceSpecification", price: "99.00", priceCurrency: "EUR", unitText: "MONTH" },
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
          { q: "Quanto costa Ventic?", a: "Licenza mensile in EUR, IVA esclusa: On Premise €29 per host oppure €299 per azienda; Cloud Hosted (Netter Intelligence) €99 per azienda. Impegno di un mese." },
          { q: "C’è una demo?", a: "Sì, una demo gratuita di 30 giorni richiedibile da Licman." },
          { q: "I costi dipendono dai token?", a: "No. Mai a token: il conto cambia solo con host o azienda, non con quanto scrive il modello." },
          { q: "Dove risiedono i dati?", a: "Sulla tua infrastruttura (On Premise) o nella regione che scegli tu, UE o US. I pesi sono open-weight e i dati non lasciano mai la tua infrastruttura." },
          { q: "Come si dimensiona il servizio?", a: "Sulle persone che lavorano insieme nello stesso momento, non sui token. Aggiungi un nodo quando servono più posti." },
        ]
      : [
          { q: "How much does Ventic cost?", a: "Monthly licence in EUR, VAT excluded: On Premise €29 per host or €299 per company; Cloud Hosted (Netter Intelligence) €99 per company. One-month commitment." },
          { q: "Is there a demo?", a: "Yes, a free 30-day demo you can request from Licman." },
          { q: "Does cost depend on tokens?", a: "No. Never per-token: the bill changes with hosts or company, not how much the model writes." },
          { q: "Where does data reside?", a: "On your infrastructure (On Premise) or in an EU/US region you choose. Weights are open-weight and your data never leaves your infrastructure." },
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
      "@id": `${base}#ventic-on-premise-host`,
      name: "Ventic On Premise (per host)",
      description: isIt ? "Licenza Ventic On Premise: €29/mese per host." : "Ventic On Premise licence: €29/month per host.",
      brand: { "@id": ORG_ID },
      category: "Software license",
      offers: {
        "@type": "Offer",
        price: "29.00",
        priceCurrency: "EUR",
        priceSpecification: { "@type": "UnitPriceSpecification", price: "29.00", priceCurrency: "EUR", unitText: "MONTH" },
        availability: "https://schema.org/InStock",
        url: base,
        seller: { "@id": ORG_ID },
      },
    },
    {
      "@type": "Product",
      "@id": `${base}#ventic-on-premise-company`,
      name: "Ventic On Premise (per azienda)",
      description: isIt ? "Licenza Ventic On Premise: €299/mese per azienda." : "Ventic On Premise licence: €299/month per company.",
      brand: { "@id": ORG_ID },
      category: "Software license",
      offers: {
        "@type": "Offer",
        price: "299.00",
        priceCurrency: "EUR",
        priceSpecification: { "@type": "UnitPriceSpecification", price: "299.00", priceCurrency: "EUR", unitText: "MONTH" },
        availability: "https://schema.org/InStock",
        url: base,
        seller: { "@id": ORG_ID },
      },
    },
    {
      "@type": "Product",
      "@id": `${base}#netter-intelligence`,
      name: "Ventic Cloud Hosted — Netter Intelligence",
      description: isIt ? "Istanza Ventic ospitata da Netter su llm.netter.io: €99/mese per azienda." : "Ventic instance hosted by Netter on llm.netter.io: €99/month per company.",
      brand: { "@id": ORG_ID },
      category: "Software license",
      offers: {
        "@type": "Offer",
        price: "99.00",
        priceCurrency: "EUR",
        priceSpecification: { "@type": "UnitPriceSpecification", price: "99.00", priceCurrency: "EUR", unitText: "MONTH" },
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
