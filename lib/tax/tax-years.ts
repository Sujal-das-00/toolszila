import taxYearConfig from "@/data/tax-year.json";

export const taxYears = {
  current: taxYearConfig.currentYear,
  federal: taxYearConfig.federalYear,
  fica: taxYearConfig.ficaYear,
  states: taxYearConfig.statesYear,
} as const;

export function getCurrentTaxYearLabel(): string {
  return String(taxYears.current);
}

export function getFederalTaxYearLabel(): string {
  return String(taxYears.federal);
}

export function getFicaTaxYearLabel(): string {
  return String(taxYears.fica);
}

export function getStateTaxDataDisclosure(): string {
  return taxYears.states === taxYears.current
    ? `${taxYears.states}`
    : "versioned separately";
}
