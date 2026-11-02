---
name: Yashwanth Kumar Vandanapu, Career Transit Map
description: A personal portfolio as an explorable transit map. Technologies are lines, roles are stations.
colors:
  ink: "#15171a"
  ink-secondary: "#4a4f57"
  ink-muted: "#5c6169"
  ground: "#f4f4f1"
  card: "#ffffff"
  rule: "#dcdcd5"
  line-react: "#1565c0"
  line-vue: "#138a4f"
  line-angular: "#d3262e"
  line-apis: "#ef8a00"
  line-data: "#7b4a22"
  line-ai: "#d4006f"
  line-delivery: "#5b6570"
typography:
  display:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.375rem, 2.6vw, 2.125rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 900
    lineHeight: 1.05
  station:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "19px"
    fontWeight: 800
  body:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Overpass, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 800
rounded:
  control: "12px"
  capsule: "18px"
  panel: "24px"
  pill: "999px"
spacing:
  lane: "16px"
  hud: "clamp(16px, 3vw, 32px)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.card}"
    rounded: "{rounded.pill}"
    padding: "11px 20px"
  legend-chip:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "36px"
  panel:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    width: "380px"
---

# Design System: Yashwanth Kumar Vandanapu, Career Transit Map

## Overview

**Creative North Star: "The Career Transit Map"**

The homepage is a single explorable map rather than a page of text. Each technology is a transit line, each role is an interchange station, and every live line runs on, dashed, to the terminus "Next stop: your team". Reading is replaced by exploring: drag, zoom, tap a station, ride to the next stop. Text appears only on demand, in the station panel.

**Key Characteristics:**
- One full-viewport map; the interface floats over it as capsules.
- Seven saturated line colours on a signage-grey ground, with near-black ink for everything else.
- Heavy signage type (Overpass) with labels haloed against the ground.
- Motion as material: lines draw in, trains shuttle along lines, the current station pulses, and the panel springs in.

## Colors

### Primary
- **Ink**: primary actions (the Contact pill, Email me), station outlines, the terminus, and the hint pill.

### Tertiary
- **Line colours** (React blue, Vue green, Angular red, APIs orange, Data brown, AI magenta, Delivery grey) belong to the lines only: the line itself, its stop dots, its legend swatch, and its tags in the panel.

### Neutral
- **Ground** for the map, **Card** for the HUD and panel, plus **Ink Secondary/Muted** for years and metadata.

**The Line Colour Rule.** A line colour always means that technology. It never decorates anything else.

## Typography

**Font:** Overpass (self-hosted via next/font), derived from highway signage.

### Hierarchy
- **Display** (900, 1.375–2.125rem): the name in the HUD.
- **Headline** (900, 1.875rem): the station name in the panel.
- **Station** (800, 19px in map units): station labels, haloed with a 6px ground stroke.
- **Body** (400, 1.0625rem): the one-line summary in the panel.
- **Label** (800, 0.875rem): legend chips, panel tags, navigation.

**The On-Demand Rule.** The map shows only names and years. Everything longer lives behind a station tap, and highlights stay behind "What I did".

## Layout

The map fills the viewport (100svh) and has no page scroll. The horizontal layout runs left to right in time (stations 200 units apart), and the move to Canada is a 45° shift between two bands. At 720px and below, the map turns vertical (time running down), the panel becomes a bottom sheet (max 62svh), the legend becomes a scrolling strip, and zoom buttons hide (pinch instead). Lanes are 16 units apart and 10 units wide.

## Elevation & Depth

The map is flat. Floating UI gets one soft shadow step: capsules use `0 6px 24px` at 8% ink with a backdrop blur, and the panel uses `0 24px 60px` at 14%. Nothing on the map itself casts a shadow.

## Shapes

Round everywhere: stations are fully rounded pills, the HUD uses 12–18px capsules, the panel is 24px, and buttons are pills. Lines use round caps and joins, and future lines are round-dot dashes.

## Components

### Station
A white pill with a 3.5px ink outline spanning all lanes, holding a coloured stop dot for each line it serves. It scales up 7% on hover and 12% when selected (with a thicker outline). Focus shows a blue ring. The current role pulses.

### Station panel
A right-side card on desktop and a bottom sheet on mobile, sliding in on `cubic-bezier(.32,.72,0,1)`. It contains line tags, the company, role, period, outcome tile, summary and "What I did", plus prev/next "ride the line" buttons. Escape closes it, and the arrow keys ride.

### Legend
Chips that filter by line. The active chip fills with its line colour, the other lines fade to 10%, and stations not served dim to 30%.

### Primary button
An ink pill with white text, scaling to 1.05 on hover and 0.97 on press.

## Do's and Don'ts

### Do:
- **Do** derive every station, line and stop from `src/data/` through `src/lib/transit.ts`.
- **Do** keep the map usable with keyboard (stations are buttons) and keep the screen-reader career summary in sync.
- **Do** respect reduced motion: no trains, no draw-in, and instant fly-to.

### Don't:
- **Don't** put paragraphs on the map surface.
- **Don't** reuse line colours for decoration or status.
- **Don't** add page scroll or sections below the map; new content belongs in panels.
