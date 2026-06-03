import type { ComponentType, ReactNode } from "react";

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  tool: string;
  category: string;
  keywords: string[];
  faq?: boolean;
  featured?: boolean;
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface InternalLinkItem {
  href: string;
  label: string;
  description: string;
}

export interface BlogPost {
  slug: string;
  path: string;
  categorySlug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  excerpt: string;
  readingTime: string;
  wordCount: number;
  headings: TocItem[];
  faqItems: FaqItem[];
  internalLinks: InternalLinkItem[];
  lastUpdated: string;
}

export interface BlogRenderResult {
  post: BlogPost;
  content: ReactNode;
}

export interface BlogToolDefinition {
  id: string;
  label: string;
  description: string;
  component: ComponentType;
}
