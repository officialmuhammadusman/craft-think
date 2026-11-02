"use client";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import {
  buildGmailUrl,
  buildMailtoUrl,
  isSpamSubmission,
  validateEnquiry,
  type EnquiryInput,
  type FieldErrors,
} from "@/lib/validation";

type Status = "idle" | "sending" | "sent" | "fallback";

const SUBJECT = "CraftThink consultation request";
const inputClass = "min-h-[48px] rounded-xl border border-[#E7E9F2] px-4 text-base font-normal";
const errorClass = "text-sm font-normal text-red-600";

function Form() {
  const q = useSearchParams();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [name, setName] = useState(q.get("name") || "");
  const [email, setEmail] = useState(q.get("email") || "");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState(q.get("problem") || "");
  const [honeypot, setHoneypot] = useState("");

  const payload: EnquiryInput = {
    name,
    email,
    phone: phone || undefined,
    service: service || undefined,
    message,
    honeypot: honeypot || undefined,
    extra: { "Budget range": budget || undefined },
  };
  const gmailUrl = buildGmailUrl(siteConfig.email, SUBJECT, payload);
  const mailto = buildMailtoUrl(siteConfig.email, SUBJECT, payload);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Honeypot filled: a bot, not a person. Offer the email path, send nothing.
    if (isSpamSubmission(payload)) {
      setStatus("fallback");
      return;
    }
    const found = validateEnquiry(payload);
    setErrors(found);
    if (Object.keys(found).length > 0) return; // No page reload, errors stay inline.
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, budget: budget || undefined, source: "contact" }),
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
        <h2 className="ct-h3">Thank you — your message has been sent</h2>
        <p className="mt-2 text-[#475569]">We will reply by email to {email}. If you need to add anything, email us directly at {siteConfig.email}.</p>
        <div className="mt-4 flex flex-wrap gap-3"><Button href="/estimate" variant="secondary">Try the Estimator Instead</Button></div>
      </div>
    );
  }

  if (status === "fallback") {
    return (
      <div className="rounded-2xl border border-[#E7E9F2] bg-[#EEF2FF] p-6">
        <h2 className="ct-h3">Your message has not been sent yet</h2>
        <p className="mt-2 text-[#475569]">Automatic sending is not set up right now, so your message was not delivered. Click below to open it prefilled — in Gmail, or in your own email app — and send it from there.</p>
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
    <form className="flex flex-col gap-4 rounded-2xl border border-[#E7E9F2] bg-white p-6 shadow-sm" onSubmit={handleSubmit} noValidate>
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
      <label className="flex flex-col gap-2 font-semibold">Service you need
        <select value={service} onChange={(e) => setService(e.target.value)} className={inputClass}>
          <option value="">Not sure yet — help me choose</option>
          <option>Website Design & Development</option><option>Business Websites & Portfolios</option><option>Online Store</option><option>Mobile Apps</option><option>CRM & Business Systems</option><option>Booking & Appointments</option><option>HR & Staff Systems</option><option>UI/UX Design</option><option>AI Solutions & Assistant</option><option>Fix & Improve Software</option><option>Testing, Support & Care</option>
        </select>
      </label>
      <label className="flex flex-col gap-2 font-semibold">Budget range (optional)
        <select value={budget} onChange={(e) => setBudget(e.target.value)} className={inputClass}>
          <option value="">Prefer not to say yet</option><option>Under $1,000</option><option>$1,000 – $3,000</option><option>$3,000 – $10,000</option><option>$10,000+</option>
        </select>
      </label>
      <label className="flex flex-col gap-2 font-semibold">Tell us about your problem *
        <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What do you need help with? What does your business do?" aria-invalid={Boolean(errors.message)} className="rounded-xl border border-[#E7E9F2] px-4 py-3 text-base font-normal" />
        {errors.message && <p role="alert" className={errorClass}>{errors.message}</p>}
      </label>
      <Button type="submit" disabled={sending}>{sending ? "Sending…" : "Send Consultation Request"}</Button>
      <p className="text-sm text-[#64748B]">On submit we first try to send your message directly. If automatic sending is not set up, we will show you Gmail and email-app buttons with your message prefilled — nothing is claimed as sent until it really is.</p>
    </form>
  );
}

export function ContactForm() {
  return <Suspense fallback={<p>Loading the contact form…</p>}><Form /></Suspense>;
}
