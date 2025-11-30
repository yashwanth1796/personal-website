import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/notion";

export const runtime = "edge";
export const alt = "Blog Post";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const title = post?.title || "Blog Post";
  const tags = post?.tags || [];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0A0F1C",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(0, 240, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
          padding: "60px 80px",
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

        {/* Tags */}
        <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
          {tags.slice(0, 3).map((tag, i) => (
            <div
              key={i}
              style={{
                padding: "8px 16px",
                backgroundColor: "rgba(0, 240, 255, 0.15)",
                border: "1px solid rgba(0, 240, 255, 0.3)",
                borderRadius: 20,
                color: "#00F0FF",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 60 ? 48 : 56,
            fontWeight: "bold",
            color: "#F8FAFC",
            lineHeight: 1.2,
            marginBottom: "auto",
            maxWidth: "90%",
          }}
        >
          {title}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 40,
          }}
        >
          {/* Author */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                background: "linear-gradient(135deg, #00F0FF 0%, #A855F7 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: "bold",
                color: "#0A0F1C",
              }}
            >
              YV
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 20, fontWeight: 600, color: "#F8FAFC" }}>
                Yashwanth Kumar Vandanapu
              </div>
              <div style={{ fontSize: 16, color: "#94A3B8" }}>
                Senior Software Engineer
              </div>
            </div>
          </div>

          {/* URL */}
          <div style={{ fontSize: 18, color: "#64748B" }}>
            yashwanth-vandanapu.dev/blog
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

