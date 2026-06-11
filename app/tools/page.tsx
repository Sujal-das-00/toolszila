import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getLiveTools, toolPath } from "@/lib/navigation/site-architecture";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "All Tools",
  description: "Directory of live calculators and planning tools on ToolsZila.",
  path: "/tools",
});

export default function AllToolsPage() {
  const tools = getLiveTools();
  return (
    <>
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "All Tools", path: "/tools" }]} />
          <h1 className="text-3xl font-bold text-slate-900">All Tools</h1>
          <p className="mt-4 max-w-3xl text-slate-600">
            Every live calculator on the platform, organized for fast discovery. Each tool links to its own
            assumptions, supporting guides, and related calculators so you can choose the right page for the question you actually have.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="max-w-4xl rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold text-slate-900">How to use the tool directory</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Start with the tool that matches your planning task. Use paycheck and salary tools when you need after-tax income,
            tax tools when you want to isolate annual liabilities, and supporting pages when you need assumptions, examples, or limits.
          </p>
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {tools.map((t) => (
            <li key={t.id}>
              <Link href={toolPath(t)} className="block rounded-lg border border-slate-200 bg-white p-4 hover:border-emerald-300">
                <span className="font-medium">{t.title}</span>
                <p className="mt-1 text-sm text-slate-600">{t.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
