import type { FaqItem } from "@/types/seo";
import type { StateTaxData } from "@/types/tax";
import { formatCurrency, formatPercent } from "@/lib/seo/metadata";
import type { PaycheckBreakdown } from "@/types/tax";
import { getTaxData } from "@/lib/tax";

/** Reusable FAQ content for state paycheck calculator pages. */
export function getStatePageFaqs(state: StateTaxData): FaqItem[] {
  const taxNote = state.hasIncomeTax
    ? `${state.name} withholds state income tax from your paycheck${state.taxType === "flat" ? ` at a flat rate of ${formatPercent(state.flatRate ?? 0)}` : " using progressive tax brackets"}.`
    : `${state.name} does not withhold state income tax from your paycheck.`;

  return [
    {
      question: `Does ${state.name} have state income tax?`,
      answer: state.hasIncomeTax
        ? `Yes. ${state.taxSummary} ${state.taxExplanation}`
        : `No. ${state.name} is one of nine states with no state income tax on wages. You still pay federal income tax, Social Security, and Medicare.`,
    },
    {
      question: `How much will I take home from my paycheck in ${state.name}?`,
      answer: `Your take-home pay in ${state.name} depends on your gross salary, filing status, and pay frequency. ${taxNote} Use our calculator above to estimate your net pay after all withholdings.`,
    },
    {
      question: "How is federal income tax calculated on my paycheck?",
      answer: `Federal income tax uses progressive brackets for tax year ${getTaxData().federalYear}. Your employer withholds based on your W-4 form and filing status. Taxable income equals gross wages minus the standard deduction (${formatCurrency(getTaxData().federal.standardDeduction.single)} for single filers in ${getTaxData().federalYear}).`,
    },
    {
      question: "How much is Social Security tax?",
      answer: `Social Security tax is 6.2% of wages up to the ${getTaxData().year} wage base of ${formatCurrency(getTaxData().fica.socialSecurity.wageBase)}. Earnings above this cap are not subject to Social Security tax.`,
    },
    {
      question: "How much is Medicare tax?",
      answer: "Medicare tax is 1.45% on all wages. An additional 0.9% Medicare surtax applies to wages exceeding $200,000 for single filers ($250,000 for married filing jointly).",
    },
    {
      question: `What filing status should I use for ${state.name} paycheck calculations?`,
      answer: "Choose the filing status that matches your W-4: Single, Married Filing Jointly, or Head of Household. Your filing status affects both federal and state tax brackets where applicable.",
    },
  ];
}

/** FAQ content for salary after-tax pages. */
export function getSalaryPageFaqs(
  amount: number,
  breakdown: PaycheckBreakdown,
): FaqItem[] {
  return [
    {
      question: `How much is ${formatCurrency(amount)} after taxes?`,
      answer: `On a ${formatCurrency(amount)} salary (single filer, California, biweekly pay), estimated take-home pay is ${formatCurrency(breakdown.netAnnual)} per year, or ${formatCurrency(breakdown.netPerPaycheck)} per paycheck. Actual amounts vary by state, deductions, and credits.`,
    },
    {
      question: `What is the effective tax rate on ${formatCurrency(amount)}?`,
      answer: `The estimated effective tax rate is ${formatPercent(breakdown.effectiveTaxRate)}, including federal income tax, state tax, Social Security, and Medicare. Your marginal rate on additional income may be higher.`,
    },
    {
      question: `How much federal tax on ${formatCurrency(amount)} salary?`,
      answer: `Estimated federal income tax on ${formatCurrency(amount)} is ${formatCurrency(breakdown.federalTax)} per year for a single filer using the ${getTaxData().federalYear} standard deduction and tax brackets.`,
    },
    {
      question: `What is the monthly take-home on ${formatCurrency(amount)}?`,
      answer: `Estimated monthly take-home pay is ${formatCurrency(breakdown.netMonthly)} after federal, state, and FICA taxes. This assumes no pre-tax retirement contributions or health insurance deductions.`,
    },
    {
      question: "Does this include pre-tax deductions?",
      answer: "No. This calculator shows gross-to-net estimates before 401(k), HSA, FSA, or health insurance premiums. Pre-tax deductions would increase your take-home pay.",
    },
  ];
}

/** General homepage FAQs. */
export function getHomePageFaqs(): FaqItem[] {
  return [
    {
      question: "How do I calculate my take-home pay?",
      answer: "Enter your annual salary, state, filing status, and pay frequency. Our calculator estimates federal tax, state tax, Social Security, and Medicare to show your net annual, monthly, and per-paycheck income.",
    },
    {
      question: "Which states have no income tax?",
      answer: "Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming do not tax wage income. You still pay federal taxes and FICA in these states.",
    },
    {
      question: "How accurate is this paycheck calculator?",
      answer: `We use ${getTaxData().federalYear} federal tax brackets, ${getTaxData().ficaYear} FICA rates, and ${getTaxData().statesYear} state tax data. Results are estimates — actual withholding depends on your W-4, pre-tax deductions, local taxes, and credits.`,
    },
    {
      question: "What pay frequency should I select?",
      answer: "Choose how often you receive paychecks: weekly (52/year), biweekly (26/year), semi-monthly (24/year), or monthly (12/year). This determines your per-paycheck take-home amount.",
    },
  ];
}

/** Educational content blocks for state pages. */
export function getStatePageContent(state: StateTaxData) {
  return {
    intro: `Use our free ${state.name} paycheck calculator to estimate your take-home pay after federal taxes, ${state.hasIncomeTax ? "state income tax, " : ""}Social Security, and Medicare. Enter your salary and filing status for instant results.`,
    howTaxesWork: state.hasIncomeTax
      ? `How paycheck taxes work in ${state.name}: Your employer withholds federal income tax based on your W-4, then ${state.name} state income tax using state withholding tables. Social Security (6.2%) and Medicare (1.45%) are also deducted from each paycheck. ${state.taxExplanation}`
      : `How paycheck taxes work in ${state.name}: Because ${state.name} has no state income tax, your paycheck deductions are primarily federal income tax, Social Security, and Medicare. ${state.taxExplanation}`,
    federalExplanation:
      "Federal income tax uses progressive brackets — higher income is taxed at higher rates. The standard deduction reduces your taxable income before brackets apply. Your W-4 determines how much your employer withholds each pay period.",
    socialSecurityExplanation: `Social Security tax (FICA) is 6.2% of wages up to the annual wage base (${formatCurrency(getTaxData().fica.socialSecurity.wageBase)} in ${getTaxData().ficaYear}). Both employee and employer pay this amount; this calculator shows the employee portion.`,
    medicareExplanation:
      "Medicare tax is 1.45% on all wages with no cap. High earners pay an additional 0.9% on wages above $200,000 (single) or $250,000 (married filing jointly).",
  };
}
