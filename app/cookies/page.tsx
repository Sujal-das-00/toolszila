import { LegalPageShell } from "@/components/layout/LegalPageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { LEGAL_CONTACT, LegalSection } from "@/lib/content/legal";
import { siteConfig } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildJsonLdGraph, buildWebPageSchema } from "@/lib/seo/schema";

export const metadata = buildPageMetadata({
  title: "Cookie Policy",
  description: `How ${siteConfig.name} uses cookies, including analytics and Google AdSense.`,
  path: "/cookies",
});

export default function CookiesPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Cookie Policy", path: "/cookies" },
  ];
  const jsonLd = buildJsonLdGraph([
    buildBreadcrumbSchema(breadcrumbs),
    buildWebPageSchema({
      name: "Cookie Policy",
      description: `Cookie Policy for ${siteConfig.name}.`,
      url: `${siteConfig.url}/cookies`,
    }),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <LegalPageShell title="Cookie Policy" breadcrumbs={breadcrumbs}>
        <LegalSection title="What are cookies?">
          <p>Cookies are small text files stored on your device. We use cookies and similar technologies to run and improve the site.</p>
        </LegalSection>

        <LegalSection title="Essential cookies">
          <p>Required for security, load balancing, and remembering basic preferences. These cannot be disabled without breaking core functionality.</p>
        </LegalSection>

        <LegalSection title="Analytics cookies">
          <p>Help us understand aggregate traffic and usage (e.g., Google Analytics). You can limit analytics via browser settings or opt-out tools provided by vendors.</p>
        </LegalSection>

        <LegalSection title="Advertising cookies">
          <p>Used to deliver and measure ads, including interest-based advertising where permitted.</p>
        </LegalSection>

        <LegalSection title="Google AdSense cookies">
          <p>
            Google and partners may use cookies to serve ads on our site. Learn more at{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              className="text-emerald-700 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Google Advertising Policies
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="Consent management">
          <p>
            Where required by law (e.g., EEA/UK), we will request consent before non-essential cookies.
            You may withdraw consent by clearing cookies or using in-product controls when available.
          </p>
        </LegalSection>

        <LegalSection title="Managing cookies">
          <p>Most browsers let you block or delete cookies. Blocking all cookies may affect calculator features.</p>
        </LegalSection>

        <LegalSection title="Contact">{LEGAL_CONTACT}</LegalSection>
      </LegalPageShell>
    </>
  );
}
