import { ResultCard } from "@/components/ui/Card";
import { formatNzd, formatNzPercent, NZ_PAY_FREQUENCY_LABELS, type NzTaxBreakdown } from "@/lib/tax/new-zealand";

export function NzTaxResults({ breakdown }: { breakdown: NzTaxBreakdown }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Your Take-Home Breakdown</h2>
        <p className="mt-1 text-sm text-slate-600">Effective tax rate: {formatNzPercent(breakdown.effectiveTaxRate)}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <ResultCard label="Effective Tax Rate" value={formatNzPercent(breakdown.effectiveTaxRate)} />
        <ResultCard label="Gross Annual" value={formatNzd(breakdown.grossAnnual)} />
        <ResultCard label="Net Annual (Take-Home)" value={formatNzd(breakdown.netAnnual)} highlight />
        <ResultCard label="Net Fortnightly" value={formatNzd(breakdown.netFortnightly, true)} highlight />
        <ResultCard label="Net Monthly" value={formatNzd(breakdown.netMonthly, true)} />
        <ResultCard label="PAYE Income Tax" value={formatNzd(breakdown.payeIncomeTax)} />
        <ResultCard label="ACC Levy" value={formatNzd(breakdown.accLevy)} />
        {breakdown.kiwiSaver > 0 && <ResultCard label="KiwiSaver" value={formatNzd(breakdown.kiwiSaver)} />}
        {breakdown.studentLoan > 0 && <ResultCard label="Student Loan" value={formatNzd(breakdown.studentLoan)} />}
        <ResultCard label="Total Deductions" value={formatNzd(breakdown.totalDeductions)} />
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <p className="mb-3 text-sm font-medium text-slate-700">Deduction Allocation ({NZ_PAY_FREQUENCY_LABELS[breakdown.payFrequency]} view)</p>
        <div className="flex h-4 overflow-hidden rounded-full">
          {breakdown.grossAnnual > 0 && (
            <>
              <div className="bg-blue-500" style={{ width: `${(breakdown.payeIncomeTax / breakdown.grossAnnual) * 100}%` }} title="PAYE income tax" />
              <div className="bg-purple-500" style={{ width: `${(breakdown.accLevy / breakdown.grossAnnual) * 100}%` }} title="ACC levy" />
              {breakdown.kiwiSaver > 0 && <div className="bg-amber-500" style={{ width: `${(breakdown.kiwiSaver / breakdown.grossAnnual) * 100}%` }} title="KiwiSaver" />}
              {breakdown.studentLoan > 0 && <div className="bg-rose-500" style={{ width: `${(breakdown.studentLoan / breakdown.grossAnnual) * 100}%` }} title="Student loan" />}
              <div className="bg-emerald-500" style={{ width: `${(breakdown.netAnnual / breakdown.grossAnnual) * 100}%` }} title="Take-home" />
            </>
          )}
        </div>
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-600">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-500" /> PAYE</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-purple-500" /> ACC</span>
          {breakdown.kiwiSaver > 0 && <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" /> KiwiSaver</span>}
          {breakdown.studentLoan > 0 && <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-500" /> Student loan</span>}
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Take-home</span>
        </div>
      </div>
    </div>
  );
}
