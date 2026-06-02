import { LegalPageShell } from "@/components/layout/LegalPageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { LEGAL_CONTACT, LegalSection } from "@/lib/content/legal";
import { siteConfig } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildJsonLdGraph, buildWebPageSchema } from "@/lib/seo/schema";

export const metadata = buildPageMetadata({
  title: "Terms of Service",
  description: `Terms governing use of ${siteConfig.name} calculators and financial tools.`,
  path: "/terms",
});

export default function TermsPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Terms of Service", path: "/terms" },
  ];
  const jsonLd = buildJsonLdGraph([
    buildBreadcrumbSchema(breadcrumbs),
    buildWebPageSchema({
      name: "Terms of Service",
      description: `Terms of Service for ${siteConfig.name}.`,
      url: `${siteConfig.url}/terms`,
    }),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <LegalPageShell title="Terms of Service" breadcrumbs={breadcrumbs}>
        <LegalSection title="Acceptance of terms">
          <p>
            By accessing {siteConfig.url}, you agree to these Terms of Service and our Privacy
            Policy. If you do not agree, do not use the site.
          </p>
        </LegalSection>

        <LegalSection title="Service description">
          <p>
            {siteConfig.name} provides free online calculators, estimators, and educational content.
            Tools may be added, modified, or removed without notice.
          </p>
        </LegalSection>

        <LegalSection title="Calculator accuracy disclaimer">
          <p>
            All calculator outputs are estimates based on simplified assumptions and publicly
            available tax or financial data. Results may not match your actual paycheck, tax return,
            insurance quote, or loan terms. You are responsible for verifying results with official
            sources or qualified professionals.
          </p>
        </LegalSection>

        <LegalSection title="No professional advice">
          <p>
            Nothing on this site constitutes tax, legal, insurance, investment, or financial advice.
            Consult licensed professionals before making decisions.
          </p>
        </LegalSection>

        <LegalSection title="Intellectual property">
          <p>
            Site content, branding, and software are owned by {siteConfig.name} or licensors. You may
            not copy, scrape, or redistribute substantial portions without permission, except as
            allowed by fair use or applicable law.
          </p>
        </LegalSection>

        <LegalSection title="Prohibited use">
          <p>
            You may not use the site unlawfully, attempt to disrupt service, reverse engineer protected
            systems, automate abusive traffic, or misrepresent affiliation with {siteConfig.name}.
          </p>
        </LegalSection>

        <LegalSection title="Limitation of liability">
          <p>
            To the fullest extent permitted by law, {siteConfig.name} and its operators are not
            liable for indirect, incidental, or consequential damages arising from use of the site or
            reliance on calculator results. Total liability shall not exceed amounts you paid us (if
            any) in the twelve months before the claim.
          </p>
        </LegalSection>

        <LegalSection title="Indemnification">
          <p>You agree to indemnify us against claims arising from your misuse of the site.</p>
        </LegalSection>

        <LegalSection title="Governing law">
          <p>These terms are governed by applicable law in the jurisdiction where we operate, without regard to conflict-of-law rules.</p>
        </LegalSection>

        <LegalSection title="Contact">{LEGAL_CONTACT}</LegalSection>
      </LegalPageShell>
    </>
  );
}
