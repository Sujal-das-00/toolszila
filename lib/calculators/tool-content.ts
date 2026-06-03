import type { ToolDefinition } from "@/lib/navigation/site-architecture";
import { taxYears } from "@/lib/tax";
import { toolBreadcrumbs, toolPath } from "@/lib/navigation/site-architecture";
import type { BreadcrumbItem } from "@/types/seo";

export type ToolPageKind =
  | "paycheck"
  | "salary-calculator"
  | "tax-calculator"
  | "income-tax-calculator"
  | "federal-tax-calculator"
  | "self-employment-tax-calculator"
  | "social-security-tax-calculator"
  | "hourly-to-salary"
  | "salary-to-hourly"
  | "overtime"
  | "bonus-tax";

export interface ToolPageContent {
  seoTitle: string;
  seoDescription: string;
  seoKeywords?: string[];
  h1: string;
  intro: string;
  kind: ToolPageKind;
  adSlotId: string;
  guideType?: "hourly-to-salary" | "salary-to-hourly" | "overtime" | "bonus-tax";
  showTaxYearNotice?: boolean;
  showMethodology?: boolean;
}

const CONTENT: Record<string, ToolPageContent> = {
  "paycheck-calculator": {
    seoTitle: `US Paycheck Calculator - ${taxYears.federal} Take-Home Pay`,
    seoDescription:
      `Free US paycheck calculator and salary calculator using ${taxYears.federal} federal and FICA data plus state income-tax data. Estimate federal tax, state tax, Social Security, Medicare, and net pay by paycheck.`,
    seoKeywords: [
      "US Paycheck Calculator",
      "Salary Calculator",
      "California Paycheck Calculator",
      "Texas Paycheck Calculator",
      "Florida Paycheck Calculator",
    ],
    h1: "US Paycheck Calculator",
    intro:
      "Calculate your take-home pay after federal income tax, state tax, Social Security, and Medicare using current federal and FICA data plus state income-tax data across all 50 states.",
    kind: "paycheck",
    adSlotId: "paycheck-in-content-1",
    showTaxYearNotice: true,
    showMethodology: true,
  },
  "salary-calculator": {
    seoTitle: "Salary Calculator - Annual, Monthly & Paycheck Estimator",
    seoDescription:
      `Free salary calculator that turns annual salary into monthly, annual, and per-paycheck take-home pay using ${taxYears.federal} federal, FICA, and state tax data.`,
    seoKeywords: [
      "Salary Calculator",
      "US Paycheck Calculator",
      "California Paycheck Calculator",
      "Texas Paycheck Calculator",
      "Florida Paycheck Calculator",
    ],
    h1: "Salary Calculator",
    intro:
      "Use this salary calculator to estimate annual, monthly, and per-paycheck take-home pay after federal tax, state tax, Social Security, and Medicare. It is built for salaried employees who want a quick paycheck estimate from one annual salary input.",
    kind: "salary-calculator",
    adSlotId: "salary-calculator-1",
    showTaxYearNotice: true,
    showMethodology: true,
  },
  "tax-calculator": {
    seoTitle: "Tax Calculator - Federal, State & Payroll Estimate",
    seoDescription:
      `Estimate total annual tax with a free tax calculator that combines ${taxYears.federal} federal income tax, state income tax, Social Security, and Medicare.`,
    seoKeywords: [
      "Tax Calculator",
      "Income Tax Calculator",
      "Federal Tax Calculator",
      "Self Employment Tax Calculator",
      "Social Security Tax Calculator",
    ],
    h1: "Tax Calculator",
    intro:
      "Estimate your total annual tax burden by combining federal income tax, state income tax, Social Security, and Medicare. This tax calculator is best for quick planning and cross-state comparisons.",
    kind: "tax-calculator",
    adSlotId: "tax-calculator-1",
    showTaxYearNotice: true,
    showMethodology: true,
  },
  "income-tax-calculator": {
    seoTitle: "Income Tax Calculator - Federal and State Income Tax Estimate",
    seoDescription:
      `Estimate federal and state income tax without payroll taxes using ${taxYears.federal} brackets and current state income-tax data.`,
    seoKeywords: [
      "Income Tax Calculator",
      "Tax Calculator",
      "Federal Tax Calculator",
      "State Income Tax Calculator",
    ],
    h1: "Income Tax Calculator",
    intro:
      "Use this income tax calculator to isolate federal and state income tax from payroll taxes. It is useful when you want to review taxable income, marginal rates, and after-income-tax income.",
    kind: "income-tax-calculator",
    adSlotId: "income-tax-calculator-1",
    showTaxYearNotice: true,
  },
  "federal-tax-calculator": {
    seoTitle: `Federal Tax Calculator - ${taxYears.federal} Income Tax Brackets`,
    seoDescription:
      `Estimate annual federal income tax using ${taxYears.federal} standard deductions and progressive tax brackets.`,
    seoKeywords: ["Federal Tax Calculator", "Income Tax Calculator", "Tax Calculator"],
    h1: "Federal Tax Calculator",
    intro:
      "Estimate how much federal income tax applies to your annual income using the current standard deduction and marginal tax brackets. This page focuses on federal tax only.",
    kind: "federal-tax-calculator",
    adSlotId: "federal-tax-calculator-1",
    showTaxYearNotice: true,
  },
  "self-employment-tax-calculator": {
    seoTitle: "Self Employment Tax Calculator - Schedule SE Estimate",
    seoDescription:
      `Estimate self-employment tax using the Schedule SE adjustment, Social Security wage base, and Medicare rules.`,
    seoKeywords: [
      "Self Employment Tax Calculator",
      "Schedule SE Calculator",
      "Tax Calculator",
      "Social Security Tax Calculator",
    ],
    h1: "Self Employment Tax Calculator",
    intro:
      "Estimate self-employment tax on net business income. The calculator applies the Schedule SE earnings adjustment, Social Security wage base limits, Medicare tax, and Additional Medicare tax assumptions.",
    kind: "self-employment-tax-calculator",
    adSlotId: "self-employment-tax-calculator-1",
    showTaxYearNotice: true,
  },
  "social-security-tax-calculator": {
    seoTitle: "Social Security Tax Calculator - Wage Base Estimate",
    seoDescription:
      `Estimate employee Social Security tax, employer match, and self-employed equivalent using the current wage base cap.`,
    seoKeywords: [
      "Social Security Tax Calculator",
      "Payroll Tax Calculator",
      "Tax Calculator",
    ],
    h1: "Social Security Tax Calculator",
    intro:
      "Estimate how much Social Security tax applies to wages, how the wage base limit works, and what the employer match or self-employed equivalent looks like.",
    kind: "social-security-tax-calculator",
    adSlotId: "social-security-tax-calculator-1",
    showTaxYearNotice: true,
  },
  "hourly-to-salary-calculator": {
    seoTitle: "Hourly to Salary Calculator - Annual Pay Converter",
    seoDescription:
      "Convert hourly wage to annual salary with formulas, examples, and weekly gross-pay assumptions for full-time or part-time work.",
    seoKeywords: ["Hourly to Salary Calculator", "Salary Calculator", "Hourly Pay Converter"],
    h1: "Hourly to Salary Calculator",
    intro:
      "Convert your hourly wage to an annual salary. Use the guide below to understand the formula, assumptions, and when the gross-pay result can differ from real take-home pay.",
    kind: "hourly-to-salary",
    adSlotId: "hourly-to-salary-1",
    guideType: "hourly-to-salary",
  },
  "salary-to-hourly-calculator": {
    seoTitle: "Salary to Hourly Calculator - Hourly Rate Converter",
    seoDescription:
      "Convert annual salary to an hourly rate using hours per week and 52 work weeks, with examples for full-time and part-time schedules.",
    seoKeywords: ["Salary to Hourly Calculator", "Salary Calculator", "Hourly Rate Converter"],
    h1: "Salary to Hourly Calculator",
    intro:
      "Convert annual salary to an hourly rate based on your expected hours per week and a 52-week year.",
    kind: "salary-to-hourly",
    adSlotId: "salary-to-hourly-1",
    guideType: "salary-to-hourly",
  },
  "overtime-calculator": {
    seoTitle: "Overtime Calculator - Weekly OT Pay Estimate",
    seoDescription:
      "Calculate weekly gross pay with regular hours, overtime hours, and a custom overtime multiplier, plus formula examples and limits.",
    seoKeywords: ["Overtime Calculator", "Overtime Pay Calculator", "Payroll Calculator"],
    h1: "Overtime Calculator",
    intro:
      "Estimate weekly gross pay with separate regular and overtime hours. Adjust the multiplier for time-and-a-half or employer-specific rules.",
    kind: "overtime",
    adSlotId: "overtime-1",
    guideType: "overtime",
  },
  "bonus-tax-calculator": {
    seoTitle: "Bonus Tax Calculator - Supplemental Wage Estimate",
    seoDescription:
      "Estimate federal, state, and FICA withholding on bonuses using the 22% supplemental federal rate and your selected state.",
    seoKeywords: ["Bonus Tax Calculator", "Bonus Paycheck Calculator", "Supplemental Wage Calculator"],
    h1: "Bonus Tax Calculator",
    intro:
      "Estimate how much of a bonus may be withheld for federal supplemental tax, state income tax, and FICA. Results are illustrative — actual payroll may differ.",
    kind: "bonus-tax",
    adSlotId: "bonus-tax-1",
    guideType: "bonus-tax",
  },
};

export function getToolPageContent(tool: ToolDefinition): ToolPageContent | null {
  return CONTENT[tool.slug] ?? null;
}

export function getToolBreadcrumbs(tool: ToolDefinition): BreadcrumbItem[] {
  return toolBreadcrumbs(tool);
}

export function getToolCanonicalPath(tool: ToolDefinition): string {
  return toolPath(tool);
}
