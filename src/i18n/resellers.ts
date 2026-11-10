import type { Lang } from "./content";
import { pick, LICMAN_URL } from "./onprem";

export const NI_URL = "https://llm.netter.io";

/**
 * Resellers and providers page.
 * Licence prices mirror Licman `catalog/products.json` (revision 2026-10-28), see listino.ts.
 * Netter Intelligence prices are read from https://llm.netter.io/api/v1/public/pricing (10 Nov 2026).
 * shortcut: llm.netter.io plan prices are typed in, not fetched; re-check them when that service changes.
 * Per-model token rates are deliberately not copied: they move with the exchange rate and time bands.
 */
export function resellers(lang: Lang) {
  const t = pick(lang);
  const month = t("/ mese + IVA", "/ month + VAT");

  return {
    advantages: {
      id: "vantaggi",
      plate: t("Vantaggi", "Advantages"),
      title: [t("Meno infrastruttura,", "Less infrastructure,"), t("più margine.", "more margin.")] as [string, string],
      lead: t(
        "Ventic è nato per chi vende accesso all'AI ad altri: ogni cliente è isolato, ogni costo è contabilizzato e il prezzo lo decidi tu.",
        "Ventic is built for those who sell AI access to others: every customer is isolated, every cost is accounted for and you set the price.",
      ),
      items: [
        { tag: "TENANT", title: t("Un'installazione, molti clienti", "One installation, many customers"), body: t("Ogni cliente è un tenant applicativo con dati, persone, quote e catalogo separati. Nessun cluster per cliente.", "Each customer is an application tenant with separate data, people, quotas and catalogue. No cluster per customer.") },
        { tag: "BRAND", title: t("Il tuo marchio", "Your brand"), body: t("Profilo provider con branding, domini, contatti e documenti legali forniti da te. Open WebUI mantiene il proprio marchio e la propria licenza.", "A provider profile with the branding, domains, contacts and legal documents you supply. Open WebUI keeps its own branding and licence.") },
        { tag: "MARGIN", title: t("I tuoi prezzi, il tuo margine", "Your prices, your margin"), body: t("Decidi modelli e prezzi. Ogni chiamata è riservata prima e liquidata al costo esatto dopo, così il margine non dipende da stime.", "You choose models and prices. Every call is held first and settled at the exact cost after, so margin never depends on estimates.") },
        { tag: "RESELL", title: t("Reseller e commissioni", "Resellers and commissions"), body: t("Delega l'amministrazione ai tuoi rivenditori e paga le commissioni sul consumo liquidato. Le funzioni reseller si sbloccano dopo la verifica aziendale.", "Delegate administration to your resellers and pay commissions on settled usage. Reseller features unlock after company verification.") },
        { tag: "MONEY", title: t("Incassi già pronti", "Billing already built"), body: t("Ricariche con carta o bonifico, wallet di gruppo, fatture e consumi per tenant. Non scrivi un sistema di billing.", "Card or bank-transfer top-ups, group wallets, invoices and per-tenant usage. You do not write a billing system.") },
        { tag: "MODELS", title: t("Modelli dove vuoi", "Models wherever you want"), body: t("Provider cloud, chiavi dei clienti (BYOK) o GPU tue collegate in uscita con l'agente remoto, senza porte pubbliche. Il filtro PII reversibile aiuta sulla compliance.", "Cloud providers, customer keys (BYOK) or your own GPUs connected outbound with the remote agent, no public ports. The reversible PII filter helps with compliance.") },
      ],
    },

    solutions: {
      id: "soluzioni",
      plate: t("Soluzioni", "Solutions"),
      title: [t("Due modi per", "Two ways to"), t("fare i provider.", "be a provider.")] as [string, string],
      lead: t(
        "Installi tu la piattaforma, oppure parti dal servizio che Netter gestisce già. La differenza è chi tiene in piedi l'infrastruttura.",
        "Either you install the platform, or you start from the service Netter already runs. The difference is who keeps the infrastructure up.",
      ),
      cards: [
        {
          key: "own",
          tag: t("Provider · Ventic On Premise", "Provider · Ventic On Premise"),
          title: t("La tua installazione Ventic", "Your own Ventic installation"),
          body: t("Ventic gira sul tuo Kubernetes: sei tu il provider, con il tuo marchio, i tuoi clienti e il tuo listino. Hardware, hosting e consumo AI sono a tuo carico.", "Ventic runs on your Kubernetes: you are the provider, with your brand, your customers and your price list. Hardware, hosting and AI consumption are yours."),
          ticks: [
            t("Demo gratuita di 30 giorni, poi licenza mensile", "Free 30-day demo, then a monthly licence"),
            t("Nessun costo legato ai token: la licenza è fissa", "No per-token cost: the licence is flat"),
            t("Controllo totale su modelli, dati e regione", "Full control over models, data and region"),
          ],
          cta: t("Guida all'installazione", "Installation guide"),
          href: lang === "it" ? "/on-premise/" : "/en/on-premise/",
          ext: false,
        },
        {
          key: "ni",
          tag: t("Servizio · Netter Intelligence", "Service · Netter Intelligence"),
          title: t("Parti da llm.netter.io", "Start from llm.netter.io"),
          body: t("Ventic già in esecuzione, ospitato e gestito da Netter: niente cluster da procurare. Per installazioni e agent dedicati servono accordi con il fornitore.", "Ventic already running, hosted and operated by Netter: no cluster to source. Dedicated installations and agents require an agreement with the supplier."),
          ticks: [
            t("Registrazione e primo workspace in pochi minuti", "Sign up and a first workspace in minutes"),
            t("Stesso gateway compatibile OpenAI e Anthropic", "Same OpenAI- and Anthropic-compatible gateway"),
            t("Condizioni per rivenditori da concordare con noi", "Reseller terms agreed with us"),
          ],
          cta: t("Apri llm.netter.io", "Open llm.netter.io"),
          href: NI_URL,
          ext: true,
        },
      ],
    },

    prices: {
      id: "prezzi-rivenditori",
      plate: t("Prezzi", "Prices"),
      title: [t("I costi di partenza,", "Your starting costs,"), t("nero su bianco.", "in black and white.")] as [string, string],
      lead: t(
        "I prezzi pubblicati da Licman e da llm.netter.io. In EUR, IVA esclusa, impegno di un mese.",
        "The prices published by Licman and llm.netter.io. In EUR, VAT excluded, one-month commitment.",
      ),
      licman: {
        tag: t("Licman · Ventic On Premise", "Licman · Ventic On Premise"),
        rows: [
          { name: t("Per host", "Per host"), price: "€29", unit: t("/ host / mese + IVA", "/ host / month + VAT"), note: t("Una licenza per ogni host su cui gira Ventic.", "One licence per host running Ventic.") },
          { name: t("Per azienda", "Per company"), price: "€299", unit: month, note: t("Canone unico per l'azienda, host illimitati.", "One fee for the company, unlimited hosts.") },
          { name: t("Demo", "Demo"), price: "€0", unit: t("30 giorni", "30 days"), note: t("Si richiede su Licman e si passa alla licenza senza reinstallare.", "Request it on Licman, then move to the licence without reinstalling.") },
        ],
        cta: t("Apri Licman", "Open Licman"),
        href: LICMAN_URL,
      },
      ni: {
        tag: t("llm.netter.io · Netter Intelligence", "llm.netter.io · Netter Intelligence"),
        rows: [
          { name: "Starter", price: "€29", unit: month, note: t("Il canone è pari credito sul plafond del workspace.", "The fee equals credit on the workspace spending cap.") },
          { name: "Team", price: "€99", unit: month, note: t("Stesso meccanismo, plafond più alto.", "Same mechanism, higher cap.") },
          { name: "Business", price: "€299", unit: month, note: t("Per carichi più grandi.", "For larger workloads.") },
        ],
        extras: [
          { name: t("Ricarica minima", "Minimum top-up"), value: "€20" },
          { name: t("Commissione BYOK", "BYOK fee"), value: t("€0,01 per milione di token (il provider esterno fattura a parte)", "€0.01 per million tokens (the external provider bills separately)") },
          { name: t("Blocco di consulenza", "Consultation block"), value: t("€250 ogni 10.000 righe", "€250 per 10,000 lines") },
        ],
        cta: t("Vedi il listino aggiornato", "See the live price list"),
        href: `${NI_URL}/pricing`,
      },
      foot: t(
        "Licman: listino al 28 ottobre 2026. llm.netter.io: piani letti il 10 novembre 2026; i prezzi per modello si aggiornano ogni minuto con il cambio e le fasce orarie, quindi li trovi solo sul servizio. Non esiste un listino pubblico per rivenditori: sconti e commissioni sul servizio si concordano.",
        "Licman: price list as of 28 October 2026. llm.netter.io: plans read on 10 November 2026; per-model prices update every minute with the exchange rate and time bands, so they are only on the service. There is no public reseller price list: discounts and commissions on the service are agreed.",
      ),
    },
  };
}
