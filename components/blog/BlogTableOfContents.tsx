import type { TocItem } from "@/lib/blog/types";

export function BlogTableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
        Table of contents
      </h2>
      <ol className="mt-4 space-y-3 text-sm">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
            <a href={`#${item.id}`} className="text-slate-600 hover:text-emerald-700">
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
