import { ResultCard } from "@/components/ui/Card";
import {
  formatEuro,
  formatIrelandPercent,
  IRELAND_PAY_FREQUENCY_LABELS,
  type IrelandTaxBreakdown,
} from "@/lib/tax/ireland";

export function IrelandTaxResults({ breakdown }: { breakdown: IrelandTaxBreakdown }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Your Take-Home Breakdown</h2>
        <p className="mt-1 text-sm text-slate-600">
          Effective tax rate: {formatIrelandPercent(breakdown.effectiveTaxRate)}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <ResultCard label="Effective Tax Rate" value={formatIrelandPercent(breakdown.effectiveTaxRate)} />
        <ResultCard label="Gross Annual" value={formatEuro(breakdown.grossAnnual)} />
        <ResultCard label="Net Annual (Take-Home)" value={formatEuro(breakdown.netAnnual)} highlight />
        <ResultCard label="Net Monthly" value={formatEuro(breakdown.netMonthly, true)} highlight />
        <ResultCard label="Net Weekly" value={formatEuro(breakdown.netWeekly, true)} />
        <ResultCard label="Income Tax" value={formatEuro(breakdown.incomeTax)} />
        <ResultCard label="USC" value={formatEuro(breakdown.usc)} />
        <ResultCard label="PRSI" value={formatEuro(breakdown.prsi)} />
        <ResultCard label="Total Deductions" value={formatEuro(breakdown.totalDeductions)} />
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <p className="mb-3 text-sm font-medium text-slate-700">
          Deduction Allocation ({IRELAND_PAY_FREQUENCY_LABELS[breakdown.payFrequency]} view)
        </p>
        <div className="flex h-4 overflow-hidden rounded-full">
          {breakdown.grossAnnual > 0 && (
            <>
              <div
                className="bg-blue-500"
                style={{ width: `${(breakdown.incomeTax / breakdown.grossAnnual) * 100}%` }}
                title="Income tax"
              />
              <div
                className="bg-purple-500"
                style={{ width: `${(breakdown.usc / breakdown.grossAnnual) * 100}%` }}
                title="USC"
              />
              <div
                className="bg-amber-500"
                style={{ width: `${(breakdown.prsi / breakdown.grossAnnual) * 100}%` }}
                title="PRSI"
              />
              <div
                className="bg-emerald-500"
                style={{ width: `${(breakdown.netAnnual / breakdown.grossAnnual) * 100}%` }}
                title="Take-home"
              />
            </>
          )}
        </div>
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-600">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-500" /> Income tax</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-purple-500" /> USC</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" /> PRSI</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Take-home</span>
        </div>
      </div>
    </div>
  );
}
