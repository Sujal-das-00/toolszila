import Link from "next/link";
import { CALCULATOR_TOOLS } from "@/lib/constants";
import { getLiveTools } from "@/lib/navigation/site-architecture";
import { salaryPageSlug, statePageSlug } from "@/lib/pseo/routes";
import { getTaxData } from "@/lib/tax";

interface InternalLinksProps {
  variant: "states" | "salaries" | "calculators" | "tax" | "mixed";
  currentSlug?: string;
}

export function InternalLinks({ variant, currentSlug }: InternalLinksProps) {
  const states = getTaxData().states;
  const salaries = [50000, 60000, 75000, 100000, 125000, 150000, 200000, 250000, 300000];
  const taxTools = getLiveTools().filter((tool) => tool.category === "tax");

  if (variant === "states" || variant === "mixed") {
    return (
      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">Paycheck Calculators by State</h2>
        <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {states.map((state) => {
            const slug = statePageSlug(state.slug);
            if (slug === currentSlug) return null;
            return (
              <li key={state.code}>
                <Link
                  href={`/${slug}`}
                  className="text-sm text-emerald-700 hover:text-emerald-800 hover:underline"
                >
                  {state.name} Paycheck Calculator
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }

  if (variant === "salaries") {
    return (
      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">Salary After Tax Guides</h2>
        <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {salaries.map((amount) => {
            const slug = salaryPageSlug(amount);
            if (slug === currentSlug) return null;
            return (
              <li key={amount}>
                <Link
                  href={`/${slug}`}
                  className="text-sm text-emerald-700 hover:text-emerald-800 hover:underline"
                >
                  ${amount.toLocaleString()} After Tax
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }

  if (variant === "tax") {
    return (
      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">Related Tax Calculators</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {taxTools.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={`/calculators/${tool.category}/${tool.slug}`}
                className="block rounded-lg border border-slate-200 bg-white p-4 hover:border-emerald-300 hover:shadow-sm"
              >
                <span className="font-medium text-slate-900">{tool.title}</span>
                <p className="mt-1 text-sm text-slate-600">{tool.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-slate-900">Related Calculators</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {CALCULATOR_TOOLS.map((tool) => (
          <li key={tool.slug}>
            <Link
              href={tool.href}
              className="block rounded-lg border border-slate-200 bg-white p-4 hover:border-emerald-300 hover:shadow-sm"
            >
              <span className="font-medium text-slate-900">{tool.title}</span>
              <p className="mt-1 text-sm text-slate-600">{tool.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function RelatedLinks({ currentSlug }: { currentSlug?: string }) {
  return (
    <>
      <InternalLinks variant="calculators" />
      <InternalLinks variant="salaries" currentSlug={currentSlug} />
    </>
  );
}
