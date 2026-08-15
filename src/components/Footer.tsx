import Image from "next/image";
import Link from "next/link";
import { contact, destinations, icef, offices, site, socials } from "@/lib/site-config";
import { flagSize } from "@/lib/flags";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Link href="/" aria-label="Apex Consulting Services home">
              <Image
                src="/images/brand/apex-logo.webp"
                alt="Apex Consulting Services"
                width={1520}
                height={283}
                unoptimized
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              Trusted overseas education consultancy since {site.foundedYear}. Admissions, visas, and
              student support from Pakistan to the world.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-brand hover:text-brand"
              >
                <FacebookIcon />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-brand hover:text-brand"
              >
                <LinkedInIcon />
              </a>
            </div>
            <a
              href={icef.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-xs font-medium text-ink-soft transition-colors hover:border-brand hover:text-brand"
              title="Verify ICEF Agency Status (IAS) certification"
            >
              <Image src="/images/brand/icef-ias-badge.svg" alt="" width={20} height={20} className="h-5 w-5" />
              ICEF Agency Status, IAS #{icef.iasId}
            </a>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Important Links</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
              <li><Link href="/about-us" className="hover:text-brand">About Us</Link></li>
              <li><Link href="/#services" className="hover:text-brand">Our Services</Link></li>
              <li><Link href="/destinations" className="hover:text-brand">Study Destinations</Link></li>
              <li><Link href="/#partner-logos" className="hover:text-brand">Partner Universities</Link></li>
              <li><Link href="/success-stories" className="hover:text-brand">Success Stories</Link></li>
              <li><Link href="/faqs" className="hover:text-brand">FAQs</Link></li>
              <li><Link href="/contact-us" className="hover:text-brand">Contact Us</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Study Destinations</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-ink-soft sm:grid-cols-3">
              {destinations.map((d) => (
                <li key={d.slug}>
                  <Link href={`/${d.slug}`} className="flex items-center gap-1.5 hover:text-brand">
                    <Image
                      src={`/images/flags/${d.flag}.svg`}
                      alt=""
                      {...flagSize(d.flag, 10)}
                      className="shrink-0 rounded-[1px]"
                    />
                    <span className="truncate">{d.short}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Contact Us</h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-soft">
              {offices.slice(0, 2).map((o) => (
                <li key={o.id}>
                  <strong className="block text-ink">{o.name}</strong>
                  <span>{o.address}</span>
                </li>
              ))}
              <li>
                <strong className="block text-ink">Helpline</strong>
                <a href={contact.phoneHref} data-track="phone_click" className="hover:text-brand">{contact.phoneDisplay}</a>
              </li>
              <li>
                <strong className="block text-ink">Email</strong>
                <a href={`mailto:${contact.email}`} className="hover:text-brand">{contact.email}</a>
              </li>
              <li>
                <strong className="block text-ink">Hours</strong>
                <span>{contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center">
          <p>Copyright © {site.foundedYear}–{year}. {site.name}</p>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-brand">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand">Terms of Service</Link>
            <Link href="/contact-us" className="hover:text-brand">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
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
