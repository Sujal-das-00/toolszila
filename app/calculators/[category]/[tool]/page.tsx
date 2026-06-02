import { notFound } from "next/navigation";
import { ToolRenderer } from "@/components/calculators/ToolRenderer";
import { AdSlot } from "@/components/ads/AdSlot";
import { InternalLinks } from "@/components/content/InternalLinks";
import { FaqSection } from "@/components/content/FaqSection";
import {
  MethodologySection,
  SourceSection,
  SpecialCalculatorGuide,
  TaxYearNotice,
} from "@/components/content/SeoTrust";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getHomePageFaqs } from "@/lib/content/templates";
import {
  getToolBreadcrumbs,
  getToolCanonicalPath,
  getToolPageContent,
} from "@/lib/calculators/tool-content";
import { findTool, type ToolCategoryId } from "@/lib/navigation/site-architecture";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  buildBreadcrumbSchema,
  buildCalculatorSchema,
  buildJsonLdGraph,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/constants";

interface PageProps {
  params: Promise<{ category: string; tool: string }>;
}

const VALID_CATEGORIES: ToolCategoryId[] = [
  "income",
  "tax",
  "insurance",
  "finance",
  "travel",
];

export async function generateStaticParams() {
  const { TOOL_REGISTRY } = await import("@/lib/navigation/site-architecture");
  return TOOL_REGISTRY.filter((t) => t.status === "live").map((t) => ({
    category: t.category,
    tool: t.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category, tool: toolSlug } = await params;
  const tool = findTool(category, toolSlug);
  if (!tool || tool.status !== "live") return {};
  const content = getToolPageContent(tool);
  if (!content) return {};
  return buildPageMetadata({
    title: content.seoTitle,
    description: content.seoDescription,
    path: getToolCanonicalPath(tool),
  });
}

export default async function CalculatorToolPage({ params }: PageProps) {
  const { category, tool: toolSlug } = await params;

  if (!VALID_CATEGORIES.includes(category as ToolCategoryId)) {
    notFound();
  }

  const tool = findTool(category, toolSlug);
  if (!tool || tool.status !== "live") {
    notFound();
  }

  const content = getToolPageContent(tool);
  if (!content) {
    notFound();
  }

  const path = getToolCanonicalPath(tool);
  const breadcrumbs = getToolBreadcrumbs(tool);
  const faqs = content.kind === "paycheck" ? getHomePageFaqs() : undefined;

  const jsonLd = buildJsonLdGraph([
    buildBreadcrumbSchema(breadcrumbs),
    buildWebPageSchema({
      name: content.h1,
      description: content.seoDescription,
      url: siteConfig.url + path,
    }),
    buildCalculatorSchema({
      name: content.h1,
      description: content.seoDescription,
      url: siteConfig.url + path,
    }),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {content.h1}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">{content.intro}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <ToolRenderer kind={content.kind} />
        {content.showTaxYearNotice && (
          <TaxYearNotice context="paycheck calculator estimates" />
        )}

        <div className="my-10">
          <AdSlot slotId={content.adSlotId} format="in-content" />
        </div>

        {content.guideType && <SpecialCalculatorGuide type={content.guideType} />}
        {content.kind === "overtime" && <SourceSection />}
        {content.showMethodology && (
          <>
            <MethodologySection />
            <SourceSection />
          </>
        )}
        {faqs && <FaqSection faqs={faqs} />}
        <InternalLinks variant="calculators" />
        {content.kind === "paycheck" && (
          <>
            <InternalLinks variant="states" />
            <InternalLinks variant="salaries" />
          </>
        )}
      </div>
    </>
  );
}
