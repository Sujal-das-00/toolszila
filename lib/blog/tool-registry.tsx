import { PaycheckCalculator } from "@/components/calculator/PaycheckCalculator";
import {
  FederalTaxCalculator,
  IncomeTaxCalculator,
  SelfEmploymentTaxCalculator,
  SocialSecurityTaxCalculator,
  TaxCalculator,
} from "@/components/calculator/TaxCalculators";
import {
  BonusTaxCalculator,
  HourlySalaryConverter,
  OvertimeCalculator,
} from "@/components/calculator/SpecialCalculators";
import type { BlogToolDefinition } from "@/lib/blog/types";

const toolRegistry: Record<string, BlogToolDefinition> = {
  "california-paycheck-calculator": {
    id: "california-paycheck-calculator",
    label: "California Paycheck Calculator",
    description: "Estimate California take-home pay with state-specific defaults.",
    component: () => <PaycheckCalculator defaultState="CA" />,
  },
  "paycheck-calculator": {
    id: "paycheck-calculator",
    label: "Paycheck Calculator",
    description: "Estimate federal, state, and FICA deductions from annual salary.",
    component: () => <PaycheckCalculator />,
  },
  "salary-calculator": {
    id: "salary-calculator",
    label: "Salary Calculator",
    description: "Use salary inputs to estimate take-home pay and paycheck breakdowns.",
    component: () => <PaycheckCalculator defaultSalary={75000} />,
  },
  "hourly-to-salary-calculator": {
    id: "hourly-to-salary-calculator",
    label: "Hourly to Salary Calculator",
    description: "Convert hourly pay to annual salary.",
    component: () => <HourlySalaryConverter mode="hourly-to-salary" />,
  },
  "salary-to-hourly-calculator": {
    id: "salary-to-hourly-calculator",
    label: "Salary to Hourly Calculator",
    description: "Convert annual salary to hourly pay.",
    component: () => <HourlySalaryConverter mode="salary-to-hourly" />,
  },
  "bonus-tax-calculator": {
    id: "bonus-tax-calculator",
    label: "Bonus Tax Calculator",
    description: "Estimate withholding on supplemental wages.",
    component: BonusTaxCalculator,
  },
  "overtime-calculator": {
    id: "overtime-calculator",
    label: "Overtime Calculator",
    description: "Estimate overtime and total weekly pay.",
    component: OvertimeCalculator,
  },
  "tax-calculator": {
    id: "tax-calculator",
    label: "Tax Calculator",
    description: "Estimate total federal, state, and payroll taxes from annual income.",
    component: TaxCalculator,
  },
  "income-tax-calculator": {
    id: "income-tax-calculator",
    label: "Income Tax Calculator",
    description: "Estimate federal and state income taxes using filing status and state inputs.",
    component: IncomeTaxCalculator,
  },
  "federal-tax-calculator": {
    id: "federal-tax-calculator",
    label: "Federal Tax Calculator",
    description: "Estimate federal income tax using current brackets and standard deductions.",
    component: FederalTaxCalculator,
  },
  "self-employment-tax-calculator": {
    id: "self-employment-tax-calculator",
    label: "Self Employment Tax Calculator",
    description: "Estimate Social Security and Medicare taxes on self-employment income.",
    component: SelfEmploymentTaxCalculator,
  },
  "social-security-tax-calculator": {
    id: "social-security-tax-calculator",
    label: "Social Security Tax Calculator",
    description: "Estimate Social Security payroll taxes and wage-base effects.",
    component: SocialSecurityTaxCalculator,
  },
};

export function getBlogTool(toolId: string): BlogToolDefinition | null {
  return toolRegistry[toolId] ?? null;
}
