import type { ReactNode } from "react";
import { siteConfig } from "@/lib/constants";

/** Shared legal copy blocks — single source for policy pages. */
export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-8 first:mt-0">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}

export const LEGAL_CONTACT = (
  <p>
    Questions about these policies:{" "}
    <a href={`mailto:${siteConfig.contactEmail}`} className="text-emerald-700 hover:underline">
      {siteConfig.contactEmail}
    </a>
    . See our <a href="/contact" className="text-emerald-700 hover:underline">contact page</a>.
  </p>
);
