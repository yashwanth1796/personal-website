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

Fonts are self-hosted through `next/font` after download during the build. Build environments need access to Google Fonts.

## Customization

- Portfolio content: `src/components/`.
- Theme and reduced-motion styles: `src/app/globals.css`.
- Search/social metadata: `src/app/layout.tsx` and blog route metadata.
- Notion data fetching: `src/lib/notion.ts`.
- App icon source: `public/icon.svg`, with PNG variants for installed apps and Apple devices.

Project cards use expandable details from the existing portfolio descriptions. Add verified demos, screenshots, repositories, and case-study outcomes as they become available.

Contact: [yashwanth.vandanapu@gmail.com](mailto:yashwanth.vandanapu@gmail.com).
