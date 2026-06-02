import type { ToolDefinition } from "@/lib/navigation/site-architecture";
import { toolBreadcrumbs, toolPath } from "@/lib/navigation/site-architecture";
import type { BreadcrumbItem } from "@/types/seo";

export type ToolPageKind =
  | "paycheck"
  | "hourly-to-salary"
  | "salary-to-hourly"
  | "overtime"
  | "bonus-tax";

export interface ToolPageContent {
  seoTitle: string;
  seoDescription: string;
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
    seoTitle: "US Paycheck Calculator - 2026 Take-Home Pay",
    seoDescription:
      "Free US paycheck calculator using 2026 federal and FICA data plus state income-tax data. Estimate federal tax, state tax, Social Security, Medicare, and net pay.",
    h1: "US Paycheck Calculator",
    intro:
      "Calculate your take-home pay after federal income tax, state tax, Social Security, and Medicare using current federal and FICA data plus state income-tax data across all 50 states.",
    kind: "paycheck",
    adSlotId: "paycheck-in-content-1",
    showTaxYearNotice: true,
    showMethodology: true,
  },
  "hourly-to-salary-calculator": {
    seoTitle: "Hourly to Salary Calculator - Annual Pay Converter",
    seoDescription:
      "Convert hourly wage to annual salary with formulas, examples, and weekly gross-pay assumptions for full-time or part-time work.",
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
