import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { coursesForUniversity } from "@/lib/courses-data";
import { getDestination } from "@/lib/destinations-data";
import { flagSize } from "@/lib/flags";
import { contact } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { getUniversity, partnerUniversities } from "@/lib/universities-data";

export function generateStaticParams() {
  return partnerUniversities.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const u = getUniversity(slug);
  if (!u) return {};
  const title = `${u.name} | Partner Universities`;
  const description = `Apply to ${u.name} in ${u.city}, ${u.country} with free counseling, application handling, and visa guidance from Apex Consulting Services.`;
  return {
    title,
    description,
    alternates: { canonical: `/partner-universities/${slug}` },
    openGraph: { title, description, url: `/partner-universities/${slug}` },
  };
}

export default async function UniversityProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const u = getUniversity(slug);
  if (!u) notFound();

  const uniCourses = coursesForUniversity(u.slug);
  const destination = u.countrySlug ? getDestination(u.countrySlug) : undefined;
  const otherInCountry = partnerUniversities.filter((o) => o.country === u.country && o.slug !== u.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Partner Universities", path: "/partner-universities" },
          { name: u.name, path: `/partner-universities/${u.slug}` },
        ])}
      />
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-10 lg:px-8 lg:pt-14">
        <Breadcrumb current={u.name} />
        <Reveal className="mt-6 max-w-3xl">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
            <Image src={`/images/flags/${u.flag}.svg`} alt="" {...flagSize(u.flag, 15)} className="rounded-sm" />
            Partner University &middot; {u.country}
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.06] text-ink sm:text-5xl">{u.name}</h1>
          <p className="mt-3 text-ink-soft">{u.city}, {u.country}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-ink-soft">
            <a href={u.homepage} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand hover:underline">
              Official website →
            </a>
            {uniCourses.length > 0 && <span>{uniCourses.length} course{uniCourses.length > 1 ? "s" : ""} available</span>}
          </div>
          <p className="mt-6 max-w-xl text-ink-soft">
            Apply to {u.name} with free counseling, application handling, and visa guidance from Apex
            Consulting Services, at no extra cost to you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact-us"
              className="rounded-full bg-gradient-to-b from-brand to-brand-deep px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/30"
            >
              Apply now
            </Link>
            <a
              href={contact.whatsappHref} data-track="whatsapp_click"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand"
            >
              Book free consultation
            </a>
          </div>
        </Reveal>
      </section>

      {uniCourses.length > 0 && (
        <section className="border-y border-line bg-surface-2/60 py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-faint">Find your program</p>
            <h2 className="mt-1 text-2xl font-semibold text-ink">Courses at {u.name}</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {uniCourses.map((c, i) => (
                <Reveal key={c.slug} delay={i * 70}>
                  <TiltCard className="h-full rounded-2xl border border-line bg-surface p-5" max={4}>
                    <p className="text-sm font-semibold text-ink">{c.name}</p>
                    {c.duration && <p className="mt-1 text-xs text-ink-faint">{c.duration}</p>}
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-faint">Why apply with Apex</p>
          <h2 className="mt-1 text-2xl font-semibold text-ink">We handle the hard parts for you</h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {[
            { title: "Free expert counseling", body: `One-on-one guidance to match your profile, budget, and goals with the right course at ${u.name}.` },
            { title: "Application & documents", body: "We prepare and submit your application, SOP, and supporting documents so nothing gets missed." },
            { title: "Visa & departure support", body: "Step-by-step student visa help, interview preparation, and pre-departure briefings." },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <TiltCard className="h-full rounded-2xl border border-line bg-surface p-6" max={4}>
                <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {(otherInCountry.length > 0 || destination) && (
        <section className="border-t border-line bg-surface-2/60 py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-faint">Explore more options</p>
            <h2 className="mt-1 text-xl font-semibold text-ink">More universities in {u.country}</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {destination && (
                <Link
                  href={`/${destination.slug}`}
                  className="rounded-full border border-brand/30 bg-brand-tint px-4 py-2 text-xs font-semibold text-brand"
                >
                  Study in {destination.name} destination guide
                </Link>
              )}
              {otherInCountry.map((o) => (
                <Link
                  key={o.slug}
                  href={`/partner-universities/${o.slug}`}
                  className="rounded-full border border-line bg-surface px-4 py-2 text-xs font-medium text-ink-soft transition-colors hover:border-brand hover:text-brand"
                >
                  {o.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-brand px-8 py-12 sm:px-12 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">Ready to apply to {u.name}?</h2>
              <p className="mt-3 max-w-lg text-white/80">
                Our counselors will check your eligibility, shortlist courses, and guide you through
                every step, from application to visa.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/contact-us"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-deep transition-all hover:-translate-y-0.5 hover:bg-white/90"
              >
                Apply now
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
