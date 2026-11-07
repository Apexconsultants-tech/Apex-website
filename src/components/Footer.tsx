import Image from "next/image";
import Link from "next/link";
import { contact, destinations, icef, offices, site, socials } from "@/lib/site-config";
import { flagSize } from "@/lib/flags";

const quickLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Our Services", href: "/#services" },
  { label: "Study Destinations", href: "/destinations" },
  { label: "Partner Universities", href: "/#partner-logos" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact Us", href: "/contact-us" },
] as const;

const officeShortName: Record<string, string> = {
  "karachi-shahrah-e-faisal": "Karachi · Head Office",
  karachi: "Karachi · Gulshan",
  hyderabad: "Hyderabad",
  uk: "United Kingdom",
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#f1f8f2] via-[#eaf5ec] to-[#dff0e4] text-ink">
      {/* gradient hairline + ambient glows */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-logo-lime/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-logo-sky/15 blur-3xl" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(var(--color-brand)_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-8 lg:px-8 lg:pt-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link
              href="/"
              aria-label="Apex Consulting Services home"
              className="inline-flex rounded-2xl bg-white px-4 py-3 border border-line shadow-lg shadow-brand/10 transition-transform hover:-translate-y-0.5"
            >
              <Image
                src="/images/brand/apex-logo.webp"
                alt="Apex Consulting Services"
                width={1520}
                height={283}
                unoptimized
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-soft">
              Trusted overseas education consultancy since {site.foundedYear}. Admissions, visas, and
              student support from Pakistan to the world.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <SocialLink href={socials.facebook} label="Facebook">
                <FacebookIcon />
              </SocialLink>
              <SocialLink href={socials.linkedin} label="LinkedIn">
                <LinkedInIcon />
              </SocialLink>
              <a
                href={contact.whatsappHref}
                data-track="whatsapp_click"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-gradient-to-r from-brand to-logo-teal px-4 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:-translate-y-0.5 hover:shadow-brand/50"
              >
                <ChatIcon /> WhatsApp us
              </a>
            </div>

            <a
              href={icef.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-line bg-white/70 px-3 py-2.5 text-xs text-ink-soft shadow-sm shadow-ink/[0.03] backdrop-blur transition-colors hover:border-brand/50 hover:text-ink"
              title="Verify ICEF Agency Status (IAS) certification"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                <Image src="/images/brand/icef-ias-badge.svg" alt="" width={20} height={20} className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-semibold text-ink">ICEF Agency Status</span>
                IAS #{icef.iasId} · Verify certificate ↗
              </span>
            </a>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <FooterHeading>Explore</FooterHeading>
            <ul className="mt-5 space-y-3 text-sm">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-brand-text">
                    <span className="h-px w-0 bg-brand transition-all duration-300 group-hover:w-3" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div className="lg:col-span-3">
            <FooterHeading>Study destinations</FooterHeading>
            <ul className="mt-5 flex flex-wrap gap-2">
              {destinations.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/${d.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-2.5 py-1 text-xs text-ink-soft shadow-sm shadow-ink/[0.03] transition-all hover:-translate-y-0.5 hover:border-brand/50 hover:bg-white hover:text-brand-text"
                  >
                    <Image src={`/images/flags/${d.flag}.svg`} alt="" {...flagSize(d.flag, 10)} className="shrink-0 rounded-[1px]" />
                    {d.short}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in touch */}
          <div className="lg:col-span-3">
            <FooterHeading>Get in touch</FooterHeading>
            <ul className="mt-5 space-y-3">
              <ContactRow icon={<PhoneIcon />} label="Helpline">
                <a href={contact.phoneHref} data-track="phone_click" className="hover:text-brand-text">{contact.phoneDisplay}</a>
              </ContactRow>
              <ContactRow icon={<MailIcon />} label="Email">
                <a href={`mailto:${contact.email}`} className="break-all hover:text-brand-text">{contact.email}</a>
              </ContactRow>
              <ContactRow icon={<ClockIcon />} label="Hours">
                <span>{contact.hours}</span>
                <span className="block text-xs text-ink-faint">{contact.hoursNote}</span>
              </ContactRow>
            </ul>
          </div>
        </div>

        {/* Offices */}
        <div className="mt-14">
          <FooterHeading>Our offices</FooterHeading>
          <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {offices.map((o) => (
              <li
                key={o.id}
                className="group flex flex-col rounded-2xl border border-line bg-white/70 p-5 backdrop-blur transition-all duration-300 shadow-sm shadow-ink/[0.04] hover:-translate-y-1 hover:border-brand/40 hover:bg-white hover:shadow-lg hover:shadow-brand/10"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-logo-teal text-white">
                    <PinIcon />
                  </span>
                  <strong className="text-sm font-semibold text-ink">{officeShortName[o.id] ?? o.name}</strong>
                </div>
                <p className="mt-3 flex-1 text-xs leading-relaxed text-ink-soft">{o.address}</p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3 text-xs">
                  <span className="text-ink-faint">{o.hours}</span>
                  {"phone" in o && (
                    <a href={o.phone.href} data-track="phone_click" className="font-semibold text-brand-text hover:underline">
                      {o.phone.display}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center">
          <p>© {site.foundedYear}–{year} {site.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-brand-text">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-text">Terms of Service</Link>
            <Link href="/contact-us" className="hover:text-brand-text">Contact Us</Link>
          </div>
        </div>

        {/* Oversized wordmark */}
        <p
          aria-hidden="true"
          className="pointer-events-none mt-8 select-none bg-gradient-to-b from-brand/[0.14] to-transparent bg-clip-text text-center font-display text-[22vw] font-bold leading-[0.8] tracking-tighter text-transparent lg:text-[15rem]"
        >
          APEX
        </p>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink">
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </h3>
  );
}

function ContactRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand/15 bg-brand-tint text-brand-text">
        {icon}
      </span>
      <span className="min-w-0 text-sm text-ink">
        <span className="block text-[11px] uppercase tracking-wider text-ink-faint">{label}</span>
        {children}
      </span>
    </li>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink-soft shadow-sm shadow-ink/[0.04] transition-all hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white"
    >
      {children}
    </a>
  );
}

const iconProps = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true } as const;

function PhoneIcon() {
  return (
    <svg {...iconProps}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="m3 7 9 6 9-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19.1L4 20Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5H16l.5-3H13.5V8.5c0-.87.24-1.46 1.5-1.46H16.5V4.36C16.22 4.32 15.26 4.24 14.14 4.24c-2.34 0-3.94 1.43-3.94 4.05V10.5H7.5v3H10.2V21h3.3Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.4 8.75h3.48V21H3.4V8.75Zm6.2 0h3.34v1.68h.05c.47-.88 1.6-1.8 3.3-1.8 3.52 0 4.17 2.32 4.17 5.33V21h-3.48v-5.34c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.81V21H9.6V8.75Z" />
    </svg>
  );
}
