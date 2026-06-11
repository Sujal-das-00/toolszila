import { FaqSection } from "@/components/content/FaqSection";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getHomePageFaqs } from "@/lib/content/templates";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildFaqSchema, buildJsonLdGraph, buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/constants";

export const metadata = buildPageMetadata({
  title: "FAQ",
  description: "Frequently asked questions about ToolsZila calculators, assumptions, methodology, and estimate limits.",
  path: "/faq",
});

export default function FaqPage() {
  const faqs = getHomePageFaqs();
  const path = "/faq";
  const jsonLd = buildJsonLdGraph([
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "FAQ", path },
    ]),
    buildWebPageSchema({
      name: "Frequently Asked Questions",
      description: "Frequently asked questions about ToolsZila calculators, assumptions, methodology, and estimate limits.",
      url: `${siteConfig.url}${path}`,
    }),
    buildFaqSchema(faqs),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "FAQ", path }]} />
          <h1 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h1>
          <p className="mt-4 max-w-3xl text-slate-600">
            Answers about calculator assumptions, review dates, tax-estimate limits, and where to verify an estimate before using it for a real decision.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm leading-7 text-slate-600">
            This page covers common questions about what ToolsZila calculators include, what they leave out,
            how often tax data is reviewed, and when to move from a planning estimate to an official or adviser-reviewed answer.
          </p>
        </div>
        <FaqSection faqs={faqs} />
      </div>
    </>
  );
}
