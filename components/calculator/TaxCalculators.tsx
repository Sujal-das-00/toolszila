"use client";

import { useMemo, useState } from "react";
import { Card, ResultCard } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/FormFields";
import { FILING_STATUSES } from "@/lib/constants";
import {
  calculateIncomeTaxEstimate,
  calculateSocialSecurityTaxEstimate,
  calculateSelfEmploymentTaxEstimate,
  calculateTotalTaxEstimate,
  getTaxData,
  taxYears,
} from "@/lib/tax";
import type { FilingStatus } from "@/types/tax";
import { formatMoney, formatPct } from "@/lib/utils";

function parseWholeNumber(value: string): number {
  const parsed = parseInt(value.replace(/[^0-9]/g, ""), 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function TaxCalculator() {
  const states = getTaxData().states.map((state) => ({ value: state.code, label: state.name }));
  const [income, setIncome] = useState(85000);
  const [stateCode, setStateCode] = useState("CA");
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");

  const result = useMemo(
    () => calculateTotalTaxEstimate(income, filingStatus, stateCode),
    [income, filingStatus, stateCode],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <h2 className="text-lg font-semibold text-slate-900">Tax Inputs</h2>
        <form className="mt-6 space-y-5" onSubmit={(e) => e.preventDefault()}>
          <Input
            label="Annual Income"
            type="text"
            inputMode="numeric"
            value={income > 0 ? income.toLocaleString("en-US") : ""}
            onChange={(e) => setIncome(parseWholeNumber(e.target.value))}
            placeholder="85000"
          />
          <Select
            label="State"
            options={states}
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
          />
          <Select
            label="Filing Status"
            options={FILING_STATUSES}
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
          />
        </form>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-slate-900">Estimated Total Tax</h2>
        <p className="mt-1 text-sm text-slate-600">
          Includes federal income tax, state income tax, Social Security, and Medicare using {taxYears.federal}/{taxYears.fica} data.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <ResultCard label="Total Tax" value={formatMoney(result.totalTax)} highlight />
          <ResultCard label="Net After Tax" value={formatMoney(result.netAfterTax)} highlight />
          <ResultCard label="Federal Tax" value={formatMoney(result.federalTax)} />
          <ResultCard label="State Tax" value={formatMoney(result.stateTax)} />
          <ResultCard label="Social Security" value={formatMoney(result.socialSecurity)} />
          <ResultCard label="Medicare" value={formatMoney(result.medicare)} />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <ResultCard label="Effective Tax Rate" value={formatPct(result.effectiveTaxRate)} />
          <ResultCard label="Marginal Federal Rate" value={formatPct(result.marginalFederalRate)} />
          <ResultCard label="Marginal State Rate" value={formatPct(result.marginalStateRate)} />
        </div>
      </Card>
    </div>
  );
}

export function IncomeTaxCalculator() {
  const states = getTaxData().states.map((state) => ({ value: state.code, label: state.name }));
  const [income, setIncome] = useState(85000);
  const [stateCode, setStateCode] = useState("CA");
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");

  const result = useMemo(
    () => calculateIncomeTaxEstimate(income, filingStatus, stateCode),
    [income, filingStatus, stateCode],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <h2 className="text-lg font-semibold text-slate-900">Income Tax Inputs</h2>
        <form className="mt-6 space-y-5" onSubmit={(e) => e.preventDefault()}>
          <Input
            label="Annual Income"
            type="text"
            inputMode="numeric"
            value={income > 0 ? income.toLocaleString("en-US") : ""}
            onChange={(e) => setIncome(parseWholeNumber(e.target.value))}
            placeholder="85000"
          />
          <Select
            label="State"
            options={states}
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
          />
          <Select
            label="Filing Status"
            options={FILING_STATUSES}
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
          />
        </form>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-slate-900">Income Tax Estimate</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <ResultCard label="Federal Income Tax" value={formatMoney(result.federalTax)} highlight />
          <ResultCard label="State Income Tax" value={formatMoney(result.stateTax)} highlight />
          <ResultCard label="Total Income Tax" value={formatMoney(result.totalIncomeTax)} />
          <ResultCard label="Net After Income Tax" value={formatMoney(result.netAfterIncomeTax)} />
          <ResultCard label="Federal Taxable Income" value={formatMoney(result.federalTaxableIncome)} />
          <ResultCard label="State Taxable Income" value={formatMoney(result.stateTaxableIncome)} />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <ResultCard label="Effective Income Tax Rate" value={formatPct(result.effectiveIncomeTaxRate)} />
          <ResultCard label="Marginal Federal Rate" value={formatPct(result.marginalFederalRate)} />
          <ResultCard label="Marginal State Rate" value={formatPct(result.marginalStateRate)} />
        </div>
      </Card>
    </div>
  );
}

export function FederalTaxCalculator() {
  const [income, setIncome] = useState(85000);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");

  const result = useMemo(
    () => calculateIncomeTaxEstimate(income, filingStatus, "TX"),
    [income, filingStatus],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <h2 className="text-lg font-semibold text-slate-900">Federal Tax Inputs</h2>
        <form className="mt-6 space-y-5" onSubmit={(e) => e.preventDefault()}>
          <Input
            label="Annual Taxable Income Proxy"
            type="text"
            inputMode="numeric"
            value={income > 0 ? income.toLocaleString("en-US") : ""}
            onChange={(e) => setIncome(parseWholeNumber(e.target.value))}
            placeholder="85000"
          />
          <Select
            label="Filing Status"
            options={FILING_STATUSES}
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
          />
        </form>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-slate-900">Federal Tax Estimate</h2>
        <p className="mt-1 text-sm text-slate-600">
          Uses the {taxYears.federal} federal standard deduction and progressive brackets.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <ResultCard label="Federal Tax" value={formatMoney(result.federalTax)} highlight />
          <ResultCard label="Federal Taxable Income" value={formatMoney(result.federalTaxableIncome)} />
          <ResultCard label="Marginal Federal Rate" value={formatPct(result.marginalFederalRate)} />
          <ResultCard label="Net After Federal Tax" value={formatMoney(income - result.federalTax)} />
        </div>
      </Card>
    </div>
  );
}

export function SelfEmploymentTaxCalculator() {
  const [income, setIncome] = useState(90000);
  const [wagesUsed, setWagesUsed] = useState(0);
  const [medicareWages, setMedicareWages] = useState(0);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");

  const result = useMemo(
    () => calculateSelfEmploymentTaxEstimate(income, filingStatus, wagesUsed, medicareWages),
    [income, filingStatus, wagesUsed, medicareWages],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <h2 className="text-lg font-semibold text-slate-900">Self-Employment Inputs</h2>
        <form className="mt-6 space-y-5" onSubmit={(e) => e.preventDefault()}>
          <Input
            label="Net Self-Employment Income"
            type="text"
            inputMode="numeric"
            value={income > 0 ? income.toLocaleString("en-US") : ""}
            onChange={(e) => setIncome(parseWholeNumber(e.target.value))}
            placeholder="90000"
          />
          <Select
            label="Filing Status"
            options={FILING_STATUSES}
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
          />
          <Input
            label="W-2 Wages Already Subject to Social Security"
            type="text"
            inputMode="numeric"
            value={wagesUsed > 0 ? wagesUsed.toLocaleString("en-US") : ""}
            onChange={(e) => setWagesUsed(parseWholeNumber(e.target.value))}
            placeholder="0"
          />
          <Input
            label="Wages Already Counted for Additional Medicare"
            type="text"
            inputMode="numeric"
            value={medicareWages > 0 ? medicareWages.toLocaleString("en-US") : ""}
            onChange={(e) => setMedicareWages(parseWholeNumber(e.target.value))}
            placeholder="0"
          />
        </form>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-slate-900">Schedule SE Estimate</h2>
        <p className="mt-1 text-sm text-slate-600">
          Applies the 92.35% Schedule SE adjustment, Social Security wage base limits, and Medicare rules.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <ResultCard label="Schedule SE Income" value={formatMoney(result.scheduleSEIncome)} />
          <ResultCard label="Remaining SS Wage Base" value={formatMoney(result.remainingSocialSecurityWageBase)} />
          <ResultCard label="Social Security Tax" value={formatMoney(result.socialSecurityTax)} />
          <ResultCard label="Medicare Tax" value={formatMoney(result.medicareTax)} />
          <ResultCard label="Additional Medicare Tax" value={formatMoney(result.additionalMedicareTax)} />
          <ResultCard label="Schedule SE Tax" value={formatMoney(result.scheduleSETax)} highlight />
          <ResultCard label="Total SE + Addl Medicare" value={formatMoney(result.totalTax)} highlight />
          <ResultCard label="Deductible Half" value={formatMoney(result.deductibleHalf)} />
        </div>
      </Card>
    </div>
  );
}

export function SocialSecurityTaxCalculator() {
  const [wages, setWages] = useState(85000);

  const result = useMemo(() => calculateSocialSecurityTaxEstimate(wages), [wages]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <h2 className="text-lg font-semibold text-slate-900">Social Security Inputs</h2>
        <form className="mt-6 space-y-5" onSubmit={(e) => e.preventDefault()}>
          <Input
            label="Wages Subject to Social Security"
            type="text"
            inputMode="numeric"
            value={wages > 0 ? wages.toLocaleString("en-US") : ""}
            onChange={(e) => setWages(parseWholeNumber(e.target.value))}
            placeholder="85000"
          />
        </form>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-slate-900">Social Security Tax Estimate</h2>
        <p className="mt-1 text-sm text-slate-600">
          Uses the employee 6.2% Social Security rate and the current wage base cap.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <ResultCard label="Taxable Wages" value={formatMoney(result.taxableWages)} />
          <ResultCard label="Wages Above Wage Base" value={formatMoney(result.wagesAboveBase)} />
          <ResultCard label="Employee Tax" value={formatMoney(result.employeeTax)} highlight />
          <ResultCard label="Employer Match" value={formatMoney(result.employerMatch)} />
          <ResultCard label="Self-Employed Equivalent" value={formatMoney(result.selfEmployedEquivalent)} />
          <ResultCard label="Wage Base" value={formatMoney(result.wageBase)} />
        </div>
      </Card>
    </div>
  );
}
