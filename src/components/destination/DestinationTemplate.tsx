import Image from "next/image";
import Link from "next/link";
import DestinationSkyline from "@/components/DestinationSkyline";
import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";
import Breadcrumb from "@/components/Breadcrumb";
import type { Destination } from "@/lib/destinations-data";
import { contact } from "@/lib/site-config";

export default function DestinationTemplate({ d }: { d: Destination }) {
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
            <Reveal delay={140}>
              <TiltCard
                className="relative aspect-[4/3] overflow-hidden rounded-3xl border-2 border-dashed border-brand/25 shadow-lg shadow-ink/10"
                max={4}
              >
                <DestinationSkyline slug={d.slug} />
                <div className="absolute left-4 top-4 rotate-[-6deg] rounded-sm border border-ink/10 bg-white/95 p-1.5 shadow-sm">
                  <Image src={`/images/flags/${d.flag}.svg`} alt="" width={28} height={20} className="block h-5 w-7 rounded-[1px]" />
                </div>
              </TiltCard>
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
          <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-brand px-8 py-12 sm:px-12 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">Ready to study in {d.name}?</h2>
              <p className="mt-3 max-w-lg text-white/80">
                Book a free consultation with our Study in {d.name} Consultants and let our experienced
                counsellors guide you from university selection to visa approval.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
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
  return <Image src={`/images/flags/${code}.svg`} alt="" width={20} height={15} className="rounded-sm" />;
}
