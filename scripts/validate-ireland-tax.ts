import assert from "node:assert/strict";
import { calculateIrelandTax } from "../lib/tax/ireland";

const cases = [
  {
    salary: 30000,
    expected: {
      incomeTax: 2000,
      usc: 432.82,
      prsi: 1260,
      totalDeductions: 3692.82,
      netAnnual: 26307.18,
      netMonthly: 2192.27,
      netWeekly: 505.91,
      effectiveTaxRate: 0.123094,
    },
  },
  {
    salary: 50000,
    expected: {
      incomeTax: 7200,
      usc: 1032.82,
      prsi: 2100,
      totalDeductions: 10332.82,
      netAnnual: 39667.18,
      netMonthly: 3305.60,
      netWeekly: 762.83,
      effectiveTaxRate: 0.2066564,
    },
  },
  {
    salary: 100000,
    expected: {
      incomeTax: 27200,
      usc: 4030.62,
      prsi: 4200,
      totalDeductions: 35430.62,
      netAnnual: 64569.38,
      netMonthly: 5380.78,
      netWeekly: 1241.72,
      effectiveTaxRate: 0.3543062,
    },
  },
  {
    salary: 13000,
    expected: {
      usc: 0,
      prsi: 0,
    },
  },
  {
    salary: 18304,
    expected: {
      prsi: 0,
    },
  },
  {
    salary: 18305,
    expected: {
      prsi: 768.81,
    },
  },
];

function close(actual: number, expected: number, message: string) {
  assert.ok(Math.abs(actual - expected) < 0.01, `${message}: expected ${expected}, got ${actual}`);
}

for (const item of cases) {
  const result = calculateIrelandTax({ annualSalary: item.salary, maritalStatus: "single", payFrequency: "monthly" });
  for (const [key, expected] of Object.entries(item.expected)) {
    close(result[key as keyof typeof result] as number, expected, `${item.salary} ${key}`);
  }
}

const marriedOneIncome = calculateIrelandTax({ annualSalary: 60000, maritalStatus: "married_one_income", payFrequency: "monthly" });
close(marriedOneIncome.incomeTax, 9400, "60000 married one income tax");

const marriedTwoIncomes = calculateIrelandTax({ annualSalary: 100000, maritalStatus: "married_two_incomes", payFrequency: "monthly" });
close(marriedTwoIncomes.incomeTax, 18400, "100000 married two incomes tax");

console.log("Ireland tax validation passed");
