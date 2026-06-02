import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getLiveTools, toolPath } from "@/lib/navigation/site-architecture";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "All Tools",
  description: "Directory of live calculators and financial tools on ToolsZila.",
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
          <p className="mt-4 text-slate-600">Every live calculator on the platform.</p>
        </div>
      </div>
      <ul className="mx-auto max-w-6xl grid gap-3 px-4 py-10 sm:grid-cols-2 sm:px-6">
        {tools.map((t) => (
          <li key={t.id}>
            <Link href={toolPath(t)} className="block rounded-lg border border-slate-200 bg-white p-4 hover:border-emerald-300">
              <span className="font-medium">{t.title}</span>
              <p className="mt-1 text-sm text-slate-600">{t.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
