import { useState, useEffect } from "react";

const links = [
  { label: "Models", href: "#models" },
  { label: "Why Ventic", href: "#why" },
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors ${scrolled ? "bg-white/95 backdrop-blur border-[#e0e0e0]" : "bg-white border-[#e0e0e0]"}`}>
      {/* IBM-style top eyebrow */}
      <div className="hidden lg:block border-b border-[#e0e0e0] bg-[#f4f4f4]">
        <div className="mx-auto max-w-[1584px] px-6 lg:px-8 flex h-8 items-center justify-between text-[12px] leading-none tracking-wide">
          <span className="font-mono text-[#525252]">Private AI Infrastructure — BYOH & PaaS</span>
          <span className="font-mono text-[#525252] hidden xl:inline">OpenAI / Anthropic-compatible API • EU & US regions • Encrypted mesh</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1584px] px-6 lg:px-8">
        <div className="flex h-[48px] lg:h-[48px] items-center justify-between">
          {/* Logo - IBM style: heavy wordmark */}
          <a href="#" className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-[#0f62fe] flex items-center justify-center">
                <div className="h-[9px] w-[9px] bg-white" />
              </div>
              <span className="text-[20px] font-semibold tracking-[-0.02em] leading-none">ventic</span>
              <span className="hidden sm:inline text-[10px] font-mono tracking-[0.14em] text-[#6f6f6f] border border-[#e0e0e0] px-1.5 py-0.5 -mb-0.5">PRIVATE AI</span>
            </div>
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
            <a href="#contact" className="text-[14px] font-normal px-4 py-1.5 hover:bg-[#f4f4f4] border border-transparent hover:border-[#e0e0e0] transition-colors">
              Contact sales
            </a>
            <a href="#pricing" className="inline-flex items-center gap-2 bg-[#0f62fe] text-white text-[14px] font-medium px-4 py-[7px] hover:bg-[#0353e9] transition-colors">
              Deploy now
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" /></svg>
            </a>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 -mr-2"
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

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-[#e0e0e0] bg-white">
          <nav className="px-6 py-4 flex flex-col">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-[16px] border-b border-[#f4f4f4] last:border-0">
                {l.label}
              </a>
            ))}
            <a href="#pricing" onClick={() => setOpen(false)} className="mt-4 bg-[#0f62fe] text-white text-center py-3 text-[14px] font-medium">Deploy now</a>
          </nav>
        </div>
      )}
    </header>
  );
}
