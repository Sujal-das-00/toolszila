/**
 * Federal income tax calculator.
 * Uses progressive bracket math on taxable income (gross minus standard deduction).
 * Designed for annual paycheck estimation — not a full 1040 simulator.
 */

import type {
  FederalTaxData,
  FilingStatus,
  TaxBracket,
} from "@/types/tax";

/** Calculate federal income tax from taxable income using bracket tables. */
export function calculateProgressiveTax(
  taxableIncome: number,
  brackets: TaxBracket[],
): number {
  if (taxableIncome <= 0) return 0;

  let tax = 0;
  let previousMax = 0;

  for (const bracket of brackets) {
    const bracketWidth = bracket.max - previousMax;
    const incomeInBracket = Math.min(
      Math.max(taxableIncome - previousMax, 0),
      bracketWidth,
    );
    tax += incomeInBracket * bracket.rate;
    previousMax = bracket.max;

    if (taxableIncome <= bracket.max) break;
  }

  return tax;
}

/** Get marginal federal rate at a given taxable income level. */
export function getMarginalRate(
  taxableIncome: number,
  brackets: TaxBracket[],
): number {
  if (taxableIncome <= 0) return brackets[0]?.rate ?? 0;

  for (const bracket of brackets) {
    if (taxableIncome <= bracket.max) return bracket.rate;
  }

  return brackets[brackets.length - 1]?.rate ?? 0;
}

/** Calculate annual federal income tax withholding estimate. */
export function calculateFederalTax(
  grossAnnual: number,
  filingStatus: FilingStatus,
  data: FederalTaxData,
): { tax: number; marginalRate: number } {
  const deduction = data.standardDeduction[filingStatus];
  const taxableIncome = Math.max(grossAnnual - deduction, 0);
  const brackets = data.brackets[filingStatus];
  const tax = calculateProgressiveTax(taxableIncome, brackets);
  const marginalRate = getMarginalRate(taxableIncome, brackets);

  return { tax, marginalRate };
}
