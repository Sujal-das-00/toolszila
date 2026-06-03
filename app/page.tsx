import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import { PaycheckCalculator } from "@/components/calculator/PaycheckCalculator";
import { FaqSection } from "@/components/content/FaqSection";
import { InternalLinks } from "@/components/content/InternalLinks";
import { MethodologySection, SourceSection, TaxYearNotice } from "@/components/content/SeoTrust";
import { JsonLd } from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/Card";
import { getHomePageFaqs } from "@/lib/content/templates";
import { siteConfig } from "@/lib/constants";
import { TOOL_CATEGORIES, getPopularTools, toolPath } from "@/lib/navigation/site-architecture";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  buildCalculatorSchema,
  buildFaqSchema,
  buildJsonLdGraph,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { taxYears } from "@/lib/tax";

export const metadata = buildPageMetadata({
  title: `US Paycheck Calculator - ${taxYears.federal} Take-Home Pay`,
  description:
    `Free US paycheck, salary, and tax calculators using ${taxYears.federal} federal and FICA data plus state income-tax data. Estimate paychecks, income tax, federal tax, self-employment tax, and net pay for all 50 states.`,
  path: "/",
  keywords: [
    "US Paycheck Calculator",
    "California Paycheck Calculator",
    "Texas Paycheck Calculator",
    "Florida Paycheck Calculator",
    "Salary Calculator",
    "Tax Calculator",
    "Income Tax Calculator",
    "Federal Tax Calculator",
    "Self Employment Tax Calculator",
    "Social Security Tax Calculator",
  ],
});

export default function HomePage() {
  const faqs = getHomePageFaqs();
  const popular = getPopularTools();

  const jsonLd = buildJsonLdGraph([
    buildWebPageSchema({
      name: "US Paycheck Calculator",
      description:
        `Free US paycheck calculator using ${taxYears.federal} federal and FICA data plus state income-tax data.`,
      url: siteConfig.url,
      keywords: [
        "US Paycheck Calculator",
        "Salary Calculator",
        "Tax Calculator",
        "California Paycheck Calculator",
        "Texas Paycheck Calculator",
        "Florida Paycheck Calculator",
      ],
    }),
    buildCalculatorSchema({
      name: "US Paycheck Calculator",
      description: siteConfig.description,
      url: siteConfig.url,
      applicationSubCategory: "Payroll Calculator",
      keywords: [
        "US Paycheck Calculator",
        "Salary Calculator",
        "Tax Calculator",
        "California Paycheck Calculator",
        "Texas Paycheck Calculator",
        "Florida Paycheck Calculator",
      ],
    }),
    buildFaqSchema(faqs),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="text-sm font-medium text-emerald-700">Featured on {siteConfig.name}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            US Paycheck Calculator
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Calculate your take-home pay after federal income tax, state tax,
            Social Security, and Medicare using {taxYears.federal} federal and FICA data plus
            state income-tax data across all 50 states.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-500">
            Built as a payroll, salary, and tax hub for paycheck calculations, California paycheck
            estimates, Texas paycheck estimates, Florida paycheck estimates, income tax planning,
            federal tax estimates, self-employment tax, and Social Security tax.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            More tools:{" "}
            <Link href="/calculators" className="font-medium text-emerald-700 hover:underline">
              browse all calculators
            </Link>
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <PaycheckCalculator />
        <TaxYearNotice context="paycheck calculator estimates" />

        <div className="my-10">
          <AdSlot slotId="home-in-content-1" format="in-content" />
        </div>

        <section className="grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "All 50 States",
              desc: "State-specific tax rates for every US state, including no-income-tax states.",
            },
            {
              title: `${taxYears.federal} Federal Tax Data`,
              desc: "Federal brackets and the FICA wage base are current for the active tax year; state data is versioned separately.",
            },
            {
              title: "Instant Results",
              desc: "See net annual, monthly, and per-paycheck take-home in real time.",
            },
          ].map((item) => (
            <Card key={item.title}>
              <h2 className="font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            </Card>
          ))}
        </section>

        <section className="mt-14" aria-labelledby="payroll-cluster-heading">
          <div>
            <h2 id="payroll-cluster-heading" className="text-xl font-bold text-slate-900">
              Payroll & Salary Calculators
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
              Start with the calculator that matches your payroll question. Use the US paycheck
              calculator for take-home pay, state pages for location-specific withholding, and
              supporting tools for salary conversion, overtime, or bonus scenarios.
            </p>
          </div>
          <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "California Paycheck Calculator",
                href: "/california-paycheck-calculator",
                desc: "Estimate California take-home pay with state income tax built in.",
              },
              {
                title: "Texas Paycheck Calculator",
                href: "/texas-paycheck-calculator",
                desc: "Model net pay in Texas, where wages are not subject to state income tax.",
              },
              {
                title: "Florida Paycheck Calculator",
                href: "/florida-paycheck-calculator",
                desc: "Compare Florida take-home pay with no state wage tax on salaries.",
              },
              {
                title: "Salary Calculator",
                href: "/calculators/income/salary-calculator",
                desc: "Turn one annual salary into annual, monthly, and per-paycheck estimates.",
              },
              {
                title: "Hourly to Salary Calculator",
                href: "/calculators/income/hourly-to-salary-calculator",
                desc: "Convert hourly pay into annual gross salary before taxes.",
              },
              {
                title: "Overtime Calculator",
                href: "/calculators/income/overtime-calculator",
                desc: "Estimate weekly gross pay with regular and overtime hours.",
              },
              {
                title: "Bonus Tax Calculator",
                href: "/calculators/income/bonus-tax-calculator",
                desc: "Estimate withholding on bonuses and supplemental wages.",
              },
            ].map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
                >
                  <span className="font-semibold text-slate-900">{item.title}</span>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="tax-cluster-heading">
          <div>
            <h2 id="tax-cluster-heading" className="text-xl font-bold text-slate-900">
              Tax Calculators
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
              Use the tax cluster when you want annual tax planning instead of paycheck-only
              estimates. The pages below cover total tax, income tax, federal tax,
              self-employment tax, and Social Security tax.
            </p>
          </div>
          <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {[
              {
                title: "Tax Calculator",
                href: "/calculators/tax/tax-calculator",
                desc: "Estimate total annual tax including payroll taxes.",
              },
              {
                title: "Income Tax Calculator",
                href: "/calculators/tax/income-tax-calculator",
                desc: "Estimate federal and state income tax without FICA.",
              },
              {
                title: "Federal Tax Calculator",
                href: "/calculators/tax/federal-tax-calculator",
                desc: "Estimate annual federal income tax only.",
              },
              {
                title: "Self Employment Tax Calculator",
                href: "/calculators/tax/self-employment-tax-calculator",
                desc: "Estimate Schedule SE Social Security and Medicare tax.",
              },
              {
                title: "Social Security Tax Calculator",
                href: "/calculators/tax/social-security-tax-calculator",
                desc: "Estimate Social Security tax and the wage-base effect.",
              },
            ].map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
                >
                  <span className="font-semibold text-slate-900">{item.title}</span>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="payroll-guide-heading">
          <h2 id="payroll-guide-heading" className="text-xl font-bold text-slate-900">
            How to Choose the Right Calculator
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card>
              <h3 className="font-semibold text-slate-900">For paycheck withholding</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Use the US paycheck calculator when you want annual, monthly, and per-paycheck net
                pay after federal tax, state tax, Social Security, and Medicare.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold text-slate-900">For state-by-state comparison</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Open a California, Texas, or Florida paycheck calculator page to review how state
                tax policy changes salary take-home pay and withholding assumptions.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold text-slate-900">For tax planning</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Use the tax calculator, income tax calculator, federal tax calculator,
                self-employment tax calculator, or Social Security tax calculator when the question
                is tax-specific rather than paycheck-specific.
              </p>
            </Card>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-bold text-slate-900">More calculators</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {popular
              .filter((tool) => tool.slug !== "paycheck-calculator")
              .map((tool) => (
                <li key={tool.id}>
                  <Link
                    href={toolPath(tool)}
                    className="block rounded-lg border border-slate-200 bg-white p-4 hover:border-emerald-300"
                  >
                    <span className="font-medium text-slate-900">{tool.title}</span>
                  </Link>
                </li>
              ))}
          </ul>
          <ul className="mt-4 flex flex-wrap gap-2 text-sm">
            {TOOL_CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={cat.path}
                  className="rounded-full border border-slate-200 px-3 py-1 text-slate-600 hover:border-emerald-300 hover:text-emerald-700"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <MethodologySection />
        <SourceSection />
        <FaqSection faqs={faqs} />
        <InternalLinks variant="states" />
        <InternalLinks variant="salaries" />
        <InternalLinks variant="tax" />
      </div>
    </>
  );
}
