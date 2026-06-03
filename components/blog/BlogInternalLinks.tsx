import Link from "next/link";
import type { InternalLinkItem } from "@/lib/blog/types";

export function BlogInternalLinks({ items }: { items: InternalLinkItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <h2 className="text-xl font-bold text-slate-900">Continue exploring</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-emerald-200 hover:bg-emerald-50"
          >
            <p className="font-semibold text-slate-900">{item.label}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
