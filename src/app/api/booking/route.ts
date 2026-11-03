/**
 * POST /api/booking — Lock one consultation slot on the site's own
 * Google Calendar (env-gated; see src/lib/calendar.ts).
 *
 * Body: { name, email, phone?, service?, message, date, time }.
 *
 * Replies:
 *   { booked: true, eventId } — the slot was free and is now a calendar
 *     event. Only then may the form call it a confirmed booking.
 *   { booked: false, reason: "slot_taken" } — a second freebusy check
 *     at submit time found the slot taken. The form must show
 *     "That time was just taken — please pick another slot" and
 *     re-enable slot picking. Nothing is claimed as booked.
 *   { booked: false, reason: "calendar_not_configured" } — no calendar
 *     credentials in the environment. The form must fall back to its
 *     existing /api/contact email-request flow.
 *   { booked: false, reason: "calendar_error" } — the calendar call
 *     failed. The form must fall back to the email-request flow rather
 *     than claim anything.
 *
 * Validation: past dates, Sundays, and times outside the working slots
 * are rejected with 400 and never reach the calendar.
 */
import { NextResponse } from "next/server";
import {
  calendarConfigured,
  fetchBusySlots,
  insertConsultationEvent,
  isPastInPkt,
  isSunday,
  parseDateParam,
  workingSlots,
} from "@/lib/calendar";
import { validateEnquiry, type EnquiryInput } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ booked: false, reason: "invalid_json" }, { status: 400 });
  }
  const b = (body ?? {}) as Record<string, unknown>;
  const input: EnquiryInput = {
    name: asString(b.name),
    email: asString(b.email),
    phone: asString(b.phone) || undefined,
    service: asString(b.service) || undefined,
    message: asString(b.message),
    date: asString(b.date) || undefined,
    time: asString(b.time) || undefined,
  };
  const slots = workingSlots();
  const found = validateEnquiry(input, { requireDateTime: true, timeSlots: slots });
  if (Object.keys(found).length > 0) {
    return NextResponse.json({ booked: false, reason: "invalid_input", errors: found }, { status: 400 });
  }
  const date = parseDateParam(input.date);
  const time = input.time ?? "";
  if (!date || !slots.includes(time) || isPastInPkt(date) || isSunday(date)) {
    return NextResponse.json({ booked: false, reason: "invalid_input" }, { status: 400 });
  }
  if (!calendarConfigured()) {
    return NextResponse.json({ booked: false, reason: "calendar_not_configured" });
  }
  try {
    const busy = await fetchBusySlots(date);
    if (busy.includes(time)) {
      return NextResponse.json({ booked: false, reason: "slot_taken" });
    }
    const eventId = await insertConsultationEvent({
      name: input.name,
      email: input.email,
      phone: input.phone,
      service: input.service,
      message: input.message,
      date,
      time,
    });
    return NextResponse.json({ booked: true, eventId });
  } catch {
    return NextResponse.json({ booked: false, reason: "calendar_error" });
  }
}
