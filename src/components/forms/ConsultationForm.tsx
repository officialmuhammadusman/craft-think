"use client";
/**
 * ConsultationForm — the /consultation page form (name, email, phone,
 * what you need, message) plus a real date picker and a time-slot picker
 * generated from siteConfig.workingHours (Mon–Sat, 10:00–19:00 PKT,
 * 30-minute slots). A picked slot is a REQUEST confirmed by email: this
 * site has no calendar connection yet, so nothing here claims the slot
 * is booked or protected against double-booking.
 *
 * Submit flow: shared validation, then POST /api/contact first. Only a
 * { sent: true } reply shows a "sent" message; anything else shows the
 * Gmail + mailto fallback panel and never claims delivery.
 */
import { useMemo, useState } from "react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import {
  buildGmailUrl,
  buildMailtoUrl,
  generateTimeSlots,
  isSpamSubmission,
  todayLocalString,
  validateEnquiry,
  type EnquiryInput,
  type FieldErrors,
} from "@/lib/validation";

type Status = "idle" | "sending" | "sent" | "fallback";

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
  const [errors, setErrors] = useState<FieldErrors>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [need, setNeed] = useState("");
  const [message, setMessage] = useState(initialMessage);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [honeypot, setHoneypot] = useState("");
  // Visitor timezone, derived at render time. Safe for hydration: the
  // note that uses it only renders after the visitor picks a date/time,
  // which never happens on the first server/client render.
  const visitorTimezone =
    typeof window === "undefined" ? null : Intl.DateTimeFormat().resolvedOptions().timeZone;

  const slots = useMemo(() => generateTimeSlots(siteConfig.workingHours), []);
  const today = todayLocalString();
  const wh = siteConfig.workingHours;

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
  const mailto = buildMailtoUrl(siteConfig.email, SUBJECT, payload);

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

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-[#E7E9F2] bg-[#EEF2FF] p-6">
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
      <div className="rounded-2xl border border-[#E7E9F2] bg-[#EEF2FF] p-6">
        <h3 className="ct-h3">Your request has not been sent yet</h3>
        <p className="mt-2 text-[#475569]">
          Automatic sending is not set up right now, so your request was not delivered.
          Click below to open it prefilled{date && time ? `, including your requested slot (${date} at ${time} PKT),` : ""} — in Gmail, or in your own email app — and send it from there.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button href={gmailUrl} external>Open in Gmail →</Button>
          <Button href={mailto} variant="secondary">Open in Email App →</Button>
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
      <label className="flex flex-col gap-2 font-semibold">Pick a date *
        <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} aria-invalid={Boolean(errors.date)} className={inputClass} />
        {errors.date && <p role="alert" className={errorClass}>{errors.date}</p>}
      </label>
      <label className="flex flex-col gap-2 font-semibold">Pick a time ({wh.timezoneLabel}) *
        <select value={time} onChange={(e) => setTime(e.target.value)} aria-invalid={Boolean(errors.time)} className={inputClass}>
          <option value="">Choose a time slot</option>
          {slots.map((s) => (<option key={s} value={s}>{s} {wh.timezoneLabel} (30 minutes)</option>))}
        </select>
        {errors.time && <p role="alert" className={errorClass}>{errors.time}</p>}
      </label>
      {date && time && (
        <p className="text-sm text-[#475569]">
          Requested slot: {date} at {time} {wh.timezoneLabel} ({wh.days}, {formatSlot(wh.startHour * 60 + wh.startMinute)}–{formatSlot(wh.endHour * 60 + wh.endMinute)} {wh.timezoneLabel}).
          {visitorSlotText ? ` ${visitorSlotText}` : ""}
        </p>
      )}
      <p className="text-sm text-[#475569]">Your chosen slot is a request confirmed by email — there is no live calendar connection yet, so the slot is not guaranteed until we confirm it by email.</p>
      <label className="flex flex-col gap-2 font-semibold">Tell us about your problem *
        <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What do you need help with? What does your business do?" aria-invalid={Boolean(errors.message)} className="rounded-xl border border-[#E7E9F2] px-4 py-3 text-base font-normal" />
        {errors.message && <p role="alert" className={errorClass}>{errors.message}</p>}
      </label>
      <Button type="submit" disabled={sending}>{sending ? "Sending…" : "Send Consultation Request"}</Button>
      <p className="text-sm text-[#64748B]">On submit we first try to send your request directly. If automatic sending is not set up, we will show you Gmail and email-app buttons with your request prefilled — nothing is claimed as sent until it really is. Prefer to write directly? Email us at {siteConfig.email} or call {siteConfig.phone}.</p>
    </form>
  );
}
