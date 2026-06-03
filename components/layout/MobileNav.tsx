"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { siteConfig } from "@/lib/constants";
import { MAIN_NAV, isNavDropdown, type NavDropdown } from "@/lib/navigation/menus";

function MobileDropdown({
  dropdown,
  onNavigate,
}: {
  dropdown: NavDropdown;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        type="button"
        className="flex min-h-12 w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-800 active:bg-slate-50"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {dropdown.label}
        <span
          className={`text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          ▾
        </span>
      </button>
      <div
        id={panelId}
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="space-y-0.5 bg-slate-50 px-3 pb-3 pt-1">
            {dropdown.sections.map((section, si) => (
              <div key={si}>
                {section.title && (
                  <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {section.title}
                  </p>
                )}
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block min-h-11 rounded-lg px-3 py-2.5 active:bg-white"
                    onClick={onNavigate}
                  >
                    <span className="text-sm font-medium text-slate-800">{link.label}</span>
                    {link.description && (
                      <span className="mt-0.5 block text-xs leading-snug text-slate-500">
                        {link.description}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Accessible mobile navigation drawer — visible below lg (matches DesktopNav). */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
    const trigger = triggerRef.current;

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open, close]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 active:bg-slate-100 sm:h-11 sm:w-11"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? "Close" : "Menu"}</span>
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          {open ? (
            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
          aria-label="Close menu overlay"
          tabIndex={open ? 0 : -1}
          onClick={close}
        />
        <div
          ref={dialogRef}
          id="mobile-nav-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          tabIndex={-1}
          className={`absolute right-0 top-0 flex h-[100dvh] w-full max-w-[min(100%,20rem)] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out sm:max-w-xs ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
            <div className="min-w-0 pr-3">
              <p className="truncate font-bold text-slate-900">{siteConfig.name}</p>
              <p className="truncate text-xs text-slate-500">{siteConfig.tagline}</p>
            </div>
            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 active:bg-slate-200"
              aria-label="Close menu"
              onClick={close}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav
            className="flex-1 overflow-y-auto overscroll-contain"
            aria-label="Mobile main navigation"
          >
            {MAIN_NAV.map((item) =>
              isNavDropdown(item) ? (
                <MobileDropdown key={item.id} dropdown={item} onNavigate={close} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex min-h-12 items-center border-b border-slate-100 px-4 py-3 text-sm font-medium text-slate-800 active:bg-slate-50"
                  onClick={close}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="shrink-0 border-t border-slate-200 p-4">
            <Link
              href="/"
              className="flex min-h-12 w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700 active:bg-emerald-800"
              onClick={close}
            >
              Paycheck Calculator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
