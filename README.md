# Yashwanth Kumar Vandanapu — Portfolio

Personal portfolio and Notion-backed technical blog built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

## Development

Requires Node.js 20.9 or later.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. The portfolio works without Notion credentials; the blog displays an empty state until configured.

## Blog configuration

Copy `.env.example` to `.env.local`, then set:

- `NOTION_API_KEY`: your Notion integration secret.
- `NOTION_DATABASE_ID`: the database shared with that integration.

The database must have these properties:

| Property | Type | Purpose |
| --- | --- | --- |
| Title | Title | Article title |
| Slug | Rich text | Unique URL segment; defaults to page ID if empty |
| Description | Rich text | Summary and search metadata |
| Date | Date | Publication date; defaults to page creation date |
| Tags | Multi-select | Topic filters |
| Cover | Files | Optional article cover |
| Published | Checkbox | Only checked pages appear publicly |

The integration uses Notion's `2022-06-28` API version and its database query endpoint. Blog pages revalidate hourly. Listings and nested block content are paginated. Paragraphs, headings, nested lists, toggles, tasks, code, quotes, callouts, images, videos, bookmarks, and embeds are rendered; unsupported block types are omitted, with their children rendered where available. Use supported blocks for article content.

API errors propagate instead of publishing sample posts or incomplete articles. Readers see a retry screen for blog rendering failures. RSS and sitemap requests also fail when the upstream service fails, rather than caching sample content.

## Checks and production

```sh
npm test
npm run lint
npm run typecheck
npm run build
npm run start
npm audit --omit=dev
```

Regression tests cover blog pagination, nested content, failure behavior, safe JSON-LD and RSS serialization, list markup, URL handling, and reading time. Deploy to a host supporting Next.js server rendering and route handlers, such as Vercel, with the same environment variables. The Notion blog, RSS handler, and generated social images require a Next.js runtime; the app is not configured for static export.

The homepage uses server components, native HTML disclosures, and system fonts. No font downloads or application client components are required for the homepage.

## Customization

- Portfolio components: `src/components/`.
- Shared career history and employer-attributed projects: `src/data/`.
- Theme and reduced-motion styles: `src/app/globals.css`.
- Search/social metadata: `src/app/layout.tsx` and blog route metadata.
- Notion data fetching: `src/lib/notion.ts`.
- App icon source: `public/icon.svg`, with PNG variants for installed apps and Apple devices.

Project cards use expandable details from the existing portfolio descriptions. Add verified demos, screenshots, repositories, and case-study outcomes as they become available.

Contact: [yashwanth.vandanapu@gmail.com](mailto:yashwanth.vandanapu@gmail.com).

## Resume maintenance

The two downloadable PDFs in `public/` are generated with `scripts/build_resumes.py` (Python + `reportlab`). Both use the shared career history in `src/data/experiences.json`; summaries, skill groups, and bullet ordering are tailored in the script. Rebuild with `python scripts/build_resumes.py`, then render and inspect both pages of each PDF. Keep the existing filenames so download links remain valid.

The October 2026 revision targets staff/lead engineering opportunities while retaining actual historical job titles. It emphasizes architecture, reusable components, technical delivery, and mentoring; AI/LLM work is attributed only to SurveyMonkey. Existing quantified outcomes are retained from the previous resumes; no new performance or team-size claims were added.

Market references reviewed for positioning:
- [Affirm: Staff Software Engineer, Frontend](https://job-boards.greenhouse.io/affirm/jobs/8034827003)
- [Forma.ai: Staff Frontend Engineer](https://job-boards.greenhouse.io/formaaiinc/jobs/4489736005)
- [Northbeam: Senior Fullstack Engineer](https://job-boards.greenhouse.io/northbeam/jobs/4697407006)

These postings inform emphasis only; their requirements are not treated as evidence of the candidate's experience.

## Design direction

The portfolio uses a persistent desktop profile rail with a single reading column. Mobile moves the profile and native anchor navigation above the content. Three employer-attributed case studies show technical scope, personal contribution, and outcomes from the existing resumes. Additional projects and detailed contributions use native HTML disclosures. System fonts, server components, and CSS layout preserve the lightweight initial load.

References researched for the October 2026 redesign:
- [Brittany Chiang](https://brittanychiang.com/): persistent identity, experience hierarchy, and readable project evidence.
- [Arpit Bhayani](https://arpitbhayani.me/): concrete systems work and a clear engineering career narrative.
- [Paco Coursey](https://paco.me/) and [Emil Kowalski](https://emilkowal.ski/): restrained typography, concise project descriptions, and purposeful detail.
- [Lee Robinson](https://leerob.com/) and [Rauno Freiberg](https://rauno.me/): direct personal introduction and curated work.

These informed the structure and restraint; the visual system and copy are specific to this portfolio. No third-party artwork, screenshots, or branding were copied.
