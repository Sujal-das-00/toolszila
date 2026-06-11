export type NzMaritalStatus = "single" | "married_one_income" | "married_two_incomes" | "single_parent";
export type NzDependents = "none" | "one_plus";
export type NzPayFrequency = "weekly" | "fortnightly" | "monthly" | "annual";
export type NzKiwiSaverRate = 0 | 0.03 | 0.035 | 0.04 | 0.06 | 0.08 | 0.1;

export interface NzTaxInput {
  annualSalary: number;
  maritalStatus: NzMaritalStatus;
  dependents: NzDependents;
  payFrequency: NzPayFrequency;
  kiwiSaverRate: NzKiwiSaverRate;
  hasStudentLoan: boolean;
}

export interface NzTaxBreakdown {
  grossAnnual: number;
  payeIncomeTax: number;
  accLevy: number;
  kiwiSaver: number;
  studentLoan: number;
  familyCreditEstimate: number;
  totalDeductions: number;
  netAnnual: number;
  netFortnightly: number;
  netMonthly: number;
  netWeekly: number;
  netPerPeriod: number;
  effectiveTaxRate: number;
  maritalStatus: NzMaritalStatus;
  dependents: NzDependents;
  payFrequency: NzPayFrequency;
  kiwiSaverRate: NzKiwiSaverRate;
  hasStudentLoan: boolean;
}

export const NZ_TAX_YEAR = "2026/27";
export const NZ_TAX_YEAR_PERIOD = "1 April 2026 – 31 March 2027";
export const NZ_ACC_EARNERS_LEVY_RATE = 0.0175;
export const NZ_ACC_EARNINGS_CAP = 156_641;
export const NZ_ACC_MAX_LEVY = NZ_ACC_EARNINGS_CAP * NZ_ACC_EARNERS_LEVY_RATE;
export const NZ_STUDENT_LOAN_THRESHOLD = 24_128;
export const NZ_STUDENT_LOAN_RATE = 0.12;
export const NZ_DEFAULT_KIWISAVER_RATE = 0.035;

export const NZ_SALARY_AMOUNTS = [30_000, 40_000, 50_000, 60_000, 70_000, 80_000, 100_000, 120_000] as const;

export const NZ_MARITAL_STATUS_LABELS: Record<NzMaritalStatus, string> = {
  single: "Single",
  married_one_income: "Married, one income",
  married_two_incomes: "Married, two incomes",
  single_parent: "Single parent",
};

export const NZ_DEPENDENTS_LABELS: Record<NzDependents, string> = {
  none: "None",
  one_plus: "1+ children for WFTC purposes",
};

export const NZ_PAY_FREQUENCY_LABELS: Record<NzPayFrequency, string> = {
  weekly: "Weekly",
  fortnightly: "Fortnightly",
  monthly: "Monthly",
  annual: "Annual",
};

export const NZ_KIWISAVER_OPTIONS: readonly { value: NzKiwiSaverRate; label: string }[] = [
  { value: 0, label: "None" },
  { value: 0.03, label: "3%" },
  { value: 0.035, label: "3.5%" },
  { value: 0.04, label: "4%" },
  { value: 0.06, label: "6%" },
  { value: 0.08, label: "8%" },
  { value: 0.1, label: "10%" },
];

const NZ_PAYE_BRACKETS = [
  { max: 15_600, rate: 0.105 },
  { max: 53_500, rate: 0.175 },
  { max: 78_100, rate: 0.3 },
  { max: 180_000, rate: 0.33 },
  { max: Infinity, rate: 0.39 },
] as const;

export function nzAfterTaxSlug(amount: number): string {
  return `${amount}-after-tax-nz`;
}

export function getNzAdjacentSalaries(amount: number): { lower: number | null; higher: number | null } {
  const index = NZ_SALARY_AMOUNTS.indexOf(amount as (typeof NZ_SALARY_AMOUNTS)[number]);
  return {
    lower: index > 0 ? NZ_SALARY_AMOUNTS[index - 1] : null,
    higher: index >= 0 && index < NZ_SALARY_AMOUNTS.length - 1 ? NZ_SALARY_AMOUNTS[index + 1] : null,
  };
}

export function calculateNzPayeIncomeTax(grossAnnual: number): number {
  let remaining = Math.max(0, grossAnnual);
  let previousMax = 0;
  let tax = 0;

  for (const bracket of NZ_PAYE_BRACKETS) {
    if (remaining <= 0) break;
    const bandSize = bracket.max === Infinity ? remaining : Math.max(0, bracket.max - previousMax);
    const taxableInBand = Math.min(remaining, bandSize);
    tax += taxableInBand * bracket.rate;
    remaining -= taxableInBand;
    previousMax = bracket.max;
  }

  return tax;
}

export function calculateNzAccLevy(grossAnnual: number): number {
  return Math.min(Math.max(0, grossAnnual), NZ_ACC_EARNINGS_CAP) * NZ_ACC_EARNERS_LEVY_RATE;
}

export function calculateNzStudentLoan(grossAnnual: number, hasStudentLoan: boolean): number {
  if (!hasStudentLoan) return 0;
  return Math.max(0, grossAnnual - NZ_STUDENT_LOAN_THRESHOLD) * NZ_STUDENT_LOAN_RATE;
}

export function calculateNzKiwiSaver(grossAnnual: number, kiwiSaverRate: NzKiwiSaverRate): number {
  return Math.max(0, grossAnnual) * kiwiSaverRate;
}

function familyCreditEstimate(input: NzTaxInput): number {
  // WFTC/IETC rules are intentionally not fully modeled here because entitlement depends on
  // partner income, child age, hours, benefit status and abatement details. A small planning
  // placeholder is shown only to distinguish optional family scenarios from the default.
  if (input.maritalStatus === "single_parent" && input.dependents === "one_plus") return 0;
  return 0;
}

export function calculateNzTax(input: NzTaxInput): NzTaxBreakdown {
  const grossAnnual = Math.max(0, input.annualSalary);
  const payeIncomeTax = calculateNzPayeIncomeTax(grossAnnual);
  const accLevy = calculateNzAccLevy(grossAnnual);
  const kiwiSaver = calculateNzKiwiSaver(grossAnnual, input.kiwiSaverRate);
  const studentLoan = calculateNzStudentLoan(grossAnnual, input.hasStudentLoan);
  const familyCredit = familyCreditEstimate(input);
  const totalDeductions = payeIncomeTax + accLevy + kiwiSaver + studentLoan - familyCredit;
  const netAnnual = grossAnnual - totalDeductions;
  const netFortnightly = netAnnual / 26;
  const netMonthly = netAnnual / 12;
  const netWeekly = netAnnual / 52;
  const netPerPeriod = input.payFrequency === "weekly"
    ? netWeekly
    : input.payFrequency === "monthly"
      ? netMonthly
      : input.payFrequency === "annual"
        ? netAnnual
        : netFortnightly;

  return {
    grossAnnual,
    payeIncomeTax,
    accLevy,
    kiwiSaver,
    studentLoan,
    familyCreditEstimate: familyCredit,
    totalDeductions,
    netAnnual,
    netFortnightly,
    netMonthly,
    netWeekly,
    netPerPeriod,
    effectiveTaxRate: grossAnnual > 0 ? totalDeductions / grossAnnual : 0,
    maritalStatus: input.maritalStatus,
    dependents: input.dependents,
    payFrequency: input.payFrequency,
    kiwiSaverRate: input.kiwiSaverRate,
    hasStudentLoan: input.hasStudentLoan,
  };
}

export function formatNzd(amount: number, cents = false): string {
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  }).format(amount).replace(/^\$/, "NZ$");
}

export function formatNzPercent(rate: number): string {
  return `${(rate * 100).toFixed(1)}%`;
}
