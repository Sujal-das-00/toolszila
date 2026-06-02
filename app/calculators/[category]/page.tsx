import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getCategory,
  getToolsByCategory,
  toolPath,
  type ToolCategoryId,
} from "@/lib/navigation/site-architecture";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildJsonLdGraph, buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/constants";

interface PageProps {
  params: Promise<{ category: string }>;
}

const VALID: ToolCategoryId[] = ["income", "tax", "insurance", "finance", "travel"];

export async function generateStaticParams() {
  return VALID.map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const cat = getCategory(category as ToolCategoryId);
  if (!cat) return {};
  const liveTools = getToolsByCategory(cat.id).filter((tool) => tool.status === "live");
  return buildPageMetadata({
    title: `${cat.label} — Free Online Tools`,
    description: cat.description,
    path: cat.path,
    noIndex: liveTools.length === 0,
  });
}

export default async function CategoryHubPage({ params }: PageProps) {
  const { category: categoryId } = await params;
  if (!VALID.includes(categoryId as ToolCategoryId)) notFound();

  const category = getCategory(categoryId as ToolCategoryId)!;
  const tools = getToolsByCategory(category.id);
  const liveTools = tools.filter((tool) => tool.status === "live");
  const path = category.path;

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Calculators", path: "/calculators" },
    { name: category.label, path },
  ];

  const jsonLd = buildJsonLdGraph([
    buildBreadcrumbSchema(breadcrumbs),
    buildWebPageSchema({
      name: category.label,
      description: category.description,
      url: siteConfig.url + path,
    }),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {category.label}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">{category.description}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <section className="max-w-4xl">
          <h2 className="text-xl font-bold text-slate-900">How to use this hub</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Use this page to compare the live {category.label.toLowerCase()} on {siteConfig.name},
            understand which calculators are ready now, and see which topics are still in development.
            Live tools are linked directly below. Coming-soon cards are intentionally non-clickable
            so thin placeholders do not compete with finished tools in search.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {liveTools.length > 0
              ? `This category currently has ${liveTools.length} live tool${liveTools.length === 1 ? "" : "s"} with published metadata and crawlable pages.`
              : "This category is still in pre-launch mode and is kept out of search until substantive tools are live."}
          </p>
        </section>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const href = toolPath(tool);
            const live = tool.status === "live";
            return (
              <li key={tool.id}>
                {live ? (
                  <Link
                    href={href}
                    className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
                  >
                    <span className="font-semibold text-slate-900">{tool.title}</span>
                    <p className="mt-2 flex-1 text-sm text-slate-600">{tool.description}</p>
                    <span className="mt-4 text-sm font-medium text-emerald-700">Open tool →</span>
                  </Link>
                ) : (
                  <div className="flex h-full flex-col rounded-xl border border-dashed border-slate-200 bg-slate-50 p-5 opacity-80">
                    <span className="font-semibold text-slate-700">{tool.title}</span>
                    <p className="mt-2 flex-1 text-sm text-slate-500">{tool.description}</p>
                    <span className="mt-4 inline-flex w-fit rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                      Coming soon
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {liveTools.length > 0 && (
          <section className="mt-10 max-w-4xl">
            <h2 className="text-xl font-bold text-slate-900">Selection notes</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Start with the calculator that matches the pay question you actually have. Use
              paycheck tools for withholding estimates, hourly and salary converters for gross-pay
              math, and overtime or bonus tools for supplemental payroll scenarios.
            </p>
          </section>
        )}
      </div>
    </>
  );
}
