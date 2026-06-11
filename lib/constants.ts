import type { SiteConfig } from "@/types/seo";
import { getLiveTools, toolPath } from "@/lib/navigation/site-architecture";

/**
 * Site-wide configuration.
 * Update NEXT_PUBLIC_SITE_URL in production for canonical URLs and OG tags.
 */
export const siteConfig: SiteConfig = {
  name: "ToolsZila",
  tagline: "Smart Calculators & Financial Tools",
  description:
    "Free salary, tax, take-home pay, insurance, finance, travel, and everyday calculators for practical planning.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://toolszila.com",
  locale: "en_US",
  twitterHandle: "@toolszila",
  legalName: "ToolsZila",
  foundingDate: "2026-01-01",
  areaServed: ["US", "IE", "NZ"],
  editorialTeamName: "Team ToolsZila",
  editorialTeamTitle: "Editorial Team",
  editorialTeamDescription: "Team ToolsZila reviews calculator assumptions, tax-source updates, and educational content for clarity and accuracy.",
  contactEmail: "hello@toolszila.com",
  sameAs: [
    "https://twitter.com/toolszila",
    "https://linkedin.com/company/toolszila",
    "https://facebook.com/toolszila",
  ],
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
  googleSiteVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
};

/** Site content review date. Tax data remains versioned separately. */
export const CONTENT_REVIEWED_DATE = "2026-06-02";
export const CONTENT_REVIEWED_LABEL = "June 2, 2026";

/** Default calculator assumptions for programmatic salary pages. */
export const DEFAULT_SALARY_PAGE_INPUT = {
  stateCode: "CA",
  filingStatus: "single" as const,
  payFrequency: "biweekly" as const,
};

/** Salary amounts for programmatic SEO pages ($50k–$300k in $10k steps). */
export const SALARY_AMOUNTS = Array.from({ length: 26 }, (_, i) => (i + 5) * 10_000);

/** Live income tools for internal linking (excludes paycheck — linked separately). */
export const CALCULATOR_TOOLS = getLiveTools()
  .filter((t) => t.slug !== "paycheck-calculator")
  .map((t) => ({
    slug: `${t.category}/${t.slug}`,
    title: t.title,
    description: t.description,
    href: toolPath(t),
  }));

/** Pay frequency options for forms. */
export const PAY_FREQUENCIES = [
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Biweekly" },
  { value: "semi_monthly", label: "Semi-monthly" },
  { value: "monthly", label: "Monthly" },
] as const;

/** Filing status options for forms. */
export const FILING_STATUSES = [
  { value: "single", label: "Single" },
  { value: "married_joint", label: "Married Filing Jointly" },
  { value: "head_of_household", label: "Head of Household" },
] as const;
