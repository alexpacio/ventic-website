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
      "Licenze mensili per Ventic e per gli altri prodotti Netter, con la stessa fonte di Licman. Prezzi in EUR, IVA esclusa, impegno di un mese.",
      "Monthly licences for Ventic and the other Netter products, from the same source as Licman. Prices in EUR, VAT excluded, one-month commitment.",
    ),
    cols: [t("Prodotto", "Product"), t("Erogazione", "Delivery"), t("Per host", "Per host"), t("Per azienda", "Per company")],
    month,
    rows: [
      {
        name: "Ventic",
        sub: t("Routing di inferenza LLM multitenant con billing integrato", "Multitenant LLM inference routing with built-in billing"),
        variants: [
          { delivery: "On Premise", host: eur(29), company: eur(299) },
          { delivery: "Cloud Hosted · Netter Intelligence", host: null, company: eur(99) },
        ],
      },
      {
        name: "VDIConnect",
        sub: t("Controllo remoto di desktop VDI e terminal server", "Remote control of VDI desktops and terminal servers"),
        variants: [{ delivery: "On Premise", host: eur(4.99), company: eur(149) }],
      },
    ],
    obstack: {
      name: "Obstack",
      sub: t("Stack di observability multitenant, solo On Premise. Il costo è la somma dei componenti scelti.", "Multitenant observability stack, On Premise only. The cost is the sum of the components you pick."),
      items: [
        { k: "Bee", v: eur(7.99), u: t("/ host / mese", "/ host / month") },
        { k: "Eagle", v: eur(3.49), u: t("/ utente attivo / mese", "/ active user / month") },
        { k: "EagleSRE", v: eur(8.9), u: t("/ utente attivo / mese", "/ active user / month"), note: t("modulo aggiuntivo, richiede Eagle", "add-on, requires Eagle") },
      ],
    },
    none: "—",
    foot: t(
      "Prezzi iniziali in EUR, IVA esclusa, aggiornati al 28 ottobre 2026. Le modifiche valgono per le nuove richieste; offerte e abbonamenti già concordati mantengono il loro importo. Demo gratuita di 30 giorni.",
      "Initial prices in EUR, VAT excluded, as of 28 October 2026. Changes apply to new requests; quotes and subscriptions already agreed keep their amount. Free 30-day demo.",
    ),
    cta: t("Richiedi la demo su Licman", "Request a demo on Licman"),
    href: LICMAN_URL,
  };
}
