import { ImageResponse } from "next/og";
import { getCategory, type ToolCategoryId } from "@/lib/navigation/site-architecture";
import { siteConfig } from "@/lib/constants";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

interface ImageProps {
  params: Promise<{ category: string }>;
}

export default async function Image({ params }: ImageProps) {
  const { category } = await params;
  const categoryData = getCategory(category as ToolCategoryId);
  const title = categoryData?.label ?? "Calculators";
  const subtitle = categoryData?.description ?? siteConfig.description;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #eff6ff 0%, #f8fafc 45%, #ecfeff 100%)",
          color: "#0f172a",
          padding: 64,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700, color: "#047857" }}>{siteConfig.name}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ maxWidth: 980, fontSize: 72, fontWeight: 800, lineHeight: 1.02 }}>{title}</div>
          <div style={{ maxWidth: 980, fontSize: 30, lineHeight: 1.35, color: "#475569" }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", gap: 18, fontSize: 24, color: "#334155" }}>
          <div>{category === "tax" ? "Tax cluster" : "Calculator hub"}</div>
          <div>•</div>
          <div>SEO-first content</div>
          <div>•</div>
          <div>Free tools</div>
        </div>
      </div>
    ),
    size,
  );
}
