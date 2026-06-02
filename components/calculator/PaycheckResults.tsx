import type { PaycheckBreakdown } from "@/types/tax";
import type { PayFrequency } from "@/types/tax";
import { PAY_FREQUENCY_LABELS } from "@/lib/tax";
import { ResultCard } from "@/components/ui/Card";
import { formatMoney, formatPct } from "@/lib/utils";

interface PaycheckResultsProps {
  breakdown: PaycheckBreakdown;
  payFrequency: PayFrequency;
}

/** Server-compatible results display — no client JS required. */
export function PaycheckResults({ breakdown, payFrequency }: PaycheckResultsProps) {
  const freqLabel = PAY_FREQUENCY_LABELS[payFrequency];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Your Paycheck Breakdown</h2>
        <p className="mt-1 text-sm text-slate-600">
          Effective tax rate: {formatPct(breakdown.effectiveTaxRate)}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <ResultCard label="Gross Annual Income" value={formatMoney(breakdown.grossAnnual)} />
        <ResultCard
          label="Net Annual (Take-Home)"
          value={formatMoney(breakdown.netAnnual)}
          highlight
        />
        <ResultCard
          label={`Net Per Paycheck (${freqLabel})`}
          value={formatMoney(breakdown.netPerPaycheck, true)}
          highlight
        />
        <ResultCard label="Monthly Take-Home" value={formatMoney(breakdown.netMonthly, true)} />
        <ResultCard label="Federal Income Tax" value={formatMoney(breakdown.federalTax)} />
        <ResultCard label="State Income Tax" value={formatMoney(breakdown.stateTax)} />
        <ResultCard label="Social Security" value={formatMoney(breakdown.socialSecurity)} />
        <ResultCard label="Medicare" value={formatMoney(breakdown.medicare)} />
        <ResultCard label="Total Taxes" value={formatMoney(breakdown.totalTax)} />
      </div>

      {/* Visual breakdown bar — pure CSS, no layout shift */}
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <p className="mb-3 text-sm font-medium text-slate-700">Tax Allocation</p>
        <div className="flex h-4 overflow-hidden rounded-full">
          {breakdown.grossAnnual > 0 && (
            <>
              <div
                className="bg-blue-500"
                style={{
                  width: `${(breakdown.federalTax / breakdown.grossAnnual) * 100}%`,
                }}
                title="Federal"
              />
              <div
                className="bg-purple-500"
                style={{
                  width: `${(breakdown.stateTax / breakdown.grossAnnual) * 100}%`,
                }}
                title="State"
              />
              <div
                className="bg-amber-500"
                style={{
                  width: `${(breakdown.socialSecurity / breakdown.grossAnnual) * 100}%`,
                }}
                title="Social Security"
              />
              <div
                className="bg-orange-500"
                style={{
                  width: `${(breakdown.medicare / breakdown.grossAnnual) * 100}%`,
                }}
                title="Medicare"
              />
              <div
                className="bg-emerald-500"
                style={{
                  width: `${(breakdown.netAnnual / breakdown.grossAnnual) * 100}%`,
                }}
                title="Take-home"
              />
            </>
          )}
        </div>
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-600">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-blue-500" /> Federal
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-purple-500" /> State
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-amber-500" /> SS
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-orange-500" /> Medicare
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Take-home
          </span>
        </div>
      </div>
    </div>
  );
}
