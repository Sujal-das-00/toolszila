import { PaycheckCalculator } from "@/components/calculator/PaycheckCalculator";
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
