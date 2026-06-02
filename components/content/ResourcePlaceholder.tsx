import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import type { BreadcrumbItem } from "@/types/seo";

interface ResourcePlaceholderProps {
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
}

export function ResourcePlaceholder({
  title,
  description,
  breadcrumbs,
}: ResourcePlaceholderProps) {
  return (
    <>
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
          <p className="mt-4 text-slate-600">{description}</p>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <p className="text-sm text-slate-600">
          Content is coming soon. In the meantime, explore our{" "}
          <Link href="/calculators" className="font-medium text-emerald-700 hover:underline">
            calculators
          </Link>{" "}
          or read the{" "}
          <Link href="/methodology" className="font-medium text-emerald-700 hover:underline">
            methodology
          </Link>
          .
        </p>
      </div>
    </>
  );
}
