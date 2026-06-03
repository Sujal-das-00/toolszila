import { ImageResponse } from "next/og";
import { findTool } from "@/lib/navigation/site-architecture";
import { getToolPageContent } from "@/lib/calculators/tool-content";
import { siteConfig } from "@/lib/constants";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

interface ImageProps {
  params: Promise<{ category: string; tool: string }>;
}

export default async function Image({ params }: ImageProps) {
  const { category, tool: slug } = await params;
  const tool = findTool(category, slug);
  const content = tool ? getToolPageContent(tool) : null;

  const title = content?.h1 ?? "Calculator";
  const subtitle = content?.seoDescription ?? siteConfig.description;
  const clusterLabel = category === "tax" ? "Tax Cluster" : category === "income" ? "Payroll & Salary" : siteConfig.name;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #ecfeff 0%, #f8fafc 45%, #dcfce7 100%)",
          color: "#0f172a",
          padding: 64,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#047857" }}>{siteConfig.name}</div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#065f46",
              background: "rgba(16, 185, 129, 0.12)",
              borderRadius: 9999,
              padding: "10px 18px",
            }}
          >
            {clusterLabel}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ maxWidth: 980, fontSize: 72, fontWeight: 800, lineHeight: 1.02 }}>{title}</div>
          <div style={{ maxWidth: 980, fontSize: 30, lineHeight: 1.35, color: "#475569" }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", gap: 18, fontSize: 24, color: "#334155" }}>
          <div>Free</div>
          <div>•</div>
          <div>Updated data</div>
          <div>•</div>
          <div>Structured estimates</div>
        </div>
      </div>
    ),
    size,
  );
}
