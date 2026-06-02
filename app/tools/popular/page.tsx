import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getPopularTools, toolPath } from "@/lib/navigation/site-architecture";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Popular Tools",
  description: "Most-used calculators on ToolsZila.",
  path: "/tools/popular",
});

export default function PopularToolsPage() {
  const tools = getPopularTools();
  return (
    <>
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Tools", path: "/tools" },
              { name: "Popular", path: "/tools/popular" },
            ]}
          />
          <h1 className="text-3xl font-bold text-slate-900">Popular Tools</h1>
        </div>
      </div>
      <ul className="mx-auto max-w-6xl grid gap-3 px-4 py-10 sm:grid-cols-2 sm:px-6">
        {tools.map((t) => (
          <li key={t.id}>
            <Link href={toolPath(t)} className="block rounded-lg border border-slate-200 bg-white p-4 hover:border-emerald-300">
              {t.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
