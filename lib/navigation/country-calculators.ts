export interface CountryCalculatorLink {
  id: string;
  countryName: string;
  countryCode: string;
  flag: string;
  primaryHref: string;
  primaryLabel: string;
  summary: string;
  taxSystem: string;
  available: boolean;
  popularLinks: {
    label: string;
    href: string;
  }[];
}

export const COUNTRY_CALCULATORS: CountryCalculatorLink[] = [
  {
    id: "us",
    countryName: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    primaryHref: "/calculators/income/paycheck-calculator",
    primaryLabel: "Open US Paycheck Calculator",
    summary:
      "Estimate federal income tax, state income tax, Social Security, Medicare and net pay across all 50 states.",
    taxSystem: "Federal, state and FICA payroll taxes",
    available: true,
    popularLinks: [
      { label: "California paycheck calculator", href: "/california-paycheck-calculator" },
      { label: "Texas paycheck calculator", href: "/texas-paycheck-calculator" },
      { label: "Florida paycheck calculator", href: "/florida-paycheck-calculator" },
      { label: "$50,000 salary after tax", href: "/50000-salary-after-tax" },
    ],
  },
  {
    id: "ireland",
    countryName: "Ireland",
    countryCode: "IE",
    flag: "🇮🇪",
    primaryHref: "/ireland-take-home-pay-calculator",
    primaryLabel: "Open Ireland PAYE Calculator",
    summary:
      "Estimate PAYE income tax, USC, Class A PRSI and monthly take-home pay for Irish salaries.",
    taxSystem: "PAYE income tax, USC and PRSI",
    available: true,
    popularLinks: [
      { label: "€30,000 after tax Ireland", href: "/30000-after-tax-ireland" },
      { label: "€50,000 after tax Ireland", href: "/50000-after-tax-ireland" },
      { label: "€70,000 after tax Ireland", href: "/70000-after-tax-ireland" },
      { label: "€100,000 after tax Ireland", href: "/100000-after-tax-ireland" },
    ],
  },
  {
    id: "new-zealand",
    countryName: "New Zealand",
    countryCode: "NZ",
    flag: "🇳🇿",
    primaryHref: "/nz-take-home-pay-calculator",
    primaryLabel: "Open NZ PAYE Calculator",
    summary:
      "Estimate PAYE income tax, ACC earners' levy, optional KiwiSaver and fortnightly take-home pay for New Zealand salaries.",
    taxSystem: "PAYE income tax, ACC levy, KiwiSaver and student loan options",
    available: true,
    popularLinks: [
      { label: "NZ$30,000 after tax NZ", href: "/30000-after-tax-nz" },
      { label: "NZ$50,000 after tax NZ", href: "/50000-after-tax-nz" },
      { label: "NZ$60,000 after tax NZ", href: "/60000-after-tax-nz" },
      { label: "NZ$100,000 after tax NZ", href: "/100000-after-tax-nz" },
    ],
  },
];

export const FUTURE_COUNTRY_CALCULATORS: CountryCalculatorLink[] = [
  {
    id: "uk",
    countryName: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    primaryHref: "/calculators",
    primaryLabel: "Coming soon",
    summary: "Planned UK salary calculator for income tax, National Insurance and take-home pay.",
    taxSystem: "PAYE income tax and National Insurance",
    available: false,
    popularLinks: [],
  },
  {
    id: "canada",
    countryName: "Canada",
    countryCode: "CA",
    flag: "🇨🇦",
    primaryHref: "/calculators",
    primaryLabel: "Coming soon",
    summary: "Planned Canada take-home pay calculator for federal and provincial payroll deductions.",
    taxSystem: "Federal and provincial payroll deductions",
    available: false,
    popularLinks: [],
  },
];

export const ALL_COUNTRY_CALCULATORS = [
  ...COUNTRY_CALCULATORS,
  ...FUTURE_COUNTRY_CALCULATORS,
];
