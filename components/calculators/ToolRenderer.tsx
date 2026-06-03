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
import type { ToolPageKind } from "@/lib/calculators/tool-content";

interface ToolRendererProps {
  kind: ToolPageKind;
  defaultState?: string;
}

export function ToolRenderer({ kind, defaultState }: ToolRendererProps) {
  switch (kind) {
    case "paycheck":
      return <PaycheckCalculator defaultState={defaultState} />;
    case "salary-calculator":
      return <PaycheckCalculator defaultSalary={75000} defaultState={defaultState} />;
    case "tax-calculator":
      return <TaxCalculator />;
    case "income-tax-calculator":
      return <IncomeTaxCalculator />;
    case "federal-tax-calculator":
      return <FederalTaxCalculator />;
    case "self-employment-tax-calculator":
      return <SelfEmploymentTaxCalculator />;
    case "social-security-tax-calculator":
      return <SocialSecurityTaxCalculator />;
    case "hourly-to-salary":
      return <HourlySalaryConverter mode="hourly-to-salary" />;
    case "salary-to-hourly":
      return <HourlySalaryConverter mode="salary-to-hourly" />;
    case "overtime":
      return <OvertimeCalculator />;
    case "bonus-tax":
      return <BonusTaxCalculator />;
    default:
      return null;
  }
}
