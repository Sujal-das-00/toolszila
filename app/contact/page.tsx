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
