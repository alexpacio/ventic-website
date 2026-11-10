import * as React from "react";
import { TrustcaptchaComponent } from "@trustcomponent/trustcaptcha-react";
import { defineCustomElements } from "@trustcomponent/trustcaptcha-frontend/loader";

// Register custom elements once (client-side)
if (typeof window !== "undefined") {
  try {
    defineCustomElements(window);
  } catch {}
}

interface Props {
  sitekey: string;
  lang?: "it" | "en";
}

export default function GlobalTrustCaptcha({ sitekey, lang = "it" }: Props) {
  const [verified, setVerified] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSolved = React.useCallback((event: CustomEvent<string>) => {
    const token = event.detail;
    setVerified(true);
    setError(null);
    // Dispatch global event that ObfuscatedEmail listeners already handle (Layout.astro)
    window.dispatchEvent(
      new CustomEvent("ventic:humanVerified", {
        detail: { token, provider: "trustcaptcha" },
      })
    );
    // Also set global flag for immediate checks
    (window as any).__venticHumanVerified = true;
    (window as any).__venticTrustToken = token;
  }, []);

  const handleFailed = React.useCallback((event: CustomEvent<any>) => {
    setError(event.detail?.message || "Verifica fallita");
    setVerified(false);
  }, []);

  const handleExpired = React.useCallback(() => {
    setVerified(false);
    setError(lang === "it" ? "Verifica scaduta, riprova" : "Verification expired, try again");
  }, [lang]);

  // Hide error after 3s
  React.useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(null), 3000);
    return () => clearTimeout(t);
  }, [error]);

  return (
    <div
      className="trustcaptcha-gate"
      data-trustcaptcha-gate
      data-verified={verified ? "1" : "0"}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        gap: 6,
        padding: verified ? 0 : 10,
        background: verified ? "transparent" : "#ffffff",
        border: verified ? "none" : "1px solid #e0e0e0",
        borderRadius: 4,
        maxWidth: 320,
      }}
    >
      {!verified ? (
        <>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <span style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 11, color: "#525252", letterSpacing: ".04em" }}>
              {lang === "it" ? "Protezione anti-spam" : "Anti-spam protection"}
            </span>
            <span style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 9, color: "#6f6f6f", letterSpacing: ".08em" }}>
              TrustCaptcha
            </span>
          </div>
          <TrustcaptchaComponent
            sitekey={sitekey}
            language={lang}
            theme="light"
            onCaptchaSolved={handleSolved as any}
            onCaptchaFailed={handleFailed as any}
            onCaptchaExpired={handleExpired as any}
          />
          {error && (
            <span style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: 10, color: "#c4361a" }}>{error}</span>
          )}
        </>
      ) : (
        <span
          style={{
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: 11,
            color: "#0b6b5e",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          ✓ {lang === "it" ? "Verifica completata — email sbloccata" : "Verified — email unlocked"}
        </span>
      )}
    </div>
  );
}
