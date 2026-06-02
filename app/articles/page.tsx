import { ResourcePlaceholder } from "@/components/content/ResourcePlaceholder";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Articles",
  description: "Articles and blog posts from ToolsZila.",
  path: "/articles",
});

export default function ArticlesPage() {
  return (
    <ResourcePlaceholder
      title="Articles"
      description="News and articles on personal finance, taxes, and calculators — coming soon."
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Articles", path: "/articles" }]}
    />
  );
}
