/**
 * Tax data loader — centralizes JSON imports for annual updates.
 * To update tax rates: add new JSON files and update data/tax-year.json.
 */

import taxYearConfig from "@/data/tax-year.json";
import federal2025 from "@/data/federal/2025.json";
import fica2025 from "@/data/fica/2025.json";
import states2025 from "@/data/states/2025.json";
import type {
  FederalTaxData,
  FicaTaxData,
  StateTaxData,
} from "@/types/tax";

export interface TaxDataBundle {
  year: number;
  federal: FederalTaxData;
  fica: FicaTaxData;
  states: StateTaxData[];
}

/** Cached tax data bundle — loaded once at module init. */
let cachedTaxData: TaxDataBundle | null = null;

/** Load current tax year data from JSON files. */
export function getTaxData(): TaxDataBundle {
  if (cachedTaxData) return cachedTaxData;

  // Map tax year config to data files — extend when adding new years
  cachedTaxData = {
    year: taxYearConfig.currentYear,
    federal: federal2025 as FederalTaxData,
    fica: fica2025 as FicaTaxData,
    states: (states2025 as { states: StateTaxData[] }).states,
  };

  return cachedTaxData;
}

/** Get a single state by slug (e.g. "texas"). */
export function getStateBySlug(slug: string): StateTaxData | undefined {
  return getTaxData().states.find((s) => s.slug === slug);
}

/** Get a single state by code (e.g. "TX"). */
export function getStateByCode(code: string): StateTaxData | undefined {
  return getTaxData().states.find((s) => s.code === code);
}
