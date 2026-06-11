import { Card } from "@/components/ui/Card";
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

        <section className="mt-12" aria-labelledby="why-methodology-matters-heading">
          <div className="max-w-4xl">
            <h2 id="why-methodology-matters-heading" className="text-2xl font-bold tracking-tight text-slate-900">
              Why methodology matters on a calculator site
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              A calculator result is only as useful as the assumptions behind it. This page explains how ToolsZila
              builds gross-to-net estimates, which tax layers are included, what is intentionally excluded, and how
              visitors should decide whether an estimate is suitable for rough planning or needs payroll-level confirmation.
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card>
              <h3 className="font-semibold text-slate-900">For budgeting</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Use the calculators to compare annual, monthly, and per-paycheck cash flow when evaluating a job offer,
                relocation, or a salary increase.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold text-slate-900">For tax planning</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Use the tax components to understand how much of the change comes from federal brackets, state tax,
                Social Security, or Medicare rather than only looking at the final net pay number.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold text-slate-900">For final decisions</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Treat the estimate as a planning aid, then verify exact withholding, credits, local taxes, and benefit
                deductions with payroll records, official forms, or a qualified adviser.
              </p>
            </Card>
          </div>
        </section>

        <MethodologySection />

        <section className="mt-12" aria-labelledby="included-excluded-heading">
          <h2 id="included-excluded-heading" className="text-2xl font-bold tracking-tight text-slate-900">
            What the calculators usually include and exclude
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card>
              <h3 className="font-semibold text-slate-900">Usually included</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Published federal tax brackets, standard deductions where applicable, FICA values, state income-tax rules
                included in the data files, and the pay-frequency math needed to turn annual salary into paycheck-level estimates.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold text-slate-900">Usually excluded</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Local wage taxes, pre-tax benefit elections, itemized deductions, custom W-4 withholding, equity compensation,
                union rules, garnishments, benefit-in-kind treatment, and employer-specific payroll practices.
              </p>
            </Card>
          </div>
        </section>

        <AccuracyProcessSection />

        <section className="mt-12" aria-labelledby="editorial-process-heading">
          <h2 id="editorial-process-heading" className="text-2xl font-bold tracking-tight text-slate-900">
            Editorial and update process
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card>
              <h3 className="font-semibold text-slate-900">Source first</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Tax-year updates start from primary government or agency source material before the calculator copy and FAQs are refreshed.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold text-slate-900">Template plus review</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Reusable templates keep the site consistent, but each major tool and country hub still needs review notes,
                scope checks, and visible limitations so repetitive pages do not become thin pages.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold text-slate-900">Corrections are welcomed</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Users can challenge outdated rates, missing edge cases, or unclear wording through the contact page, and those issues are reviewed before publication.
              </p>
            </Card>
          </div>
        </section>

        <SourceSection includeLabor />
      </div>
    </>
  );
}
