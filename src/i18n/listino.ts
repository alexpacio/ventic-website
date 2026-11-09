import type { Lang } from "./content";
import { pick, LICMAN_URL } from "./onprem";

/**
 * Price list, mirrored from licman-saas `catalog/products.json` (revision 2026-10-28).
 * EUR, VAT excluded, monthly billing, 1-month commitment.
 */
export function listino(lang: Lang) {
  const t = pick(lang);
  const eur = (n: number) =>
    "€" + n.toLocaleString(lang === "it" ? "it-IT" : "en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const month = t("/ mese + IVA", "/ month + VAT");

  return {
    id: "listino",
    plate: t("Listino licenze", "Licence price list"),
    title: [t("Il listino,", "The price list,"), t("senza sorprese.", "no surprises.")] as [string, string],
    lead: t(
      "Ventic si acquista come licenza software mensile, per host o per azienda, con gli stessi prezzi di Licman. Prezzi in EUR, IVA esclusa, impegno di un mese.",
      "Ventic is bought as a monthly software licence, per host or per company, at the same prices as Licman. Prices in EUR, VAT excluded, one-month commitment.",
    ),
    cols: [t("Prodotto", "Product"), t("Installazione", "Installation"), t("Per host", "Per host"), t("Per azienda", "Per company")],
    month,
    rows: [
      {
        name: "Ventic",
        sub: t("Routing di inferenza LLM multitenant con billing integrato", "Multitenant LLM inference routing with built-in billing"),
        variants: [{ delivery: "On Premise", host: eur(29), company: eur(299) }],
      },
    ],
    none: "—",
    foot: t(
      "Prezzi iniziali in EUR, IVA esclusa, aggiornati al 28 ottobre 2026. Le modifiche valgono per le nuove richieste; offerte e abbonamenti già concordati mantengono il loro importo. Demo gratuita di 30 giorni. Cerchi un servizio gestito? È venduto a parte su llm.netter.io.",
      "Initial prices in EUR, VAT excluded, as of 28 October 2026. Changes apply to new requests; quotes and subscriptions already agreed keep their amount. Free 30-day demo. Looking for a managed service? It is sold separately on llm.netter.io.",
    ),
    cta: t("Richiedi demo o licenza su Licman", "Request a demo or licence on Licman"),
    href: LICMAN_URL,
  };
}
