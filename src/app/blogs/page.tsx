import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { blogPosts } from "@/lib/blog-data";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Study Abroad Blog & Visa Tips",
  description: "Practical guides on student visas, financial documentation, and settling in abroad, from Apex Consulting Services.",
  alternates: { canonical: "/blogs" },
};

export default function BlogsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blogs" }])} />
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-10 lg:px-8 lg:pt-14">
        <Breadcrumb current="Blog" />
        <Reveal className="mt-6 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">Insights & guides</p>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.06] text-ink sm:text-5xl">
            Visa Tips & <span className="text-brand">Study Abroad Guides</span>
          </h1>
        </Reveal>
      </section>

      <section className="border-t border-line bg-surface-2/60 py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <TiltCard className="h-full" max={4}>
                  <Link
                    href={`/blogs/${p.slug}`}
                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-shadow hover:shadow-lg hover:shadow-ink/5"
                  >
                    {p.image && (
                      <Image
                        src={p.image}
                        alt={p.imageAlt ?? p.title}
                        width={600}
                        height={340}
                        className="h-40 w-full object-cover"
                      />
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs font-medium text-ink-faint">{p.category} &middot; {p.date}</p>
                      <h2 className="mt-2 text-lg font-semibold leading-snug text-ink">{p.title}</h2>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{p.excerpt}</p>
                      <span className="mt-4 inline-flex text-sm font-semibold text-brand">Read more →</span>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
