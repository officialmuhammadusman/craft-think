/**
 * calendar.ts — SERVER-ONLY helpers for real consultation booking.
 *
 * The website's own Google Calendar access is ENV-GATED, and it is NOT
 * the same as connecting Google Calendar to the Muse agent: the agent
 * link lets the assistant read a calendar, while this code needs a
 * Google Cloud OAuth client of its own, with a refresh token stored in
 * Vercel environment variables:
 *
 *   GOOGLE_CALENDAR_CLIENT_ID
 *   GOOGLE_CALENDAR_CLIENT_SECRET
 *   GOOGLE_CALENDAR_REFRESH_TOKEN
 *   GOOGLE_CALENDAR_ID (optional, defaults to "primary")
 *
 * When any of the three required values is missing, every helper here
 * reports "not configured" and the consultation form keeps its honest
 * email-request behaviour — a slot is never claimed as locked then.
 *
 * Timezone: working hours are Asia/Karachi (PKT, UTC+5 all year, no
 * daylight saving), so a PKT wall time converts to UTC by subtracting
 * exactly 5 hours.
 */
import { siteConfig } from "@/config/site";
import { generateTimeSlots } from "@/lib/validation";

const PKT_OFFSET_MS = 5 * 60 * 60 * 1000;
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const CALENDAR_API = "https://www.googleapis.com/calendar/v3";

export function pktTodayString(): string {
  return new Date(Date.now() + PKT_OFFSET_MS).toISOString().slice(0, 10);
}

/** Strict YYYY-MM-DD check that also rejects impossible calendar dates. */
export function parseDateParam(value: unknown): string | null {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [y, m, d] = value.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== m - 1 || dt.getUTCDate() !== d) return null;
  return value;
}

export function isSunday(dateStr: string): boolean {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay() === 0;
}

export function isPastInPkt(dateStr: string): boolean {
  return dateStr < pktTodayString();
}

/** Working slots for a date, e.g. "10:00" … "18:30" (PKT). */
export function workingSlots(): string[] {
  return generateTimeSlots(siteConfig.workingHours);
}

/** Start of a PKT slot as UTC milliseconds. */
export function slotStartUtcMs(dateStr: string, time: string): number {
  const [y, mo, d] = dateStr.split("-").map(Number);
  const [h, mi] = time.split(":").map(Number);
  return Date.UTC(y, mo - 1, d, h - 5, mi);
}

function calendarId(): string {
  return process.env.GOOGLE_CALENDAR_ID || "primary";
}

export function calendarConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_CALENDAR_CLIENT_ID &&
      process.env.GOOGLE_CALENDAR_CLIENT_SECRET &&
      process.env.GOOGLE_CALENDAR_REFRESH_TOKEN,
  );
}

async function getAccessToken(): Promise<string> {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CALENDAR_CLIENT_ID ?? "",
      client_secret: process.env.GOOGLE_CALENDAR_CLIENT_SECRET ?? "",
      refresh_token: process.env.GOOGLE_CALENDAR_REFRESH_TOKEN ?? "",
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) throw new Error("token_refresh_failed");
  const data = (await res.json()) as { access_token?: unknown };
  if (typeof data.access_token !== "string" || !data.access_token) throw new Error("token_missing");
  return data.access_token;
}

type BusyInterval = { start?: string; end?: string };

/** Busy slot start times ("HH:MM" PKT) for one working day. Throws on any calendar failure. */
export async function fetchBusySlots(dateStr: string): Promise<string[]> {
  const accessToken = await getAccessToken();
  const wh = siteConfig.workingHours;
  const [y, mo, d] = dateStr.split("-").map(Number);
  const timeMin = new Date(Date.UTC(y, mo - 1, d, wh.startHour - 5, wh.startMinute)).toISOString();
  const timeMax = new Date(Date.UTC(y, mo - 1, d, wh.endHour - 5, wh.endMinute)).toISOString();
  const res = await fetch(`${CALENDAR_API}/freeBusy`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ timeMin, timeMax, timeZone: "Asia/Karachi", items: [{ id: calendarId() }] }),
  });
  if (!res.ok) throw new Error("freebusy_failed");
  const data = (await res.json()) as { calendars?: Record<string, { busy?: BusyInterval[] }> };
  const busy = data.calendars?.[calendarId()]?.busy ?? [];
  const busySlots: string[] = [];
  for (const slot of workingSlots()) {
    const startMs = slotStartUtcMs(dateStr, slot);
    const endMs = startMs + wh.slotMinutes * 60 * 1000;
    const overlaps = busy.some((b) => {
      if (!b.start || !b.end) return false;
      const bStart = Date.parse(b.start);
      const bEnd = Date.parse(b.end);
      return Number.isFinite(bStart) && Number.isFinite(bEnd) && bStart < endMs && bEnd > startMs;
    });
    if (overlaps) busySlots.push(slot);
  }
  return busySlots;
}

export type ConsultationBookingInput = {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  date: string;
  time: string;
};

/** Insert a 30-minute consultation event. Returns the event id. Throws on any calendar failure. */
export async function insertConsultationEvent(input: ConsultationBookingInput): Promise<string> {
  const accessToken = await getAccessToken();
  const wh = siteConfig.workingHours;
  const startMs = slotStartUtcMs(input.date, input.time);
  const endMs = startMs + wh.slotMinutes * 60 * 1000;
  const toPktIso = (ms: number) => {
    const pkt = new Date(ms + PKT_OFFSET_MS);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pkt.getUTCFullYear()}-${pad(pkt.getUTCMonth() + 1)}-${pad(pkt.getUTCDate())}T${pad(pkt.getUTCHours())}:${pad(pkt.getUTCMinutes())}:00`;
  };
  const description = [
    `Consultation request from the CraftThink website.`,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.phone ? `Phone: ${input.phone}` : "",
    input.service ? `Service: ${input.service}` : "",
    ``,
    input.message,
  ]
    .filter((line) => line !== "")
    .join("\n");
  const res = await fetch(`${CALENDAR_API}/calendars/${encodeURIComponent(calendarId())}/events`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      summary: `CraftThink consultation — ${input.name}`,
      description,
      start: { dateTime: toPktIso(startMs), timeZone: "Asia/Karachi" },
      end: { dateTime: toPktIso(endMs), timeZone: "Asia/Karachi" },
    }),
  });
  if (!res.ok) throw new Error("event_insert_failed");
  const data = (await res.json()) as { id?: unknown };
  if (typeof data.id !== "string" || !data.id) throw new Error("event_id_missing");
  return data.id;
}
