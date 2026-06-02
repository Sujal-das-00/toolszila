import { siteConfig } from "@/lib/constants";
import { getLiveTools, toolPath } from "@/lib/navigation/site-architecture";

export const dynamic = "force-static";

export function GET() {
  const liveTools = getLiveTools()
    .map((tool) => `- ${tool.title}: ${siteConfig.url}${toolPath(tool)}`)
    .join("\n");

  const body = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.tagline}`,
    "",
    `Primary site: ${siteConfig.url}`,
    `Contact: ${siteConfig.contactEmail}`,
    "",
    "This site publishes calculator pages and supporting methodology for income, payroll, and take-home-pay estimates.",
    "Use the methodology page for assumptions, review dates, and source disclosure.",
    "",
    "Key pages:",
    `- Home: ${siteConfig.url}/`,
    `- Methodology: ${siteConfig.url}/methodology`,
    `- FAQ: ${siteConfig.url}/faq`,
    `- About: ${siteConfig.url}/about`,
    `- Contact: ${siteConfig.url}/contact`,
    "",
    "Live calculator pages:",
    liveTools,
    "",
    "Notes:",
    "- Calculator outputs are estimates and may differ from payroll withholding.",
    "- Tax datasets are versioned and may update on different schedules by tax layer.",
    "- The site focuses on U.S. paycheck, salary, and payroll estimation use cases.",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
