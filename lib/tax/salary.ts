/**
 * Pay frequency utilities and paycheck orchestration.
 * Combines federal, state, and FICA modules into a full breakdown.
 */

import type {
  FilingStatus,
  PayFrequency,
  PaycheckBreakdown,
  PaycheckInput,
} from "@/types/tax";
import { calculateFederalTax } from "./federal";
import { calculateStateTax } from "./state";
import { calculateFica } from "./fica";
import { getTaxData } from "./data-loader";

/** Pay periods per year for each frequency. */
export const PAY_PERIODS: Record<PayFrequency, number> = {
  weekly: 52,
  biweekly: 26,
  semi_monthly: 24,
  monthly: 12,
};

/** Human-readable labels for pay frequencies. */
export const PAY_FREQUENCY_LABELS: Record<PayFrequency, string> = {
  weekly: "Weekly",
  biweekly: "Biweekly",
  semi_monthly: "Semi-monthly",
  monthly: "Monthly",
};

/** Human-readable labels for filing statuses. */
export const FILING_STATUS_LABELS: Record<FilingStatus, string> = {
  single: "Single",
  married_joint: "Married Filing Jointly",
  head_of_household: "Head of Household",
};

/** Convert annual salary to per-paycheck gross amount. */
export function grossPerPaycheck(
  annualSalary: number,
  payFrequency: PayFrequency,
): number {
  return annualSalary / PAY_PERIODS[payFrequency];
}

/** Convert hourly wage to annual salary (2080 hours = standard full-time). */
export function hourlyToAnnual(hourlyRate: number, hoursPerWeek = 40): number {
  return hourlyRate * hoursPerWeek * 52;
}

/** Convert annual salary to hourly rate. */
export function annualToHourly(annualSalary: number, hoursPerWeek = 40): number {
  return annualSalary / (hoursPerWeek * 52);
}

/** Calculate overtime pay (1.5x standard rate by default). */
export function calculateOvertimePay(
  hourlyRate: number,
  overtimeHours: number,
  multiplier = 1.5,
): number {
  return hourlyRate * multiplier * overtimeHours;
}

/** Estimate supplemental/bonus tax using flat 22% federal + FICA method. */
export function calculateBonusTax(
  bonusAmount: number,
  filingStatus: FilingStatus,
  stateCode: string,
): {
  federal: number;
  state: number;
  fica: number;
  net: number;
} {
  const { fica, states } = getTaxData();
  const federalFlatRate = 0.22; // IRS supplemental wage rate
  const federalTax = bonusAmount * federalFlatRate;

  const stateData = states.find((s) => s.code === stateCode);
  const stateResult = stateData
    ? calculateStateTax(bonusAmount, filingStatus, stateData)
    : { tax: 0 };

  const ficaResult = calculateFica(bonusAmount, filingStatus, fica);
  const totalTax = federalTax + stateResult.tax + ficaResult.total;

  return {
    federal: federalTax,
    state: stateResult.tax,
    fica: ficaResult.total,
    net: bonusAmount - totalTax,
  };
}

/**
 * Main paycheck calculation — orchestrates all tax modules.
 * Pure function suitable for server and client use.
 */
export function calculatePaycheck(input: PaycheckInput): PaycheckBreakdown {
  const { annualSalary, stateCode, filingStatus, payFrequency } = input;
  const { federal, fica, states } = getTaxData();

  const stateData = states.find((s) => s.code === stateCode);
  if (!stateData) {
    throw new Error(`Unknown state code: ${stateCode}`);
  }

  const federalResult = calculateFederalTax(annualSalary, filingStatus, federal);
  const stateResult = calculateStateTax(annualSalary, filingStatus, stateData);
  const ficaResult = calculateFica(annualSalary, filingStatus, fica);

  const totalTax =
    federalResult.tax + stateResult.tax + ficaResult.total;
  const netAnnual = annualSalary - totalTax;
  const periods = PAY_PERIODS[payFrequency];

  return {
    grossAnnual: annualSalary,
    federalTax: federalResult.tax,
    stateTax: stateResult.tax,
    socialSecurity: ficaResult.socialSecurity,
    medicare: ficaResult.medicare,
    totalTax,
    netAnnual,
    netMonthly: netAnnual / 12,
    netPerPaycheck: netAnnual / periods,
    effectiveTaxRate: annualSalary > 0 ? totalTax / annualSalary : 0,
    marginalFederalRate: federalResult.marginalRate,
    marginalStateRate: stateResult.marginalRate,
  };
}
