import { FaqSection } from "@/components/content/FaqSection";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { getHomePageFaqs } from "@/lib/content/templates";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "FAQ",
  description: "Frequently asked questions about ToolsZila calculators and estimates.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]} />
          <h1 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h1>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <FaqSection faqs={getHomePageFaqs()} />
      </div>
    </>
  );
}
