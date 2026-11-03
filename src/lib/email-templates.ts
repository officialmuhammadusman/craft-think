/**
 * email-templates.ts — Template functions ONLY. Nothing in this file sends
 * an email. Sending is gated on RESEND_API_KEY in src/app/api/contact/route.ts
 * (same pattern: no key, no send, no success claim).
 *
 * Each function returns { subject, html, text } in plain visitor language.
 * No invented clients, testimonials, prices, stats or guarantees.
 */

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrap(title: string, paragraphs: string[]): EmailTemplate {
  const text = [title, "", ...paragraphs].join("\n\n");
  const html = [
    `<p><strong>${escapeHtml(title)}</strong></p>`,
    ...paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`),
  ].join("\n");
  return { subject: title, html, text };
}

/** Sent to a visitor right after they enquire (once sending is wired up). */
export function instantEnquiryReply(input: { name: string; service?: string }): EmailTemplate {
  const serviceLine = input.service
    ? `You asked about: ${input.service}.`
    : "You asked us to help you choose the right service.";
  return wrap(`Thanks for contacting CraftThink, ${input.name}`, [
    serviceLine,
    "We have received your message and will reply by email with a clear next step. There is nothing else you need to do right now.",
    "If you need to add anything, just reply to this email.",
    "— Muhammad Usman, CEO & Founder, CraftThink",
  ]);
}

/**
 * Sent when a consultation slot is requested. Honest wording: the slot is
 * a REQUEST confirmed by email — there is no live calendar connection yet,
 * so nothing here claims the slot is already booked or protected.
 */
export function bookingConfirmation(input: {
  name: string;
  date: string;
  time: string;
  service?: string;
}): EmailTemplate {
  const serviceLine = input.service ? ` You asked about: ${input.service}.` : "";
  return wrap(`Your consultation request — ${input.date} at ${input.time} PKT`, [
    `Hello ${input.name}, thank you for requesting a free consultation on ${input.date} at ${input.time} PKT (Asia/Karachi).${serviceLine}`,
    "This is a request, not a confirmed booking yet: we will confirm your slot by email. If that time does not work, we will suggest another one.",
    "If you need to change anything before then, just reply to this email.",
    "— Muhammad Usman, CEO & Founder, CraftThink",
  ]);
}

/** Sent after a consultation call, pointing to the agreed next steps. */
export function postCallFollowUp(input: { name: string; service?: string }): EmailTemplate {
  const serviceLine = input.service
    ? ` As discussed, this covers: ${input.service}.`
    : "";
  return wrap(`Next steps after your CraftThink call, ${input.name}`, [
    `Hello ${input.name}, thank you for speaking with us.${serviceLine}`,
    "As agreed on the call, we will follow up by email with the next step. Nothing is charged and nothing is started until you agree the scope in writing.",
    "If anything from the call was unclear, just reply to this email and we will explain it clearly.",
    "— Muhammad Usman, CEO & Founder, CraftThink",
  ]);
}
