import Link from "next/link";
import type { BlogPost } from "@/lib/blog/types";

export function BlogPrevNextNav({
  previous,
  next,
}: {
  previous: BlogPost | null;
  next: BlogPost | null;
}) {
  if (!previous && !next) return null;

  return (
    <nav
      className="grid gap-4 md:grid-cols-2"
      aria-label="Previous and next articles"
    >
      {previous ? (
        <Link
          href={previous.path}
          className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-emerald-200 hover:bg-emerald-50"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Previous article
          </p>
          <p className="mt-2 font-semibold text-slate-900">
            {previous.frontmatter.title}
          </p>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.path}
          className="rounded-2xl border border-slate-200 bg-white p-5 text-left hover:border-emerald-200 hover:bg-emerald-50"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Next article
          </p>
          <p className="mt-2 font-semibold text-slate-900">
            {next.frontmatter.title}
          </p>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
