/**
 * Scalable tool registry — single source of truth for nav, footer, sitemap, and routes.
 * Add new tools here; set `status: "live"` when the page ships.
 */

export type ToolCategoryId =
  | "income"
  | "tax"
  | "insurance"
  | "finance"
  | "travel";

export type ToolStatus = "live" | "coming-soon";

export interface ToolCategory {
  id: ToolCategoryId;
  label: string;
  description: string;
  path: string;
}

export interface ToolDefinition {
  id: string;
  title: string;
  description: string;
  category: ToolCategoryId;
  slug: string;
  status: ToolStatus;
  popular?: boolean;
  isNew?: boolean;
  legacyPath?: string;
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: "income",
    label: "Income Calculators",
    description: "Salary, take-home pay, hourly, overtime, and bonus pay tools.",
    path: "/calculators/income",
  },
  {
    id: "tax",
    label: "Tax Calculators",
    description: "Tax, income tax, federal tax, self-employment tax, and Social Security tax estimates.",
    path: "/calculators/tax",
  },
  {
    id: "insurance",
    label: "Insurance Calculators",
    description: "Life, auto, home, and health insurance cost estimators.",
    path: "/calculators/insurance",
  },
  {
    id: "finance",
    label: "Financial Calculators",
    description: "Loans, mortgages, debt payoff, savings, IPO, and net-worth planning.",
    path: "/calculators/finance",
  },
  {
    id: "travel",
    label: "Travel Calculators",
    description: "Travel budget and visa-free destination planning.",
    path: "/calculators/travel",
  },
];

export const TOOL_REGISTRY: ToolDefinition[] = [
  {
    id: "paycheck-calculator",
    title: "US Take-Home Pay Calculator",
    description: "Estimate US take-home pay after federal, state, and FICA taxes.",
    category: "income",
    slug: "paycheck-calculator",
    status: "live",
    popular: true,
  },
  {
    id: "salary-calculator",
    title: "Salary Calculator",
    description: "Estimate annual, monthly, and per-pay-period take-home pay from salary.",
    category: "income",
    slug: "salary-calculator",
    status: "live",
    popular: true,
    legacyPath: "/salary-calculator",
  },
  {
    id: "hourly-to-salary-calculator",
    title: "Hourly to Salary Calculator",
    description: "Convert hourly wage to annual salary.",
    category: "income",
    slug: "hourly-to-salary-calculator",
    status: "live",
    popular: true,
    legacyPath: "/hourly-to-salary-calculator",
  },
  {
    id: "salary-to-hourly-calculator",
    title: "Salary to Hourly Calculator",
    description: "Convert annual salary to hourly rate.",
    category: "income",
    slug: "salary-to-hourly-calculator",
    status: "live",
    popular: true,
    legacyPath: "/salary-to-hourly-calculator",
  },
  {
    id: "overtime-calculator",
    title: "Overtime Calculator",
    description: "Calculate overtime pay at 1.5× or custom rates.",
    category: "income",
    slug: "overtime-calculator",
    status: "live",
    legacyPath: "/overtime-calculator",
  },
  {
    id: "bonus-tax-calculator",
    title: "Bonus Tax Calculator",
    description: "Estimate take-home pay on bonuses and supplemental wages.",
    category: "income",
    slug: "bonus-tax-calculator",
    status: "live",
    legacyPath: "/bonus-tax-calculator",
  },
  {
    id: "1099-vs-w2-calculator",
    title: "1099 vs W2 Calculator",
    description: "Compare contractor vs employee take-home pay.",
    category: "income",
    slug: "1099-vs-w2-calculator",
    status: "coming-soon",
  },
  {
    id: "tax-calculator",
    title: "Tax Calculator",
    description: "Estimate total annual tax including federal, state, and FICA.",
    category: "tax",
    slug: "tax-calculator",
    status: "live",
    popular: true,
    legacyPath: "/tax-calculator",
  },
  {
    id: "income-tax-calculator",
    title: "Income Tax Calculator",
    description: "Estimate federal and state income tax without payroll taxes.",
    category: "tax",
    slug: "income-tax-calculator",
    status: "live",
    popular: true,
    legacyPath: "/income-tax-calculator",
  },
  {
    id: "federal-tax-calculator",
    title: "Federal Tax Calculator",
    description: "Estimate annual federal income tax using current brackets.",
    category: "tax",
    slug: "federal-tax-calculator",
    status: "live",
    popular: true,
    legacyPath: "/federal-tax-calculator",
  },
  {
    id: "self-employment-tax-calculator",
    title: "Self Employment Tax Calculator",
    description: "Estimate Schedule SE Social Security and Medicare taxes.",
    category: "tax",
    slug: "self-employment-tax-calculator",
    status: "live",
    legacyPath: "/self-employment-tax-calculator",
  },
  {
    id: "social-security-tax-calculator",
    title: "Social Security Tax Calculator",
    description: "Estimate employee Social Security tax and wage-base impact.",
    category: "tax",
    slug: "social-security-tax-calculator",
    status: "live",
    legacyPath: "/social-security-tax-calculator",
  },
  {
    id: "state-tax-calculator",
    title: "State Tax Calculator",
    description: "State income tax estimates by jurisdiction.",
    category: "tax",
    slug: "state-tax-calculator",
    status: "coming-soon",
  },
  {
    id: "capital-gains-tax-calculator",
    title: "Capital Gains Tax Calculator",
    description: "Short- and long-term capital gains estimates.",
    category: "tax",
    slug: "capital-gains-tax-calculator",
    status: "coming-soon",
  },
  {
    id: "life-insurance-calculator",
    title: "Life Insurance Calculator",
    description: "Coverage needs based on income and dependents.",
    category: "insurance",
    slug: "life-insurance-calculator",
    status: "coming-soon",
  },
  {
    id: "auto-insurance-calculator",
    title: "Auto Insurance Calculator",
    description: "Premium range estimates by profile.",
    category: "insurance",
    slug: "auto-insurance-calculator",
    status: "coming-soon",
  },
  {
    id: "home-insurance-estimator",
    title: "Home Insurance Estimator",
    description: "Dwelling and liability coverage estimates.",
    category: "insurance",
    slug: "home-insurance-estimator",
    status: "coming-soon",
  },
  {
    id: "health-insurance-cost-calculator",
    title: "Health Insurance Cost Calculator",
    description: "Plan cost and subsidy estimates.",
    category: "insurance",
    slug: "health-insurance-cost-calculator",
    status: "coming-soon",
  },
  {
    id: "loan-calculator",
    title: "Loan Calculator",
    description: "Monthly payment and amortization schedules.",
    category: "finance",
    slug: "loan-calculator",
    status: "coming-soon",
  },
  {
    id: "ipo-calculator",
    title: "IPO Calculator",
    description: "Estimate IPO application cost, listing value, and potential gain.",
    category: "finance",
    slug: "ipo-calculator",
    status: "live",
    popular: true,
  },
  {
    id: "net-worth-calculator",
    title: "Net Worth Calculator",
    description: "Add assets and liabilities to estimate personal net worth.",
    category: "finance",
    slug: "net-worth-calculator",
    status: "live",
    popular: true,
  },
  {
    id: "mortgage-calculator",
    title: "Mortgage Calculator",
    description: "PITI and affordability estimates.",
    category: "finance",
    slug: "mortgage-calculator",
    status: "coming-soon",
  },
  {
    id: "debt-payoff-calculator",
    title: "Debt Payoff Calculator",
    description: "Snowball and avalanche payoff timelines.",
    category: "finance",
    slug: "debt-payoff-calculator",
    status: "coming-soon",
  },
  {
    id: "savings-calculator",
    title: "Savings Calculator",
    description: "Compound growth and goal timelines.",
    category: "finance",
    slug: "savings-calculator",
    status: "coming-soon",
  },
  {
    id: "visa-free-travel-finder",
    title: "Visa-Free Travel Finder",
    description: "Destinations by passport and stay length.",
    category: "travel",
    slug: "visa-free-travel-finder",
    status: "coming-soon",
  },
  {
    id: "travel-budget-calculator",
    title: "Travel Budget Calculator",
    description: "Trip cost breakdown by destination and style.",
    category: "travel",
    slug: "travel-budget-calculator",
    status: "coming-soon",
  },
];

export function toolPath(tool: ToolDefinition): string {
  return `/calculators/${tool.category}/${tool.slug}`;
}

export function getCategory(id: ToolCategoryId): ToolCategory | undefined {
  return TOOL_CATEGORIES.find((c) => c.id === id);
}

export function getToolsByCategory(category: ToolCategoryId): ToolDefinition[] {
  return TOOL_REGISTRY.filter((t) => t.category === category);
}

export function getLiveTools(): ToolDefinition[] {
  return TOOL_REGISTRY.filter((t) => t.status === "live");
}

export function getPopularTools(): ToolDefinition[] {
  return TOOL_REGISTRY.filter((t) => t.popular && t.status === "live");
}

export function getNewTools(): ToolDefinition[] {
  return TOOL_REGISTRY.filter((t) => t.isNew && t.status === "live");
}

export function findTool(category: string, slug: string): ToolDefinition | undefined {
  return TOOL_REGISTRY.find((t) => t.category === category && t.slug === slug);
}

export function getLegacyRedirects(): { source: string; destination: string; permanent: boolean }[] {
  return TOOL_REGISTRY.filter((t) => t.legacyPath && t.status === "live").map((t) => ({
    source: t.legacyPath!,
    destination: toolPath(t),
    permanent: true,
  }));
}

export function toolBreadcrumbs(tool: ToolDefinition): { name: string; path: string }[] {
  const category = getCategory(tool.category)!;
  return [
    { name: "Home", path: "/" },
    { name: "Calculators", path: "/calculators" },
    { name: category.label.replace(" Calculators", ""), path: category.path },
    { name: tool.title, path: toolPath(tool) },
  ];
}
