import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ads/AdSlot";
import { ToolRenderer } from "@/components/calculators/ToolRenderer";
import { FaqSection } from "@/components/content/FaqSection";
import { InternalLinks } from "@/components/content/InternalLinks";
import { SalaryCalculatorSection } from "@/components/content/SalaryCalculatorSection";
import { TaxGuideSection, type TaxGuideKind } from "@/components/content/TaxGuideSection";
import {
  MethodologySection,
  SourceSection,
  SpecialCalculatorGuide,
  TaxYearNotice,
} from "@/components/content/SeoTrust";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getHomePageFaqs,
  getSalaryCalculatorFaqs,
  getTaxToolFaqs,
} from "@/lib/content/templates";
import {
  getToolBreadcrumbs,
  getToolCanonicalPath,
  getToolPageContent,
  type ToolPageContent,
  type ToolPageKind,
} from "@/lib/calculators/tool-content";
import { findTool, type ToolCategoryId } from "@/lib/navigation/site-architecture";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  buildBreadcrumbSchema,
  buildCalculatorSchema,
  buildFaqSchema,
  buildJsonLdGraph,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/constants";

interface PageProps {
  params: Promise<{ category: string; tool: string }>;
}

const VALID_CATEGORIES: ToolCategoryId[] = ["income", "tax", "insurance", "finance", "travel"];
const TAX_TOOL_KINDS: TaxGuideKind[] = [
  "tax-calculator",
  "income-tax-calculator",
  "federal-tax-calculator",
  "self-employment-tax-calculator",
  "social-security-tax-calculator",
];

function isTaxTool(kind: ToolPageKind): kind is TaxGuideKind {
  return TAX_TOOL_KINDS.includes(kind as TaxGuideKind);
}

function getTaxNoticeContext(kind: ToolPageKind): string {
  if (kind === "salary-calculator") return "salary calculator estimates";
  if (isTaxTool(kind)) return "tax calculator estimates";
  return "paycheck calculator estimates";
}

function getFaqs(content: ToolPageContent) {
  if (content.kind === "paycheck") return getHomePageFaqs();
  if (content.kind === "salary-calculator") return getSalaryCalculatorFaqs();
  if (isTaxTool(content.kind)) return getTaxToolFaqs(content.kind);
  return undefined;
}

function getSchemaSubCategory(content: ToolPageContent): string {
  if (content.kind === "salary-calculator") return "Salary Calculator";
  if (content.kind === "tax-calculator") return "Tax Calculator";
  if (content.kind === "income-tax-calculator") return "Income Tax Calculator";
  if (content.kind === "federal-tax-calculator") return "Federal Tax Calculator";
  if (content.kind === "self-employment-tax-calculator") return "Self Employment Tax Calculator";
  if (content.kind === "social-security-tax-calculator") return "Social Security Tax Calculator";
  return "Payroll Calculator";
}

function getSchemaFeatures(content: ToolPageContent): string[] | undefined {
  switch (content.kind) {
    case "tax-calculator":
      return [
        "Federal income tax estimate",
        "State income tax estimate",
        "Social Security and Medicare estimate",
        "After-tax annual income estimate",
      ];
    case "income-tax-calculator":
      return [
        "Federal income tax estimate",
        "State income tax estimate",
        "Taxable income estimate",
        "After-income-tax income estimate",
      ];
    case "federal-tax-calculator":
      return [
        "Federal income tax estimate",
        "Federal taxable income estimate",
        "Marginal federal rate estimate",
        "After-federal-tax income estimate",
      ];
    case "self-employment-tax-calculator":
      return [
        "Schedule SE income estimate",
        "Social Security portion estimate",
        "Medicare portion estimate",
        "Deductible half of self-employment tax estimate",
      ];
    case "social-security-tax-calculator":
      return [
        "Employee Social Security tax estimate",
        "Employer match estimate",
        "Self-employed equivalent estimate",
        "Wage-base cap estimate",
      ];
    default:
      return undefined;
  }
}

export async function generateStaticParams() {
  const { TOOL_REGISTRY } = await import("@/lib/navigation/site-architecture");
  return TOOL_REGISTRY.filter((tool) => tool.status === "live").map((tool) => ({
    category: tool.category,
    tool: tool.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category, tool: toolSlug } = await params;
  const tool = findTool(category, toolSlug);
  if (!tool || tool.status !== "live") return {};
  const content = getToolPageContent(tool);
  if (!content) return {};
  const path = getToolCanonicalPath(tool);

  return buildPageMetadata({
    title: content.seoTitle,
    description: content.seoDescription,
    path,
    keywords: content.seoKeywords,
    ogImagePath: `${path}/opengraph-image`,
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
  const faqs = getFaqs(content);
  const schemaFeatures = getSchemaFeatures(content);

  const jsonLd = buildJsonLdGraph([
    buildBreadcrumbSchema(breadcrumbs),
    buildWebPageSchema({
      name: content.h1,
      description: content.seoDescription,
      url: siteConfig.url + path,
      keywords: content.seoKeywords,
    }),
    buildCalculatorSchema({
      name: content.h1,
      description: content.seoDescription,
      url: siteConfig.url + path,
      applicationSubCategory: getSchemaSubCategory(content),
      featureList: schemaFeatures,
      keywords: content.seoKeywords,
    }),
    ...(faqs ? [buildFaqSchema(faqs)] : []),
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
          <p className="mt-4 max-w-3xl text-lg text-slate-600">{content.intro}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <ToolRenderer kind={content.kind} />
        {content.showTaxYearNotice && <TaxYearNotice context={getTaxNoticeContext(content.kind)} />}

        <div className="my-10">
          <AdSlot slotId={content.adSlotId} format="in-content" />
        </div>

        {content.kind === "salary-calculator" && <SalaryCalculatorSection />}
        {isTaxTool(content.kind) && <TaxGuideSection kind={content.kind} />}
        {content.guideType && <SpecialCalculatorGuide type={content.guideType} />}
        {content.kind === "overtime" && <SourceSection includeLabor />}
        {content.showMethodology && (
          <>
            <MethodologySection />
            <SourceSection />
          </>
        )}
        {isTaxTool(content.kind) && !content.showMethodology && <SourceSection />}
        {faqs && <FaqSection faqs={faqs} title={`${content.h1} FAQ`} />}
        {isTaxTool(content.kind) ? <InternalLinks variant="tax" /> : <InternalLinks variant="calculators" />}
        {(content.kind === "paycheck" || content.kind === "salary-calculator") && (
          <>
            <InternalLinks variant="states" />
            <InternalLinks variant="salaries" />
          </>
        )}
      </div>
    </>
  );
}
