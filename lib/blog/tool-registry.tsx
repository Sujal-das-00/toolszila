import { PaycheckCalculator } from "@/components/calculator/PaycheckCalculator";
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
};

export function getBlogTool(toolId: string): BlogToolDefinition | null {
  return toolRegistry[toolId] ?? null;
}
