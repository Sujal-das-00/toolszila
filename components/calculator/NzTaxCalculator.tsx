"use client";

import { useMemo, useState, useCallback } from "react";
import { Input, Select } from "@/components/ui/FormFields";
import { Card } from "@/components/ui/Card";
import { NzTaxResults } from "@/components/calculator/NzTaxResults";
import {
  calculateNzTax,
  NZ_DEPENDENTS_LABELS,
  NZ_KIWISAVER_OPTIONS,
  NZ_MARITAL_STATUS_LABELS,
  NZ_PAY_FREQUENCY_LABELS,
  type NzDependents,
  type NzKiwiSaverRate,
  type NzMaritalStatus,
  type NzPayFrequency,
} from "@/lib/tax/new-zealand";

const MARITAL_OPTIONS = [
  { value: "single", label: NZ_MARITAL_STATUS_LABELS.single },
  { value: "married_one_income", label: NZ_MARITAL_STATUS_LABELS.married_one_income },
  { value: "married_two_incomes", label: NZ_MARITAL_STATUS_LABELS.married_two_incomes },
  { value: "single_parent", label: NZ_MARITAL_STATUS_LABELS.single_parent },
] as const;

const DEPENDENT_OPTIONS = [
  { value: "none", label: NZ_DEPENDENTS_LABELS.none },
  { value: "one_plus", label: NZ_DEPENDENTS_LABELS.one_plus },
] as const;

const PAY_OPTIONS = [
  { value: "weekly", label: NZ_PAY_FREQUENCY_LABELS.weekly },
  { value: "fortnightly", label: NZ_PAY_FREQUENCY_LABELS.fortnightly },
  { value: "monthly", label: NZ_PAY_FREQUENCY_LABELS.monthly },
  { value: "annual", label: NZ_PAY_FREQUENCY_LABELS.annual },
] as const;

const KIWISAVER_OPTIONS = NZ_KIWISAVER_OPTIONS.map((option) => ({
  value: String(option.value),
  label: option.label,
}));

const STUDENT_LOAN_OPTIONS = [
  { value: "no", label: "No" },
  { value: "yes", label: "Yes" },
] as const;

export function NzTaxCalculator({ defaultSalary }: { defaultSalary: number }) {
  const [salary, setSalary] = useState(defaultSalary);
  const [maritalStatus, setMaritalStatus] = useState<NzMaritalStatus>("single");
  const [dependents, setDependents] = useState<NzDependents>("none");
  const [payFrequency, setPayFrequency] = useState<NzPayFrequency>("fortnightly");
  const [kiwiSaverRate, setKiwiSaverRate] = useState<NzKiwiSaverRate>(0);
  const [hasStudentLoan, setHasStudentLoan] = useState(false);

  const breakdown = useMemo(() => {
    if (salary <= 0) return null;
    return calculateNzTax({ annualSalary: salary, maritalStatus, dependents, payFrequency, kiwiSaverRate, hasStudentLoan });
  }, [salary, maritalStatus, dependents, payFrequency, kiwiSaverRate, hasStudentLoan]);

  const handleSalaryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/[^0-9]/g, ""), 10);
    setSalary(isNaN(value) ? 0 : value);
  }, []);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <Card className="lg:col-span-2">
        <h2 className="text-lg font-semibold text-slate-900">Enter Your NZ PAYE Details</h2>
        <p className="mt-2 text-sm text-slate-600">
          Estimate New Zealand take-home pay using 2026/27 PAYE, ACC, optional KiwiSaver and optional student loan repayments.
        </p>
        <form className="mt-6 space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="New Zealand take-home pay calculator form">
          <Input label="Annual Salary" type="text" inputMode="numeric" value={salary > 0 ? salary.toLocaleString("en-NZ") : ""} onChange={handleSalaryChange} placeholder="60000" />
          <Select label="Marital Status" options={MARITAL_OPTIONS} value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value as NzMaritalStatus)} />
          <Select label="Dependents" options={DEPENDENT_OPTIONS} value={dependents} onChange={(e) => setDependents(e.target.value as NzDependents)} />
          <Select label="Pay Frequency" options={PAY_OPTIONS} value={payFrequency} onChange={(e) => setPayFrequency(e.target.value as NzPayFrequency)} />
          <Select
            label="KiwiSaver Rate"
            options={KIWISAVER_OPTIONS}
            value={String(kiwiSaverRate)}
            onChange={(e) => setKiwiSaverRate(Number(e.target.value) as NzKiwiSaverRate)}
          />
          <Select
            label="Student Loan"
            options={STUDENT_LOAN_OPTIONS}
            value={hasStudentLoan ? "yes" : "no"}
            onChange={(e) => setHasStudentLoan(e.target.value === "yes")}
          />
        </form>
      </Card>
      <div className="lg:col-span-3">
        {breakdown ? <Card><NzTaxResults breakdown={breakdown} /></Card> : <Card><p className="text-slate-600">Enter a valid salary to see NZ PAYE results.</p></Card>}
      </div>
    </div>
  );
}
