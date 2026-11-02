"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import CopyButton from "./CopyButton";
import ViewToggle from "./ViewToggle";
import { lanes, layout, sideProjects, SIDE_COLOR, stations, type LaneId, type Orientation } from "@/lib/transit";

type View = { x: number; y: number; k: number };
const TERMINUS = stations.length;
const MIN_K = 0.35;
const MAX_K = 3;
const clampK = (k: number) => Math.min(MAX_K, Math.max(MIN_K, k));

function Icon({ d }: { d: string }) {
  return <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d={d} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
const icons = {
  plus: "M8 3v10M3 8h10",
  minus: "M3 8h10",
  fit: "M2.5 6V2.5H6M10 2.5h3.5V6M13.5 10v3.5H10M6 13.5H2.5V10",
  close: "M3.5 3.5l9 9M12.5 3.5l-9 9",
  prev: "M10 3.5 5.5 8l4.5 4.5",
  next: "M6 3.5 10.5 8 6 12.5",
  down: "M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10",
  out: "M5.5 3.5h7v7M12.5 3.5l-9 9",
};

export default function CareerMap({ showWriting }: { showWriting: boolean }) {
  const [orientation, setOrientation] = useState<Orientation>("horizontal");
  const map = useMemo(() => layout(orientation), [orientation]);
  const [selected, setSelected] = useState<number | null>(null);
  const [lane, setLane] = useState<LaneId | "side" | null>(null);
  const [ready, setReady] = useState(false);
  const [trains, setTrains] = useState(false);
  const [explored, setExplored] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [project, setProject] = useState<string | null>(null);
  const [side, setSide] = useState<string | null>(null);

  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);
  const view = useRef<View>({ x: 0, y: 0, k: 1 });
  const frame = useRef<number | null>(null);
  const moved = useRef(false);
  const reduced = useRef(false);

  const apply = useCallback(() => {
    const { x, y, k } = view.current;
    gRef.current?.setAttribute("transform", `translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${k.toFixed(4)})`);
  }, []);

  const stop = () => { if (frame.current !== null) cancelAnimationFrame(frame.current); frame.current = null; };

  const flyTo = useCallback((target: View) => {
    stop();
    if (reduced.current) { view.current = target; apply(); return; }
    let last = performance.now();
    const step = (now: number) => {
      const a = 1 - Math.exp(-(now - last) / 110);
      last = now;
      const v = view.current;
      const next = { x: v.x + (target.x - v.x) * a, y: v.y + (target.y - v.y) * a, k: v.k + (target.k - v.k) * a };
      view.current = next;
      apply();
      if (Math.abs(target.x - next.x) + Math.abs(target.y - next.y) + Math.abs(target.k - next.k) * 400 > 0.3) frame.current = requestAnimationFrame(step);
      else { view.current = target; apply(); frame.current = null; }
    };
    frame.current = requestAnimationFrame(step);
  }, [apply]);

  const fitView = useCallback((): View => {
    const el = wrapRef.current;
    if (!el) return view.current;
    const w = el.clientWidth;
    const h = el.clientHeight;
    if (map.orientation === "horizontal") {
      const top = 112, bottom = 104;
      const k = clampK(Math.min((w - 48) / map.width, (h - top - bottom) / map.height));
      return { k, x: (w - map.width * k) / 2, y: top + (h - top - bottom - map.height * k) / 2 };
    }
    const k = clampK(Math.min((w - 8) / map.width, 1.05));
    return { k, x: (w - map.width * k) / 2, y: 104 };
  }, [map]);

  const zoomAt = useCallback((factor: number, cx: number, cy: number, animate = false) => {
    const v = view.current;
    const k = clampK(v.k * factor);
    const target = { k, x: cx - (cx - v.x) * (k / v.k), y: cy - (cy - v.y) * (k / v.k) };
    if (animate) flyTo(target); else { stop(); view.current = target; apply(); }
  }, [apply, flyTo]);

  const focusPoint = useCallback((point: { x: number; y: number }) => {
    const el = wrapRef.current;
    if (!el) return;
    const w = el.clientWidth, h = el.clientHeight;
    const wide = w > 720;
    const k = clampK(Math.max(view.current.k, wide ? 1.15 : 0.95));
    const cx = wide ? (w - 420) / 2 : w / 2;
    const cy = wide ? h / 2 : h * 0.3;
    flyTo({ k, x: cx - point.x * k, y: cy - point.y * k });
  }, [flyTo]);

  const focusOn = useCallback((index: number) => {
    focusPoint(index === TERMINUS ? map.terminus : map.stations[index]);
  }, [map, focusPoint]);

  const projectStops = useMemo(() => map.projects.flatMap(group => group.stops), [map]);

  const select = useCallback((index: number | null) => {
    setSelected(index);
    setProject(null);
    setSide(null);
    setShowDetails(false);
    setExplored(true);
    if (index === null) flyTo(fitView());
    else focusOn(index);
  }, [fitView, flyTo, focusOn]);

  const openSide = useCallback((id: string) => {
    const stop = map.side.stops.find(item => item.id === id);
    if (!stop) return;
    setSelected(null);
    setProject(null);
    setSide(id);
    setShowDetails(false);
    setExplored(true);
    focusPoint(stop);
  }, [map, focusPoint]);

  const openProject = useCallback((id: string) => {
    const stop = projectStops.find(item => item.id === id);
    if (!stop) return;
    setSelected(stop.station);
    setSide(null);
    setProject(id);
    setShowDetails(false);
    setExplored(true);
    focusPoint(stop);
  }, [projectStops, focusPoint]);

  // Orientation and motion preference, before first paint.
  useLayoutEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mq = window.matchMedia("(max-width: 720px)");
    const sync = () => setOrientation(mq.matches ? "vertical" : "horizontal");
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    view.current = fitView();
    apply();
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, [fitView, apply]);

  useEffect(() => {
    if (!ready || reduced.current) return;
    const t = setTimeout(() => setTrains(true), 2200);
    return () => clearTimeout(t);
  }, [ready]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      if (el.clientWidth === 0) return;
      if (selected === null) { view.current = fitView(); apply(); }
      else focusOn(selected);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [fitView, apply, focusOn, selected]);

  // Pan, inertia, pinch, wheel.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const pointers = new Map<number, { x: number; y: number }>();
    let velocity = { x: 0, y: 0 };
    let lastTime = 0;
    let pinch = 0;
    let downAt = { x: 0, y: 0 };

    const local = (e: PointerEvent | WheelEvent) => {
      const r = svg.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      stop();
      moved.current = false;
      const p = local(e);
      downAt = p;
      pointers.set(e.pointerId, p);
      velocity = { x: 0, y: 0 };
      lastTime = performance.now();
      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        pinch = Math.hypot(a.x - b.x, a.y - b.y);
      }
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    };

    const onMove = (e: PointerEvent) => {
      const prev = pointers.get(e.pointerId);
      if (!prev) return;
      const p = local(e);
      pointers.set(e.pointerId, p);
      if (Math.hypot(p.x - downAt.x, p.y - downAt.y) > 6) { moved.current = true; svg.classList.add("is-dragging"); }
      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (pinch) zoomAt(dist / pinch, (a.x + b.x) / 2, (a.y + b.y) / 2);
        pinch = dist;
        return;
      }
      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      const dx = p.x - prev.x, dy = p.y - prev.y;
      velocity = { x: dx / dt, y: dy / dt };
      lastTime = now;
      view.current = { ...view.current, x: view.current.x + dx, y: view.current.y + dy };
      apply();
      if (moved.current) setExplored(true);
    };

    const onUp = (e: PointerEvent) => {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) pinch = 0;
      if (pointers.size > 0) return;
      svg.classList.remove("is-dragging");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      if (reduced.current || performance.now() - lastTime > 80) return;
      let v = { x: velocity.x * 16, y: velocity.y * 16 };
      const glide = () => {
        v = { x: v.x * 0.92, y: v.y * 0.92 };
        view.current = { ...view.current, x: view.current.x + v.x, y: view.current.y + v.y };
        apply();
        if (Math.abs(v.x) + Math.abs(v.y) > 0.3) frame.current = requestAnimationFrame(glide);
        else frame.current = null;
      };
      frame.current = requestAnimationFrame(glide);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      stop();
      const p = local(e);
      if (e.ctrlKey || e.metaKey) zoomAt(Math.exp(-e.deltaY * 0.01), p.x, p.y);
      else { view.current = { ...view.current, x: view.current.x - e.deltaX, y: view.current.y - e.deltaY }; apply(); }
      setExplored(true);
    };

    svg.addEventListener("pointerdown", onDown);
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      svg.removeEventListener("pointerdown", onDown);
      svg.removeEventListener("wheel", onWheel);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [apply, zoomAt]);

  // Keyboard.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest("input, textarea")) return;
      if (document.documentElement.dataset.view === "list") return;
      const el = wrapRef.current;
      const cx = (el?.clientWidth ?? 0) / 2, cy = (el?.clientHeight ?? 0) / 2;
      if (e.key === "Escape") { if (selected !== null || side !== null) select(null); else if (lane) setLane(null); }
      else if (e.key === "ArrowRight" && selected !== null && selected < TERMINUS) select(selected + 1);
      else if (e.key === "ArrowLeft" && selected !== null && selected > 0) select(selected - 1);
      else if (e.key === "+" || e.key === "=") zoomAt(1.4, cx, cy, true);
      else if (e.key === "-") zoomAt(1 / 1.4, cx, cy, true);
      else if (e.key === "0") flyTo(fitView());
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, side, lane, select, zoomAt, flyTo, fitView]);

  const activeProject = project ? projectStops.find(item => item.id === project) ?? null : null;
  const activeSide = side ? map.side.stops.find(item => item.id === side) ?? null : null;
  const activeLanes = new Set<LaneId>(
    lane === "side" || activeSide ? [] : lane ? [lane] : activeProject ? activeProject.lanes : selected !== null && selected < TERMINUS ? stations[selected].lanes : lanes.map(l => l.id),
  );
  const station = selected !== null && selected < TERMINUS ? map.stations[selected] : null;
  const h = map.orientation === "horizontal";
  const pill = (x: number, y: number) => (h
    ? { x: x - 14, y: y - map.half, width: 28, height: map.half * 2, rx: 14 }
    : { x: x - map.half, y: y - 14, width: map.half * 2, height: 28, rx: 14 });
  const nextProject = station && activeProject
    ? station.projects[station.projects.findIndex(item => item.id === activeProject.id) + 1] ?? null
    : null;
  const sideIndex = activeSide ? sideProjects.findIndex(item => item.id === activeSide.id) : -1;
  const stationLabel = (index: number) => (index === TERMINUS ? "Next stop: your team" : stations[index].company);

  const wrapCenter = () => ({ x: (wrapRef.current?.clientWidth ?? 0) / 2, y: (wrapRef.current?.clientHeight ?? 0) / 2 });

  return (
    <div className="metro" ref={wrapRef} data-ready={ready} data-panel={selected !== null || side !== null}>
      <svg
        ref={svgRef}
        className={`metro-map${ready ? " is-live" : ""}`}
        role="group"
        aria-label="Career map. Each coloured line is a technology, each station a role, each small stop a project, and the teal line holds side projects. Select one for details."
        data-filtered={lane !== null || selected !== null || side !== null}
      >
        <g ref={gRef}>
          {map.regions.map(region => (
            <text key={region.name} className="region" x={region.x} y={region.y} textAnchor="middle" aria-hidden="true">{region.name}</text>
          ))}
          <text className="move-note" x={map.moveNote.x} y={map.moveNote.y} textAnchor={map.moveNote.anchor} aria-hidden="true">Moved to Canada, 2021</text>

          {map.lanes.map((l, i) => (
            <g key={l.id} className="lane" data-on={activeLanes.has(l.id) || undefined} style={{ "--i": i, "--c": l.color } as React.CSSProperties}>
              <path id={`lane-${l.id}-${orientation}`} className="lane-line" d={l.d} pathLength={1} />
              {l.next && <path className="lane-next" d={l.next} />}
              {trains && (
                <circle className="train" r="5.5">
                  <animateMotion dur={`${9 + i * 1.7}s`} repeatCount="indefinite" begin={`${-i * 1.3}s`} keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="linear">
                    <mpath href={`#lane-${l.id}-${orientation}`} />
                  </animateMotion>
                </circle>
              )}
            </g>
          ))}

          {map.projects.map(group => {
            const dim = lane === "side" || activeSide !== null || (lane !== null && !group.stops.some(stop => stop.lanes.includes(lane)));
            return (
              <g key={group.station} className="spur" data-dim={dim || undefined} style={{ "--i": group.station } as React.CSSProperties}>
                <path className="spur-line" d={group.spur} />
                {group.stops.map(stop => (
                  <g
                    key={stop.id}
                    className="project-stop"
                    data-selected={project === stop.id || undefined}
                    role="button"
                    tabIndex={0}
                    aria-label={`Project: ${stop.title}, at ${stop.company}`}
                    aria-pressed={project === stop.id}
                    onClick={() => { if (!moved.current) { if (project === stop.id) select(stop.station); else openProject(stop.id); } }}
                    onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openProject(stop.id); } }}
                  >
                    <circle className="project-hit" cx={stop.x} cy={stop.y} r="16" />
                    <circle className="project-dot" cx={stop.x} cy={stop.y} r="8.5" />
                    <text className="project-label" x={stop.labelX} y={stop.labelY} aria-hidden="true">{stop.short}</text>
                  </g>
                ))}
              </g>
            );
          })}

          <g className="side-line" data-dim={(lane !== null && lane !== "side") || selected !== null || undefined} style={{ "--c": SIDE_COLOR, "--i": 9 } as React.CSSProperties}>
            <path className="lane-line" d={map.side.d} pathLength={1} />
            <text className="side-title" x={map.side.title.x} y={map.side.title.y} textAnchor={map.side.title.anchor} aria-hidden="true">Side projects</text>
            {map.side.stops.map(stop => (
              <g
                key={stop.id}
                className="side-stop"
                data-selected={side === stop.id || undefined}
                role="button"
                tabIndex={0}
                aria-label={`Side project: ${stop.title}, ${stop.years}${stop.ai ? ", uses AI" : ""}`}
                aria-pressed={side === stop.id}
                onClick={() => { if (!moved.current) { if (side === stop.id) select(null); else openSide(stop.id); } }}
                onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openSide(stop.id); } }}
              >
                <circle className="project-hit" cx={stop.x} cy={stop.y} r="20" />
                <circle className="side-dot" cx={stop.x} cy={stop.y} r="13" />
                {stop.ai && <circle className="side-ai" cx={stop.x} cy={stop.y} r="5" />}
                <text className="st-name" x={stop.label.x} y={stop.label.y} textAnchor={stop.label.anchor} aria-hidden="true">{stop.short}</text>
                <text className="st-years" x={stop.label.x} y={stop.label.y + 19} textAnchor={stop.label.anchor} aria-hidden="true">{stop.years}</text>
              </g>
            ))}
          </g>

          {map.stations.map((s, i) => {
            const dim = lane === "side" || activeSide !== null || (lane !== null && !s.lanes.includes(lane));
            return (
              <g
                key={s.id}
                className="station"
                data-current={s.current || undefined}
                data-selected={selected === i || undefined}
                data-dim={dim || undefined}
                style={{ "--i": i } as React.CSSProperties}
                role="button"
                tabIndex={0}
                aria-label={`${s.company}, ${s.role}, ${s.years}`}
                aria-pressed={selected === i}
                onClick={() => { if (!moved.current) select(selected === i ? null : i); }}
                onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(selected === i ? null : i); } }}
              >
                <rect className="focus-ring" {...pill(s.x, s.y)} />
                {s.current && <rect className="pulse" {...pill(s.x, s.y)} />}
                <rect className="pill" {...pill(s.x, s.y)} />
                {lanes.map((l, li) => s.lanes.includes(l.id) && (
                  <circle key={l.id} className="stop" r="4.5" fill={l.color} cx={h ? s.x : s.x + map.laneOffset(li)} cy={h ? s.y + map.laneOffset(li) : s.y} />
                ))}
                <text className="st-name" x={s.label.x} y={s.label.y} textAnchor={s.label.anchor} aria-hidden="true">{s.company}</text>
                <text className="st-years" x={s.label.x} y={s.label.y + 21} textAnchor={s.label.anchor} aria-hidden="true">{s.years}</text>
              </g>
            );
          })}

          <g
            className="station terminus"
            data-selected={selected === TERMINUS || undefined}
            style={{ "--i": stations.length } as React.CSSProperties}
            role="button"
            tabIndex={0}
            aria-label="Next stop: your team. Contact options"
            aria-pressed={selected === TERMINUS}
            onClick={() => { if (!moved.current) select(selected === TERMINUS ? null : TERMINUS); }}
            onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(TERMINUS); } }}
          >
            <rect className="focus-ring" {...pill(map.terminus.x, map.terminus.y)} />
            <rect className="pill" {...pill(map.terminus.x, map.terminus.y)} />
            <text className="st-years" x={map.terminus.label.x} y={map.terminus.label.y - 2} textAnchor={map.terminus.label.anchor} aria-hidden="true">Next stop</text>
            <text className="st-name st-next" x={map.terminus.label.x} y={map.terminus.label.y + 19} textAnchor={map.terminus.label.anchor} aria-hidden="true">Your team</text>
          </g>
        </g>
      </svg>

      <header className="hud-top">
        <div className="id">
          <h1>Yashwanth Kumar Vandanapu</h1>
          <p>Senior Software Engineer, Toronto</p>
        </div>
        <nav aria-label="Links" className="hud-links">
          <ViewToggle />
          {showWriting && <Link href="/blog" prefetch={false} className="hud-secondary">Writing</Link>}
          <a className="hud-secondary" href="https://github.com/yashwanth1796" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="hud-secondary" href="https://linkedin.com/in/Yashwanth-Vandanapu" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="hud-resume" href="/Resume - Frontend.pdf" download>Resume</a>
          <button type="button" className="cta" onClick={() => select(TERMINUS)}>Contact</button>
        </nav>
      </header>

      <div className="hud-bottom">
        <div className="legend" role="group" aria-label="Filter by technology line">
          {lanes.map(l => (
            <button
              key={l.id}
              type="button"
              aria-pressed={lane === l.id}
              style={{ "--c": l.color } as React.CSSProperties}
              onClick={() => { setLane(cur => (cur === l.id ? null : l.id)); setExplored(true); if (selected !== null || side !== null) { setSelected(null); setSide(null); } }}
            >
              <span className="swatch" aria-hidden="true" />{l.label}
            </button>
          ))}
          <button
            type="button"
            aria-pressed={lane === "side"}
            style={{ "--c": SIDE_COLOR } as React.CSSProperties}
            onClick={() => { setLane(cur => (cur === "side" ? null : "side")); setExplored(true); if (selected !== null || side !== null) { setSelected(null); setSide(null); } }}
          >
            <span className="swatch" aria-hidden="true" />Side projects
          </button>
        </div>
        <div className="zoom" role="group" aria-label="Map zoom">
          <button type="button" aria-label="Zoom out" onClick={() => { const c = wrapCenter(); zoomAt(1 / 1.4, c.x, c.y, true); }}><Icon d={icons.minus} /></button>
          <button type="button" aria-label="Zoom in" onClick={() => { const c = wrapCenter(); zoomAt(1.4, c.x, c.y, true); }}><Icon d={icons.plus} /></button>
          <button type="button" aria-label="Show whole map" onClick={() => select(null)}><Icon d={icons.fit} /></button>
        </div>
      </div>

      <p className="hint" data-hidden={explored || undefined} aria-hidden="true">Drag to explore, tap a station</p>

      <aside className="panel" aria-label="Station details" aria-hidden={selected === null && side === null} inert={selected === null && side === null}>
        <button type="button" className="panel-close" aria-label="Close" onClick={() => select(null)}><Icon d={icons.close} /></button>
        {activeSide && (
          <div className="panel-body" key={activeSide.id}>
            <ul className="panel-lines" aria-label="Line"><li style={{ "--c": SIDE_COLOR } as React.CSSProperties}>Side project</li>{activeSide.ai && <li style={{ "--c": "#d4006f" } as React.CSSProperties}>AI</li>}</ul>
            <p className="panel-kicker-line">{activeSide.years}</p>
            <h2>{activeSide.title}</h2>
            <p className="panel-summary">{activeSide.description}</p>
            {activeSide.images && activeSide.images.length > 0 && (
              <div className="shots">{activeSide.images.map(img => <Image key={img.src} src={img.src} alt={img.alt} width={1600} height={830} sizes="(max-width: 720px) 80vw, 340px" />)}</div>
            )}
            {(activeSide.problem || activeSide.how) && (
              <dl className="explain">
                {activeSide.problem && <div><dt>The problem</dt><dd>{activeSide.problem}</dd></div>}
                {activeSide.how && <div><dt>How it works</dt><dd>{activeSide.how}</dd></div>}
              </dl>
            )}
            {activeSide.highlights.length > 0 && <ul className="panel-highlights">{activeSide.highlights.map(item => <li key={item}>{item}</li>)}</ul>}
            {activeSide.tech.length > 0 && <p className="panel-tech">{activeSide.tech.join(", ")}</p>}
            {activeSide.link ? <a className="panel-primary" href={activeSide.link} target="_blank" rel="noopener noreferrer">{activeSide.linkLabel}</a> : <p className="panel-tech">Private repository. Demo available on request.</p>}
          </div>
        )}
        {activeSide && (
          <nav className="panel-nav" aria-label="Side projects navigation">
            <button type="button" disabled={sideIndex === 0} onClick={() => openSide(sideProjects[sideIndex - 1].id)}>
              <Icon d={icons.prev} /><span>{sideIndex > 0 ? sideProjects[sideIndex - 1].short : "Start"}</span>
            </button>
            <button type="button" disabled={sideIndex === sideProjects.length - 1} onClick={() => openSide(sideProjects[sideIndex + 1].id)}>
              <span>{sideIndex < sideProjects.length - 1 ? sideProjects[sideIndex + 1].short : "End of line"}</span><Icon d={icons.next} />
            </button>
          </nav>
        )}
        {station && activeProject && (
          <div className="panel-body" key={activeProject.id}>
            <ul className="panel-lines" aria-label="Lines on this project">
              {lanes.filter(l => activeProject.lanes.includes(l.id)).map(l => (
                <li key={l.id} style={{ "--c": l.color } as React.CSSProperties}>{l.label}</li>
              ))}
            </ul>
            <p className="panel-kicker-line">Project at {station.company}</p>
            <h2>{activeProject.title}</h2>
            {activeProject.outcome && <p className="panel-outcome">{activeProject.outcome}</p>}
            <p className="panel-summary">{activeProject.description}</p>
            {activeProject.caseStudy && (
              <dl className="case-study">
                <div><dt>Problem</dt><dd>{activeProject.caseStudy.problem}</dd></div>
                <div><dt>My role</dt><dd>{activeProject.caseStudy.role}</dd></div>
                <div><dt>Key decisions</dt><dd><ul>{activeProject.caseStudy.decisions.map(item => <li key={item}>{item}</li>)}</ul></dd></div>
                <div><dt>Result</dt><dd>{activeProject.caseStudy.result}</dd></div>
              </dl>
            )}
            <button type="button" className="panel-more" aria-expanded={showDetails} onClick={() => setShowDetails(v => !v)}>
              {showDetails ? "Hide details" : "How I built it"}
            </button>
            {showDetails && (
              <>
                <ul className="panel-highlights">{activeProject.highlights.map(item => <li key={item}>{item}</li>)}</ul>
                <p className="panel-tech">{activeProject.tech.join(", ")}</p>
              </>
            )}
          </div>
        )}
        {station && !activeProject && (
          <div className="panel-body" key={station.id}>
            <ul className="panel-lines" aria-label="Lines at this station">
              {lanes.filter(l => station.lanes.includes(l.id)).map(l => (
                <li key={l.id} style={{ "--c": l.color } as React.CSSProperties}>{l.label}</li>
              ))}
            </ul>
            <h2>{station.company}</h2>
            <p className="panel-role">{station.role}{station.employment && <span className="tag-contract">{station.employment}</span>}</p>
            <p className="panel-period">{station.period}</p>
            {station.outcome && <p className="panel-outcome">{station.outcome}</p>}
            <p className="panel-summary">{station.summary}</p>
            <button type="button" className="panel-more" aria-expanded={showDetails} onClick={() => setShowDetails(v => !v)}>
              {showDetails ? "Hide details" : "What I did"}
            </button>
            {showDetails && <ul className="panel-highlights">{station.highlights.map(item => <li key={item}>{item}</li>)}</ul>}
            {station.projects.length > 0 && (
              <div className="panel-projects">
                <h3>Projects</h3>
                <ul>
                  {station.projects.map(item => (
                    <li key={item.id}>
                      <button type="button" onClick={() => openProject(item.id)}>
                        <span className="project-chip-dot" aria-hidden="true" />
                        <span>{item.title}</span>
                        <Icon d={icons.next} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {selected === TERMINUS && (
          <div className="panel-body" key="terminus">
            <ul className="panel-lines" aria-label="Lines continuing"><li style={{ "--c": "#15171a" } as React.CSSProperties}>Terminus</li></ul>
            <h2>Next stop: your team</h2>
            <p className="panel-summary">Hiring a senior front-end or full-stack engineer? Let’s talk.</p>
            <a className="panel-primary" href="mailto:yashwanth.vandanapu@gmail.com">Email me</a>
            <p className="panel-email">yashwanth.vandanapu@gmail.com</p>
            <div className="copy-row">
              <CopyButton value="yashwanth.vandanapu@gmail.com" label="Copy email" />
              <CopyButton value="https://linkedin.com/in/Yashwanth-Vandanapu" label="Copy LinkedIn" />
              <CopyButton value="https://github.com/yashwanth1796" label="Copy GitHub" />
            </div>
            <div className="panel-actions">
              <a href="/Resume - Frontend.pdf" download><Icon d={icons.down} />Resume (PDF)</a>
              <a href="https://linkedin.com/in/Yashwanth-Vandanapu" target="_blank" rel="noopener noreferrer"><Icon d={icons.out} />LinkedIn</a>
              <a href="https://github.com/yashwanth1796" target="_blank" rel="noopener noreferrer"><Icon d={icons.out} />GitHub</a>
              <a className="panel-alt" href="/Resume - FullStack.pdf" download>Full-stack version of resume</a>
              {showWriting && <Link href="/blog" prefetch={false}><Icon d={icons.next} />Writing</Link>}
            </div>
          </div>
        )}
        {selected !== null && activeProject && station && (
          <nav className="panel-nav" aria-label="Project navigation">
            <button type="button" onClick={() => select(selected)}>
              <Icon d={icons.prev} /><span>{station.company}</span>
            </button>
            {nextProject ? (
              <button type="button" onClick={() => openProject(nextProject.id)}><span>{nextProject.short}</span><Icon d={icons.next} /></button>
            ) : (
              <button type="button" onClick={() => select(selected + 1)}><span>{stationLabel(selected + 1)}</span><Icon d={icons.next} /></button>
            )}
          </nav>
        )}
        {selected !== null && !activeProject && (
          <nav className="panel-nav" aria-label="Ride the line">
            <button type="button" disabled={selected === 0} onClick={() => select(selected - 1)}>
              <Icon d={icons.prev} /><span>{selected > 0 ? stationLabel(selected - 1) : "Start"}</span>
            </button>
            <button type="button" disabled={selected === TERMINUS} onClick={() => select(selected + 1)}>
              <span>{selected < TERMINUS ? stationLabel(selected + 1) : "End of line"}</span><Icon d={icons.next} />
            </button>
          </nav>
        )}
      </aside>
    </div>
  );
}
