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
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold text-slate-900">What to expect here</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            This section is being expanded into a fuller resource hub with practical guides, worked examples,
            methodology notes, and links to the most relevant calculators. Until that rollout is complete,
            use the live calculators and methodology pages below for the most substantive content on the site.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-semibold text-slate-900">Start with a live calculator</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Use a live tool when you need a current estimate with assumptions, source notes, and linked follow-up pages.
            </p>
            <Link href="/calculators" className="mt-4 inline-flex text-sm font-medium text-emerald-700 hover:underline">
              Browse calculators →
            </Link>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-semibold text-slate-900">Review how estimates are built</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Check the methodology page to understand what the site includes, excludes, and updates between tax years.
            </p>
            <Link href="/methodology" className="mt-4 inline-flex text-sm font-medium text-emerald-700 hover:underline">
              Read methodology →
            </Link>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-semibold text-slate-900">See common questions first</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              The FAQ page covers assumptions, estimate limits, tax-year review notes, and where to send corrections.
            </p>
            <Link href="/faq" className="mt-4 inline-flex text-sm font-medium text-emerald-700 hover:underline">
              Open FAQ →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
