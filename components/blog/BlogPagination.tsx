import Link from "next/link";

function buildHref(page: number, query?: string, category?: string) {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  if (query) params.set("q", query);
  if (category) params.set("category", category);
  const search = params.toString();
  return search ? `/blog?${search}` : "/blog";
}

export function BlogPagination({
  currentPage,
  totalPages,
  query,
  category,
}: {
  currentPage: number;
  totalPages: number;
  query?: string;
  category?: string;
}) {
  if (totalPages <= 1) return null;

  const linkClass =
    "rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:border-emerald-200 hover:text-emerald-700";
  const disabledClass =
    "pointer-events-none rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-400";

  return (
    <nav aria-label="Blog pagination" className="flex items-center justify-between gap-4">
      <Link
        href={buildHref(currentPage - 1, query, category)}
        aria-disabled={currentPage <= 1}
        className={currentPage <= 1 ? disabledClass : linkClass}
      >
        Previous
      </Link>
      <p className="text-sm text-slate-600">
        Page {currentPage} of {totalPages}
      </p>
      <Link
        href={buildHref(currentPage + 1, query, category)}
        aria-disabled={currentPage >= totalPages}
        className={currentPage >= totalPages ? disabledClass : linkClass}
      >
        Next
      </Link>
    </nav>
  );
}
