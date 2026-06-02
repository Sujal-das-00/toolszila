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
        className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-medium text-slate-800"
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
          <div className="space-y-1 bg-slate-50 px-4 pb-3">
            {dropdown.sections.map((section, si) => (
              <div key={si}>
                {section.title && (
                  <p className="px-2 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {section.title}
                  </p>
                )}
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-md px-2 py-2.5 text-sm text-slate-700 hover:bg-white hover:text-emerald-700"
                    onClick={onNavigate}
                  >
                    {link.label}
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

/** Accessible mobile navigation drawer with keyboard support. */
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
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? "Close" : "Menu"}</span>
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          {open ? (
            <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className="absolute inset-0 bg-slate-900/40"
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
          className={`absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col bg-white shadow-xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
            <div>
              <p className="font-bold text-slate-900">{siteConfig.name}</p>
              <p className="text-xs text-slate-500">{siteConfig.tagline}</p>
            </div>
            <button
              type="button"
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
              aria-label="Close menu"
              onClick={close}
            >
              ✕
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto" aria-label="Mobile main navigation">
            {MAIN_NAV.map((item) =>
              isNavDropdown(item) ? (
                <MobileDropdown key={item.id} dropdown={item} onNavigate={close} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block border-b border-slate-100 px-4 py-3.5 text-sm font-medium text-slate-800 hover:text-emerald-700"
                  onClick={close}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <div className="border-t border-slate-200 p-4">
            <Link
              href="/"
              className="block w-full rounded-lg bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-700"
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
