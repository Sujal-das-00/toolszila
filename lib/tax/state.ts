/**
 * State income tax calculator.
 * Supports none, flat, and progressive state tax structures via JSON data.
 */

import { calculateProgressiveTax, getMarginalRate } from "./federal";
import type {
  FilingStatus,
  StateTaxData,
} from "@/types/tax";

/** Calculate annual state income tax estimate. */
export function calculateStateTax(
  grossAnnual: number,
  filingStatus: FilingStatus,
  state: StateTaxData,
): { tax: number; marginalRate: number } {
  if (!state.hasIncomeTax || state.taxType === "none") {
    return { tax: 0, marginalRate: 0 };
  }

  const stateDeduction = state.standardDeduction?.[filingStatus] ?? 0;
  const taxableIncome = Math.max(grossAnnual - stateDeduction, 0);

  if (state.taxType === "flat" && state.flatRate !== undefined) {
    return {
      tax: taxableIncome * state.flatRate,
      marginalRate: state.flatRate,
    };
  }

  if (state.taxType === "progressive" && state.brackets) {
    const brackets = state.brackets[filingStatus];
    const tax = calculateProgressiveTax(taxableIncome, brackets);
    const marginalRate = getMarginalRate(taxableIncome, brackets);
    return { tax, marginalRate };
  }

  return { tax: 0, marginalRate: 0 };
}
