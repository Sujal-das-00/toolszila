import { LegalPageShell } from "@/components/layout/LegalPageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { LEGAL_CONTACT, LegalSection } from "@/lib/content/legal";
import { siteConfig } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildJsonLdGraph, buildWebPageSchema } from "@/lib/seo/schema";

export const metadata = buildPageMetadata({
  title: "GDPR Notice",
  description: `GDPR information for visitors from the European Economic Area and UK using ${siteConfig.name}.`,
  path: "/gdpr",
});

export default function GdprPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "GDPR Notice", path: "/gdpr" },
  ];
  const jsonLd = buildJsonLdGraph([
    buildBreadcrumbSchema(breadcrumbs),
    buildWebPageSchema({
      name: "GDPR Notice",
      description: `GDPR Notice for ${siteConfig.name}.`,
      url: `${siteConfig.url}/gdpr`,
    }),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <LegalPageShell title="GDPR Notice (EEA & UK)" breadcrumbs={breadcrumbs}>
        <LegalSection title="Controller">
          <p>{siteConfig.name} is the data controller for personal data collected through this website.</p>
        </LegalSection>
        <LegalSection title="Lawful bases">
          <p>We process data based on consent (cookies/ads where required), legitimate interests (security, analytics), and legal obligations.</p>
        </LegalSection>
        <LegalSection title="Your rights">
          <p>You may request access, rectification, erasure, restriction, portability, or object to processing. You may withdraw consent at any time.</p>
        </LegalSection>
        <LegalSection title="International transfers">
          <p>Data may be processed in the United States or other countries where our providers operate, with appropriate safeguards where required.</p>
        </LegalSection>
        <LegalSection title="Contact">{LEGAL_CONTACT}</LegalSection>
      </LegalPageShell>
    </>
  );
}
