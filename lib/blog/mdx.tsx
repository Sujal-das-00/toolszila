import type { MDXComponents } from "mdx/types";
import { IpoCalculator, NetWorthCalculator } from "@/components/calculator/SpecialCalculators";
import { Card } from "@/components/ui/Card";

function headingId(children: React.ReactNode): string {
  const text = Array.isArray(children) ? children.join(" ") : String(children ?? "");
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export const blogMdxComponents: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2
      id={headingId(children)}
      className="mt-12 scroll-mt-28 text-2xl font-bold text-slate-900"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      id={headingId(children)}
      className="mt-8 scroll-mt-28 text-xl font-semibold text-slate-900"
      {...props}
    >
      {children}
    </h3>
  ),
  p: (props) => <p className="mt-4 text-base leading-8 text-slate-700" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-slate-700" {...props} />,
  li: (props) => <li className="leading-8" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mt-6 border-l-4 border-emerald-500 bg-emerald-50 px-5 py-4 text-slate-700"
      {...props}
    />
  ),
  code: (props) => (
    <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-900" {...props} />
  ),
  pre: (props) => (
    <pre
      className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-4 text-sm text-slate-100"
      {...props}
    />
  ),
  table: (props) => (
    <Card className="mt-8 overflow-x-auto p-0">
      <table className="min-w-full border-collapse text-left text-sm" {...props} />
    </Card>
  ),
  th: (props) => (
    <th className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-900" {...props} />
  ),
  td: (props) => (
    <td className="border-b border-slate-100 px-4 py-3 text-slate-700" {...props} />
  ),
  IpoCalculator,
  NetWorthCalculator,
};
