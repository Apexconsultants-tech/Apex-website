import { ImageResponse } from "next/og";
import { site } from "@/lib/site-config";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #15803D 0%, #166534 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ fontSize: 54, fontWeight: 700, color: "white", letterSpacing: -1 }}>
            Apex
          </span>
          <span style={{ fontSize: 54, fontWeight: 700, color: "#BBF7D0", letterSpacing: -1 }}>
            .
          </span>
        </div>
        <div style={{ marginTop: 4, fontSize: 24, color: "rgba(255,255,255,0.65)", letterSpacing: 3 }}>
          CONSULTING SERVICES
        </div>
        <div
          style={{
            marginTop: 56,
            fontSize: 58,
            fontWeight: 600,
            color: "white",
            lineHeight: 1.15,
            maxWidth: 940,
          }}
        >
          Where Futures Cross Continents
        </div>
        <div style={{ marginTop: 28, fontSize: 28, color: "rgba(255,255,255,0.75)" }}>
          {`Overseas education consultants since ${site.foundedYear}`}
        </div>
      </div>
    ),
    { ...size }
  );
}
