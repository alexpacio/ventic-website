import { ui, defaultLang } from "../i18n/ui";
type Lang = keyof typeof ui;
type Props = { lang?: Lang };

export default function WorkBanner({ lang = defaultLang as Lang }: Props) {
  const isIt = lang === "it";
  return (
    <section className="relative border-b border-[#e0e0e0] bg-[#161616] overflow-hidden">
      {/* Media: video ambiente lavorativo + fallback immagine — IBM full-bleed */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
          className="absolute inset-0 h-full w-full object-cover hidden md:block motion-reduce:hidden"
        >
          <source src="https://videos.pexels.com/video-files/2278095/2278095-hd_1920_1080_30fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/18069234/18069234-uhd_1440_1440_24fps.mp4" type="video/mp4" />
        </video>
        {/* IBM duotone + scrim */}
        <div className="absolute inset-0 bg-[#0f62fe] mix-blend-multiply opacity-[0.42]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#161616]/85 via-[#161616]/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161616]/60 via-transparent to-transparent" />
        {/* Grid IBM */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(ellipse_at_top_left,white_1px,transparent_1px)] [background-size:14px_14px]" />
      </div>

      {/* Content — IBM left-aligned, bordered card */}
      <div className="relative mx-auto max-w-[1584px] px-6 lg:px-8">
        <div className="min-h-[360px] lg:min-h-[440px] flex items-center py-12 lg:py-16">
          <div className="max-w-[560px] border border-white/15 bg-[#161616]/75 backdrop-blur-[6px] p-6 lg:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#0f62fe]" />
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#a8a8a8]">
                {isIt ? "Ambienti di lavoro reali" : "Real work environments"}
              </span>
              <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wide text-white/60 border border-white/15 px-1.5 py-0.5">
                <span className="h-1.5 w-1.5 bg-[#42be65] animate-pulse rounded-full" />
                live
              </span>
            </div>
            <h2 className="mt-4 text-[28px] lg:text-[36px] font-light leading-[1.05] tracking-[-0.02em] text-white">
              {isIt ? (
                <>
                  L&apos;AI privata
                  <br />
                  <span className="font-semibold">dove lavora</span> il tuo team.
                </>
              ) : (
                <>
                  Private AI
                  <br />
                  <span className="font-semibold">where your team</span> works.
                </>
              )}
            </h2>
            <p className="mt-4 text-[14px] leading-[1.6] text-[#c6c6c6]">
              {isIt
                ? "Dati che non lasciano mai l'ufficio, GPU che girano dietro la tua VPN. Nessun IP pubblico, mesh cifrata — proprio come lavora il tuo team, in EU/US, dietro NAT."
                : "Data that never leaves the office, GPUs behind your VPN. No public IP, encrypted mesh — just where your team already works, EU/US, behind NAT."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#how"
                className="inline-flex items-center gap-2 bg-[#0f62fe] text-white px-5 py-2.5 text-[14px] font-medium hover:bg-[#0353e9] transition-colors"
              >
                {isIt ? "Guarda come funziona" : "See how it works"}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 border border-white/25 bg-white/5 backdrop-blur text-white px-5 py-2.5 text-[14px] font-medium hover:bg-white hover:text-[#161616] transition-colors"
              >
                {isIt ? "Esplora gli spazi" : "Explore spaces"}
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 font-mono text-[11px]">
              <span className="border border-white/15 bg-white/5 text-white/80 px-2 py-1">EU • Milano / Francoforte</span>
              <span className="border border-white/15 bg-white/5 text-white/80 px-2 py-1">US • su richiesta</span>
              <span className="hidden sm:inline border border-white/15 bg-white/5 text-white/80 px-2 py-1">Dietro NAT • zero VPN</span>
            </div>
          </div>

          {/* IBM side meta — desktop only, right */}
          <div className="hidden xl:flex ml-auto flex-col gap-3 w-[320px]">
            <div className="border border-white/10 bg-white/[0.04] backdrop-blur p-3 font-mono text-[11px] leading-[1.5] text-white/70">
              <div className="text-white/90 font-medium tracking-wide uppercase text-[11px]">Mesh overlay</div>
              <div className="mt-1">QUIC • cifrata end-to-end • nessun IPv4 pubblico</div>
              <div className="mt-3 h-px bg-white/10" />
              <div className="mt-3 flex items-center gap-2 text-[11px]">
                <span className="h-1.5 w-1.5 bg-[#42be65] rounded-full animate-pulse" />
                {isIt ? "Raggiunge server dietro firewall" : "Reaches servers behind firewall"}
              </div>
            </div>
            <div className="border border-white/10 bg-white/[0.04] backdrop-blur p-3">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                alt=""
                loading="lazy"
                decoding="async"
                className="h-[110px] w-full object-cover grayscale opacity-80"
              />
              <div className="mt-2 font-mono text-[11px] text-white/60">Team • {isIt ? "ufficio reale, infrastruttura privata" : "real office, private infra"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* IBM bottom hairline */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </section>
  );
}
