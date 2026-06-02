"use client";

import { useMemo, useState } from "react";
import { hourlyToAnnual, annualToHourly, calculateBonusTax, getTaxData } from "@/lib/tax";
import { Input } from "@/components/ui/FormFields";
import { Card } from "@/components/ui/Card";
import { formatMoney } from "@/lib/utils";

type Mode = "hourly-to-salary" | "salary-to-hourly";

export function HourlySalaryConverter({ mode }: { mode: Mode }) {
  const [hourlyRate, setHourlyRate] = useState(25);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [annualSalary, setAnnualSalary] = useState(52000);

  const result = useMemo(() => {
    if (mode === "hourly-to-salary") {
      return { annual: hourlyToAnnual(hourlyRate, hoursPerWeek), hourly: hourlyRate };
    }
    return { annual: annualSalary, hourly: annualToHourly(annualSalary, hoursPerWeek) };
  }, [mode, hourlyRate, hoursPerWeek, annualSalary]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {mode === "hourly-to-salary" ? (
            <>
              <Input
                label="Hourly Wage ($)"
                type="number"
                min={0}
                step={0.01}
                value={hourlyRate}
                onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
              />
              <Input
                label="Hours Per Week"
                type="number"
                min={1}
                max={168}
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(parseFloat(e.target.value) || 40)}
              />
            </>
          ) : (
            <>
              <Input
                label="Annual Salary ($)"
                type="number"
                min={0}
                value={annualSalary}
                onChange={(e) => setAnnualSalary(parseFloat(e.target.value) || 0)}
              />
              <Input
                label="Hours Per Week"
                type="number"
                min={1}
                max={168}
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(parseFloat(e.target.value) || 40)}
              />
            </>
          )}
        </form>
      </Card>
      <Card>
        <h2 className="text-lg font-semibold text-slate-900">Result</h2>
        <dl className="mt-4 space-y-4">
          <div>
            <dt className="text-sm text-slate-600">Annual Salary</dt>
            <dd className="text-2xl font-bold text-emerald-700">
              {formatMoney(result.annual)}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-slate-600">Hourly Rate</dt>
            <dd className="text-2xl font-bold text-slate-900">
              {formatMoney(result.hourly, true)}/hr
            </dd>
          </div>
          <div>
            <dt className="text-sm text-slate-600">Weekly Gross</dt>
            <dd className="text-lg font-semibold text-slate-900">
              {formatMoney(result.hourly * hoursPerWeek, true)}
            </dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}

export function OvertimeCalculator() {
  const [hourlyRate, setHourlyRate] = useState(25);
  const [regularHours, setRegularHours] = useState(40);
  const [overtimeHours, setOvertimeHours] = useState(5);
  const [multiplier, setMultiplier] = useState(1.5);

  const result = useMemo(() => {
    const regular = hourlyRate * regularHours;
    const overtime = hourlyRate * multiplier * overtimeHours;
    return { regular, overtime, total: regular + overtime };
  }, [hourlyRate, regularHours, overtimeHours, multiplier]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <Input
            label="Hourly Rate ($)"
            type="number"
            min={0}
            step={0.01}
            value={hourlyRate}
            onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
          />
          <Input
            label="Regular Hours"
            type="number"
            min={0}
            value={regularHours}
            onChange={(e) => setRegularHours(parseFloat(e.target.value) || 0)}
          />
          <Input
            label="Overtime Hours"
            type="number"
            min={0}
            value={overtimeHours}
            onChange={(e) => setOvertimeHours(parseFloat(e.target.value) || 0)}
          />
          <Input
            label="Overtime Multiplier"
            type="number"
            min={1}
            step={0.1}
            value={multiplier}
            onChange={(e) => setMultiplier(parseFloat(e.target.value) || 1.5)}
          />
        </form>
      </Card>
      <Card>
        <h2 className="text-lg font-semibold text-slate-900">Weekly Pay</h2>
        <dl className="mt-4 space-y-4">
          <div>
            <dt className="text-sm text-slate-600">Regular Pay</dt>
            <dd className="text-xl font-bold">{formatMoney(result.regular, true)}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-600">Overtime Pay</dt>
            <dd className="text-xl font-bold">{formatMoney(result.overtime, true)}</dd>
          </div>
          <div className="border-t border-slate-200 pt-4">
            <dt className="text-sm text-slate-600">Total Weekly Gross</dt>
            <dd className="text-2xl font-bold text-emerald-700">
              {formatMoney(result.total, true)}
            </dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}

export function BonusTaxCalculator() {
  const [bonus, setBonus] = useState(10000);
  const [stateCode, setStateCode] = useState("CA");
  const states = getTaxData().states;
  const result = calculateBonusTax(bonus, "single", stateCode);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <Input
            label="Bonus Amount ($)"
            type="number"
            min={0}
            value={bonus}
            onChange={(e) => setBonus(parseFloat(e.target.value) || 0)}
          />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="bonus-state" className="text-sm font-medium text-slate-700">
              State
            </label>
            <select
              id="bonus-state"
              className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
            >
              {states.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </Card>
      <Card>
        <h2 className="text-lg font-semibold text-slate-900">Bonus After Tax</h2>
        <dl className="mt-4 space-y-3">
          <div className="flex justify-between">
            <dt className="text-sm text-slate-600">Federal (22% flat)</dt>
            <dd className="font-medium">{formatMoney(result.federal, true)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm text-slate-600">State Tax</dt>
            <dd className="font-medium">{formatMoney(result.state, true)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm text-slate-600">FICA</dt>
            <dd className="font-medium">{formatMoney(result.fica, true)}</dd>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-3">
            <dt className="font-semibold text-slate-900">Net Bonus</dt>
            <dd className="text-xl font-bold text-emerald-700">
              {formatMoney(result.net, true)}
            </dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}
