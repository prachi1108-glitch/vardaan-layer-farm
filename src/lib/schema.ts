import type { ContactInfo, Grade, Post } from "./cms";
import { site } from "./site";

/** JSON-LD builders (PRD §5.3). Only describe what is visible on the page. */

const abs = (path: string) => new URL(path, site.url).toString();
export const ORG_ID = abs("/#organization");

export function organizationSchema(contact: ContactInfo) {
  const areas = contact.areasServed.length ? contact.areasServed : [site.contact.locality];
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Organization"],
    "@id": ORG_ID,
    name: site.name,
    description: site.description,
    url: abs("/"),
    logo: abs("/logo-mark.svg"),
    image: abs("/design/hero-egg-trays.jpg"),
    telephone: `+${contact.phoneE164}`,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.contact.locality,
      addressRegion: site.contact.region,
      addressCountry: site.contact.country,
    },
    areaServed: areas.map((name) => ({ "@type": "City", name })),
    ...(contact.businessHours ? { openingHours: contact.businessHours } : {}),
    sameAs: contact.socialLinks.map((l) => l.url).filter(Boolean),
    knowsAbout: ["White table eggs", "Bulk egg supply", "Egg grading", "Layer farming"],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": abs("/#website"),
    url: abs("/"),
    name: site.name,
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: `${abs("/resources")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/** Product without price — pricing is by quote (FR-4.4). */
export function productSchema(grades: Grade[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "White table eggs (bulk)",
    description:
      "Fresh white table eggs from Vardaan's own layer flock in Sonipat, graded on site and packed in 30-egg moulded pulp trays. Supplied in bulk by quote.",
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@id": ORG_ID },
    image: abs("/design/hero-egg-trays.jpg"),
    category: "Eggs",
    additionalProperty: [
      { "@type": "PropertyValue", name: "Pack size", value: "30 eggs per tray" },
      { "@type": "PropertyValue", name: "Shell colour", value: "White" },
      ...(grades.length ? grades.map((g) => g.name) : site.grades).map((name) => ({
        "@type": "PropertyValue",
        name: "Grade",
        value: name,
      })),
    ],
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: abs("/contact"),
    name: "Contact Vardaan Layer Farm",
    about: { "@id": ORG_ID },
  };
}

export function blogPostingSchema(post: Post) {
  const url = abs(`/resources/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: url,
    url,
    headline: post.title,
    description: post.quickAnswer || post.excerpt || undefined,
    datePublished: post.publishedAt || undefined,
    dateModified: post.updatedAt || post.publishedAt || undefined,
    image: post.coverImage?.url ? abs(post.coverImage.url) : undefined,
    author: post.byline
      ? { "@type": "Person", name: post.byline.name, jobTitle: post.byline.role || undefined }
      : { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    articleSection: post.category?.title || undefined,
  };
}
