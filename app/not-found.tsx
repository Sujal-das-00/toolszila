import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-slate-900">Page Not Found</h1>
      <p className="mt-4 text-slate-600">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
      >
        Back to Calculator
      </Link>
    </div>
  );
}
