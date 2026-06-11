import type { Metadata } from "next";
import { IrelandTaxCalculator } from "@/components/calculator/IrelandTaxCalculator";
import { Card } from "@/components/ui/Card";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema, buildCalculatorSchema, buildJsonLdGraph, buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/constants";
import { formatEuro, IRELAND_SALARY_AMOUNTS, IRELAND_TAX_YEAR, irelandAfterTaxSlug } from "@/lib/tax/ireland";
import Link from "next/link";

const path = "/ireland-take-home-pay-calculator";

export const metadata: Metadata = {
  title: `Ireland Take-Home Pay Calculator — ${IRELAND_TAX_YEAR} PAYE, USC, PRSI | ToolsZila`,
  description: `Estimate Ireland take-home pay for ${IRELAND_TAX_YEAR}. Calculate PAYE income tax, USC, PRSI, net annual pay and monthly take-home pay.`,
  alternates: { canonical: `${siteConfig.url}${path}` },
  keywords: ["ireland take home pay calculator", "paye calculator ireland", "salary after tax ireland"],
  openGraph: {
    title: `Ireland Take-Home Pay Calculator — ${IRELAND_TAX_YEAR} PAYE, USC, PRSI | ToolsZila`,
    description: `Estimate Ireland take-home pay for ${IRELAND_TAX_YEAR}. Calculate PAYE income tax, USC, PRSI, net annual pay and monthly take-home pay.`,
    url: `${siteConfig.url}${path}`,
    siteName: siteConfig.name,
    locale: "en_IE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Ireland Take-Home Pay Calculator — ${IRELAND_TAX_YEAR} PAYE, USC, PRSI | ToolsZila`,
    description: `Estimate Ireland take-home pay for ${IRELAND_TAX_YEAR}. Calculate PAYE income tax, USC, PRSI, net annual pay and monthly take-home pay.`,
  },
  robots: { index: true, follow: true },
};

export default function IrelandTakeHomePayCalculatorPage() {
  const jsonLd = buildJsonLdGraph([
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Ireland Take-Home Pay Calculator", path },
    ]),
    buildWebPageSchema({
      name: "Ireland Take-Home Pay Calculator",
      description: `Estimate Ireland take-home pay for ${IRELAND_TAX_YEAR} after PAYE income tax, USC and PRSI.`,
      url: `${siteConfig.url}${path}`,
      keywords: ["ireland take home pay calculator", "paye calculator ireland", "salary after tax ireland"],
    }),
    buildCalculatorSchema({
      name: "Ireland Take-Home Pay Calculator",
      description: `Estimate Ireland take-home pay for ${IRELAND_TAX_YEAR} after PAYE income tax, USC and PRSI.`,
      url: `${siteConfig.url}${path}`,
      applicationSubCategory: "Ireland PAYE Calculator",
      featureList: ["PAYE income tax", "USC", "Class A PRSI", "Net monthly and weekly pay"],
      keywords: ["ireland take home pay calculator", "paye calculator ireland", "salary after tax ireland"],
    }),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Ireland Take-Home Pay Calculator", path }]} />
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Ireland Take-Home Pay Calculator — {IRELAND_TAX_YEAR}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Estimate Irish salary after tax using PAYE income tax, USC and Class A PRSI for a PAYE employee.
            The default scenario is single, paid monthly, with no pension contribution.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <IrelandTaxCalculator defaultSalary={50_000} />

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          <Card>
            <h2 className="font-semibold text-slate-900">What it includes</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              The calculator estimates PAYE income tax after standard personal and employee credits, USC on gross income,
              and Class A PRSI using the 2026 assumptions stated on the salary guide pages.
            </p>
          </Card>
          <Card>
            <h2 className="font-semibold text-slate-900">What it excludes</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Pension contributions, benefit-in-kind, medical card USC reductions, age relief, emergency tax and other reliefs
              are not included. Use this for planning, then confirm with Revenue.ie or payroll.
            </p>
          </Card>
          <Card>
            <h2 className="font-semibold text-slate-900">Ireland salary guides</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Use the linked guides below for precomputed examples with assumptions, source links, FAQs and salary-to-salary navigation.
            </p>
          </Card>
        </section>

        <section className="mt-12">
          <div className="max-w-4xl">
            <h2 className="text-xl font-bold text-slate-900">How to use this Ireland PAYE calculator</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              This page is strongest when you need a quick PAYE employee estimate for budgeting, comparing offers, or checking whether a gross salary increase materially changes monthly cash flow. It is less suitable for complex cases involving non-PAYE income, pension optimization, emergency tax, or employer-specific payroll adjustments.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">Salary After Tax Ireland Guides</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {IRELAND_SALARY_AMOUNTS.map((amount) => (
              <li key={amount}>
                <Link href={`/${irelandAfterTaxSlug(amount)}`} className="text-sm text-emerald-700 hover:underline">
                  {formatEuro(amount)} After Tax Ireland
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
