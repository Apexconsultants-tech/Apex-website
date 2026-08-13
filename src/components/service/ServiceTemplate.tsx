import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";
import type { ServiceData } from "@/lib/services-data";
import { services } from "@/lib/services-data";
import { serviceImage } from "@/lib/service-photos.server";
import { contact } from "@/lib/site-config";

export default function ServiceTemplate({ s }: { s: ServiceData }) {
  const otherServices = services.filter((o) => o.slug !== s.slug);
  const image = serviceImage(s.slug);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-brand-tint),transparent_55%)]" />
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-10 lg:px-8 lg:pt-14">
          <Breadcrumb current={s.name} />
          <div className={`mt-6 grid grid-cols-1 items-center gap-10 ${image ? "lg:grid-cols-[1.05fr_0.95fr]" : ""}`}>
            <Reveal className={image ? "" : "max-w-3xl"}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">What We Do</p>
              <h1 className="mt-3 text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl">{s.headline}</h1>
              <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">{s.intro}</p>
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
            {image && (
              <Reveal delay={140}>
                <TiltCard className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line shadow-lg shadow-ink/10" max={4}>
                  <Image
                    src={image}
                    alt={s.name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </TiltCard>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="border-y border-line bg-surface-2/60 py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="flex flex-wrap gap-2.5">
            {s.whyChoose.map((w) => (
              <span key={w} className="rounded-full border border-line bg-surface px-4 py-2 text-xs font-medium text-ink-soft">
                {w}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
        <Reveal>
          <h2 className="text-2xl font-semibold text-ink">How we support you</h2>
        </Reveal>
        <div className="mt-5 space-y-4">
          {s.body.map((p, i) => (
            <Reveal key={i} delay={i * 60}>
              <p className="text-ink-soft leading-relaxed">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* What's included */}
      <section className="border-y border-line bg-surface-2/60 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="What's included" title="How we support you" />
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {s.includes.map((inc, i) => (
              <Reveal key={inc.title} delay={i * 70}>
                <TiltCard className="h-full rounded-2xl border border-line bg-surface p-6" max={4}>
                  <h3 className="text-base font-semibold text-ink">{inc.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{inc.body}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
        <Reveal>
          <SectionHeading align="center" eyebrow="Common questions" title="FAQs" />
        </Reveal>
        <Reveal delay={100} className="mt-10">
          <FaqAccordion items={s.faqs} />
        </Reveal>
      </section>

      {/* Explore more */}
      <section className="border-t border-line bg-surface-2/60 py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-faint">Explore more</p>
          <h2 className="mt-1 text-xl font-semibold text-ink">Other services</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/partner-universities"
              className="rounded-full border border-line bg-surface px-4 py-2 text-xs font-medium text-ink-soft transition-colors hover:border-brand hover:text-brand"
            >
              Partner Universities
            </Link>
            {otherServices.map((o) => (
              <Link
                key={o.slug}
                href={`/${o.slug}`}
                className="rounded-full border border-line bg-surface px-4 py-2 text-xs font-medium text-ink-soft transition-colors hover:border-brand hover:text-brand"
              >
                {o.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-brand px-8 py-12 sm:px-12 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Ready to get started with {s.name}?
              </h2>
              <p className="mt-3 max-w-lg text-white">Book your free consultation today.</p>
            </div>
            <Link
              href="/contact-us"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-deep transition-all hover:-translate-y-0.5 hover:bg-white/90"
            >
              Book free consultation
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
