import assert from "node:assert/strict";
import { calculateNzTax } from "../lib/tax/new-zealand";

const cases = [
  {
    salary: 30000,
    expected: {
      payeIncomeTax: 4158,
      accLevy: 525,
      totalDeductions: 4683,
      netAnnual: 25317,
      netFortnightly: 973.73,
      netMonthly: 2109.75,
      effectiveTaxRate: 0.1561,
    },
  },
  {
    salary: 60000,
    expected: {
      payeIncomeTax: 10220.5,
      accLevy: 1050,
      totalDeductions: 11270.5,
      netAnnual: 48729.5,
      netFortnightly: 1874.21,
      netMonthly: 4060.79,
      effectiveTaxRate: 0.187842,
    },
  },
  {
    salary: 100000,
    expected: {
      payeIncomeTax: 22877.5,
      accLevy: 1750,
      totalDeductions: 24627.5,
      netAnnual: 75372.5,
      netFortnightly: 2898.94,
      netMonthly: 6281.04,
      effectiveTaxRate: 0.246275,
    },
  },
  {
    salary: 180000,
    expected: {
      payeIncomeTax: 49277.5,
      accLevy: 2741.22,
      totalDeductions: 52018.72,
      netAnnual: 127981.28,
    },
  },
  {
    salary: 200000,
    expected: {
      payeIncomeTax: 57077.5,
      accLevy: 2741.22,
      totalDeductions: 59818.72,
      netAnnual: 140181.28,
    },
  },
];

function close(actual: number, expected: number, message: string) {
  assert.ok(Math.abs(actual - expected) < 0.02, `${message}: expected ${expected}, got ${actual}`);
}

for (const item of cases) {
  const result = calculateNzTax({ annualSalary: item.salary, maritalStatus: "single", dependents: "none", payFrequency: "fortnightly", kiwiSaverRate: 0, hasStudentLoan: false });
  for (const [key, expected] of Object.entries(item.expected)) {
    close(result[key as keyof typeof result] as number, expected, `${item.salary} ${key}`);
  }
}

const withKiwiSaver = calculateNzTax({ annualSalary: 60000, maritalStatus: "single", dependents: "none", payFrequency: "fortnightly", kiwiSaverRate: 0.035, hasStudentLoan: false });
close(withKiwiSaver.kiwiSaver, 2100, "60000 KiwiSaver 3.5%");
close(withKiwiSaver.totalDeductions, 13370.5, "60000 total with KiwiSaver");

const withStudentLoan = calculateNzTax({ annualSalary: 60000, maritalStatus: "single", dependents: "none", payFrequency: "fortnightly", kiwiSaverRate: 0, hasStudentLoan: true });
close(withStudentLoan.studentLoan, 4304.64, "60000 student loan");
close(withStudentLoan.totalDeductions, 15575.14, "60000 total with student loan");

const oneDollar = calculateNzTax({ annualSalary: 1, maritalStatus: "single", dependents: "none", payFrequency: "annual", kiwiSaverRate: 0, hasStudentLoan: false });
assert.ok(oneDollar.payeIncomeTax > 0, "NZ has no tax-free threshold");

console.log("NZ tax validation passed");
