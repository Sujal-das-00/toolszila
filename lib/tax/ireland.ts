export type IrelandMaritalStatus = "single" | "married_one_income" | "married_two_incomes";
export type IrelandPayFrequency = "weekly" | "monthly" | "annual";

export interface IrelandTaxInput {
  annualSalary: number;
  maritalStatus: IrelandMaritalStatus;
  payFrequency: IrelandPayFrequency;
}

export interface IrelandTaxBreakdown {
  grossAnnual: number;
  incomeTax: number;
  usc: number;
  prsi: number;
  totalDeductions: number;
  netAnnual: number;
  netMonthly: number;
  netWeekly: number;
  netPerPeriod: number;
  effectiveTaxRate: number;
  standardRateBand: number;
  maritalStatus: IrelandMaritalStatus;
  payFrequency: IrelandPayFrequency;
}

export const IRELAND_TAX_YEAR = 2026;
export const IRELAND_PERSONAL_TAX_CREDIT = 2_000;
export const IRELAND_PAYE_TAX_CREDIT = 2_000;
export const IRELAND_TOTAL_TAX_CREDITS = IRELAND_PERSONAL_TAX_CREDIT + IRELAND_PAYE_TAX_CREDIT;
export const IRELAND_SINGLE_STANDARD_RATE_BAND = 44_000;
export const IRELAND_MARRIED_ONE_INCOME_STANDARD_RATE_BAND = 53_000;
export const IRELAND_MARRIED_TWO_INCOMES_STANDARD_RATE_BAND = 88_000;
export const IRELAND_PRSI_RATE = 0.042;
export const IRELAND_PRSI_ANNUAL_THRESHOLD = 18_304;
export const IRELAND_USC_CLIFF_EDGE = 13_000;

export const IRELAND_SALARY_AMOUNTS = [
  30_000,
  35_000,
  40_000,
  45_000,
  50_000,
  55_000,
  60_000,
  70_000,
  80_000,
  100_000,
] as const;

export const IRELAND_MARITAL_STATUS_LABELS: Record<IrelandMaritalStatus, string> = {
  single: "Single",
  married_one_income: "Married, one income",
  married_two_incomes: "Married, two incomes",
};

export const IRELAND_PAY_FREQUENCY_LABELS: Record<IrelandPayFrequency, string> = {
  weekly: "Weekly",
  monthly: "Monthly",
  annual: "Annual",
};

export function irelandAfterTaxSlug(amount: number): string {
  return `${amount}-after-tax-ireland`;
}

export function getIrelandAdjacentSalaries(amount: number): {
  lower: number | null;
  higher: number | null;
} {
  const index = IRELAND_SALARY_AMOUNTS.indexOf(amount as (typeof IRELAND_SALARY_AMOUNTS)[number]);
  return {
    lower: index > 0 ? IRELAND_SALARY_AMOUNTS[index - 1] : null,
    higher: index >= 0 && index < IRELAND_SALARY_AMOUNTS.length - 1 ? IRELAND_SALARY_AMOUNTS[index + 1] : null,
  };
}

export function standardRateBandForStatus(status: IrelandMaritalStatus): number {
  switch (status) {
    case "married_one_income":
      return IRELAND_MARRIED_ONE_INCOME_STANDARD_RATE_BAND;
    case "married_two_incomes":
      return IRELAND_MARRIED_TWO_INCOMES_STANDARD_RATE_BAND;
    case "single":
    default:
      return IRELAND_SINGLE_STANDARD_RATE_BAND;
  }
}

export function calculateIrelandIncomeTax(grossAnnual: number, maritalStatus: IrelandMaritalStatus): number {
  const standardBand = standardRateBandForStatus(maritalStatus);
  const standardRateTax = Math.min(grossAnnual, standardBand) * 0.2;
  const higherRateTax = Math.max(0, grossAnnual - standardBand) * 0.4;
  return Math.max(0, standardRateTax + higherRateTax - IRELAND_TOTAL_TAX_CREDITS);
}

export function calculateIrelandUsc(grossAnnual: number): number {
  if (grossAnnual <= IRELAND_USC_CLIFF_EDGE) return 0;

  const band1 = Math.min(grossAnnual, 12_012) * 0.005;
  const band2 = Math.max(0, Math.min(grossAnnual, 28_700) - 12_012) * 0.02;
  const band3 = Math.max(0, Math.min(grossAnnual, 70_044) - 28_700) * 0.03;
  const band4 = Math.max(0, grossAnnual - 70_044) * 0.08;
  return band1 + band2 + band3 + band4;
}

export function calculateIrelandPrsi(grossAnnual: number): number {
  if (grossAnnual <= IRELAND_PRSI_ANNUAL_THRESHOLD) return 0;
  return grossAnnual * IRELAND_PRSI_RATE;
}

export function calculateIrelandTax(input: IrelandTaxInput): IrelandTaxBreakdown {
  const grossAnnual = Math.max(0, input.annualSalary);
  const incomeTax = calculateIrelandIncomeTax(grossAnnual, input.maritalStatus);
  const usc = calculateIrelandUsc(grossAnnual);
  const prsi = calculateIrelandPrsi(grossAnnual);
  const totalDeductions = incomeTax + usc + prsi;
  const netAnnual = grossAnnual - totalDeductions;
  const netMonthly = netAnnual / 12;
  const netWeekly = netAnnual / 52;
  const netPerPeriod = input.payFrequency === "weekly" ? netWeekly : input.payFrequency === "monthly" ? netMonthly : netAnnual;

  return {
    grossAnnual,
    incomeTax,
    usc,
    prsi,
    totalDeductions,
    netAnnual,
    netMonthly,
    netWeekly,
    netPerPeriod,
    effectiveTaxRate: grossAnnual > 0 ? totalDeductions / grossAnnual : 0,
    standardRateBand: standardRateBandForStatus(input.maritalStatus),
    maritalStatus: input.maritalStatus,
    payFrequency: input.payFrequency,
  };
}

export function formatEuro(amount: number, cents = false): string {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  }).format(amount);
}

export function formatIrelandPercent(rate: number): string {
  return `${(rate * 100).toFixed(1)}%`;
}
