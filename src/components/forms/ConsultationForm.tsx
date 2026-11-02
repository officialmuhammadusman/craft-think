"use client";
/**
 * ConsultationForm — the /consultation page form. Same fields as the
 * old consultation drawer (name, email, what you need, message) with
 * a mailto submit. Honest note: this site has no backend, so the form
 * is not stored anywhere — on submit it opens the visitor's email app
 * with the message prefilled to CraftThink's email.
 */
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

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

export function ConsultationForm({ initialMessage = "" }: { initialMessage?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [need, setNeed] = useState("");
  const [message, setMessage] = useState(initialMessage);
  const [sent, setSent] = useState(false);
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent("CraftThink consultation request")}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nWhat you need: ${need}\n\n${message}`)}`;

  if (sent) {
    return (
      <div className="rounded-2xl border border-[#E7E9F2] bg-[#EEF2FF] p-6">
        <h3 className="ct-h3">Thank you — your message is ready to send</h3>
        <p className="mt-2 text-[#475569]">This site has no backend, so your form is not stored anywhere. Click below to open your email app with your message prefilled to {siteConfig.email}.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button href={mailto}>Open Email to Send →</Button>
          <Button variant="secondary" onClick={() => setSent(false)}>Edit Message</Button>
        </div>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <label className="flex flex-col gap-2 font-semibold">Your name *<input required value={name} onChange={(e) => setName(e.target.value)} className="min-h-[48px] rounded-xl border border-[#E7E9F2] px-4 text-base font-normal" /></label>
      <label className="flex flex-col gap-2 font-semibold">Your email *<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="min-h-[48px] rounded-xl border border-[#E7E9F2] px-4 text-base font-normal" /></label>
      <label className="flex flex-col gap-2 font-semibold">What do you need?
        <select value={need} onChange={(e) => setNeed(e.target.value)} className="min-h-[48px] rounded-xl border border-[#E7E9F2] px-4 text-base font-normal">
          <option value="">Not sure yet — help me choose</option>
          {needOptions.map((o) => (<option key={o}>{o}</option>))}
        </select>
      </label>
      <label className="flex flex-col gap-2 font-semibold">Tell us about your problem *<textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What do you need help with? What does your business do?" className="rounded-xl border border-[#E7E9F2] px-4 py-3 text-base font-normal" /></label>
      <Button type="submit">Send Consultation Request</Button>
      <p className="text-sm text-[#64748B]">No backend: on submit we prepare an email to {siteConfig.email} for you to send. Prefer to write directly? Email us at {siteConfig.email} or call {siteConfig.phone}.</p>
    </form>
  );
}
