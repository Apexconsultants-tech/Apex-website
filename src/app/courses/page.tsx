import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import CoursesBrowser from "@/components/CoursesBrowser";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { courses } from "@/lib/courses-data";
import { breadcrumbJsonLd } from "@/lib/structured-data";

const coursesTitle = "Study Abroad Courses";
const coursesDescription =
  "Explore undergraduate, postgraduate, and diploma programs at Apex's partner universities across the UK, USA, and Australia.";

export const metadata: Metadata = {
  title: coursesTitle,
  description: coursesDescription,
  alternates: { canonical: "/courses" },
  openGraph: { title: coursesTitle, description: coursesDescription, url: "/courses", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: coursesTitle, description: coursesDescription, images: ["/opengraph-image"] },
};

export default function CoursesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Courses", path: "/courses" }])} />
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-10 lg:px-8 lg:pt-14">
        <Breadcrumb current="Courses" />
        <Reveal className="mt-6 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">Programs worldwide</p>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.06] text-ink sm:text-5xl">
            Study Abroad <span className="text-brand">Courses</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
            Explore undergraduate, postgraduate, and diploma programs at our partner universities across
            the UK, USA, and Australia.
          </p>
        </Reveal>
        <Reveal delay={100} className="mt-8 grid grid-cols-3 gap-4 sm:max-w-md">
          <MiniStat value={`${courses.length}+`} label="Courses listed" />
          <MiniStat value="3" label="Destinations" />
          <MiniStat value="13+" label="Partner universities" />
        </Reveal>
      </section>

      <section className="border-t border-line bg-surface-2/60 py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <Suspense fallback={null}>
              <CoursesBrowser />
            </Suspense>
          </Reveal>
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
