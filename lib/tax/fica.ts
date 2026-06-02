/**
 * FICA tax calculator (Social Security + Medicare).
 * Includes additional Medicare tax for high earners.
 */

import type { FicaTaxData, FilingStatus } from "@/types/tax";

export interface FicaResult {
  socialSecurity: number;
  medicare: number;
  total: number;
}

/** Calculate annual FICA taxes on wages. */
export function calculateFica(
  grossAnnual: number,
  filingStatus: FilingStatus,
  data: FicaTaxData,
): FicaResult {
  const { socialSecurity: ss, medicare: med } = data;

  // Social Security: 6.2% up to wage base
  const ssWages = Math.min(grossAnnual, ss.wageBase);
  const socialSecurity = ssWages * ss.rate;

  // Medicare: 1.45% on all wages
  let medicare = grossAnnual * med.rate;

  // Additional Medicare: 0.9% on wages above threshold
  const threshold = med.additionalThreshold[filingStatus];
  if (grossAnnual > threshold) {
    medicare += (grossAnnual - threshold) * med.additionalRate;
  }

  return {
    socialSecurity,
    medicare,
    total: socialSecurity + medicare,
  };
}
