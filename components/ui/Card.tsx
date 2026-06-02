import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

/** Base card container — used for results and content sections. */
export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white p-6 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface ResultCardProps {
  label: string;
  value: string;
  highlight?: boolean;
  sublabel?: string;
}

/** Individual result metric card for paycheck breakdown. */
export function ResultCard({ label, value, highlight, sublabel }: ResultCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        highlight
          ? "border-emerald-200 bg-emerald-50"
          : "border-slate-200 bg-slate-50",
      )}
    >
      <p className="text-sm font-medium text-slate-600">{label}</p>
      <p
        className={cn(
          "mt-1 text-2xl font-bold tracking-tight",
          highlight ? "text-emerald-700" : "text-slate-900",
        )}
      >
        {value}
      </p>
      {sublabel && (
        <p className="mt-1 text-xs text-slate-500">{sublabel}</p>
      )}
    </div>
  );
}
