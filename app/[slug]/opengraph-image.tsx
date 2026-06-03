import { ImageResponse } from "next/og";
import { parsePseoSlug } from "@/lib/pseo/routes";
import { siteConfig } from "@/lib/constants";
import { formatCurrency } from "@/lib/seo/metadata";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

interface ImageProps {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const page = parsePseoSlug(slug);

  const title = !page
    ? siteConfig.name
    : page.type === "state"
      ? `${page.state.name} Paycheck Calculator`
      : `${formatCurrency(page.amount)} Salary After Tax`;

  const subtitle = !page
    ? siteConfig.description
    : page.type === "state"
      ? `Estimate federal, state, Social Security, Medicare, and take-home pay for ${page.state.name}.`
      : `Estimate annual and per-paycheck take-home pay on a ${formatCurrency(page.amount)} salary in California.`;

  const badge = !page ? siteConfig.name : page.type === "state" ? "State Paycheck" : "Salary Guide";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #f8fafc 0%, #ecfdf5 40%, #dbeafe 100%)",
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
            {badge}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ maxWidth: 980, fontSize: 72, fontWeight: 800, lineHeight: 1.02 }}>{title}</div>
          <div style={{ maxWidth: 980, fontSize: 30, lineHeight: 1.35, color: "#475569" }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", gap: 18, fontSize: 24, color: "#334155" }}>
          <div>Free</div>
          <div>•</div>
          <div>50 states</div>
          <div>•</div>
          <div>Updated tax data</div>
        </div>
      </div>
    ),
    size,
  );
}
