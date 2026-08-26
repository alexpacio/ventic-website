export default function Pricing() {
  return (
    <section id="pricing" className="border-b border-[#e0e0e0] bg-[#161616] text-white">
      <div className="mx-auto max-w-[1584px] px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-[720px]">
          <div className="font-mono text-[12px] tracking-[0.08em] uppercase text-[#78a9ff]">Pricing</div>
          <h2 className="mt-3 text-[28px] lg:text-[36px] font-light leading-[1.05] tracking-[-0.02em]">Predictable. <span className="font-semibold">Not per-token.</span></h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#a8a8a8]">Flat hourly — budget with confidence. No surprise token bills, no data compliance trade-offs.</p>
        </div>

        <div className="mt-10 grid lg:grid-cols-2 gap-0 border border-[#393939] bg-[#262626]">
          {/* BYOH */}
          <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#393939] bg-white text-[#161616]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] tracking-[0.08em] uppercase border border-[#e0e0e0] px-2 py-1">BYOH</span>
              <span className="font-mono text-[11px] text-[#6f6f6f]">You own hardware</span>
            </div>
            <h3 className="mt-4 text-[22px] font-semibold tracking-[-0.015em]">Bring Your Own Hardware</h3>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-[44px] font-light tracking-[-0.03em] leading-none">€80</span>
              <span className="text-[16px] text-[#525252]">/h + VAT</span>
              <span className="ml-2 font-mono text-[11px] tracking-wide uppercase bg-[#f4f4f4] border border-[#e0e0e0] px-2 py-1">Specialized consulting</span>
            </div>
            <p className="mt-3 text-[13px] leading-[1.6] text-[#525252]">One of our technicians — server & compatibility analysis (max 1h), inference stack setup, and Ventic Agent for remote access.</p>
            <ul className="mt-6 space-y-2.5 text-[14px]">
              {["Server & compatibility analysis", "vLLM setup with hardware tuning", "Ventic Agent (mesh + observability)", "Ongoing support"].map((t) => (
                <li key={t} className="flex gap-3"><span className="text-[#0f62fe]">✓</span><span>{t}</span></li>
              ))}
            </ul>
            <a href="#contact" className="mt-8 inline-flex w-full justify-center items-center gap-2 bg-[#0f62fe] text-white py-3 text-[14px] font-medium hover:bg-[#0353e9] transition-colors">
              Talk to a technician
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" /></svg>
            </a>
            <div className="mt-3 text-center font-mono text-[11px] text-[#6f6f6f]">Max 1h analysis included • then €80/h on demand</div>
          </div>

          {/* PaaS */}
          <div className="p-8 lg:p-10 bg-[#0f62fe] text-white">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] tracking-[0.08em] uppercase bg-white text-[#0f62fe] px-2 py-1 font-medium">PaaS</span>
              <span className="font-mono text-[11px] text-[#c6c6ff]">We provide hardware + APIs</span>
            </div>
            <h3 className="mt-4 text-[22px] font-semibold tracking-[-0.015em]">Platform as a Service</h3>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-[44px] font-light tracking-[-0.03em] leading-none">50%</span>
              <span className="text-[16px] text-[#c6c6ff]">of running cost /h /server</span>
            </div>
            <p className="mt-3 text-[13px] leading-[1.6] text-[#c6c6ff]">Hardware selected from our catalog and invoiced by us. Marketplace discovery at the best price — spot or dedicated, EU/US.</p>
            <ul className="mt-6 space-y-2.5 text-[14px] text-white">
              {["All BYOH features included", "Best server discovery & SEPA purchase", "Auto shutdown when idle, wake on request", "No per-token billing — ever"].map((t) => (
                <li key={t} className="flex gap-3"><span>✓</span><span>{t}</span></li>
              ))}
            </ul>
            <a href="#contact" className="mt-8 inline-flex w-full justify-center items-center gap-2 bg-white text-[#0f62fe] py-3 text-[14px] font-medium hover:bg-[#f4f4f4] transition-colors">
              Get PaaS quote
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" /></svg>
            </a>
            <div className="mt-3 text-center font-mono text-[11px] text-[#c6c6ff]">You pay half the server running cost per hour — all Ventic features included</div>
          </div>
        </div>

        <div className="mt-6 border border-[#393939] bg-[#262626] p-4 flex flex-wrap gap-4 justify-between items-center">
          <span className="font-mono text-[12px] text-[#a8a8a8]">Need a custom setup? Bare metal clusters, multi-GPU, or on-prem?</span>
          <a href="#contact" className="font-mono text-[12px] tracking-wide uppercase text-white border border-[#525252] px-4 py-2 hover:bg-[#393939] transition-colors">Contact sales →</a>
        </div>
      </div>
    </section>
  );
}
