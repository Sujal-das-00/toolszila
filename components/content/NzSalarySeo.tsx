import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { FaqItem } from "@/types/seo";
import { CONTENT_REVIEWED_LABEL } from "@/lib/constants";
import {
  calculateNzTax,
  formatNzd,
  formatNzPercent,
  getNzAdjacentSalaries,
  NZ_ACC_EARNERS_LEVY_RATE,
  NZ_ACC_EARNINGS_CAP,
  NZ_DEFAULT_KIWISAVER_RATE,
  NZ_MARITAL_STATUS_LABELS,
  NZ_SALARY_AMOUNTS,
  NZ_STUDENT_LOAN_RATE,
  NZ_STUDENT_LOAN_THRESHOLD,
  NZ_TAX_YEAR,
  NZ_TAX_YEAR_PERIOD,
  nzAfterTaxSlug,
  type NzTaxBreakdown,
} from "@/lib/tax/new-zealand";

export function getNzSalaryFaqs(amount: number, breakdown: NzTaxBreakdown): FaqItem[] {
  const gross = formatNzd(amount);
  return [
    {
      question: `How much is ${gross} after tax in New Zealand?`,
      answer: `For a single PAYE employee in ${NZ_TAX_YEAR}, ${gross} after tax in New Zealand is estimated at ${formatNzd(breakdown.netAnnual)} per year, or ${formatNzd(breakdown.netFortnightly, true)} per fortnight, after PAYE income tax and ACC levy.`,
    },
    {
      question: `What is the effective tax rate on ${gross} in ${NZ_TAX_YEAR}?`,
      answer: `The estimated effective tax rate on ${gross} in New Zealand is ${formatNzPercent(breakdown.effectiveTaxRate)}. That equals total deductions of ${formatNzd(breakdown.totalDeductions)} divided by gross annual salary.`,
    },
    {
      question: `How much PAYE and ACC levy on ${gross}?`,
      answer: `Estimated annual deductions on ${gross} are ${formatNzd(breakdown.payeIncomeTax)} PAYE income tax and ${formatNzd(breakdown.accLevy)} ACC earners' levy for the default single employee scenario.`,
    },
    {
      question: `What is the fortnightly take-home on ${gross}?`,
      answer: `Estimated fortnightly take-home pay on ${gross} is ${formatNzd(breakdown.netFortnightly, true)} for a single PAYE employee paid fortnightly in New Zealand.`,
    },
    {
      question: "Does this include KiwiSaver contributions?",
      answer: `No. The default scenario excludes KiwiSaver. KiwiSaver is optional in this calculator, is deducted after tax, and does not reduce taxable PAYE income. The ${NZ_TAX_YEAR} default option is shown as 3.5% when selected.`,
    },
    {
      question: "What is the ACC levy and why do I pay it?",
      answer: `The ACC earners' levy helps fund New Zealand's no-fault accident compensation scheme. In this estimate it is modeled at ${(NZ_ACC_EARNERS_LEVY_RATE * 100).toFixed(2)}% of liable earnings up to ${formatNzd(NZ_ACC_EARNINGS_CAP)}.`,
    },
  ];
}

export function NzSalaryAssumptions({ amount, breakdown }: { amount: number; breakdown: NzTaxBreakdown }) {
  const rows = [
    { label: "Single", result: calculateNzTax({ annualSalary: amount, maritalStatus: "single", dependents: "none", payFrequency: "fortnightly", kiwiSaverRate: 0, hasStudentLoan: false }) },
    { label: NZ_MARITAL_STATUS_LABELS.married_one_income, result: calculateNzTax({ annualSalary: amount, maritalStatus: "married_one_income", dependents: "none", payFrequency: "fortnightly", kiwiSaverRate: 0, hasStudentLoan: false }) },
    { label: "Married, two equal incomes", result: calculateNzTax({ annualSalary: amount, maritalStatus: "married_two_incomes", dependents: "none", payFrequency: "fortnightly", kiwiSaverRate: 0, hasStudentLoan: false }) },
    { label: "Single parent (1 dependent, WFTC)", result: calculateNzTax({ annualSalary: amount, maritalStatus: "single_parent", dependents: "one_plus", payFrequency: "fortnightly", kiwiSaverRate: 0, hasStudentLoan: false }) },
  ];

  return (
    <section className="mt-12" aria-labelledby="nz-assumptions-heading">
      <h2 id="nz-assumptions-heading" className="text-2xl font-bold tracking-tight text-slate-900">
        {formatNzd(amount)} After Tax — Assumptions
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
        The default estimate is for a single New Zealand PAYE employee, paid fortnightly in {NZ_TAX_YEAR}, with no KiwiSaver contribution,
        no student loan, no dependent children and no family tax credits. PAYE is applied from the first dollar of income because New Zealand
        has no tax-free threshold. KiwiSaver is optional and, when selected, is deducted after tax rather than reducing taxable income.
      </p>

      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-slate-700">
            <tr>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Annual take-home</th>
              <th className="px-4 py-3 font-semibold">Fortnightly take-home</th>
              <th className="px-4 py-3 font-semibold">Effective rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map(({ label, result }) => (
              <tr key={label}>
                <td className="px-4 py-3 font-medium text-slate-900">{label}</td>
                <td className="px-4 py-3 text-slate-700">{formatNzd(result.netAnnual)}</td>
                <td className="px-4 py-3 text-slate-700">{formatNzd(result.netFortnightly, true)}</td>
                <td className="px-4 py-3 text-slate-700">{formatNzPercent(result.effectiveTaxRate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        For the default single scenario, estimated annual take-home is {formatNzd(breakdown.netAnnual)} after {formatNzd(breakdown.totalDeductions)} in PAYE income tax and ACC levy.
        Optional KiwiSaver at 3.5% would reduce cash take-home by {formatNzd(amount * NZ_DEFAULT_KIWISAVER_RATE)} per year, but it is not included in the headline figure.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card>
          <h3 className="font-semibold text-slate-900">Modeled tax year</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            This guide uses {NZ_TAX_YEAR} Inland Revenue PAYE brackets for {NZ_TAX_YEAR_PERIOD}, plus the ACC earners&apos; levy from 1 April 2026.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold text-slate-900">What is not included</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Employer KiwiSaver match, student loan interest rules, detailed Working for Families abatement, ACC voluntary contributions, rental deductions and other personal tax details are not modeled in the headline estimate.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold text-slate-900">Best use case</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Use this page to compare job offers, plan a fortnightly budget, support salary negotiation and sanity-check PAYE deductions. Confirm exact treatment with payroll or Inland Revenue.
          </p>
        </Card>
      </div>
    </section>
  );
}

export function NzReviewNote() {
  return (
    <Card className="mt-8">
      <p className="text-sm leading-relaxed text-slate-600">
        These estimates use {NZ_TAX_YEAR} Inland Revenue PAYE brackets, ACC levy rates from 1 April 2026, and KiwiSaver default 3.5%. Reviewed {CONTENT_REVIEWED_LABEL}.
        Treat as planning estimates, not tax, payroll, legal or financial advice. Student loan repayments are modeled at {(NZ_STUDENT_LOAN_RATE * 100).toFixed(0)}% of gross income above {formatNzd(NZ_STUDENT_LOAN_THRESHOLD)} only when selected.
      </p>
    </Card>
  );
}

export function NzSources() {
  const sources = [
    ["Inland Revenue — PAYE tax rates and brackets", "https://www.ird.govt.nz/income-tax/income-tax-for-individuals/tax-codes-and-tax-rates-for-individuals"],
    ["Inland Revenue — ACC earners' levy information", "https://www.ird.govt.nz/income-tax/income-tax-for-individuals/types-of-individual-income/salary-and-wages/acc-earners-levy"],
    ["KiwiSaver.govt.nz — KiwiSaver contribution rates and eligibility", "https://www.kiwisaver.govt.nz/new/benefits/contributions/"],
    ["Stats NZ — Household Labour Force Survey salary data", "https://www.stats.govt.nz/information-releases/labour-market-statistics-income/"],
  ] as const;

  return (
    <section className="mt-12" aria-labelledby="nz-sources-heading">
      <h2 id="nz-sources-heading" className="text-2xl font-bold tracking-tight text-slate-900">Data Sources</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {sources.map(([label, href]) => (
          <li key={href}>
            <a href={href} className="block rounded-lg border border-slate-200 bg-white p-4 text-sm font-medium text-emerald-700 hover:border-emerald-300 hover:underline" rel="noopener noreferrer" target="_blank">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function NzPrevNext({ amount }: { amount: number }) {
  const { lower, higher } = getNzAdjacentSalaries(amount);
  return (
    <nav className="mt-8 flex flex-wrap items-center gap-4 text-sm" aria-label="New Zealand salary guide navigation">
      {lower && <Link href={`/${nzAfterTaxSlug(lower)}`} className="text-emerald-700 hover:underline">← {formatNzd(lower)} after tax</Link>}
      <Link href="/nz-take-home-pay-calculator" className="text-emerald-700 hover:underline">NZ take-home pay calculator</Link>
      {higher && <Link href={`/${nzAfterTaxSlug(higher)}`} className="text-emerald-700 hover:underline">{formatNzd(higher)} after tax →</Link>}
    </nav>
  );
}

export function NzSalaryClusterLinks({ currentAmount }: { currentAmount: number }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-slate-900">Salary After Tax NZ Guides</h2>
      <p className="mt-2 text-sm text-slate-600">Compare New Zealand salary after tax estimates across the ToolsZila NZ PAYE page cluster. Use these pages as fast reference points for job offers, fortnightly budgeting, and take-home pay comparisons before switching to the full calculator for custom assumptions.</p>
      <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {NZ_SALARY_AMOUNTS.map((salary) => (
          <li key={salary}>
            {salary === currentAmount ? <span className="text-sm font-medium text-slate-500">{formatNzd(salary)} After Tax NZ</span> : <Link href={`/${nzAfterTaxSlug(salary)}`} className="text-sm text-emerald-700 hover:text-emerald-800 hover:underline">{formatNzd(salary)} After Tax NZ</Link>}
          </li>
        ))}
        <li><Link href="/nz-take-home-pay-calculator" className="text-sm text-emerald-700 hover:text-emerald-800 hover:underline">NZ Take-Home Pay Calculator</Link></li>
      </ul>
    </section>
  );
}
