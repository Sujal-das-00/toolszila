"use client";

import { useMemo, useState, useCallback } from "react";
import { Input, Select } from "@/components/ui/FormFields";
import { Card } from "@/components/ui/Card";
import {
  calculateIrelandTax,
  IRELAND_MARITAL_STATUS_LABELS,
  IRELAND_PAY_FREQUENCY_LABELS,
  type IrelandMaritalStatus,
  type IrelandPayFrequency,
} from "@/lib/tax/ireland";
import { IrelandTaxResults } from "@/components/calculator/IrelandTaxResults";

const maritalStatusOptions = [
  { value: "single", label: IRELAND_MARITAL_STATUS_LABELS.single },
  { value: "married_one_income", label: IRELAND_MARITAL_STATUS_LABELS.married_one_income },
  { value: "married_two_incomes", label: IRELAND_MARITAL_STATUS_LABELS.married_two_incomes },
] as const;

const payFrequencyOptions = [
  { value: "weekly", label: IRELAND_PAY_FREQUENCY_LABELS.weekly },
  { value: "monthly", label: IRELAND_PAY_FREQUENCY_LABELS.monthly },
  { value: "annual", label: IRELAND_PAY_FREQUENCY_LABELS.annual },
] as const;

export function IrelandTaxCalculator({ defaultSalary }: { defaultSalary: number }) {
  const [salary, setSalary] = useState(defaultSalary);
  const [maritalStatus, setMaritalStatus] = useState<IrelandMaritalStatus>("single");
  const [payFrequency, setPayFrequency] = useState<IrelandPayFrequency>("monthly");

  const breakdown = useMemo(() => {
    if (salary <= 0) return null;
    return calculateIrelandTax({ annualSalary: salary, maritalStatus, payFrequency });
  }, [salary, maritalStatus, payFrequency]);

  const handleSalaryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value.replace(/[^0-9]/g, ""), 10);
    setSalary(isNaN(value) ? 0 : value);
  }, []);

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <Card className="lg:col-span-2">
        <h2 className="text-lg font-semibold text-slate-900">Enter Your Ireland PAYE Details</h2>
        <p className="mt-2 text-sm text-slate-600">
          Estimate Irish take-home pay using 2026 PAYE income tax, USC and Class A PRSI.
        </p>
        <form
          className="mt-6 space-y-5"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Ireland take-home pay calculator form"
        >
          <Input
            label="Annual Salary"
            type="text"
            inputMode="numeric"
            value={salary > 0 ? salary.toLocaleString("en-IE") : ""}
            onChange={handleSalaryChange}
            placeholder="50000"
          />
          <Select
            label="Marital Status"
            options={maritalStatusOptions}
            value={maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value as IrelandMaritalStatus)}
          />
          <Select
            label="Pay Frequency"
            options={payFrequencyOptions}
            value={payFrequency}
            onChange={(e) => setPayFrequency(e.target.value as IrelandPayFrequency)}
          />
        </form>
      </Card>

      <div className="lg:col-span-3">
        {breakdown ? (
          <Card>
            <IrelandTaxResults breakdown={breakdown} />
          </Card>
        ) : (
          <Card>
            <p className="text-slate-600">Enter a valid salary to see Ireland PAYE results.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
