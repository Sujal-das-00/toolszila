import { ResourcePlaceholder } from "@/components/content/ResourcePlaceholder";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Guides",
  description: "Financial and tax guides from ToolsZila.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <ResourcePlaceholder
      title="Guides"
      description="In-depth guides on paycheck taxes, salary planning, and more — publishing soon."
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }]}
    />
  );
}
