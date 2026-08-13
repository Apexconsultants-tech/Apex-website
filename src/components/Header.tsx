"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { contact, destinations, serviceLinks } from "@/lib/site-config";

const primaryDestinations = destinations.slice(0, 8);

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<"destinations" | "services" | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      {/* Only the icon/abbreviation mark grows here — the wordmark stays
          at its original size. Vertical padding shrinks by exactly the
          same amount the icon grows at every breakpoint, so the header's
          total row height is unchanged even though the mark itself is
          ~40% taller than the original pre-redesign size. */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-2 lg:px-8 lg:py-2.5">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Apex Consulting Services home">
          {/* unoptimized: Next's image optimizer flattens this file's alpha
              channel onto white when re-encoding it, producing a visible
              white box behind the logo. These are tiny brand assets, so
              skipping optimization to serve the real transparent file has
              no meaningful cost. */}
          <Image
            src="/images/brand/apex-icon.webp"
            alt=""
            width={88}
            height={91}
            priority
            unoptimized
            className="h-14 w-auto sm:h-[62px] lg:h-[68px]"
          />
          <Image
            src="/images/brand/apex-wordmark.webp"
            alt=""
            width={388}
            height={91}
            priority
            unoptimized
            className="h-10 w-auto sm:h-11 lg:h-12"
          />
        </Link>

        <nav
          className="hidden shrink-0 items-center gap-1 rounded-full bg-gradient-to-b from-brand to-brand-deep p-1.5 shadow-sm shadow-brand/20 xl:flex"
          aria-label="Primary"
        >
          <Link
            href="/"
            className="shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
          >
            Home
          </Link>

          <div className="group relative shrink-0">
            <Link
              href="/#destinations"
              className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
            >
              Study Abroad
              <ChevronDown />
            </Link>
            <div className="invisible absolute left-1/2 top-full z-10 w-[560px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="grid grid-cols-2 gap-x-6 gap-y-1 rounded-xl border border-line bg-surface p-5 shadow-lg shadow-ink/5">
                {destinations.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/${d.slug}`}
                    className="rounded-md px-2 py-1.5 text-sm text-ink-soft transition-colors hover:bg-brand-tint hover:text-brand"
                  >
                    {d.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="group relative shrink-0">
            <Link
              href="/#services"
              className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
            >
              What We Do
              <ChevronDown />
            </Link>
            <div className="invisible absolute left-1/2 top-full z-10 w-72 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="flex flex-col gap-1 rounded-xl border border-line bg-surface p-3 shadow-lg shadow-ink/5">
                {serviceLinks.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/${s.slug}`}
                    className="rounded-md px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-brand-tint hover:text-brand"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/about-us"
            className="shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
          >
            About Us
          </Link>
          <Link
            href="/blogs"
            className="shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
          >
            Blog
          </Link>
          <Link
            href="/contact-us"
            className="shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
          >
            Contact Us
          </Link>
        </nav>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          {/* WhatsApp's official bright green (#25D366) is fine here — icon-only,
              so it's judged on graphical contrast, not the stricter 4.5:1 text
              rule. The mobile "Chat on WhatsApp" button below has visible text on
              this same green and fails that rule at ~2:1, so it uses a darkened
              variant instead (confirmed with axe-core). */}
          <a
            href={contact.whatsappHref} data-track="whatsapp_click"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm shadow-[#25D366]/30 transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#25D366]/40"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon />
          </a>
          <Link
            href="/contact-us"
            className="rounded-full bg-gradient-to-b from-brand to-brand-deep px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand/20 transition-all hover:shadow-md hover:shadow-brand/30"
          >
            Book free consultation
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink xl:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {mobileOpen && (
        <nav id="mobile-nav" className="border-t border-line bg-surface px-5 pb-6 pt-2 xl:hidden" aria-label="Mobile">
          <Link href="/" className="block py-3 text-sm font-medium text-ink" onClick={() => setMobileOpen(false)}>
            Home
          </Link>

          <button
            type="button"
            className="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-ink"
            aria-expanded={mobileSection === "destinations"}
            onClick={() => setMobileSection((s) => (s === "destinations" ? null : "destinations"))}
          >
            Study Abroad
            <ChevronDown />
          </button>
          {mobileSection === "destinations" && (
            <div className="grid grid-cols-2 gap-1 pb-2 pl-2">
              {primaryDestinations.map((d) => (
                <Link
                  key={d.slug}
                  href={`/${d.slug}`}
                  className="rounded-md px-2 py-2 text-sm text-ink-soft"
                  onClick={() => setMobileOpen(false)}
                >
                  {d.short}
                </Link>
              ))}
              <Link
                href="/#destinations"
                className="col-span-2 rounded-md px-2 py-2 text-sm font-medium text-brand-text"
                onClick={() => setMobileOpen(false)}
              >
                View all destinations →
              </Link>
            </div>
          )}

          <button
            type="button"
            className="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-ink"
            aria-expanded={mobileSection === "services"}
            onClick={() => setMobileSection((s) => (s === "services" ? null : "services"))}
          >
            What We Do
            <ChevronDown />
          </button>
          {mobileSection === "services" && (
            <div className="flex flex-col gap-1 pb-2 pl-2">
              {serviceLinks.map((s) => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="rounded-md px-2 py-2 text-sm text-ink-soft"
                  onClick={() => setMobileOpen(false)}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          )}

          <Link href="/about-us" className="block py-3 text-sm font-medium text-ink" onClick={() => setMobileOpen(false)}>
            About Us
          </Link>
          <Link href="/blogs" className="block py-3 text-sm font-medium text-ink" onClick={() => setMobileOpen(false)}>
            Blog
          </Link>
          <Link href="/contact-us" className="block py-3 text-sm font-medium text-ink" onClick={() => setMobileOpen(false)}>
            Contact Us
          </Link>

          <div className="mt-3 flex flex-col gap-3">
            <a
              href={contact.whatsappHref} data-track="whatsapp_click"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-[#167e3d] py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#167e3d]/30"
            >
              <WhatsAppIcon /> Chat on WhatsApp
            </a>
            <Link
              href="/contact-us"
              className="rounded-full bg-gradient-to-b from-brand to-brand-deep py-2.5 text-center text-sm font-semibold text-white shadow-sm shadow-brand/20"
              onClick={() => setMobileOpen(false)}
            >
              Book free consultation
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.33 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.84 14.24c-.25.7-1.24 1.28-2.02 1.44-.55.11-1.26.2-3.67-.79-3.08-1.27-5.06-4.4-5.22-4.6-.15-.21-1.25-1.67-1.25-3.19 0-1.51.79-2.26 1.08-2.57.25-.27.6-.39.94-.39.11 0 .22 0 .32.01.28.01.42.02.6.44.23.54.78 1.87.85 2.01.07.14.11.3.02.48-.08.19-.13.3-.26.45-.14.16-.28.35-.4.47-.14.13-.28.28-.12.55.15.27.68 1.12 1.46 1.81 1 .89 1.84 1.17 2.11 1.3.28.14.44.12.6-.06.16-.18.68-.79.87-1.06.18-.27.36-.22.6-.13.25.09 1.58.75 1.85.89.28.14.46.2.53.32.07.12.07.68-.18 1.38Z" />
    </svg>
  );
}
