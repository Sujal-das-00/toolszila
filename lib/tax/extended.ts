import type { FilingStatus } from "@/types/tax";
import { calculateFederalTax } from "./federal";
import { calculateStateTax } from "./state";
import { calculateFica } from "./fica";
import { getTaxData } from "./data-loader";

export interface TotalTaxEstimate {
  grossAnnual: number;
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  medicare: number;
  totalTax: number;
  netAfterTax: number;
  effectiveTaxRate: number;
  marginalFederalRate: number;
  marginalStateRate: number;
}

export interface IncomeTaxEstimate {
  grossAnnual: number;
  federalTaxableIncome: number;
  stateTaxableIncome: number;
  federalTax: number;
  stateTax: number;
  totalIncomeTax: number;
  netAfterIncomeTax: number;
  effectiveIncomeTaxRate: number;
  marginalFederalRate: number;
  marginalStateRate: number;
}

export interface SelfEmploymentTaxEstimate {
  netSelfEmploymentIncome: number;
  scheduleSEIncome: number;
  remainingSocialSecurityWageBase: number;
  socialSecurityTax: number;
  medicareTax: number;
  additionalMedicareTax: number;
  scheduleSETax: number;
  totalTax: number;
  deductibleHalf: number;
}

export interface SocialSecurityTaxEstimate {
  wages: number;
  wageBase: number;
  taxableWages: number;
  employeeTax: number;
  employerMatch: number;
  selfEmployedEquivalent: number;
  wagesAboveBase: number;
}

export function calculateTotalTaxEstimate(
  annualIncome: number,
  filingStatus: FilingStatus,
  stateCode: string,
): TotalTaxEstimate {
  const { federal, fica, states } = getTaxData();
  const state = states.find((item) => item.code === stateCode);

  if (!state) {
    throw new Error(`Unknown state code: ${stateCode}`);
  }

  const federalResult = calculateFederalTax(annualIncome, filingStatus, federal);
  const stateResult = calculateStateTax(annualIncome, filingStatus, state);
  const ficaResult = calculateFica(annualIncome, filingStatus, fica);
  const totalTax = federalResult.tax + stateResult.tax + ficaResult.total;

  return {
    grossAnnual: annualIncome,
    federalTax: federalResult.tax,
    stateTax: stateResult.tax,
    socialSecurity: ficaResult.socialSecurity,
    medicare: ficaResult.medicare,
    totalTax,
    netAfterTax: annualIncome - totalTax,
    effectiveTaxRate: annualIncome > 0 ? totalTax / annualIncome : 0,
    marginalFederalRate: federalResult.marginalRate,
    marginalStateRate: stateResult.marginalRate,
  };
}

export function calculateIncomeTaxEstimate(
  annualIncome: number,
  filingStatus: FilingStatus,
  stateCode: string,
): IncomeTaxEstimate {
  const { federal, states } = getTaxData();
  const state = states.find((item) => item.code === stateCode);

  if (!state) {
    throw new Error(`Unknown state code: ${stateCode}`);
  }

  const federalTaxableIncome = Math.max(annualIncome - federal.standardDeduction[filingStatus], 0);
  const stateDeduction = state.standardDeduction?.[filingStatus] ?? 0;
  const stateTaxableIncome = Math.max(annualIncome - stateDeduction, 0);
  const federalResult = calculateFederalTax(annualIncome, filingStatus, federal);
  const stateResult = calculateStateTax(annualIncome, filingStatus, state);
  const totalIncomeTax = federalResult.tax + stateResult.tax;

  return {
    grossAnnual: annualIncome,
    federalTaxableIncome,
    stateTaxableIncome,
    federalTax: federalResult.tax,
    stateTax: stateResult.tax,
    totalIncomeTax,
    netAfterIncomeTax: annualIncome - totalIncomeTax,
    effectiveIncomeTaxRate: annualIncome > 0 ? totalIncomeTax / annualIncome : 0,
    marginalFederalRate: federalResult.marginalRate,
    marginalStateRate: stateResult.marginalRate,
  };
}

export function calculateSelfEmploymentTaxEstimate(
  netSelfEmploymentIncome: number,
  filingStatus: FilingStatus,
  wagesAlreadySubjectToSocialSecurity = 0,
  medicareWagesAlreadyEarned = 0,
): SelfEmploymentTaxEstimate {
  const { fica } = getTaxData();
  const scheduleSEIncome = Math.max(netSelfEmploymentIncome * 0.9235, 0);
  const remainingSocialSecurityWageBase = Math.max(
    fica.socialSecurity.wageBase - wagesAlreadySubjectToSocialSecurity,
    0,
  );
  const socialSecurityTaxableIncome = Math.min(scheduleSEIncome, remainingSocialSecurityWageBase);
  const socialSecurityTax = socialSecurityTaxableIncome * fica.socialSecurity.rate * 2;
  const medicareTax = scheduleSEIncome * fica.medicare.rate * 2;
  const reducedThreshold = Math.max(
    fica.medicare.additionalThreshold[filingStatus] - medicareWagesAlreadyEarned,
    0,
  );
  const additionalMedicareTax = Math.max(scheduleSEIncome - reducedThreshold, 0) * fica.medicare.additionalRate;
  const scheduleSETax = socialSecurityTax + medicareTax;

  return {
    netSelfEmploymentIncome,
    scheduleSEIncome,
    remainingSocialSecurityWageBase,
    socialSecurityTax,
    medicareTax,
    additionalMedicareTax,
    scheduleSETax,
    totalTax: scheduleSETax + additionalMedicareTax,
    deductibleHalf: scheduleSETax / 2,
  };
}

export function calculateSocialSecurityTaxEstimate(
  wages: number,
): SocialSecurityTaxEstimate {
  const { fica } = getTaxData();
  const taxableWages = Math.min(Math.max(wages, 0), fica.socialSecurity.wageBase);
  const employeeTax = taxableWages * fica.socialSecurity.rate;

  return {
    wages,
    wageBase: fica.socialSecurity.wageBase,
    taxableWages,
    employeeTax,
    employerMatch: employeeTax,
    selfEmployedEquivalent: employeeTax * 2,
    wagesAboveBase: Math.max(wages - fica.socialSecurity.wageBase, 0),
  };
}
