import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Yashwanth Kumar Vandanapu - Software engineering, architecture, and technical leadership";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#ffffff", color: "#101828", padding: 70, flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: "#475467" }}><span>ENGINEERING PORTFOLIO</span><span>TORONTO, CANADA</span></div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 68, fontWeight: 700, letterSpacing: -3, lineHeight: 1.1 }}><span>Yashwanth Kumar</span><span style={{ color: "#2459db" }}>Vandanapu.</span></div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 27, color: "#475467", gap: 12 }}><span>Front-end depth. Full-stack perspective.</span><span>10 years in software, architecture, and technical leadership.</span></div>
      <div style={{ display: "flex", borderTop: "1px solid #d5dce6", paddingTop: 24, fontSize: 19, color: "#2459db" }}>yashwanth-vandanapu.dev</div>
    </div>,
    size,
  );
}
