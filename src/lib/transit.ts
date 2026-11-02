import experiences from "@/data/experiences.json";
import projects from "@/data/projects.json";
import personal from "@/data/personal.json";

export type LaneId = "react" | "vue" | "angular" | "services" | "data" | "ai" | "delivery";

export const lanes: { id: LaneId; label: string; color: string; members: string[] }[] = [
  { id: "react", label: "React", color: "#1565c0", members: ["React", "Next.js", "Redux", "TypeScript"] },
  { id: "vue", label: "Vue", color: "#138a4f", members: ["Vue", "Vue 3", "Pinia"] },
  { id: "angular", label: "Angular", color: "#d3262e", members: ["Angular"] },
  { id: "services", label: "APIs", color: "#ef8a00", members: ["Node.js", "Python", "REST APIs", "Loopback"] },
  { id: "data", label: "Data", color: "#7b4a22", members: ["PostgreSQL", "MongoDB"] },
  { id: "ai", label: "AI", color: "#d4006f", members: ["OpenAI", "LangChain"] },
  { id: "delivery", label: "Delivery", color: "#5b6570", members: ["AWS", "AWS EC2", "Terraform", "Ansible", "Nx", "NX", "Jest", "Nginx"] },
];

const outcomes = new Map(projects.filter(p => p.outcome).map(p => [p.company, p.outcome!]));

const shortTitles: Record<string, string> = {
  "Survey authoring & shared UI foundations": "Survey authoring",
  "Conversational Bot UI Framework": "Conversational bot UI",
  "Financial Workflow Automation": "Retirement workflows",
  "Enterprise Dashboard Rebuild": "Banking dashboards",
  "Micro-Frontend Architecture": "Micro-frontends",
  "Healthcare Workflow Platform": "Healthcare workflows",
};

const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const lanesFor = (tech: string[]) => lanes.filter(lane => tech.some(t => lane.members.includes(t))).map(lane => lane.id);

export type CaseStudy = { problem: string; role: string; decisions: string[]; result: string };
export type Shot = { src: string; alt: string };

export type Project = {
  id: string;
  title: string;
  short: string;
  category: string;
  company: string;
  description: string;
  highlights: string[];
  tech: string[];
  lanes: LaneId[];
  outcome?: string;
  caseStudy?: CaseStudy;
};

export const projectList: Project[] = projects.map(p => ({
  id: slug(p.title),
  title: p.title,
  short: shortTitles[p.title] ?? p.title,
  category: p.category,
  company: p.company,
  description: p.description,
  highlights: p.highlights.slice(0, 4),
  tech: p.tech,
  lanes: lanesFor(p.tech),
  outcome: p.outcome,
  caseStudy: (p as { caseStudy?: CaseStudy }).caseStudy,
}));

export type Station = {
  id: string;
  company: string;
  role: string;
  years: string;
  period: string;
  region: "India" | "Canada";
  summary: string;
  highlights: string[];
  tech: string[];
  lanes: LaneId[];
  outcome?: string;
  current: boolean;
  employment?: string;
  projects: Project[];
};

export const stations: Station[] = [...experiences].reverse().map(role => {
  const [start, end] = role.period.split(/\s*–\s*/);
  const startYear = start.split(" ").pop();
  const endYear = end === "Present" ? "now" : end.split(" ").pop();
  return {
    id: slug(role.company),
    company: role.company,
    role: role.role,
    years: startYear === endYear ? String(startYear) : `${startYear}–${endYear}`,
    period: role.period,
    region: role.location as Station["region"],
    summary: role.description,
    highlights: role.highlights.slice(0, 3),
    tech: role.tech,
    lanes: lanesFor(role.tech),
    outcome: outcomes.get(role.company),
    current: role.current,
    employment: (role as { employment?: string }).employment,
    projects: projectList.filter(p => p.company === role.company),
  };
});

export const SIDE_COLOR = "#00838f";
export type SideProject = (typeof personal)[number] & { minor?: boolean; images?: Shot[]; problem?: string; how?: string };
const allSide = personal as SideProject[];
/** Smaller or early experiments stay in the List view's archive, off the map. */
export const sideProjects: SideProject[] = allSide.filter(p => !p.minor);
export const minorSideProjects: SideProject[] = allSide.filter(p => p.minor);

export type Orientation = "horizontal" | "vertical";

const LANE_GAP = 16;
export const SPAN = lanes.length * LANE_GAP;

type Pt = [number, number];

export function layout(orientation: Orientation) {
  const h = orientation === "horizontal";
  const gap = h ? 200 : 172;
  const start = h ? 150 : 150;
  const cross = (region: Station["region"]) => (h ? (region === "Canada" ? 250 : 420) : (region === "Canada" ? 96 : 180));
  const toXY = ([m, c]: Pt): Pt => (h ? [m, c] : [c, m]);

  const stationPts = stations.map((s, i) => ({ m: start + i * gap, c: cross(s.region) }));
  const last = stationPts[stationPts.length - 1];
  const terminus = { m: last.m + gap * 0.85, c: last.c };

  const laneOffset = (index: number) => (index - (lanes.length - 1) / 2) * LANE_GAP;

  function route(points: Pt[]) {
    const out: Pt[] = [points[0]];
    for (let i = 1; i < points.length; i++) {
      const [ma, ca] = points[i - 1];
      const [mb, cb] = points[i];
      const dc = cb - ca;
      if (dc !== 0) {
        const mid = (ma + mb) / 2;
        out.push([mid - Math.abs(dc) / 2, ca], [mid + Math.abs(dc) / 2, cb]);
      }
      out.push([mb, cb]);
    }
    return out.map(toXY).map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  }

  const lanePaths = lanes.map((lane, li) => {
    const served = stations.map((s, i) => (s.lanes.includes(lane.id) ? i : -1)).filter(i => i >= 0);
    const off = laneOffset(li);
    const first = served[0];
    const lastServed = served[served.length - 1];
    const lead = lane.id === "ai" ? 0.55 : 0;
    const pts: Pt[] = [];
    if (lead) pts.push([stationPts[first].m - gap * lead, stationPts[first].c + off]);
    for (let i = first; i <= lastServed; i++) pts.push([stationPts[i].m, stationPts[i].c + off]);
    const live = lastServed === stations.length - 1;
    return {
      ...lane,
      d: route(pts),
      next: live ? route([[last.m, last.c + off], [terminus.m, terminus.c + off]]) : null,
    };
  });

  const half = SPAN / 2 + 10;
  const stationLayout = stations.map((s, i) => {
    const { m, c } = stationPts[i];
    const [x, y] = toXY([m, c]);
    const label = h
      ? { x, y: s.region === "Canada" ? c - half - 44 : c + half + 34, anchor: "middle" as const }
      : { x: x + half + 22, y: y - 4, anchor: "start" as const };
    return { ...s, x, y, label };
  });
  const projectLayout = stationLayout.flatMap((s, si) => {
    if (!s.projects.length) return [];
    const dir = s.region === "Canada" ? 1 : -1;
    const stops = s.projects.map((p, j) => {
      const at = h
        ? { x: s.x, y: s.y + dir * (half + 36 + j * 34) }
        : { x: s.x + half + 14, y: s.y + 50 + j * 32 };
      return { ...p, station: si, x: at.x, y: at.y, labelX: at.x + 17, labelY: at.y + 5 };
    });
    const end = stops[stops.length - 1];
    const spur = h
      ? `M${s.x} ${s.y + dir * half} L${end.x} ${end.y}`
      : `M${s.x + half} ${s.y} L${s.x + half + 14} ${s.y} L${end.x} ${end.y}`;
    return [{ station: si, spur, stops }];
  });

  const sideStops = h
    ? sideProjects.map((p, j) => ({ ...p, x: start + j * gap, y: 700 }))
    : sideProjects.map((p, j) => ({ ...p, x: cross("Canada"), y: terminus.m + 230 + j * 130 }));
  const sideStart = h ? { x: start - 90, y: 700 } : { x: cross("Canada"), y: terminus.m + 140 };
  const sideEnd = sideStops[sideStops.length - 1];
  const side = {
    color: SIDE_COLOR,
    d: `M${sideStart.x} ${sideStart.y} L${h ? sideEnd.x + 50 : sideEnd.x} ${h ? sideEnd.y : sideEnd.y + 50}`,
    title: h ? { x: sideStart.x, y: sideStart.y - 26, anchor: "start" as const } : { x: sideStart.x + 26, y: sideStart.y + 6, anchor: "start" as const },
    stops: sideStops.map(stop => ({
      ...stop,
      label: h ? { x: stop.x, y: stop.y + 38, anchor: "middle" as const } : { x: stop.x + 28, y: stop.y + 1, anchor: "start" as const },
    })),
  };

  const [tx, ty] = toXY([terminus.m, terminus.c]);
  const terminusLayout = {
    x: tx, y: ty,
    label: h ? { x: tx, y: terminus.c - half - 44, anchor: "middle" as const } : { x: tx + half + 22, y: ty - 4, anchor: "start" as const },
  };

  const width = h ? terminus.m + 110 : 470;
  const height = h ? 790 : terminus.m + 230 + (sideProjects.length - 1) * 130 + 110;

  const fs = stationPts[2];
  const tl = stationPts[3];
  const mid = (fs.m + tl.m) / 2;
  const moveNote = h
    ? { x: mid + 14, y: cross("India") + 26, anchor: "start" as const }
    : { x: (cross("India") + cross("Canada")) / 2 + 50, y: (fs.m + tl.m) / 2 + 4, anchor: "start" as const };
  const regions = h
    ? [
        { name: "India", x: stationPts[1].m, y: 600 },
        { name: "Canada", x: stationPts[4].m + gap / 2, y: 96 },
      ]
    : [];

  return { orientation, width, height, half, lanes: lanePaths, stations: stationLayout, projects: projectLayout, side, terminus: terminusLayout, laneOffset, moveNote, regions };
}

export type MapLayout = ReturnType<typeof layout>;
