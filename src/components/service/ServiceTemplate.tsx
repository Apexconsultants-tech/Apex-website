import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import FaqAccordion from "@/components/FaqAccordion";
import FaqTypographyWall from "@/components/FaqTypographyWall";
import Icon, { type IconName } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";
import type { ServiceData } from "@/lib/services-data";
import { getService, services } from "@/lib/services-data";
import { serviceImage } from "@/lib/service-photos.server";
import { contact } from "@/lib/site-config";

// The core student journey, in order. Services outside it (Student
// Services, Career Counseling) still show the strip, just with nothing
// highlighted.
const JOURNEY: { slug: string; short: string; icon: IconName }[] = [
  { slug: "test-preparation", short: "Test prep", icon: "book" },
  { slug: "course-guidance", short: "Course", icon: "target" },
  { slug: "admission-guidance", short: "Admission", icon: "document" },
  { slug: "financial-assistance", short: "Finance", icon: "wallet" },
  { slug: "student-visa-assistance", short: "Visa", icon: "shield" },
  { slug: "pre-departure-after-arrival", short: "Departure", icon: "plane" },
];

const SERVICE_ICON: Record<string, IconName> = {
  "student-services": "people",
  "career-counseling": "briefcase",
  ...Object.fromEntries(JOURNEY.map((j) => [j.slug, j.icon])),
};

// Column count that keeps rows balanced for 2-6 items (no orphan card).
const cols = (n: number) => (n === 4 ? "lg:grid-cols-4" : n === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3");

const INCLUDE_ICONS: IconName[] = ["clipboard", "document", "clock", "chat", "shield", "star"];

export default function ServiceTemplate({ s }: { s: ServiceData }) {
  const otherServices = services.filter((o) => o.slug !== s.slug);
  const image = serviceImage(s.slug);
  const stepIndex = JOURNEY.findIndex((j) => j.slug === s.slug);
  const next = stepIndex >= 0 && stepIndex < JOURNEY.length - 1 ? getService(JOURNEY[stepIndex + 1].slug) : undefined;
  // The 7 other services plus Partner Universities = 8 cards, two full rows.
  const otherWithImages: { slug: string; name: string; href: string; image: string | null; icon: IconName }[] = [
    ...otherServices.map((o) => ({ slug: o.slug, name: o.name, href: `/${o.slug}`, image: serviceImage(o.slug), icon: SERVICE_ICON[o.slug] ?? "star" })),
    { slug: "partner-universities", name: "Partner Universities", href: "/#partner-logos", image: "/images/stock/campus-students-walking.webp", icon: "campus" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-brand-tint),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_0%_10%,var(--color-logo-lime-tint),transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-line)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)] opacity-70" />
        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-10 lg:px-8 lg:pt-14">
          <Breadcrumb current={s.name} />
          <div className={`mt-6 grid grid-cols-1 items-center gap-12 ${image ? "lg:grid-cols-[1.05fr_0.95fr]" : ""}`}>
            {/* Not wrapped in Reveal: above-the-fold text renders straight
                from static HTML; animate-hero-in is a pure-CSS fade/lift. */}
            <div className={`animate-hero-in ${image ? "" : "max-w-3xl"}`}>
              <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-tint/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-text">
                <Icon name={SERVICE_ICON[s.slug] ?? "star"} size={14} /> {s.name}
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl">{s.headline}</h1>
              <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">{s.intro}</p>
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
            {image && (
              <div className="relative">
                <div className="pointer-events-none absolute -inset-3 rotate-2 rounded-[2rem] bg-gradient-to-br from-logo-lime/30 via-brand/15 to-logo-teal/25" />
                <TiltCard className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line shadow-xl shadow-ink/15" max={4}>
                  <Image src={image} alt={s.name} fill priority sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </TiltCard>
                <div className="animate-float absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 shadow-lg shadow-ink/10 sm:-left-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand to-logo-teal text-white">
                    <Icon name="chat" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">Free consultation</span>
                    <span className="block text-xs text-ink-faint">{contact.hours}</span>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Highlights */}
          <div className={`mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 ${cols(s.whyChoose.length)}`}>
            {s.whyChoose.map((w, i) => (
              <div
                key={w}
                className="animate-hero-in flex items-start gap-3 rounded-2xl border border-line bg-surface/90 p-5 shadow-sm backdrop-blur"
                style={{ animationDelay: `${150 + i * 80}ms` }}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-logo-teal text-white shadow-md shadow-brand/25">
                  <Icon name="check" size={18} />
                </span>
                <span className="pt-1 text-sm font-semibold leading-snug text-ink">{w}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey strip */}
      <section className="border-y border-line bg-surface py-10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
            {stepIndex >= 0 ? "Where this fits in your journey" : "Your study abroad journey"}
          </p>
          <ol className="relative mt-6 grid grid-cols-3 gap-y-6 sm:grid-cols-6">
            <span aria-hidden="true" className="absolute left-[8%] right-[8%] top-6 hidden h-0.5 bg-gradient-to-r from-logo-lime via-brand to-logo-teal opacity-40 sm:block" />
            {JOURNEY.map((j, i) => {
              const current = i === stepIndex;
              const done = stepIndex >= 0 && i < stepIndex;
              return (
                <li key={j.slug} className="relative flex flex-col items-center text-center">
                  <Link
                    href={`/${j.slug}`}
                    aria-current={current ? "page" : undefined}
                    className="group flex flex-col items-center"
                  >
                    <span
                      className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all ${
                        current
                          ? "scale-110 border-transparent bg-gradient-to-br from-brand to-logo-teal text-white shadow-lg shadow-brand/30"
                          : done
                            ? "border-brand/40 bg-brand-tint text-brand-text"
                            : "border-line bg-surface text-ink-faint group-hover:border-brand/50 group-hover:text-brand-text"
                      }`}
                    >
                      {current && <span className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-brand" />}
                      <Icon name={j.icon} />
                    </span>
                    <span className={`mt-2.5 text-xs font-semibold ${current ? "text-brand-text" : "text-ink-soft group-hover:text-brand-text"}`}>
                      {j.short}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Our approach */}
      <section className="bg-surface-2/60 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <SectionHeading eyebrow="Our approach" title="How we support you" />
                {next && (
                  <Link
                    href={`/${next.slug}`}
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand"
                  >
                    Next step: {next.name} <span aria-hidden="true">→</span>
                  </Link>
                )}
              </Reveal>
            </div>
          </div>
          <ol className="relative">
            <span aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-0.5 bg-gradient-to-b from-logo-lime via-brand to-logo-teal" />
            {s.body.map((p, i) => (
              <Reveal as="li" key={i} delay={i * 70} x={24} y={0} className="relative pb-6 pl-14 last:pb-0">
                <span className="absolute left-0 top-4 flex h-10 w-10 items-center justify-center rounded-full border-4 border-surface-2 bg-gradient-to-br from-brand to-logo-teal font-display text-sm font-bold text-white shadow-md shadow-brand/30">
                  {i + 1}
                </span>
                <div className="rounded-2xl border border-line bg-surface p-5 transition-all hover:border-brand/40 hover:shadow-md hover:shadow-brand/10">
                  <p className="text-sm leading-relaxed text-ink-soft sm:text-base">{p}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* What's included */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="What's included" title={`Everything in ${s.name}`} />
        </Reveal>
        <div className={`mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 ${cols(s.includes.length)}`}>
          {s.includes.map((inc, i) => (
            <Reveal key={inc.title} delay={i * 70} className="h-full">
              <TiltCard className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-brand/40" max={4}>
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-logo-lime via-brand to-logo-teal transition-transform duration-500 group-hover:scale-x-100" />
                <span className="pointer-events-none absolute right-4 top-3 font-display text-5xl font-bold leading-none text-brand/[0.08]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-tint text-brand-text transition-colors group-hover:bg-brand group-hover:text-white">
                  <Icon name={INCLUDE_ICONS[i % INCLUDE_ICONS.length]} />
                </span>
                <h3 className="mt-5 text-base font-semibold text-ink">{inc.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{inc.body}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden border-t border-line bg-surface-2/60 py-20">
        <FaqTypographyWall />
        <div className="relative mx-auto max-w-3xl px-5 lg:px-8">
          <Reveal>
            <SectionHeading align="center" eyebrow="Common questions" title={`${s.name} FAQs`} />
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <FaqAccordion items={s.faqs} />
          </Reveal>
        </div>
      </section>

      {/* Explore more */}
      <section className="mx-auto max-w-7xl px-5 pt-20 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Explore more" title="Other ways we help" />
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {otherWithImages.map((o, i) => (
            <Reveal key={o.slug} delay={(i % 4) * 70}>
              <Link href={o.href} className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-brand-deep shadow-sm">
                {o.image && (
                  <Image src={o.image} alt="" fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b3b20]/90 via-brand-deep/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-4">
                  <span className="flex items-center gap-2 font-display text-sm font-semibold leading-tight text-white sm:text-base">
                    <span className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15 backdrop-blur sm:flex">
                      <Icon name={o.icon} size={16} />
                    </span>
                    {o.name}
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

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal>
          <div className="relative isolate flex flex-col items-start justify-between gap-8 overflow-hidden rounded-3xl bg-[#0b3b20] px-8 py-12 sm:px-12 lg:flex-row lg:items-center">
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_90%_at_100%_0%,#22a355_0%,transparent_60%)] opacity-70" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_70%_at_0%_100%,#0d9488_0%,transparent_65%)] opacity-50" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_right,black,transparent_60%)]" />
            <div>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">Ready to get started with {s.name}?</h2>
              <p className="mt-3 max-w-lg text-white/90">Book your free consultation today, a counsellor will walk you through the next steps.</p>
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
        </Reveal>
      </section>
    </>
  );
}
