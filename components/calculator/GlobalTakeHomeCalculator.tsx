"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/FormFields";
import { COUNTRY_CALCULATORS } from "@/lib/navigation/country-calculators";

export function GlobalTakeHomeCalculator() {
  const [salary, setSalary] = useState("50000");
  const [countryId, setCountryId] = useState(COUNTRY_CALCULATORS[0]?.id ?? "us");

  const selectedCountry = useMemo(
    () => COUNTRY_CALCULATORS.find((country) => country.id === countryId) ?? COUNTRY_CALCULATORS[0],
    [countryId],
  );

  const salaryAmount = parseInt(salary.replace(/[^0-9]/g, ""), 10) || 0;
  const destination = selectedCountry?.primaryHref ?? "/calculators";

  return (
    <section className="mt-10" aria-labelledby="global-calculator-heading">
      <div className="grid gap-8 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <p className="text-sm font-medium text-emerald-700">Start here</p>
          <h2 id="global-calculator-heading" className="mt-2 text-xl font-bold text-slate-900">
            Global take-home pay calculator
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Choose a country and salary to jump into the right local calculator. ToolsZila keeps country-specific
            tax rules separate so the homepage can stay simple while each destination page handles local details.
          </p>
          <form className="mt-6 space-y-5" onSubmit={(event) => event.preventDefault()}>
            <Input
              label="Annual Salary"
              type="text"
              inputMode="numeric"
              value={salaryAmount > 0 ? salaryAmount.toLocaleString("en-US") : ""}
              onChange={(event) => setSalary(event.target.value)}
              placeholder="50000"
            />
            <Select
              label="Country"
              value={countryId}
              onChange={(event) => setCountryId(event.target.value)}
              options={COUNTRY_CALCULATORS.map((country) => ({
                value: country.id,
                label: `${country.flag} ${country.countryName}`,
              }))}
            />
            <Link
              href={destination}
              className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              {selectedCountry?.primaryLabel ?? "Open calculator"}
            </Link>
          </form>
        </Card>

        <Card className="lg:col-span-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">Selected calculator</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                {selectedCountry?.flag} {selectedCountry?.countryName} take-home pay
              </h3>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              Live
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">{selectedCountry?.summary}</p>
          <dl className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-slate-50 p-4">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Salary entered</dt>
              <dd className="mt-1 text-xl font-bold text-slate-900">
                {salaryAmount > 0 ? salaryAmount.toLocaleString("en-US") : "—"}
              </dd>
            </div>
            <div className="rounded-lg bg-slate-50 p-4 sm:col-span-2">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Local tax system</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-900">{selectedCountry?.taxSystem}</dd>
            </div>
          </dl>
          <div className="mt-6">
            <p className="text-sm font-semibold text-slate-900">Popular pages</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {selectedCountry?.popularLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-emerald-700 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </section>
  );
}
