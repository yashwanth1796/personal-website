# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: hiring managers and technical recruiters evaluating Yashwanth for a Senior Software Engineer role. They arrive from a resume link, LinkedIn, or a referral, skim for a few minutes, and decide whether to reach out. Secondary: engineers reading the Notion-backed blog at `/blog`.

## Product Purpose

A personal portfolio and technical blog. Success means a qualified reviewer quickly understands what Yashwanth builds and at what level, then emails him or downloads a resume.

## Positioning

Senior Software Engineer (confirmed title; not repositioned to Staff). A front-end-led engineer with 9+ years in enterprise products: SurveyMonkey, Canada Life, Citi, Telus, FactSet. Strengths are shared React/Next.js foundations, accessible (WCAG 2.1) interfaces, production AI/LLM UI (streaming, tool calls), and the APIs behind them.

## Operating Context

Reviewers usually read on a laptop between other candidates, and sometimes on a phone straight from LinkedIn. They compare this site against a resume PDF and a LinkedIn profile.

## Capabilities and Constraints

- Next.js 16 / React 19 / Tailwind 4, static export served by Cloudflare; the blog is pulled from Notion at build time and rebuilt daily.
- Career data lives in `src/data/experiences.json` and `src/data/projects.json`, and the resumes share it.
- The homepage currently works without JavaScript (native `<details>`, plain anchors). Whether to keep that is open, but it's a strong default.
- Undecided: whether the system-font / no-font-download rule and the "yv." monogram are binding. Treat both as open.

## Evidence on Hand

- Quantified outcomes: 30% less code redundancy (SurveyMonkey), 40% fewer defects (Canada Life), 25% workflow-efficiency improvement (Citi).
- Two resumes: `public/Resume - Frontend.pdf` and `public/Resume - FullStack.pdf`.
- GitHub: yashwanth1796. LinkedIn: Yashwanth-Vandanapu. Email: yashwanth.vandanapu@gmail.com.
- Absent: no testimonials, no public demos, no screenshots of employer work, and no talks. Don't invent any of these.

## Product Principles

1. A reviewer should understand the role, the level, and the proof within the first screen.
2. Every claim on the site is backed by the career data. No inflated titles or invented metrics.
3. Contact and resume are always one action away.
4. The site itself demonstrates the craft it claims: accessible, fast, and carefully made.

## Accessibility & Inclusion

WCAG 2.1 AA at minimum, because accessibility is one of the claimed specialties.
