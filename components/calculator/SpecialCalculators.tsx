"use client";

import { useMemo, useState } from "react";
import { annualToHourly, calculateBonusTax, getTaxData, hourlyToAnnual } from "@/lib/tax";
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

export function IpoCalculator() {
  const [issuePrice, setIssuePrice] = useState(120);
  const [lotSize, setLotSize] = useState(125);
  const [lotsAllotted, setLotsAllotted] = useState(2);
  const [expectedListingPrice, setExpectedListingPrice] = useState(155);
  const [targetExitPrice, setTargetExitPrice] = useState(170);

  const result = useMemo(() => {
    const shares = lotSize * lotsAllotted;
    const applicationAmount = shares * issuePrice;
    const listingValue = shares * expectedListingPrice;
    const targetExitValue = shares * targetExitPrice;
    const listingGain = listingValue - applicationAmount;
    const targetGain = targetExitValue - applicationAmount;
    const listingReturn = applicationAmount > 0 ? listingGain / applicationAmount : 0;
    const targetReturn = applicationAmount > 0 ? targetGain / applicationAmount : 0;

    return {
      shares,
      applicationAmount,
      listingValue,
      listingGain,
      listingReturn,
      targetExitValue,
      targetGain,
      targetReturn,
    };
  }, [issuePrice, lotSize, lotsAllotted, expectedListingPrice, targetExitPrice]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <Input
            label="Issue Price Per Share ($)"
            type="number"
            min={0}
            step={0.01}
            value={issuePrice}
            onChange={(e) => setIssuePrice(parseFloat(e.target.value) || 0)}
          />
          <Input
            label="Lot Size"
            type="number"
            min={1}
            step={1}
            value={lotSize}
            onChange={(e) => setLotSize(parseFloat(e.target.value) || 0)}
          />
          <Input
            label="Lots Allotted"
            type="number"
            min={0}
            step={1}
            value={lotsAllotted}
            onChange={(e) => setLotsAllotted(parseFloat(e.target.value) || 0)}
          />
          <Input
            label="Expected Listing Price ($)"
            type="number"
            min={0}
            step={0.01}
            value={expectedListingPrice}
            onChange={(e) => setExpectedListingPrice(parseFloat(e.target.value) || 0)}
          />
          <Input
            label="Target Exit Price ($)"
            type="number"
            min={0}
            step={0.01}
            value={targetExitPrice}
            onChange={(e) => setTargetExitPrice(parseFloat(e.target.value) || 0)}
          />
        </form>
      </Card>
      <Card>
        <h2 className="text-lg font-semibold text-slate-900">IPO Estimate</h2>
        <dl className="mt-4 space-y-4">
          <div className="flex justify-between gap-4">
            <dt className="text-sm text-slate-600">Total Shares</dt>
            <dd className="font-semibold text-slate-900">{result.shares.toLocaleString("en-US")}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-sm text-slate-600">Application Amount</dt>
            <dd className="font-semibold text-slate-900">{formatMoney(result.applicationAmount, true)}</dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <dt className="text-sm text-slate-600">Estimated Listing Gain</dt>
            <dd className="mt-1 text-2xl font-bold text-emerald-700">
              {formatMoney(result.listingGain, true)}
            </dd>
            <p className="mt-1 text-sm text-slate-600">
              Listing value {formatMoney(result.listingValue, true)} at {formatMoney(expectedListingPrice, true)} per share ({(result.listingReturn * 100).toFixed(1)}%).
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <dt className="text-sm text-slate-600">Estimated Exit Gain</dt>
            <dd className="mt-1 text-xl font-bold text-slate-900">
              {formatMoney(result.targetGain, true)}
            </dd>
            <p className="mt-1 text-sm text-slate-600">
              Exit value {formatMoney(result.targetExitValue, true)} at {formatMoney(targetExitPrice, true)} per share ({(result.targetReturn * 100).toFixed(1)}%).
            </p>
          </div>
        </dl>
      </Card>
    </div>
  );
}

export function NetWorthCalculator({ showComparison = false }: { showComparison?: boolean }) {
  const [cash, setCash] = useState(15000);
  const [investments, setInvestments] = useState(65000);
  const [retirement, setRetirement] = useState(90000);
  const [realEstate, setRealEstate] = useState(320000);
  const [businessAssets, setBusinessAssets] = useState(0);
  const [otherAssets, setOtherAssets] = useState(18000);
  const [mortgage, setMortgage] = useState(210000);
  const [studentLoans, setStudentLoans] = useState(12000);
  const [autoLoans, setAutoLoans] = useState(9000);
  const [creditCards, setCreditCards] = useState(2500);
  const [otherDebts, setOtherDebts] = useState(0);

  const result = useMemo(() => {
    const totalAssets = cash + investments + retirement + realEstate + businessAssets + otherAssets;
    const totalLiabilities = mortgage + studentLoans + autoLoans + creditCards + otherDebts;
    const netWorth = totalAssets - totalLiabilities;
    const liquidAssets = cash + investments;
    const liquidNetWorth = liquidAssets - (creditCards + otherDebts);
    const debtToAssets = totalAssets > 0 ? totalLiabilities / totalAssets : 0;

    return {
      totalAssets,
      totalLiabilities,
      netWorth,
      liquidAssets,
      liquidNetWorth,
      debtToAssets,
    };
  }, [
    autoLoans,
    businessAssets,
    cash,
    creditCards,
    investments,
    mortgage,
    otherAssets,
    otherDebts,
    realEstate,
    retirement,
    studentLoans,
  ]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Assets</h2>
            <Input label="Cash and Checking ($)" type="number" min={0} value={cash} onChange={(e) => setCash(parseFloat(e.target.value) || 0)} />
            <Input label="Brokerage and Investments ($)" type="number" min={0} value={investments} onChange={(e) => setInvestments(parseFloat(e.target.value) || 0)} />
            <Input label="Retirement Accounts ($)" type="number" min={0} value={retirement} onChange={(e) => setRetirement(parseFloat(e.target.value) || 0)} />
            <Input label="Real Estate Equity Value ($)" type="number" min={0} value={realEstate} onChange={(e) => setRealEstate(parseFloat(e.target.value) || 0)} />
            <Input label="Business Assets ($)" type="number" min={0} value={businessAssets} onChange={(e) => setBusinessAssets(parseFloat(e.target.value) || 0)} />
            <Input label="Vehicles and Other Assets ($)" type="number" min={0} value={otherAssets} onChange={(e) => setOtherAssets(parseFloat(e.target.value) || 0)} />
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Liabilities</h2>
            <Input label="Mortgage Balance ($)" type="number" min={0} value={mortgage} onChange={(e) => setMortgage(parseFloat(e.target.value) || 0)} />
            <Input label="Student Loans ($)" type="number" min={0} value={studentLoans} onChange={(e) => setStudentLoans(parseFloat(e.target.value) || 0)} />
            <Input label="Auto Loans ($)" type="number" min={0} value={autoLoans} onChange={(e) => setAutoLoans(parseFloat(e.target.value) || 0)} />
            <Input label="Credit Card Balances ($)" type="number" min={0} value={creditCards} onChange={(e) => setCreditCards(parseFloat(e.target.value) || 0)} />
            <Input label="Other Debts ($)" type="number" min={0} value={otherDebts} onChange={(e) => setOtherDebts(parseFloat(e.target.value) || 0)} />
          </div>
        </form>
      </Card>
      <Card>
        <h2 className="text-lg font-semibold text-slate-900">Net Worth Summary</h2>
        {showComparison && (
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Compare your balance sheet against a billionaire headline by focusing on the core math: assets minus liabilities. This view is for snapshot planning, not a formal financial statement.
          </p>
        )}
        <dl className="mt-4 space-y-4">
          <div className="flex justify-between gap-4">
            <dt className="text-sm text-slate-600">Total Assets</dt>
            <dd className="font-semibold text-slate-900">{formatMoney(result.totalAssets, true)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-sm text-slate-600">Total Liabilities</dt>
            <dd className="font-semibold text-slate-900">{formatMoney(result.totalLiabilities, true)}</dd>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <dt className="text-sm text-slate-600">Estimated Net Worth</dt>
            <dd className="mt-1 text-3xl font-bold text-emerald-700">
              {formatMoney(result.netWorth, true)}
            </dd>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <dt className="text-sm text-slate-600">Liquid Assets</dt>
              <dd className="mt-1 text-xl font-bold text-slate-900">
                {formatMoney(result.liquidAssets, true)}
              </dd>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <dt className="text-sm text-slate-600">Liquid Net Worth</dt>
              <dd className="mt-1 text-xl font-bold text-slate-900">
                {formatMoney(result.liquidNetWorth, true)}
              </dd>
            </div>
          </div>
          <div>
            <dt className="text-sm text-slate-600">Debt-to-Assets Ratio</dt>
            <dd className="mt-1 text-lg font-semibold text-slate-900">
              {(result.debtToAssets * 100).toFixed(1)}%
            </dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}
