import Link from "next/link";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import {
  CONTENT_REVIEWED_LABEL,
  DEFAULT_SALARY_PAGE_INPUT,
} from "@/lib/constants";
import { calculatePaycheck, getTaxData } from "@/lib/tax";
import { formatCurrency, formatPercent } from "@/lib/seo/metadata";
import { formatMoney, formatPct } from "@/lib/utils";
import type { PaycheckBreakdown, StateTaxData } from "@/types/tax";

const TAX_SOURCES = [
  {
    label: "IRS federal tax rates and brackets",
    href: "https://www.irs.gov/filing/federal-income-tax-rates-and-brackets",
  },
  {
    label: "IRS Publication 15-T withholding methods",
    href: "https://www.irs.gov/forms-pubs/about-publication-15-t",
  },
  {
    label: "IRS Social Security and Medicare withholding",
    href: "https://www.irs.gov/taxtopics/tc751",
  },
  {
    label: "Social Security wage base history",
    href: "https://www.ssa.gov/oact/cola/cbb.html",
  },
];

const LABOR_SOURCES = [
  {
    label: "U.S. Department of Labor overtime guidance",
    href: "https://www.dol.gov/agencies/whd/overtime",
  },
];

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-emerald-700 hover:text-emerald-800 hover:underline"
    >
      {children}
    </a>
  );
}

export function TaxYearNotice({ context = "calculator estimates" }: { context?: string }) {
  const year = getTaxData().year;

  return (
    <section className="mt-8 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-950">
      <p className="font-semibold">Tax data and review status</p>
      <p className="mt-1 leading-relaxed">
        These {context} use {year} federal, FICA, and state tax data and were
        reviewed on {CONTENT_REVIEWED_LABEL}. Treat results as planning estimates,
        not tax, payroll, legal, or financial advice. Update the annual tax data
        before positioning this site as a current-year withholding calculator.
      </p>
    </section>
  );
}

export function MethodologySection() {
  const data = getTaxData();

  return (
    <section className="mt-12" aria-labelledby="methodology-heading">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="methodology-heading" className="text-2xl font-bold tracking-tight text-slate-900">
            How the Paycheck Estimate Works
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
            The calculator applies a transparent gross-to-net workflow using the tax
            tables bundled with the site for tax year {data.year}.
          </p>
        </div>
        <Link href="/methodology" className="text-sm font-medium text-emerald-700 hover:underline">
          Full methodology
        </Link>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "1. Start with gross pay",
            body: "Annual salary is divided by the selected pay frequency to estimate weekly, biweekly, semi-monthly, or monthly gross pay.",
          },
          {
            title: "2. Estimate income tax",
            body: "Federal and state taxable income are reduced by standard deductions where available, then flat or progressive brackets are applied.",
          },
          {
            title: "3. Add FICA",
            body: "Social Security is capped at the wage base, Medicare applies to all wages, and Additional Medicare tax applies above filing-status thresholds.",
          },
          {
            title: "4. Show take-home pay",
            body: "The tool subtracts estimated federal, state, Social Security, and Medicare taxes from gross pay and shows annual, monthly, and per-check net pay.",
          },
        ].map((item) => (
          <Card key={item.title}>
            <h3 className="font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
          </Card>
        ))}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        The estimate excludes local income taxes, pre-tax benefit elections, itemized
        deductions, tax credits, W-4 extra withholding, garnishments, and employer-specific
        payroll rules.
      </p>
    </section>
  );
}

export function SourceSection({ includeLabor = false }: { includeLabor?: boolean }) {
  const sources = includeLabor ? [...TAX_SOURCES, ...LABOR_SOURCES] : TAX_SOURCES;

  return (
    <section className="mt-12" aria-labelledby="sources-heading">
      <h2 id="sources-heading" className="text-2xl font-bold tracking-tight text-slate-900">
        Data Sources and Review Process
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
        Tax rates are stored in versioned JSON files and should be checked against
        official federal, FICA, and state sources during each annual update.
      </p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {sources.map((source) => (
          <li key={source.href} className="rounded-lg border border-slate-200 bg-white p-4 text-sm">
            <ExternalLink href={source.href}>{source.label}</ExternalLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

function getStateRateSummary(state: StateTaxData): string {
  if (!state.hasIncomeTax || state.taxType === "none") {
    return state.name + " does not tax wage income at the state level.";
  }

  if (state.taxType === "flat" && state.flatRate !== undefined) {
    return state.name + " uses a flat state income tax rate of " + formatPercent(state.flatRate) + ".";
  }

  const rates = state.brackets?.single.map((bracket) => bracket.rate) ?? [];
  if (!rates.length) return state.taxSummary;

  return state.name + " uses progressive state income tax brackets from " +
    formatPercent(Math.min(...rates)) + " to " + formatPercent(Math.max(...rates)) + ".";
}

function getDeductionSummary(state: StateTaxData): string {
  const deduction = state.standardDeduction?.single;
  if (!deduction) {
    return "No state standard deduction is modeled for single filers in the current data file.";
  }

  return "The current data file models a " + formatCurrency(deduction) +
    " state standard deduction for single filers.";
}

export function StateSeoSection({ state }: { state: StateTaxData }) {
  return (
    <section className="mt-12" aria-labelledby="state-detail-heading">
      <h2 id="state-detail-heading" className="text-2xl font-bold tracking-tight text-slate-900">
        {state.name} Paycheck Tax Details
      </h2>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card>
          <h3 className="font-semibold text-slate-900">State income tax model</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{getStateRateSummary(state)}</p>
        </Card>
        <Card>
          <h3 className="font-semibold text-slate-900">Modeled deductions</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{getDeductionSummary(state)}</p>
        </Card>
        <Card>
          <h3 className="font-semibold text-slate-900">What may change your result</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Local wage taxes, pre-tax deductions, credits, W-4 elections, and employer
            withholding settings can change real paycheck amounts.
          </p>
        </Card>
      </div>
    </section>
  );
}

export function SalarySeoSection({
  amount,
  breakdown,
}: {
  amount: number;
  breakdown: PaycheckBreakdown;
}) {
  const data = getTaxData();
  const comparisonStates = ["CA", "TX", "NY", "FL"];
  const rows = comparisonStates.flatMap((code) => {
    const state = data.states.find((item) => item.code === code);
    if (!state) return [];
    return [
      {
        state,
        result: calculatePaycheck({
          annualSalary: amount,
          ...DEFAULT_SALARY_PAGE_INPUT,
          stateCode: code,
        }),
      },
    ];
  });

  return (
    <section className="mt-12" aria-labelledby="salary-guide-heading">
      <h2 id="salary-guide-heading" className="text-2xl font-bold tracking-tight text-slate-900">
        {formatCurrency(amount)} Salary After Tax Assumptions
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
        The headline estimate uses a single filer in California paid biweekly. That
        assumption keeps every salary guide comparable, but state tax policy can
        materially change take-home pay.
      </p>

      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-slate-700">
            <tr>
              <th className="px-4 py-3 font-semibold">State</th>
              <th className="px-4 py-3 font-semibold">Annual take-home</th>
              <th className="px-4 py-3 font-semibold">Monthly take-home</th>
              <th className="px-4 py-3 font-semibold">Effective tax rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map(({ state, result }) => (
              <tr key={state.code}>
                <td className="px-4 py-3 font-medium text-slate-900">{state.name}</td>
                <td className="px-4 py-3 text-slate-700">{formatMoney(result.netAnnual)}</td>
                <td className="px-4 py-3 text-slate-700">{formatMoney(result.netMonthly, true)}</td>
                <td className="px-4 py-3 text-slate-700">{formatPct(result.effectiveTaxRate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        For the default California scenario, estimated annual take-home is {formatMoney(breakdown.netAnnual)}
        after {formatMoney(breakdown.totalTax)} in combined federal, state, Social Security,
        and Medicare taxes.
      </p>
    </section>
  );
}

type SpecialCalculatorType =
  | "hourly-to-salary"
  | "salary-to-hourly"
  | "overtime"
  | "bonus-tax";

const specialGuides: Record<SpecialCalculatorType, {
  title: string;
  formula: string;
  example: string;
  notes: string[];
}> = {
  "hourly-to-salary": {
    title: "How to Convert Hourly Pay to Salary",
    formula: "Hourly rate x hours per week x 52 weeks = annual gross salary",
    example: "$25 per hour x 40 hours x 52 weeks = $52,000 gross annual salary.",
    notes: [
      "This is a gross-pay conversion and does not subtract taxes or benefits.",
      "Use your expected weekly hours, not only your scheduled hours, if overtime or unpaid time off is common.",
      "For part-time work, the annual result changes quickly when weekly hours vary.",
    ],
  },
  "salary-to-hourly": {
    title: "How to Convert Salary to Hourly Pay",
    formula: "Annual salary / (hours per week x 52 weeks) = hourly gross rate",
    example: "$52,000 / (40 x 52) = $25 per hour before taxes and deductions.",
    notes: [
      "The result is a gross hourly equivalent, not your after-tax hourly take-home pay.",
      "Use a lower weekly-hour assumption if you have unpaid breaks or seasonal unpaid time.",
      "Use a higher weekly-hour assumption when comparing salaried roles with expected overtime.",
    ],
  },
  overtime: {
    title: "How Overtime Pay Is Estimated",
    formula: "Regular pay + (hourly rate x overtime multiplier x overtime hours) = weekly gross pay",
    example: "$25 x 40 regular hours + ($25 x 1.5 x 5 overtime hours) = $1,187.50 weekly gross pay.",
    notes: [
      "The default multiplier is 1.5x, often called time and a half.",
      "Actual overtime eligibility depends on job duties, pay basis, state rules, and employer policy.",
      "This calculator estimates gross pay before tax withholding and benefit deductions.",
    ],
  },
  "bonus-tax": {
    title: "How Bonus Take-Home Pay Is Estimated",
    formula: "Bonus - federal supplemental withholding - state estimate - FICA = estimated net bonus",
    example: "A $10,000 bonus starts with 22% federal supplemental withholding before state and FICA estimates.",
    notes: [
      "Federal supplemental withholding is not always your final tax liability.",
      "State bonus withholding varies by state and employer payroll setup.",
      "Your final refund or balance due depends on your full-year income, deductions, and credits.",
    ],
  },
};

export function SpecialCalculatorGuide({ type }: { type: SpecialCalculatorType }) {
  const guide = specialGuides[type];

  return (
    <section className="mt-12" aria-labelledby="calculator-guide-heading">
      <h2 id="calculator-guide-heading" className="text-2xl font-bold tracking-tight text-slate-900">
        {guide.title}
      </h2>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card>
          <h3 className="font-semibold text-slate-900">Formula</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{guide.formula}</p>
        </Card>
        <Card>
          <h3 className="font-semibold text-slate-900">Example</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{guide.example}</p>
        </Card>
        <Card>
          <h3 className="font-semibold text-slate-900">Important limits</h3>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-relaxed text-slate-600">
            {guide.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
