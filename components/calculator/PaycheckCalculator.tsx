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
  isHourly?: boolean;
  defaultHourlyRate?: number;
  defaultHoursPerWeek?: number;
}

export function PaycheckCalculator({
  defaultSalary = 75000,
  defaultState = "CA",
  defaultFilingStatus = "single",
  defaultPayFrequency = "biweekly",
  isHourly = false,
  defaultHourlyRate = 25,
  defaultHoursPerWeek = 40,
}: PaycheckCalculatorProps) {
  const [salary, setSalary] = useState(defaultSalary);
  const [stateCode, setStateCode] = useState(defaultState);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>(defaultFilingStatus);
  const [payFrequency, setPayFrequency] = useState<PayFrequency>(defaultPayFrequency);
  const [inputType, setInputType] = useState<'salary' | 'hourly'>(isHourly ? 'hourly' : 'salary');
  const [hourlyRate, setHourlyRate] = useState(defaultHourlyRate);
  const [hoursPerWeek, setHoursPerWeek] = useState(defaultHoursPerWeek);

  // Calculate annual salary based on input type
  const annualSalary = useMemo(() => {
    if (inputType === 'hourly') {
      return hourlyRate * hoursPerWeek * 52;
    }
    return salary;
  }, [inputType, hourlyRate, hoursPerWeek, salary]);

  const breakdown = useMemo(() => {
    if (annualSalary <= 0) return null;
    try {
      return calculatePaycheck({
        annualSalary,
        stateCode,
        filingStatus,
        payFrequency,
      });
    } catch {
      return null;
    }
  }, [annualSalary, stateCode, filingStatus, payFrequency]);

  const handleSalaryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value.replace(/[^0-9]/g, ""), 10);
      setSalary(isNaN(value) ? 0 : value);
    },
    []
  );

  const handleHourlyRateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      setHourlyRate(isNaN(value) ? 0 : value);
    },
    []
  );

  const handleHoursPerWeekChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      setHoursPerWeek(isNaN(value) ? 0 : value);
    },
    []
  );

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <Card className="lg:col-span-2">
        <h2 className="text-lg font-semibold text-slate-900">Enter Your Details</h2>
        <form className="mt-6 space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Paycheck calculator form">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Input Type
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="inputType"
                  value="salary"
                  checked={inputType === "salary"}
                  onChange={(e) => setInputType("salary")}
                  className="h-4 w-4 text-indigo-600"
                />
                Salary
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="inputType"
                  value="hourly"
                  checked={inputType === "hourly"}
                  onChange={(e) => setInputType("hourly")}
                  className="h-4 w-4 text-indigo-600"
                />
                Hourly
              </label>
            </div>
          </div>

          {inputType === "salary" ? (
            <Input
              label="Annual Salary"
              type="text"
              inputMode="numeric"
              value={salary > 0 ? salary.toLocaleString("en-US") : ""}
              onChange={handleSalaryChange}
              placeholder="75000"
            />
          ) : (
            <>
              <Input
                label="Hourly Rate ($)"
                type="text"
                inputMode="decimal"
                value={hourlyRate > 0 ? hourlyRate.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ""}
                onChange={handleHourlyRateChange}
                placeholder="25.00"
              />
              <Input
                label="Hours per Week"
                type="text"
                inputMode="numeric"
                value={hoursPerWeek > 0 ? hoursPerWeek.toLocaleString("en-US") : ""}
                onChange={handleHoursPerWeekChange}
                placeholder="40"
              />
            </>
          )}

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
            <p className="text-slate-600">Enter valid details to see results.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
