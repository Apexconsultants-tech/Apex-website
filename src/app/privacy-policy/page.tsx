import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Reveal from "@/components/Reveal";
import { contact, offices, site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy | Apex Consultants",
  description: "How Apex Consulting Services collects, uses, and protects your personal information.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pb-20 pt-10 lg:px-8 lg:pt-14">
      <Breadcrumb current="Privacy Policy" />
      <Reveal className="mt-6">
        <h1 className="text-3xl font-semibold text-ink sm:text-4xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-ink-faint">Last updated: 9 August 2026</p>

        <div className="mt-6 rounded-xl border border-amber/30 bg-amber-tint px-5 py-4 text-sm text-ink">
          <strong>Draft notice.</strong> This page describes, in good faith, the data {site.name} actually
          collects through this website today. It has not yet been reviewed by a lawyer and should be
          checked against Pakistani and destination-country data protection requirements before this page
          is relied on as a final, binding policy.
        </div>

        <div className="mt-10 space-y-8 text-ink-soft leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-ink">Who we are</h2>
            <p className="mt-2">
              {site.name} (&ldquo;Apex&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is an overseas education consultancy based in Karachi,
              Pakistan, with offices in Hyderabad and the United Kingdom. This policy explains how we
              handle personal information submitted through {site.domain}.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink">Information we collect</h2>
            <p className="mt-2">When you submit an enquiry or application form on this site, we collect:</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              <li>Your first and last name</li>
              <li>Email address and mobile number</li>
              <li>Preferred study destination and message content you provide</li>
            </ul>
            <p className="mt-3">
              We also use Google Analytics (GA4) to understand how visitors use this site, which collects
              standard analytics data such as pages viewed and general location. We do not knowingly
              collect sensitive personal data (health, financial account numbers, government ID numbers)
              through this website; any such documents are exchanged directly with your counselor once
              your enquiry becomes an active case, through channels we agree with you.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink">How we use your information</h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              <li>To respond to your enquiry and provide the consultation, admissions, or visa guidance you requested</li>
              <li>To contact you by phone, WhatsApp, or email about your enquiry, as you consent to when submitting a form</li>
              <li>To improve this website, using aggregated, non-identifying analytics data</li>
            </ul>
            <p className="mt-3">We do not sell your personal information to third parties.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink">Who we share it with</h2>
            <p className="mt-2">
              Enquiry form submissions are delivered to our team&rsquo;s email inbox for follow-up. Where you
              proceed with an application, we share the documents you provide with the relevant university
              or visa authority on your behalf, only as needed to process that application, and only with
              your knowledge.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink">Your choices</h2>
            <p className="mt-2">
              You can ask us to update or delete the information you have shared with us, or to stop
              contacting you, at any time by emailing{" "}
              <a href={`mailto:${contact.email}`} className="font-semibold text-brand hover:underline">
                {contact.email}
              </a>{" "}
              or calling {contact.phoneDisplay}.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink">Contact</h2>
            <p className="mt-2">
              {offices[0].name}: {offices[0].address}
              <br />
              Email: {contact.email} &middot; Phone: {contact.phoneDisplay}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
