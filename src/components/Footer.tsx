import { useState, useEffect } from "react";
import { ui, defaultLang } from "../i18n/ui";
import { LogoMark } from "./Logo";
type Lang = keyof typeof ui;

const CONTACT_EMAIL = "info@ventic.it";

type Props = { lang?: Lang };

export default function Footer({ lang = defaultLang as Lang }: Props) {
  const t = (key: string) => (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const needOptions = [
    t("footer.form.need.byoh"),
    t("footer.form.need.paas"),
    t("footer.form.need.advise"),
  ];
  const [need, setNeed] = useState(needOptions[0]);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!needOptions.includes(need)) {
      setNeed(needOptions[0]);
    }
  }, [lang]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Ventic inquiry — ${need}`;
    const body = lang === "it"
      ? `Ciao team Ventic,

Vorrei iniziare con l'AI privata.

Email lavorativa: ${email || "(non fornita)"}
Azienda: ${company || "(non fornita)"}
Esigenza: ${need}

Fatemi sapere i prossimi passi.

— inviato da ventic.it`
      : `Hi Ventic team,

I’d like to get started with private AI.

Work email: ${email || "(not provided)"}
Company: ${company || "(not provided)"}
Need: ${need}

Please let me know next steps.

— sent from ventic.it`;

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  };

  const pricingHref = lang === "it" ? "/#pricing" : "/en/#pricing";

  return (
    <footer id="contact" className="bg-[#f4f4f4] border-t border-[#e0e0e0]">
      <div className="mx-auto max-w-[1584px] px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10">
          <div>
            <div className="flex items-center gap-2.5 group/logo">
              <LogoMark size={28} variant="color" animated />
              <span className="text-[18px] font-semibold tracking-[-0.035em] leading-none">ventic</span>
            </div>
            <p className="mt-4 max-w-[52ch] text-[14px] leading-[1.6] text-[#525252]">
              {t("footer.desc")}
            </p>
            <div className="mt-6 flex flex-wrap gap-2 font-mono text-[11px]">
              <span className="border border-[#e0e0e0] bg-white px-2.5 py-1.5">{t("footer.badge.api")}</span>
              <span className="border border-[#e0e0e0] bg-white px-2.5 py-1.5">{t("footer.badge.region")}</span>
              <span className="border border-[#e0e0e0] bg-white px-2.5 py-1.5">{t("footer.badge.mesh")}</span>
            </div>
            <div className="mt-6 font-mono text-[13px]">
              <span className="text-[#6f6f6f]">{t("footer.email.label")} </span>
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-[#0f62fe] underline underline-offset-4 hover:text-[#0353e9]">
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          <div className="border border-[#e0e0e0] bg-white p-6">
            <div className="font-mono text-[12px] tracking-[0.08em] uppercase text-[#525252]">{t("footer.getstarted.eyebrow")}</div>
            <h3 className="mt-2 text-[18px] font-semibold tracking-[-0.015em]">{t("footer.getstarted.title")}</h3>
            <p className="mt-2 text-[13px] leading-[1.6] text-[#525252]">{t("footer.getstarted.desc")}</p>

            <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="block">
                  <span className="font-mono text-[11px] tracking-wide uppercase text-[#525252]">{t("footer.form.email")}</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("footer.form.emailPlaceholder")}
                    className="mt-1 w-full border border-[#8d8d8d] bg-[#f4f4f4] px-3 py-2.5 text-[14px] placeholder:text-[#8d8d8d] focus:bg-white focus:border-[#0f62fe] focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-[11px] tracking-wide uppercase text-[#525252]">{t("footer.form.company")}</span>
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder={t("footer.form.companyPlaceholder")}
                    className="mt-1 w-full border border-[#8d8d8d] bg-[#f4f4f4] px-3 py-2.5 text-[14px] placeholder:text-[#8d8d8d] focus:bg-white focus:border-[#0f62fe] focus:outline-none"
                  />
                </label>
              </div>
              <label className="block">
                <span className="font-mono text-[11px] tracking-wide uppercase text-[#525252]">{t("footer.form.need")}</span>
                <select
                  value={need}
                  onChange={(e) => setNeed(e.target.value)}
                  className="mt-1 w-full border border-[#8d8d8d] bg-[#f4f4f4] px-3 py-2.5 text-[14px] focus:bg-white focus:border-[#0f62fe] focus:outline-none"
                >
                  {needOptions.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </label>
              <button type="submit" className="w-full bg-[#0f62fe] text-white py-3 text-[14px] font-medium hover:bg-[#0353e9] transition-colors inline-flex justify-center items-center gap-2">
                {t("footer.form.cta")}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" /></svg>
              </button>
              {sent ? (
                <p className="text-[11px] leading-[1.5] text-[#0e6027] bg-[#defbe6] border border-[#a7f0ba] px-3 py-2 font-mono">
                  {t("footer.form.sent")} {CONTACT_EMAIL}{t("footer.form.sentSuffix")} <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4 font-medium">{t("footer.form.sentLink")}</a>.
                </p>
              ) : (
                <p className="text-[11px] leading-[1.5] text-[#6f6f6f] font-mono">
                  {t("footer.form.hintPrefix")} <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4 hover:text-[#161616]">{CONTACT_EMAIL}</a>{t("footer.form.hintSuffix")}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-[#e0e0e0] pt-6 flex flex-wrap gap-4 justify-between items-center font-mono text-[12px] text-[#6f6f6f]">
          <span>© {new Date().getFullYear()} {t("footer.copyright")}</span>
          <span className="flex gap-4">
            <a href="#" className="hover:text-[#161616] underline underline-offset-4">{t("footer.links.privacy")}</a>
            <a href="#" className="hover:text-[#161616] underline underline-offset-4">{t("footer.links.terms")}</a>
            <a href={pricingHref} className="hover:text-[#161616] underline underline-offset-4">{t("footer.links.pricing")}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
