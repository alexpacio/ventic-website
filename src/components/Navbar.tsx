import { useState, useEffect } from "react";
import { ui, defaultLang } from "../i18n/ui";
import { LogoMark } from "./Logo";

type Lang = keyof typeof ui;

function getLocalizedPath(path: string, lang: Lang): string {
  if (lang === defaultLang) return path;
  const hashIndex = path.indexOf("#");
  let base = path;
  let hash = "";
  if (hashIndex !== -1) {
    base = path.slice(0, hashIndex);
    hash = path.slice(hashIndex);
  }
  if (base === "/" || base === "") {
    return `/${lang}/${hash ? hash : ""}`.replace(/\/\/+/g, "/").replace(/\/$/, `/${lang}/`).replace(`/${lang}//`, `/${lang}/`);
    // simpler: handle root with hash
  }
  if (base === "/" && hash) {
    return `/${lang}/${hash}`;
  }
  if (base.startsWith(`/${lang}`)) return path;
  if (hash) {
    if (base === "/") return `/${lang}/${hash}`;
    return `/${lang}${base}${hash}`;
  }
  return `/${lang}${base}`;
}

// Normalize root hash case manually
function localizeHref(href: string, lang: Lang): string {
  if (lang === defaultLang) return href;
  // href like "/#models" or "/paas" or "/#pricing" or "/"
  if (href.startsWith("/#")) {
    return `/${lang}/${href.slice(1)}`; // "/#models" -> "/en/#models"
  }
  if (href === "/") return `/${lang}/`;
  return `/${lang}${href}`;
}

function getAlternatePath(pathname: string, targetLang: Lang): string {
  const isEn = pathname.startsWith("/en");
  const stripped = isEn ? pathname.replace(/^\/en/, "") || "/" : pathname;
  if (targetLang === defaultLang) return stripped || "/";
  // handle root
  if (stripped === "/") return `/${targetLang}/`;
  // handle hash already in pathname? pathname may include hash but window.location.pathname doesn't include hash; we treat separately
  return `/${targetLang}${stripped}`;
}

type Props = {
  lang?: Lang;
  currentPath?: string;
};

export default function Navbar({ lang = defaultLang as Lang, currentPath }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [path, setPath] = useState(currentPath ?? "/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!currentPath && typeof window !== "undefined") {
      setPath(window.location.pathname + window.location.hash);
    }
  }, [currentPath]);

  // Keep path in sync with prop if provided
  useEffect(() => {
    if (currentPath) setPath(currentPath);
  }, [currentPath]);

  const t = (key: string) => (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;

  // pathname without hash for alternate calculation
  const pathnameOnly = path.split("#")[0] || "/";
  const hashPart = path.includes("#") ? `#${path.split("#")[1]}` : "";

  // For alternate, preserve hash if present on current location? For nav anchors, better without hash for home.
  // Compute alternates for language switcher - use pathnameOnly (without hash) as base, but for mobile we may want to keep hash?
  // We'll use pathnameOnly for base, appending hash if exists via window
  const altIt = (() => {
    const base = getAlternatePath(pathnameOnly, "it");
    return base + hashPart;
  })();
  const altEn = (() => {
    const base = getAlternatePath(pathnameOnly, "en");
    return base + hashPart;
  })();

  const homeHref = lang === "it" ? "/" : "/en/";

  const links = [
    { label: t("nav.links.models"), href: localizeHref("/#models", lang) },
    { label: t("nav.links.why"), href: localizeHref("/#why", lang) },
    { label: t("nav.links.how"), href: localizeHref("/#how", lang) },
    { label: t("nav.links.features"), href: localizeHref("/#features", lang) },
    { label: t("nav.links.pricing"), href: localizeHref("/#pricing", lang) },
    { label: t("nav.links.paas"), href: localizeHref("/paas", lang) },
  ];

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors ${scrolled ? "bg-white/95 backdrop-blur border-[#e0e0e0]" : "bg-white border-[#e0e0e0]"}`}>
      {/* IBM-style top eyebrow */}
      <div className="hidden lg:block border-b border-[#e0e0e0] bg-[#f4f4f4]">
        <div className="mx-auto max-w-[1584px] px-6 lg:px-8 flex h-8 items-center justify-between text-[12px] leading-none tracking-wide">
          <span className="font-mono text-[#525252]">{t("nav.eyebrow.left")}</span>
          <span className="font-mono text-[#525252] hidden xl:inline">{t("nav.eyebrow.right")}</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1584px] px-6 lg:px-8">
        <div className="flex h-[48px] lg:h-[48px] items-center justify-between">
          {/* Logo — animated color variant */}
          <a href={homeHref} className="flex items-center gap-2.5 group/logo">
            <LogoMark size={28} variant="color" animated />
            <span className="flex items-baseline gap-2">
              <span className="text-[20px] font-semibold tracking-[-0.035em] leading-none">ventic</span>
              <span className="hidden sm:inline-flex items-center font-mono text-[10px] font-medium tracking-[0.14em] leading-none text-[#525252] bg-white border border-[#e0e0e0] px-1.5 py-1 rounded-[3px] shadow-[0_1px_0_rgba(0,0,0,0.04)] -mb-0.5">
                {t("nav.logo.badge")}
              </span>
            </span>
          </a>

          {/* Desktop nav - IBM horizontal nav */}
          <nav className="hidden lg:flex items-center gap-0 h-full">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="h-full px-4 inline-flex items-center text-[14px] font-normal text-[#161616] hover:bg-[#f4f4f4] border-b-2 border-transparent hover:border-[#0f62fe] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href={localizeHref("/paas", lang)} className="hidden xl:inline-flex text-[14px] font-normal px-3 py-1.5 hover:bg-[#f4f4f4] border border-transparent hover:border-[#e0e0e0] transition-colors">
              {t("nav.cta.paas")}
            </a>
            <a href={localizeHref("/#contact", lang)} className="text-[14px] font-normal px-4 py-1.5 hover:bg-[#f4f4f4] border border-transparent hover:border-[#e0e0e0] transition-colors">
              {t("nav.cta.contact")}
            </a>
            <a href={localizeHref("/#pricing", lang)} className="inline-flex items-center gap-2 bg-[#0f62fe] text-white text-[14px] font-medium px-4 py-[7px] hover:bg-[#0353e9] transition-colors">
              {t("nav.cta.deploy")}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" /></svg>
            </a>
            {/* Language switcher desktop */}
            <div className="ml-1 flex items-center border border-[#e0e0e0] bg-[#f4f4f4] p-0.5 font-mono text-[12px]">
              <a
                href={altIt}
                aria-label="Switch to Italian"
                className={`px-2.5 py-1.5 leading-none ${lang === "it" ? "bg-[#161616] text-white" : "text-[#525252] hover:bg-white hover:text-[#161616]"}`}
              >
                IT
              </a>
              <a
                href={altEn}
                aria-label="Switch to English"
                className={`px-2.5 py-1.5 leading-none ${lang === "en" ? "bg-[#161616] text-white" : "text-[#525252] hover:bg-white hover:text-[#161616]"}`}
              >
                EN
              </a>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex items-center border border-[#e0e0e0] bg-[#f4f4f4] p-0.5 font-mono text-[11px]">
              <a href={altIt} className={`px-2 py-1 leading-none ${lang === "it" ? "bg-[#161616] text-white" : "text-[#525252]"}`}>IT</a>
              <a href={altEn} className={`px-2 py-1 leading-none ${lang === "en" ? "bg-[#161616] text-white" : "text-[#525252]"}`}>EN</a>
            </div>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 -mr-2"
              aria-label="Toggle menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                {open ? (
                  <path d="M4 4l12 12M16 4L4 16" stroke="#161616" strokeWidth="1.5" />
                ) : (
                  <path d="M3 6h14M3 10h14M3 14h14" stroke="#161616" strokeWidth="1.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-[#e0e0e0] bg-white">
          <nav className="px-6 py-4 flex flex-col">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-[16px] border-b border-[#f4f4f4] last:border-0">
                {l.label}
              </a>
            ))}
            <a href={localizeHref("/paas", lang)} onClick={() => setOpen(false)} className="mt-3 border border-[#e0e0e0] text-center py-3 text-[14px] font-medium">{t("nav.cta.paas")}</a>
            <a href={localizeHref("/#pricing", lang)} onClick={() => setOpen(false)} className="mt-3 bg-[#0f62fe] text-white text-center py-3 text-[14px] font-medium">{t("nav.cta.deploy")}</a>
          </nav>
        </div>
      )}
    </header>
  );
}
