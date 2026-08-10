import type { Metadata } from "next";
import Link from "next/link";
import { contact } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-5 py-24 text-center lg:px-8">
      <p className="font-display text-6xl font-semibold text-brand">404</p>
      <h1 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">We couldn&rsquo;t find that page</h1>
      <p className="mt-4 max-w-md text-ink-soft">
        The page you were looking for may have moved or no longer exists. Try one of these instead:
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-gradient-to-b from-brand to-brand-deep px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/30"
        >
          Go to homepage
        </Link>
        <Link
          href="/#destinations"
          className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand"
        >
          Study destinations
        </Link>
        <Link
          href="/contact-us"
          className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-brand hover:text-brand"
        >
          Contact us
        </Link>
      </div>
      <p className="mt-8 text-sm text-ink-faint">
        Or call us directly at{" "}
        <a href={contact.phoneHref} data-track="phone_click" className="font-semibold text-brand hover:underline">
          {contact.phoneDisplay}
        </a>
      </p>
    </section>
  );
}
