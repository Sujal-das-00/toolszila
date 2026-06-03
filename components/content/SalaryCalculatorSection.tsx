import { Card } from "@/components/ui/Card";

export function SalaryCalculatorSection() {
  return (
    <section className="mt-12" aria-labelledby="salary-calculator-guide-heading">
      <h2
        id="salary-calculator-guide-heading"
        className="text-2xl font-bold tracking-tight text-slate-900"
      >
        How to Use This Salary Calculator
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
        This salary calculator is designed for salaried employees who want to translate one annual
        pay number into monthly and per-paycheck take-home pay. It combines gross-pay math with
        federal, FICA, and state withholding estimates so the result is more useful than a simple
        annual-to-monthly conversion.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <h3 className="font-semibold text-slate-900">1. Start with annual salary</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Enter your gross annual salary before taxes, retirement contributions, insurance
            premiums, and other deductions.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold text-slate-900">2. Select your state</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            State choice matters because California paycheck calculations include state withholding,
            while Texas and Florida paycheck calculations do not include state wage tax.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold text-slate-900">3. Choose pay frequency</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Weekly, biweekly, semi-monthly, and monthly schedules change how much lands in each
            paycheck even when annual salary stays the same.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold text-slate-900">4. Review net pay</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Use the results to compare annual take-home pay, monthly budgeting income, and
            paycheck-level withholding before final payroll decisions.
          </p>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card>
          <h3 className="font-semibold text-slate-900">Best for salaried roles</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Use this tool when you already know your annual salary and need realistic paycheck
            planning for job offers, relocation, and household budgeting.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold text-slate-900">Use another tool when needed</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Switch to the hourly to salary calculator for wage conversion, the overtime calculator
            for premium pay, or the bonus tax calculator for supplemental wages.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold text-slate-900">Important limits</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Results do not automatically include local taxes, pre-tax benefits, equity comp,
            custom W-4 settings, or employer-specific payroll practices.
          </p>
        </Card>
      </div>
    </section>
  );
}
