import type { Lang } from "./content";
import { pick } from "./onprem";

/* Copy for the animated "how it works" sections. Values shown in the
   inspectors (tenant, amounts, scores) are illustrative. */

export function howto(lang: Lang) {
  const t = pick(lang);
  const raw = t(
    "Riassumi il contratto di Mario Rossi, IBAN IT60 X054 2811 1010 0000 0123 456",
    "Summarise the contract of Mario Rossi, IBAN IT60 X054 2811 1010 0000 0123 456",
  );
  const masked = t("Riassumi il contratto di [PERSONA_1], IBAN [IBAN_1]", "Summarise the contract of [PERSON_1], IBAN [IBAN_1]");

  return {
    toc: [
      ["ciclo", t("Ciclo di una richiesta", "Request lifecycle")],
      ["riconciliazione", t("Infrastruttura dichiarativa", "Declarative infrastructure")],
      ["agent", "Ventic Agent"],
      ["switchyard", t("Routing Switchyard", "Switchyard routing")],
    ] as [string, string][],

    life: {
      plate: t("Ciclo di una richiesta", "Request lifecycle"),
      title: t("Prima si verifica, si maschera e si riserva. Poi si genera.", "First verify, mask and reserve. Then generate."),
      prev: t("Passaggio precedente", "Previous step"),
      next: t("Passaggio successivo", "Next step"),
      play: t("Riproduci", "Play"),
      pause: t("Pausa", "Pause"),
      stepWord: t("Passaggio", "Step"),
      inspector: t("Ispettore richiesta", "Request inspector"),
      example: t("esempio", "example"),
      budget: t("Budget della chiave", "Key budget"),
      reserved: t("riservato", "reserved"),
      charged: t("addebitato", "charged"),
      principal: [["TENANT", "acme-eu"], [t("MODELLI", "MODELS"), "qwen3.8-flash-next"], ["PII", ""]] as [string, string][],
      piiOn: t("attiva", "active"),
      piiReq: t("richiesta", "required"),
      wallet: [t("€1,00 disponibile", "€1.00 available"), t("€0,40 riservati · €0,60 liberi", "€0.40 reserved · €0.60 free"), t("€0,12 addebitati · €0,28 rilasciati", "€0.12 charged · €0.28 released")],
      stages: [
        { label: "Client", svc: t("agente · SDK", "agent · SDK"), title: t("Il tuo agente invia una richiesta", "Your agent sends a request"),
          body: t("Un agente di coding, un'app interna o la chat usano il protocollo che conoscono già: Chat Completions, Responses o Messages. Cambia solo il base_url.", "A coding agent, an internal app or the chat use the protocol they already speak: Chat Completions, Responses or Messages. Only the base_url changes."),
          points: [t("Compatibile con i client OpenAI e Anthropic", "Compatible with OpenAI and Anthropic clients"), t("Chiave API con limiti di spesa e di rate", "API key with spend and rate limits")],
          payloadLabel: "POST /v1/chat/completions", payload: raw },
        { label: t("Identità", "Identity"), svc: "gateway → control", title: t("La chiave diventa un Principal", "The key becomes a Principal"),
          body: t("Il gateway non si fida dei campi inviati dal client. Chiede a Control di verificare la chiave: ne escono tenant, wallet, modelli permessi, PII e limiti.", "The gateway does not trust client-supplied fields. It asks Control to introspect the key: out come tenant, wallet, allowed models, PII and limits."),
          points: [t("Rate limit applicati prima di tutto", "Rate limits applied first"), t("Single sign-on OIDC per persone, chiavi per agenti", "OIDC single sign-on for people, keys for agents")],
          payloadLabel: t("richiesta validata", "validated request"), payload: raw },
        { label: "Policy", svc: "control", title: t("Licenza, policy e route autorizzata", "Licence, policy and authorised route"),
          body: t("Control verifica licenza, controlli sul modello e funzioni abilitate, poi risolve la route: provider o deployment, modello reale, prezzi e limiti.", "Control checks licence, model controls and enabled features, then resolves the route: provider or deployment, real model, prices and limits."),
          points: [t("Le policy valgono anche se la UI nasconde un pulsante", "Policies apply even when the UI hides a button"), t("Switchyard sceglie fra i candidati autorizzati", "Switchyard picks among authorised candidates")],
          payloadLabel: t("route risolta → qwen3.8-flash-next @ gpu-pool", "route resolved → qwen3.8-flash-next @ gpu-pool"), payload: raw },
        { label: "PII", svc: t("servizio pii", "pii service"), title: t("I dati sensibili non lasciano il perimetro", "Sensitive data stays inside the perimeter"),
          body: t("Se la policy lo richiede, il testo viene mascherato con segnaposto opachi. La mappa per ripristinarlo è cifrata (AES-256-GCM) e legata a tenant, utente e contesto.", "When policy requires it, text is masked with opaque placeholders. The map to restore it is encrypted (AES-256-GCM) and bound to tenant, user and context."),
          points: [t("Rilevatori approvati, scelti per policy", "Approved detectors, chosen by policy"), t("Il modello vede solo i segnaposto", "The model only sees placeholders")],
          payloadLabel: t("payload mascherato", "masked payload"), payload: masked },
        { label: t("Riserva", "Hold"), svc: "billing", title: t("Il budget si blocca prima di generare", "Budget is held before generating"),
          body: t("Billing riserva il costo massimo possibile sul wallet. Wallet o budget della chiave insufficienti? La richiesta si ferma qui, senza alcun invio.", "Billing reserves the maximum possible cost on the wallet. Not enough wallet or key budget? The request stops here, nothing is sent."),
          points: [t("Transazioni PostgreSQL, aritmetica decimale", "PostgreSQL transactions, decimal arithmetic"), t("Nessuna sorpresa a fine mese", "No surprises at month end")],
          payloadLabel: t("payload mascherato", "masked payload"), payload: masked },
        { label: t("Inferenza", "Inference"), svc: "agent · runtime", title: t("Generazione sul target scelto, in streaming", "Generation on the chosen target, streamed"),
          body: t("La richiesta arriva al Ventic Agent attraverso il relay e al runtime (vLLM, SGLang…), o al provider cloud. La risposta torna token per token, in SSE non bufferizzato.", "The request reaches the Ventic Agent through the relay and the runtime (vLLM, SGLang…), or the cloud provider. The answer streams back token by token, as unbuffered SSE."),
          points: [t("Fallback pre-validati entro il budget riservato", "Pre-validated fallbacks within the reserved budget"), t("Se il client si disconnette, lo stream si interrompe", "If the client disconnects, the stream stops")],
          payloadLabel: t("stream in arrivo", "incoming stream"), payload: t("Il contratto di [PERSONA_1] prevede un canone mensile con accredito su [IBAN_1]…", "The contract of [PERSON_1] sets a monthly fee credited to [IBAN_1]…") },
        { label: t("Saldo", "Settle"), svc: "gateway → billing", title: t("Testo ripristinato, costo reale addebitato", "Text restored, real cost charged"),
          body: t("I segnaposto tornano ai valori originali mentre lo stream scorre. Billing addebita il consumo effettivo e libera il resto della riserva.", "Placeholders return to their original values as the stream flows. Billing charges actual usage and releases the rest of the hold."),
          points: [t("Uso mancante? Resta in riconciliazione, mai «zero»", "Missing usage? It stays in reconciliation, never \"zero\""), t("Mai un addebito oltre la riserva", "Never a charge above the hold")],
          payloadLabel: t("risposta al client", "response to client"), payload: t("Il contratto di Mario Rossi prevede un canone mensile con accredito su IT60 X054 2811 1010 0000 0123 456…", "The contract of Mario Rossi sets a monthly fee credited to IT60 X054 2811 1010 0000 0123 456…") },
      ],
    },

    rec: {
      plate: t("Infrastruttura dichiarativa", "Declarative infrastructure"),
      title: t("Scrivi cosa vuoi. Ventic lo rende vero, e lo mantiene tale.", "Write what you want. Ventic makes it real, and keeps it so."),
      lead: t("Pool di GPU, deployment, routing e autoscaling sono risorse ventic.io/v1. Un reconciler le porta allo stato desiderato, in ordine di dipendenza.", "GPU pools, deployments, routing and autoscaling are ventic.io/v1 resources. A reconciler brings them to the desired state, in dependency order."),
      loopLabel: t("Ciclo di riconciliazione: manifest, validazione, stato desiderato, coda, adapter, stato osservato", "Reconciliation loop: manifest, validation, desired state, queue, adapter, observed state"),
      goal: t("obiettivo", "goal"),
      goalText: [t("desiderato", "desired"), t("= osservato", "= observed")],
      loop: [t("Manifest", "Manifest"), t("Validazione", "Validation"), t("Stato desiderato", "Desired state"), t("Coda", "Queue"), "Adapter", t("Stato osservato", "Observed state")],
      file: "team-model.yaml",
      example: t("esempio", "example"),
      yaml: "apiVersion: ventic.io/v1\nkind: InferenceDeployment\nmetadata:\n  name: team-model\nspec:\n  runtime: vllm\n  model: qwen3.8-flash-next\n  computePoolRef: gpu-pool\n  desiredState: running\n---\nkind: InferenceRoutingPolicy\nspec:\n  deploymentRef: team-model",
      term: [
        ["$", "venticli apply -f team-model.yaml", ""],
        ["ok", "ComputePool            gpu-pool      Ready", ""],
        ["ok", "InferenceDeployment    team-model    Ready", "gen 3 · observed 3"],
        ["wait", "InferenceRoutingPolicy team-routing  Blocked", t("→ attende team-model", "→ waits for team-model")],
      ] as [string, string, string][],
    },

    agent: {
      plate: "Ventic Agent",
      title: t("La GPU chiama la piattaforma. Mai il contrario.", "The GPU calls the platform. Never the other way round."),
      lead: t("L'agent apre una connessione WSS in uscita e pubblica l'inventario dei runtime. L'inferenza viaggia su quel canale: sul server GPU non serve alcuna porta in ingresso.", "The agent opens an outbound WSS connection and publishes the runtime inventory. Inference travels on that channel: the GPU server needs no inbound port."),
      net: t("La tua rete · server GPU", "Your network · GPU server"),
      detected: t("runtime rilevati", "detected runtimes"),
      runtimes: ["vLLM", "SGLang", "llama.cpp", "Ollama"],
      firewall: t("firewall · 0 porte in ingresso", "firewall · 0 inbound ports"),
      out: t("WSS in uscita · inventario →", "outbound WSS · inventory →"),
      back: t("← frame di inferenza", "← inference frames"),
      platform: t("Piattaforma Ventic · Kubernetes", "Ventic platform · Kubernetes"),
      boxes: [t("Control · relay degli agent", "Control · agent relay"), "Gateway", t("Billing · PII · Telemetria", "Billing · PII · Telemetry")],
      steps: [
        ["01 · PAIRING", t("Un invito autorizzato lega l'agent alla tua installazione e al tenant.", "An authorised invitation binds the agent to your installation and tenant.")],
        [t("02 · INVENTARIO", "02 · INVENTORY"), t("Ispeziona i runtime configurati, non indovina dal nome del modello.", "Inspects the configured runtimes instead of guessing from the model name.")],
        ["03 · RELAY", t("Frame limitati e streaming incrementale. Un agent disconnesso non completa lavoro altrui.", "Bounded frames and incremental streaming. A disconnected agent cannot complete someone else's work.")],
        [t("04 · AGGIORNAMENTI", "04 · UPDATES"), t("Manifest firmati con hash verificati prima dell'installazione.", "Signed manifests with hashes verified before installation.")],
      ] as [string, string][],
    },

    sw: {
      plate: t("Routing Switchyard", "Switchyard routing"),
      title: t("Il modello giusto per ogni richiesta. Al costo giusto.", "The right model for every request. At the right cost."),
      lead: t("Switchyard valuta l'idoneità di ogni route autorizzata e ordina i candidati per costo. Il frontier resta per le sfide difficili; il resto va ai tuoi target.", "Switchyard scores the suitability of every authorised route and ranks candidates by cost. Frontier stays for the hard problems; the rest goes to your targets."),
      group: t("Tipo di richiesta", "Request type"),
      routine: t("Richiesta di routine", "Routine request"),
      hard: t("Sfida difficile", "Hard problem"),
      cols: [t("Route candidata", "Candidate route"), t("Idoneità", "Suitability"), t("Costo", "Cost")],
      chosen: t("SCELTA", "CHOSEN"),
      note: t("Il costo massimo viene riservato sul wallet prima dell'invio.", "The maximum cost is reserved on the wallet before dispatch."),
      routine_rows: [
        ["qwen3.8-flash-next", t("gpu-node-01 · locale", "gpu-node-01 · on-prem"), 92, "€", true],
        ["deepseek-v4.1-flash", "neocloud-eu-02 · FP8", 90, "€", false],
        ["kimi-k3.1", "BYOK", 81, "€€", false],
        [t("modello-frontier", "frontier-model"), t("provider cloud", "cloud provider"), 98, "€€€", false],
      ] as [string, string, number, string, boolean][],
      hard_rows: [
        [t("modello-frontier", "frontier-model"), t("provider cloud", "cloud provider"), 96, "€€€", true],
        ["kimi-k3.1", "neocloud-eu-02 · FP8", 78, "€€", false],
        ["deepseek-v4.1-flash", "neocloud-eu-02 · BF16", 74, "€", false],
        ["qwen3.8-flash-next", t("gpu-node-01 · locale", "gpu-node-01 · on-prem"), 66, "€", false],
      ] as [string, string, number, string, boolean][],
    },

    helm: {
      plate: t("Installazione", "Installation"),
      title: t("Una distribuzione Kubernetes firmata, in quattro strati.", "A signed Kubernetes distribution, in four layers."),
      layers: [
        ["-edge", t("Ingress e WAF", "Ingress and WAF"), "#161616"],
        ["-app", t("Gateway, Control, Billing, portale", "Gateway, Control, Billing, portal"), "var(--accent)"],
        ["-data", t("PostgreSQL, Valkey, storage", "PostgreSQL, Valkey, storage"), "var(--jade)"],
        ["-ops", t("Job, telemetria, backup", "Jobs, telemetry, backups"), "var(--amber)"],
      ] as [string, string, string][],
    },
  };
}
