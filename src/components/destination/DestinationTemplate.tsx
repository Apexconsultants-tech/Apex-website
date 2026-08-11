import Image from "next/image";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import PassportStamp from "@/components/PassportStamp";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";
import Breadcrumb from "@/components/Breadcrumb";
import type { Destination } from "@/lib/destinations-data";
import { destinationPhoto } from "@/lib/destinations-data";
import { destinationLifePhoto } from "@/lib/destination-photos.server";
import { flagSize } from "@/lib/flags";
import { contact } from "@/lib/site-config";

function stampCode(d: Destination) {
  return d.short.toUpperCase();
}

// First sentence only — d.cost and d.postStudyWork are full paragraphs
// written for their own sections; timeline cards need a clause, not a repeat
// of that whole paragraph.
function firstClause(text: string) {
  const match = text.match(/^[^.]+\./);
  return match ? match[0] : text;
}

// Lowercases only the very first letter of the very first item — the one
// that actually starts the mid-sentence clause — and leaves every other
// item's own capitalization alone, so a later item like "English proficiency
// scores" doesn't get incorrectly lowercased just because it's in the list,
// and acronyms like CAS/TB/IHS never get mangled into "cas"/"tb"/"ihs".
function lowerFirstItem(items: string[]) {
  return items.map((item, i) => (i === 0 ? item.charAt(0).toLowerCase() + item.slice(1) : item));
}

// Every step below pulls from d's own real, already fact-checked fields
// (requirements, universities, visaRequirements, cost, scholarships,
// postStudyWork) rather than repeating identical copy with only the country
// name swapped in — so the process genuinely differs from one destination
// page to the next, the way applying to different countries actually does.
// Where the underlying requirement can vary by university or program, that's
// said explicitly rather than presented as a fixed guarantee.
function buildTimeline(d: Destination) {
  const uniNames = d.universities.slice(0, 2).map((u) => u.name);
  const uniLine =
    uniNames.length > 0
      ? `institutions like ${uniNames.join(" and ")} (the exact shortlist depends on your grades, budget, and course)`
      : `universities in ${d.name} that genuinely fit your goals`;

  const reqSample = lowerFirstItem(d.requirements.slice(0, 2));
  const reqLine =
    reqSample.length > 0
      ? `Most ${d.name} universities ask for ${reqSample.join(" and ")}, though the exact list and deadlines vary by institution and program`
      : `Requirements vary by institution and program`;

  const scholarshipCount = d.scholarships.length;
  const costClause = firstClause(d.cost);

  const visaSample = lowerFirstItem(d.visaRequirements.slice(0, 2));
  const visaLine =
    visaSample.length > 0
      ? `including ${visaSample.join(" and ")}`
      : "and every required supporting document";

  const postStudyClause = firstClause(d.postStudyWork);

  return [
    {
      title: "Research & shortlisting",
      body: `We assess your academic profile and budget, then shortlist from ${uniLine}.`,
    },
    {
      title: "Admission requirements & applications",
      body: `${reqLine} — we confirm exactly what your shortlisted universities need before you apply, then prepare and track every application.`,
    },
    {
      title: "Offer & financial planning",
      body: `${costClause} Once you have an offer, we help you plan for it${scholarshipCount > 0 ? ` and check your eligibility across ${scholarshipCount} scholarship route${scholarshipCount > 1 ? "s" : ""} we track for ${d.name}` : ""}.`,
    },
    {
      title: "Visa filing",
      body: `We prepare your ${d.visaName} application ${visaLine}, staying current on requirements as they change.`,
    },
    {
      title: "Pre-departure preparation",
      body: `Guidance on accommodation, travel documentation, packing, and what to expect in your first weeks in ${d.name}.`,
    },
    {
      title: "Arrival & after",
      body: `Support with local registration and settling in from day one. ${postStudyClause}`,
    },
  ];
}

export default function DestinationTemplate({ d }: { d: Destination }) {
  const timeline = buildTimeline(d);

  const studentLife = [
    {
      title: "Types of institutions",
      body: `${d.name} offers a mix of public/state universities, private universities, and specialised or applied-science institutions. The right type depends on your budget, field, and career goals, we help you compare them directly.`,
    },
    {
      title: "Accommodation",
      body: "Most students choose between university halls of residence, private student accommodation, or shared housing near campus. We guide you toward options that fit your budget before you arrive.",
    },
    {
      title: "Student life",
      body: "Expect an academic calendar built around lectures, seminars, and independent study, alongside student societies, clubs, and campus events that make it easier to settle in and build a network.",
    },
    {
      title: "Working while studying",
      body: "Most study visas allow part-time work during term and longer hours during scheduled breaks, though exact limits vary by destination and visa type. We confirm the current rules for your specific visa before you apply.",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-brand-tint),transparent_55%)]" />
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-10 lg:px-8 lg:pt-14">
          <Breadcrumb current={d.name} />
          <div className="mt-6 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                <FlagIcon code={d.flag} /> Study Abroad
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-[1.06] text-ink sm:text-5xl">
                Study in <span className="text-brand">{d.name}</span>
              </h1>
              <div className="mt-5 flex flex-wrap gap-2">
                {d.heroStats.map((s) => (
                  <span key={s} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-ink-soft">
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">{d.intro}</p>
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
            <Reveal delay={140} className="relative">
              <TiltCard
                className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line shadow-lg shadow-ink/10"
                max={4}
              >
                <Image
                  src={destinationPhoto(d.slug)}
                  alt={`${d.name} skyline`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 rotate-[-6deg] rounded-sm border border-ink/10 bg-white/95 p-1.5 shadow-sm">
                  <Image src={`/images/flags/${d.flag}.svg`} alt="" {...flagSize(d.flag, 20)} className="block rounded-[1px]" />
                </div>
              </TiltCard>
              {/* Passport-stamp motif: a genuine ink-stamp layout, not a
                  photo crop, so every destination gets the same authentic
                  stamp template with just its own code. */}
              <PassportStamp
                code={stampCode(d)}
                className="absolute -bottom-6 -right-4 h-24 w-24 drop-shadow-lg sm:-bottom-8 sm:-right-6 sm:h-28 sm:w-28"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why study */}
      <section className="border-y border-line bg-surface-2/60 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="Why this destination" title={`Why study in ${d.name}?`} />
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {d.whyPoints.map((w, i) => (
              <Reveal key={w.title} delay={i * 80}>
                <TiltCard className="h-full rounded-2xl border border-line bg-surface p-6" max={4}>
                  <h3 className="text-base font-semibold text-ink">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{w.body}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Campus life photo band */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <TiltCard className="overflow-hidden rounded-3xl border border-line shadow-lg shadow-ink/10" max={4}>
            <Image
              src={destinationLifePhoto(d.slug)}
              alt={`Students on campus in ${d.name}`}
              width={1000}
              height={667}
              className="h-64 w-full object-cover object-center sm:h-80"
            />
          </TiltCard>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">Life as a student in {d.name}</p>
            <p className="mt-3 text-xl font-semibold leading-snug text-ink sm:text-2xl">
              Beyond the classroom: campus life, new friendships, and a genuinely global environment.
            </p>
            <p className="mt-4 text-ink-soft leading-relaxed">
              Every destination we support comes with real academic culture, student societies, and a
              community of international students navigating the same journey as you. We help you find
              the university where that fits best.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Requirements + Universities */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-semibold text-ink">Admission requirements</h2>
            <p className="mt-2 text-sm text-ink-soft">Requirements vary by university and program, but generally include:</p>
            <ul className="mt-5 space-y-2.5">
              {d.requirements.map((r) => (
                <li key={r} className="flex gap-3 text-sm text-ink-soft">
                  <CheckIcon />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-2xl font-semibold text-ink">Universities in {d.name}</h2>
            <div className="mt-5 space-y-3">
              {d.universities.map((u) => (
                <div key={u.name} className="rounded-xl border border-line bg-surface px-5 py-4">
                  <p className="text-sm font-semibold text-ink">{u.name}</p>
                  {u.note && <p className="mt-0.5 text-xs text-ink-faint">{u.note}</p>}
                </div>
              ))}
            </div>
            <Link href="/partner-universities" className="mt-4 inline-flex text-sm font-semibold text-brand hover:underline">
              View all partner universities →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Cost / Scholarships */}
      <section className="border-y border-line bg-surface-2/60 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
            <Reveal>
              <h2 className="text-2xl font-semibold text-ink">Cost of studying in {d.name}</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">{d.cost}</p>
              <Link href="/financial-assistance" className="mt-4 inline-flex text-sm font-semibold text-brand hover:underline">
                Explore Financial Assistance →
              </Link>
            </Reveal>
            {d.scholarships.length > 0 && (
              <Reveal delay={100}>
                <h2 className="text-2xl font-semibold text-ink">Scholarships</h2>
                <ul className="mt-5 space-y-2.5">
                  {d.scholarships.map((s) => (
                    <li key={s} className="flex gap-3 text-sm text-ink-soft">
                      <CheckIcon />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Visa / Post-study */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-semibold text-ink">{d.visaName}</h2>
            <ul className="mt-5 space-y-2.5">
              {d.visaRequirements.map((r) => (
                <li key={r} className="flex gap-3 text-sm text-ink-soft">
                  <CheckIcon />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <Link href="/student-visa-assistance" className="mt-4 inline-flex text-sm font-semibold text-brand hover:underline">
              See Student Visa Assistance →
            </Link>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-2xl font-semibold text-ink">Post-study work opportunities</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">{d.postStudyWork}</p>
            <Link href="/career-counseling" className="mt-4 inline-flex text-sm font-semibold text-brand hover:underline">
              See Career Counseling →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Application timeline */}
      <section className="border-y border-line bg-surface-2/60 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="How it works" title={`Your application timeline for ${d.name}`} lead="A typical path from first consultation to arrival. Apex works alongside you at every step." />
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {timeline.map((step, i) => (
              <Reveal key={step.title} delay={i * 70}>
                <TiltCard className="h-full rounded-2xl border border-line bg-surface p-6" max={4}>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-tint font-display text-sm font-bold text-brand">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Student life practicalities */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Life in your new city" title="Settling in, working, and studying" />
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {studentLife.map((topic, i) => (
            <Reveal key={topic.title} delay={i * 70}>
              <TiltCard className="h-full rounded-2xl border border-line bg-surface p-6" max={4}>
                <h3 className="text-base font-semibold text-ink">{topic.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{topic.body}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-surface-2/60 py-20">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <Reveal>
            <SectionHeading align="center" eyebrow="Common questions" title={`Got questions about ${d.name}?`} />
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <FaqAccordion items={d.faqs} />
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal>
          <div className="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-3xl px-8 py-12 sm:px-12 lg:flex-row lg:items-center">
            <Image
              src="/images/stock/graduation.webp"
              alt=""
              fill
              className="object-cover"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand/95 to-brand-deep/95" />
            <div className="relative">
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">Ready to study in {d.name}?</h2>
              <p className="mt-3 max-w-lg text-white/80">
                Book a free consultation with our Study in {d.name} Consultants and let our experienced
                counsellors guide you from university selection to visa approval.
              </p>
            </div>
            <div className="relative flex shrink-0 flex-wrap gap-3">
              <Link
                href="/contact-us"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-deep transition-all hover:-translate-y-0.5 hover:bg-white/90"
              >
                Book free consultation
              </Link>
              <Link
                href="/pre-departure-after-arrival"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white"
              >
                Already have your visa?
              </Link>
            </div>
          </div>
        </Reveal>
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

function FlagIcon({ code }: { code: string }) {
  return <Image src={`/images/flags/${code}.svg`} alt="" {...flagSize(code, 15)} className="rounded-sm" />;
}
