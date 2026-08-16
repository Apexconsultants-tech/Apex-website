import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import OfficeLocations from "@/components/OfficeLocations";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";
import { contact, socials } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/structured-data";

const contactTitle = "Contact Us | Karachi, Hyderabad & UK";
const contactDescription =
  "Get in touch with Apex Consulting Services for a free study abroad consultation. Offices in Karachi (Head Office), Hyderabad & the UK. Call or WhatsApp.";

export const metadata: Metadata = {
  title: contactTitle,
  description: contactDescription,
  alternates: { canonical: "/contact-us" },
  openGraph: { title: contactTitle, description: contactDescription, url: "/contact-us", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: contactTitle, description: contactDescription, images: ["/opengraph-image"] },
};

export default function ContactUsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact Us", path: "/contact-us" }])} />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-brand-tint),transparent_55%)]" />
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-14 lg:px-8 lg:pb-20 lg:pt-20">
          <Breadcrumb current="Contact Us" />
          <div className="mt-6 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <h1 className="text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl">
                We are <span className="text-brand">here for you</span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
                Have questions about studying abroad, admissions, or visas? Our counselors in{" "}
                <strong className="text-ink">Karachi</strong>, <strong className="text-ink">Hyderabad</strong>,
                and the <strong className="text-ink">UK</strong> are ready to help with transparent,
                student-first guidance.
              </p>
              <p className="mt-4 text-ink-soft">
                Call our helpline, message us on WhatsApp, or send an enquiry. We typically respond during
                office hours: <strong className="text-ink">{contact.hours}</strong>.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={contact.phoneHref} data-track="phone_click"
                  className="rounded-full bg-gradient-to-b from-brand to-brand-deep px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/30"
                >
                  {contact.phoneDisplay}
                </a>
                <a
                  href={contact.whatsappHref} data-track="whatsapp_click"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </Reveal>
            {/* Not wrapped in Reveal: hero/LCP image, must paint immediately. */}
            <TiltCard className="overflow-hidden rounded-3xl border border-line shadow-lg shadow-ink/10" max={4}>
              <Image
                src="/images/stock/advisor-consultation.webp"
                alt="Apex counselors ready to help with your study abroad questions"
                width={1000}
                height={667}
                priority
                className="h-64 w-full object-cover sm:h-80"
              />
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Quick contact cards */}
      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Helpline", value: contact.phoneDisplay, href: contact.phoneHref, track: "phone_click", icon: "phone" as const },
            { title: "Email Us", value: contact.email, href: `mailto:${contact.email}`, icon: "email" as const },
            { title: "WhatsApp", value: "Quick chat with our team", href: contact.whatsappHref, external: true, track: "whatsapp_click", icon: "whatsapp" as const },
            { title: "Office Hours", value: contact.hours, icon: "clock" as const },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 70} className="h-full">
              <TiltCard max={4} className="h-full">
                <ContactCard {...c} />
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="border-y border-line bg-surface-2/60 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 lg:grid-cols-[1fr_1.2fr] lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="Get in touch" title="Send us an enquiry" />
            <p className="mt-4 text-ink-soft">
              Fill in the form and our counselors will reach out with personalized advice for your
              preferred destination and intake.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-ink-soft">
              <li>Free expert consultation</li>
              <li>Admissions &amp; visa guidance</li>
              <li>Response via call, WhatsApp, or email</li>
            </ul>
          </Reveal>
          <Reveal delay={120} className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Offices */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal>
          <SectionHeading align="center" eyebrow="Find us" title="Our office locations" />
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <OfficeLocations />
        </Reveal>
      </section>

      {/* Connect */}
      <section className="border-t border-line bg-brand-deep py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 lg:flex-row lg:items-center lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-white">Connect with Apex online</h2>
            <p className="mt-2 max-w-md text-white/90">
              Follow us for admissions updates, visa tips, counseling events, and student success stories.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white"
            >
              Facebook
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white"
            >
              LinkedIn
            </a>
            <a
              href={contact.whatsappHref} data-track="whatsapp_click"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-deep transition-colors hover:bg-white/90"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

type ContactIcon = "phone" | "email" | "whatsapp" | "clock";

function ContactCard({
  title,
  value,
  href,
  external,
  track,
  icon,
}: {
  title: string;
  value: string;
  href?: string;
  external?: boolean;
  track?: string;
  icon: ContactIcon;
}) {
  const content = (
    <>
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-deep text-white shadow-sm shadow-brand/25">
        <ContactIconGlyph name={icon} />
      </span>
      <h3 className="mt-3 text-sm font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-ink-soft">{value}</p>
    </>
  );

  if (!href) {
    return <div className="flex h-full flex-col justify-center rounded-2xl border border-line bg-surface p-5">{content}</div>;
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      data-track={track}
      className="flex h-full flex-col justify-center rounded-2xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-md hover:shadow-ink/5"
    >
      {content}
    </a>
  );
}

function ContactIconGlyph({ name }: { name: ContactIcon }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true } as const;
  switch (name) {
    case "phone":
      return (
        <svg {...common}>
          <path
            d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.5 21 3 13.5 3 4.7c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.2 1.1L6.6 10.8Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "email":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="m4 6.5 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.33 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.84 14.24c-.25.7-1.24 1.28-2.02 1.44-.55.11-1.26.2-3.67-.79-3.08-1.27-5.06-4.4-5.22-4.6-.15-.21-1.25-1.67-1.25-3.19 0-1.51.79-2.26 1.08-2.57.25-.27.6-.39.94-.39.11 0 .22 0 .32.01.28.01.42.02.6.44.23.54.78 1.87.85 2.01.07.14.11.3.02.48-.08.19-.13.3-.26.45-.14.16-.28.35-.4.47-.14.13-.28.28-.12.55.15.27.68 1.12 1.46 1.81 1 .89 1.84 1.17 2.11 1.3.28.14.44.12.6-.06.16-.18.68-.79.87-1.06.18-.27.36-.22.6-.13.25.09 1.58.75 1.85.89.28.14.46.2.53.32.07.12.07.68-.18 1.38Z" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}
