import Image from "next/image";
import Link from "next/link";
import CourseFinder from "@/components/CourseFinder";
import FaqAccordion from "@/components/FaqAccordion";
import Globe from "@/components/Globe";
import IcefSection from "@/components/IcefSection";
import PartnerLogoStrip from "@/components/PartnerLogoStrip";
import Reveal from "@/components/Reveal";
import ScrollPopGroup from "@/components/ScrollPopGroup";
import SectionHeading from "@/components/SectionHeading";
import StatStrip from "@/components/StatStrip";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import TiltCard from "@/components/TiltCard";
import { destinationPhoto, destinations } from "@/lib/destinations-data";
import { flagSize } from "@/lib/flags";
import { contact, homeServiceHighlights, serviceLinks, testimonials } from "@/lib/site-config";

const featuredDestinations = destinations.slice(0, 8);

const journeySteps = [
  { title: "Discover", body: "Choose your destination and course with a free consultation.", icon: "discover", from: "#15803d", to: "#166534" },
  { title: "Apply", body: "Shortlist universities and submit strong, complete applications.", icon: "apply", from: "#2563eb", to: "#1d4ed8" },
  { title: "Get Accepted", body: "Receive your offer and start planning finances and scholarships.", icon: "accepted", from: "#0d9488", to: "#0f766e" },
  { title: "Visa", body: "Prepare your student visa application and supporting documents.", icon: "visa", from: "#7c3aed", to: "#6d28d9" },
  { title: "Fly", body: "Pre-departure prep, travel, and accommodation, sorted.", icon: "fly", from: "#0ea5e9", to: "#0284c7" },
  { title: "Study", body: "Begin your international education, with support that doesn't stop.", icon: "study", from: "#166534", to: "#14181a" },
] as const;

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Cinematic full-bleed background photo — a real, high-resolution
            airport departure scene rather than a flat brand-tinted
            background. Everything else in the hero (headline, globe,
            boarding pass) layers on top of it. */}
        <div className="absolute inset-0">
          <Image
            src="/images/stock/hero-cinematic-bg.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        {/* Readability stack: strong on the left where the headline sits,
            fading out toward the globe on the right so the photo still
            reads as photography rather than disappearing under a flat
            wash. A faint brand tint keeps it tied to the site's palette,
            and a bottom fade blends the photo into the page's normal
            background instead of ending in a hard edge. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
        <div className="pointer-events-none absolute inset-0 bg-brand-deep/10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--color-paper)]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-14 lg:px-8 lg:pb-16 lg:pt-20">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                Overseas education consultants since 2009
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-[1.06] text-white sm:text-5xl lg:text-6xl">
                Where Futures <span className="text-brand-tint">Cross Continents</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
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
                  className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative mx-auto aspect-square w-full max-w-lg">
                <div className="animate-float">
                  <Globe />
                </div>
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
                  className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm shadow-ink/[0.03] transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/[0.07]"
                  max={4}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-deep text-white shadow-md shadow-brand/25">
                      <ServiceIcon name={s.icon} />
                    </span>
                    <span className="font-display text-xs font-bold text-ink-faint">{s.number}</span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{s.body}</p>
                  <Link
                    href={`/${s.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
                  >
                    Learn more →
                  </Link>
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
            <TiltCard className="mt-8 overflow-hidden rounded-2xl border border-line shadow-lg shadow-ink/10" max={4}>
              <Image
                src="/images/stock/campus-students-walking.webp"
                alt="Students and visitors on a modern university campus"
                width={1000}
                height={667}
                className="h-56 w-full object-cover sm:h-64"
              />
            </TiltCard>
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
      <section id="destinations" className="relative overflow-hidden border-y border-line py-20">
        <Image
          src="/images/stock/airplane-wing-sky.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[50%_38%]"
        />
        {/* Mostly a dark-for-contrast overlay, not a green wash — the photo's
            own golden-hour color should still read as photography, not be
            buried under a flat brand-tinted filter. A touch of brand-deep is
            blended in at the edges only, to keep the section feeling tied to
            the rest of the page. */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/50 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
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
                      <Image
                        src={destinationPhoto(d.slug)}
                        alt={`${d.name} skyline`}
                        fill
                        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <div className="absolute left-3 top-3 rotate-[-6deg] rounded-sm border border-white/70 bg-white/90 p-1 shadow-sm transition-transform group-hover:rotate-0">
                      <Image src={`/images/flags/${d.flag}.svg`} alt="" {...flagSize(d.flag, 16)} className="block rounded-[1px]" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <span className="block text-sm font-semibold text-white">{d.short}</span>
                      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                          <p className="mt-1.5 text-[11px] leading-snug text-white/80">
                            Universities &middot; Applications &middot; Visa support
                          </p>
                          <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-white">
                            Explore {d.short} →
                          </span>
                        </div>
                      </div>
                    </div>
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

      {/* Journey timeline */}
      <section className="relative overflow-hidden py-20">
        {/* A faint world map + a single flight route spanning the whole
            section ties the six cards together as one continuous journey
            rather than six independent boxes, and echoes the same map/globe
            motif used in the hero instead of introducing an unrelated
            texture. Kept very low-opacity so it never competes with the
            card content sitting on top of it. */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,var(--color-brand-tint),transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.1] [mask-image:linear-gradient(to_bottom,black,transparent)]">
          <Image src="/images/brand/world-map.webp" alt="" fill sizes="100vw" className="object-cover object-center" />
        </div>
        <svg
          className="pointer-events-none absolute inset-x-0 top-[210px] hidden w-full lg:block"
          height="60"
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,45 C 200,10 400,50 600,20 S 1000,50 1200,15"
            fill="none"
            stroke="var(--color-brand)"
            strokeOpacity="0.25"
            strokeWidth="2"
            strokeDasharray="1 9"
            strokeLinecap="round"
          />
        </svg>

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="Your study abroad journey"
              lead="Six stages, one team with you at every one of them."
            />
          </Reveal>

          {/* lg: single row, connector line + plane are real flex siblings
              between the cards so they always land exactly between them —
              no absolute-position guessing. */}
          <div className="mt-12 hidden items-stretch lg:flex">
            {journeySteps.map((step, i) => (
              <div key={step.title} className="flex flex-1 items-stretch">
                <Reveal delay={i * 80} className="flex-1">
                  <JourneyStep step={step} />
                </Reveal>
                {i < journeySteps.length - 1 && (
                  <div className="flex w-10 shrink-0 flex-col items-center justify-start pt-[38px]" aria-hidden="true">
                    <div
                      className="h-0.5 w-full rounded-full"
                      style={{ background: `linear-gradient(to right, ${step.to}, ${journeySteps[i + 1].from})` }}
                    />
                    <span
                      className="-mt-[7px] flex h-3.5 w-3.5 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: journeySteps[i + 1].from }}
                    >
                      <PlaneGlyph small />
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* mobile/tablet: stacked, with a dashed vertical route running
              through the icons — a boarding-pass-style progression instead
              of disconnected cards. */}
          <div className="relative mt-10 lg:hidden">
            <div
              className="absolute left-6 top-6 bottom-6 w-px border-l-2 border-dashed border-line sm:hidden"
              aria-hidden="true"
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {journeySteps.map((step, i) => (
                <Reveal key={step.title} delay={i * 60}>
                  <JourneyStep step={step} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Three-card CTA composition: each card animates in from its own
          side (or pops up, for the primary center card) but all settle into
          a clean, perfectly aligned row — the motion is the only thing
          that's asymmetric, never the resting layout. See .card-left/
          .card-center/.card-right in globals.css for why this isn't built
          on the shared Reveal component or an overflow:hidden wrapper. */}
      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <ScrollPopGroup className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-5">
          {/* Left: boarding-pass style — browse destinations */}
          <div className="card-left lg:mt-6">
            <Link
              href="/partner-universities"
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-dashed border-line bg-surface px-6 py-6 shadow-md shadow-ink/[0.04] transition-all hover:-translate-y-1 hover:border-brand hover:shadow-xl hover:shadow-ink/10"
            >
              <div className="flex items-center justify-between border-b border-dashed border-line pb-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <PlaneGlyph />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-faint">Boarding Pass</span>
              </div>
              <p className="mt-4 font-display text-lg font-semibold text-ink">Explore your destination</p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                Compare 19 country guides, from tuition and visas to scholarships and universities, before you commit.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                Explore destinations
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </div>

          {/* Center: passport style — the primary CTA, visually strongest */}
          <div className="card-center relative z-10 lg:-my-2">
            <Link
              href="/contact-us"
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-brand-deep to-ink px-7 py-8 shadow-2xl shadow-ink/25 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-ink/35"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">Study Abroad Passport</span>
                <PassportEmblem />
              </div>
              <p className="mt-5 font-display text-2xl font-semibold text-white">Start your journey</p>
              <p className="mt-2 flex-1 text-sm text-white/70">
                One free consultation is all it takes to find out where you could go, and what it takes to get there.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-tint">
                Book free consultation
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </div>

          {/* Right: acceptance/consultation style — talk to a human now */}
          <div className="card-right lg:mt-6">
            <a
              href={contact.whatsappHref}
              data-track="whatsapp_click"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface px-6 py-6 shadow-md shadow-ink/[0.04] transition-all hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl hover:shadow-ink/10"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-amber-400/10 blur-2xl" />
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                  <SealIcon />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-faint">Free Consultation</span>
              </div>
              <p className="mt-4 font-display text-lg font-semibold text-ink">Talk to an advisor</p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                Real answers, no obligation. Chat with a counsellor on WhatsApp, {contact.hours.toLowerCase()}.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600">
                Chat on WhatsApp
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </a>
          </div>
        </ScrollPopGroup>
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
        <Reveal delay={100} className="mt-10">
          <TestimonialCarousel items={testimonials} />
        </Reveal>
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
      <section id="faqs" className="relative overflow-hidden border-t border-line bg-surface-2/60 py-20">
        <FaqTypographyWall />
        <div className="relative mx-auto max-w-3xl px-5 lg:px-8">
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

function JourneyStep({ step }: { step: (typeof journeySteps)[number] }) {
  return (
    <TiltCard className="h-full overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-sm shadow-ink/[0.03] transition-shadow hover:shadow-lg hover:shadow-ink/5" max={4}>
      <span
        className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-md"
        style={{ background: `linear-gradient(135deg, ${step.from}, ${step.to})`, boxShadow: `0 8px 16px -6px ${step.to}66` }}
      >
        <JourneyIcon name={step.icon} />
      </span>
      <h3 className="mt-4 text-base font-semibold text-ink">{step.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>
    </TiltCard>
  );
}

function JourneyIcon({ name }: { name: string }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true } as const;
  switch (name) {
    case "discover":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="11" cy="11" r="2.2" fill="currentColor" />
        </svg>
      );
    case "apply":
      return (
        <svg {...common}>
          <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M9 12h6M9 16h6M9 8h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "accepted":
      return (
        <svg {...common}>
          <path d="M12 2 4 5.5v6c0 5 3.4 8.7 8 9.5 4.6-.8 8-4.5 8-9.5v-6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="m8.5 12 2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "visa":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="10" r="2.3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 17c0-1.7 1.8-2.8 4-2.8s4 1.1 4 2.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "fly":
      return (
        <svg {...common} fill="currentColor">
          <path d="M21 15v-2l-8-5V4.5a1.5 1.5 0 0 0-3 0V8l-8 5v2l8-2.5V17l-2.5 1.5V20l4-1 4 1v-1.5L13 17v-4.5l8 2.5Z" />
        </svg>
      );
    case "study":
      return (
        <svg {...common}>
          <path d="M12 3 2 8l10 5 10-5-10-5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 8v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

function PlaneGlyph({ small }: { small?: boolean }) {
  const size = small ? 9 : 18;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21 15v-2l-8-5V4.5a1.5 1.5 0 0 0-3 0V8l-8 5v2l8-2.5V17l-2.5 1.5V20l4-1 4 1v-1.5L13 17v-4.5l8 2.5Z" />
    </svg>
  );
}

// Texture only: real words associated with the process, scattered wide,
// rotated, and kept extremely faint so it reads as a subtle wall pattern
// rather than competing with the FAQ text sitting on top of it. Positions
// deliberately favor the edges outside the centered max-w-3xl FAQ column on
// wide screens, and stay low-opacity enough everywhere that it's still
// texture, not a legibility problem, once that column goes full-width.
const FAQ_WALL_WORDS = [
  { text: "VISA", top: "6%", left: "4%", size: "5rem", rotate: -10, opacity: 0.05 },
  { text: "CAMPUS", top: "16%", left: "78%", size: "3.5rem", rotate: 8, opacity: 0.045 },
  { text: "HOUSING", top: "2%", left: "62%", size: "2.75rem", rotate: -6, opacity: 0.04 },
  { text: "PLANNING", top: "34%", left: "2%", size: "3rem", rotate: 6, opacity: 0.045 },
  { text: "SUPPORT", top: "80%", left: "80%", size: "4rem", rotate: -8, opacity: 0.05 },
  { text: "ADMISSION", top: "48%", left: "83%", size: "2.5rem", rotate: 10, opacity: 0.04 },
  { text: "UNIVERSITY", top: "88%", left: "3%", size: "3.25rem", rotate: -5, opacity: 0.045 },
  { text: "TRAVEL", top: "62%", left: "0%", size: "3.75rem", rotate: 12, opacity: 0.045 },
  { text: "DOCUMENTS", top: "22%", left: "24%", size: "2.25rem", rotate: -14, opacity: 0.03 },
  { text: "SCHOLARSHIP", top: "70%", left: "30%", size: "2.25rem", rotate: 9, opacity: 0.03 },
  { text: "APPLICATION", top: "0%", left: "18%", size: "2.5rem", rotate: 4, opacity: 0.035 },
  { text: "STUDENT LIFE", top: "92%", left: "45%", size: "2.5rem", rotate: -7, opacity: 0.035 },
  { text: "DESTINATION", top: "40%", left: "40%", size: "2.25rem", rotate: 5, opacity: 0.028 },
  { text: "EDUCATION", top: "10%", left: "40%", size: "2.5rem", rotate: -4, opacity: 0.03 },
  { text: "PASSPORT", top: "56%", left: "88%", size: "3rem", rotate: -11, opacity: 0.045 },
  { text: "ARRIVAL", top: "78%", left: "12%", size: "2.5rem", rotate: 7, opacity: 0.035 },
] as const;

function FaqTypographyWall() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {FAQ_WALL_WORDS.map((w) => (
        <span
          key={w.text}
          className="absolute whitespace-nowrap font-display font-bold uppercase tracking-tight text-ink"
          style={{
            top: w.top,
            left: w.left,
            fontSize: w.size,
            opacity: w.opacity,
            transform: `rotate(${w.rotate}deg)`,
          }}
        >
          {w.text}
        </span>
      ))}
    </div>
  );
}

function SealIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2 4 5.5v6c0 5 3.4 8.7 8 9.5 4.6-.8 8-4.5 8-9.5v-6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="m8.5 12 2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PassportEmblem() {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white/80">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18M3 12h18" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </span>
  );
}

function ServiceIcon({ name }: { name: string }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true } as const;
  switch (name) {
    case "admission":
      return (
        <svg {...common}>
          <path d="M12 3 2 8l10 5 8-4v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "visa":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 17c0-1.8 1.8-3 4-3s4 1.2 4 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "travel":
      return (
        <svg {...common}>
          <path
            d="M21 15v-2l-8-5V4.5a1.5 1.5 0 0 0-3 0V8l-8 5v2l8-2.5V17l-2.5 1.5V20l4-1 4 1v-1.5L13 17v-4.5l8 2.5Z"
            fill="currentColor"
          />
        </svg>
      );
    case "test-prep":
      return (
        <svg {...common}>
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v18H6.5A2.5 2.5 0 0 1 4 18.5v-13Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v18h5.5a2.5 2.5 0 0 0 2.5-2.5v-13Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M15 8h3M15 12h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}
