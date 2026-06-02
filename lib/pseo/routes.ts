import { getTaxData } from "@/lib/tax";
import { SALARY_AMOUNTS } from "@/lib/constants";
import type { StateTaxData } from "@/types/tax";

/** PSEO page types for the dynamic [slug] route. */
export type PseoPageType = "state" | "salary";

export interface StatePageData {
  type: "state";
  slug: string;
  state: StateTaxData;
}

export interface SalaryPageData {
  type: "salary";
  slug: string;
  amount: number;
}

export type PseoPageData = StatePageData | SalaryPageData;

const STATE_SUFFIX = "-paycheck-calculator";
const SALARY_SUFFIX = "-salary-after-tax";

/** Build state page slug from state slug. */
export function statePageSlug(stateSlug: string): string {
  return `${stateSlug}${STATE_SUFFIX}`;
}

/** Build salary page slug from amount. */
export function salaryPageSlug(amount: number): string {
  return `${amount}${SALARY_SUFFIX}`;
}

/** Parse a URL slug into PSEO page data, or null if invalid. */
export function parsePseoSlug(slug: string): PseoPageData | null {
  if (slug.endsWith(STATE_SUFFIX)) {
    const stateSlug = slug.slice(0, -STATE_SUFFIX.length);
    const state = getTaxData().states.find((s) => s.slug === stateSlug);
    if (!state) return null;
    return { type: "state", slug, state };
  }

  if (slug.endsWith(SALARY_SUFFIX)) {
    const amountStr = slug.slice(0, -SALARY_SUFFIX.length);
    const amount = parseInt(amountStr, 10);
    if (isNaN(amount) || !SALARY_AMOUNTS.includes(amount)) return null;
    return { type: "salary", slug, amount };
  }

  return null;
}

/** Generate all static params for PSEO pages (states + salaries). */
export function getAllPseoSlugs(): string[] {
  const { states } = getTaxData();
  const stateSlugs = states.map((s) => statePageSlug(s.slug));
  const salarySlugs = SALARY_AMOUNTS.map(salaryPageSlug);
  return [...stateSlugs, ...salarySlugs];
}

/** Get neighboring salary amounts for internal linking. */
export function getAdjacentSalaries(amount: number): {
  lower: number | null;
  higher: number | null;
} {
  const index = SALARY_AMOUNTS.indexOf(amount);
  return {
    lower: index > 0 ? SALARY_AMOUNTS[index - 1] : null,
    higher: index < SALARY_AMOUNTS.length - 1 ? SALARY_AMOUNTS[index + 1] : null,
  };
}

/** Get featured states for cross-linking (mix of no-tax and high-tax). */
export function getFeaturedStates(): StateTaxData[] {
  const slugs = ["texas", "california", "florida", "new-york", "pennsylvania", "illinois"];
  return slugs
    .map((slug) => getTaxData().states.find((s) => s.slug === slug))
    .filter((s): s is StateTaxData => s !== undefined);
}
