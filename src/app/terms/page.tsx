import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Reveal from "@/components/Reveal";
import { contact, icef, site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service | Apex Consultants",
  description: "Terms governing the use of the Apex Consulting Services website and consultancy services.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pb-20 pt-10 lg:px-8 lg:pt-14">
      <Breadcrumb current="Terms of Service" />
      <Reveal className="mt-6">
        <h1 className="text-3xl font-semibold text-ink sm:text-4xl">Terms of Service</h1>
        <p className="mt-3 text-sm text-ink-faint">Last updated: 9 August 2026</p>

        <div className="mt-6 rounded-xl border border-amber/30 bg-amber-tint px-5 py-4 text-sm text-ink">
          <strong>Draft notice.</strong> This is a starting template covering the site and consultancy
          relationship in plain terms. It has not been reviewed by a lawyer and should be checked before
          being relied on as final, binding terms, particularly around service fees and refund conditions,
          which should be confirmed against Apex&rsquo;s actual client agreements.
        </div>

        <div className="mt-10 space-y-8 text-ink-soft leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-ink">Using this website</h2>
            <p className="mt-2">
              This website is operated by {site.name}, an ICEF-accredited overseas education consultancy
              (Agency Status IAS #{icef.iasId}). By using {site.domain}, you agree to these terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink">Our services</h2>
            <p className="mt-2">
              Apex provides education counseling, university and course guidance, admission application
              support, test preparation guidance, financial and scholarship guidance, student visa
              assistance, and pre-departure and post-arrival support, as described on our{" "}
              services pages. A free initial consultation does not itself constitute a binding service
              agreement; specific service terms, fees, and deliverables are confirmed directly with your
              counselor before paid work begins.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink">No guaranteed outcomes</h2>
            <p className="mt-2">
              University admissions, scholarship awards, and visa decisions are made solely by the
              relevant university or government authority. While Apex prepares and reviews your
              application and visa file to the best professional standard, we cannot guarantee admission,
              scholarship, or visa approval.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink">Your responsibilities</h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              <li>Provide accurate, truthful information and genuine documents for your application and visa file</li>
              <li>Respond to requests for documents or information within the timelines we advise</li>
              <li>Inform us promptly of any change in your circumstances that could affect your application</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink">Website content</h2>
            <p className="mt-2">
              Destination and cost information on this site (tuition ranges, visa requirements, intake
              dates) is provided as general guidance and can change without notice as universities and
              governments update their policies. Always confirm current, specific requirements with your
              counselor before making decisions based on this content.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink">Contact</h2>
            <p className="mt-2">
              Questions about these terms can be sent to{" "}
              <a href={`mailto:${contact.email}`} className="font-semibold text-brand hover:underline">
                {contact.email}
              </a>{" "}
              or {contact.phoneDisplay}.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
