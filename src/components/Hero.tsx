import { useEffect, useRef, useState } from "react";
import { ui, defaultLang } from "../i18n/ui";

type Lang = keyof typeof ui;

type TranscriptItem =
  | { kind: "user"; text: string }
  | { kind: "thinking"; text: string }
  | { kind: "tool"; title: string; subtitle: string; icon: string }
  | { kind: "tool_result_lines"; lines: string[] }
  | { kind: "tool_result_code"; code: string; lang?: string }
  | { kind: "tool_result_diff"; diff: { op: " " | "+" | "-"; text: string }[] }
  | { kind: "tool_result_json"; json: string }
  | { kind: "assistant"; text: string };

const TRANSCRIPT: TranscriptItem[] = [
  { kind: "user", text: "Deploy qwen3-8b on my H100 and wire it into my app. Keep it private." },
  { kind: "thinking", text: "Checking hardware and codebase to plan the switch to local inference…" },
  { kind: "tool", title: "ventic doctor", subtitle: "Inspecting GPUs & drivers", icon: "◈" },
  {
    kind: "tool_result_lines",
    lines: ["✓ H100 80GB · CUDA 12.4 · Driver 550.90", "✓ vLLM 0.6.3 · hardware-tuned flags ready", "✓ 80GB VRAM free · 94% util headroom"],
  },
  { kind: "tool", title: "Read src/lib/openai.ts", subtitle: "0.8ms", icon: "⬡" },
  {
    kind: "tool_result_code",
    code: `import OpenAI from "openai";\nexport const openai = new OpenAI({\n  apiKey: process.env.OPENAI_API_KEY,\n});`,
  },
  { kind: "tool", title: "Edit src/lib/openai.ts", subtitle: "Switch to local endpoint", icon: "✎" },
  {
    kind: "tool_result_diff",
    diff: [
      { op: " ", text: `import OpenAI from "openai";` },
      { op: " ", text: `export const openai = new OpenAI({` },
      { op: "-", text: `  apiKey: process.env.OPENAI_API_KEY,` },
      { op: "+", text: `  baseURL: "http://localhost:8000/v1",` },
      { op: "+", text: `  apiKey: process.env.VENTIC_KEY, // local — no egress` },
      { op: " ", text: `});` },
    ],
  },
  { kind: "tool", title: "ventic deploy qwen3-8b --tuned", subtitle: "Tuning vLLM for H100…", icon: "⬢" },
  {
    kind: "tool_result_lines",
    lines: [
      "⠋ Pulling qwen3-8b — 16.2GB",
      "✓ Flags: --gpu-memory-util 0.94 --max-num-seqs 32 --enforce-eager",
      "✓ Live at http://localhost:8000/v1  ·  1,847 tok/s  ·  2.1ms prefill",
    ],
  },
  { kind: "tool", title: 'curl /v1/chat/completions', subtitle: "Smoke test", icon: "⟐" },
  {
    kind: "tool_result_json",
    json: `{\n  "model": "qwen3-8b",\n  "choices": [{ "message": { "content": "Hello! Running locally on your H100." } }]\n}`,
  },
  {
    kind: "assistant",
    text: "Done. qwen3-8b is live on your H100 — OpenAI-compatible at localhost:8000/v1. Tuned vLLM, 94% GPU util. Your app now points to your box, data never leaves your server. Enable auto-shutdown when idle?",
  },
];

function useTranscriptAnimation() {
  const [visible, setVisible] = useState(0);
  const [typedUser, setTypedUser] = useState("");
  const [typedAssistant, setTypedAssistant] = useState("");
  const [phase, setPhase] = useState<"idle" | "typing-user" | "typing-assistant" | "waiting">("idle");
  const [done, setDone] = useState(false);

  const fullUserText = (TRANSCRIPT[0] as Extract<TranscriptItem, { kind: "user" }>).text;
  const assistantIdx = TRANSCRIPT.findIndex((s) => s.kind === "assistant");
  const assistantFull = (TRANSCRIPT[assistantIdx] as Extract<TranscriptItem, { kind: "assistant" }>).text;

  // reset helper
  const reset = () => {
    setVisible(0);
    setTypedUser("");
    setTypedAssistant("");
    setPhase("typing-user");
    setDone(false);
  };

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    if (done) {
      const t = setTimeout(reset, 4500);
      return () => clearTimeout(t);
    }

    if (phase === "typing-user") {
      if (typedUser.length < fullUserText.length) {
        const t = setTimeout(() => setTypedUser(fullUserText.slice(0, typedUser.length + 1)), 18);
        return () => clearTimeout(t);
      } else {
        // user fully typed — reveal first item then continue
        setVisible(1);
        const t = setTimeout(() => setPhase("waiting"), 350);
        return () => clearTimeout(t);
      }
    }

    if (phase === "waiting") {
      if (visible >= TRANSCRIPT.length) {
        setDone(true);
        return;
      }
      // special handling before assistant: start typing assistant
      if (visible === assistantIdx) {
        setPhase("typing-assistant");
        return;
      }
      const cur = TRANSCRIPT[visible];
      // pacing per kind
      let delay = 520;
      if (cur.kind === "thinking") delay = 900;
      if (cur.kind === "tool") delay = 420;
      if (cur.kind === "tool_result_lines" || cur.kind === "tool_result_code" || cur.kind === "tool_result_diff" || cur.kind === "tool_result_json")
        delay = 560;
      const t = setTimeout(() => setVisible((v) => v + 1), delay);
      return () => clearTimeout(t);
    }

    if (phase === "typing-assistant") {
      if (typedAssistant.length < assistantFull.length) {
        const t = setTimeout(() => setTypedAssistant(assistantFull.slice(0, typedAssistant.length + 1)), 14);
        return () => clearTimeout(t);
      } else {
        setVisible((v) => v + 1);
        setPhase("waiting");
      }
    }
  }, [phase, typedUser, typedAssistant, visible, done, fullUserText, assistantFull, assistantIdx]);

  return { visible, typedUser, typedAssistant, done, reset, fullUserText, assistantFull, assistantIdx, phase };
}

function AgentCard() {
  const { visible, typedUser, typedAssistant, done, reset, assistantIdx } = useTranscriptAnimation();
  const scrollRef = useRef<HTMLDivElement>(null);

  // auto-scroll as new items appear
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [visible, typedUser, typedAssistant]);

  const showThinking = visible >= 1;
  const showAssistant = visible > assistantIdx;

  return (
    <div className="border border-[#e0e0e0] bg-[#161616] text-[#f4f4f4] overflow-hidden flex flex-col shadow-[0_8px_40px_rgba(0,0,0,0.18)] h-[440px] sm:h-[460px] lg:h-[480px]">
      {/* Window chrome */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#393939] bg-[#262626] shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
          </div>
          <span className="ml-3 font-mono text-[12px] tracking-[0.04em] text-[#a8a8a8] hidden sm:inline">claude — ventic</span>
          <span className="ml-3 font-mono text-[12px] text-[#a8a8a8] sm:hidden">claude</span>
          <span className="hidden sm:inline-flex ml-2 items-center gap-1.5 rounded-full border border-[#393939] bg-[#161616] px-2 py-0.5">
            <span className={`h-1.5 w-1.5 rounded-full ${done ? "bg-[#42be65]" : "bg-[#ff832b] animate-pulse"}`} />
            <span className="font-mono text-[10px] tracking-wide uppercase text-[#a8a8a8]">{done ? "done" : "coding"}</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:inline font-mono text-[11px] text-[#6f6f6f]">sonnet 4.5 • ventic skill</span>
          <button
            onClick={reset}
            className="font-mono text-[11px] tracking-wide text-[#a8a8a8] hover:text-white border border-[#393939] bg-[#161616] px-2.5 py-1 hover:border-[#525252] transition-colors"
            aria-label="Replay animation"
          >
            ↺ replay
          </button>
        </div>
      </div>

      {/* Timeline — fixed height, internal scroll only, no layout shift */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin min-h-0 bg-[#161616] overscroll-contain">
        <div className="p-4 lg:p-5 font-mono text-[13px] leading-[1.6]">
          {/* User prompt */}
          <div className="flex gap-3">
            <span className="shrink-0 mt-[2px] h-6 w-6 rounded-full bg-[#e8daff] text-[#6929c4] grid place-items-center text-[11px] font-bold">›</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-[11px] tracking-[0.08em] uppercase text-[#8d8d8d]">You</span>
                <span className="text-[11px] text-[#6f6f6f]">now</span>
              </div>
              <div className="mt-1 text-[13.5px] leading-[1.6] text-[#f4f4f4]">
                {typedUser}
                {typedUser.length < (TRANSCRIPT[0] as any).text.length && <span className="inline-block w-[7px] h-[14px] bg-[#f4f4f4] ml-0.5 translate-y-[2px] animate-pulse" />}
              </div>
            </div>
          </div>

          {/* Thinking */}
          {showThinking && (
            <div className="mt-4 flex gap-3 animate-[fadeIn_0.35s_ease]">
              <span className="shrink-0 mt-[2px] h-6 w-6 rounded-full bg-[#262626] border border-[#393939] grid place-items-center text-[#a8a8a8] text-[12px]">◐</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8a3ffc] animate-pulse" />
                  <span className="text-[11px] tracking-[0.08em] uppercase text-[#8d8d8d]">Thinking</span>
                  <span className="text-[11px] text-[#525252]">· planned 3 steps</span>
                </div>
                <div className="mt-1 text-[12.5px] leading-[1.6] text-[#a8a8a8] italic">
                  {(TRANSCRIPT[1] as Extract<TranscriptItem, { kind: "thinking" }>).text}
                </div>
              </div>
            </div>
          )}

          {/* Tools & results */}
          <div className="mt-4 space-y-3">
            {TRANSCRIPT.slice(2).map((item, i) => {
              const absoluteIdx = i + 2;
              if (absoluteIdx >= visible) return null;
              // assistant is handled separately with typing
              if (item.kind === "assistant") return null;

              if (item.kind === "tool") {
                return (
                  <div
                    key={absoluteIdx}
                    className="flex items-center gap-3 rounded-sm border border-[#393939] bg-[#262626] px-3 py-2.5 animate-[slideIn_0.3s_ease]"
                  >
                    <span className="h-7 w-7 grid place-items-center rounded-sm bg-[#161616] border border-[#393939] text-[#a8a8a8] text-[12px] shrink-0">
                      {item.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12.5px] leading-none text-[#f4f4f4] flex items-center gap-2">
                        <span className="truncate">{item.title}</span>
                        <span className="hidden sm:inline h-1 w-1 rounded-full bg-[#525252]" />
                        <span className="hidden sm:inline text-[11px] text-[#8d8d8d] truncate">{item.subtitle}</span>
                      </div>
                      <div className="mt-1 h-1 w-full bg-[#393939] overflow-hidden rounded-full">
                        <div className="h-full bg-[#0f62fe] w-[88%] animate-[grow_0.7s_ease]" />
                      </div>
                    </div>
                    <span className="shrink-0 text-[11px] text-[#42be65]">✓</span>
                  </div>
                );
              }

              if (item.kind === "tool_result_lines") {
                return (
                  <div key={absoluteIdx} className="ml-10 rounded-sm bg-[#0f0f0f] border border-[#262626] px-3 py-2.5 animate-[fadeIn_0.25s_ease]">
                    {item.lines.map((l, j) => (
                      <div key={j} className="text-[11.5px] leading-[1.7] text-[#a8a8a8] font-mono">
                        {l}
                      </div>
                    ))}
                  </div>
                );
              }

              if (item.kind === "tool_result_code") {
                return (
                  <div key={absoluteIdx} className="ml-10 overflow-hidden rounded-sm border border-[#262626] bg-[#0f0f0f] animate-[fadeIn_0.25s_ease]">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-[#1c1c1c] border-b border-[#262626]">
                      <span className="font-mono text-[11px] text-[#8d8d8d]">src/lib/openai.ts</span>
                      <span className="font-mono text-[10px] text-[#6f6f6f]">read</span>
                    </div>
                    <pre className="px-3 py-2.5 font-mono text-[11.5px] leading-[1.6] text-[#c6c6c6] overflow-x-auto whitespace-pre">{item.code}</pre>
                  </div>
                );
              }

              if (item.kind === "tool_result_diff") {
                return (
                  <div key={absoluteIdx} className="ml-10 overflow-hidden rounded-sm border border-[#262626] bg-[#0f0f0f] animate-[fadeIn_0.25s_ease]">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-[#1c1c1c] border-b border-[#262626]">
                      <span className="font-mono text-[11px] text-[#8d8d8d]">src/lib/openai.ts</span>
                      <span className="font-mono text-[10px] tracking-wide uppercase text-[#42be65]">edited</span>
                    </div>
                    <div className="px-3 py-2 font-mono text-[11.5px] leading-[1.65]">
                      {item.diff.map((d, k) => (
                        <div
                          key={k}
                          className={
                            d.op === "+"
                              ? "bg-[#0e2a10] text-[#a7f0ba] -mx-3 px-3 border-l-2 border-[#42be65]"
                              : d.op === "-"
                                ? "bg-[#2a0e0e] text-[#ffb3b8] -mx-3 px-3 border-l-2 border-[#fa4d56] line-through decoration-[#fa4d56]/60"
                                : "text-[#a8a8a8]"
                          }
                        >
                          <span className="select-none mr-2 opacity-60">{d.op}</span>
                          {d.text}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              if (item.kind === "tool_result_json") {
                return (
                  <div key={absoluteIdx} className="ml-10 rounded-sm border border-[#262626] bg-[#0f0f0f] px-3 py-2.5 animate-[fadeIn_0.25s_ease]">
                    <div className="font-mono text-[11px] text-[#8d8d8d] mb-1">response · 42ms</div>
                    <pre className="font-mono text-[11.5px] leading-[1.6] text-[#8cc8ff] whitespace-pre-wrap break-all">{item.json}</pre>
                  </div>
                );
              }

              return null;
            })}
          </div>

          {/* Assistant streaming */}
          {visible > assistantIdx - 1 && (
            <div className="mt-4 flex gap-3">
              <span className="shrink-0 mt-[2px] h-6 w-6 rounded-full bg-[#0f62fe] grid place-items-center text-white text-[11px] font-bold">✦</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] tracking-[0.08em] uppercase text-[#8d8d8d]">Ventic agent</span>
                  <span className="text-[11px] text-[#6f6f6f]">· claude sonnet 4.5</span>
                  {done && <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-[#42be65]">● streaming done</span>}
                </div>
                <div className="mt-1.5 text-[13px] leading-[1.65] text-[#f4f4f4]">
                  {visible >= assistantIdx + 1
                    ? (TRANSCRIPT[assistantIdx] as Extract<TranscriptItem, { kind: "assistant" }>).text
                    : typedAssistant}
                  {visible === assistantIdx && typedAssistant.length < (TRANSCRIPT[assistantIdx] as any).text.length && (
                    <span className="inline-block w-[7px] h-[14px] bg-[#f4f4f4] ml-0.5 translate-y-[2px] animate-pulse" />
                  )}
                </div>

                {/* inline metrics card when assistant visible */}
                {(visible >= assistantIdx || typedAssistant.length > 40) && (
                  <div className="mt-3 grid grid-cols-3 gap-2 animate-[fadeIn_0.4s_ease]">
                    <div className="border border-[#393939] bg-[#262626] px-2.5 py-2 text-center">
                      <div className="font-mono text-[10px] tracking-wide uppercase text-[#8d8d8d]">Prefill</div>
                      <div className="mt-0.5 text-[14px] font-medium text-white">2.1 ms</div>
                    </div>
                    <div className="border border-[#393939] bg-[#262626] px-2.5 py-2 text-center">
                      <div className="font-mono text-[10px] tracking-wide uppercase text-[#8d8d8d]">Throughput</div>
                      <div className="mt-0.5 text-[14px] font-medium text-white">1,847 tok/s</div>
                    </div>
                    <div className="border border-[#393939] bg-[#262626] px-2.5 py-2 text-center">
                      <div className="font-mono text-[10px] tracking-wide uppercase text-[#8d8d8d]">GPU</div>
                      <div className="mt-0.5 text-[14px] font-medium text-[#42be65]">94%</div>
                    </div>
                  </div>
                )}

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <button className="border border-[#393939] bg-[#262626] px-2.5 py-1 font-mono text-[11px] text-[#c6c6c6] hover:border-[#525252] transition-colors">
                    Enable auto-shutdown
                  </button>
                  <span className="inline-flex items-center gap-1.5 border border-[#393939] bg-[#161616] px-2.5 py-1 font-mono text-[11px] text-[#8d8d8d]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#42be65]" />
                    No egress · Encrypted mesh
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* bottom spacer for scroll */}
          <div className="h-1" />
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between gap-3 border-t border-[#393939] bg-[#262626] px-3 py-2 shrink-0">
        <div className="flex items-center gap-2 font-mono text-[11px] text-[#8d8d8d] min-w-0">
          <span className="hidden sm:inline truncate">esc to interrupt · 5 tools · 4.2s · /status</span>
          <span className="sm:hidden truncate">5 tools · 4.2s</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden lg:inline font-mono text-[10px] tracking-wide uppercase text-[#6f6f6f]">OpenAI compatible</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#161616] border border-[#393939] px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#42be65] animate-pulse" />
            <span className="font-mono text-[11px] text-[#c6c6c6]">localhost:8000/v1</span>
          </span>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px)} to {opacity:1; transform: translateY(0)} }
        @keyframes slideIn { from { opacity: 0; transform: translateY(6px)} to {opacity:1; transform: translateY(0)} }
        @keyframes grow { from { width: 0 } to { width: 88% } }
        .scrollbar-thin { scrollbar-width: thin; scrollbar-color: #393939 transparent; }
        .scrollbar-thin::-webkit-scrollbar { width: 6px; height: 6px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #393939; border-radius: 999px; }
      `}</style>
    </div>
  );
}

type HeroProps = {
  lang?: Lang;
};

export default function Hero({ lang = defaultLang as Lang }: HeroProps) {
  const t = (key: string) => (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  return (
    <section className="relative border-b border-[#e0e0e0] bg-white overflow-hidden">
      {/* IBM-style background — immagine lavoro + video */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        {/* Immagine di copertina: ambiente lavorativo dev (Unsplash) */}
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80"
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.07]"
        />
        {/* Wash bianco per leggibilità — IBM duotone */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50" />
        {/* Griglia IBM sottile */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Video ambiente lavorativo — desktop, lato destro mascherato */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80"
          className="hidden lg:block absolute right-0 top-0 h-full w-[56%] object-cover opacity-[0.11] [mask-image:linear-gradient(to_left,black_70%,transparent)] motion-reduce:hidden"
        >
          <source src="https://videos.pexels.com/video-files/2278095/2278095-hd_1920_1080_30fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/18069234/18069234-uhd_1440_1440_24fps.mp4" type="video/mp4" />
        </video>
        {/* Vignettatura blu IBM leggera */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#0f62fe]/[0.04] via-transparent to-transparent hidden lg:block" />
      </div>

      <div className="relative mx-auto max-w-[1584px] px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-0">
          {/* Left */}
          <div className="py-10 lg:py-16 lg:pr-12 xl:pr-16 border-b lg:border-b-0 lg:border-r border-[#e0e0e0]">
            {/* Eyebrow - IBM style */}
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-[#0f62fe]" />
              <span className="font-mono text-[12px] tracking-[0.08em] uppercase text-[#525252]">{t("hero.eyebrow")}</span>
            </div>

            <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] xl:text-[54px] font-light leading-[0.95] tracking-[-0.03em] text-[#161616]">
              {t("hero.title.line1")}
              <br />
              <span className="font-semibold">{t("hero.title.line2")}</span>
              <br />
              {t("hero.title.line3")}
            </h1>

            <p className="mt-6 max-w-[52ch] text-[16px] lg:text-[18px] leading-[1.5] text-[#525252] font-light" dangerouslySetInnerHTML={{ __html: t("hero.desc") }} />

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 bg-[#0f62fe] text-white px-6 py-3 text-[14px] font-medium hover:bg-[#0353e9] transition-colors"
              >
                {t("hero.cta.start")}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </a>
              <a
                href="#how"
                className="inline-flex items-center gap-2 border border-[#8d8d8d] px-6 py-3 text-[14px] font-medium hover:bg-[#f4f4f4] transition-colors"
              >
                {t("hero.cta.how")}
              </a>
            </div>

            {/* Trust row - IBM-style specs */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-[#e0e0e0] pt-6 max-w-[520px]">
              <div>
                <div className="font-mono text-[12px] tracking-wide text-[#6f6f6f] uppercase">{t("hero.trust.api.label")}</div>
                <div className="mt-1 text-[13px] font-medium leading-tight" dangerouslySetInnerHTML={{ __html: t("hero.trust.api.value") }} />
              </div>
              <div>
                <div className="font-mono text-[12px] tracking-wide text-[#6f6f6f] uppercase">{t("hero.trust.deploy.label")}</div>
                <div className="mt-1 text-[13px] font-medium leading-tight" dangerouslySetInnerHTML={{ __html: t("hero.trust.deploy.value") }} />
              </div>
              <div>
                <div className="font-mono text-[12px] tracking-wide text-[#6f6f6f] uppercase">{t("hero.trust.data.label")}</div>
                <div className="mt-1 text-[13px] font-medium leading-tight" dangerouslySetInnerHTML={{ __html: t("hero.trust.data.value") }} />
              </div>
            </div>
          </div>

          {/* Right - animated agent chat */}
          <div className="bg-[#f4f4f4] lg:bg-white py-8 lg:py-12 lg:pl-8 xl:pl-12">
            <AgentCard />
            {/* Pill row - updated for agent context */}
            <div className="mt-4 flex flex-wrap gap-2 font-mono text-[11px]">
              <span className="border border-[#e0e0e0] bg-white px-2.5 py-1.5 text-[#525252]">{t("hero.pills.compat")}</span>
              <span className="border border-[#e0e0e0] bg-white px-2.5 py-1.5 text-[#525252]">{t("hero.pills.vllm")}</span>
              <span className="border border-[#e0e0e0] bg-white px-2.5 py-1.5 text-[#525252] hidden sm:inline">{t("hero.pills.mesh")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
