/* eslint-disable no-console -- server logs are how a failed send gets diagnosed */

// Sends the contact form through Resend. It runs on the server because the API key must
// never reach the browser. The recipient is fixed here, so this endpoint cannot be used
// to send email to anyone else.
const RESEND_URL = "https://api.resend.com/emails";
const DEFAULT_FROM = "Portfolio Malladev <onboarding@resend.dev>";
const DEFAULT_TO = "konelamine1122@gmail.com";
const RESEND_TIMEOUT_MS = 8000;

const LIMITS = { name: 120, email: 254, subjectOther: 120, message: 5000 };

// Kept on the server: the browser sends a key, so the email subject is never free text
// unless the visitor picked "other".
const SUBJECTS = {
  web: "Application web",
  mobile: "Application mobile",
  design: "Design UX/UI",
  backend: "API & backend",
  site: "Site vitrine ou landing page",
};

const clean = (value, max) => (typeof value === "string" ? value.trim().slice(0, max) : "");
const oneLine = (value) => value.replace(/[\r\n]+/g, " ");

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

const json = (body, status) => Response.json(body, { status });

export function readMessage(body) {
  const name = oneLine(clean(body?.name, LIMITS.name));
  const email = oneLine(clean(body?.email, LIMITS.email));
  const message = clean(body?.message, LIMITS.message);
  const subjectKey = typeof body?.subject === "string" ? body.subject : "";
  const isOther = subjectKey === "other";
  const subject = isOther
    ? oneLine(clean(body?.subjectOther, LIMITS.subjectOther))
    : Object.hasOwn(SUBJECTS, subjectKey)
      ? SUBJECTS[subjectKey]
      : "";

  const isValid = name && /^\S+@\S+\.\S+$/.test(email) && message && subject;
  return isValid ? { name, email, subject, message } : null;
}

export default async (req) => {
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("contact: RESEND_API_KEY is not set");
    return json({ error: "not_configured" }, 500);
  }

  const body = await req.json().catch(() => null);

  // Honeypot: a field people never see. Bots that fill it get a success and send nothing.
  if (body?.company) return json({ ok: true }, 200);

  const contact = readMessage(body);
  if (!contact) return json({ error: "invalid" }, 400);

  const { name, email, subject, message } = contact;

  try {
    const response = await fetch(RESEND_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
      body: JSON.stringify({
        from: process.env.MAIL_FROM || DEFAULT_FROM,
        to: [process.env.MAIL_TO || DEFAULT_TO],
        reply_to: email,
        subject: `[Portfolio] ${subject} : ${name}`,
        text: `De : ${name} <${email}>\nSujet : ${subject}\n\n${message}`,
        html: `<p><strong>De :</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
<p><strong>Sujet :</strong> ${escapeHtml(subject)}</p>
<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      }),
    });

    if (!response.ok) {
      // Logs what Resend refused, never the visitor's message
      console.error("contact: Resend refused the email", response.status, await response.text());
      return json({ error: "send_failed" }, 502);
    }
  } catch (error) {
    console.error("contact: could not reach Resend", error.name);
    return json({ error: "send_failed" }, 502);
  }

  return json({ ok: true }, 200);
};

export const config = {
  path: "/api/contact",
  method: "POST",
  // Per visitor: enough for a real person, and it protects the Resend quota
  rateLimit: { windowLimit: 5, windowSize: 60, aggregateBy: ["ip", "domain"] },
};
