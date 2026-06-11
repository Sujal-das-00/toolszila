import { ResourcePlaceholder } from "@/components/content/ResourcePlaceholder";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Guides",
  description: "Guides on salary planning, taxes, paycheck calculations, and take-home pay decisions.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <ResourcePlaceholder
      title="Guides"
      description="Explore salary planning, paycheck tax, take-home pay, and country-specific tax guides that explain the numbers behind each calculator result."
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }]}
    />
  );
}
