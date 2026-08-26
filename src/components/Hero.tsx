export default function Hero() {
  return (
    <section className="border-b border-[#e0e0e0] bg-white">
      <div className="mx-auto max-w-[1584px] px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-0 lg:gap-0">
          {/* Left */}
          <div className="py-10 lg:py-16 lg:pr-12 xl:pr-16 border-b lg:border-b-0 lg:border-r border-[#e0e0e0]">
            {/* Eyebrow - IBM style */}
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-[#0f62fe]" />
              <span className="font-mono text-[12px] tracking-[0.08em] uppercase text-[#525252]">Private inference • Dedicated GPUs</span>
            </div>

            <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] xl:text-[54px] font-light leading-[0.95] tracking-[-0.03em] text-[#161616]">
              Your hardware,<br />
              <span className="font-semibold">your data,</span><br />
              our know-how.
            </h1>

            <p className="mt-6 max-w-[52ch] text-[16px] lg:text-[18px] leading-[1.5] text-[#525252] font-light">
              We deploy <span className="font-medium text-[#161616]">private AI on dedicated GPUs</span>. Turnkey — from VMs or bare metal with raw GPUs.
              OpenAI/Anthropic-compatible APIs, best open-weight models, hardware-tuned vLLM. Squeeze every drop out of your hardware and deploy in seconds.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#pricing" className="inline-flex items-center gap-2 bg-[#0f62fe] text-white px-6 py-3 text-[14px] font-medium hover:bg-[#0353e9] transition-colors">
                Start with Ventic
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" /></svg>
              </a>
              <a href="#how" className="inline-flex items-center gap-2 border border-[#8d8d8d] px-6 py-3 text-[14px] font-medium hover:bg-[#f4f4f4] transition-colors">
                How it works
              </a>
            </div>

            {/* Trust row - IBM-style specs */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-[#e0e0e0] pt-6 max-w-[520px]">
              <div>
                <div className="font-mono text-[12px] tracking-wide text-[#6f6f6f] uppercase">API</div>
                <div className="mt-1 text-[13px] font-medium leading-tight">OpenAI /<br />Anthropic compat.</div>
              </div>
              <div>
                <div className="font-mono text-[12px] tracking-wide text-[#6f6f6f] uppercase">Deploy</div>
                <div className="mt-1 text-[13px] font-medium leading-tight">Seconds,<br />not hours</div>
              </div>
              <div>
                <div className="font-mono text-[12px] tracking-wide text-[#6f6f6f] uppercase">Data</div>
                <div className="mt-1 text-[13px] font-medium leading-tight">Never leaves<br />your server</div>
              </div>
            </div>
          </div>

          {/* Right - code / terminal card - IBM Carbon style */}
          <div className="bg-[#f4f4f4] lg:bg-white py-8 lg:py-12 lg:pl-8 xl:pl-12">
            <div className="border border-[#e0e0e0] bg-[#161616] text-[#f4f4f4] overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#393939] bg-[#262626]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                    <span className="h-3 w-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                    <span className="h-3 w-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                  </div>
                  <span className="ml-3 font-mono text-[12px] text-[#a8a8a8]">ventic — inference</span>
                </div>
                <span className="font-mono text-[11px] text-[#6f6f6f] hidden sm:inline">OpenAI compatible</span>
              </div>

              <div className="p-5 lg:p-6 font-mono text-[13px] leading-[1.7]">
                <div className="text-[#6f6f6f]"># One endpoint. Any model. Your GPU.</div>
                <div className="mt-3 flex gap-2"><span className="text-[#8a3ffc]">$</span><span className="text-[#a8a8a8]">curl https://llm.your-server.internal/v1/chat/completions \</span></div>
                <div className="pl-4 text-[#a8a8a8]">-H "Authorization: Bearer $VENTIC_KEY" \</div>
                <div className="pl-4 text-[#a8a8a8]">-d '{`{ "model": "qwen3-8b", "messages": [...] }`}'</div>

                <div className="mt-6 rounded-sm border border-[#393939] bg-[#262626] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] tracking-[0.08em] uppercase text-[#8d8d8d]">Live inference</span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-[#42be65]"><span className="h-1.5 w-1.5 rounded-full bg-[#42be65] animate-pulse" /> 1,847 tok/s</span>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-4 text-center">
                    <div className="border border-[#393939] bg-[#161616] py-3">
                      <div className="text-[11px] tracking-wide uppercase text-[#8d8d8d]">Prefill</div>
                      <div className="mt-1 text-[18px] font-medium text-white">2.1 ms</div>
                      <div className="text-[11px] text-[#6f6f6f]">per token</div>
                    </div>
                    <div className="border border-[#393939] bg-[#161616] py-3">
                      <div className="text-[11px] tracking-wide uppercase text-[#8d8d8d]">Decode</div>
                      <div className="mt-1 text-[18px] font-medium text-white">12.4 ms</div>
                      <div className="text-[11px] text-[#6f6f6f]">per token</div>
                    </div>
                    <div className="border border-[#393939] bg-[#161616] py-3">
                      <div className="text-[11px] tracking-wide uppercase text-[#8d8d8d]">Util.</div>
                      <div className="mt-1 text-[18px] font-medium text-white">94%</div>
                      <div className="text-[11px] text-[#6f6f6f]">GPU</div>
                    </div>
                  </div>
                  <div className="mt-3 h-1 bg-[#393939] overflow-hidden">
                    <div className="h-full w-[94%] bg-[#0f62fe]" />
                  </div>
                </div>

                <div className="mt-4 text-[12px] text-[#6f6f6f]">
                  Encrypted mesh • No public IP • Auto-resume after spot interruption
                </div>
              </div>
            </div>

            {/* Pill row */}
            <div className="mt-4 flex flex-wrap gap-2 font-mono text-[11px]">
              <span className="border border-[#e0e0e0] bg-white px-2.5 py-1.5 text-[#525252]">vLLM • hardware-tuned</span>
              <span className="border border-[#e0e0e0] bg-white px-2.5 py-1.5 text-[#525252]">Auto shutdown when idle</span>
              <span className="border border-[#e0e0e0] bg-white px-2.5 py-1.5 text-[#525252]">Observability built-in</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
