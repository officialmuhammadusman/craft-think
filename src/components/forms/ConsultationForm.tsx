"use client";
/**
 * ConsultationForm — the /consultation page form (name, email, phone,
 * what you need, message) plus a proper shadcn calendar date picker and
 * time-slot buttons generated from siteConfig.workingHours (Mon–Sat,
 * 10:00–19:00 PKT, 30-minute slots).
 *
 * TWO MODES, and the copy never mixes them up:
 * - Calendar connected (Google Calendar credentials in the environment):
 *   GET /api/booking-availability disables taken slots, and submit first
 *   POSTs /api/booking, which re-checks the exact slot and locks it as a
 *   calendar event before anything is called a booking. A slot that was
 *   just taken shows "That time was just taken — please pick another
 *   slot" and re-enables picking.
 * - Calendar NOT connected: availability returns every slot as free and
 *   submit skips straight to the existing /api/contact email-request
 *   flow, with copy that says the slot is a request confirmed by email
 *   — never a locked booking, and no double-booking protection is
 *   claimed.
 *
 * Submit flow otherwise unchanged: shared validation, then POST
 * /api/contact. Only a { sent: true } reply shows a "sent" message;
 * anything else shows the Gmail + WhatsApp fallback panel and never
 * claims delivery.
 */
import { useEffect, useMemo, useState } from "react";
import { useScrollToResult } from "@/lib/use-scroll-to-result";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import { cn } from "@/lib/utils";
import {
  buildGmailUrl,
  generateTimeSlots,
  isSpamSubmission,
  todayLocalString,
  validateEnquiry,
  type EnquiryInput,
  type FieldErrors,
} from "@/lib/validation";

type Status = "idle" | "sending" | "sent" | "fallback" | "booked";

const SUBJECT = "CraftThink consultation request";
const inputClass = "min-h-[48px] rounded-xl border border-[#E7E9F2] px-4 text-base font-normal";
const errorClass = "text-sm font-normal text-red-600";

const needOptions = [
  "Website Design & Development",
  "Business Websites & Portfolios",
  "Online Store",
  "Mobile Apps",
  "CRM & Business Systems",
  "Booking & Appointments",
  "HR & Staff Systems",
  "UI/UX Design",
  "AI Solutions & Assistant",
  "Fix & Improve Software",
  "Testing, Support & Care",
];

function formatSlot(minutes: number): string {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

export function ConsultationForm({ initialMessage = "" }: { initialMessage?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const resultRef = useScrollToResult(status === "sent" || status === "fallback" || status === "booked");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [need, setNeed] = useState("");
  const [message, setMessage] = useState(initialMessage);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [busySlots, setBusySlots] = useState<string[]>([]);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [calendarConnected, setCalendarConnected] = useState<boolean | null>(null);
  const [slotTakenError, setSlotTakenError] = useState<string | null>(null);
  // Visitor timezone, derived at render time. Safe for hydration: the
  // note that uses it only renders after the visitor picks a date/time,
  // which never happens on the first server/client render.
  const visitorTimezone =
    typeof window === "undefined" ? null : Intl.DateTimeFormat().resolvedOptions().timeZone;

  const slots = useMemo(() => generateTimeSlots(siteConfig.workingHours), []);
  const today = todayLocalString();
  const wh = siteConfig.workingHours;

  // Live availability: on date change, fetch busy slots for that day.
  // While loading — or if the check fails — slots stay available, so a
  // slow or failed availability check never blocks picking a slot.
  // The submit-time /api/booking check is the one that locks the slot.
  useEffect(() => {
    if (!date) return;
    const controller = new AbortController();
    fetch(`/api/booking-availability?date=${encodeURIComponent(date)}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data: unknown) => {
        if (controller.signal.aborted) return;
        const d = (data ?? {}) as { busy?: unknown; calendarConnected?: unknown };
        setBusySlots(Array.isArray(d.busy) ? d.busy.filter((s): s is string => typeof s === "string") : []);
        setCalendarConnected(d.calendarConnected === true);
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setBusySlots([]);
          setCalendarConnected(false);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setAvailabilityLoading(false);
      });
    return () => controller.abort();
  }, [date]);

  function formatLocalDate(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function parseLocalDate(value: string): Date | undefined {
    if (!value) return undefined;
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  function refreshAvailability() {
    if (!date) return;
    fetch(`/api/booking-availability?date=${encodeURIComponent(date)}`)
      .then((res) => res.json())
      .then((data: unknown) => {
        const d = (data ?? {}) as { busy?: unknown; calendarConnected?: unknown };
        setBusySlots(Array.isArray(d.busy) ? d.busy.filter((s): s is string => typeof s === "string") : []);
        setCalendarConnected(d.calendarConnected === true);
      })
      .catch(() => setBusySlots([]));
  }

  const payload: EnquiryInput = {
    name,
    email,
    phone: phone || undefined,
    service: need || undefined,
    message,
    date: date || undefined,
    time: time || undefined,
    honeypot: honeypot || undefined,
  };
  const gmailUrl = buildGmailUrl(siteConfig.email, SUBJECT, payload);
  const whatsappUrl = `https://wa.me/923135263300?text=${encodeURIComponent(`Hi CraftThink, I need help with my business software.\n\nName: ${name}\nEmail: ${email}${date && time ? `\nRequested slot: ${date} at ${time} PKT` : ""}\n\n${message}`)}`;

  // PKT is UTC+5 all year (no daylight saving), so the requested PKT
  // time converts to an exact instant by subtracting 5 hours from UTC.
  const visitorSlotText = useMemo(() => {
    if (!visitorTimezone || visitorTimezone === wh.timezone || !date || !time) return null;
    const [y, mo, d] = date.split("-").map(Number);
    const [h, mi] = time.split(":").map(Number);
    const instant = new Date(Date.UTC(y, mo - 1, d, h - 5, mi));
    const formatted = new Intl.DateTimeFormat("en-GB", {
      timeZone: visitorTimezone,
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(instant);
    return `In your timezone (${visitorTimezone}) that is ${formatted}.`;
  }, [visitorTimezone, wh.timezone, date, time]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSpamSubmission(payload)) {
      setStatus("fallback");
      return;
    }
    const found = validateEnquiry(payload, { requireDateTime: true, timeSlots: slots });
    setErrors(found);
    if (Object.keys(found).length > 0) return; // No page reload, errors stay inline.
    setStatus("sending");
    setSlotTakenError(null);
    // Step 1 — try to lock the slot on the calendar. Only a
    // { booked: true } reply may be called a booking. A "slot_taken"
    // reply re-enables picking with a plain message; any other outcome
    // (not configured, calendar error, network failure) falls through
    // to the existing email-request flow below, unchanged.
    try {
      const bookRes = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const book = (await bookRes.json().catch(() => null)) as { booked?: unknown; reason?: unknown } | null;
      if (book?.booked === true) {
        // Notify by email too, fire-and-forget: the booking itself is
        // already the calendar event, so an email failure must not
        // un-book it or change this panel.
        fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, source: "consultation" }),
        }).catch(() => undefined);
        setStatus("booked");
        return;
      }
      if (book?.reason === "slot_taken") {
        setStatus("idle");
        setTime("");
        setSlotTakenError("That time was just taken — please pick another slot.");
        refreshAvailability();
        return;
      }
    } catch {
      // Fall through to the email-request flow below.
    }
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source: "consultation" }),
      });
      const data: unknown = await res.json().catch(() => null);
      if (res.ok && data && typeof data === "object" && (data as { sent?: unknown }).sent === true) {
        setStatus("sent");
      } else {
        setStatus("fallback");
      }
    } catch {
      setStatus("fallback");
    }
  }

  if (status === "booked") {
    return (
      <div ref={resultRef} className="rounded-2xl border border-[#E7E9F2] bg-[#EEF2FF] p-6">
        <h3 className="ct-h3">Your consultation is booked</h3>
        <p className="mt-2 text-[#475569]">
          Your slot{date && time ? ` on ${date} at ${time} PKT` : ""} is locked on our calendar.
          We will confirm the details by email{visitorSlotText ? ` — ${visitorSlotText}` : ""}.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => setStatus("idle")}>Book Another Consultation</Button>
        </div>
      </div>
    );
  }

  if (status === "sent") {
    return (
      <div ref={resultRef} className="rounded-2xl border border-[#E7E9F2] bg-[#EEF2FF] p-6">
        <h3 className="ct-h3">Thank you — your request has been sent</h3>
        <p className="mt-2 text-[#475569]">
          We received your request{date && time ? ` for ${date} at ${time} PKT` : ""} and will confirm it by email.
          Until you hear back from us, the slot is a request, not a confirmed booking.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => setStatus("idle")}>Send Another Message</Button>
        </div>
      </div>
    );
  }

  if (status === "fallback") {
    return (
      <div ref={resultRef} className="rounded-2xl border border-[#E7E9F2] bg-[#EEF2FF] p-6">
        <h3 className="ct-h3">Your request has not been sent yet</h3>
        <p className="mt-2 text-[#475569]">
          Automatic sending is not set up right now, so your request was not delivered.
          Click below to open it prefilled{date && time ? `, including your requested slot (${date} at ${time} PKT),` : ""} — in Gmail, or in WhatsApp — and send it from there.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button href={gmailUrl} external>Open in Gmail →</Button>
          <Button href={whatsappUrl} variant="secondary" external>Open in WhatsApp →</Button>
          <Button variant="secondary" onClick={() => setStatus("idle")}>Edit Message</Button>
        </div>
      </div>
    );
  }

  const sending = status === "sending";
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      {/* Honeypot: hidden from people, must stay empty. */}
      <div aria-hidden="true" className="hidden">
        <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>
      <label className="flex flex-col gap-2 font-semibold">Your name *
        <input value={name} onChange={(e) => setName(e.target.value)} aria-invalid={Boolean(errors.name)} className={inputClass} />
        {errors.name && <p role="alert" className={errorClass}>{errors.name}</p>}
      </label>
      <label className="flex flex-col gap-2 font-semibold">Your email *
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={Boolean(errors.email)} className={inputClass} />
        {errors.email && <p role="alert" className={errorClass}>{errors.email}</p>}
      </label>
      <label className="flex flex-col gap-2 font-semibold">Your phone (optional)
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+92 313 526 3300" aria-invalid={Boolean(errors.phone)} className={inputClass} />
        {errors.phone && <p role="alert" className={errorClass}>{errors.phone}</p>}
      </label>
      <label className="flex flex-col gap-2 font-semibold">What do you need?
        <select value={need} onChange={(e) => setNeed(e.target.value)} className={inputClass}>
          <option value="">Not sure yet — help me choose</option>
          {needOptions.map((o) => (<option key={o}>{o}</option>))}
        </select>
      </label>
      <div className="flex flex-col gap-2 font-semibold">
        <span id="consult-date-label">Pick a date *</span>
        <div className="min-w-0 overflow-hidden rounded-xl border border-[#E7E9F2] bg-white" role="group" aria-labelledby="consult-date-label">
          <Calendar
            mode="single"
            selected={parseLocalDate(date)}
            onSelect={(d) => {
              if (!d) return;
              setAvailabilityLoading(true);
              setDate(formatLocalDate(d));
              setTime("");
              setSlotTakenError(null);
            }}
            disabled={[{ before: parseLocalDate(today) ?? new Date() }, { dayOfWeek: [0] }]}
          />
        </div>
        {date && (
          <p className="text-sm font-normal text-[#475569]">
            Selected: {date} ({wh.daysShort}, {wh.timezoneLabel}). Sundays are not working days.
          </p>
        )}
        {errors.date && <p role="alert" className={errorClass}>{errors.date}</p>}
      </div>
      <div className="flex flex-col gap-2 font-semibold">
        <span id="consult-time-label">Pick a time ({wh.timezoneLabel}, 30 minutes each) *</span>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-labelledby="consult-time-label">
          {slots.map((s) => {
            const busy = busySlots.includes(s);
            const selected = time === s;
            return (
              <button
                key={s}
                type="button"
                disabled={busy}
                aria-pressed={selected}
                aria-label={busy ? `${s} ${wh.timezoneLabel}, already taken` : `${s} ${wh.timezoneLabel}`}
                onClick={() => {
                  setTime(s);
                  setSlotTakenError(null);
                }}
                className={cn(
                  "min-h-[48px] rounded-xl border px-2 text-base font-semibold",
                  selected
                    ? "border-[#4F46E5] bg-[#4F46E5] text-white"
                    : "border-[#E7E9F2] bg-white text-[#0B1220] hover:border-[#4F46E5] hover:text-[#4F46E5]",
                  busy && "cursor-not-allowed border-[#E7E9F2] bg-[#F6F7FB] text-[#94A3B8] line-through hover:border-[#E7E9F2] hover:text-[#94A3B8]",
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
        {availabilityLoading && <p className="text-sm font-normal text-[#475569]">Checking live availability… slots stay available while this loads.</p>}
        {slotTakenError && <p role="alert" className={errorClass}>{slotTakenError}</p>}
        {errors.time && <p role="alert" className={errorClass}>{errors.time}</p>}
      </div>
      {date && time && (
        <p className="break-words text-sm text-[#475569]">
          Requested slot: {date} at {time} {wh.timezoneLabel} ({wh.days}, {formatSlot(wh.startHour * 60 + wh.startMinute)}–{formatSlot(wh.endHour * 60 + wh.endMinute)} {wh.timezoneLabel}).
          {visitorSlotText ? ` ${visitorSlotText}` : ""}
        </p>
      )}
      <p className="text-sm text-[#475569]">
        {calendarConnected === true
          ? "Live calendar is connected: taken slots are greyed out above, and your chosen slot is locked on our calendar when you send this request — no one else can take the same time."
          : "Your chosen slot is a request confirmed by email — there is no live calendar connection yet, so the slot is not guaranteed until we confirm it by email."}
      </p>
      <label className="flex flex-col gap-2 font-semibold">Tell us about your problem *
        <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What do you need help with? What does your business do?" aria-invalid={Boolean(errors.message)} className="rounded-xl border border-[#E7E9F2] px-4 py-3 text-base font-normal" />
        {errors.message && <p role="alert" className={errorClass}>{errors.message}</p>}
      </label>
      <Button type="submit" disabled={sending}>{sending ? "Sending…" : "Send Consultation Request"}</Button>
      <p className="text-sm text-[#64748B]">On submit we first try to send your request directly. If automatic sending is not set up, we will show you Gmail and WhatsApp buttons with your request prefilled — nothing is claimed as sent until it really is. Prefer to write directly? Email us at {siteConfig.email} or call {siteConfig.phone}.</p>
    </form>
  );
}
