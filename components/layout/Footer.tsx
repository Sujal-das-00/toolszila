import Link from "next/link";
import { siteConfig } from "@/lib/constants";
import { FOOTER_COLUMNS, getFooterPopularTools } from "@/lib/navigation/menus";

const SOCIAL_LINKS = [
  { label: "X (Twitter)", href: "https://twitter.com/toolszila" },
  { label: "LinkedIn", href: "https://linkedin.com/company/toolszila" },
  { label: "Facebook", href: "https://facebook.com/toolszila" },
] as const;

/** Multi-column footer for topical authority and AdSense trust signals. */
export function Footer() {
  const popular = getFooterPopularTools();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <p className="text-lg font-bold text-white">{siteConfig.name}</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
              {siteConfig.description}
            </p>
            <p className="mt-4 text-xs text-slate-500">
              Estimates are for educational purposes only — not tax, legal, insurance, or
              financial advice.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
              {FOOTER_COLUMNS.product.title}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_COLUMNS.product.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
              Popular tools
            </h2>
            <ul className="mt-4 space-y-2.5">
              {popular.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
              {FOOTER_COLUMNS.resources.title}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_COLUMNS.resources.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
              {FOOTER_COLUMNS.company.title}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_COLUMNS.company.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-white">
              {FOOTER_COLUMNS.legal.title}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_COLUMNS.legal.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row">
          <p className="text-center text-xs text-slate-500 sm:text-left">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap justify-center gap-4">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="text-xs text-slate-400 hover:text-white"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
