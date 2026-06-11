"use client";

/**
 * Interactive paycheck calculator — client component for form interactivity.
 * Tax logic lives in lib/tax (pure functions) so calculations are testable
 * and shared with SSG pages that pre-compute results at build time.
 */

import { useMemo, useState, useCallback } from "react";
import type { FilingStatus, PayFrequency } from "@/types/tax";
import { calculatePaycheck, getTaxData } from "@/lib/tax";
import { FILING_STATUSES, PAY_FREQUENCIES } from "@/lib/constants";
import { Input, Select } from "@/components/ui/FormFields";
import { Card } from "@/components/ui/Card";
import { PaycheckResults } from "@/components/calculator/PaycheckResults";

const STATE_OPTIONS = getTaxData().states.map((state) => ({
  value: state.code,
  label: state.name,
}));

export interface PaycheckCalculatorProps {
  defaultSalary?: number;
  defaultState?: string;
  defaultFilingStatus?: FilingStatus;
  defaultPayFrequency?: PayFrequency;
}

export function PaycheckCalculator({
  defaultSalary = 75000,
  defaultState = "CA",
  defaultFilingStatus = "single",
  defaultPayFrequency = "biweekly",
}: PaycheckCalculatorProps) {
  const [salary, setSalary] = useState(defaultSalary);
  const [stateCode, setStateCode] = useState(defaultState);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>(defaultFilingStatus);
  const [payFrequency, setPayFrequency] = useState<PayFrequency>(defaultPayFrequency);

  const breakdown = useMemo(() => {
    if (salary <= 0) return null;
    try {
      return calculatePaycheck({
        annualSalary: salary,
        stateCode,
        filingStatus,
        payFrequency,
      });
    } catch {
      return null;
    }
  }, [salary, stateCode, filingStatus, payFrequency]);

  const handleSalaryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value.replace(/[^0-9]/g, ""), 10);
      setSalary(isNaN(value) ? 0 : value);
    },
    [],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <Card className="lg:col-span-2">
        <h2 className="text-lg font-semibold text-slate-900">Enter Your Details</h2>
        <form
          className="mt-6 space-y-5"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Paycheck calculator form"
        >
          <Input
            label="Annual Salary"
            type="text"
            inputMode="numeric"
            value={salary > 0 ? salary.toLocaleString("en-US") : ""}
            onChange={handleSalaryChange}
            placeholder="75000"
          />
          <Select
            label="State"
            options={STATE_OPTIONS}
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
          />
          <Select
            label="Filing Status"
            options={FILING_STATUSES}
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
          />
          <Select
            label="Pay Frequency"
            options={PAY_FREQUENCIES}
            value={payFrequency}
            onChange={(e) => setPayFrequency(e.target.value as PayFrequency)}
          />
        </form>
      </Card>

      <div className="lg:col-span-3">
        {breakdown ? (
          <Card>
            <PaycheckResults breakdown={breakdown} payFrequency={payFrequency} />
          </Card>
        ) : (
          <Card>
            <p className="text-slate-600">Enter a valid salary to see results.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
