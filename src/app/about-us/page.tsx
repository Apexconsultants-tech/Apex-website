import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatStrip from "@/components/StatStrip";
import TiltCard from "@/components/TiltCard";
import { aboutSections, contact, coreValues, journey, offices, site, socials } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "About Apex Consultants | Study Abroad Since 2009",
  description:
    "Apex Consulting Services has guided students abroad since 2009, with offices in Karachi (HQ), Hyderabad and the UK. ICEF Agency Status IAS #4511 certified.",
  alternates: { canonical: "/about-us" },
};

const detailSections = [
  { id: "story", label: "Our Story", ...aboutSections.story },
  { id: "mission", label: "Our Mission", ...aboutSections.mission },
  { id: "why", label: "Why Choose Apex", ...aboutSections.whyChoose },
] as const;

export default function AboutUsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About Us", path: "/about-us" }])} />
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-14 lg:px-8 lg:pb-20 lg:pt-20">
        <Breadcrumb current="About Us" />
        <div className="mt-6 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <h1 className="text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl">
              Beyond Numbers, <span className="text-brand">Beyond Borders</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
              <strong className="text-ink">Apex Consulting Services</strong> is a trusted overseas
              education consultancy, helping students across Pakistan and beyond reach leading
              institutions abroad since <strong className="text-ink">{site.foundedYear}</strong>.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              With offices in <strong className="text-ink">Karachi</strong> (Head Office),{" "}
              <strong className="text-ink">Hyderabad</strong>, and the{" "}
              <strong className="text-ink">United Kingdom</strong>, we deliver reliable, transparent,
              and result-oriented guidance, from university and course selection through applications,
              visas, scholarships, and pre-departure support.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact-us"
                className="rounded-full bg-gradient-to-b from-brand to-brand-deep px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/30"
              >
                Book free consultation
              </Link>
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
          <Reveal delay={140}>
            <TiltCard className="overflow-hidden rounded-3xl border border-line" max={4}>
              <Image
                src="/images/gallery/best-consultancy-for-abroad-studies.webp"
                alt="Apex Consulting Services counselors guiding a student"
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* Core values */}
      <section className="border-y border-line bg-surface-2/60 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <SectionHeading align="center" eyebrow="Our principles" title="What we stand for" />
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <TiltCard className="h-full rounded-2xl border border-line bg-surface p-6" max={4}>
                  <h3 className="text-base font-semibold text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.body}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Story / Mission / Why choose */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="flex flex-col gap-14">
          {detailSections.map((sec) => (
            <Reveal key={sec.id}>
              <div id={sec.id} className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
                <h2 className="text-2xl font-semibold text-ink">{sec.label}</h2>
                <div className="max-w-2xl border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
                  <p className="text-ink-soft leading-relaxed">{sec.intro}</p>
                  {"body" in sec && sec.body ? (
                    <p className="mt-3 text-ink-soft leading-relaxed">{sec.body}</p>
                  ) : null}
                  <ul className="mt-5 space-y-2.5">
                    {sec.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm text-ink-soft">
                        <CheckIcon />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  {sec.id === "why" && (
                    <p className="mt-5 text-sm text-ink-soft">
                      Helpline:{" "}
                      <a href={contact.phoneHref} data-track="phone_click" className="font-semibold text-brand hover:underline">
                        {contact.phoneDisplay}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}

          {/* Offices */}
          <Reveal>
            <div id="offices" className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
              <h2 className="text-2xl font-semibold text-ink">Our Offices</h2>
              <div className="max-w-2xl border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
                <ul className="space-y-4">
                  {offices.map((o) => (
                    <li key={o.id} className="text-sm text-ink-soft">
                      <strong className="block text-ink">{o.name}</strong>
                      {o.address}
                    </li>
                  ))}
                  <li className="text-sm text-ink-soft">
                    <strong className="block text-ink">Email</strong>
                    <a href={`mailto:${contact.email}`} className="hover:text-brand">{contact.email}</a>
                  </li>
                  <li className="text-sm text-ink-soft">
                    <strong className="block text-ink">Hours</strong>
                    {contact.hours}
                  </li>
                </ul>
                <Link
                  href="/contact-us"
                  className="mt-6 inline-flex rounded-full bg-gradient-to-b from-brand to-brand-deep px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/30"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Journey */}
      <section className="border-y border-line bg-brand-deep py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <SectionHeading tone="white" align="center" eyebrow="Since 2009" title="Our journey" />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((j, i) => (
              <Reveal key={j.year} delay={i * 90}>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
                  <p className="font-display text-2xl font-semibold text-white">{j.year}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{j.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal>
          <StatStrip />
        </Reveal>
        <p className="mt-6 text-sm text-ink-faint">
          Follow us on{" "}
          <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
            Facebook
          </a>{" "}
          and{" "}
          <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
            LinkedIn
          </a>{" "}
          for updates, events, and student success stories.
        </p>
      </section>
    </>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-brand" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
