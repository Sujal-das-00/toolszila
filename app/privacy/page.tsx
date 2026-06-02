import Link from "next/link";
import { LegalPageShell } from "@/components/layout/LegalPageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { LEGAL_CONTACT, LegalSection } from "@/lib/content/legal";
import { siteConfig } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildJsonLdGraph, buildWebPageSchema } from "@/lib/seo/schema";

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your information, including cookies, analytics, and advertising.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy" },
  ];
  const jsonLd = buildJsonLdGraph([
    buildBreadcrumbSchema(breadcrumbs),
    buildWebPageSchema({
      name: "Privacy Policy",
      description: `Privacy policy for ${siteConfig.name}.`,
      url: `${siteConfig.url}/privacy`,
    }),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <LegalPageShell title="Privacy Policy" breadcrumbs={breadcrumbs}>
        <LegalSection title="Overview">
          <p>
            {siteConfig.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates{" "}
            {siteConfig.url} as a free calculator and financial tools platform. This Privacy Policy
            explains what information we collect, how we use it, and your choices.
          </p>
        </LegalSection>

        <LegalSection title="Information we collect">
          <p>
            <strong>Calculator inputs:</strong> Values you enter (salary, state, hours, etc.) are
            processed in your browser to produce estimates. We do not require an account for standard
            calculator use.
          </p>
          <p>
            <strong>Contact information:</strong> If you email us or use the contact form, we receive
            the information you provide (name, email, message).
          </p>
          <p>
            <strong>Automatically collected data:</strong> When analytics or advertising services are
            enabled, we or our partners may collect device type, browser, approximate location, pages
            viewed, and referral URLs through cookies or similar technologies.
          </p>
        </LegalSection>

        <LegalSection title="How we use information">
          <p>We use information to operate and improve the site, fix errors, measure traffic, display relevant ads (where enabled), and respond to inquiries.</p>
        </LegalSection>

        <LegalSection title="Cookies and similar technologies">
          <p>
            We use essential cookies for basic site functionality. With your consent where required,
            we may use analytics and advertising cookies. See our{" "}
            <Link href="/cookies" className="text-emerald-700 hover:underline">Cookie Policy</Link> for
            details.
          </p>
        </LegalSection>

        <LegalSection title="Google AdSense and third-party advertising">
          <p>
            We may display ads through Google AdSense or other ad networks. These partners may use
            cookies to serve ads based on your visits to this and other websites. You can learn more
            at{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              className="text-emerald-700 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Google&apos;s advertising policies
            </a>
            . Opt out of personalized advertising via{" "}
            <a
              href="https://adssettings.google.com"
              className="text-emerald-700 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Google Ads Settings
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="Analytics">
          <p>
            We may use Google Analytics or similar services to understand aggregate usage. Analytics
            loads only when configured. Analytics providers process data under their own privacy
            policies.
          </p>
        </LegalSection>

        <LegalSection title="Data sharing">
          <p>
            We do not sell your personal information. We may share data with service providers (hosting,
            analytics, advertising) who process it on our behalf, or when required by law.
          </p>
        </LegalSection>

        <LegalSection title="Your rights">
          <p>
            Depending on your location, you may have rights to access, correct, delete, or restrict
            processing of personal data. See our{" "}
            <Link href="/gdpr" className="text-emerald-700 hover:underline">GDPR Notice</Link> and{" "}
            <Link href="/ccpa" className="text-emerald-700 hover:underline">CCPA Notice</Link>. EU/UK users
            may lodge complaints with a supervisory authority.
          </p>
        </LegalSection>

        <LegalSection title="Children">
          <p>Our services are not directed to children under 13. We do not knowingly collect data from children.</p>
        </LegalSection>

        <LegalSection title="Changes">
          <p>We may update this policy. Material changes will be reflected by the &quot;Last reviewed&quot; date above.</p>
        </LegalSection>

        <LegalSection title="Contact">{LEGAL_CONTACT}</LegalSection>
      </LegalPageShell>
    </>
  );
}
