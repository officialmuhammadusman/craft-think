/**
 * Footer.tsx — Site-wide footer.
 * 4 columns: About, Services, Company, Contact.
 * No address, no city, no invented social links, no fake logos.
 * Copyright line pulls year dynamically.
 */
import Link from "next/link";
import { Mail, Phone, Linkedin, Github } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      className="bg-[#0B1220] text-white"
    >
      {/* ── Main footer grid ──────────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Column 1: About */}
          <div>
            {/* Wordmark */}
            <Link
              href="/"
              aria-label={`${siteConfig.agencyName} — Home`}
              className="inline-flex items-center gap-2 mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] rounded"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#4F46E5] text-white text-sm font-bold select-none">
                C
              </span>
              <span className="text-lg font-bold">
                <span className="text-white">Craft</span>
                <span className="text-[#4F46E5]">Think</span>
              </span>
            </Link>

            <p className="text-sm text-white/60 leading-relaxed mb-3">
              {siteConfig.description}
            </p>
            <p className="text-sm font-medium text-white/80">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">
              Services
            </p>
            <ul className="flex flex-col gap-2.5" role="list">
              {siteConfig.footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">
              Company
            </p>
            <ul className="flex flex-col gap-2.5" role="list">
              {siteConfig.footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">
              Contact
            </p>
            <ul className="flex flex-col gap-3" role="list">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-2.5 text-sm text-white/60 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
                >
                  <Mail size={15} className="mt-0.5 shrink-0" />
                  <span className="break-all">{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
                >
                  <Phone size={15} className="shrink-0" />
                  {siteConfig.phone}
                </a>
              </li>

              {/* Social links */}
              <li className="flex items-center gap-3 pt-1">
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/60 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/60 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                >
                  <Github size={16} />
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/40 text-center sm:text-left">
            © {year} {siteConfig.agencyName} — Led by CEO {siteConfig.ceoName}. Built for clients worldwide.
          </p>
          <p className="text-xs text-white/30">
            {siteConfig.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
