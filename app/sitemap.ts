import type { MetadataRoute } from "next";
import { CONTENT_REVIEWED_DATE, siteConfig } from "@/lib/constants";
import { getAllBlogPosts, getBlogCategories } from "@/lib/blog";
import {
  TOOL_CATEGORIES,
  getLiveTools,
  getToolsByCategory,
  toolPath,
} from "@/lib/navigation/site-architecture";
import { getAllPseoSlugs } from "@/lib/pseo/routes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const lastModified = new Date(`${CONTENT_REVIEWED_DATE}T00:00:00.000Z`);

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${baseUrl}/calculators`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/popular`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/methodology`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/ireland-take-home-pay-calculator`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.88,
    },
    {
      url: `${baseUrl}/nz-take-home-pay-calculator`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.88,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.35,
    },
    {
      url: `${baseUrl}/gdpr`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/ccpa`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = TOOL_CATEGORIES
    .filter((c) => getToolsByCategory(c.id).some((tool) => tool.status === "live"))
    .map((c) => ({
      url: `${baseUrl}${c.path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: c.id === "tax" ? 0.9 : 0.85,
    }));

  const highPriorityToolSlugs = new Set([
    "paycheck-calculator",
    "salary-calculator",
    "tax-calculator",
    "income-tax-calculator",
    "federal-tax-calculator",
    "self-employment-tax-calculator",
    "social-security-tax-calculator",
  ]);

  const toolPages: MetadataRoute.Sitemap = getLiveTools().map((tool) => ({
    url: `${baseUrl}${toolPath(tool)}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: highPriorityToolSlugs.has(tool.slug) ? 0.92 : 0.8,
  }));

  const pseoPages: MetadataRoute.Sitemap = getAllPseoSlugs().map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: slug.includes("paycheck-calculator") ? 0.9 : 0.7,
  }));

  const [blogPosts, blogCategories] = await Promise.all([
    getAllBlogPosts(),
    getBlogCategories(),
  ]);

  const blogCategoryPages: MetadataRoute.Sitemap = blogCategories.map((category) => ({
    url: `${baseUrl}/blog/category/${category.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogPostPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}${post.path}`,
    lastModified: new Date(`${post.lastUpdated}T00:00:00.000Z`),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...toolPages,
    ...pseoPages,
    ...blogCategoryPages,
    ...blogPostPages,
  ];
}
