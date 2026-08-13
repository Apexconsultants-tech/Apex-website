import type { Metadata } from "next";
import { Public_Sans, Sora } from "next/font/google";
import Analytics from "@/components/Analytics";
import FloatingLuggageTag from "@/components/FloatingLuggageTag";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import StickyContactBar from "@/components/StickyContactBar";
import { site } from "@/lib/site-config";
import { localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Study Abroad Consultants`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | Study Abroad Consultants`,
    description: site.description,
    url: site.url,
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Study Abroad Consultants`,
    description: site.description,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${publicSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-ink bg-paper">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <JsonLd data={[organizationJsonLd(), localBusinessJsonLd(), websiteJsonLd()]} />
        <Header />
        <main id="main-content" className="flex-1 pb-14 lg:pb-0">{children}</main>
        <Footer />
        <StickyContactBar />
        <FloatingLuggageTag />
        <Analytics />
      </body>
    </html>
  );
}
