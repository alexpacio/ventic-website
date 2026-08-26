export default function Why() {
  return (
    <section id="why" className="border-b border-[#e0e0e0] bg-[#f4f4f4]">
      <div className="mx-auto max-w-[1584px] px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-[720px]">
          <div className="font-mono text-[12px] tracking-[0.08em] uppercase text-[#0f62fe]">Why Ventic</div>
          <h2 className="mt-3 text-[28px] lg:text-[36px] font-light leading-[1.05] tracking-[-0.02em]">
            Frontier APIs weren’t built for <span className="font-semibold">autonomous, mission-critical work.</span>
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#525252]">The hidden costs of pay-per-token — and how private inference fixes them.</p>
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-0 border border-[#e0e0e0] bg-white">
          {/* Column 1 */}
          <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-[#e0e0e0]">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 bg-[#da1e28] flex items-center justify-center text-white font-mono text-[12px]">!</span>
              <h3 className="text-[14px] font-semibold tracking-[-0.01em]">Frontier subscriptions</h3>
            </div>
            <ul className="mt-6 space-y-4 text-[14px] leading-[1.6] text-[#525252]">
              <li className="flex gap-3"><span className="text-[#da1e28] mt-0.5">—</span><span><span className="font-medium text-[#161616]">Narrow windows, few tokens.</span> When the window ends, you stop — fatal for agents.</span></li>
              <li className="flex gap-3"><span className="text-[#da1e28] mt-0.5">—</span><span><span className="font-medium text-[#161616]">Outages</span> at major providers. Your product goes dark with them.</span></li>
              <li className="flex gap-3"><span className="text-[#da1e28] mt-0.5">—</span><span><span className="font-medium text-[#161616]">Instability & poor transparency.</span> Models change, results drift, low predictability.</span></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-[#e0e0e0]">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 bg-[#f1c21b] flex items-center justify-center text-[#161616] font-mono text-[12px]">€</span>
              <h3 className="text-[14px] font-semibold tracking-[-0.01em]">Pay-per-token traps</h3>
            </div>
            <ul className="mt-6 space-y-4 text-[14px] leading-[1.6] text-[#525252]">
              <li className="flex gap-3"><span className="text-[#8a3ffc] mt-0.5">—</span><span><span className="font-medium text-[#161616]">US frontier:</span> high cost per token, unpredictable budgets.</span></li>
              <li className="flex gap-3"><span className="text-[#8a3ffc] mt-0.5">—</span><span><span className="font-medium text-[#161616]">Chinese models:</span> data compliance risk — no Chinese servers, EU/US only.</span></li>
              <li className="flex gap-3"><span className="text-[#8a3ffc] mt-0.5">—</span><span>By nature of LLMs, <span className="font-medium text-[#161616]">costs can explode</span> — budgeting becomes guesswork.</span></li>
            </ul>
          </div>

          {/* Column 3 - Ventic - highlighted like IBM blue card */}
          <div className="p-6 lg:p-8 bg-[#0f62fe] text-white">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 bg-white flex items-center justify-center text-[#0f62fe] font-mono text-[12px] font-bold">✓</span>
              <h3 className="text-[14px] font-semibold tracking-[-0.01em]">Ventic — private inference</h3>
            </div>
            <ul className="mt-6 space-y-3 text-[14px] leading-[1.6] text-[#e0e0e0]">
              {[
                "Your server, your data. Console or API — your call.",
                "Share one machine across users, predictable windows, scheduled workloads.",
                "Most optimized setup for whatever hardware is available — no tinkering.",
                "Auto reschedule & restore after spot outages — always available.",
                "No public IP, VPNs, or insecure configs — encrypted overlay mesh.",
                "Built-in observability + policies per query/user.",
                "Auto shutdown when idle, wake on request.",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-[8px] h-1 w-1 bg-white shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Comparison bar */}
        <div className="mt-8 grid md:grid-cols-3 gap-3 font-mono text-[12px]">
          <div className="border border-[#e0e0e0] bg-white px-4 py-3 flex justify-between"><span className="text-[#6f6f6f]">Context window</span><span className="font-medium text-[#da1e28]">Limited & shared →</span><span className="font-medium text-[#0f62fe]">Private & predictable</span></div>
          <div className="border border-[#e0e0e0] bg-white px-4 py-3 flex justify-between"><span className="text-[#6f6f6f]">Budget</span><span className="font-medium text-[#da1e28]">Explodes</span><span className="font-medium text-[#0f62fe]">Flat hourly</span></div>
          <div className="border border-[#e0e0e0] bg-white px-4 py-3 flex justify-between"><span className="text-[#6f6f6f]">Data</span><span className="font-medium text-[#da1e28]">Vendor servers</span><span className="font-medium text-[#0f62fe]">Your server only</span></div>
        </div>
      </div>
    </section>
  );
}
