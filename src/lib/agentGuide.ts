import type { Lang } from "../i18n/content";

/** The guide sources, read at build time so the copied text never drifts from the page. */
const sources = import.meta.glob("../pages/{demo,en/demo}.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

const TEMPLATE_URL = "https://github.com/nettersrl/ventic-provider-template";

function guideMarkdown(lang: Lang): string {
  const raw = sources[lang === "it" ? "../pages/demo.md" : "../pages/en/demo.md"] ?? "";
  return raw
    .replace(/^---\n[\s\S]*?\n---\n/, "") // frontmatter
    .replace(/<h2 id="[^"]*">([\s\S]*?)<\/h2>/g, "## $1") // headings written as HTML for anchors
    .trim();
}

const rules = {
  en: `# Task: deploy my own Ventic instance on my Kubernetes cluster

You are a deployment agent running in my terminal. The full guide follows after the rules below. Follow it step by step to install Ventic from the official provider template (${TEMPLATE_URL}) and the signed release, on my own infrastructure.

## Rules
1. First list everything you need from me (domain, kubeconfig path and context, cluster UID, SMTP and S3 details, where the licence key and release public key are stored, model endpoint). Check prerequisites (git, Python 3.12+, Helm, kubectl) before anything else.
2. Never invent values. Ask me for every placeholder (<LIKE-THIS>, example.org, acme-demo) and for every value I must supply.
3. Never print, log, commit or paste secrets: licence key, kubeconfig, OpenBao material, tokens, passwords. Keep them in files under private/ (directories 0700, files 0600) and refer to them by path.
4. Explain each step before you run it. Run read-only checks first. Ask for my confirmation before any command that changes the cluster or my accounts (kubectl apply, helm, make deploy-*, controller bootstrap).
5. Verify the kubeconfig context and the cluster UID before every write. Never use demo settings on a production cluster. Never disable TLS verification or skip signature, checksum or pin checks.
6. Some steps are mine: registering on Licman and requesting the demo key, obtaining the release public key through an independent trusted channel, creating DNS records, initialising OpenBao and storing recovery shares. Tell me exactly what to do, then wait for me.
7. On any failure, stop and show me the exact error output and your diagnosis. Do not work around it silently.
8. When you are done, run the verification steps from the guide and report what is running, which URLs are live and what is still pending.

Start now with rule 1.

---

# Ventic deployment guide
`,
  it: `# Compito: installare la mia istanza Ventic sul mio cluster Kubernetes

Sei un agente di deployment che lavora nel mio terminale. Dopo le regole trovi la guida completa. Seguila passo per passo per installare Ventic dal template ufficiale (${TEMPLATE_URL}) e dalla release firmata, sulla mia infrastruttura.

## Regole
1. Elenca prima tutto ciò che ti serve da me (dominio, percorso e contesto del kubeconfig, UID del cluster, dati SMTP e S3, dove sono la chiave di licenza e la chiave pubblica di release, endpoint del modello). Verifica i prerequisiti (git, Python 3.12+, Helm, kubectl) prima di tutto il resto.
2. Non inventare valori. Chiedimi ogni segnaposto (<COSI>, example.org, acme-demo) e ogni valore che devo fornire io.
3. Non stampare, registrare, committare o incollare segreti: chiave di licenza, kubeconfig, materiale OpenBao, token, password. Tienili in file sotto private/ (directory 0700, file 0600) e indicali solo per percorso.
4. Spiega ogni passo prima di eseguirlo. Esegui prima i controlli in sola lettura. Chiedi la mia conferma prima di ogni comando che modifica il cluster o i miei account (kubectl apply, helm, make deploy-*, bootstrap dei controller).
5. Verifica contesto del kubeconfig e UID del cluster prima di ogni scrittura. Non usare impostazioni demo su un cluster di produzione. Non disattivare mai la verifica TLS né i controlli di firma, checksum o pin.
6. Alcuni passi sono miei: registrarmi su Licman e richiedere la chiave demo, ottenere la chiave pubblica di release da un canale fidato indipendente, creare i record DNS, inizializzare OpenBao e custodire le recovery share. Dimmi esattamente cosa fare, poi aspetta.
7. In caso di errore fermati e mostrami l'output esatto e la tua diagnosi. Non aggirarlo in silenzio.
8. Alla fine esegui le verifiche della guida e riportami cosa è in esecuzione, quali URL sono attivi e cosa resta da fare.

Parti ora dalla regola 1.

---

# Guida al deployment di Ventic
`,
};

/** Rules for the agent + the complete guide, ready to paste. */
export function agentPrompt(lang: Lang): string {
  return `${rules[lang]}\n${guideMarkdown(lang)}\n`;
}

export const agentLabels = {
  it: {
    copy: "Copia la guida per il tuo agente AI",
    copied: "Copiato: incollalo nel tuo agente",
    download: "Scarica .md",
    hint: "Incolla il testo in Claude Code, Codex o un altro agente di coding per automatizzare il deploy. Le regole incluse gli impongono di chiederti i valori e di non esporre segreti.",
    failed: "Copia non riuscita: usa Scarica .md",
  },
  en: {
    copy: "Copy the guide for your AI agent",
    copied: "Copied: paste it into your agent",
    download: "Download .md",
    hint: "Paste it into Claude Code, Codex or another coding agent to automate the deploy. The included rules make it ask you for values and never expose secrets.",
    failed: "Copy failed: use Download .md",
  },
} as const;
