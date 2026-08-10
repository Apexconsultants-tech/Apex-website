import Image from "next/image";
import Link from "next/link";
import CourseFinder from "@/components/CourseFinder";
import DestinationSkyline from "@/components/DestinationSkyline";
import FaqAccordion from "@/components/FaqAccordion";
import Globe from "@/components/Globe";
import IcefSection from "@/components/IcefSection";
import PartnerLogoStrip from "@/components/PartnerLogoStrip";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatStrip from "@/components/StatStrip";
import TestimonialCard from "@/components/TestimonialCard";
import TiltCard from "@/components/TiltCard";
import { destinations } from "@/lib/destinations-data";
import { contact, homeServiceHighlights, serviceLinks, testimonials } from "@/lib/site-config";

const featuredDestinations = destinations.slice(0, 8);

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-brand-tint),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_40%,rgba(21,128,61,0.05)_100%)]" />
        <div className="pointer-events-none absolute -right-24 top-1/4 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(21,128,61,0.18),transparent_70%)] blur-2xl" />
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-14 lg:px-8 lg:pb-16 lg:pt-20">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                Overseas education consultants since 2009
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-[1.06] text-ink sm:text-5xl lg:text-6xl">
                Where Futures <span className="text-brand">Cross Continents</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
                Since 2009, Apex Consulting Services has guided students from Karachi, Hyderabad, and
                beyond into leading universities in the UK, USA, Canada, Australia, and more. As
                ICEF-certified overseas education consultants, we build the right plan for your future,
                from your first consultation to the day you land abroad.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact-us"
                  className="rounded-full bg-gradient-to-b from-brand to-brand-deep px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/35"
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

            <Reveal delay={120}>
              <div className="mx-auto aspect-square w-full max-w-lg animate-float">
                <Globe />
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="mt-6 lg:mt-2">
            <CourseFinder />
          </Reveal>

          <Reveal delay={260} className="mt-14">
            <StatStrip />
          </Reveal>
        </div>
      </section>

      {/* ICEF */}
      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <Reveal>
          <IcefSection />
        </Reveal>
      </section>

      <PartnerLogoStrip />

      {/* Services teaser */}
      <section id="services" className="border-y border-line bg-surface-2/60 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="What we do"
              title="Admissions, visas & student support"
              lead="Four pillars of end-to-end guidance, from choosing the right course to settling in after you land."
            />
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {homeServiceHighlights.map((s, i) => (
              <Reveal key={s.number} delay={i * 80}>
                <TiltCard
                  className="h-full rounded-2xl border border-line bg-surface p-6 shadow-sm shadow-ink/[0.03] transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/[0.07]"
                  max={4}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-deep font-display text-sm font-bold text-white shadow-md shadow-brand/25">
                    {s.number}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          <Reveal delay={320} className="mt-8 flex flex-wrap gap-2">
            {serviceLinks.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="rounded-full border border-line bg-surface px-4 py-2 text-xs font-medium text-ink-soft transition-colors hover:border-brand hover:text-brand"
              >
                {s.label}
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* About teaser */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">Since 2009</p>
            <h2 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">
              Your <span className="text-brand">trusted partner</span> in global education
            </h2>
            <p className="mt-4 max-w-lg text-ink-soft">
              Apex has helped students across Pakistan and beyond with admissions to top universities
              abroad and end-to-end support, from course selection through visas, scholarships, and
              pre-departure preparation.
            </p>
            <Link
              href="/about-us"
              className="mt-6 inline-flex rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand"
            >
              More about Apex →
            </Link>
          </Reveal>
          <Reveal delay={120} className="grid grid-cols-2 gap-4">
            <TiltCard className="rounded-2xl bg-gradient-to-br from-brand-tint to-surface p-6 shadow-sm shadow-brand/10" max={5}>
              <p className="font-display text-3xl font-semibold text-brand">15+</p>
              <p className="mt-1 text-sm text-ink-soft">Years guiding students abroad</p>
            </TiltCard>
            <TiltCard className="mt-8 rounded-2xl bg-gradient-to-br from-ink to-[#0a0d0e] p-6 shadow-lg shadow-ink/20" max={5}>
              <p className="font-display text-3xl font-semibold text-white">3</p>
              <p className="mt-1 text-sm text-white/70">Offices in Karachi, Hyderabad, and the UK</p>
            </TiltCard>
            <TiltCard className="rounded-2xl border border-line bg-surface-2 p-6 shadow-sm shadow-ink/[0.03]" max={5}>
              <p className="font-display text-3xl font-semibold text-ink">19</p>
              <p className="mt-1 text-sm text-ink-soft">Dedicated destination guides</p>
            </TiltCard>
            <TiltCard className="mt-8 rounded-2xl border border-line bg-surface p-6 shadow-sm shadow-ink/[0.03]" max={5}>
              <p className="font-display text-3xl font-semibold text-ink">ICEF</p>
              <p className="mt-1 text-sm text-ink-soft">Agency Status certified</p>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* Destinations teaser */}
      <section id="destinations" className="border-y border-line bg-brand-deep py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <SectionHeading
              tone="white"
              eyebrow="Study destinations"
              title="Your dream study destination awaits"
              lead="We guide students across 50+ countries in total. Here are the 19 we've built full destination guides for, from the UK and USA to Northern Europe and East Asia."
            />
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featuredDestinations.map((d, i) => (
              <Reveal key={d.slug} delay={i * 60}>
                <Link href={`/${d.slug}`} className="group block">
                  <TiltCard
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-dashed border-white/25 shadow-xl shadow-black/25 transition-all hover:shadow-2xl hover:shadow-black/40 group-hover:border-white/50"
                    max={5}
                  >
                    <div className="absolute inset-0 scale-110 transition-transform duration-700 group-hover:scale-[1.18]">
                      <DestinationSkyline slug={d.slug} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute left-3 top-3 rotate-[-6deg] rounded-sm border border-white/70 bg-white/90 p-1 shadow-sm transition-transform group-hover:rotate-0">
                      <Image src={`/images/flags/${d.flag}.svg`} alt="" width={22} height={16} className="block h-4 w-[22px] rounded-[1px]" />
                    </div>
                    <span className="absolute bottom-3 left-3 text-sm font-semibold text-white">{d.short}</span>
                  </TiltCard>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} className="mt-8 text-center">
            <Link
              href="/partner-universities"
              className="inline-flex rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white"
            >
              View all destinations
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Real outcomes"
            title="Student success stories"
            lead="A few of the students Apex has guided to offers abroad, real names, real universities."
          />
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 6).map((t, i) => (
            <Reveal key={t.name} delay={i * 70}>
              <TiltCard max={4} className="h-full">
                <TestimonialCard item={t} />
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <Reveal delay={260} className="mt-8 text-center">
          <Link
            href="/success-stories"
            className="inline-flex rounded-full border border-line px-6 py-2.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand"
          >
            View all success stories
          </Link>
        </Reveal>
      </section>

      {/* FAQ */}
      <section id="faqs" className="border-t border-line bg-surface-2/60 py-20">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <Reveal>
            <SectionHeading align="center" eyebrow="Common questions" title="Visa FAQs" />
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <FaqAccordion />
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal>
          <div className="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-deep px-8 py-12 shadow-2xl shadow-brand/25 sm:px-12 lg:flex-row lg:items-center">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Get ready to begin <span className="text-brand-tint">your journey</span>
              </h2>
              <p className="mt-3 max-w-lg text-white/80">
                Apex Consulting Services is a trusted overseas education consultancy since 2009,
                helping students reach leading universities abroad with transparent, end-to-end guidance.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/contact-us"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-deep transition-all hover:-translate-y-0.5 hover:bg-white/90"
              >
                Contact Us
              </Link>
              <a
                href={contact.whatsappHref} data-track="whatsapp_click"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
