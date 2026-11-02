import { cache } from "react";

// Types for blog posts
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  coverImage: string | null;
  published: boolean;
}

export interface NotionBlock {
  id: string;
  type: string;
  has_children?: boolean;
  children?: NotionBlock[];
  [key: string]: unknown;
}

export interface BlogPostWithContent extends BlogPost {
  content: NotionBlock[];
}

interface RichText { plain_text: string }
interface NotionPage {
  id: string;
  created_time: string;
  properties: {
    Title?: { title: RichText[] };
    Slug?: { rich_text: RichText[] };
    Description?: { rich_text: RichText[] };
    Date?: { date: { start: string } | null };
    Tags?: { multi_select: { name: string }[] };
    Cover?: { files: { file?: { url: string }; external?: { url: string } }[] };
  };
}
interface NotionList<T> {
  results: T[];
  next_cursor: string | null;
}

async function notionFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`https://api.notion.com/v1${endpoint}`, {
    ...options,
    signal: AbortSignal.timeout(15_000),
    headers: {
      Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  if (!response.ok) throw new Error(`Notion API error: ${response.status}`);
  return response.json() as Promise<T>;
}

const extractText = (richText: RichText[] = []) => richText.map((text) => text.plain_text).join("");

// React cache shares requests between metadata, page rendering, and tag derivation.
export const getAllPosts = cache(async (): Promise<BlogPost[]> => {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!process.env.NOTION_API_KEY || !databaseId) return [];

  const posts: BlogPost[] = [];
  let cursor: string | undefined;
  do {
    const data = await notionFetch<NotionList<NotionPage>>(`/databases/${encodeURIComponent(databaseId)}/query`, {
      method: "POST",
      body: JSON.stringify({
        page_size: 100,
        start_cursor: cursor,
        filter: { property: "Published", checkbox: { equals: true } },
        sorts: [{ property: "Date", direction: "descending" }],
      }),
    });
    for (const page of data.results) {
      const properties = page.properties;
      const title = extractText(properties.Title?.title).trim();
      // A page without a title is a draft that was ticked Published by mistake.
      if (!title) continue;
      const cover = properties.Cover?.files[0];
      posts.push({
        id: page.id,
        title,
        slug: extractText(properties.Slug?.rich_text) || page.id,
        description: extractText(properties.Description?.rich_text),
        date: properties.Date?.date?.start || page.created_time.split("T")[0],
        tags: properties.Tags?.multi_select.map((tag) => tag.name) || [],
        coverImage: cover?.file?.url || cover?.external?.url || null,
        published: true,
      });
    }
    cursor = data.next_cursor || undefined;
  } while (cursor);
  return posts;
});

export const getPostBySlug = cache(async (slug: string): Promise<BlogPostWithContent | null> => {
  const post = (await getAllPosts()).find((post) => post.slug === slug);
  if (!post) return null;
  return { ...post, content: await getPageContent(post.id) };
});

// Fetch every page of children recursively; propagate failures instead of publishing partial articles.
async function getPageContent(blockId: string): Promise<NotionBlock[]> {
  const blocks: NotionBlock[] = [];
  let cursor: string | undefined;
  do {
    const query = new URLSearchParams({ page_size: "100" });
    if (cursor) query.set("start_cursor", cursor);
    const data = await notionFetch<NotionList<NotionBlock>>(`/blocks/${encodeURIComponent(blockId)}/children?${query}`);
    for (const block of data.results) {
      blocks.push({
        ...block,
        children: block.has_children ? await getPageContent(block.id) : [],
      });
    }
    cursor = data.next_cursor || undefined;
  } while (cursor);
  return blocks;
}

// Calculate reading time
export function calculateReadingTime(content: NotionBlock[]): number {
  let wordCount = 0;
  const count = (blocks: NotionBlock[]) => {
    for (const block of blocks) {
      const value = block[block.type] as { rich_text?: RichText[] } | undefined;
      wordCount += extractText(value?.rich_text).match(/\S+/g)?.length || 0;
      count(block.children || []);
    }
  };
  count(content);
  return Math.max(1, Math.ceil(wordCount / 200));
}
