export default function Modes() {
  return (
    <section id="models" className="border-b border-[#e0e0e0] bg-white">
      <div className="mx-auto max-w-[1584px] px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-[380px_1fr] gap-8 lg:gap-12">
          <div>
            <div className="font-mono text-[12px] tracking-[0.08em] uppercase text-[#0f62fe]">Deployment modes</div>
            <h2 className="mt-3 text-[28px] lg:text-[32px] font-light leading-[1.1] tracking-[-0.02em]">Two ways<br />to run private AI.</h2>
            <p className="mt-4 text-[14px] leading-[1.6] text-[#525252]">
              Same Ventic Agent, same API. Choose who owns the hardware.
            </p>
            <div className="mt-6 hidden lg:block h-px bg-[#e0e0e0]" />
            <div className="mt-6 hidden lg:flex items-center gap-2 font-mono text-[12px] text-[#6f6f6f]">
              <span className="h-2 w-2 bg-[#0f62fe]" /> OpenAI & Anthropic compatible • drop-in replacement
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-0 border border-[#e0e0e0]">
            {/* BYOH */}
            <div className="p-6 lg:p-8 bg-white border-b md:border-b-0 md:border-r border-[#e0e0e0]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 border border-[#e0e0e0] px-2 py-1">
                    <span className="h-1.5 w-1.5 bg-[#525252]" />
                    <span className="font-mono text-[11px] tracking-[0.08em] uppercase">BYOH</span>
                  </div>
                  <h3 className="mt-4 text-[20px] font-semibold tracking-[-0.015em]">Bring Your Own Hardware</h3>
                </div>
                <span className="font-mono text-[11px] text-[#6f6f6f]">01</span>
              </div>
              <p className="mt-3 text-[14px] leading-[1.6] text-[#525252]">
                You own the hardware. We provide the OpenAI/Anthropic-compatible APIs, optimized stack, and secure remote access.
              </p>
              <ul className="mt-6 space-y-3 text-[14px] leading-[1.5]">
                {[
                  "VM or bare metal with raw GPUs",
                  "vLLM with hardware-specific tuning",
                  "Encrypted mesh — no public IP needed",
                  "Multi-user fair scheduling",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-[7px] h-1 w-1 bg-[#0f62fe] shrink-0" />
                    <span className="text-[#262626]">{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-[#e0e0e0] flex items-baseline justify-between">
                <span className="font-mono text-[12px] tracking-wide uppercase text-[#6f6f6f]">Starts at</span>
                <span className="text-[14px]"><span className="text-[20px] font-semibold">€80</span><span className="text-[#525252]">/h + VAT</span></span>
              </div>
            </div>

            {/* PaaS */}
            <div className="p-6 lg:p-8 bg-[#f4f4f4]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#0f62fe] text-white px-2 py-1">
                    <span className="h-1.5 w-1.5 bg-white" />
                    <span className="font-mono text-[11px] tracking-[0.08em] uppercase">PaaS</span>
                  </div>
                  <h3 className="mt-4 text-[20px] font-semibold tracking-[-0.015em]">Platform as a Service</h3>
                </div>
                <span className="font-mono text-[11px] text-[#6f6f6f]">02</span>
              </div>
              <p className="mt-3 text-[14px] leading-[1.6] text-[#525252]">
                We provide everything — APIs + hardware from our catalog, invoiced by us. Best server, best price discovery.
              </p>
              <ul className="mt-6 space-y-3 text-[14px] leading-[1.5]">
                {[
                  "Marketplace discovery (spot/dedicated, EU/US)",
                  "Instant SEPA purchase",
                  "Auto shutdown when idle — restart on request",
                  "All BYOH features included",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-[7px] h-1 w-1 bg-[#0f62fe] shrink-0" />
                    <span className="text-[#262626]">{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-[#e0e0e0] flex items-baseline justify-between">
                <span className="font-mono text-[12px] tracking-wide uppercase text-[#6f6f6f]">Pricing</span>
                <span className="text-[14px]"><span className="text-[20px] font-semibold">50%</span><span className="text-[#525252]"> of running cost /h /server</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
