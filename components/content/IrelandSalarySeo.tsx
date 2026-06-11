import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { FaqItem } from "@/types/seo";
import {
  calculateIrelandTax,
  formatEuro,
  formatIrelandPercent,
  getIrelandAdjacentSalaries,
  IRELAND_MARITAL_STATUS_LABELS,
  IRELAND_SALARY_AMOUNTS,
  IRELAND_TAX_YEAR,
  irelandAfterTaxSlug,
  type IrelandTaxBreakdown,
} from "@/lib/tax/ireland";
import { CONTENT_REVIEWED_LABEL } from "@/lib/constants";

export function getIrelandSalaryFaqs(amount: number, breakdown: IrelandTaxBreakdown): FaqItem[] {
  const gross = formatEuro(amount);
  return [
    {
      question: `How much is ${gross} after tax in Ireland?`,
      answer: `For a single PAYE employee in ${IRELAND_TAX_YEAR}, ${gross} after tax in Ireland is estimated at ${formatEuro(breakdown.netAnnual)} per year, or ${formatEuro(breakdown.netMonthly, true)} per month, after income tax, USC and PRSI.`,
    },
    {
      question: `What is the effective tax rate on ${gross} in Ireland?`,
      answer: `The estimated effective tax rate on ${gross} in Ireland is ${formatIrelandPercent(breakdown.effectiveTaxRate)}. That equals total deductions of ${formatEuro(breakdown.totalDeductions)} divided by gross annual salary.`,
    },
    {
      question: `How much income tax, USC and PRSI on ${gross}?`,
      answer: `Estimated annual deductions on ${gross} are ${formatEuro(breakdown.incomeTax)} income tax, ${formatEuro(breakdown.usc)} USC and ${formatEuro(breakdown.prsi)} PRSI for the default single PAYE employee scenario.`,
    },
    {
      question: `What is the monthly take-home on ${gross} in Ireland?`,
      answer: `Estimated monthly take-home pay on ${gross} in Ireland is ${formatEuro(breakdown.netMonthly, true)} for a single PAYE employee paid monthly in ${IRELAND_TAX_YEAR}.`,
    },
    {
      question: "Does this include pension contributions?",
      answer: "No. The estimate does not include pension contributions. Employee pension contributions can reduce income tax at the marginal rate where eligible, but they generally do not reduce USC or PRSI in this simplified salary guide.",
    },
  ];
}

export function IrelandSalaryAssumptions({ amount, breakdown }: { amount: number; breakdown: IrelandTaxBreakdown }) {
  const rows = [
    { status: "single" as const },
    { status: "married_one_income" as const },
    { status: "married_two_incomes" as const },
  ].map(({ status }) => ({
    status,
    result: calculateIrelandTax({ annualSalary: amount, maritalStatus: status, payFrequency: "monthly" }),
  }));

  return (
    <section className="mt-12" aria-labelledby="ireland-assumptions-heading">
      <h2 id="ireland-assumptions-heading" className="text-2xl font-bold tracking-tight text-slate-900">
        {formatEuro(amount)} After Tax — Assumptions
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
        The default estimate is for a single PAYE employee in Ireland, paid monthly in {IRELAND_TAX_YEAR},
        with no pension contribution, no medical card, and the standard {formatEuro(4_000)} combined personal
        and PAYE employee tax credits applied after gross income tax is calculated.
      </p>

      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-slate-700">
            <tr>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Annual take-home</th>
              <th className="px-4 py-3 font-semibold">Monthly take-home</th>
              <th className="px-4 py-3 font-semibold">Effective rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map(({ status, result }) => (
              <tr key={status}>
                <td className="px-4 py-3 font-medium text-slate-900">{IRELAND_MARITAL_STATUS_LABELS[status]}</td>
                <td className="px-4 py-3 text-slate-700">{formatEuro(result.netAnnual)}</td>
                <td className="px-4 py-3 text-slate-700">{formatEuro(result.netMonthly, true)}</td>
                <td className="px-4 py-3 text-slate-700">{formatIrelandPercent(result.effectiveTaxRate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        For the default single scenario, estimated annual take-home is {formatEuro(breakdown.netAnnual)} after
        {" "}{formatEuro(breakdown.totalDeductions)} in income tax, USC and PRSI deductions.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card>
          <h3 className="font-semibold text-slate-900">Modeled tax year</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            This guide uses {IRELAND_TAX_YEAR} Revenue income-tax bands, USC rates and Class A PRSI assumptions.
            The single standard-rate cut-off point is {formatEuro(44_000)}; married examples use {formatEuro(53_000)}
            for one income and up to {formatEuro(88_000)} for two incomes.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold text-slate-900">What is not included</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Pension contributions, benefit-in-kind, medical card USC reductions, age-related USC relief, emergency tax,
            non-PAYE income, tax reliefs beyond the two standard credits, and employer-specific payroll adjustments are not modeled.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold text-slate-900">Best use case</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Use this page to compare Irish job offers, plan a monthly budget, or sanity-check gross-to-net pay. Confirm exact
            treatment with Revenue.ie, your payroll team, or a qualified tax adviser.
          </p>
        </Card>
      </div>
    </section>
  );
}

export function IrelandReviewNote() {
  return (
    <Card className="mt-8">
      <p className="text-sm leading-relaxed text-slate-600">
        These estimates use {IRELAND_TAX_YEAR} Revenue income-tax bands, USC rates and Class A PRSI. Reviewed {CONTENT_REVIEWED_LABEL}.
        Treat as planning estimates, not tax, payroll, legal or financial advice. Note: the PRSI Class A employee rate rises to
        4.35% from 1 October 2026, which may affect actual payroll during the year.
      </p>
    </Card>
  );
}

export function IrelandSources() {
  const sources = [
    ["Revenue.ie — Tax rates, bands and reliefs", "https://www.revenue.ie/en/personal-tax-credits-reliefs-and-exemptions/tax-relief-charts/index.aspx"],
    ["Revenue.ie — USC", "https://www.revenue.ie/en/jobs-and-pensions/usc/index.aspx"],
    ["Revenue.ie — PRSI Class A", "https://www.revenue.ie/en/jobs-and-pensions/prsi/index.aspx"],
    ["Citizens Information — Budget 2026", "https://www.citizensinformation.ie/en/money-and-tax/budgets/budget-2026/"],
  ] as const;

  return (
    <section className="mt-12" aria-labelledby="ireland-sources-heading">
      <h2 id="ireland-sources-heading" className="text-2xl font-bold tracking-tight text-slate-900">Data Sources</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {sources.map(([label, href]) => (
          <li key={href}>
            <a
              href={href}
              className="block rounded-lg border border-slate-200 bg-white p-4 text-sm font-medium text-emerald-700 hover:border-emerald-300 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function IrelandPrevNext({ amount }: { amount: number }) {
  const { lower, higher } = getIrelandAdjacentSalaries(amount);
  return (
    <nav className="mt-8 flex flex-wrap items-center gap-4 text-sm" aria-label="Ireland salary guide navigation">
      {lower && (
        <Link href={`/${irelandAfterTaxSlug(lower)}`} className="text-emerald-700 hover:underline">
          ← {formatEuro(lower)} after tax
        </Link>
      )}
      <Link href="/ireland-take-home-pay-calculator" className="text-emerald-700 hover:underline">
        Ireland take-home pay calculator
      </Link>
      {higher && (
        <Link href={`/${irelandAfterTaxSlug(higher)}`} className="text-emerald-700 hover:underline">
          {formatEuro(higher)} after tax →
        </Link>
      )}
    </nav>
  );
}

export function IrelandSalaryClusterLinks({ currentAmount }: { currentAmount: number }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-slate-900">Salary After Tax Ireland Guides</h2>
      <p className="mt-2 text-sm text-slate-600">
        Compare Irish salary after tax estimates across the ToolsZila Ireland PAYE page cluster. These pages are designed to help with job-offer comparison, monthly budgeting, and salary progression planning rather than replacing a final payroll run.
      </p>
      <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {IRELAND_SALARY_AMOUNTS.map((salary) => (
          <li key={salary}>
            {salary === currentAmount ? (
              <span className="text-sm font-medium text-slate-500">{formatEuro(salary)} After Tax Ireland</span>
            ) : (
              <Link
                href={`/${irelandAfterTaxSlug(salary)}`}
                className="text-sm text-emerald-700 hover:text-emerald-800 hover:underline"
              >
                {formatEuro(salary)} After Tax Ireland
              </Link>
            )}
          </li>
        ))}
        <li>
          <Link href="/ireland-take-home-pay-calculator" className="text-sm text-emerald-700 hover:text-emerald-800 hover:underline">
            Ireland Take-Home Pay Calculator
          </Link>
        </li>
      </ul>
    </section>
  );
}
