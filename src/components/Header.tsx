"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { contact, destinations, serviceLinks } from "@/lib/site-config";
import { flagSize } from "@/lib/flags";

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
      <div className="flex items-center justify-between gap-6 py-2 pl-3 pr-5 lg:py-2.5 lg:pl-4 lg:pr-[43px]">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Apex Consulting Services home">
          {/* unoptimized: Next's image optimizer flattens this file's alpha
              channel onto white when re-encoding it, producing a visible
              white box behind the logo. These are tiny brand assets, so
              skipping optimization to serve the real transparent file has
              no meaningful cost. */}
          <Image
            src="/images/brand/apex-icon.webp"
            alt=""
            width={224}
            height={283}
            priority
            unoptimized
            className="h-12 w-auto sm:h-[54px] lg:h-[58px]"
          />
          {/* Sized by width, not height: this mark's font is proportionally
              wider than the old wordmark's, so a fixed height alone would
              render it ~100px wider than before and push the nav into
              overflow at in-between viewport widths. Matching the old
              wordmark's actual footprint keeps the header layout stable. */}
          <Image
            src="/images/brand/apex-wordmark.webp"
            alt=""
            width={1228}
            height={191}
            priority
            unoptimized
            className="h-auto w-[175px] sm:w-[193px] lg:w-[212px]"
          />
        </Link>

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

      <nav
        className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-gradient-to-b from-brand to-brand-deep p-1.5 shadow-sm shadow-brand/20 xl:flex"
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
            href="/destinations"
            className="flex shrink-0 items-center gap-0.5 whitespace-nowrap rounded-full py-1.5 pl-4 pr-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
          >
            Study Abroad
            <ChevronDown size={11} />
          </Link>
          <div className="invisible absolute left-1/2 top-full z-10 w-[560px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 rounded-xl border border-line bg-surface p-5 shadow-lg shadow-ink/5">
              {destinations.map((d) => (
                <Link
                  key={d.slug}
                  href={`/${d.slug}`}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ink-soft transition-colors hover:bg-brand-tint hover:text-brand"
                >
                  <Image
                    src={`/images/flags/${d.flag}.svg`}
                    alt=""
                    {...flagSize(d.flag, 12)}
                    className="shrink-0 rounded-[1px]"
                  />
                  {d.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="group relative shrink-0">
          <Link
            href="/#services"
            className="flex shrink-0 items-center gap-0.5 whitespace-nowrap rounded-full py-1.5 pl-4 pr-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
          >
            What We Do
            <ChevronDown size={11} />
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
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-ink-soft"
                  onClick={() => setMobileOpen(false)}
                >
                  <Image
                    src={`/images/flags/${d.flag}.svg`}
                    alt=""
                    {...flagSize(d.flag, 12)}
                    className="shrink-0 rounded-[1px]"
                  />
                  {d.short}
                </Link>
              ))}
              <Link
                href="/destinations"
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

function ChevronDown({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.86 11.86 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  );
}
