import { ResourcePlaceholder } from "@/components/content/ResourcePlaceholder";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "New Tools",
  description: "Recently launched calculators on ToolsZila.",
  path: "/tools/new",
});

export default function NewToolsPage() {
  return (
    <ResourcePlaceholder
      title="New Tools"
      description="We will list recently launched calculators here as we ship new categories."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Tools", path: "/tools" },
        { name: "New", path: "/tools/new" },
      ]}
    />
  );
}
