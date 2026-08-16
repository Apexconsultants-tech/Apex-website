import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import TiltCard from "@/components/TiltCard";
import { destinationPhoto, destinations } from "@/lib/destinations-data";
import { flagSize } from "@/lib/flags";
import { contact, homeServiceHighlights } from "@/lib/site-config";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/structured-data";

const whyStudyAbroad = [
  {
    title: "Global Exposure",
    icon: "globe",
    body: "Step outside a single classroom and into a genuinely international environment, learning alongside students from dozens of countries and building a worldview that looks beyond one city or one system.",
  },
  {
    title: "World-Class Education",
    icon: "cap",
    body: "Study at globally ranked universities known for research output, modern teaching methods, and industry-linked programs that carry real weight with employers back home and abroad.",
  },
  {
    title: "Language & Communication Skills",
    icon: "chat",
    body: "Daily immersion in an English-medium environment sharpens fluency far faster than a classroom ever could, an advantage that shows up in interviews, coursework, and everyday confidence.",
  },
  {
    title: "Career Growth & Global Networks",
    icon: "briefcase",
    body: "An international degree, a post-study work visa, and a professional network that spans continents make you a stronger candidate the moment you start job hunting.",
  },
  {
    title: "Independence & Personal Growth",
    icon: "compass",
    body: "Managing your own finances, routine, and decisions in a new country builds a level of resilience and confidence that's hard to develop any other way.",
  },
  {
    title: "Cultural Enrichment",
    icon: "spark",
    body: "New traditions, festivals, cuisines, and friendships broaden your perspective long after graduation, and often shape how you think and work for the rest of your career.",
  },
] as const;

const keyFactors = [
  {
    title: "University Ranking & Accreditation",
    icon: "rank",
    body: "Check global rankings, program accreditation, and faculty expertise for your specific field, not just the university's overall reputation. A strong engineering school and a strong law school rarely sit inside the same institution.",
  },
  {
    title: "Tuition Fees & Cost of Living",
    icon: "wallet",
    body: "Compare the full cost, tuition, accommodation, food, and transport, not tuition alone. A lower-tuition country with a high cost of living can end up more expensive than it first appears.",
  },
  {
    title: "Post-Study Work & Career Pathways",
    icon: "work",
    body: "Look at the post-study work visa length, part-time work rules during your degree, and how in-demand your field is locally. This is where a country's real long-term value shows up.",
  },
] as const;

const destinationsFaqs = [
  {
    q: "What is the best country to study abroad for Pakistani students?",
    a: "There's no single best country, it depends on your budget, field of study, and career goals. The UK and Ireland suit students who want shorter, focused degrees; the USA offers flexibility and strong research programs; Canada and Australia pair affordable living with generous post-study work visas. Apex compares all of this against your profile in a free consultation.",
  },
  {
    q: "How do I choose the right study abroad destination?",
    a: "Start with your field of study and budget, then narrow down by university rankings, visa requirements, post-study work options, and living costs. Most students shortlist 2 to 3 countries before comparing specific universities and programs in each.",
  },
  {
    q: "What are the benefits of studying abroad?",
    a: "Beyond the degree itself, studying abroad builds global exposure, stronger language and communication skills, an international professional network, and genuine independence, all of which carry weight with employers long after graduation.",
  },
  {
    q: "How can I find scholarships to study abroad?",
    a: "Scholarships typically come from three sources: government-funded awards (like Chevening or Commonwealth Scholarships), university merit scholarships, and need-based bursaries. Apex maps out realistic scholarship options for your target destinations during your consultation.",
  },
  {
    q: "What documents do I need to apply to study abroad?",
    a: "Most applications need academic transcripts, proof of English proficiency (IELTS/PTE/TOEFL), a statement of purpose, letters of recommendation, a valid passport, and proof of financial support for your visa. Exact requirements vary by country and university.",
  },
] as const;

const destinationsTitle = "Best Study Abroad Destinations for Pakistani Students";
const destinationsDescription =
  "Compare the best study abroad destinations for Pakistani students, universities, tuition fees, and post-study work visas for the UK, USA, Canada, Australia, and 14 more countries.";

export const metadata: Metadata = {
  title: destinationsTitle,
  description: destinationsDescription,
  alternates: { canonical: "/destinations" },
  openGraph: { title: destinationsTitle, description: destinationsDescription, url: "/destinations", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: destinationsTitle, description: destinationsDescription, images: ["/opengraph-image"] },
};

export default function DestinationsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Study Destinations", path: "/destinations" }])} />
      <JsonLd data={faqJsonLd(destinationsFaqs)} />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-10 lg:px-8 lg:pt-14">
        <Breadcrumb current="Study Destinations" />
        <div className="mt-6 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">Study abroad destinations</p>
            <h1 className="mt-3 text-4xl font-semibold leading-[1.06] text-ink sm:text-5xl">
              Best Study Abroad <span className="text-brand">Destinations</span> for Pakistani Students
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              Apex Consulting Services has guided students from Karachi, Hyderabad, and beyond into leading
              universities since 2009. Below is comprehensive information on the {destinations.length} study
              destinations we cover, university counts, tuition ranges, and post-study work visas, so you can
              compare countries side by side before choosing where to apply.
            </p>
          </div>
          <TiltCard
            className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line shadow-lg shadow-ink/10"
            max={4}
          >
            <Image
              src="/images/stock/airplane-wing-sky.webp"
              alt="Airplane wing above the clouds, on a flight to a study abroad destination"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </TiltCard>
        </div>
      </section>

      {/* All destinations: one uniform grid, every country given equal weight */}
      <section className="border-t border-line bg-surface-2/60 py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">All destinations</p>
          <h2 className="mt-1.5 text-2xl font-semibold text-ink sm:text-3xl">Every Study Destination We Cover</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((d) => (
              <DestinationCard key={d.slug} destination={d} />
            ))}
          </div>
        </div>
      </section>

      {/* Why study abroad */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">Why go abroad</p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            Benefits of <span className="text-brand">Studying Abroad</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            A degree earned overseas changes more than your CV. Here&apos;s what students consistently tell us
            they gained beyond the classroom.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyStudyAbroad.map((item) => (
            <TiltCard
              key={item.title}
              className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm shadow-ink/[0.03] transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/[0.07]"
              max={4}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-deep text-white shadow-md shadow-brand/25">
                <WhyIcon name={item.icon} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</p>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* What Apex provides */}
      <section className="border-y border-line bg-surface-2/60 py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">End-to-end support</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">What Apex Handles For You</h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {homeServiceHighlights.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="group flex items-start gap-3 rounded-2xl border border-line bg-surface p-5 shadow-sm shadow-ink/[0.03] transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/[0.07]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand-text">
                  <ServiceDot />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{s.title}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-ink-soft">{s.body}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Key factors */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">Making the decision</p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            Key Factors to Consider When <span className="text-brand">Choosing a Destination</span>
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {keyFactors.map((item) => (
            <div key={item.title} className="h-full rounded-2xl border border-line bg-surface p-6 shadow-sm shadow-ink/[0.03]">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-ink to-[#0a0d0e] text-white shadow-md shadow-ink/20">
                <KeyFactorIcon name={item.icon} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-surface-2/60 py-20">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">Common questions</p>
            <h2 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">Study Destination FAQs</h2>
          </div>
          <div className="mt-10">
            <FaqAccordion items={destinationsFaqs} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-brand px-8 py-12 sm:px-12 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Not sure which country fits you?</h2>
            <p className="mt-3 max-w-lg text-white">
              Tell us your grades, budget, and goals, and we will match you to the right destination.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/contact-us"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-deep transition-all hover:-translate-y-0.5 hover:bg-white/90"
            >
              Book free consultation
            </Link>
            <a
              href={contact.whatsappHref} data-track="whatsapp_click"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function DestinationCard({ destination: d }: { destination: (typeof destinations)[number] }) {
  return (
    <TiltCard
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm shadow-ink/[0.03] transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10"
      max={3}
    >
      <Link href={`/${d.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 scale-105 transition-transform duration-700 group-hover:scale-[1.12]">
          <Image
            src={destinationPhoto(d.slug)}
            alt={`${d.name} skyline`}
            fill
            sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
        <div className="absolute left-3 top-3 rotate-[-6deg] rounded-sm border border-white/70 bg-white/90 p-1 shadow-sm transition-transform group-hover:rotate-0">
          <Image src={`/images/flags/${d.flag}.svg`} alt="" {...flagSize(d.flag, 18)} className="block rounded-[1px]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <span className="block text-lg font-semibold text-white">{d.name}</span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 px-5 py-4">
        {d.heroStats.map((stat) => (
          <span key={stat} className="flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
            {stat}
          </span>
        ))}
        <Link
          href={`/${d.slug}`}
          className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-text hover:underline"
        >
          Explore {d.short} guide →
        </Link>
      </div>
    </TiltCard>
  );
}

function ServiceDot() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m5 12 5 5 9-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhyIcon({ name }: { name: string }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true } as const;
  switch (name) {
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path d="M3 12h18M12 3c2.7 2.5 4 5.7 4 9s-1.3 6.5-4 9c-2.7-2.5-4-5.7-4-9s1.3-6.5 4-9Z" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "cap":
      return (
        <svg {...common}>
          <path d="M12 3 2 8l10 5 10-5-10-5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M4 5h16v11H8l-4 4V5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M8 9h8M8 12.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" />
          <path d="M3 12h18" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "compass":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path d="m15 9-2 6-4-2 2-6 4 2Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 2 13.8 9.2 21 11l-7.2 1.8L12 20l-1.8-7.2L3 11l7.2-1.8L12 2Z" />
        </svg>
      );
    default:
      return null;
  }
}

function KeyFactorIcon({ name }: { name: string }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true } as const;
  switch (name) {
    case "rank":
      return (
        <svg {...common}>
          <path d="M12 2 4 5.5v6c0 5 3.4 8.7 8 9.5 4.6-.8 8-4.5 8-9.5v-6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="m8.5 12 2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="16.5" cy="14.5" r="1.2" fill="currentColor" />
        </svg>
      );
    case "work":
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" />
          <path d="m9 13 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}
