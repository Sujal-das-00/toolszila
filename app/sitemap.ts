import type { MetadataRoute } from "next";
import { CONTENT_REVIEWED_DATE, siteConfig } from "@/lib/constants";
import {
  TOOL_CATEGORIES,
  getLiveTools,
  toolPath,
} from "@/lib/navigation/site-architecture";
import { getAllPseoSlugs } from "@/lib/pseo/routes";

/** Dynamic sitemap — scales with tool registry and PSEO pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const lastModified = new Date(`${CONTENT_REVIEWED_DATE}T00:00:00.000Z`);

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/calculators`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/tools`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tools/popular`, lastModified, changeFrequency: "weekly", priority: 0.75 },
    { url: `${baseUrl}/faq`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/methodology`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/disclaimer`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/cookies`, lastModified, changeFrequency: "yearly", priority: 0.35 },
    { url: `${baseUrl}/gdpr`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/ccpa`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  const categoryPages: MetadataRoute.Sitemap = TOOL_CATEGORIES.map((c) => ({
    url: `${baseUrl}${c.path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const toolPages: MetadataRoute.Sitemap = getLiveTools().map((tool) => ({
    url: `${baseUrl}${toolPath(tool)}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: tool.slug === "paycheck-calculator" ? 0.95 : 0.8,
  }));

  const pseoPages: MetadataRoute.Sitemap = getAllPseoSlugs().map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: slug.includes("paycheck-calculator") ? 0.9 : 0.7,
  }));

  return [...staticPages, ...categoryPages, ...toolPages, ...pseoPages];
}
