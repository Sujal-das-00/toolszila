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
            {siteConfig.name} exists to make financial planning more understandable through fast,
            transparent online calculators. We aim to help people move from a gross salary or tax
            question to a practical decision with less guesswork and less jargon.
          </p>
        </LegalSection>

        <LegalSection title="Why we built this platform">
          <p>
            Many calculator sites stop at a number. We are building a broader library that adds
            assumptions, methodology notes, source links, FAQs, and related guides around each tool
            so visitors can judge whether an estimate is good enough for planning or needs further review.
          </p>
        </LegalSection>

        <LegalSection title="How we approach trust and accuracy">
          <p>
            Live tax tools use versioned federal and state data with published review dates. We document
            formulas on our{" "}
            <Link href="/methodology" className="text-emerald-700 hover:underline">
              methodology
            </Link>{" "}
            page, cite primary sources where possible, and update content when tax years change or when a calculator scope note needs clarification.
            Calculators remain estimates, not substitutes for professional advice.
          </p>
        </LegalSection>

        <LegalSection title="Editorial standards and correction policy">
          <p>
            We publish review dates, separate source-backed assumptions from general guidance, and disclose
            when one tax layer updates on a different schedule from another. If you spot a data issue,
            outdated threshold, or ambiguous withholding rule, you can report it through our{" "}
            <Link href="/contact" className="text-emerald-700 hover:underline">
              contact page
            </Link>
            .
          </p>
        </LegalSection>

        <LegalSection title="Content roadmap">
          <p>
            The site is expanding beyond core salary calculators into deeper tax explainers, country-specific
            take-home pay hubs, worked salary examples, and additional planning tools across insurance,
            finance, and travel. Browse{" "}
            <Link href="/calculators" className="text-emerald-700 hover:underline">
              all calculators
            </Link>{" "}
            to see what is live now.
          </p>
        </LegalSection>

        <LegalSection title="Get in touch">
          <p>
            Questions, corrections, or partnership inquiries? Visit our{" "}
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
