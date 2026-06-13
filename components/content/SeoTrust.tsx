import Link from "next/link";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import {
  CONTENT_REVIEWED_LABEL,
  DEFAULT_SALARY_PAGE_INPUT,
} from "@/lib/constants";
import { calculatePaycheck, getTaxData, taxYears } from "@/lib/tax";
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
  const data = getTaxData();

  return (
    <section className="mt-8 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-950">
      <p className="font-semibold">Tax data and review status</p>
      <p className="mt-1 leading-relaxed">
        These {context} use {data.federalYear} federal income-tax brackets, {data.ficaYear} FICA values,
        and state income-tax data that is versioned separately. The page copy and assumptions were reviewed on {CONTENT_REVIEWED_LABEL}.
        Use the result for planning and comparison, then confirm important decisions with official payroll or tax guidance.
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
            How the paycheck estimate is calculated
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
            The calculator follows a transparent gross-to-net workflow using the tax tables bundled with the site:
            {" "}{data.federalYear} federal brackets, {data.ficaYear} FICA values, and state tax data that is versioned separately.
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
        The estimate excludes local income taxes, pre-tax benefit elections, itemized deductions, tax credits,
        W-4 extra withholding, garnishments, and employer-specific payroll rules. Those factors can materially change final net pay.
      </p>
    </section>
  );
}

export function SourceSection({ includeLabor = false }: { includeLabor?: boolean }) {
  const sources = includeLabor ? [...TAX_SOURCES, ...LABOR_SOURCES] : TAX_SOURCES;

  return (
    <section className="mt-12" aria-labelledby="sources-heading">
      <h2 id="sources-heading" className="text-2xl font-bold tracking-tight text-slate-900">
        Data sources and editorial checks
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
        Tax rates are stored in versioned JSON files and checked against primary federal, FICA, and state sources during updates.
        Federal and FICA values are current for {taxYears.federal}; state data is versioned separately when state rules change on a different schedule.
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
        {state.name} paycheck tax details
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

export function AccuracyProcessSection() {
  const data = getTaxData();

  return (
    <section className="mt-12" aria-labelledby="accuracy-process-heading">
      <h2 id="accuracy-process-heading" className="text-2xl font-bold tracking-tight text-slate-900">
        Accuracy and editorial process
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card>
          <h3 className="font-semibold text-slate-900">Versioned tax data</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Federal income-tax brackets are versioned for {data.federalYear}, FICA values are versioned
            for {data.ficaYear}, and state income-tax inputs are versioned separately.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold text-slate-900">Human review</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            We review calculators against official source material, update published review dates,
            and disclose when one tax layer lags another.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold text-slate-900">Correction workflow</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Users can report data issues or edge cases through the contact page. Corrections are
            reviewed before deployment and reflected in versioned data files.
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
      <div className="max-w-3xl">
        <h2 id="salary-guide-heading" className="text-2xl font-bold tracking-tight text-slate-900">
          Salary planning notes for {formatMoney(amount)}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          The headline estimate assumes a single filer in California paid biweekly. Use the comparison table to see how
          location changes net pay, then open the full paycheck calculator if you need a different state, filing status, or pay frequency.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card>
          <h3 className="font-semibold text-slate-900">Annual take-home</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Estimated annual net pay is {formatMoney(breakdown.netAnnual)} after {formatMoney(breakdown.totalTax)} in combined taxes.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold text-slate-900">Per-paycheck view</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Based on biweekly pay, estimated take-home is {formatMoney(breakdown.netPerPaycheck)} per check. Weekly, semi-monthly,
            and monthly schedules will change that cash-flow view even when annual pay stays the same.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold text-slate-900">Effective tax rate</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            The modeled effective tax rate is {formatPct(breakdown.effectiveTaxRate)}, which blends federal income tax,
            state income tax, Social Security, and Medicare.
          </p>
        </Card>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-slate-700">
            <tr>
              <th className="px-4 py-3 font-semibold">State</th>
              <th className="px-4 py-3 font-semibold">Annual take-home</th>
              <th className="px-4 py-3 font-semibold">Per paycheck</th>
              <th className="px-4 py-3 font-semibold">Effective tax rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map(({ state, result }) => (
              <tr key={state.code}>
                <td className="px-4 py-3 font-medium text-slate-900">{state.name}</td>
                <td className="px-4 py-3 text-slate-700">{formatMoney(result.netAnnual)}</td>
                <td className="px-4 py-3 text-slate-700">{formatMoney(result.netPerPaycheck)}</td>
                <td className="px-4 py-3 text-slate-700">{formatPct(result.effectiveTaxRate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        California is used as the default reference state because state tax materially changes take-home pay. If you live in a no-income-tax state,
        your net pay can be noticeably higher on the same salary before local taxes and benefit deductions are added.
      </p>
    </section>
  );
}

export function SpecialCalculatorGuide({ type }: { type: "hourly-to-salary" | "salary-to-hourly" | "overtime" | "bonus-tax" | "ipo" | "net-worth" }) {
  const guides = {
    "hourly-to-salary": {
      title: "When to use the hourly to salary calculator",
      intro: "Use this tool when you know your hourly wage and need a quick annual income estimate for job comparisons, budgeting, or offer evaluation.",
      points: [
        "A 40-hour week is only a starting assumption. Real annual income changes with unpaid time off, overtime, and variable schedules.",
        "Hourly-to-salary conversions are most reliable when you know your average weekly hours across the full year.",
        "Use the paycheck calculator afterward if you need taxes and take-home pay instead of gross pay only.",
      ],
    },
    "salary-to-hourly": {
      title: "When to use the salary to hourly calculator",
      intro: "Use this tool when you want to translate annual salary into an hourly rate for negotiation, freelance comparisons, or workload discussions.",
      points: [
        "The result depends on expected weekly hours and weeks worked each year.",
        "A higher salary does not always mean a better effective hourly rate if the role requires longer hours.",
        "Pair this tool with the overtime calculator if the role includes overtime or shift premiums.",
      ],
    },
    overtime: {
      title: "How to think about overtime pay",
      intro: "Overtime estimates are most useful when you separate base hourly rate, overtime multiplier, and the number of overtime hours actually worked.",
      points: [
        "Many employers use time-and-a-half, but contracts, union rules, and local law can differ.",
        "Regular rate calculations may change when bonuses or shift differentials are involved.",
        "Review employer payroll policy and labor guidance for exact treatment in real pay periods.",
      ],
    },
    "bonus-tax": {
      title: "How bonus take-home pay differs from salary",
      intro: "Bonus withholding often feels high because supplemental wages can be taxed differently at the paycheck stage than your base salary.",
      points: [
        "A bonus estimate is useful for planning cash flow, but it is not the same as your final annual tax liability.",
        "Your employer may use a flat withholding method or a combined method depending on payroll setup.",
        "Review the result alongside your regular salary estimate to understand total after-tax compensation.",
      ],
    },
    ipo: {
      title: "How to use an IPO calculator well",
      intro: "An IPO calculator is most useful when you separate application amount, allotted shares, expected listing price, and planned exit price instead of relying on one hype-driven number.",
      points: [
        "Issue price tells you the capital committed, but gain or loss depends on the actual number of shares allotted and the market price when trading begins.",
        "Listing-gain estimates are scenario planning only. Real IPO returns can change quickly with oversubscription, lockups, weak demand, or broader market conditions.",
        "Use multiple price scenarios rather than one bullish forecast so you can compare downside, base-case, and upside outcomes before applying.",
      ],
    },
    "net-worth": {
      title: "How to use a net worth calculator for real planning",
      intro: "A net worth calculator is strongest when you treat it as a simple balance sheet: total assets minus total liabilities, updated regularly and reviewed over time.",
      points: [
        "Track liquid assets separately from total net worth so you can see the difference between accessible cash and long-term wealth tied up in property or retirement accounts.",
        "Debt balances matter as much as asset growth. Mortgage, student-loan, auto-loan, and credit-card changes can shift net worth faster than many households expect.",
        "Use the same categories each month or quarter. Consistent inputs make trend tracking more valuable than any single one-time net worth snapshot.",
      ],
    },
  } as const;

  const guide = guides[type];

  return (
    <section className="mt-12" aria-labelledby="special-guide-heading">
      <h2 id="special-guide-heading" className="text-2xl font-bold tracking-tight text-slate-900">
        {guide.title}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">{guide.intro}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {guide.points.map((point) => (
          <Card key={point}>
            <p className="text-sm leading-relaxed text-slate-600">{point}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
