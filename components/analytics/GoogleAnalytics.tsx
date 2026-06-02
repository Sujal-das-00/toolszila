import Script from "next/script";
import { siteConfig } from "@/lib/constants";

/**
 * Google Analytics — loaded after interactive to avoid blocking LCP.
 * Set NEXT_PUBLIC_GA_ID in environment variables for production.
 */
export function GoogleAnalytics() {
  const gaId = siteConfig.googleAnalyticsId;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
