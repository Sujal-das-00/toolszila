/** Tax domain types — kept separate from UI for annual data updates. */

export type FilingStatus = "single" | "married_joint" | "head_of_household";

export type PayFrequency = "weekly" | "biweekly" | "semi_monthly" | "monthly";

export type StateTaxType = "none" | "flat" | "progressive";

export interface TaxBracket {
  /** Upper bound of taxable income for this bracket (Infinity for top bracket). */
  max: number;
  rate: number;
}

export interface FilingStatusBrackets {
  single: TaxBracket[];
  married_joint: TaxBracket[];
  head_of_household: TaxBracket[];
}

export interface FederalTaxData {
  year: number;
  standardDeduction: Record<FilingStatus, number>;
  brackets: FilingStatusBrackets;
}

export interface FicaTaxData {
  year: number;
  socialSecurity: {
    rate: number;
    wageBase: number;
  };
  medicare: {
    rate: number;
    additionalRate: number;
    additionalThreshold: Record<FilingStatus, number>;
  };
}

export interface StateTaxData {
  code: string;
  slug: string;
  name: string;
  hasIncomeTax: boolean;
  taxType: StateTaxType;
  /** Flat rate (decimal) when taxType is "flat". */
  flatRate?: number;
  /** Progressive brackets when taxType is "progressive". */
  brackets?: FilingStatusBrackets;
  /** State standard deduction if applicable. */
  standardDeduction?: Partial<Record<FilingStatus, number>>;
  /** Short SEO description of state tax policy. */
  taxSummary: string;
  /** Longer content for state pages. */
  taxExplanation: string;
}

export interface PaycheckInput {
  annualSalary: number;
  stateCode: string;
  filingStatus: FilingStatus;
  payFrequency: PayFrequency;
}

export interface PaycheckBreakdown {
  grossAnnual: number;
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  medicare: number;
  totalTax: number;
  netAnnual: number;
  netMonthly: number;
  netPerPaycheck: number;
  effectiveTaxRate: number;
  marginalFederalRate: number;
  marginalStateRate: number;
}
