/**
 * validation.ts — ONE shared validation helper for every form on the site
 * (ContactForm, ConsultationForm, AuditForm) and for the /api/contact route.
 *
 * No form duplicates these rules. If a rule changes, change it here only.
 *
 * Rules (plain visitor language in every message):
 * - name: required, at least 2 characters.
 * - email: required, valid email format.
 * - phone: optional unless a form requires it; when given it must start
 *   with a country code (+), may contain spaces and dashes only besides
 *   digits, and must hold 7–15 digits.
 * - message: required, at least 10 characters.
 * - date (consultation): required when a booking is requested, must not
 *   be in the past (today is allowed).
 * - time (consultation): required when a booking is requested, must be
 *   one of the generated working-hours slots.
 *
 * This file also holds the shared enquiry-body / Gmail / mailto builders
 * so every form prefills exactly the same message, and the honeypot check.
 * It never sends anything and never claims anything was sent.
 */

export interface EnquiryInput {
  name: string;
  email: string;
  phone?: string;
  /** Service or "what you need" choice; empty means "not sure yet". */
  service?: string;
  /** Free-text subject, used by some forms instead of service. */
  subject?: string;
  message: string;
  /** Consultation only: YYYY-MM-DD. */
  date?: string;
  /** Consultation only: HH:MM start time in PKT. */
  time?: string;
  /** Honeypot field: must stay empty. Bots fill it; humans never see it. */
  honeypot?: string;
  /** Extra context lines for the email body (budget, website, checklist). */
  extra?: Record<string, string | string[] | undefined>;
}

export type FieldErrors = Partial<
  Record<"name" | "email" | "phone" | "service" | "message" | "date" | "time" | "form", string>
>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Digits, a leading +, spaces and dashes only — no letters, no brackets. */
const PHONE_PATTERN = /^\+[0-9\s-]+$/;

export function validateName(value: string): string | null {
  if (value.trim().length < 2) return "Please enter your name (at least 2 characters).";
  return null;
}

export function validateEmail(value: string): string | null {
  if (!EMAIL_PATTERN.test(value.trim())) return "Please enter a valid email address.";
  return null;
}

export function validatePhone(value: string, required = false): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return required ? "Please enter your phone number with its country code, e.g. +92 313 526 3300." : null;
  }
  const digits = trimmed.replace(/\D/g, "");
  if (!PHONE_PATTERN.test(trimmed) || digits.length < 7 || digits.length > 15) {
    return "Please enter a phone number with its country code, e.g. +92 313 526 3300 (7–15 digits; spaces and dashes are fine).";
  }
  return null;
}

export function validateMessage(value: string, minLength = 10): string | null {
  if (value.trim().length < minLength) {
    return `Please tell us a little more (at least ${minLength} characters) so we can help.`;
  }
  return null;
}

export interface WorkingHoursInput {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  slotMinutes: number;
}

function formatSlotMinutes(minutes: number): string {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

/**
 * Time slots from working hours: start times whose slot ends by closing
 * time. Shared by ConsultationForm and the /api/contact route so client
 * and server accept exactly the same slots (e.g. 10:00–18:30 for
 * 10:00–19:00 with 30-minute slots).
 */
export function generateTimeSlots(wh: WorkingHoursInput): string[] {
  const start = wh.startHour * 60 + wh.startMinute;
  const end = wh.endHour * 60 + wh.endMinute;
  const slots: string[] = [];
  for (let m = start; m + wh.slotMinutes <= end; m += wh.slotMinutes) {
    slots.push(formatSlotMinutes(m));
  }
  return slots;
}

/** Today's date in the visitor's local timezone, as YYYY-MM-DD. */
export function todayLocalString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function validateDateNotPast(value: string): string | null {
  if (!value) return "Please pick a date for your consultation.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "Please pick a valid date.";
  if (value < todayLocalString()) return "Please pick today or a future date — past dates are not available.";
  return null;
}

export function validateTimeSlot(value: string, slots: string[]): string | null {
  if (!value) return "Please pick a time slot.";
  if (!slots.includes(value)) return "Please pick one of the available time slots.";
  return null;
}

export interface ValidateOptions {
  requirePhone?: boolean;
  /** When true, date + time are required and checked against `timeSlots`. */
  requireDateTime?: boolean;
  timeSlots?: string[];
}

/** Validate a whole enquiry. Returns per-field error strings; empty = valid. */
export function validateEnquiry(input: EnquiryInput, options: ValidateOptions = {}): FieldErrors {
  const errors: FieldErrors = {};
  const nameError = validateName(input.name);
  if (nameError) errors.name = nameError;
  const emailError = validateEmail(input.email);
  if (emailError) errors.email = emailError;
  const phoneError = validatePhone(input.phone ?? "", options.requirePhone ?? false);
  if (phoneError) errors.phone = phoneError;
  const messageError = validateMessage(input.message);
  if (messageError) errors.message = messageError;
  if (options.requireDateTime) {
    const dateError = validateDateNotPast(input.date ?? "");
    if (dateError) errors.date = dateError;
    const timeError = validateTimeSlot(input.time ?? "", options.timeSlots ?? []);
    if (timeError) errors.time = timeError;
  }
  return errors;
}

/**
 * Alias kept for the brief form's documented contract:
 * validateForm({ name, email, phone, message }) returns per-field error
 * strings; an absent/empty result means valid. Same logic as validateEnquiry.
 */
export function validateForm(input: EnquiryInput): FieldErrors {
  return validateEnquiry(input);
}

/** True when the hidden honeypot field was filled — i.e. a bot, not a person. */
export function isSpamSubmission(input: Pick<EnquiryInput, "honeypot">): boolean {
  return Boolean(input.honeypot && input.honeypot.trim().length > 0);
}

/** The plain-text message body shared by the API email, Gmail and mailto. */
export function buildEnquiryBody(input: EnquiryInput): string {
  const lines = [`Name: ${input.name.trim()}`, `Email: ${input.email.trim()}`];
  if (input.phone?.trim()) lines.push(`Phone: ${input.phone.trim()}`);
  if (input.service?.trim()) lines.push(`Service: ${input.service.trim()}`);
  if (input.subject?.trim() && input.subject.trim() !== input.service?.trim()) {
    lines.push(`Subject: ${input.subject.trim()}`);
  }
  if (input.date?.trim() && input.time?.trim()) {
    lines.push(`Requested slot: ${input.date.trim()} at ${input.time.trim()} PKT (Asia/Karachi)`);
    lines.push("Note: this is a slot REQUEST, to be confirmed by email.");
  }
  if (input.extra) {
    for (const [label, value] of Object.entries(input.extra)) {
      if (value === undefined) continue;
      lines.push(`${label}: ${Array.isArray(value) ? value.join("; ") : value}`);
    }
  }
  lines.push("", input.message.trim());
  return lines.join("\n");
}

/** "Open in Gmail" compose link with the full prefilled message. */
export function buildGmailUrl(to: string, subject: string, input: EnquiryInput): string {
  const params = new URLSearchParams({
    view: "cm",
    to,
    su: subject,
    body: buildEnquiryBody(input),
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

/** Mailto fallback with the same prefilled message. */
export function buildMailtoUrl(to: string, subject: string, input: EnquiryInput): string {
  const params = new URLSearchParams({ subject, body: buildEnquiryBody(input) });
  return `mailto:${to}?${params.toString()}`;
}
