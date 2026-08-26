export default function How() {
  return (
    <section id="how" className="border-b border-[#e0e0e0] bg-white">
      <div className="mx-auto max-w-[1584px] px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-[420px_1fr] gap-8 lg:gap-12 items-start">
          <div className="lg:sticky lg:top-[88px]">
            <div className="font-mono text-[12px] tracking-[0.08em] uppercase text-[#0f62fe]">How it works</div>
            <h2 className="mt-3 text-[28px] lg:text-[32px] font-light leading-[1.1] tracking-[-0.02em]">One agent.<br /><span className="font-semibold">Everything handled.</span></h2>
            <p className="mt-4 text-[14px] leading-[1.6] text-[#525252]">
              A proprietary agent runs on the server. It ensures the LLM works correctly and serves multiple users securely and fairly — no manual ops.
            </p>
            <div className="mt-8 border border-[#e0e0e0] bg-[#f4f4f4] p-4 font-mono text-[12px] leading-[1.6] text-[#525252]">
              <div className="text-[#161616] font-medium">Ventic Agent — responsibilities</div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <span className="bg-white border border-[#e0e0e0] px-2 py-1.5">vLLM lifecycle</span>
                <span className="bg-white border border-[#e0e0e0] px-2 py-1.5">Fair scheduling</span>
                <span className="bg-white border border-[#e0e0e0] px-2 py-1.5">Mesh networking</span>
                <span className="bg-white border border-[#e0e0e0] px-2 py-1.5">Observability</span>
                <span className="bg-white border border-[#e0e0e0] px-2 py-1.5">Auto-recovery</span>
                <span className="bg-white border border-[#e0e0e0] px-2 py-1.5">Idle shutdown</span>
              </div>
            </div>
          </div>

          {/* Diagram - IBM-style architecture */}
          <div className="border border-[#e0e0e0] bg-[#161616] text-white overflow-hidden">
            <div className="px-6 py-4 border-b border-[#393939] flex items-center justify-between bg-[#262626]">
              <span className="font-mono text-[12px] tracking-[0.06em] uppercase text-[#a8a8a8]">Architecture • encrypted overlay mesh</span>
              <span className="hidden sm:inline font-mono text-[11px] text-[#6f6f6f]">No public IPv4 required</span>
            </div>

            <div className="p-6 lg:p-8">
              {/* Flow */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="border border-[#393939] bg-[#262626] p-4">
                  <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#8d8d8d]">01 — Users & apps</div>
                  <div className="mt-2 text-[13px] font-medium">Your team, agents, apps</div>
                  <div className="mt-1 font-mono text-[12px] text-[#8d8d8d]">OpenAI-compatible SDKs</div>
                  <div className="mt-3 flex gap-1.5">
                    <span className="h-6 w-6 rounded-full bg-[#0f62fe] flex items-center justify-center text-[10px] font-mono">JS</span>
                    <span className="h-6 w-6 rounded-full bg-[#393939] border border-[#525252] flex items-center justify-center text-[10px] font-mono">PY</span>
                    <span className="h-6 w-6 rounded-full bg-[#393939] border border-[#525252] flex items-center justify-center text-[10px] font-mono">cURL</span>
                  </div>
                </div>

                <div className="border border-[#0f62fe] bg-[#0f62fe]/20 p-4 relative">
                  <div className="absolute -top-2 left-4 bg-[#0f62fe] text-white font-mono text-[10px] tracking-wide px-1.5 py-0.5">MESH</div>
                  <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#8d8d8d]">02 — Overlay mesh</div>
                  <div className="mt-2 text-[13px] font-medium">Encrypted tunnel</div>
                  <div className="mt-1 font-mono text-[12px] text-[#a8a8a8]">WireGuard-based • zero VPN</div>
                  <div className="mt-3 h-px bg-[#0f62fe]/40" />
                  <div className="mt-3 font-mono text-[11px] text-[#8d8d8d]">→ reaches server even behind NAT / no public IP</div>
                </div>

                <div className="border border-[#393939] bg-[#262626] p-4">
                  <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#8d8d8d]">03 — Your server</div>
                  <div className="mt-2 text-[13px] font-medium">Dedicated GPU • Ventic Agent</div>
                  <div className="mt-1 font-mono text-[12px] text-[#8d8d8d]">vLLM + embedding + policies</div>
                  <div className="mt-3 inline-flex items-center gap-1.5 border border-[#393939] bg-[#161616] px-2 py-1 font-mono text-[11px]">
                    <span className="h-1.5 w-1.5 bg-[#42be65] animate-pulse rounded-full" /> vLLM • 94% GPU • 1.8k tok/s
                  </div>
                </div>
              </div>

              {/* Bottom detail */}
              <div className="mt-6 grid lg:grid-cols-2 gap-4">
                <div className="border border-[#393939] p-4 bg-[#262626]/50">
                  <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#8d8d8d]">Setup in seconds</div>
                  <ol className="mt-3 space-y-2 font-mono text-[13px] text-[#e0e0e0]">
                    <li className="flex gap-3"><span className="text-[#0f62fe]">1.</span> Agent discovers hardware & model fit</li>
                    <li className="flex gap-3"><span className="text-[#0f62fe]">2.</span> Provisions vLLM with per-GPU tuning</li>
                    <li className="flex gap-3"><span className="text-[#0f62fe]">3.</span> Exposes <span className="bg-[#393939] px-1">/v1/*</span> via mesh — no ingress rules</li>
                  </ol>
                </div>
                <div className="border border-[#393939] p-4 bg-[#262626]/50">
                  <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#8d8d8d]">Resilience</div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
                    <div className="border border-[#393939] bg-[#161616] py-3"><div className="text-[#42be65] font-medium">Spot outage</div><div className="text-[#8d8d8d] mt-1">Auto reschedule</div></div>
                    <div className="border border-[#393939] bg-[#161616] py-3"><div className="text-[#42be65] font-medium">Idle</div><div className="text-[#8d8d8d] mt-1">Auto shutdown</div></div>
                    <div className="border border-[#393939] bg-[#161616] py-3"><div className="text-[#42be65] font-medium">Request</div><div className="text-[#8d8d8d] mt-1">Wake on demand</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
