import type { FaqItem } from "@/types/seo";

interface FaqSectionProps {
  faqs: FaqItem[];
  title?: string;
}

/** FAQ accordion section — server-rendered for SEO, styled with details/summary. */
export function FaqSection({ faqs, title = "Frequently Asked Questions" }: FaqSectionProps) {
  return (
    <section className="mt-12" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      <div className="mt-6 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
        {faqs.map((faq, index) => (
          <details key={index} className="group px-6 py-4">
            <summary className="cursor-pointer list-none font-medium text-slate-900 marker:hidden [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-4">
                {faq.question}
                <span
                  className="text-slate-400 transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
