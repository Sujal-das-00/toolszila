import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  TOOL_CATEGORIES,
  getLiveTools,
  getToolsByCategory,
  toolPath,
} from "@/lib/navigation/site-architecture";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildJsonLdGraph, buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/constants";

export const metadata = buildPageMetadata({
  title: "All Calculators — Income, Tax, Insurance & Finance",
  description:
    "Browse free online calculators and financial tools by category. Income, tax, insurance, finance, and travel estimators.",
  path: "/calculators",
});

export default function CalculatorsIndexPage() {
  const live = getLiveTools();
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Calculators", path: "/calculators" },
  ];

  const jsonLd = buildJsonLdGraph([
    buildBreadcrumbSchema(breadcrumbs),
    buildWebPageSchema({
      name: "All Calculators",
      description: siteConfig.description,
      url: `${siteConfig.url}/calculators`,
    }),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            All Calculators
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Explore {live.length} live tools today — with more categories shipping on our roadmap
            toward hundreds of calculators.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-10 sm:px-6">
        {TOOL_CATEGORIES.map((category) => {
          const tools = getToolsByCategory(category.id);
          return (
            <section key={category.id}>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{category.label}</h2>
                  <p className="mt-1 text-sm text-slate-600">{category.description}</p>
                </div>
                <Link
                  href={category.path}
                  className="text-sm font-medium text-emerald-700 hover:underline"
                >
                  View category →
                </Link>
              </div>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool) => (
                  <li key={tool.id}>
                    {tool.status === "live" ? (
                      <Link
                        href={toolPath(tool)}
                        className="block rounded-lg border border-slate-200 bg-white px-4 py-3 hover:border-emerald-300"
                      >
                        <span className="font-medium text-slate-900">{tool.title}</span>
                      </Link>
                    ) : (
                      <span className="block rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-slate-500">
                        {tool.title}{" "}
                        <span className="text-xs">(coming soon)</span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
