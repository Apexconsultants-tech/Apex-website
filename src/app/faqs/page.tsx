import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { contact, faqs } from "@/lib/site-config";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/structured-data";

const faqsTitle = "Frequently Asked Questions";
const faqsDescription =
  "Answers to common questions about studying abroad with Apex Consulting Services: visas, scholarships, accreditation, and getting started.";

export const metadata: Metadata = {
  title: faqsTitle,
  description: faqsDescription,
  alternates: { canonical: "/faqs" },
  openGraph: { title: faqsTitle, description: faqsDescription, url: "/faqs", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: faqsTitle, description: faqsDescription, images: ["/opengraph-image"] },
};

export default function FaqsPage() {
  return (
    <>
      <JsonLd
        data={[breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQs", path: "/faqs" }]), faqJsonLd(faqs)]}
      />
      <section className="mx-auto max-w-3xl px-5 pb-12 pt-10 lg:px-8 lg:pt-14">
        <Breadcrumb current="FAQs" />
        <Reveal className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">Common questions</p>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.06] text-ink sm:text-5xl">
            Frequently Asked <span className="text-brand">Questions</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-ink-soft">
            We understand students often have many questions about studying abroad. Our experts provide
            clear, practical answers. For anything specific to your destination, each{" "}
            <Link href="/#destinations" className="font-semibold text-brand-text underline underline-offset-2 hover:decoration-2">
              destination page
            </Link>{" "}
            also has its own FAQ section.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-line bg-surface-2/60 py-16">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <Reveal>
            <FaqAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
        <Reveal>
          <div className="rounded-3xl bg-brand px-8 py-10 text-center">
            <h2 className="text-2xl font-semibold text-white">Still have questions?</h2>
            <p className="mt-2 text-white/90">Talk to a counselor directly, no obligation.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact-us"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-deep transition-all hover:-translate-y-0.5 hover:bg-white/90"
              >
                Contact Us
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
