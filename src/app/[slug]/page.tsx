import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DestinationTemplate from "@/components/destination/DestinationTemplate";
import JsonLd from "@/components/JsonLd";
import ServiceTemplate from "@/components/service/ServiceTemplate";
import { destinationPhoto, destinations, getDestination } from "@/lib/destinations-data";
import { getService, services } from "@/lib/services-data";
import { serviceImage } from "@/lib/service-photos.server";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/structured-data";

export function generateStaticParams() {
  const destSlugs = destinations.map((d) => ({ slug: d.slug }));
  const serviceSlugs = services.map((s) => ({ slug: s.slug }));
  return [...destSlugs, ...serviceSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (destination) {
    const title = `Study in ${destination.name}: Consultants in Pakistan`;
    const description = destination.intro.slice(0, 155);
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
    const title = service.name;
    const description = service.intro.slice(0, 155);
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
