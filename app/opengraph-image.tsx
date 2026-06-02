import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/constants";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#f8fafc",
          color: "#0f172a",
          padding: 72,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 700, color: "#047857" }}>
          {siteConfig.name}
        </div>
        <div style={{ marginTop: 28, maxWidth: 880, fontSize: 70, fontWeight: 800, lineHeight: 1.05 }}>
          US Paycheck Calculator
        </div>
        <div style={{ marginTop: 24, maxWidth: 900, fontSize: 32, lineHeight: 1.35, color: "#475569" }}>
          Estimate federal tax, state tax, Social Security, Medicare, and take-home pay.
        </div>
      </div>
    ),
    size,
  );
}
