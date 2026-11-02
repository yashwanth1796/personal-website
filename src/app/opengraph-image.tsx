import { ImageResponse } from "next/og";
import { lanes, projectList, stations } from "@/lib/transit";

export const runtime = "nodejs";
export const alt = "Yashwanth Kumar Vandanapu, Senior Software Engineer: a career drawn as a transit map";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const firstYear = Math.min(...stations.map(s => Number(s.period.match(/\d{4}/)?.[0] ?? 9999)));
const years = new Date().getFullYear() - firstYear;
const shown = ["react", "services", "ai", "delivery"];

export default function Image() {
  const results = projectList.filter(p => p.outcome).map(p => p.outcome!);
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f4f4f1", color: "#15171a", padding: "64px 72px" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: -2, lineHeight: 1 }}>Yashwanth Kumar Vandanapu</div>
        <div style={{ marginTop: 18, fontSize: 30, color: "#4a4f57" }}>{`Senior Software Engineer · ${years}+ years · Toronto`}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, position: "relative" }}>
        {lanes.filter(l => shown.includes(l.id)).map(l => (
          <div key={l.id} style={{ display: "flex", height: 14, borderRadius: 7, background: l.color, width: "100%" }} />
        ))}
        <div style={{ display: "flex", position: "absolute", top: -14, left: 0, right: 0, justifyContent: "space-between" }}>
          {["SurveyMonkey", "Canada Life", "Citi", "Telus"].reverse().map(name => (
            <div key={name} style={{ display: "flex", width: 34, height: 110, borderRadius: 17, background: "#fff", border: "6px solid #15171a" }} />
          ))}
          <div style={{ display: "flex", width: 34, height: 110, borderRadius: 17, background: "#15171a" }} />
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {results.map(r => (
          <div key={r} style={{ display: "flex", flexShrink: 0, padding: "10px 18px", borderRadius: 14, background: "#fff", fontSize: 24, fontWeight: 700 }}>{r}</div>
        ))}
      </div>
    </div>,
    size,
  );
}
