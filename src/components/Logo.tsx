import { useId } from "react";

type MarkVariant = "color" | "mono-white" | "mono-dark";
type MarkProps = {
  size?: number;
  className?: string;
  variant?: MarkVariant;
  animated?: boolean;
};

export function LogoMark({ size = 28, className, variant = "color", animated = false }: MarkProps) {
  const uid = useId().replace(/:/g, "");
  const gradId = `ventic-grad-${uid}`;
  const hlId = `ventic-hl-${uid}`;
  const isMonoWhite = variant === "mono-white";
  const isMonoDark = variant === "mono-dark";
  const isMono = isMonoWhite || isMonoDark;

  // mono-white: white V on dark bg (for header dark #161616)
  // mono-dark: dark V on light bg (for minimal footer watermark)
  const vFill = isMonoWhite ? "white" : isMonoDark ? "#161616" : "white";
  const diamondOuter = isMonoWhite ? "white" : isMonoDark ? "#161616" : "white";
  const diamondInner = isMonoWhite ? "#161616" : isMonoDark ? "white" : "#0f62fe";
  const microLineFill = vFill;
  const meshFill = isMono ? vFill : "white";
  const borderStroke = isMonoWhite ? "rgba(255,255,255,0.18)" : isMonoDark ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.14)";

  return (
    <span className={`inline-flex ${animated ? "group/logo" : ""} ${className ?? ""}`} style={{ lineHeight: 0 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={`shrink-0 select-none ${animated ? "ventic-mark" : ""}`}
        style={{ display: "block" }}
      >
        {/* Background */}
        {!isMono ? (
          <>
            <rect width="32" height="32" rx="8" fill="#0f62fe" />
            <rect width="32" height="32" rx="8" fill={`url(#${gradId})`} />
            <path
              d="M8 0.75H24C28.0041 0.75 31.25 3.99594 31.25 8V14.5C31.25 14.5 30.2 3 16 3C3.5 3 0.75 14 0.75 14V8C0.75 3.99594 3.99594 0.75 8 0.75Z"
              fill={`url(#${hlId})`}
              opacity="0.95"
            />
          </>
        ) : isMonoWhite ? (
          <>
            <rect width="32" height="32" rx="8" fill="#161616" />
            <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" stroke="white" strokeOpacity="0.14" />
            {/* subtle inner gloss for mono-white */}
            <path
              d="M8 0.75H24C28.0041 0.75 31.25 3.99594 31.25 8V14.5C31.25 14.5 30.2 3 16 3C3.5 3 0.75 14 0.75 14V8C0.75 3.99594 3.99594 0.75 8 0.75Z"
              fill="white"
              opacity="0.06"
            />
          </>
        ) : (
          <>
            <rect width="32" height="32" rx="8" fill="white" />
            <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" stroke={borderStroke} />
          </>
        )}

        {/* Mesh dots */}
        <g opacity={isMono ? 0.14 : 0.14}>
          <circle cx="6.5" cy="8.5" r="0.85" fill={meshFill} />
          <circle cx="25.5" cy="8.5" r="0.85" fill={meshFill} />
          <circle cx="6.5" cy="25.2" r="0.85" fill={meshFill} />
          <circle cx="25.5" cy="25.2" r="0.85" fill={meshFill} />
          <circle cx="16" cy="6.2" r="0.7" fill={meshFill} />
          <circle cx="9.5" cy="16.8" r="0.55" fill={meshFill} />
          <circle cx="22.5" cy="16.8" r="0.55" fill={meshFill} />
        </g>

        {!isMono && <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" stroke={borderStroke} />}

        {/* V — left leg */}
        <path
          className={animated ? "ventic-v-leg ventic-v-leg--left" : undefined}
          d="M8.9 9.2L15.05 23.35L13.35 23.35L7.2 9.2H8.9Z"
          fill={vFill}
          opacity={isMono ? 1 : 0.98}
        />
        {/* V — right leg */}
        <path
          className={animated ? "ventic-v-leg ventic-v-leg--right" : undefined}
          d="M23.1 9.2L16.95 23.35L18.65 23.35L24.8 9.2H23.1Z"
          fill={vFill}
          opacity={isMono ? 1 : 0.98}
        />
        {/* Center spine */}
        <path
          className={animated ? "ventic-v-center" : undefined}
          d="M10.35 9.2L16 22.1L21.65 9.2H19.75L16 18.55L12.25 9.2H10.35Z"
          fill={vFill}
        />
        {/* Apex diamond node */}
        <g className={animated ? "ventic-diamond" : undefined} style={animated ? { transformOrigin: "16px 20.3px" } : undefined}>
          <rect x="14.85" y="19.15" width="2.3" height="2.3" rx="0.55" fill={diamondOuter} transform="rotate(45 16 20.3)" />
          <rect x="15.35" y="19.65" width="1.3" height="1.3" rx="0.25" fill={diamondInner} transform="rotate(45 16 20.3)" opacity="0.95" />
        </g>
        {/* Micro accent top line */}
        <rect
          className={animated ? "ventic-accent" : undefined}
          x="11.2"
          y="9.2"
          width="9.6"
          height="0.9"
          rx="0.45"
          fill={microLineFill}
          opacity={isMono ? 0.92 : 0.92}
        />

        {!isMono && (
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0f62fe" />
              <stop offset="0.55" stopColor="#184bff" />
              <stop offset="1" stopColor="#6b2bff" />
            </linearGradient>
            <linearGradient id={hlId} x1="16" y1="0" x2="16" y2="14" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0.22" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        )}
      </svg>
      {animated && (
        <style>{`
          .group\\/logo .ventic-mark { transition: transform 280ms cubic-bezier(0.2,0.8,0.2,1); }
          .group\\/logo:hover .ventic-mark { transform: translateY(-0.5px) scale(1.015) rotate(-0.6deg); }
          .ventic-diamond { transition: transform 320ms cubic-bezier(0.2,0.8,0.2,1), filter 320ms ease; transform-box: fill-box; }
          .group\\/logo:hover .ventic-diamond { transform: scale(1.18) rotate(45deg); filter: drop-shadow(0 0 5px rgba(107,43,255,0.55)) drop-shadow(0 0 10px rgba(15,98,254,0.45)); }
          .ventic-v-center { transition: transform 300ms ease, opacity 300ms ease; transform-origin: 16px 15px; }
          .group\\/logo:hover .ventic-v-center { transform: translateY(-0.4px); }
          .ventic-v-leg { transition: transform 300ms ease; }
          .group\\/logo:hover .ventic-v-leg--left { transform: translateX(-0.35px); }
          .group\\/logo:hover .ventic-v-leg--right { transform: translateX(0.35px); }
          .ventic-accent { transition: opacity 300ms ease, transform 300ms ease; transform-origin: center; }
          .group\\/logo:hover .ventic-accent { opacity: 1; transform: scaleX(1.06); }
          /* idle subtle pulse for diamond when animated but not hovered */
          @keyframes ventic-pulse {
            0%, 100% { opacity: 0.95; transform: scale(1) rotate(45deg); }
            50% { opacity: 1; transform: scale(1.06) rotate(45deg); }
          }
          .group\\/logo .ventic-diamond rect:first-child { animation: ventic-pulse 2.8s ease-in-out infinite; transform-origin: 16px 20.3px; }
          .group\\/logo:hover .ventic-diamond rect:first-child { animation: none; }
        `}</style>
      )}
    </span>
  );
}

export function LogoMarkStatic({ size = 32 }: { size?: number }) {
  return <LogoMark size={size} />;
}

type Props = {
  size?: number;
  className?: string;
  variant?: MarkVariant;
  animated?: boolean;
  showBadge?: boolean;
  badgeText?: string;
  wordmarkClassName?: string;
};

export default function Logo({
  size = 28,
  showBadge = false,
  badgeText = "",
  className,
  variant = "color",
  animated = false,
  wordmarkClassName,
}: Props) {
  const isMonoWhite = variant === "mono-white";
  const wordColor = isMonoWhite ? "text-white" : "text-[#161616]";
  const badgeCls = isMonoWhite
    ? "bg-white/10 text-white/85 border-white/20 backdrop-blur"
    : "bg-white text-[#525252] border-[#e0e0e0] shadow-[0_1px_0_rgba(0,0,0,0.04)]";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""} ${animated ? "group/logo" : ""}`}>
      <span
        className={`relative shrink-0 rounded-[8px] ${
          variant === "color"
            ? "shadow-[0_2px_10px_rgba(15,98,254,0.28),0_1px_2px_rgba(0,0,0,0.12)]"
            : variant === "mono-white"
              ? "shadow-[0_1px_8px_rgba(0,0,0,0.35)]"
              : "shadow-[0_1px_6px_rgba(0,0,0,0.08)]"
        } ${animated ? "transition-transform duration-200 group-hover/logo:scale-[1.02] group-active/logo:scale-[0.98]" : ""}`}
      >
        <LogoMark size={size} variant={variant} animated={animated} />
        {animated && variant === "color" && (
          <span className="pointer-events-none absolute inset-0 rounded-[8px] opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 shadow-[0_0_0_1px_rgba(255,255,255,0.2)_inset,0_0_16px_rgba(107,43,255,0.45)]" />
        )}
      </span>
      <span className="flex items-baseline gap-2">
        <span className={`text-[20px] font-semibold tracking-[-0.035em] leading-none ${wordColor} ${wordmarkClassName ?? ""}`}>ventic</span>
        {showBadge && (
          <span
            className={`hidden sm:inline-flex items-center font-mono text-[10px] font-medium tracking-[0.14em] leading-none px-1.5 py-1 rounded-[3px] border ${badgeCls}`}
          >
            {badgeText}
          </span>
        )}
      </span>
    </span>
  );
}
