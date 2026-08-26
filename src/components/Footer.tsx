export default function Footer() {
  return (
    <footer id="contact" className="bg-[#f4f4f4] border-t border-[#e0e0e0]">
      <div className="mx-auto max-w-[1584px] px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-[#0f62fe] flex items-center justify-center"><div className="h-[9px] w-[9px] bg-white" /></div>
              <span className="text-[18px] font-semibold tracking-[-0.02em]">ventic</span>
              <span className="font-mono text-[10px] tracking-[0.14em] text-[#6f6f6f] border border-[#e0e0e0] bg-white px-1.5 py-0.5">PRIVATE AI</span>
            </div>
            <p className="mt-4 max-w-[52ch] text-[14px] leading-[1.6] text-[#525252]">
              We deploy private AI on dedicated GPUs. Turnkey. Your hardware, your data, our know-how, and our ongoing support.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 font-mono text-[11px]">
              <span className="border border-[#e0e0e0] bg-white px-2.5 py-1.5">OpenAI / Anthropic compatible</span>
              <span className="border border-[#e0e0e0] bg-white px-2.5 py-1.5">EU & US • No Chinese servers</span>
              <span className="border border-[#e0e0e0] bg-white px-2.5 py-1.5">Encrypted mesh</span>
            </div>
          </div>

          <div className="border border-[#e0e0e0] bg-white p-6">
            <div className="font-mono text-[12px] tracking-[0.08em] uppercase text-[#525252]">Get started</div>
            <h3 className="mt-2 text-[18px] font-semibold tracking-[-0.015em]">Deploy private AI in seconds.</h3>
            <p className="mt-2 text-[13px] leading-[1.6] text-[#525252]">Tell us your hardware (or let us source it) and the model you need. We handle the rest.</p>

            {/* Static form - no backend, IBM Carbon style */}
            <form className="mt-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="block">
                  <span className="font-mono text-[11px] tracking-wide uppercase text-[#525252]">Work email</span>
                  <input placeholder="you@company.com" className="mt-1 w-full border border-[#8d8d8d] bg-[#f4f4f4] px-3 py-2.5 text-[14px] placeholder:text-[#8d8d8d] focus:bg-white focus:border-[#0f62fe] focus:outline-none" />
                </label>
                <label className="block">
                  <span className="font-mono text-[11px] tracking-wide uppercase text-[#525252]">Company</span>
                  <input placeholder="Acme Inc." className="mt-1 w-full border border-[#8d8d8d] bg-[#f4f4f4] px-3 py-2.5 text-[14px] placeholder:text-[#8d8d8d] focus:bg-white focus:border-[#0f62fe] focus:outline-none" />
                </label>
              </div>
              <label className="block">
                <span className="font-mono text-[11px] tracking-wide uppercase text-[#525252]">What do you need?</span>
                <select className="mt-1 w-full border border-[#8d8d8d] bg-[#f4f4f4] px-3 py-2.5 text-[14px] focus:bg-white focus:border-[#0f62fe] focus:outline-none">
                  <option>BYOH — I have GPUs / a server</option>
                  <option>PaaS — source hardware for me</option>
                  <option>Not sure — advise me</option>
                </select>
              </label>
              <button type="submit" className="w-full bg-[#0f62fe] text-white py-3 text-[14px] font-medium hover:bg-[#0353e9] transition-colors inline-flex justify-center items-center gap-2">
                Request access
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" /></svg>
              </button>
              <p className="text-[11px] leading-[1.5] text-[#6f6f6f] font-mono">Static site — form is a placeholder. Wire it to your email / CRM or replace with a mailto: link.</p>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-[#e0e0e0] pt-6 flex flex-wrap gap-4 justify-between items-center font-mono text-[12px] text-[#6f6f6f]">
          <span>© {new Date().getFullYear()} Ventic — Private AI Infrastructure. Inspired by IBM Carbon Design System.</span>
          <span className="flex gap-4">
            <a href="#" className="hover:text-[#161616] underline underline-offset-4">Privacy</a>
            <a href="#" className="hover:text-[#161616] underline underline-offset-4">Terms</a>
            <a href="#pricing" className="hover:text-[#161616] underline underline-offset-4">Pricing</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
