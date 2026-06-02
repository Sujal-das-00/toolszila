import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CONTENT_REVIEWED_LABEL } from "@/lib/constants";
import type { BreadcrumbItem } from "@/types/seo";

interface LegalPageShellProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  children: React.ReactNode;
}

/** Shared layout for policy and company pages. */
export function LegalPageShell({ title, breadcrumbs, children }: LegalPageShellProps) {
  return (
    <>
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
          <p className="mt-3 text-sm text-slate-500">Last reviewed: {CONTENT_REVIEWED_LABEL}.</p>
        </div>
      </div>
      <article className="prose-legal mx-auto max-w-4xl px-4 py-10 sm:px-6">{children}</article>
    </>
  );
}
