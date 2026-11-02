"use client";
import { useState } from "react";
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

const SUBJECT = "CraftThink free audit request";
const inputClass = "min-h-[48px] rounded-xl border border-[#E7E9F2] px-4 text-base font-normal";
const errorClass = "text-sm font-normal text-red-600";

const CHECKS = [
  { id: "slow", label: "My website or app feels slow", fix: "Speed audit: check slow pages, large images, slow queries and missing caching. Fix the slowest pages first." },
  { id: "mobile", label: "It looks bad or is hard to use on a phone", fix: "Mobile audit: test every page at phone size, fix tap targets, text size and forms that break on small screens." },
  { id: "enquiry", label: "Visitors do not contact us or buy", fix: "Conversion audit: make the main action obvious on every page, shorten forms, and add clear contact and booking options." },
  { id: "booking", label: "Bookings still come by phone or chat", fix: "Booking audit: add online booking with real time slots, payments and reminders, so staff stop answering the same calls." },
  { id: "manual", label: "We do a lot of work by hand in spreadsheets", fix: "Automation audit: list the manual steps, then put customers, sales and billing in one system with automatic reports." },
  { id: "bugs", label: "There are bugs, or things break often", fix: "Stability audit: reproduce the top bugs, add tests for them, and set up monitoring so problems are found early." },
  { id: "old", label: "The design looks old", fix: "Design audit: keep what works, redesign what confuses customers, and prototype the new look before rebuilding." },
  { id: "ai", label: "Customers ask the same questions again and again", fix: "AI audit: build an assistant that answers from your own business data, with checking, and hands over to a human when unsure." },
];

export function AuditForm() {
  const [url, setUrl] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const toggle = (id: string) => setPicked((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  const results = CHECKS.filter((c) => picked.includes(c.id));

  // Send-my-checklist form (shared validation + API-first + Gmail/mailto fallback).
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const summary = `Free audit request${url ? ` for ${url}` : ""}: ${results.map((r) => r.label).join("; ")}`;
  const payload: EnquiryInput = {
    name,
    email,
    phone: phone || undefined,
    subject: "Free audit request",
    message,
    honeypot: honeypot || undefined,
  };
  const gmailUrl = buildGmailUrl(siteConfig.email, SUBJECT, payload);
  const mailto = buildMailtoUrl(siteConfig.email, SUBJECT, payload);

  function showChecklist() {
    setDone(true);
    setMessage((prev) => prev || summary);
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
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
        body: JSON.stringify({
          ...payload,
          website: url || undefined,
          auditChecks: results.map((r) => r.label),
          source: "audit",
        }),
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

  const sending = status === "sending";
  return (
    <div className="rounded-2xl border border-[#E7E9F2] bg-white p-6 shadow-sm">
      <label className="flex flex-col gap-2 font-semibold">Your website or app URL (optional)
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://yourbusiness.com" className={inputClass} />
      </label>
      <fieldset className="mt-6">
        <legend className="font-semibold">What problems do you have? Tick all that apply.</legend>
        <div className="mt-3 flex flex-col gap-2">
          {CHECKS.map((c) => (
            <label key={c.id} className="flex min-h-[48px] cursor-pointer items-center gap-3 rounded-xl border border-[#E7E9F2] px-4">
              <input type="checkbox" checked={picked.includes(c.id)} onChange={() => toggle(c.id)} className="h-5 w-5" /> {c.label}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mt-6"><Button onClick={showChecklist} disabled={picked.length === 0}>Get My Free Audit Checklist</Button></div>
      {done && (
        <div className="mt-6">
          <h2 className="ct-h3">Your audit checklist{url ? ` for ${url}` : ""}</h2>
          <p className="mt-1 text-[#475569]">This is a plain-language checklist from your answers, not a live technical scan. A real audit is confirmed in your free consultation.</p>
          <ol className="mt-4 flex flex-col gap-3">
            {results.map((r, i) => (
              <li key={r.id} className="rounded-2xl bg-[#F6F7FB] p-5"><strong>Fix {i + 1}: {r.label}</strong><p className="mt-1 text-[#475569]">{r.fix}</p></li>
            ))}
          </ol>
          {status === "sent" ? (
            <div className="mt-6 rounded-2xl border border-[#E7E9F2] bg-[#EEF2FF] p-5">
              <h3 className="ct-h3">Thank you — your audit request has been sent</h3>
              <p className="mt-2 text-[#475569]">We will reply by email to {email}.</p>
            </div>
          ) : status === "fallback" ? (
            <div className="mt-6 rounded-2xl border border-[#E7E9F2] bg-[#EEF2FF] p-5">
              <h3 className="ct-h3">Your request has not been sent yet</h3>
              <p className="mt-2 text-[#475569]">Automatic sending is not set up right now, so your request was not delivered. Click below to open it prefilled — in Gmail, or in your own email app — and send it from there.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button href={gmailUrl} external>Open in Gmail →</Button>
                <Button href={mailto} variant="secondary">Open in Email App →</Button>
                <Button variant="secondary" onClick={() => setStatus("idle")}>Edit Message</Button>
              </div>
            </div>
          ) : (
            <form className="mt-6 flex flex-col gap-4 border-t border-[#E7E9F2] pt-6" onSubmit={handleSend} noValidate>
              <h3 className="ct-h3">Send this checklist to CraftThink</h3>
              <p className="text-[#475569]">Add your details and we will reply by email about a free consultation. Your checklist is included in the message — edit it if you like.</p>
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
              <label className="flex flex-col gap-2 font-semibold">Your message *
                <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} aria-invalid={Boolean(errors.message)} className="rounded-xl border border-[#E7E9F2] px-4 py-3 text-base font-normal" />
                {errors.message && <p role="alert" className={errorClass}>{errors.message}</p>}
              </label>
              <div><Button type="submit" disabled={sending}>{sending ? "Sending…" : "Send Audit Request"}</Button></div>
              <p className="text-sm text-[#64748B]">On submit we first try to send your request directly. If automatic sending is not set up, we will show you Gmail and email-app buttons with your request prefilled — nothing is claimed as sent until it really is.</p>
            </form>
          )}
          <div className="mt-6"><Button href={`/consultation?problem=${encodeURIComponent(summary)}`} variant="secondary">Book a Free Consultation →</Button></div>
        </div>
      )}
    </div>
  );
}
