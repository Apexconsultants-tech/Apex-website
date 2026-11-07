import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DestinationTemplate from "@/components/destination/DestinationTemplate";
import JsonLd from "@/components/JsonLd";
import ServiceTemplate from "@/components/service/ServiceTemplate";
import { destinationPhoto, destinations, getDestination, inName } from "@/lib/destinations-data";
import { getService, services } from "@/lib/services-data";
import { serviceImage } from "@/lib/service-photos.server";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/structured-data";

export function generateStaticParams() {
  const destSlugs = destinations.map((d) => ({ slug: d.slug }));
  const serviceSlugs = services.map((s) => ({ slug: s.slug }));
  return [...destSlugs, ...serviceSlugs];
}

// Trim to ~155 characters on a word boundary so search snippets never end mid-word.
function metaDescription(text: string, max = 155) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "")}…`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (destination) {
    const title = `Study in ${inName(destination.name)} from Pakistan`;
    const description = metaDescription(destination.intro);
    const image = destinationPhoto(slug);
    return {
      title,
      description,
      alternates: { canonical: `/${slug}` },
      openGraph: { title, description, url: `/${slug}`, images: [image] },
      twitter: { card: "summary_large_image", title, description, images: [image] },
    };
  }
  const service = getService(slug);
  if (service) {
    const title = `${service.name} in Pakistan`;
    const description = metaDescription(service.intro);
    const image = serviceImage(slug);
    return {
      title,
      description,
      alternates: { canonical: `/${slug}` },
      openGraph: { title, description, url: `/${slug}`, images: image ? [image] : undefined },
      twitter: { card: "summary_large_image", title, description, images: image ? [image] : undefined },
    };
  }
  return {};
}

export default async function CatalogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const destination = getDestination(slug);
  if (destination) {
    return (
      <>
        <JsonLd
          data={[
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: destination.name, path: `/${slug}` },
            ]),
            faqJsonLd(destination.faqs),
          ]}
        />
        <DestinationTemplate d={destination} />
      </>
    );
  }

  const service = getService(slug);
  if (service) {
    return (
      <>
        <JsonLd
          data={[
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: service.name, path: `/${slug}` },
            ]),
            faqJsonLd(service.faqs),
            serviceJsonLd(service),
          ]}
        />
        <ServiceTemplate s={service} />
      </>
    );
  }

  notFound();
}
