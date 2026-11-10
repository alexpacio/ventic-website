#!/usr/bin/env node
// Usage: node --env-file=.env scripts/send-mail.mjs --html mail.html --subject "Oggetto" --to list.txt [--send]
// list.txt: one recipient per line, "email" or "email,Name". Default is dry-run; --send actually sends.
// shortcut: uses Brevo's per-recipient transactional API (no contact lists/stats), switch to Brevo Campaigns API for big or tracked sends.
import { readFileSync } from 'node:fs';
import { parseArgs } from 'node:util';

const { values: a } = parseArgs({
  options: {
    html: { type: 'string' },
    subject: { type: 'string' },
    to: { type: 'string' },
    send: { type: 'boolean', default: false },
    delay: { type: 'string', default: '1000' }, // ms between sends
  },
});

const { BREVO_API_KEY, BREVO_SENDER_EMAIL, BREVO_SENDER_NAME = 'Ventic', BREVO_UNSUBSCRIBE_MAILTO } = process.env;
if (!BREVO_API_KEY || !BREVO_SENDER_EMAIL) throw new Error('Set BREVO_API_KEY and BREVO_SENDER_EMAIL (a sender verified in Brevo) in .env');
if (!a.html || !a.subject || !a.to) throw new Error('Required: --html <file> --subject <text> --to <list.txt>');

const html = readFileSync(a.html, 'utf8');
const recipients = readFileSync(a.to, 'utf8')
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#'))
  .map((l) => {
    const [email, ...name] = l.split(',');
    return { email: email.trim(), name: name.join(',').trim() || undefined };
  });

const bad = recipients.filter((r) => !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(r.email));
if (bad.length) throw new Error(`Invalid addresses: ${bad.map((r) => r.email).join(', ')}`);
if (recipients.length > 300) console.warn('Warning: Brevo free plan allows ~300 emails/day.');

console.log(`${a.send ? 'SENDING' : 'DRY RUN'}: "${a.subject}" to ${recipients.length} recipients`);
if (!a.send) {
  recipients.forEach((r) => console.log(' -', r.email));
  console.log('Re-run with --send to deliver.');
  process.exit(0);
}

const headers = BREVO_UNSUBSCRIBE_MAILTO
  ? { 'List-Unsubscribe': `<mailto:${BREVO_UNSUBSCRIBE_MAILTO}?subject=unsubscribe>` }
  : undefined;

let ok = 0;
for (const r of recipients) {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': BREVO_API_KEY, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      sender: { email: BREVO_SENDER_EMAIL, name: BREVO_SENDER_NAME },
      to: [r],
      subject: a.subject,
      htmlContent: html,
      headers,
    }),
  });
  if (res.ok) ok++;
  console.log(res.ok ? 'OK  ' : `FAIL ${res.status}`, r.email, res.ok ? '' : await res.text());
  await new Promise((s) => setTimeout(s, Number(a.delay)));
}
console.log(`Done: ${ok}/${recipients.length} sent`);
