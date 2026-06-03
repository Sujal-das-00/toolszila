import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";
import type { PageSeoInput } from "@/types/seo";

/**
 * Centralized metadata builder for consistent SEO across all pages.
 * Root pages need their own branded title because the root layout template
 * does not apply to app/page.tsx; nested routes let the layout append it.
 */
export function buildPageMetadata(input: PageSeoInput): Metadata {
  const url = `${siteConfig.url}${input.path}`;
  const imagePath = input.ogImagePath ?? "/opengraph-image";
  const imageUrl = imagePath.startsWith("http")
    ? imagePath
    : `${siteConfig.url}${imagePath}`;
  const brandedTitle = input.title.includes(siteConfig.name)
    ? input.title
    : `${input.title} | ${siteConfig.name}`;

  return {
    title: input.path === "/" ? brandedTitle : input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: brandedTitle,
      description: input.description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: input.ogType ?? "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: brandedTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description: input.description,
      site: siteConfig.twitterHandle,
      images: [imageUrl],
    },
    robots: input.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

/** Format currency for display in metadata and content. */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format currency with cents. */
export function formatCurrencyPrecise(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/** Format percentage for display. */
export function formatPercent(rate: number, decimals = 1): string {
  return `${(rate * 100).toFixed(decimals)}%`;
}

/** Format salary slug amount: 50000 -> "$50,000". */
export function formatSalarySlug(amount: number): string {
  return formatCurrency(amount);
}
