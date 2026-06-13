import { formatCurrency, formatPercent } from "@/lib/seo/metadata";
import { getTaxData, taxYears } from "@/lib/tax";
import type { FaqItem } from "@/types/seo";
import type { PaycheckBreakdown, StateTaxData } from "@/types/tax";

type TaxToolFaqKind =
  | "tax-calculator"
  | "income-tax-calculator"
  | "federal-tax-calculator"
  | "self-employment-tax-calculator"
  | "social-security-tax-calculator";

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
      answer: `Your take-home pay in ${state.name} depends on your gross salary, filing status, pay frequency, and any pre-tax deductions. ${taxNote} Use our calculator above to estimate your net pay after all modeled withholdings.`,
    },
    {
      question: `Why does the same salary take home a different amount in ${state.name} than in another state?`,
      answer: `State income tax rules, standard deductions, flat versus progressive brackets, and local tax exposure can all change take-home pay. Even when federal tax and FICA stay the same, ${state.name} may produce a meaningfully different net paycheck than another state.`,
    },
    {
      question: "How is federal income tax calculated on my paycheck?",
      answer: `Federal income tax uses progressive brackets for tax year ${taxYears.federal}. Your employer withholds based on your W-4 form and filing status. Taxable income equals gross wages minus the standard deduction (${formatCurrency(getTaxData().federal.standardDeduction.single)} for single filers in ${taxYears.federal}).`,
    },
    {
      question: "How much is Social Security tax?",
      answer: `Social Security tax is 6.2% of wages up to the ${taxYears.fica} wage base of ${formatCurrency(getTaxData().fica.socialSecurity.wageBase)}. Earnings above this cap are not subject to Social Security tax.`,
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

export function getSalaryPageFaqs(amount: number, breakdown: PaycheckBreakdown): FaqItem[] {
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
      answer: `Estimated federal income tax on ${formatCurrency(amount)} is ${formatCurrency(breakdown.federalTax)} per year for a single filer using the ${taxYears.federal} standard deduction and tax brackets.`,
    },
    {
      question: `What is the monthly take-home on ${formatCurrency(amount)}?`,
      answer: `Estimated monthly take-home pay is ${formatCurrency(breakdown.netMonthly)} after federal, state, and FICA taxes. This assumes no pre-tax retirement contributions or health insurance deductions.`,
    },
    {
      question: "Why does the example use California?",
      answer: "The default salary guides use California because it is a familiar high-population state with state income tax, which makes the effect of state withholding easier to see. Use the calculator on the page to switch to your own state for a more relevant estimate.",
    },
    {
      question: "Does this include pre-tax deductions?",
      answer: "No. This calculator shows gross-to-net estimates before 401(k), HSA, FSA, or health insurance premiums. Pre-tax deductions would usually lower taxable income and may increase take-home pay.",
    },
  ];
}

export function getHomePageFaqs(): FaqItem[] {
  return [
    {
      question: "How do I calculate my take-home pay?",
      answer: "Enter your annual salary, state, filing status, and pay frequency. Our calculator estimates federal tax, state tax, Social Security, and Medicare to show your net annual, monthly, and per-paycheck income.",
    },
    {
      question: "What is the difference between a paycheck calculator and a salary calculator?",
      answer: "A paycheck calculator focuses on take-home pay after taxes for each pay period, while a salary calculator usually starts with annual salary and converts it into monthly or per-paycheck amounts. On ToolsZila, the two work together: enter annual salary once and review annual, monthly, and paycheck-level net pay.",
    },
    {
      question: "Which states have no income tax?",
      answer: "Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming do not tax wage income. You still pay federal taxes and FICA in these states.",
    },
    {
      question: "Can I use this calculator for California, Texas, and Florida paychecks?",
      answer: "Yes. The calculator includes state-specific tax treatment across all 50 states, including California paycheck calculations with state income tax and Texas or Florida paycheck calculations with no state wage tax.",
    },
    {
      question: "How accurate is this paycheck calculator?",
      answer: `We use ${taxYears.federal} federal tax brackets, ${taxYears.fica} FICA rates, and state tax data that is versioned separately. Results are estimates, so actual withholding still depends on your W-4, pre-tax deductions, local taxes, credits, and employer payroll setup.`,
    },
    {
      question: "What pay frequency should I select?",
      answer: "Choose how often you receive paychecks: weekly (52/year), biweekly (26/year), semi-monthly (24/year), or monthly (12/year). This determines your per-paycheck take-home amount.",
    },
  ];
}

export function getSalaryCalculatorFaqs(): FaqItem[] {
  return [
    {
      question: "How does a salary calculator work?",
      answer: "A salary calculator starts with gross annual pay, then converts that salary into monthly and per-paycheck amounts. This version also estimates federal tax, state tax, Social Security, and Medicare so you can review take-home pay instead of only gross income.",
    },
    {
      question: "Can I use this salary calculator for different states?",
      answer: "Yes. Choose any state to model the effect of state income tax on your salary. This is especially useful when comparing high-tax states such as California with no-income-tax states such as Texas and Florida.",
    },
    {
      question: "Does this salary calculator include bonuses or overtime?",
      answer: "No. The main salary calculator is designed for base salary. Use the bonus tax calculator for supplemental wages and the overtime calculator for hourly overtime scenarios.",
    },
    {
      question: "What salary assumptions affect take-home pay the most?",
      answer: "The biggest factors are your state, filing status, pay frequency, and whether you have pre-tax deductions such as 401(k) contributions or health insurance. Those elections can materially change net pay even when gross salary stays the same.",
    },
  ];
}

export function getTaxToolFaqs(kind: TaxToolFaqKind): FaqItem[] {
  const wageBase = formatCurrency(getTaxData().fica.socialSecurity.wageBase);

  switch (kind) {
    case "tax-calculator":
      return [
        {
          question: "What does this tax calculator include?",
          answer: "It includes federal income tax, state income tax, Social Security, and Medicare. It is designed for salary-based annual planning rather than a full tax return.",
        },
        {
          question: "Does this tax calculator show after-tax income?",
          answer: "Yes. Along with the tax total, it estimates net annual income after the modeled federal, state, and payroll taxes are subtracted.",
        },
        {
          question: "Does it include tax credits or itemized deductions?",
          answer: "No. The estimate primarily relies on standard deductions and published tax rates. Credits, itemized deductions, and local taxes can materially change your actual result.",
        },
      ];
    case "income-tax-calculator":
      return [
        {
          question: "What is the difference between a tax calculator and an income tax calculator?",
          answer: "This income tax calculator isolates federal and state income tax only. It does not add Social Security or Medicare, so it is useful when you want to focus on income tax instead of total payroll tax.",
        },
        {
          question: "Does this include Social Security and Medicare?",
          answer: "No. This page intentionally excludes payroll taxes so you can compare income-tax-only outcomes across states and filing statuses.",
        },
        {
          question: "Why do marginal and effective income tax rates differ?",
          answer: "Marginal rate applies to the next dollar of taxable income, while effective rate is your total modeled income tax divided by gross income. Progressive tax systems usually make the effective rate lower than the top marginal rate.",
        },
      ];
    case "federal-tax-calculator":
      return [
        {
          question: "How is federal income tax calculated?",
          answer: `The calculator subtracts the ${taxYears.federal} standard deduction from annual income, then applies progressive federal tax brackets to the remaining taxable income.`,
        },
        {
          question: "Does this federal tax calculator include state tax?",
          answer: "No. It is limited to federal income tax so you can isolate the federal portion before layering in state tax or payroll taxes elsewhere.",
        },
        {
          question: "Is this the same as my final IRS tax bill?",
          answer: "Not necessarily. Actual liability can change with credits, itemized deductions, capital gains, self-employment adjustments, and other return details not modeled here.",
        },
      ];
    case "self-employment-tax-calculator":
      return [
        {
          question: "What is self-employment tax?",
          answer: "Self-employment tax is the self-employed equivalent of Social Security and Medicare payroll taxes. It generally applies to 92.35% of net business income, subject to the Social Security wage base and Medicare rules.",
        },
        {
          question: "Does this include federal income tax on self-employment income?",
          answer: "No. This page focuses on Schedule SE style payroll taxes. You may still owe federal and state income tax on business profits in addition to the self-employment estimate shown here.",
        },
        {
          question: "Why can I enter W-2 wages already subject to Social Security?",
          answer: `Because the Social Security portion of self-employment tax shares the annual wage base (${wageBase}) with wages already taxed through payroll. Existing W-2 wages can reduce the remaining cap.`,
        },
      ];
    case "social-security-tax-calculator":
      return [
        {
          question: "How much is Social Security tax?",
          answer: `Employee Social Security tax is 6.2% of wages up to the ${taxYears.fica} wage base of ${wageBase}. Employers generally match that 6.2% amount.`,
        },
        {
          question: "What happens after I reach the wage base?",
          answer: "Wages above the annual Social Security wage base are not subject to the employee Social Security tax. Medicare can still continue beyond that point because it does not use the same cap.",
        },
        {
          question: "Why does the calculator show a self-employed equivalent?",
          answer: "Self-employed workers usually cover both the employee and employer Social Security shares, so the combined 12.4% equivalent is useful for planning. Medicare and income tax are separate from this page.",
        },
      ];
  }
}

export function getStatePageContent(state: StateTaxData) {
  return {
    intro: `Use our free ${state.name} paycheck calculator to estimate your take-home pay after federal taxes, ${state.hasIncomeTax ? "state income tax, " : ""}Social Security, and Medicare. Enter your salary and filing status for instant results.`,
    howTaxesWork: state.hasIncomeTax
      ? `How paycheck taxes work in ${state.name}: Your employer withholds federal income tax based on your W-4, then ${state.name} state income tax using state withholding tables. Social Security (6.2%) and Medicare (1.45%) are also deducted from each paycheck. ${state.taxExplanation}`
      : `How paycheck taxes work in ${state.name}: Because ${state.name} has no state income tax, your paycheck deductions are primarily federal income tax, Social Security, and Medicare. ${state.taxExplanation}`,
    statePlanningNote: state.hasIncomeTax
      ? `${state.name} is a better state to model carefully when you are comparing job offers, relocations, or remote-work options because state withholding can materially change annual take-home pay.`
      : `${state.name} can look attractive in salary comparisons because there is no state income tax on wages, but real take-home pay can still change with local taxes, benefits, and federal withholding.`,
    federalExplanation:
      "Federal income tax uses progressive brackets: higher income is taxed at higher rates, not all at one rate. The standard deduction reduces taxable income before brackets apply, and your W-4 affects how much is withheld through the year.",
    socialSecurityExplanation: `Social Security tax (FICA) is 6.2% of wages up to the annual wage base (${formatCurrency(getTaxData().fica.socialSecurity.wageBase)} in ${taxYears.fica}). Both employee and employer pay this amount; this calculator shows the employee portion.`,
    medicareExplanation:
      "Medicare tax is 1.45% on all wages with no cap. High earners pay an additional 0.9% on wages above $200,000 (single) or $250,000 (married filing jointly).",
  };
}

type FinanceToolFaqKind = "ipo" | "net-worth";

export function getFinanceToolFaqs(kind: FinanceToolFaqKind): FaqItem[] {
  switch (kind) {
    case "ipo":
      return [
        {
          question: "How does an IPO calculator work?",
          answer: "An IPO calculator starts with issue price, lot size, allotted lots, and an expected listing or exit price. It uses those inputs to estimate total capital committed, shares received, possible listing gain, and return percentage.",
        },
        {
          question: "Can an IPO calculator tell me the real listing price?",
          answer: "No. It only models scenarios. Real IPO performance depends on actual demand, allotment size, market conditions, lockups, and how the shares trade once they begin trading on the exchange.",
        },
        {
          question: "What is the difference between issue price and listing price?",
          answer: "Issue price is the price paid in the IPO allocation process. Listing price is the market price when the stock begins trading publicly. The difference between those two prices is what many investors call the listing gain or listing premium.",
        },
      ];
    case "net-worth":
      return [
        {
          question: "What is net worth?",
          answer: "Net worth is total assets minus total liabilities. Assets can include cash, investments, retirement accounts, property, and other valuables. Liabilities can include mortgages, student loans, auto loans, credit cards, and other debts.",
        },
        {
          question: "What is the difference between total net worth and liquid net worth?",
          answer: "Total net worth includes all modeled assets and liabilities. Liquid net worth focuses on assets you can access more quickly, such as cash and investments, and compares them against shorter-term debt balances.",
        },
        {
          question: "How often should I calculate my net worth?",
          answer: "Monthly or quarterly is usually enough for household planning. The biggest value comes from tracking the trend consistently over time rather than obsessing over one single-day snapshot.",
        },
      ];
  }
}
