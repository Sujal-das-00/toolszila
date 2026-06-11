import type { Metadata } from "next";
import Link from "next/link";
import { NzTaxCalculator } from "@/components/calculator/NzTaxCalculator";
import { Card } from "@/components/ui/Card";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema, buildCalculatorSchema, buildJsonLdGraph, buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/constants";
import { formatNzd, NZ_SALARY_AMOUNTS, NZ_TAX_YEAR, nzAfterTaxSlug } from "@/lib/tax/new-zealand";

const path = "/nz-take-home-pay-calculator";

export const metadata: Metadata = {
  title: `NZ Take-Home Pay Calculator — ${NZ_TAX_YEAR} PAYE, ACC, KiwiSaver | ToolsZila`,
  description: `Estimate New Zealand take-home pay for ${NZ_TAX_YEAR}. Calculate PAYE income tax, ACC levy, optional KiwiSaver, optional student loan and net fortnightly pay.`,
  alternates: { canonical: `${siteConfig.url}${path}` },
  keywords: ["nz take home pay calculator", "paye calculator nz", "salary after tax nz", "new zealand tax calculator"],
  openGraph: {
    title: `NZ Take-Home Pay Calculator — ${NZ_TAX_YEAR} PAYE, ACC, KiwiSaver | ToolsZila`,
    description: `Estimate New Zealand take-home pay for ${NZ_TAX_YEAR}. Calculate PAYE income tax, ACC levy, optional KiwiSaver and net fortnightly pay.`,
    url: `${siteConfig.url}${path}`,
    siteName: siteConfig.name,
    locale: "en_NZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `NZ Take-Home Pay Calculator — ${NZ_TAX_YEAR} PAYE, ACC, KiwiSaver | ToolsZila`,
    description: `Estimate New Zealand take-home pay for ${NZ_TAX_YEAR}. Calculate PAYE income tax, ACC levy, optional KiwiSaver and net fortnightly pay.`,
  },
  robots: { index: true, follow: true },
};

export default function NzTakeHomePayCalculatorPage() {
  const jsonLd = buildJsonLdGraph([
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "NZ Take-Home Pay Calculator", path },
    ]),
    buildWebPageSchema({
      name: "NZ Take-Home Pay Calculator",
      description: `Estimate New Zealand take-home pay for ${NZ_TAX_YEAR} after PAYE income tax, ACC levy, optional KiwiSaver and optional student loan repayments.`,
      url: `${siteConfig.url}${path}`,
      keywords: ["nz take home pay calculator", "paye calculator nz", "salary after tax nz"],
    }),
    buildCalculatorSchema({
      name: "NZ Take-Home Pay Calculator",
      description: `Estimate New Zealand take-home pay for ${NZ_TAX_YEAR} after PAYE income tax, ACC levy, optional KiwiSaver and optional student loan repayments.`,
      url: `${siteConfig.url}${path}`,
      applicationSubCategory: "New Zealand PAYE Calculator",
      featureList: ["PAYE income tax", "ACC earners' levy", "Optional KiwiSaver", "Optional student loan", "Net fortnightly and monthly pay"],
      keywords: ["nz take home pay calculator", "paye calculator nz", "salary after tax nz"],
    }),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "NZ Take-Home Pay Calculator", path }]} />
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            NZ Take-Home Pay Calculator — {NZ_TAX_YEAR}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Estimate New Zealand salary after tax using PAYE income tax, ACC earners&apos; levy, optional KiwiSaver and optional student loan repayments.
            The default scenario is single, paid fortnightly, with no KiwiSaver and no student loan.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <NzTaxCalculator defaultSalary={60_000} />

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          <Card>
            <h2 className="font-semibold text-slate-900">What it includes</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              The calculator estimates PAYE income tax from the first dollar of income, ACC earners&apos; levy, optional KiwiSaver after tax, and optional student loan repayments above the annual threshold.
            </p>
          </Card>
          <Card>
            <h2 className="font-semibold text-slate-900">What it excludes</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Employer KiwiSaver match, detailed Working for Families Tax Credit abatement, secondary tax code issues, rental deductions and other personal adjustments are not included.
            </p>
          </Card>
          <Card>
            <h2 className="font-semibold text-slate-900">NZ salary guides</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Use the linked guides below for precomputed salary examples with assumptions, sources, FAQs and neighbouring salary links.
            </p>
          </Card>
        </section>

        <section className="mt-12">
          <div className="max-w-4xl">
            <h2 className="text-xl font-bold text-slate-900">How to use this New Zealand PAYE calculator</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              This page is best for comparing salary scenarios under standard PAYE assumptions, checking how ACC and optional KiwiSaver affect take-home pay, and planning fortnightly cash flow. It is not a substitute for detailed payroll treatment involving secondary tax codes, employer match rules, or complex family-credit situations.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">Salary After Tax NZ Guides</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {NZ_SALARY_AMOUNTS.map((amount) => (
              <li key={amount}>
                <Link href={`/${nzAfterTaxSlug(amount)}`} className="text-sm text-emerald-700 hover:underline">
                  {formatNzd(amount)} After Tax NZ
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-semibold text-amber-950">Important disclaimer</h2>
          <p className="mt-2 text-sm leading-relaxed text-amber-900">
            These New Zealand take-home pay estimates are planning estimates only. They are not tax, payroll,
            legal or financial advice. Confirm important salary, KiwiSaver, student loan or tax decisions with
            Inland Revenue, your payroll team or a qualified adviser.
          </p>
        </section>
      </div>
    </>
  );
}
