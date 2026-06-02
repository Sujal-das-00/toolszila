import { LegalPageShell } from "@/components/layout/LegalPageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { LEGAL_CONTACT, LegalSection } from "@/lib/content/legal";
import { siteConfig } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildJsonLdGraph, buildWebPageSchema } from "@/lib/seo/schema";

export const metadata = buildPageMetadata({
  title: "CCPA Notice",
  description: `California Consumer Privacy Act notice for ${siteConfig.name} visitors.`,
  path: "/ccpa",
});

export default function CcpaPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "CCPA Notice", path: "/ccpa" },
  ];
  const jsonLd = buildJsonLdGraph([
    buildBreadcrumbSchema(breadcrumbs),
    buildWebPageSchema({
      name: "CCPA Notice",
      description: `CCPA Notice for ${siteConfig.name}.`,
      url: `${siteConfig.url}/ccpa`,
    }),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <LegalPageShell title="CCPA Notice (California)" breadcrumbs={breadcrumbs}>
        <LegalSection title="Categories collected">
          <p>We may collect identifiers (email if you contact us), internet activity (logs, analytics), and inferences from tool usage patterns.</p>
        </LegalSection>
        <LegalSection title="Sale or sharing">
          <p>We do not sell personal information for money. Advertising partners may use cookies for cross-context behavioral advertising — you may opt out via browser settings or industry opt-out tools.</p>
        </LegalSection>
        <LegalSection title="Your California rights">
          <p>California residents may request to know, delete, or correct personal information, and opt out of certain sharing. We will not discriminate for exercising these rights.</p>
        </LegalSection>
        <LegalSection title="Contact">{LEGAL_CONTACT}</LegalSection>
      </LegalPageShell>
    </>
  );
}
