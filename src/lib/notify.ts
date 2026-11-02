/**
 * notify.ts — Best-effort SMS notification via the Twilio Messages API.
 *
 * Plain fetch only; no Twilio SDK dependency.
 *
 * GATING: sends ONLY when ALL THREE env vars are set:
 *   TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM
 * Otherwise it returns { sent: false, reason: "sms_not_configured" } and
 * does nothing. It never throws, never logs credentials, phone numbers,
 * message bodies or API responses, and must never block an API response:
 * callers fire it without awaiting it (see src/app/api/contact/route.ts).
 *
 * Never claim an SMS was sent when this returned sent: false.
 */

export interface SmsResult {
  sent: boolean;
  reason?: string;
}

export async function sendSms(input: { to: string; text: string }): Promise<SmsResult> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;
  if (!accountSid || !authToken || !from) {
    return { sent: false, reason: "sms_not_configured" };
  }
  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(accountSid)}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ To: input.to, From: from, Body: input.text }),
      },
    );
    if (!response.ok) return { sent: false, reason: "sms_send_failed" };
    return { sent: true };
  } catch {
    return { sent: false, reason: "sms_send_failed" };
  }
}
