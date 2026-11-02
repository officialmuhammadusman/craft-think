"use client";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

function Form() {
  const q = useSearchParams();
  const [sent, setSent] = useState(false);
  const [name, setName] = useState(q.get("name") || "");
  const [email, setEmail] = useState(q.get("email") || "");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState(q.get("problem") || "");
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent("CraftThink consultation request")}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${service}\nBudget range: ${budget}\n\n${message}`)}`;
  return sent ? (
    <div className="rounded-2xl border border-[#E7E9F2] bg-[#EEF2FF] p-6">
      <h2 className="ct-h3">Thank you — your message is ready to send</h2>
      <p className="mt-2 text-[#475569]">This demo site has no backend, so your form is not stored anywhere. Click below to open your email app with your message prefilled to {siteConfig.email}, or email us directly.</p>
      <div className="mt-4 flex flex-wrap gap-3"><Button href={mailto}>Open Email to Send →</Button><Button href="/estimate" variant="secondary">Try the Estimator Instead</Button></div>
    </div>
  ) : (
    <form className="flex flex-col gap-4 rounded-2xl border border-[#E7E9F2] bg-white p-6 shadow-sm" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <label className="flex flex-col gap-2 font-semibold">Your name *<input required value={name} onChange={(e) => setName(e.target.value)} className="min-h-[48px] rounded-xl border border-[#E7E9F2] px-4 text-base font-normal" /></label>
      <label className="flex flex-col gap-2 font-semibold">Your email *<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="min-h-[48px] rounded-xl border border-[#E7E9F2] px-4 text-base font-normal" /></label>
      <label className="flex flex-col gap-2 font-semibold">Service you need
        <select value={service} onChange={(e) => setService(e.target.value)} className="min-h-[48px] rounded-xl border border-[#E7E9F2] px-4 text-base font-normal">
          <option value="">Not sure yet — help me choose</option>
          <option>Website Design & Development</option><option>Business Websites & Portfolios</option><option>Online Store</option><option>Mobile Apps</option><option>CRM & Business Systems</option><option>Booking & Appointments</option><option>HR & Staff Systems</option><option>UI/UX Design</option><option>AI Solutions & Assistant</option><option>Fix & Improve Software</option><option>Testing, Support & Care</option>
        </select>
      </label>
      <label className="flex flex-col gap-2 font-semibold">Budget range (optional)
        <select value={budget} onChange={(e) => setBudget(e.target.value)} className="min-h-[48px] rounded-xl border border-[#E7E9F2] px-4 text-base font-normal">
          <option value="">Prefer not to say yet</option><option>Under $1,000</option><option>$1,000 – $3,000</option><option>$3,000 – $10,000</option><option>$10,000+</option>
        </select>
      </label>
      <label className="flex flex-col gap-2 font-semibold">Tell us about your problem *<textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What do you need help with? What does your business do?" className="rounded-xl border border-[#E7E9F2] px-4 py-3 text-base font-normal" /></label>
      <Button type="submit">Send Consultation Request</Button>
      <p className="text-sm text-[#64748B]">No backend on this demo: on submit we prepare an email to {siteConfig.email} for you to send. Your details are not stored on this site.</p>
    </form>
  );
}

export function ContactForm() {
  return <Suspense fallback={<p>Loading the contact form…</p>}><Form /></Suspense>;
}
