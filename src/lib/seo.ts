// SEO helpers — JSON-LD factories per page type
const SITE = "https://ventic.it";
const ORG_ID = `${SITE}/#organization`;

export function serviceJsonLd(lang: "it" | "en") {
  const isIt = lang === "it";
  return {
    "@type": "Service",
    "@id": `${SITE}/${lang === "en" ? "en/" : ""}#service`,
    name: isIt ? "Ventic — piattaforma AI multi-tenant on premise" : "Ventic — on-premise multi-tenant AI platform",
    serviceType: isIt ? "Piattaforma AI con licenza software" : "Licensed AI platform software",
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
      ? "Piattaforma AI multi-tenant per Kubernetes: gateway compatibile OpenAI e Anthropic, credito prepagato, quote, filtro PII reversibile e runtime locali collegati con un agente remoto."
      : "Multi-tenant AI platform for Kubernetes: OpenAI- and Anthropic-compatible gateway, prepaid credit, quotas, reversible PII filtering and local runtimes connected through a remote agent.",
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
          { q: "Quanto costa Ventic?", a: "Licenza mensile in EUR, IVA esclusa: On Premise €29 per host oppure €299 per azienda. Impegno di un mese. Il servizio gestito Netter Intelligence è venduto a parte su llm.netter.io." },
          { q: "C’è una demo?", a: "Sì, una demo gratuita di 30 giorni richiedibile da Licman." },
          { q: "I costi dipendono dai token?", a: "La licenza no: cambia solo con host o azienda. Il consumo dei modelli è credito prepagato, separato dalla licenza." },
          { q: "Dove risiedono i dati?", a: "Portale, gateway e database girano sul tuo cluster. Ogni modello è cloud o locale: lo decidi tu per policy, e un runtime locale non invia i dati all’esterno." },
          { q: "Come si dimensiona il servizio?", a: "Sulle persone e sulle applicazioni che lavorano insieme e sui modelli che serve il cluster, non sui token. Ogni VM di un deployment gestito ospita una replica completa." },
        ]
      : [
          { q: "How much does Ventic cost?", a: "Monthly licence in EUR, VAT excluded: On Premise €29 per host or €299 per company. One-month commitment. The managed Netter Intelligence service is sold separately on llm.netter.io." },
          { q: "Is there a demo?", a: "Yes, a free 30-day demo you can request from Licman." },
          { q: "Does cost depend on tokens?", a: "The licence does not: it changes only with hosts or company. Model usage is prepaid credit, separate from the licence." },
          { q: "Where does data reside?", a: "Portal, gateway and databases run on your cluster. Each model is cloud or local, decided by your policy, and a local runtime does not send data outside." },
          { q: "How is the service sized?", a: "By the people and applications working together and the models the cluster serves, not tokens. Each VM of a managed deployment hosts one complete replica." },
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
      name: isIt ? "Console Ventic" : "Ventic console",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Kubernetes, Linux",
      description: isIt
        ? "Console Ventic per persone, gruppi, credito, modelli, agenti remoti, audit e provider multi-tenant."
        : "Ventic console for people, groups, credit, models, remote agents, audit and multi-tenant providers.",
      publisher: { "@id": ORG_ID },
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR", availability: "https://schema.org/InStock" },
      featureList: isIt
        ? "Team e gruppi, credito e allocazioni, catalogo modelli e Switchyard, agenti remoti, runtime certificati, chiavi API"
        : "Teams and groups, credit and allocations, model catalogue and Switchyard, remote agents, certified runtimes, API keys",
      screenshot: [
        `${SITE}/admin/team.webp`,
        `${SITE}/admin/credit.webp`,
        `${SITE}/admin/models.webp`,
        `${SITE}/admin/agents.webp`,
        `${SITE}/admin/runtimes.webp`,
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${base}#faq`,
      mainEntity: (isIt
        ? [
            { q: "Cosa gestisco dalla console?", a: "Persone e gruppi, quote e credito, chiavi API, catalogo e policy dei modelli, agenti remoti e runtime, monitoraggio e registro attività." },
            { q: "Come funzionano i ruoli?", a: "Quattro ruoli cliente — membro, responsabile gruppo, amministratore aziendale, amministratore reseller — separati dai ruoli di piattaforma. Ogni operazione è autorizzata dal server." },
            { q: "Posso rivendere Ventic ai miei clienti?", a: "Sì: ogni cliente è un tenant applicativo con dati, quote e catalogo separati, con deleghe reseller e commissioni. Open WebUI mantiene il proprio brand." },
          ]
        : [
            { q: "What do I manage from the console?", a: "People and groups, quotas and credit, API keys, model catalogue and policies, remote agents and runtimes, monitoring and the activity log." },
            { q: "How do roles work?", a: "Four customer roles — member, group manager, company administrator, reseller administrator — separate from platform roles. Every operation is authorised by the server." },
            { q: "Can I resell Ventic to my customers?", a: "Yes: each customer is an application tenant with separate data, quotas and catalogue, with reseller delegation and commissions. Open WebUI keeps its own branding." },
          ]
      ).map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ];
}
