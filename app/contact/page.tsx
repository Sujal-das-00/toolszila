import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { LegalPageShell } from "@/components/layout/LegalPageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildJsonLdGraph, buildWebPageSchema } from "@/lib/seo/schema";

export const metadata = buildPageMetadata({
  title: "Contact Us",
  description: `Contact ${siteConfig.name} for support, feedback, corrections, or partnerships.`,
  path: "/contact",
});

export default function ContactPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];
  const jsonLd = buildJsonLdGraph([
    buildBreadcrumbSchema(breadcrumbs),
    buildWebPageSchema({
      name: "Contact Us",
      description: `Contact ${siteConfig.name}.`,
      url: `${siteConfig.url}/contact`,
    }),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <LegalPageShell title="Contact Us" breadcrumbs={breadcrumbs}>
        <p className="text-sm leading-relaxed text-slate-700">
          We welcome corrections to tax data, calculator feedback, and partnership ideas. For common
          questions, see our{" "}
          <Link href="/faq" className="text-emerald-700 hover:underline">
            FAQ
          </Link>
          .
        </p>
        {siteConfig.editorialTeamName ? (
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Editorial reviews, calculator corrections, and source challenges are handled by the <span className="font-medium text-slate-700">{siteConfig.editorialTeamName}</span>.
          </p>
        ) : null}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">Best reasons to contact us</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
            <li>Report a tax rate, threshold, or source note that looks outdated or unclear.</li>
            <li>Flag a calculator scenario that needs better assumptions or a missing limitation note.</li>
            <li>Suggest a guide, calculator, or country page that would make the site more useful.</li>
          </ul>
        </div>
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">How corrections are handled</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            When a correction request concerns calculator logic, tax inputs, or source interpretation, we review the claim against
            the relevant official material before updating the page or data file. That process helps keep trust pages and calculator pages aligned.
          </p>
        </div>
        <p className="mt-3 text-sm text-slate-600">
          Email:{" "}
          <a href={`mailto:${siteConfig.contactEmail}`} className="text-emerald-700 hover:underline">
            {siteConfig.contactEmail}
          </a>
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Typical response time: 2–3 business days. Urgent tax filing questions should be directed to
          a licensed tax professional.
        </p>
        <div className="mt-8 max-w-lg">
          <ContactForm />
        </div>
      </LegalPageShell>
    </>
  );
}
