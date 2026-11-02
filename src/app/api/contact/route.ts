/**
 * POST /api/contact — Accepts the same payload every site form sends:
 * name, email, phone, service/subject, message, plus date/time for
 * consultation requests, plus brief fields (budget, website, checklist)
 * when present. Validated with the shared src/lib/validation.ts helper.
 *
 * EMAIL GATING: sends via Resend (plain fetch, no SDK) ONLY when
 * RESEND_API_KEY is set, from "CraftThink <onboarding@resend.dev>" — an
 * address that does not impersonate a verified domain. The email goes to
 * the site address in src/config/site.ts, with the visitor's address as
 * reply_to. When the key is absent, returns
 *   { sent: false, reason: "email_key_missing" } with HTTP 200
 * so the form UI falls back to the Gmail / mailto path instead of
 * showing a success message. NEVER returns sent: true unless Resend
 * accepted the message.
 *
 * SMS: after a successful email send, a best-effort Twilio notification
 * (src/lib/notify.ts) to the site phone is fired WITHOUT awaiting it, so
 * it can never block or fail this response. An SMS failure is never
 * reported as a success or a failure to the visitor.
 */
import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import {
  buildEnquiryBody,
  generateTimeSlots,
  isSpamSubmission,
  validateEnquiry,
  type EnquiryInput,
} from "@/lib/validation";
import { sendSms } from "@/lib/notify";

export const runtime = "nodejs";

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const items = value.filter((v): v is string => typeof v === "string");
  return items.length > 0 ? items : undefined;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br>");
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ sent: false, reason: "invalid_json" }, { status: 400 });
  }
  if (!raw || typeof raw !== "object") {
    return NextResponse.json({ sent: false, reason: "invalid" }, { status: 400 });
  }
  const body = raw as Record<string, unknown>;

  const input: EnquiryInput = {
    name: asString(body.name),
    email: asString(body.email),
    phone: asString(body.phone) || undefined,
    service: asString(body.service) || undefined,
    subject: asString(body.subject) || undefined,
    message: asString(body.message),
    date: asString(body.date) || undefined,
    time: asString(body.time) || undefined,
    honeypot: asString(body.honeypot) || undefined,
    extra: {
      "Budget range": asString(body.budget) || undefined,
      Website: asString(body.website) || undefined,
      "Audit checklist": asStringArray(body.auditChecks),
      "Form source": asString(body.source) || undefined,
    },
  };

  // Honeypot filled: a bot, not a person. Fail closed without sending.
  if (isSpamSubmission(input)) {
    return NextResponse.json({ sent: false, reason: "spam_blocked" });
  }

  // When a date/time is supplied (consultation), validate it against the
  // same working-hours slots the form offers — no past dates, no off-list times.
  const slotValidation =
    input.date || input.time
      ? { requireDateTime: true, timeSlots: generateTimeSlots(siteConfig.workingHours) }
      : {};
  const errors = validateEnquiry(input, slotValidation);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ sent: false, reason: "invalid", errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ sent: false, reason: "email_key_missing" });
  }

  const subject =
    input.subject ||
    (input.date && input.time
      ? `CraftThink consultation request — ${input.date} at ${input.time} PKT`
      : input.service
        ? `CraftThink enquiry: ${input.service}`
        : "CraftThink enquiry");
  const text = buildEnquiryBody(input);

  let resendOk = false;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "CraftThink <onboarding@resend.dev>",
        to: [siteConfig.email],
        reply_to: input.email,
        subject,
        text,
        html: `<pre>${escapeHtml(text)}</pre>`,
      }),
    });
    resendOk = response.ok;
  } catch {
    resendOk = false;
  }
  if (!resendOk) {
    return NextResponse.json({ sent: false, reason: "email_send_failed" });
  }

  // Best-effort only: never awaited, never blocks this response.
  void sendSms({
    to: siteConfig.phone.replace(/\s/g, ""),
    text: `New CraftThink enquiry from ${input.name} (${input.service ?? "general"}). Reply by email: ${input.email}.`,
  }).catch(() => undefined);

  return NextResponse.json({ sent: true });
}
