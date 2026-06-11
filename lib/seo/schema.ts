import { CONTENT_REVIEWED_DATE, siteConfig } from "@/lib/constants";
import type { BreadcrumbItem } from "@/types/seo";

/**
 * JSON-LD structured data builders for search and AI understanding.
 * Render through components/seo/JsonLd so payloads are HTML-safe.
 */

export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.legalName ?? siteConfig.name,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.tagline,
    email: siteConfig.contactEmail,
    foundingDate: siteConfig.foundingDate,
    sameAs: siteConfig.sameAs,
    areaServed: siteConfig.areaServed ?? ["US", "IE", "NZ"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: siteConfig.contactEmail,
        availableLanguage: ["en"],
      },
    ],
    knowsAbout: [
      "take-home pay calculator",
      "salary calculator",
      "federal income tax withholding",
      "New Zealand PAYE",
      "Ireland PAYE",
      "state income tax",
      "Social Security tax",
      "Medicare tax",
    ],
  };
}

export function buildEditorialPersonSchema() {
  return {
    "@type": "Person",
    "@id": `${siteConfig.url}/#editorial-team`,
    name: siteConfig.editorialTeamName ?? `${siteConfig.name} Editorial Team`,
    jobTitle: siteConfig.editorialTeamTitle ?? "Editorial Team",
    description:
      siteConfig.editorialTeamDescription ??
      `${siteConfig.name} editorial team reviews calculator assumptions, tax-source updates, and educational content for clarity and accuracy.`,
    worksFor: { "@id": `${siteConfig.url}/#organization` },
    url: `${siteConfig.url}/about`,
  };
}

export function buildWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.tagline,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "en-US",
  };
}

export function buildWebPageSchema(options: {
  name: string;
  description: string;
  url: string;
  dateModified?: string;
  keywords?: string[];
}) {
  return {
    "@type": "WebPage",
    name: options.name,
    description: options.description,
    url: options.url,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
    primaryImageOfPage: `${siteConfig.url}/opengraph-image`,
    dateModified: options.dateModified ?? CONTENT_REVIEWED_DATE,
    inLanguage: "en-US",
    ...(options.keywords?.length ? { keywords: options.keywords.join(", ") } : {}),
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function buildCalculatorSchema(options: {
  name: string;
  description: string;
  url: string;
  applicationSubCategory?: string;
  featureList?: string[];
  keywords?: string[];
}) {
  return {
    "@type": "SoftwareApplication",
    name: options.name,
    description: options.description,
    url: options.url,
    applicationCategory: "FinanceApplication",
    ...(options.applicationSubCategory
      ? { applicationSubCategory: options.applicationSubCategory }
      : {}),
    operatingSystem: "Web",
    isAccessibleForFree: true,
    featureList: options.featureList ?? [
      "Federal income tax estimate",
      "State income tax estimate",
      "Social Security and Medicare estimate",
      "Per-paycheck take-home pay estimate",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: { "@id": `${siteConfig.url}/#organization` },
    creator: { "@id": `${siteConfig.url}/#editorial-team` },
    ...(options.keywords?.length ? { keywords: options.keywords.join(", ") } : {}),
  };
}

export function buildArticleSchema(options: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  keywords?: string[];
  articleSection?: string;
}) {
  return {
    "@type": "Article",
    headline: options.title,
    description: options.description,
    url: options.url,
    datePublished: options.datePublished ?? CONTENT_REVIEWED_DATE,
    dateModified: options.dateModified ?? CONTENT_REVIEWED_DATE,
    author: { "@id": `${siteConfig.url}/#editorial-team` },
    accountablePerson: { "@id": `${siteConfig.url}/#editorial-team` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    mainEntityOfPage: options.url,
    articleSection: options.articleSection ?? "Tax and salary guides",
    inLanguage: "en-US",
    ...(options.keywords?.length ? { keywords: options.keywords.join(", ") } : {}),
  };
}

export function buildFaqSchema(items: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** Compose multiple schemas into a single JSON-LD graph. */
export function buildJsonLdGraph(
  schemas: Record<string, unknown>[],
): string {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationSchema(),
      buildEditorialPersonSchema(),
      buildWebSiteSchema(),
      ...schemas,
    ],
  };
  return JSON.stringify(graph);
}
