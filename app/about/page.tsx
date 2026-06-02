import Link from "next/link";
import { LegalPageShell } from "@/components/layout/LegalPageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { LegalSection } from "@/lib/content/legal";
import { siteConfig } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildJsonLdGraph, buildWebPageSchema } from "@/lib/seo/schema";

export const metadata = buildPageMetadata({
  title: "About Us",
  description: `Learn about ${siteConfig.name}, our mission, accuracy standards, and product roadmap.`,
  path: "/about",
});

export default function AboutPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
  ];
  const jsonLd = buildJsonLdGraph([
    buildBreadcrumbSchema(breadcrumbs),
    buildWebPageSchema({
      name: "About Us",
      description: `About ${siteConfig.name}.`,
      url: `${siteConfig.url}/about`,
    }),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <LegalPageShell title="About Us" breadcrumbs={breadcrumbs}>
        <LegalSection title="Our mission">
          <p>
            {siteConfig.name} exists to make financial planning accessible through fast, transparent
            online calculators. We believe everyone deserves clear estimates — without paywalls or
            confusing jargon.
          </p>
        </LegalSection>

        <LegalSection title="Why we built this platform">
          <p>
            Most calculator sites focus on a single tool. We are building a unified platform for
            income, tax, insurance, finance, and travel tools — designed to scale to hundreds of
            calculators with consistent UX, SEO-friendly URLs, and documented methodology.
          </p>
        </LegalSection>

        <LegalSection title="Commitment to accuracy">
          <p>
            Live tax tools use versioned federal and state data with published review dates. We
            document formulas on our{" "}
            <Link href="/methodology" className="text-emerald-700 hover:underline">
              methodology
            </Link>{" "}
            page and update when tax years change. Calculators remain estimates — not substitutes for
            professional advice.
          </p>
        </LegalSection>

        <LegalSection title="Roadmap">
          <p>
            We are expanding categories beyond income calculators: federal and state tax tools,
            insurance estimators, loan and mortgage calculators, and travel planners. Browse{" "}
            <Link href="/calculators" className="text-emerald-700 hover:underline">
              all calculators
            </Link>{" "}
            to see what is live and what is coming soon.
          </p>
        </LegalSection>

        <LegalSection title="Get in touch">
          <p>
            Questions or partnership inquiries? Visit our{" "}
            <Link href="/contact" className="text-emerald-700 hover:underline">
              contact page
            </Link>{" "}
            or email{" "}
            <a href={`mailto:${siteConfig.contactEmail}`} className="text-emerald-700 hover:underline">
              {siteConfig.contactEmail}
            </a>
            .
          </p>
        </LegalSection>
      </LegalPageShell>
    </>
  );
}
