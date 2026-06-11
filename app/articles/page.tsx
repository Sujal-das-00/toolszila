import { ResourcePlaceholder } from "@/components/content/ResourcePlaceholder";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Articles",
  description: "Educational articles on personal finance, tax planning, salary decisions, and calculator methodology.",
  path: "/articles",
});

export default function ArticlesPage() {
  return (
    <ResourcePlaceholder
      title="Articles"
      description="Read practical articles on taxes, personal finance, paycheck planning, and how to interpret calculator estimates before making real money decisions."
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Articles", path: "/articles" }]}
    />
  );
}
