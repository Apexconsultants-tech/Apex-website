import { contact, icef, offices, site } from "@/lib/site-config";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/images/brand/apex-logo.webp`,
    foundingDate: `${site.foundedYear}`,
    email: contact.email,
    telephone: contact.phoneDisplay,
    sameAs: ["https://www.facebook.com/ApexConsultingServices", "https://www.linkedin.com/company/apex-consulting-services-pakistan/"],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "ICEF Agency Status",
      identifier: icef.iasId,
      url: icef.certificateUrl,
    },
    address: offices.slice(0, 2).map((o) => ({
      "@type": "PostalAddress",
      name: o.name,
      streetAddress: o.address,
      addressCountry: "PK",
    })),
  };
}

export function localBusinessJsonLd() {
  const karachi = offices[0];
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    image: `${site.url}/images/brand/apex-logo.webp`,
    url: site.url,
    telephone: contact.phoneDisplay,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: karachi.address,
      addressCountry: "PK",
    },
    openingHours: "Mo-Fr 09:00-17:00",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function faqJsonLd(faqs: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleJsonLd(post: { title: string; date: string; excerpt: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    url: `${site.url}/blogs/${post.slug}`,
    mainEntityOfPage: `${site.url}/blogs/${post.slug}`,
  };
}
