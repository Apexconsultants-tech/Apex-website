import Image from "next/image";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import PassportStamp from "@/components/PassportStamp";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";
import Breadcrumb from "@/components/Breadcrumb";
import SectionNav from "@/components/destination/SectionNav";
import type { Destination } from "@/lib/destinations-data";
import { destinationPhoto, getDestination, popularDestinationSlugs } from "@/lib/destinations-data";
import { destinationLifePhoto } from "@/lib/destination-photos.server";
import { flagSize } from "@/lib/flags";
import { contact } from "@/lib/site-config";

function stampCode(d: Destination) {
  return d.short.toUpperCase();
}

// First sentence only — d.cost and d.postStudyWork are full paragraphs
// written for their own sections; timeline cards need a clause.
function firstClause(text: string) {
  const match = text.match(/^[^.]+\./);
  return match ? match[0] : text;
}

// Lowercases only the first item (it starts a mid-sentence clause); other
// items keep their own capitalization so acronyms like CAS/TB/IHS survive.
function lowerFirstItem(items: string[]) {
  return items.map((item, i) => (i === 0 ? item.charAt(0).toLowerCase() + item.slice(1) : item));
}

// Splits "Chevening Scholarships, a fully funded ..." into a title and a
// description so scholarship cards can lead with the name.
function splitScholarship(text: string) {
  const idx = text.indexOf(", ");
  if (idx > 0 && idx < 70) return { title: text.slice(0, idx), body: text.slice(idx + 2) };
  return { title: text, body: "" };
}

function initials(name: string) {
  const words = name
    .replace(/\(.*?\)/g, "")
    .split(/\s+/)
    .filter((w) => w && !["of", "the", "and", "for", "&", "de", "la"].includes(w.toLowerCase()));
  return words
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

// Pulls from d's own fields (requirements, universities, visaRequirements,
// cost, scholarships, postStudyWork) rather than templated copy with just
// the country name swapped in, so each destination's timeline reflects its
// actual process.
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

const statIcons = ["campus", "wallet", "briefcase"] as const;
const whyIcons = ["star", "shield", "spark", "globe", "campus", "briefcase"] as const;

export default function DestinationTemplate({ d }: { d: Destination }) {
  const timeline = buildTimeline(d);

  const studentLife = [
    {
      icon: "campus" as const,
      title: "Types of institutions",
      body: `${d.name} offers a mix of public/state universities, private universities, and specialised or applied-science institutions. The right type depends on your budget, field, and career goals, we help you compare them directly.`,
    },
    {
      icon: "home" as const,
      title: "Accommodation",
      body: "Most students choose between university halls of residence, private student accommodation, or shared housing near campus. We guide you toward options that fit your budget before you arrive.",
    },
    {
      icon: "people" as const,
      title: "Student life",
      body: "Expect an academic calendar built around lectures, seminars, and independent study, alongside student societies, clubs, and campus events that make it easier to settle in and build a network.",
    },
    {
      icon: "clock" as const,
      title: "Working while studying",
      body: "Most study visas allow part-time work during term and longer hours during scheduled breaks, though exact limits vary by destination and visa type. We confirm the current rules for your specific visa before you apply.",
    },
  ];

  const otherDestinations = popularDestinationSlugs
    .filter((s) => s !== d.slug)
    .map((s) => getDestination(s))
    .filter((x): x is Destination => Boolean(x))
    .slice(0, 4);

  const navItems = [
    { id: "why", label: `Why ${d.short}` },
    { id: "requirements", label: "Requirements" },
    { id: "universities", label: "Universities" },
    { id: "costs", label: d.scholarships.length > 0 ? "Costs & scholarships" : "Costs" },
    { id: "visa", label: "Visa & work" },
    { id: "timeline", label: "Timeline" },
    { id: "life", label: "Student life" },
    { id: "faqs", label: "FAQs" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-brand-tint),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-line)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)] opacity-70" />
        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-10 lg:px-8 lg:pt-14">
          <Breadcrumb current={d.name} />
          <div className="mt-6 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Not wrapped in Reveal: above-the-fold text renders straight
                from static HTML; animate-hero-in is a pure-CSS fade/lift. */}
            <div className="animate-hero-in">
              <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-tint/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-text">
                <FlagIcon code={d.flag} /> Study Abroad · {d.region}
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-[1.06] text-ink sm:text-5xl lg:text-6xl">
                Study in <span className="bg-gradient-to-r from-brand to-brand-deep bg-clip-text text-transparent">{d.name}</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft">{d.intro}</p>
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
                  className="rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
            {/* Not wrapped in Reveal: hero/LCP image must paint immediately. */}
            <div className="relative">
              <div className="pointer-events-none absolute -inset-3 rotate-2 rounded-[2rem] bg-gradient-to-br from-brand/25 to-brand-deep/10" />
              <TiltCard
                className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line shadow-xl shadow-ink/15"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 rotate-[-6deg] rounded-sm border border-ink/10 bg-white/95 p-1.5 shadow-sm">
                  <Image src={`/images/flags/${d.flag}.svg`} alt="" {...flagSize(d.flag, 20)} className="block rounded-[1px]" />
                </div>
                <p className="absolute bottom-4 left-5 font-display text-lg font-semibold text-white drop-shadow">{d.name}</p>
              </TiltCard>
              <PassportStamp
                code={stampCode(d)}
                className="absolute -bottom-6 -right-4 h-24 w-24 drop-shadow-lg sm:-bottom-8 sm:-right-6 sm:h-28 sm:w-28"
              />
            </div>
          </div>

          {/* At-a-glance stats */}
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {d.heroStats.map((s, i) => (
              <div
                key={s}
                className="animate-hero-in flex items-center gap-4 rounded-2xl border border-line bg-surface/90 p-5 shadow-sm backdrop-blur"
                style={{ animationDelay: `${150 + i * 90}ms` }}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-deep text-white shadow-md shadow-brand/25">
                  <Icon name={statIcons[i % statIcons.length]} />
                </span>
                <span className="text-sm font-semibold leading-snug text-ink">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionNav items={navItems} />

      {/* Why study */}
      <section id="why" className="scroll-mt-36 bg-surface-2/60 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="Why this destination" title={<>Why study in <span className="text-brand">{d.name}</span>?</>} />
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {d.whyPoints.map((w, i) => (
              <Reveal key={w.title} delay={i * 80} className="h-full">
                <TiltCard className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-brand/40" max={4}>
                  <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand to-brand-deep transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="pointer-events-none absolute -right-2 -top-4 font-display text-7xl font-bold text-brand/[0.07]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-tint text-brand-text">
                    <Icon name={whyIcons[i % whyIcons.length]} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{w.body}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Campus life photo band */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <TiltCard className="overflow-hidden rounded-3xl border border-line shadow-xl shadow-ink/10" max={4}>
              <Image
                src={destinationLifePhoto(d.slug)}
                alt={`Students on campus in ${d.name}`}
                width={1000}
                height={667}
                className="h-64 w-full object-cover object-center sm:h-80"
              />
            </TiltCard>
            <div className="animate-float absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 shadow-lg shadow-ink/10">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-tint text-brand-text">
                <Icon name="people" />
              </span>
              <span className="text-sm font-semibold text-ink">A truly global classroom</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-text">Life as a student in {d.name}</p>
            <p className="mt-3 text-2xl font-semibold leading-snug text-ink sm:text-3xl">
              Beyond the classroom: campus life, new friendships, and a genuinely global environment.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Every destination we support comes with real academic culture, student societies, and a
              community of international students navigating the same journey as you. We help you find
              the university where that fits best.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Requirements + Universities */}
      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Reveal className="h-full">
            <div id="requirements" className="h-full scroll-mt-36 rounded-3xl border border-line bg-surface p-7 shadow-sm sm:p-9">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-tint text-brand-text">
                  <Icon name="clipboard" />
                </span>
                <h2 className="text-2xl font-semibold text-ink">Admission requirements</h2>
              </div>
              <p className="mt-3 text-sm text-ink-soft">Requirements vary by university and program, but generally include:</p>
              <ol className="mt-6 space-y-3">
                {d.requirements.map((r, i) => (
                  <li key={r} className="flex items-start gap-3 rounded-xl bg-surface-2/70 px-4 py-3 text-sm text-ink-soft">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{r}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
          <Reveal delay={100} className="h-full">
            <div id="universities" className="h-full scroll-mt-36 rounded-3xl border border-line bg-surface p-7 shadow-sm sm:p-9">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-tint text-brand-text">
                  <Icon name="campus" />
                </span>
                <h2 className="text-2xl font-semibold text-ink">Universities in {d.name}</h2>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {d.universities.map((u) => (
                  <div
                    key={u.name}
                    className="group flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3.5 transition-all hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-md hover:shadow-brand/10"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-brand-deep font-display text-xs font-bold text-white">
                      {initials(u.name)}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold leading-snug text-ink">{u.name}</span>
                      {u.note && <span className="mt-0.5 block text-xs text-ink-faint">{u.note}</span>}
                    </span>
                  </div>
                ))}
              </div>
              <Link href="/#partner-logos" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-text hover:underline">
                View all partner universities <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cost / Scholarships — dark band */}
      <section id="costs" className="relative scroll-mt-36 overflow-hidden bg-gradient-to-br from-brand-deep via-[#0f4a28] to-ink py-20">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-brand/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <SectionHeading tone="white" eyebrow="Plan your budget" title={`Cost of studying in ${d.name}`} />
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="h-full rounded-3xl border border-white/15 bg-white/[0.07] p-7 backdrop-blur sm:p-9">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand-deep">
                  <Icon name="wallet" />
                </span>
                <p className="mt-6 text-base leading-relaxed text-white/90">{d.cost}</p>
                <Link
                  href="/financial-assistance"
                  className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-deep transition-all hover:-translate-y-0.5 hover:bg-white/90"
                >
                  Explore Financial Assistance
                </Link>
              </div>
            </Reveal>
            {d.scholarships.length > 0 && (
              <Reveal delay={100}>
                <h3 id="scholarships" className="scroll-mt-36 flex items-center gap-2 text-xl font-semibold text-white">
                  <Icon name="award" /> Scholarships to explore
                </h3>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {d.scholarships.map((s) => {
                    const { title, body } = splitScholarship(s);
                    return (
                      <div key={s} className="rounded-2xl border border-white/15 bg-white/[0.06] p-5 transition-colors hover:border-white/35 hover:bg-white/[0.1]">
                        <p className="text-sm font-semibold text-white">{title}</p>
                        {body && <p className="mt-1.5 text-xs leading-relaxed text-white/80">{body.charAt(0).toUpperCase() + body.slice(1)}</p>}
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Visa / Post-study */}
      <section id="visa" className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal className="h-full">
            <div className="relative h-full overflow-hidden rounded-3xl border-2 border-dashed border-brand/30 bg-surface p-7 sm:p-9">
              <PassportStamp code={stampCode(d)} className="pointer-events-none absolute -right-4 -top-4 h-28 w-28 rotate-12 opacity-20" />
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-text">Visa checklist</p>
              <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">{d.visaName}</h2>
              <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {d.visaRequirements.map((r) => (
                  <li key={r} className="flex gap-3 text-sm text-ink-soft">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-brand/40 bg-brand-tint">
                      <CheckIcon />
                    </span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
              <Link href="/student-visa-assistance" className="mt-7 inline-flex items-center gap-1 text-sm font-semibold text-brand-text hover:underline">
                See Student Visa Assistance <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={100} className="h-full">
            <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-brand-tint to-surface p-7 ring-1 ring-brand/20 sm:p-9">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-deep text-white shadow-md shadow-brand/25">
                <Icon name="briefcase" />
              </span>
              <h2 className="mt-5 text-2xl font-semibold text-ink">Post-study work opportunities</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{d.postStudyWork}</p>
              <Link href="/career-counseling" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-text hover:underline">
                See Career Counseling <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Application timeline */}
      <section id="timeline" className="scroll-mt-36 border-y border-line bg-surface-2/60 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <div className="lg:sticky lg:top-40">
              <Reveal>
                <SectionHeading
                  eyebrow="How it works"
                  title={`Your application timeline for ${d.name}`}
                  lead="A typical path from first consultation to arrival. Apex works alongside you at every step."
                />
                <Link
                  href="/contact-us"
                  className="mt-8 inline-flex rounded-full bg-gradient-to-b from-brand to-brand-deep px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/30"
                >
                  Start step 1 with us
                </Link>
              </Reveal>
            </div>
          </div>
          <ol className="relative">
            <span aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-0.5 bg-gradient-to-b from-brand via-brand/40 to-brand-tint" />
            {timeline.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 70} x={24} y={0} className="relative pb-6 pl-14 last:pb-0">
                <span className="absolute left-0 top-4 flex h-10 w-10 items-center justify-center rounded-full border-4 border-surface-2 bg-gradient-to-br from-brand to-brand-deep font-display text-sm font-bold text-white shadow-md shadow-brand/30">
                  {i + 1}
                </span>
                <div className="rounded-2xl border border-line bg-surface p-5 transition-all hover:border-brand/40 hover:shadow-md hover:shadow-brand/10">
                  <h3 className="text-base font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Student life practicalities */}
      <section id="life" className="mx-auto max-w-7xl scroll-mt-36 px-5 py-20 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Life in your new city" title="Settling in, working, and studying" />
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {studentLife.map((topic, i) => (
            <Reveal key={topic.title} delay={i * 70} className="h-full">
              <TiltCard className="group h-full rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-brand/40" max={4}>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-tint text-brand-text transition-colors group-hover:bg-brand group-hover:text-white">
                  <Icon name={topic.icon} />
                </span>
                <h3 className="mt-5 text-base font-semibold text-ink">{topic.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{topic.body}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faqs" className="scroll-mt-36 border-t border-line bg-surface-2/60 py-20">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <Reveal>
            <SectionHeading align="center" eyebrow="Common questions" title={`Got questions about ${d.name}?`} />
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <FaqAccordion items={d.faqs} />
          </Reveal>
        </div>
      </section>

      {/* Explore other destinations */}
      {otherDestinations.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pt-20 lg:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Keep exploring" title="Compare other destinations" />
            <Link href="/destinations" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-text hover:underline">
              All destinations <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {otherDestinations.map((o, i) => (
              <Reveal key={o.slug} delay={i * 70}>
                <Link
                  href={`/${o.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-line shadow-sm sm:aspect-[4/3]"
                >
                  <Image
                    src={destinationPhoto(o.slug)}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-brand-deep/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-4">
                    <span className="flex items-center gap-2 font-display text-sm font-semibold text-white sm:text-base">
                      <FlagIcon code={o.flag} /> {o.name}
                    </span>
                    <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-all group-hover:bg-white group-hover:text-brand-deep">
                      →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal>
          <div className="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-3xl px-8 py-12 sm:px-12 lg:flex-row lg:items-center">
            <Image
              src="/images/stock/graduation.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand/95 to-brand-deep/95" />
            <div className="relative">
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">Ready to study in {d.name}?</h2>
              <p className="mt-3 max-w-lg text-white">
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
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0 text-brand-text" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FlagIcon({ code }: { code: string }) {
  return <Image src={`/images/flags/${code}.svg`} alt="" {...flagSize(code, 15)} className="rounded-sm" />;
}

type IconName =
  | "campus" | "wallet" | "briefcase" | "star" | "shield" | "spark" | "globe"
  | "home" | "people" | "clock" | "clipboard" | "award";

const iconPaths: Record<IconName, React.ReactNode> = {
  campus: <><path d="M3 10 12 5l9 5-9 5-9-5Z" /><path d="M7 12v4.5c0 1 2.2 2.5 5 2.5s5-1.5 5-2.5V12" /><path d="M21 10v5" /></>,
  wallet: <><rect x="3" y="6" width="18" height="13" rx="2.5" /><path d="M3 10h18" /><circle cx="16.5" cy="14.5" r="1.2" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2.5" /><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" /><path d="M3 12.5h18" /></>,
  star: <path d="m12 3.5 2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8l-5.2 2.7 1-5.8-4.2-4.1 5.8-.8L12 3.5Z" />,
  shield: <><path d="M12 3 4.5 6v5.5c0 4.4 3.1 8.2 7.5 9.5 4.4-1.3 7.5-5.1 7.5-9.5V6L12 3Z" /><path d="m9 12 2 2 4-4" /></>,
  spark: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="m6 6 2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" /></>,
  home: <><path d="M4 11 12 4l8 7" /><path d="M6 9.5V20h12V9.5" /><path d="M10 20v-5h4v5" /></>,
  people: <><circle cx="9" cy="8.5" r="3" /><path d="M3.5 19c.6-3 2.8-5 5.5-5s4.9 2 5.5 5" /><circle cx="16.5" cy="9.5" r="2.4" /><path d="M16 14.2c2.3.2 4 1.9 4.5 4.8" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  clipboard: <><rect x="5" y="4.5" width="14" height="16" rx="2" /><path d="M9 4.5V3.5h6v1" /><path d="m9 12 2 2 4-4" /></>,
  award: <><circle cx="12" cy="9" r="5.5" /><path d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7" /></>,
};

function Icon({ name }: { name: IconName }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  );
}
