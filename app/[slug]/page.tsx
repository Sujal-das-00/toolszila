import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllPseoSlugs,
  parsePseoSlug,
  getAdjacentSalaries,
  salaryPageSlug,
} from "@/lib/pseo/routes";
import { buildPageMetadata, formatCurrency } from "@/lib/seo/metadata";
import {
  buildJsonLdGraph,
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildCalculatorSchema,
  buildArticleSchema,
  buildFaqSchema,
} from "@/lib/seo/schema";
import {
  getStatePageFaqs,
  getSalaryPageFaqs,
  getStatePageContent,
} from "@/lib/content/templates";
import { calculatePaycheck, taxYears } from "@/lib/tax";
import { DEFAULT_SALARY_PAGE_INPUT, siteConfig } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PaycheckCalculator } from "@/components/calculator/PaycheckCalculator";
import { PaycheckResults } from "@/components/calculator/PaycheckResults";
import { IrelandTaxCalculator } from "@/components/calculator/IrelandTaxCalculator";
import { IrelandTaxResults } from "@/components/calculator/IrelandTaxResults";
import { NzTaxCalculator } from "@/components/calculator/NzTaxCalculator";
import { NzTaxResults } from "@/components/calculator/NzTaxResults";
import { FaqSection } from "@/components/content/FaqSection";
import { InternalLinks, RelatedLinks } from "@/components/content/InternalLinks";
import { AdSlot } from "@/components/ads/AdSlot";
import { Card } from "@/components/ui/Card";
import {
  MethodologySection,
  SalarySeoSection,
  SourceSection,
  StateSeoSection,
  TaxYearNotice,
} from "@/components/content/SeoTrust";
import {
  getIrelandSalaryFaqs,
  IrelandPrevNext,
  IrelandReviewNote,
  IrelandSalaryAssumptions,
  IrelandSalaryClusterLinks,
  IrelandSources,
} from "@/components/content/IrelandSalarySeo";
import {
  getNzSalaryFaqs,
  NzPrevNext,
  NzReviewNote,
  NzSalaryAssumptions,
  NzSalaryClusterLinks,
  NzSources,
} from "@/components/content/NzSalarySeo";
import { getTaxData } from "@/lib/tax";
import {
  calculateIrelandTax,
  formatEuro,
  IRELAND_TAX_YEAR,
} from "@/lib/tax/ireland";
import {
  calculateNzTax,
  formatNzd,
  NZ_TAX_YEAR,
} from "@/lib/tax/new-zealand";

/** Pre-render all 50 state pages + 26 salary pages at build time. */
export function generateStaticParams() {
  return getAllPseoSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = parsePseoSlug(slug);
  if (!page) return {};

  if (page.type === "state") {
    const { state } = page;
    return buildPageMetadata({
      title: state.name + " Paycheck Calculator - " + taxYears.federal + " Net Pay",
      description:
        "Free " + state.name + " paycheck calculator using " + taxYears.federal + " federal and FICA data plus state income-tax data. Estimate take-home pay after federal tax" +
        (state.hasIncomeTax ? ", state income tax" : "") +
        ", Social Security, and Medicare. " + state.taxSummary,
      path: `/${slug}`,
      keywords: [
        `${state.name} Paycheck Calculator`,
        `${state.name} Salary Calculator`,
        "US Paycheck Calculator",
      ],
      ogImagePath: `/${slug}/opengraph-image`,
    });
  }

  if (page.type === "ireland-salary") {
    const amount = page.amount;
    const gross = formatEuro(amount);
    const metadata = buildPageMetadata({
      title: `${gross} After Tax in Ireland — ${IRELAND_TAX_YEAR} Take-Home Pay | ToolsZila`,
      description: `How much is ${gross} after tax in Ireland? See estimated income tax, USC, PRSI and net take-home pay per month for ${IRELAND_TAX_YEAR}.`,
      path: `/${slug}`,
      keywords: [
        `${gross} after tax ireland`,
        "salary after tax ireland",
        "take home pay ireland",
        "paye calculator ireland",
      ],
      ogImagePath: `/${slug}/opengraph-image`,
      ogType: "article",
    });

    return {
      ...metadata,
      openGraph: metadata.openGraph
        ? {
            ...metadata.openGraph,
            locale: "en_IE",
          }
        : metadata.openGraph,
    };
  }

  if (page.type === "nz-salary") {
    const amount = page.amount;
    const gross = formatNzd(amount);
    const metadata = buildPageMetadata({
      title: `${gross} After Tax in New Zealand — ${NZ_TAX_YEAR} Take-Home Pay | ToolsZila`,
      description: `How much is ${gross} after tax in New Zealand? See estimated PAYE, ACC levy, KiwiSaver and net take-home pay for ${NZ_TAX_YEAR}.`,
      path: `/${slug}`,
      keywords: [
        `${gross} after tax`,
        "salary after tax nz",
        "take home pay new zealand",
        "paye calculator nz",
      ],
      ogImagePath: `/${slug}/opengraph-image`,
      ogType: "article",
    });

    return {
      ...metadata,
      openGraph: metadata.openGraph
        ? {
            ...metadata.openGraph,
            locale: "en_NZ",
          }
        : metadata.openGraph,
    };
  }

  const amount = page.amount;
  return buildPageMetadata({
    title: formatCurrency(amount) + " After Tax in California - " + taxYears.federal + " Estimate",
    description:
      "How much is " + formatCurrency(amount) + " after taxes in California? See estimated federal, state, FICA taxes, and net take-home pay per paycheck.",
    path: `/${slug}`,
    keywords: [
      `${formatCurrency(amount)} after tax`,
      "Salary Calculator",
      "California Paycheck Calculator",
    ],
    ogImagePath: `/${slug}/opengraph-image`,
    ogType: "article",
  });
}

export default async function PseoPage({ params }: PageProps) {
  const { slug } = await params;
  const page = parsePseoSlug(slug);
  if (!page) notFound();

  if (page.type === "state") {
    return <StatePaycheckPage slug={slug} state={page.state} />;
  }

  if (page.type === "ireland-salary") {
    return <IrelandAfterTaxPage slug={slug} amount={page.amount} />;
  }

  if (page.type === "nz-salary") {
    return <NzAfterTaxPage slug={slug} amount={page.amount} />;
  }

  return <SalaryAfterTaxPage slug={slug} amount={page.amount} />;
}

function StatePaycheckPage({
  slug,
  state,
}: {
  slug: string;
  state: ReturnType<typeof getTaxData>["states"][number];
}) {
  const content = getStatePageContent(state);
  const faqs = getStatePageFaqs(state);
  const path = `/${slug}`;
  const keywords = [
    `${state.name} Paycheck Calculator`,
    `${state.name} Salary Calculator`,
    "US Paycheck Calculator",
  ];

  const jsonLd = buildJsonLdGraph([
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: `${state.name} Paycheck Calculator`, path },
    ]),
    buildWebPageSchema({
      name: state.name + " Paycheck Calculator",
      description: content.intro,
      url: siteConfig.url + path,
      keywords,
    }),
    buildCalculatorSchema({
      name: `${state.name} Paycheck Calculator`,
      description: content.intro,
      url: `${siteConfig.url}${path}`,
      applicationSubCategory: "State Paycheck Calculator",
      featureList: [
        `${state.name} state income tax estimate`,
        "Federal income tax estimate",
        "Social Security and Medicare estimate",
        "Per-paycheck take-home pay estimate",
      ],
      keywords,
    }),
    buildArticleSchema({
      title: `${state.name} Paycheck Calculator`,
      description: content.howTaxesWork,
      url: `${siteConfig.url}${path}`,
    }),
    buildFaqSchema(faqs),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: `${state.name} Paycheck Calculator`, path },
            ]}
          />
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {state.name} Paycheck Calculator
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">{content.intro}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <PaycheckCalculator defaultState={state.code} />
        <TaxYearNotice context={state.name + " paycheck estimates"} />

        <div className="my-10">
          <AdSlot slotId={`state-${state.slug}-1`} format="in-content" />
        </div>

        <article className="prose prose-slate mt-12 max-w-none">
          <section className="space-y-8">
            <Card>
              <h2 className="text-xl font-bold text-slate-900">
                How Paycheck Taxes Work in {state.name}
              </h2>
              <p className="mt-3 leading-relaxed text-slate-600">{content.howTaxesWork}</p>
            </Card>

            <Card>
              <h2 className="text-xl font-bold text-slate-900">
                {state.name} State Tax Information
              </h2>
              <p className="mt-3 leading-relaxed text-slate-600">{state.taxSummary}</p>
              <p className="mt-2 leading-relaxed text-slate-600">{state.taxExplanation}</p>
              <p className="mt-2 leading-relaxed text-slate-600">{content.statePlanningNote}</p>
            </Card>

            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <h3 className="font-semibold text-slate-900">Federal Income Tax</h3>
                <p className="mt-2 text-sm text-slate-600">{content.federalExplanation}</p>
              </Card>
              <Card>
                <h3 className="font-semibold text-slate-900">Social Security</h3>
                <p className="mt-2 text-sm text-slate-600">{content.socialSecurityExplanation}</p>
              </Card>
              <Card>
                <h3 className="font-semibold text-slate-900">Medicare</h3>
                <p className="mt-2 text-sm text-slate-600">{content.medicareExplanation}</p>
              </Card>
            </div>
          </section>
        </article>

        <StateSeoSection state={state} />
        <MethodologySection />
        <SourceSection />
        <FaqSection faqs={faqs} title={`${state.name} Paycheck FAQ`} />
        <InternalLinks variant="states" currentSlug={slug} />
        <RelatedLinks currentSlug={slug} />
      </div>
    </>
  );
}

function SalaryAfterTaxPage({ slug, amount }: { slug: string; amount: number }) {
  const breakdown = calculatePaycheck({
    annualSalary: amount,
    ...DEFAULT_SALARY_PAGE_INPUT,
  });
  const faqs = getSalaryPageFaqs(amount, breakdown);
  const path = `/${slug}`;
  const { lower, higher } = getAdjacentSalaries(amount);
  const formatted = formatCurrency(amount);
  const keywords = [
    `${formatted} after tax`,
    "Salary Calculator",
    "California Paycheck Calculator",
  ];

  const jsonLd = buildJsonLdGraph([
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: `${formatted} Salary After Tax`, path },
    ]),
    buildWebPageSchema({
      name: formatted + " Salary After Tax",
      description: "Estimated take-home pay on a " + formatted + " salary after federal, state, and FICA taxes.",
      url: siteConfig.url + path,
      keywords,
    }),
    buildCalculatorSchema({
      name: `${formatted} Salary Calculator`,
      description: `Estimated take-home pay on a ${formatted} salary after federal, state, and FICA taxes.`,
      url: `${siteConfig.url}${path}`,
      applicationSubCategory: "Salary Calculator",
      featureList: [
        "Annual take-home pay estimate",
        "Monthly take-home pay estimate",
        "Biweekly paycheck estimate",
        "State tax comparison table",
      ],
      keywords,
    }),
    buildArticleSchema({
      title: `${formatted} Salary After Tax`,
      description: `Estimated take-home pay on a ${formatted} salary after federal, state, and FICA taxes.`,
      url: `${siteConfig.url}${path}`,
    }),
    buildFaqSchema(faqs),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: `${formatted} After Tax`, path },
            ]}
          />
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {formatted} Salary After Tax
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            How much is {formatted} after taxes? Based on a single filer in California
            with biweekly pay, estimated annual take-home is{" "}
            <strong>{formatCurrency(breakdown.netAnnual)}</strong> (
            {formatCurrency(breakdown.netPerPaycheck)} per paycheck).
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Card>
          <PaycheckResults
            breakdown={breakdown}
            payFrequency={DEFAULT_SALARY_PAGE_INPUT.payFrequency}
          />
        </Card>

        <div className="my-10">
          <AdSlot slotId={`salary-${amount}-1`} format="in-content" />
        </div>

        <PaycheckCalculator defaultSalary={amount} />

        <section className="mt-12" aria-labelledby="salary-example-context-heading">
          <div className="max-w-4xl">
            <h2 id="salary-example-context-heading" className="text-2xl font-bold tracking-tight text-slate-900">
              How to interpret this salary example
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              This page gives you a benchmark estimate for one common scenario: a single filer in California paid biweekly. It is useful for quick planning, but the real decision should come from adjusting the state, pay frequency, and deductions in the calculator below.
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card>
              <h3 className="font-semibold text-slate-900">Best use case</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Compare rough take-home pay across salary levels before you do a more exact calculation for your personal setup.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold text-slate-900">What changes the result most</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                State choice, pre-tax deductions, filing status, and pay frequency usually have the biggest impact on net pay.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold text-slate-900">When to go deeper</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Use the full calculator when you are evaluating relocation, negotiating compensation, or planning around retirement and health deductions.
              </p>
            </Card>
          </div>
        </section>

        <SalarySeoSection amount={amount} breakdown={breakdown} />
        <TaxYearNotice context="salary after-tax estimates" />
        <SourceSection />

        <nav className="mt-8 flex flex-wrap gap-4 text-sm" aria-label="Related salaries">
          {lower && (
            <Link
              href={`/${salaryPageSlug(lower)}`}
              className="text-emerald-700 hover:underline"
            >
              ← {formatCurrency(lower)} after tax
            </Link>
          )}
          {higher && (
            <Link
              href={`/${salaryPageSlug(higher)}`}
              className="text-emerald-700 hover:underline"
            >
              {formatCurrency(higher)} after tax →
            </Link>
          )}
        </nav>

        <FaqSection faqs={faqs} title={`${formatted} Salary FAQ`} />
        <InternalLinks variant="salaries" currentSlug={slug} />
        <InternalLinks variant="states" />
        <InternalLinks variant="calculators" />
      </div>
    </>
  );
}


function IrelandAfterTaxPage({ slug, amount }: { slug: string; amount: number }) {
  const breakdown = calculateIrelandTax({
    annualSalary: amount,
    maritalStatus: "single",
    payFrequency: "monthly",
  });
  const faqs = getIrelandSalaryFaqs(amount, breakdown);
  const path = `/${slug}`;
  const gross = formatEuro(amount);
  const keywords = [
    `${gross} after tax ireland`,
    "salary after tax ireland",
    "take home pay ireland",
    "paye calculator ireland",
  ];

  const jsonLd = buildJsonLdGraph([
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: `${gross} After Tax Ireland`, path },
    ]),
    buildWebPageSchema({
      name: `${gross} After Tax in Ireland`,
      description: `Estimated ${IRELAND_TAX_YEAR} take-home pay on ${gross} in Ireland after PAYE income tax, USC and PRSI.`,
      url: siteConfig.url + path,
      keywords,
    }),
    buildCalculatorSchema({
      name: `${gross} After Tax Ireland Calculator`,
      description: `Estimated take-home pay on ${gross} in Ireland after PAYE income tax, USC and PRSI.`,
      url: `${siteConfig.url}${path}`,
      applicationSubCategory: "Ireland PAYE Calculator",
      featureList: [
        "Ireland PAYE income tax estimate",
        "USC estimate",
        "Class A PRSI estimate",
        "Annual, monthly and weekly net pay estimate",
      ],
      keywords,
    }),
    buildArticleSchema({
      title: `${gross} After Tax in Ireland`,
      description: `Estimated ${IRELAND_TAX_YEAR} take-home pay on ${gross} in Ireland after PAYE income tax, USC and PRSI.`,
      url: `${siteConfig.url}${path}`,
    }),
    buildFaqSchema(faqs),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: `${gross} After Tax Ireland`, path },
            ]}
          />
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {gross} After Tax in Ireland — {IRELAND_TAX_YEAR}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            How much is {gross} after tax in Ireland? Based on a single PAYE employee
            paid monthly in {IRELAND_TAX_YEAR}, estimated annual take-home is{" "}
            <strong>{formatEuro(breakdown.netAnnual)}</strong> ({formatEuro(breakdown.netMonthly, true)} per month).
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Card>
          <IrelandTaxResults breakdown={breakdown} />
        </Card>

        <div className="my-10">
          <AdSlot slotId={`ireland-salary-${amount}-1`} format="in-content" />
        </div>

        <IrelandTaxCalculator defaultSalary={amount} />
        <IrelandSalaryAssumptions amount={amount} breakdown={breakdown} />
        <IrelandReviewNote />
        <IrelandSources />
        <IrelandPrevNext amount={amount} />
        <FaqSection faqs={faqs} title={`${gross} After Tax Ireland FAQ`} />
        <IrelandSalaryClusterLinks currentAmount={amount} />
        <InternalLinks variant="calculators" />
      </div>
    </>
  );
}


function NzAfterTaxPage({ slug, amount }: { slug: string; amount: number }) {
  const breakdown = calculateNzTax({
    annualSalary: amount,
    maritalStatus: "single",
    dependents: "none",
    payFrequency: "fortnightly",
    kiwiSaverRate: 0,
    hasStudentLoan: false,
  });
  const faqs = getNzSalaryFaqs(amount, breakdown);
  const path = `/${slug}`;
  const gross = formatNzd(amount);
  const keywords = [
    `${gross} after tax`,
    "salary after tax nz",
    "take home pay new zealand",
    "paye calculator nz",
  ];

  const jsonLd = buildJsonLdGraph([
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: `${gross} After Tax`, path },
    ]),
    buildWebPageSchema({
      name: `${gross} After Tax in New Zealand`,
      description: `Estimated ${NZ_TAX_YEAR} take-home pay on ${gross} in New Zealand after PAYE income tax and ACC levy.`,
      url: siteConfig.url + path,
      keywords,
    }),
    buildCalculatorSchema({
      name: `${gross} After Tax NZ Calculator`,
      description: `Estimated take-home pay on ${gross} in New Zealand after PAYE income tax and ACC levy.`,
      url: `${siteConfig.url}${path}`,
      applicationSubCategory: "New Zealand PAYE Calculator",
      featureList: [
        "New Zealand PAYE income tax estimate",
        "ACC earners' levy estimate",
        "Optional KiwiSaver estimate",
        "Optional student loan estimate",
        "Annual, fortnightly and monthly net pay estimate",
      ],
      keywords,
    }),
    buildArticleSchema({
      title: `${gross} After Tax in New Zealand`,
      description: `Estimated ${NZ_TAX_YEAR} take-home pay on ${gross} in New Zealand after PAYE income tax and ACC levy.`,
      url: `${siteConfig.url}${path}`,
    }),
    buildFaqSchema(faqs),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: `${gross} After Tax`, path },
            ]}
          />
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {gross} After Tax in New Zealand — {NZ_TAX_YEAR}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            How much is {gross} after tax in New Zealand? Based on a single PAYE employee
            paid fortnightly in {NZ_TAX_YEAR}, estimated annual take-home is{" "}
            <strong>{formatNzd(breakdown.netAnnual)}</strong> ({formatNzd(breakdown.netFortnightly, true)} per fortnight).
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Card>
          <NzTaxResults breakdown={breakdown} />
        </Card>

        <div className="my-10">
          <AdSlot slotId={`nz-salary-${amount}-1`} format="in-content" />
        </div>

        <NzTaxCalculator defaultSalary={amount} />
        <NzSalaryAssumptions amount={amount} breakdown={breakdown} />
        <NzReviewNote />
        <NzSources />
        <NzPrevNext amount={amount} />
        <FaqSection faqs={faqs} title={`${gross} After Tax NZ FAQ`} />
        <NzSalaryClusterLinks currentAmount={amount} />
        <InternalLinks variant="calculators" />
      </div>
    </>
  );
}
