import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import TestimonialCard from "@/components/TestimonialCard";
import TiltCard from "@/components/TiltCard";
import { testimonials } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/structured-data";

const successTitle = "Student Success Stories";
const successDescription =
  "Meet students who secured admissions abroad with guidance from Apex Consulting Services, from applications and documentation to visa support.";

export const metadata: Metadata = {
  title: successTitle,
  description: successDescription,
  alternates: { canonical: "/success-stories" },
  openGraph: { title: successTitle, description: successDescription, url: "/success-stories", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: successTitle, description: successDescription, images: ["/opengraph-image"] },
};

export default function SuccessStoriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Success Stories", path: "/success-stories" }])} />
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-10 lg:px-8 lg:pt-14">
        <Breadcrumb current="Success Stories" />
        <Reveal className="mt-6 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">Real students. Real results.</p>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.06] text-ink sm:text-5xl">
            Student <span className="text-brand">Success Stories</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
            Meet students who secured admissions abroad with guidance from Apex Consulting Services, from
            applications and documentation to visa support.
          </p>
        </Reveal>
        <Reveal delay={100} className="mt-8 grid grid-cols-3 gap-4 sm:max-w-md">
          <MiniStat value={`${testimonials.length}+`} label="Success stories" />
          <MiniStat value="2009" label="Trusted guidance since" />
          <MiniStat value="UK & beyond" label="Global destinations" />
        </Reveal>
      </section>

      <section className="border-t border-line bg-surface-2/60 py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={(i % 6) * 60}>
                <TiltCard max={4} className="h-full">
                  <TestimonialCard item={t} />
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface px-3 py-3 text-center">
      <p className="font-display text-lg font-semibold text-brand-text">{value}</p>
      <p className="mt-0.5 text-[11px] leading-tight text-ink-faint">{label}</p>
    </div>
  );
}
