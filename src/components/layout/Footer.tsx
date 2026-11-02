/**
 * Footer.tsx — LIGHT footer, deliberately contrasting the dark final CTA
 * band above it (dark-on-dark merge was a user complaint). White
 * background, navy text, indigo links, thick indigo top border.
 * 4 columns: About, Services, Company, Contact. Social links carry
 * visible text labels (LinkedIn, GitHub), not generic icons alone.
 * No address, no city, no invented social links, no fake logos.
 */
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Globe, Code2 } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      className="border-t-4 border-[#4F46E5] bg-white text-[#0B1220]"
    >
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              aria-label={`${siteConfig.agencyName} — Home`}
              className="mb-4 inline-flex items-center gap-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]"
            >
              <Image src="/images/brand/logo-mark.webp" alt="" width={32} height={32} className="h-8 w-8 rounded-lg object-cover" />
              <span className="text-lg font-bold">
                <span className="text-[#0B1220]">Craft</span>
                <span className="text-[#4F46E5]">Think</span>
              </span>
            </Link>
            <p className="mb-3 text-sm leading-relaxed text-[#475569]">
              {siteConfig.description}
            </p>
            <p className="text-sm font-medium text-[#0B1220]">
              {siteConfig.tagline}
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#64748B]">
              Services
            </p>
            <ul className="flex flex-col gap-2.5" role="list">
              {siteConfig.footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#475569] transition-colors duration-150 hover:text-[#4F46E5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4F46E5] rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#64748B]">
              Company
            </p>
            <ul className="flex flex-col gap-2.5" role="list">
              {siteConfig.footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#475569] transition-colors duration-150 hover:text-[#4F46E5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4F46E5] rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#64748B]">
              Contact
            </p>
            <ul className="flex flex-col gap-3" role="list">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-2.5 text-sm text-[#475569] transition-colors duration-150 hover:text-[#4F46E5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4F46E5] rounded"
                >
                  <Mail size={15} className="mt-0.5 shrink-0" />
                  <span className="break-all">{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2.5 text-sm text-[#475569] transition-colors duration-150 hover:text-[#4F46E5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4F46E5] rounded"
                >
                  <Phone size={15} className="shrink-0" />
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex flex-col gap-2 pt-1">
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="flex min-h-[44px] items-center gap-2 text-sm font-semibold text-[#0B1220] hover:text-[#4F46E5]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E7E9F2] text-[#475569]"><Globe size={16} /></span>
                  LinkedIn
                </a>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="flex min-h-[44px] items-center gap-2 text-sm font-semibold text-[#0B1220] hover:text-[#4F46E5]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E7E9F2] text-[#475569]"><Code2 size={16} /></span>
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E7E9F2]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-2 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-center text-xs text-[#64748B] sm:text-left">
            © {year} {siteConfig.agencyName} — Led by CEO {siteConfig.ceoName}. Built for clients worldwide.
          </p>
          <p className="text-xs text-[#64748B]">
            {siteConfig.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
