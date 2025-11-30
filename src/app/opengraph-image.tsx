import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Yashwanth Kumar Vandanapu - Senior Software Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0F1C",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(0, 240, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 80px",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 24,
              background: "linear-gradient(135deg, #00F0FF 0%, #A855F7 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              fontWeight: "bold",
              color: "#0A0F1C",
              marginBottom: 32,
            }}
          >
            YV
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 56,
              fontWeight: "bold",
              color: "#F8FAFC",
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            Yashwanth Kumar Vandanapu
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 28,
              color: "#00F0FF",
              marginBottom: 24,
            }}
          >
            Senior Software Engineer
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 22,
              color: "#94A3B8",
              textAlign: "center",
              maxWidth: 800,
              lineHeight: 1.5,
            }}
          >
            React • Next.js • TypeScript • AI/LLM • Enterprise Platforms
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 20,
            color: "#64748B",
          }}
        >
          yashwanth-vandanapu.dev
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

