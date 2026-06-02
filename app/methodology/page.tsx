import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildJsonLdGraph, buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import {
  AccuracyProcessSection,
  MethodologySection,
  SourceSection,
  TaxYearNotice,
} from "@/components/content/SeoTrust";

export const metadata = buildPageMetadata({
  title: "Paycheck Calculator Methodology",
  description:
    `How ${siteConfig.name} estimates federal tax, state tax, Social Security, Medicare, and take-home pay using versioned tax data.`,
  path: "/methodology",
});

export default function MethodologyPage() {
  const path = "/methodology";
  const description = `How ${siteConfig.name} estimates federal tax, state tax, Social Security, Medicare, and take-home pay using versioned tax data.`;
  const jsonLd = buildJsonLdGraph([
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Methodology", path },
    ]),
    buildWebPageSchema({
      name: "Paycheck Calculator Methodology",
      description,
      url: siteConfig.url + path,
    }),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Methodology", path },
            ]}
          />
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Paycheck Calculator Methodology
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">{description}</p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <TaxYearNotice context="methodology notes" />
        <MethodologySection />
        <AccuracyProcessSection />
        <SourceSection includeLabor />
      </div>
    </>
  );
}
