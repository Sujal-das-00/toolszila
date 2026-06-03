import Link from "next/link";
import { siteConfig } from "@/lib/constants";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

/** Sticky site header — platform branding with scalable navigation. */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-3 sm:h-16 sm:gap-3 sm:px-6 lg:h-[4.25rem]">
        <Link href="/" className="group flex min-w-0 flex-1 flex-col pr-2 sm:pr-3">
          <span className="truncate text-base font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 sm:text-lg">
            {siteConfig.name}
          </span>
          <span className="truncate text-xs text-slate-500 sm:text-[0.8125rem]">
            {siteConfig.tagline}
          </span>
        </Link>

        <DesktopNav />

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Link
            href="/calculators"
            className="hidden min-h-10 items-center rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-700 hover:border-emerald-200 hover:text-emerald-700 lg:inline-flex"
          >
            Browse tools
          </Link>
          <Link
            href="/"
            className="hidden min-h-10 items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 lg:inline-flex"
          >
            Paycheck calculator
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
