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
    keywords: cat.id === "tax"
      ? [
          "Tax Calculator",
          "Income Tax Calculator",
          "Federal Tax Calculator",
          "Self Employment Tax Calculator",
          "Social Security Tax Calculator",
        ]
      : undefined,
    ogImagePath: `${cat.path}/opengraph-image`,
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
      keywords: category.id === "tax"
        ? [
            "Tax Calculator",
            "Income Tax Calculator",
            "Federal Tax Calculator",
            "Self Employment Tax Calculator",
            "Social Security Tax Calculator",
          ]
        : undefined,
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
          <h2 className="text-xl font-bold text-slate-900">How to choose from this category</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Use this hub to compare the live {category.label.toLowerCase()} on {siteConfig.name}, understand
            which tools answer broad planning questions, and find the more specialized calculators for narrower follow-up tasks.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {liveTools.length > 0
              ? `This category currently has ${liveTools.length} live tool${liveTools.length === 1 ? "" : "s"}, each with published assumptions and supporting copy.`
              : "This category is still in pre-launch mode and will stay out of search until substantive tools are live."}
          </p>
        </section>

        {category.id === "tax" && (
          <section className="mt-10 max-w-5xl">
            <h2 className="text-xl font-bold text-slate-900">Tax calculator selection guide</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[
                "Tax Calculator",
                "Income Tax Calculator",
                "Federal Tax Calculator",
                "Self Employment Tax Calculator",
                "Social Security Tax Calculator",
              ].map((title) => (
                <div key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {title === "Tax Calculator" && "Best for a broad annual estimate that combines income taxes and payroll taxes in one view."}
                    {title === "Income Tax Calculator" && "Best when you want to isolate federal and state income tax without Social Security or Medicare."}
                    {title === "Federal Tax Calculator" && "Best for checking bracket-based federal tax only using current standard deductions."}
                    {title === "Self Employment Tax Calculator" && "Best for Schedule SE planning on net business income and mixed W-2 or self-employed cases."}
                    {title === "Social Security Tax Calculator" && "Best for understanding the wage-base cap, employee tax, employer match, and self-employed equivalent."}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
              {category.id === "tax"
                ? "Start with the total tax calculator for a broad annual estimate, use the income tax calculator when you want to exclude payroll taxes, and switch to the federal, self-employment, or Social Security tools for narrower tax questions."
                : "Start with the calculator that matches the pay question you actually have. Use paycheck tools for withholding estimates, hourly and salary converters for gross-pay math, and overtime or bonus tools for supplemental payroll scenarios."}
            </p>
          </section>
        )}
      </div>
    </>
  );
}
