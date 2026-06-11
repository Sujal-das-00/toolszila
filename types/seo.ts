import type { Metadata } from "next";

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  locale: string;
  twitterHandle: string;
  contactEmail: string;
  legalName?: string;
  foundingDate?: string;
  areaServed?: string[];
  editorialTeamName?: string;
  editorialTeamTitle?: string;
  editorialTeamDescription?: string;
  articleSection?: string;
  datePublished?: string;
  dateModified?: string;
  sameAs?: string[];
  /** Google Analytics measurement ID (e.g. G-XXXXXXXXXX). */
  googleAnalyticsId?: string;
  /** Google Search Console verification meta content value. */
  googleSiteVerification?: string;
}

export interface PageSeoInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogType?: "website" | "article";
  ogImagePath?: string;
  noIndex?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface JsonLdGraph {
  "@context": "https://schema.org";
  "@graph": Record<string, unknown>[];
}

export type PageMetadata = Metadata;
