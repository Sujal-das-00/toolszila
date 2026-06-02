import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  buildJsonLdGraph,
  buildCalculatorSchema,
  buildWebPageSchema,
} from "@/lib/seo/schema";
import { siteConfig } from "@/lib/constants";
import { getHomePageFaqs } from "@/lib/content/templates";
import { JsonLd } from "@/components/seo/JsonLd";
import { PaycheckCalculator } from "@/components/calculator/PaycheckCalculator";
import { FaqSection } from "@/components/content/FaqSection";
import { InternalLinks } from "@/components/content/InternalLinks";
import { AdSlot } from "@/components/ads/AdSlot";
import { Card } from "@/components/ui/Card";
import { MethodologySection, SourceSection, TaxYearNotice } from "@/components/content/SeoTrust";
import { TOOL_CATEGORIES, getPopularTools, toolPath } from "@/lib/navigation/site-architecture";

export const metadata = buildPageMetadata({
  title: "US Paycheck Calculator - 2025 Take-Home Pay",
  description:
    "Free US paycheck calculator for all 50 states using 2025 tax-year data. Estimate federal tax, state tax, Social Security, Medicare, and net pay.",
  path: "/",
});

export default function HomePage() {
  const faqs = getHomePageFaqs();
  const popular = getPopularTools();

  const jsonLd = buildJsonLdGraph([
    buildWebPageSchema({
      name: "US Paycheck Calculator",
      description:
        "Free US paycheck calculator for all 50 states using 2025 tax-year data.",
      url: siteConfig.url,
    }),
    buildCalculatorSchema({
      name: "US Paycheck Calculator",
      description: siteConfig.description,
      url: siteConfig.url,
    }),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="text-sm font-medium text-emerald-700">
            Featured on {siteConfig.name}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            US Paycheck Calculator
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Calculate your take-home pay after federal income tax, state tax,
            Social Security, and Medicare using 2025 tax-year data across all
            50 states.
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
              title: "2025 Tax Rates",
              desc: "Federal brackets, FICA wage base, and state tax data updated annually.",
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

        <section className="mt-14">
          <h2 className="text-xl font-bold text-slate-900">More calculators</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {popular
              .filter((t) => t.slug !== "paycheck-calculator")
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
        <InternalLinks variant="calculators" />
      </div>
    </>
  );
}
