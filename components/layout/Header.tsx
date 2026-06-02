import Link from "next/link";
import { siteConfig } from "@/lib/constants";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

/** Sticky site header — platform branding with scalable navigation. */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:py-4">
        <Link href="/" className="group flex min-w-0 flex-col">
          <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-700">
            {siteConfig.name}
          </span>
          <span className="truncate text-xs text-slate-500 sm:text-[0.8125rem]">
            {siteConfig.tagline}
          </span>
        </Link>

        <DesktopNav />

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/calculators"
            className="hidden rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-700 hover:border-emerald-200 hover:text-emerald-700 sm:inline-flex"
          >
            Browse tools
          </Link>
          <Link
            href="/"
            className="hidden rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 md:inline-flex"
          >
            Paycheck calculator
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
