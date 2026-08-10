import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { blogPosts, getBlogPost } from "@/lib/blog-data";
import { contact } from "@/lib/site-config";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Apex Consulting Services`,
    description: post.excerpt,
    alternates: { canonical: `/blogs/${slug}` },
    openGraph: { title: post.title, description: post.excerpt, url: `/blogs/${slug}`, type: "article" },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const others = blogPosts.filter((p) => p.slug !== post.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blogs" },
            { name: post.title, path: `/blogs/${slug}` },
          ]),
          articleJsonLd(post),
        ]}
      />
      <article className="mx-auto max-w-3xl px-5 pb-16 pt-10 lg:px-8 lg:pt-14">
        <Breadcrumb current={post.title} />
        <Reveal className="mt-6">
          <p className="text-xs font-medium text-ink-faint">{post.category} &middot; {post.date} &middot; 1 min read</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-sm text-ink-faint">By Apex Consulting Services</p>
        </Reveal>

        <Reveal delay={80} className="mt-8">
          <p className="text-lg leading-relaxed text-ink-soft">{post.intro}</p>
        </Reveal>

        <div className="mt-8 space-y-8">
          {post.sections.map((sec, i) => (
            <Reveal key={i} delay={i * 60}>
              {sec.heading && <h2 className="text-xl font-semibold text-ink">{sec.heading}</h2>}
              <p className="mt-2 leading-relaxed text-ink-soft">{sec.body}</p>
            </Reveal>
          ))}
        </div>

        {post.closing && (
          <Reveal delay={140} className="mt-8">
            <p className="leading-relaxed text-ink-soft">{post.closing}</p>
          </Reveal>
        )}

        <Reveal delay={200} className="mt-12 rounded-2xl border border-line bg-surface-2/60 p-6">
          <h3 className="text-base font-semibold text-ink">Need expert guidance?</h3>
          <p className="mt-1 text-sm text-ink-soft">Our counselors can help with admissions, visas, and course selection.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/contact-us" className="rounded-full bg-gradient-to-b from-brand to-brand-deep px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/30">
              Contact Us
            </Link>
            <a
              href={contact.whatsappHref} data-track="whatsapp_click"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand"
            >
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </article>

      <section className="border-t border-line bg-surface-2/60 py-16">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-faint">Explore more</p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link href="/blogs" className="text-sm font-semibold text-brand hover:underline">All articles</Link>
            <Link href="/courses" className="text-sm font-semibold text-brand hover:underline">Browse courses</Link>
            <Link href="/partner-universities" className="text-sm font-semibold text-brand hover:underline">Partner universities</Link>
          </div>
          {others.length > 0 && (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blogs/${p.slug}`}
                  className="rounded-xl border border-line bg-surface p-4 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand"
                >
                  {p.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
