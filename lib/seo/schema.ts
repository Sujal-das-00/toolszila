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
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.tagline,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: siteConfig.contactEmail,
        availableLanguage: ["en"],
      },
    ],
    sameAs: siteConfig.sameAs,
    areaServed: "US",
    knowsAbout: [
      "paycheck calculator",
      "federal income tax withholding",
      "state income tax",
      "Social Security tax",
      "Medicare tax",
    ],
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
}) {
  return {
    "@type": "WebPage",
    name: options.name,
    description: options.description,
    url: options.url,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
    dateModified: options.dateModified ?? CONTENT_REVIEWED_DATE,
    inLanguage: "en-US",
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
}) {
  return {
    "@type": "SoftwareApplication",
    name: options.name,
    description: options.description,
    url: options.url,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    featureList: [
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
  };
}

export function buildArticleSchema(options: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@type": "Article",
    headline: options.title,
    description: options.description,
    url: options.url,
    datePublished: options.datePublished ?? CONTENT_REVIEWED_DATE,
    dateModified: options.dateModified ?? CONTENT_REVIEWED_DATE,
    author: { "@id": `${siteConfig.url}/#organization` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "en-US",
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
    "@graph": [buildOrganizationSchema(), buildWebSiteSchema(), ...schemas],
  };
  return JSON.stringify(graph);
}
