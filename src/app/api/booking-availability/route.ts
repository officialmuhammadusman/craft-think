/**
 * GET /api/booking-availability?date=YYYY-MM-DD — Free/busy consultation
 * slots for one working day, from the site's own Google Calendar.
 *
 * Response: { busy: ["HH:MM", ...], calendarConnected: boolean }.
 *
 * HONEST FALLBACK: when calendar credentials are absent, or the
 * calendar call fails for any reason, this returns every slot as
 * available (busy: []) with calendarConnected: false. The form then
 * behaves exactly as it did before — a slot is a request confirmed by
 * email, never a locked booking — and a failed availability check never
 * blocks a visitor from picking a slot.
 */
import { NextResponse } from "next/server";
import {
  calendarConfigured,
  fetchBusySlots,
  isPastInPkt,
  isSunday,
  parseDateParam,
} from "@/lib/calendar";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const date = parseDateParam(new URL(request.url).searchParams.get("date"));
  if (!date) {
    return NextResponse.json({ error: "invalid_date" }, { status: 400 });
  }
  if (isPastInPkt(date) || isSunday(date)) {
    return NextResponse.json({ error: "date_unavailable" }, { status: 400 });
  }
  if (!calendarConfigured()) {
    return NextResponse.json({ busy: [], calendarConnected: false });
  }
  try {
    const busy = await fetchBusySlots(date);
    return NextResponse.json({ busy, calendarConnected: true });
  } catch {
    // Never block slot picking on a calendar failure.
    return NextResponse.json({ busy: [], calendarConnected: false });
  }
}
