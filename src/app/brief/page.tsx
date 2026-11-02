"use client";
/**
 * Brief page — a structured project brief form.
 *
 * Validation: uses the SHARED helper from "@/lib/validation" (created by a
 * sibling workstream). Documented contract used here:
 *   validateForm({ name, email, phone, message })
 *     -> Partial<Record<"name" | "email" | "phone" | "message", string>>
 *   where an absent/empty string means "valid", and the rules are:
 *   name min 2 characters, valid email, phone with country code + digits,
 *   message min 10 characters. This page passes the "goals" field as
 *   `message`, so the goals box carries the min-10 rule.
 * No validation logic is duplicated here on purpose.
 *
 * Sending: POSTs the brief as JSON to /api/contact (also a sibling
 * workstream) with subject "CraftThink project brief". If that POST fails,
 * nothing is claimed as sent — the visitor is shown the Gmail/mailto
 * fallback instead.
 *
 * ── File uploads: GATED, not connected ──────────────────────────────────
 * UPLOAD_PROVIDER is a future env key (for example "vercel-blob" or "s3").
 * Today it is unset, so it resolves to "none": files are NEVER uploaded
 * anywhere from this page. The emailed brief only lists the chosen file
 * names + sizes, and the visitor is told to attach the files to the Gmail
 * message that opens, because Gmail compose URLs cannot carry
 * attachments. When a provider is configured later, a real upload step
 * must be added here — do not pretend an upload happened before then.
 */
import { useState } from "react";
import { useScrollToResult } from "@/lib/use-scroll-to-result";
import Link from "next/link";
import { validateForm } from "@/lib/validation";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const UPLOAD_PROVIDER = process.env.NEXT_PUBLIC_UPLOAD_PROVIDER ?? "none";
const SUBJECT = "CraftThink project brief";
const MAX_FILES = 3;
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB each
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"];
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".pdf"];

function formatSize(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

const inputClass =
  "min-h-[48px] w-full rounded-xl border border-[#E7E9F2] bg-white px-4 text-base font-normal text-[#0B1220]";
const labelClass = "flex flex-col gap-2 font-semibold";
const errorClass = "text-sm font-normal text-red-600";

export default function BriefPage() {
  const [businessType, setBusinessType] = useState("");
  const [goals, setGoals] = useState("");
  const [pagesFeatures, setPagesFeatures] = useState("");
  const [examples, setExamples] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const resultRef = useScrollToResult<HTMLElement>(submitted);
  const [apiSent, setApiSent] = useState(false);

  const briefBody = [
    `Business type: ${businessType || "Not given"}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    ``,
    `Goals:`,
    goals,
    ``,
    `Pages / features needed: ${pagesFeatures || "Not given"}`,
    `Examples they like: ${examples || "Not given"}`,
    `Budget range: ${budget || "Prefer not to say yet"}`,
    `Deadline: ${deadline || "No fixed deadline"}`,
    ``,
    files.length > 0
      ? `Files chosen (NOT attached — please attach them to this message):\n${files.map((f) => `- ${f.name} (${formatSize(f.size)})`).join("\n")}`
      : `Files chosen: none`,
  ].join("\n");

  const gmailHref = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(siteConfig.email)}&su=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(briefBody)}`;
  const whatsappHref = `https://wa.me/923135263300?text=${encodeURIComponent(`Hi CraftThink, I need help with my business software.\n\nName: ${name}\nEmail: ${email}\n\n${briefBody}`)}`;

  function handleFiles(list: FileList | null) {
    if (!list) return;
    const chosen = Array.from(list);
    if (files.length + chosen.length > MAX_FILES) {
      setFileError(`You can attach up to ${MAX_FILES} files. You already have ${files.length} chosen.`);
      return;
    }
    for (const file of chosen) {
      const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
      const typeOk = ALLOWED_TYPES.includes(file.type) || ALLOWED_EXTENSIONS.includes(ext);
      if (!typeOk) {
        setFileError(`"${file.name}" is not allowed. Only images and PDF files can be attached.`);
        return;
      }
      if (file.size > MAX_FILE_BYTES) {
        setFileError(`"${file.name}" is ${formatSize(file.size)} — each file must be 5 MB or smaller.`);
        return;
      }
    }
    setFileError("");
    setFiles((prev) => [...prev, ...chosen]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Honeypot: a bot-filled trap field. Pretend success, send nothing.
    if (honeypot.trim() !== "") {
      setSubmitted(true);
      setApiSent(false);
      return;
    }
    const found = validateForm({ name, email, phone, message: goals }) ?? {};
    setErrors(found);
    if (Object.values(found).some(Boolean)) return;
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: SUBJECT,
          name,
          email,
          phone,
          businessType,
          goals,
          pagesFeatures,
          examples,
          budget,
          deadline,
          files: files.map((f) => ({ name: f.name, size: f.size })),
        }),
      });
      setApiSent(res.ok);
    } catch {
      setApiSent(false);
    } finally {
      setSending(false);
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <section ref={resultRef} className="ct-section">
        <Container width="narrow">
          <div className="rounded-2xl border border-[#E7E9F2] bg-[#EEF2FF] p-6">
            <h1 className="ct-h3">{apiSent ? "Thank you — your brief was sent" : "Your brief is ready to send"}</h1>
            {apiSent ? (
              <p className="mt-2 text-[#475569]">
                Your brief was sent to {siteConfig.email}. Your files were not sent with it — the brief only listed
                their names and sizes. To send the files too, open Gmail below and attach them to the message that opens.
              </p>
            ) : (
              <p className="mt-2 text-[#475569]">
                We could not send your brief directly just now, and it has not been stored anywhere. Please send it
                yourself with one of the buttons below — it opens with your brief already written in.
              </p>
            )}
            <p className="mt-3 rounded-xl bg-white p-4 text-sm text-[#475569]">
              <strong className="text-[#0B1220]">About your files:</strong> Gmail compose URLs cannot carry
              attachments, so the files you chose are listed in the message by name and size only. Please attach the
              files to the Gmail message that opens.
            </p>
            {files.length > 0 && (
              <ul className="mt-3 flex flex-col gap-1 text-sm text-[#475569]">
                {files.map((f) => (
                  <li key={`${f.name}-${f.size}`}>• {f.name} ({formatSize(f.size)}) — attach this file yourself</li>
                ))}
              </ul>
            )}
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href={gmailHref} external>Open in Gmail to send →</Button>
              <Button href={whatsappHref} variant="secondary" external>Open in WhatsApp instead →</Button>
            </div>
            <p className="mt-4 text-sm text-[#64748B]">
              Prefer to talk first? <Link href="/consultation" className="font-semibold text-[#4F46E5]">Book a free consultation</Link> instead.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="ct-section">
      <Container width="narrow">
        <SectionHeading
          as="h1"
          eyebrow="Project brief"
          title="Tell us about your project"
          subtitle="Answer in plain words — as much or as little as you know. We will reply by email and then talk it through on a free call."
        />
        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5 rounded-2xl border border-[#E7E9F2] bg-white p-6 shadow-sm" noValidate>
          {/* Honeypot trap field: real visitors never see or fill this. */}
          <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
            <label>Leave this blank<input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} /></label>
          </div>

          <label className={labelClass}>What kind of business is it?
            <input value={businessType} onChange={(e) => setBusinessType(e.target.value)} placeholder="For example: clinic, salon, shop, tour company, club" className={inputClass} />
          </label>

          <label className={labelClass}>What do you want this project to do for your business? *
            <textarea value={goals} onChange={(e) => setGoals(e.target.value)} rows={5} placeholder="In plain words: what problem should it solve, and what should be easier afterwards?" className="rounded-xl border border-[#E7E9F2] px-4 py-3 text-base font-normal" />
            {errors.message && <span className={errorClass}>{errors.message}</span>}
          </label>

          <label className={labelClass}>Pages or features you need
            <textarea value={pagesFeatures} onChange={(e) => setPagesFeatures(e.target.value)} rows={4} placeholder="For example: booking page, online payments, customer list, contact form, mobile app" className="rounded-xl border border-[#E7E9F2] px-4 py-3 text-base font-normal" />
          </label>

          <label className={labelClass}>Examples you like (websites or apps)
            <input value={examples} onChange={(e) => setExamples(e.target.value)} placeholder="Paste links, or just describe what you liked about them" className={inputClass} />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>Budget range
              <select value={budget} onChange={(e) => setBudget(e.target.value)} className={inputClass}>
                <option value="">Prefer not to say yet</option>
                <option>Under $1,000</option>
                <option>$1,000 – $3,000</option>
                <option>$3,000 – $10,000</option>
                <option>$10,000+</option>
              </select>
            </label>
            <label className={labelClass}>Deadline
              <select value={deadline} onChange={(e) => setDeadline(e.target.value)} className={inputClass}>
                <option value="">No fixed deadline</option>
                <option>Within 1 month</option>
                <option>1 – 3 months</option>
                <option>More than 3 months</option>
              </select>
            </label>
          </div>

          <label className={labelClass}>Your name *
            <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
            {errors.name && <span className={errorClass}>{errors.name}</span>}
          </label>

          <label className={labelClass}>Your email *
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
            {errors.email && <span className={errorClass}>{errors.email}</span>}
          </label>

          <label className={labelClass}>Your phone *
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="With country code, for example +92 3XX XXXXXXX" className={inputClass} />
            {errors.phone && <span className={errorClass}>{errors.phone}</span>}
          </label>

          <div className="flex flex-col gap-2">
            <span className="font-semibold">Files to share (optional) — up to 3 files, 5 MB each, images or PDF only</span>
            <input
              type="file"
              multiple
              accept="image/*,application/pdf"
              onChange={(e) => handleFiles(e.target.files)}
              className="min-h-[48px] w-full rounded-xl border border-[#E7E9F2] bg-white px-4 py-3 text-base"
            />
            {fileError && <span className={errorClass}>{fileError}</span>}
            {files.length > 0 && (
              <ul className="flex flex-col gap-2">
                {files.map((f, i) => (
                  <li key={`${f.name}-${f.size}`} className="flex min-h-[48px] items-center justify-between gap-3 rounded-xl bg-[#EEF2FF] px-4 text-sm">
                    <span className="break-all">{f.name} ({formatSize(f.size)})</span>
                    <button type="button" onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))} className="min-h-[48px] shrink-0 px-2 font-semibold text-[#4F46E5]">Remove</button>
                  </li>
                ))}
              </ul>
            )}
            <p className="text-sm text-[#64748B]">
              {UPLOAD_PROVIDER === "none"
                ? "File upload is not connected yet: your files are not uploaded or stored anywhere on this site. The emailed brief will only list their names and sizes, and you will be asked to attach the files to the Gmail message that opens, because Gmail compose URLs cannot carry attachments."
                : "Your files will be uploaded when the configured provider is ready."}
            </p>
          </div>

          <Button type="submit" disabled={sending}>{sending ? "Sending…" : "Send project brief"}</Button>
          <p className="text-sm text-[#64748B]">
            Sending posts your brief to {siteConfig.email}. Nothing is stored on this site beyond that send, and your
            files are never uploaded here — see the note above.
          </p>
        </form>
      </Container>
    </section>
  );
}
