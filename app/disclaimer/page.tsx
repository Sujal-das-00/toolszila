import { LegalPageShell } from "@/components/layout/LegalPageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { LEGAL_CONTACT, LegalSection } from "@/lib/content/legal";
import { siteConfig } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildJsonLdGraph, buildWebPageSchema } from "@/lib/seo/schema";

export const metadata = buildPageMetadata({
  title: "Disclaimer",
  description: `Financial, tax, and insurance disclaimers for ${siteConfig.name} calculator estimates.`,
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Disclaimer", path: "/disclaimer" },
  ];
  const jsonLd = buildJsonLdGraph([
    buildBreadcrumbSchema(breadcrumbs),
    buildWebPageSchema({
      name: "Disclaimer",
      description: `Disclaimer for ${siteConfig.name}.`,
      url: `${siteConfig.url}/disclaimer`,
    }),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <LegalPageShell title="Disclaimer" breadcrumbs={breadcrumbs}>
        <LegalSection title="Educational purposes">
          <p>
            {siteConfig.name} publishes calculators and articles for general education and planning
            only. Content is not tailored to your personal circumstances.
          </p>
        </LegalSection>

        <LegalSection title="Financial disclaimer">
          <p>
            Loan, mortgage, savings, and debt calculators use generic assumptions. They do not account
            for fees, credit scores, lender rules, or market conditions. Do not rely on them as loan
            approvals or investment recommendations.
          </p>
        </LegalSection>

        <LegalSection title="Tax disclaimer">
          <p>
            Tax tools use simplified brackets and withholding rules. Actual liability depends on
            deductions, credits, local taxes, and IRS or state guidance. We are not a tax preparer or
            CPA firm.
          </p>
        </LegalSection>

        <LegalSection title="Insurance disclaimer">
          <p>
            Insurance estimators produce illustrative ranges, not bindable quotes. Premiums depend on
            underwriting, location, coverage limits, and carrier filings.
          </p>
        </LegalSection>

        <LegalSection title="No professional advice">
          <p>
            Always consult qualified tax, legal, insurance, and financial professionals before acting
            on any estimate.
          </p>
        </LegalSection>

        <LegalSection title="Contact">{LEGAL_CONTACT}</LegalSection>
      </LegalPageShell>
    </>
  );
}
