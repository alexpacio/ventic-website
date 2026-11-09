import type { Lang } from "./content";

export const contactPath = (lang: Lang) => (lang === "en" ? "/en/contatti/" : "/contatti/");

export function contact(lang: Lang) {
  return lang === "en"
    ? {
        seo: { title: "Contact — Ventic", desc: "Talk to the Ventic team: send a message or open a live chat." },
        plate: "Contact",
        title: ["Let's talk", "about your stack."],
        lead: "Tell us about your workloads and hardware. We reply within one business day.",
        form: {
          name: "Name", email: "Work email", company: "Company", topic: "Topic", message: "Message",
          topics: ["Request access / demo", "Pricing and licensing", "On-premise", "Other"],
          consent: "I agree to be contacted about my request. See the",
          privacy: "privacy policy",
          send: "Send message", sending: "Sending…",
          ok: "Thanks! Your message has been sent. We'll reply soon.",
          err: "Something went wrong. Please try again or write to us by email.",
          missing: "The contact form is not configured yet. Write to us by email instead:",
          invalid: "Please fill in name, a valid email and a message.",
        },
        chat: { open: "Chat with us", side: "Prefer talking now?", sideBody: "Open a live chat with the team. The chat provider loads only when you click." },
        lang: "en",
      }
    : {
        seo: { title: "Contatti — Ventic", desc: "Parla con il team Ventic: scrivici un messaggio o apri la chat dal vivo." },
        plate: "Contatti",
        title: ["Parliamo del", "tuo stack."],
        lead: "Raccontaci i tuoi workload e il tuo hardware. Rispondiamo entro un giorno lavorativo.",
        form: {
          name: "Nome", email: "Email aziendale", company: "Azienda", topic: "Argomento", message: "Messaggio",
          topics: ["Richiesta accesso / demo", "Prezzi e licenze", "On-premise", "Altro"],
          consent: "Acconsento ad essere ricontattato per la mia richiesta. Vedi la",
          privacy: "informativa privacy",
          send: "Invia messaggio", sending: "Invio…",
          ok: "Grazie! Il messaggio è stato inviato. Ti risponderemo presto.",
          err: "Qualcosa è andato storto. Riprova o scrivici via email.",
          missing: "Il form di contatto non è ancora configurato. Scrivici via email:",
          invalid: "Inserisci nome, un'email valida e un messaggio.",
        },
        chat: { open: "Chatta con noi", side: "Preferisci parlare subito?", sideBody: "Apri la chat dal vivo con il team. Il fornitore della chat viene caricato solo al click." },
        lang: "it",
      };
}
