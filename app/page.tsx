import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import { GlobalTakeHomeCalculator } from "@/components/calculator/GlobalTakeHomeCalculator";
import { FaqSection } from "@/components/content/FaqSection";
import { InternalLinks } from "@/components/content/InternalLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { Card } from "@/components/ui/Card";
import { siteConfig } from "@/lib/constants";
import {
  COUNTRY_CALCULATORS,
  FUTURE_COUNTRY_CALCULATORS,
} from "@/lib/navigation/country-calculators";
import { TOOL_CATEGORIES, getPopularTools, toolPath } from "@/lib/navigation/site-architecture";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  buildCalculatorSchema,
  buildFaqSchema,
  buildJsonLdGraph,
  buildWebPageSchema,
} from "@/lib/seo/schema";

const homeFaqs = [
  {
    question: "What is ToolsZila?",
    answer:
      "ToolsZila is a growing collection of free online calculators and practical tools. The current calculator hub focuses on salary, tax and take-home pay tools, with a structure designed to support more countries and more tool categories over time.",
  },
  {
    question: "Which country calculator should I use?",
    answer:
      "Choose the country where your salary is taxed. Use the United States calculator for federal, state and FICA payroll estimates. Use the Ireland calculator for PAYE income tax, USC and PRSI estimates.",
  },
  {
    question: "Can the homepage calculator calculate every country directly?",
    answer:
      "The homepage calculator is a global starting point. It routes you to the right country-specific calculator because tax rules, payroll terms, pay frequencies and deductions vary by country.",
  },
  {
    question: "Are ToolsZila calculator pages search-engine friendly?",
    answer:
      "Yes. ToolsZila pages use clear titles, plain-language explanations, source notes, related guides, and structured page data so each calculator is easier to understand and compare.",
  },
  {
    question: "Are these calculators financial advice?",
    answer:
      "No. ToolsZila calculators are planning tools. Results are estimates and may not include every deduction, relief, credit, local rule or employer-specific payroll setting. Confirm important decisions with official sources or a qualified adviser.",
  },
];

export const metadata = buildPageMetadata({
  title: "ToolsZila — Free Calculators for Salary, Tax & Everyday Tools",
  description:
    "ToolsZila is a free calculator hub for take-home pay, salary after tax, tax planning and everyday tools. Choose a country calculator for the US or Ireland and explore more tools.",
  path: "/",
  keywords: [
    "ToolsZila",
    "free online calculators",
    "take home pay calculator",
    "salary after tax calculator",
    "US paycheck calculator",
    "Ireland take home pay calculator",
    "tax calculator",
  ],
});

export default function HomePage() {
  const popular = getPopularTools();

  const jsonLd = buildJsonLdGraph([
    buildWebPageSchema({
      name: "ToolsZila Free Calculator Hub",
      description:
        "Free online calculators for take-home pay, salary after tax, tax planning and everyday tools, with country-specific salary calculators for the United States and Ireland.",
      url: siteConfig.url,
      keywords: [
        "free online calculators",
        "take home pay calculator",
        "salary after tax calculator",
        "US paycheck calculator",
        "Ireland take home pay calculator",
      ],
    }),
    buildCalculatorSchema({
      name: "ToolsZila Global Take-Home Pay Calculator Hub",
      description:
        "A country-aware starting point for take-home pay calculators, salary after tax calculators and tax tools.",
      url: siteConfig.url,
      applicationSubCategory: "Calculator Hub",
      featureList: [
        "Country calculator navigation",
        "United States paycheck calculator links",
        "Ireland PAYE take-home pay calculator links",
        "Salary, tax and income calculator directory",
      ],
      keywords: [
        "take home pay calculator",
        "salary after tax calculator",
        "country salary calculator",
      ],
    }),
    buildFaqSchema(homeFaqs),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="text-sm font-medium text-emerald-700">ToolsZila calculator hub</p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Free calculators for salary, tax, take-home pay and everyday planning
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            ToolsZila helps you turn confusing numbers into practical answers. Start with a country-specific
            take-home pay calculator, compare salary after tax examples, or browse the growing library of
            income, tax, finance, insurance and travel tools. Each live page is built to explain the
            assumptions behind the estimate, the limits of the result, and the next step you may need.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="#country-calculators"
              className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
            >
              Choose a country calculator
            </Link>
            <Link
              href="/calculators"
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-emerald-300 hover:text-emerald-700"
            >
              Browse all calculators
            </Link>
            <Link
              href="/tools"
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-emerald-300 hover:text-emerald-700"
            >
              Explore tools directory
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <GlobalTakeHomeCalculator />

        <section id="country-calculators" className="mt-14" aria-labelledby="country-calculators-heading">
          <div className="max-w-3xl">
            <h2 id="country-calculators-heading" className="text-2xl font-bold tracking-tight text-slate-900">
              Choose your country calculator
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Tax systems are local. Instead of forcing every visitor into one generic tax model, ToolsZila
              routes each salary question to a country page with the right currency, terminology, assumptions,
              source links and calculator logic.
            </p>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {COUNTRY_CALCULATORS.map((country) => (
              <Card key={country.id}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-3xl" aria-hidden="true">{country.flag}</p>
                    <h3 className="mt-2 text-xl font-bold text-slate-900">{country.countryName}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{country.summary}</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    Live
                  </span>
                </div>
                <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                  {country.taxSystem}
                </p>
                <Link
                  href={country.primaryHref}
                  className="mt-4 inline-flex rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  {country.primaryLabel}
                </Link>
                <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
                  {country.popularLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-emerald-700 hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        <div className="my-10">
          <AdSlot slotId="home-in-content-1" format="in-content" />
        </div>

        <section className="mt-14" aria-labelledby="why-toolszila-heading">
          <h2 id="why-toolszila-heading" className="text-2xl font-bold tracking-tight text-slate-900">
            Why use ToolsZila?
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <Card>
              <h3 className="font-semibold text-slate-900">Country-specific calculations</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Each country calculator can use its own currency, tax-year assumptions, government source links,
                salary terminology and calculation engine instead of a one-size-fits-all formula.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold text-slate-900">Clear next steps after the result</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Visitors can start from the homepage, select a country, and move to focused pages for salary after tax,
                pay-period planning, state comparisons, or tax-specific calculations.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold text-slate-900">Transparent assumptions and review notes</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Review dates, scope notes, methodology summaries, and source sections help you judge whether a
                calculator is suitable for planning, comparison, or only a rough estimate.
              </p>
            </Card>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="tool-architecture-heading">
          <div className="max-w-3xl">
            <h2 id="tool-architecture-heading" className="text-2xl font-bold tracking-tight text-slate-900">
              Explore calculators by planning task
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Different money questions need different tools. Use income calculators for paycheck planning,
              tax calculators for annual liability estimates, and category pages to compare what each tool
              covers before you rely on the result.
            </p>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOOL_CATEGORIES.map((category) => (
              <li key={category.id}>
                <Link
                  href={category.path}
                  className="block h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
                >
                  <span className="text-lg font-semibold text-slate-900">{category.label}</span>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{category.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="popular-tools-heading">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="popular-tools-heading" className="text-2xl font-bold tracking-tight text-slate-900">
                Popular calculators and tools
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
                Start with these frequently used tools, or browse the full calculator directory for more categories.
              </p>
            </div>
            <Link href="/calculators" className="text-sm font-medium text-emerald-700 hover:underline">
              View all calculators →
            </Link>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((tool) => (
              <li key={tool.id}>
                <Link
                  href={toolPath(tool)}
                  className="block h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
                >
                  <span className="font-semibold text-slate-900">{tool.title}</span>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{tool.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="content-approach-heading">
          <div className="max-w-3xl">
            <h2 id="content-approach-heading" className="text-2xl font-bold tracking-tight text-slate-900">
              What makes a useful calculator page
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              A strong calculator page should not stop at one output number. It should explain the inputs,
              highlight the tax rules or payroll assumptions behind the estimate, show common limitations,
              and point you to the next page you likely need.
            </p>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <Card>
              <h3 className="font-semibold text-slate-900">Context around the number</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Salary and tax estimates are more useful when you can see annual, monthly, and per-pay-period
                views together with the tax components behind them.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold text-slate-900">Primary-source support</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Live tools include methodology notes and official-source references so visitors can verify
                tax bands, payroll rates, and review status.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold text-slate-900">Useful internal comparisons</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Related state pages, salary guides, and country hubs help you compare scenarios instead of
                starting over every time your assumptions change.
              </p>
            </Card>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="future-countries-heading">
          <h2 id="future-countries-heading" className="text-xl font-bold text-slate-900">
            Planned country expansion
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
            ToolsZila is expanding country coverage carefully so each new calculator can ship with local tax logic,
            supporting examples, methodology notes, and linked guides instead of a thin placeholder page.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {FUTURE_COUNTRY_CALCULATORS.map((country) => (
              <li key={country.id} className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
                <span className="font-medium text-slate-900">
                  {country.flag} {country.countryName}
                </span>
                <p className="mt-1 text-sm text-slate-600">{country.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        <FaqSection faqs={homeFaqs} title="ToolsZila FAQ" />
        <InternalLinks variant="tax" />
        <InternalLinks variant="states" />
        <InternalLinks variant="salaries" />

        <section className="mt-12 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-semibold text-amber-950">Important disclaimer</h2>
          <p className="mt-2 text-sm leading-relaxed text-amber-900">
            ToolsZila calculators provide planning estimates only. Tax, payroll, finance, insurance and travel results can vary
            by country, region, employer, date, source data and personal circumstances. Always confirm important decisions with
            official sources or qualified professionals.
          </p>
        </section>
      </div>
    </>
  );
}
