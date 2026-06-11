import { cache } from "react";
import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";
import { compileMDX } from "next-mdx-remote/rsc";
import { blogMdxComponents } from "@/lib/blog/mdx";
import {
  CALCULATOR_TOOLS,
  CONTENT_REVIEWED_DATE,
  siteConfig,
} from "@/lib/constants";
import type {
  BlogFrontmatter,
  BlogPost,
  BlogRenderResult,
  FaqItem,
  InternalLinkItem,
  TocItem,
} from "@/lib/blog/types";
import type { Metadata } from "next";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const POSTS_PER_PAGE = 6;

function normalizeDateValue(value: unknown): string | undefined {
  if (!value) return undefined;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string") return value;
  return String(value);
}

function toCategorySlug(category: string): string {
  return category
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

function ensureFrontmatter(
  data: Partial<BlogFrontmatter>,
  slug: string,
): BlogFrontmatter {
  if (!data.title || !data.description || !data.date || !data.tool || !data.category) {
    throw new Error(
      `Invalid blog frontmatter for ${slug}. Required: title, description, date, tool, category.`,
    );
  }

  return {
    title: data.title,
    description: data.description,
    date: normalizeDateValue(data.date) ?? CONTENT_REVIEWED_DATE,
    updated: normalizeDateValue(data.updated),
    tool: data.tool,
    category: data.category,
    keywords: Array.isArray(data.keywords) ? data.keywords : [],
    faq: Boolean(data.faq),
    featured: Boolean(data.featured),
  };
}

function extractExcerpt(content: string): string {
  const clean = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*`_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return clean.slice(0, 180).trim();
}

function extractHeadings(content: string): TocItem[] {
  const slugger = new GithubSlugger();

  return content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("## ") || line.startsWith("### "))
    .map((line) => {
      const level = line.startsWith("### ") ? 3 : 2;
      const text = line.replace(/^###?\s+/, "").trim();
      return {
        id: slugger.slug(text),
        text,
        level: level as 2 | 3,
      };
    });
}

function extractFaqItems(content: string): FaqItem[] {
  const lines = content.split("\n");
  const items: FaqItem[] = [];
  let inFaqSection = false;
  let currentQuestion = "";
  let currentAnswer: string[] = [];

  const flush = () => {
    if (currentQuestion && currentAnswer.length > 0) {
      items.push({
        question: currentQuestion,
        answer: currentAnswer.join(" ").replace(/\s+/g, " ").trim(),
      });
    }
    currentQuestion = "";
    currentAnswer = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("## ")) {
      if (inFaqSection && trimmed.toLowerCase() !== "## faq") break;
      inFaqSection = trimmed.toLowerCase() === "## faq";
      continue;
    }

    if (!inFaqSection) continue;

    if (trimmed.startsWith("### ")) {
      flush();
      currentQuestion = trimmed.replace(/^###\s+/, "").trim();
      continue;
    }

    if (currentQuestion && trimmed) currentAnswer.push(trimmed);
  }

  flush();
  return items;
}

function buildInternalLinks(post: BlogPost, posts: BlogPost[]): InternalLinkItem[] {
  const relatedPosts = posts
    .filter(
      (candidate) =>
        candidate.slug !== post.slug && candidate.categorySlug === post.categorySlug,
    )
    .slice(0, 2)
    .map((candidate) => ({
      href: candidate.path,
      label: candidate.frontmatter.title,
      description: candidate.frontmatter.description,
    }));

  const calculatorLinks = CALCULATOR_TOOLS.slice(0, 2).map((tool) => ({
    href: tool.href,
    label: tool.title,
    description: tool.description,
  }));

  return [...relatedPosts, ...calculatorLinks].slice(0, 4);
}

async function readPostFile(fileName: string): Promise<BlogPost> {
  const fullPath = path.join(BLOG_DIR, fileName);
  const slug = fileName.replace(/\.mdx$/, "");
  const source = await fs.readFile(fullPath, "utf8");
  const parsed = matter(source);
  const frontmatter = ensureFrontmatter(parsed.data as Partial<BlogFrontmatter>, slug);
  const stats = readingTime(parsed.content);

  return {
    slug,
    path: `/blog/${slug}`,
    categorySlug: toCategorySlug(frontmatter.category),
    frontmatter,
    content: parsed.content.trim(),
    excerpt: extractExcerpt(parsed.content),
    readingTime: stats.text,
    wordCount: stats.words,
    headings: extractHeadings(parsed.content),
    faqItems: frontmatter.faq ? extractFaqItems(parsed.content) : [],
    internalLinks: [],
    lastUpdated: frontmatter.updated ?? frontmatter.date ?? CONTENT_REVIEWED_DATE,
  };
}

export const getAllBlogPosts = cache(async (): Promise<BlogPost[]> => {
  let fileNames: string[] = [];

  try {
    fileNames = (await fs.readdir(BLOG_DIR)).filter((file) => file.endsWith(".mdx"));
  } catch {
    return [];
  }

  const posts = await Promise.all(fileNames.map(readPostFile));
  const sorted = posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
  );

  return sorted.map((post) => ({
    ...post,
    internalLinks: buildInternalLinks(post, sorted),
  }));
});

export const getBlogPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  const posts = await getAllBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
});

export const renderBlogPost = cache(async (slug: string): Promise<BlogRenderResult> => {
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const result = await compileMDX({
    source: post.content,
    components: blogMdxComponents,
  });

  return {
    post,
    content: result.content,
  };
});

export async function getBlogCategories() {
  const posts = await getAllBlogPosts();
  const counts = new Map<string, { label: string; slug: string; count: number }>();

  for (const post of posts) {
    const existing = counts.get(post.categorySlug);
    if (existing) {
      existing.count += 1;
      continue;
    }

    counts.set(post.categorySlug, {
      label: post.frontmatter.category,
      slug: post.categorySlug,
      count: 1,
    });
  }

  return Array.from(counts.values()).sort((a, b) => a.label.localeCompare(b.label));
}

export async function getBlogPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter((post) => post.categorySlug === categorySlug);
}

export async function getBlogPagination(
  page: number,
  query?: string,
  category?: string,
) {
  const posts = await getAllBlogPosts();
  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const filtered = posts.filter((post) => {
    const queryMatch =
      !normalizedQuery ||
      post.frontmatter.title.toLowerCase().includes(normalizedQuery) ||
      post.frontmatter.description.toLowerCase().includes(normalizedQuery) ||
      post.frontmatter.keywords.some((keyword) =>
        keyword.toLowerCase().includes(normalizedQuery),
      );
    const categoryMatch = !category || post.categorySlug === category;
    return queryMatch && categoryMatch;
  });

  const currentPage = Number.isFinite(page) && page > 0 ? page : 1;
  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * POSTS_PER_PAGE;

  return {
    posts: filtered.slice(start, start + POSTS_PER_PAGE),
    totalPosts: filtered.length,
    currentPage: safePage,
    totalPages,
  };
}

export async function getAdjacentPosts(slug: string) {
  const posts = await getAllBlogPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return { previous: null, next: null };

  return {
    previous: posts[index + 1] ?? null,
    next: posts[index - 1] ?? null,
  };
}

export async function getRelatedPosts(slug: string, limit = 3): Promise<BlogPost[]> {
  const post = await getBlogPostBySlug(slug);
  if (!post) return [];

  const posts = await getAllBlogPosts();

  return posts
    .filter((candidate) => candidate.slug !== slug)
    .map((candidate) => ({
      candidate,
      score:
        (candidate.categorySlug === post.categorySlug ? 4 : 0) +
        candidate.frontmatter.keywords.filter((keyword) =>
          post.frontmatter.keywords.includes(keyword),
        ).length,
    }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.candidate.frontmatter.date).getTime() -
          new Date(a.candidate.frontmatter.date).getTime(),
    )
    .slice(0, limit)
    .map((item) => item.candidate);
}

export function formatBlogDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function buildBlogMetadata(post: BlogPost): Metadata {
  const canonical = `${siteConfig.url}${post.path}`;
  const brandedTitle = `${post.frontmatter.title} | ${siteConfig.name}`;

  return {
    title: post.frontmatter.title,
    authors: [{ name: siteConfig.editorialTeamName ?? ` Editorial Team`, url: `/about` }],
    creator: siteConfig.editorialTeamName ?? ` Editorial Team`,
    publisher: siteConfig.legalName ?? siteConfig.name,
    description: post.frontmatter.description,
    keywords: post.frontmatter.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      title: brandedTitle,
      description: post.frontmatter.description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      publishedTime: post.frontmatter.date,
      modifiedTime: post.lastUpdated,
      images: [
        {
          url: `${siteConfig.url}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: brandedTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description: post.frontmatter.description,
      site: siteConfig.twitterHandle,
      images: [`${siteConfig.url}/opengraph-image`],
    },
  };
}

export function buildBlogBreadcrumbs(post: BlogPost) {
  return [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.frontmatter.title, path: post.path },
  ];
}

export function buildCategoryBreadcrumbs(label: string, categorySlug: string) {
  return [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: label, path: `/blog/category/${categorySlug}` },
  ];
}

export function getFeaturedPosts(posts: BlogPost[]) {
  return posts.filter((post) => post.frontmatter.featured);
}

export function getLatestPosts(posts: BlogPost[], limit = 5) {
  return posts.slice(0, limit);
}
