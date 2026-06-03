/**
 * Tax data loader — centralizes JSON imports for annual updates.
 * To update tax rates: add new JSON files and update data/tax-year.json.
 */

import federal2026 from "@/data/federal/2026.json";
import fica2026 from "@/data/fica/2026.json";
import states2026 from "@/data/states/2026.json";
import { taxYears } from "@/lib/tax/tax-years";
import type {
  FederalTaxData,
  FicaTaxData,
  StateTaxData,
} from "@/types/tax";

export interface TaxDataBundle {
  year: number;
  federalYear: number;
  ficaYear: number;
  statesYear: number;
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
    year: taxYears.current,
    federalYear: taxYears.federal,
    ficaYear: taxYears.fica,
    statesYear: taxYears.states,
    federal: federal2026 as FederalTaxData,
    fica: fica2026 as FicaTaxData,
    states: (states2026 as { states: StateTaxData[] }).states,
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
