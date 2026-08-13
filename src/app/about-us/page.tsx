import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import LuggageIllustration from "@/components/LuggageIllustration";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatStrip from "@/components/StatStrip";
import TiltCard from "@/components/TiltCard";
import { aboutSections, contact, coreValues, journey, offices, site, socials } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { getDestination, popularDestinationSlugs } from "@/lib/destinations-data";

export const metadata: Metadata = {
  title: "About Apex Consultants | Study Abroad Since 2009",
  description:
    "Apex Consulting Services has guided students abroad since 2009, with offices in Karachi (HQ), Hyderabad and the UK. ICEF Agency Status IAS #4511 certified.",
  alternates: { canonical: "/about-us" },
};

const detailSections = [
  { id: "story", label: "Our Story", ...aboutSections.story },
  { id: "mission", label: "Our Mission", ...aboutSections.mission },
  { id: "vision", label: "Our Vision", ...aboutSections.vision },
  { id: "student-first", label: "Student-First Approach", ...aboutSections.studentFirst },
  { id: "global-focus", label: "Global Education Focus", ...aboutSections.globalFocus },
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
          <Reveal delay={200} className="mt-8">
            <TiltCard className="overflow-hidden rounded-3xl border border-line shadow-lg shadow-ink/10" max={3}>
              <Image
                src="/images/stock/students-group.webp"
                alt="A diverse group of international students studying together"
                width={1200}
                height={675}
                className="h-56 w-full object-cover sm:h-72"
              />
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* Advisor photo band */}
      <section className="mx-auto max-w-7xl px-5 pt-20 lg:px-8">
        <Reveal className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <TiltCard className="overflow-hidden rounded-3xl border border-line shadow-lg shadow-ink/10" max={4}>
            <Image
              src="/images/stock/advisor-consultation.webp"
              alt="Apex counselors reviewing a student's application together"
              width={1000}
              height={667}
              className="h-64 w-full object-cover sm:h-80"
            />
          </TiltCard>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">How we work</p>
            <p className="mt-3 text-xl font-semibold leading-snug text-ink sm:text-2xl">
              Every file gets a counselor who actually reads it, not a queue.
            </p>
            <p className="mt-4 text-ink-soft leading-relaxed">
              From your first consultation to the day you land, the same team stays with your
              application, so you are never re-explaining your situation to someone new.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Story / Mission / Why choose */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="flex flex-col gap-14">
          {detailSections.map((sec, i) => {
            // Our Story / Mission / Vision get a slightly stronger
            // pop-into-place treatment (scale + more lift) than the rest —
            // a deliberate depth cue for the three sections the brief
            // calls out specifically, staggered so they settle one after
            // another rather than all landing on top of each other.
            const isFeatured = sec.id === "story" || sec.id === "mission" || sec.id === "vision";
            return (
              <Reveal key={sec.id} y={isFeatured ? 32 : 16} scale={isFeatured ? 0.95 : 1} delay={isFeatured ? i * 90 : 0}>
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
                  {sec.id === "global-focus" && (
                    <div className="mt-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint">Popular destination guides</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {popularDestinationSlugs.map((slug) => {
                          const dest = getDestination(slug);
                          if (!dest) return null;
                          return (
                            <Link
                              key={slug}
                              href={`/${slug}`}
                              className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-brand hover:text-brand"
                            >
                              {dest.short}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {sec.id === "why" && (
                    <p className="mt-5 text-sm text-ink-soft">
                      Helpline:{" "}
                      <a href={contact.phoneHref} data-track="phone_click" className="font-semibold text-brand-text hover:underline">
                        {contact.phoneDisplay}
                      </a>
                    </p>
                  )}
                </div>
              </div>
              </Reveal>
            );
          })}

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

      {/* Community photo pair */}
      <section className="border-y border-line bg-surface-2/60 py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="Who we work with" title="Every background, one goal" lead="Students from different cities, fields, and starting points, all working toward the same next chapter." />
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Reveal delay={80}>
              <TiltCard className="overflow-hidden rounded-3xl border border-line shadow-lg shadow-ink/10" max={4}>
                <Image
                  src="/images/stock/south-asian-students.webp"
                  alt="Two students reviewing coursework together before their applications"
                  width={1000}
                  height={667}
                  className="h-64 w-full object-cover"
                />
              </TiltCard>
            </Reveal>
            <Reveal delay={140}>
              <TiltCard className="overflow-hidden rounded-3xl border border-line shadow-lg shadow-ink/10" max={4}>
                <Image
                  src="/images/stock/community-hands.webp"
                  alt="A diverse group of people joining hands, representing the community of students Apex supports"
                  width={1000}
                  height={667}
                  className="h-64 w-full object-cover"
                />
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Graduation photo band */}
      <section className="mx-auto max-w-7xl px-5 pb-4 lg:px-8">
        <Reveal className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">The moment it&apos;s for</p>
            <p className="mt-3 text-xl font-semibold leading-snug text-ink sm:text-2xl">
              Every application, every document, every visa form leads here.
            </p>
            <p className="mt-4 text-ink-soft leading-relaxed">
              We stay focused on the outcome from day one: a student who made it, on their own
              merit, with a team that never lost sight of why the paperwork mattered.
            </p>
          </div>
          <TiltCard className="order-1 overflow-hidden rounded-3xl border border-line shadow-lg shadow-ink/10 lg:order-2" max={4}>
            <Image
              src="/images/stock/graduation.webp"
              alt="Graduates celebrating at a graduation ceremony"
              width={1000}
              height={667}
              className="h-64 w-full object-cover sm:h-80"
            />
          </TiltCard>
        </Reveal>
      </section>

      {/* Pack Your Ambition */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-surface-2 to-surface px-8 py-14 sm:px-14">
            <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(21,128,61,0.16),transparent_70%)] blur-2xl" />
            <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="order-2 flex justify-center lg:order-1">
                <LuggageIllustration className="h-48 w-48 animate-float sm:h-56 sm:w-56" />
              </div>
              <div className="order-1 text-center lg:order-2 lg:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">Ready when you are</p>
                <h2 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">Pack Your Ambition</h2>
                <p className="mx-auto mt-4 max-w-lg text-ink-soft leading-relaxed lg:mx-0">
                  Everything else, the paperwork, the planning, the visa filing, is what we&apos;re here for.
                  Bring the ambition. We&apos;ll help you carry it the rest of the way.
                </p>
                <Link
                  href="/contact-us"
                  className="mt-7 inline-flex rounded-full bg-gradient-to-b from-brand to-brand-deep px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/30"
                >
                  Book free consultation
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
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
                  <p className="mt-2 text-sm leading-relaxed text-white/90">{j.text}</p>
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
          <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="text-brand-text underline underline-offset-2 hover:decoration-2">
            Facebook
          </a>{" "}
          and{" "}
          <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand-text underline underline-offset-2 hover:decoration-2">
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
