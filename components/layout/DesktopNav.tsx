"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { MAIN_NAV, isNavDropdown, type NavDropdown } from "@/lib/navigation/menus";

function DesktopDropdown({ dropdown }: { dropdown: NavDropdown }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const panelId = `${dropdown.id}-menu`;

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-emerald-600"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {dropdown.label}
        <span className="text-xs text-slate-400" aria-hidden>
          ▾
        </span>
      </button>
      <div
        id={panelId}
        role="menu"
        className={`absolute left-0 top-full z-50 mt-2 min-w-[16rem] rounded-xl border border-slate-200 bg-white p-2 shadow-lg transition-all duration-200 ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0 pointer-events-none"
        }`}
      >
        {dropdown.sections.map((section, si) => (
          <div key={si} className={si > 0 ? "mt-2 border-t border-slate-100 pt-2" : ""}>
            {section.title && (
              <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {section.title}
              </p>
            )}
            {section.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                role="menuitem"
                className="block rounded-lg px-3 py-2 hover:bg-slate-50"
                onClick={close}
              >
                <span className="text-sm font-medium text-slate-800 hover:text-emerald-700">
                  {link.label}
                </span>
                {link.description && (
                  <span className="mt-0.5 block text-xs text-slate-500">{link.description}</span>
                )}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Desktop navigation with keyboard-accessible dropdowns. */
export function DesktopNav() {
  return (
    <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
      {MAIN_NAV.map((item) =>
        isNavDropdown(item) ? (
          <DesktopDropdown key={item.id} dropdown={item} />
        ) : (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm font-medium text-slate-600 hover:text-emerald-600"
          >
            {item.label}
          </Link>
        ),
      )}
    </nav>
  );
}
