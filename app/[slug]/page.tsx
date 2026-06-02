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
import { FaqSection } from "@/components/content/FaqSection";
import { InternalLinks, RelatedLinks } from "@/components/content/InternalLinks";
import { AdSlot } from "@/components/ads/AdSlot";
import { Card } from "@/components/ui/Card";
import { MethodologySection, SalarySeoSection, SourceSection, StateSeoSection, TaxYearNotice } from "@/components/content/SeoTrust";
import { getTaxData } from "@/lib/tax";

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
    });
  }

  const amount = page.amount;
  return buildPageMetadata({
    title: formatCurrency(amount) + " After Tax in California - " + taxYears.federal + " Estimate",
    description:
      "How much is " + formatCurrency(amount) + " after taxes in California? See estimated federal, state, FICA taxes, and net take-home pay per paycheck.",
    path: `/${slug}`,
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

  const jsonLd = buildJsonLdGraph([
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: `${state.name} Paycheck Calculator`, path },
    ]),
    buildWebPageSchema({
      name: state.name + " Paycheck Calculator",
      description: content.intro,
      url: siteConfig.url + path,
    }),
    buildCalculatorSchema({
      name: `${state.name} Paycheck Calculator`,
      description: content.intro,
      url: `${siteConfig.url}${path}`,
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
              <p className="mt-3 text-slate-600 leading-relaxed">{content.howTaxesWork}</p>
            </Card>

            <Card>
              <h2 className="text-xl font-bold text-slate-900">
                {state.name} State Tax Information
              </h2>
              <p className="mt-3 text-slate-600 leading-relaxed">{state.taxSummary}</p>
              <p className="mt-2 text-slate-600 leading-relaxed">{state.taxExplanation}</p>
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

  const jsonLd = buildJsonLdGraph([
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: `${formatted} Salary After Tax`, path },
    ]),
    buildWebPageSchema({
      name: formatted + " Salary After Tax",
      description: "Estimated take-home pay on a " + formatted + " salary after federal, state, and FICA taxes.",
      url: siteConfig.url + path,
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
        <SalarySeoSection amount={amount} breakdown={breakdown} />
        <TaxYearNotice context="salary after-tax estimates" />
        <SourceSection />

        {/* Adjacent salary internal links */}
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
