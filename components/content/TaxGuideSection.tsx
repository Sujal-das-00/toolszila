import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/seo/metadata";
import { getTaxData, taxYears } from "@/lib/tax";

export type TaxGuideKind =
  | "tax-calculator"
  | "income-tax-calculator"
  | "federal-tax-calculator"
  | "self-employment-tax-calculator"
  | "social-security-tax-calculator";

export function TaxGuideSection({ kind }: { kind: TaxGuideKind }) {
  const wageBase = formatCurrency(getTaxData().fica.socialSecurity.wageBase);

  const guides: Record<TaxGuideKind, {
    title: string;
    formula: string;
    example: string;
    notes: string[];
  }> = {
    "tax-calculator": {
      title: "How This Tax Calculator Works",
      formula: "Federal tax + state tax + Social Security + Medicare = estimated total annual tax",
      example: "A salary-based tax estimate combines income tax and payroll tax to show both annual taxes and after-tax income.",
      notes: [
        "Use this page when you want a broad annual tax estimate, not only income tax.",
        "Results do not automatically include local taxes, tax credits, itemized deductions, or benefit elections.",
        `Social Security is capped at the ${taxYears.fica} wage base of ${wageBase}.`,
      ],
    },
    "income-tax-calculator": {
      title: "How the Income Tax Calculator Works",
      formula: "Federal income tax + state income tax = estimated income tax before payroll taxes",
      example: "Use this estimate when you want to isolate income taxes from Social Security and Medicare withholding.",
      notes: [
        "This calculator excludes Social Security and Medicare on purpose.",
        "Federal taxable income is reduced by the standard deduction, while states follow their own rules.",
        "It is useful for relocation planning and comparing state tax drag on the same salary.",
      ],
    },
    "federal-tax-calculator": {
      title: "How Federal Income Tax Is Estimated",
      formula: "Annual income - standard deduction = taxable income, then progressive brackets determine federal tax",
      example: "The calculator applies the current federal standard deduction first, then taxes each bracket layer at its marginal rate.",
      notes: [
        `This page uses ${taxYears.federal} federal tax brackets and standard deductions.`,
        "It does not include state income tax, Social Security, Medicare, or tax credits.",
        "Use it when you want a fast bracket-based federal estimate before building a full paycheck model.",
      ],
    },
    "self-employment-tax-calculator": {
      title: "How Self-Employment Tax Is Estimated",
      formula: "Net business income × 92.35% = Schedule SE income, then apply Social Security and Medicare rates",
      example: "The calculator adjusts net earnings first, applies the Social Security wage base limit, and then estimates Medicare tax on the adjusted earnings.",
      notes: [
        "Optional wage inputs help reduce the remaining Social Security wage base when you also have W-2 income.",
        "Additional Medicare tax is estimated separately because it is not the same as Schedule SE tax.",
        "Federal and state income tax on business profits are not included on this page.",
      ],
    },
    "social-security-tax-calculator": {
      title: "How Social Security Tax Is Estimated",
      formula: "Taxable wages up to the wage base × 6.2% = employee Social Security tax",
      example: `Wages above ${wageBase} stop increasing the employee Social Security tax for ${taxYears.fica}.`,
      notes: [
        "This page focuses on Social Security tax only, not Medicare or income tax.",
        "It shows the employer match and the self-employed equivalent for planning purposes.",
        "Use it to understand how much of your wages remain subject to the wage base cap.",
      ],
    },
  };

  const guide = guides[kind];

  return (
    <section className="mt-12" aria-labelledby="tax-guide-heading">
      <h2 id="tax-guide-heading" className="text-2xl font-bold tracking-tight text-slate-900">
        {guide.title}
      </h2>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card>
          <h3 className="font-semibold text-slate-900">Core formula</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{guide.formula}</p>
        </Card>
        <Card>
          <h3 className="font-semibold text-slate-900">Best use case</h3>
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
