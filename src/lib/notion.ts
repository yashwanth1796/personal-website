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
  [key: string]: unknown;
}

export interface BlogPostWithContent extends BlogPost {
  content: NotionBlock[];
}

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_VERSION = "2022-06-28";

// Helper to make Notion API requests
async function notionFetch(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`https://api.notion.com/v1${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Notion API error: ${response.status}`);
  }

  return response.json();
}

// Helper to extract text from Notion rich text
function extractText(richText: Array<{ plain_text: string }> | undefined): string {
  if (!richText) return "";
  return richText.map((t) => t.plain_text).join("");
}

// Fetch all published blog posts
export async function getAllPosts(): Promise<BlogPost[]> {
  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    console.log("Notion not configured, using mock data");
    return getMockPosts();
  }

  try {
    const data = await notionFetch(`/databases/${NOTION_DATABASE_ID}/query`, {
      method: "POST",
      body: JSON.stringify({
        filter: {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
        sorts: [
          {
            property: "Date",
            direction: "descending",
          },
        ],
      }),
    });

    const posts: BlogPost[] = [];

    for (const page of data.results) {
      const properties = page.properties;

      // Extract title
      const title = extractText(properties.Title?.title) || "Untitled";

      // Extract slug
      const slug = extractText(properties.Slug?.rich_text) || page.id;

      // Extract description
      const description = extractText(properties.Description?.rich_text) || "";

      // Extract date
      const date = properties.Date?.date?.start || new Date().toISOString().split("T")[0];

      // Extract tags
      const tags = properties.Tags?.multi_select?.map((t: { name: string }) => t.name) || [];

      // Extract cover image
      let coverImage: string | null = null;
      if (properties.Cover?.files?.length > 0) {
        const file = properties.Cover.files[0];
        coverImage = file.file?.url || file.external?.url || null;
      }

      posts.push({
        id: page.id,
        slug,
        title,
        description,
        date,
        tags,
        coverImage,
        published: true,
      });
    }

    return posts.length > 0 ? posts : getMockPosts();
  } catch (error) {
    console.error("Error fetching posts from Notion:", error);
    return getMockPosts();
  }
}

// Fetch a single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPostWithContent | null> {
  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    const mockPosts = getMockPosts();
    const post = mockPosts.find((p) => p.slug === slug);
    return post ? { ...post, content: [] } : null;
  }

  try {
    const data = await notionFetch(`/databases/${NOTION_DATABASE_ID}/query`, {
      method: "POST",
      body: JSON.stringify({
        filter: {
          and: [
            {
              property: "Slug",
              rich_text: {
                equals: slug,
              },
            },
            {
              property: "Published",
              checkbox: {
                equals: true,
              },
            },
          ],
        },
      }),
    });

    if (data.results.length === 0) {
      // Try mock posts as fallback
      const mockPosts = getMockPosts();
      const post = mockPosts.find((p) => p.slug === slug);
      return post ? { ...post, content: [] } : null;
    }

    const page = data.results[0];
    const properties = page.properties;

    // Extract all properties
    const title = extractText(properties.Title?.title) || "Untitled";
    const description = extractText(properties.Description?.rich_text) || "";
    const date = properties.Date?.date?.start || new Date().toISOString().split("T")[0];
    const tags = properties.Tags?.multi_select?.map((t: { name: string }) => t.name) || [];

    let coverImage: string | null = null;
    if (properties.Cover?.files?.length > 0) {
      const file = properties.Cover.files[0];
      coverImage = file.file?.url || file.external?.url || null;
    }

    // Fetch page content
    const content = await getPageContent(page.id);

    return {
      id: page.id,
      slug,
      title,
      description,
      date,
      tags,
      coverImage,
      published: true,
      content,
    };
  } catch (error) {
    console.error("Error fetching post from Notion:", error);
    const mockPosts = getMockPosts();
    const post = mockPosts.find((p) => p.slug === slug);
    return post ? { ...post, content: [] } : null;
  }
}

// Fetch all blocks from a page
async function getPageContent(pageId: string): Promise<NotionBlock[]> {
  const blocks: NotionBlock[] = [];

  try {
    let cursor: string | undefined;

    do {
      const url = `/blocks/${pageId}/children?page_size=100${cursor ? `&start_cursor=${cursor}` : ""}`;
      console.log("Fetching blocks from:", url);
      const data = await notionFetch(url);
      console.log("Received blocks:", data.results?.length || 0);

      for (const block of data.results) {
        blocks.push(block as NotionBlock);
      }

      cursor = data.next_cursor || undefined;
    } while (cursor);
  } catch (error) {
    console.error("Error fetching page content:", error);
    // Return empty array - page will show placeholder
  }

  console.log("Total blocks fetched:", blocks.length);
  return blocks;
}

// Get all unique tags from posts
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagsSet = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
}

// Calculate reading time
export function calculateReadingTime(content: NotionBlock[]): number {
  if (content.length === 0) return 5;

  let wordCount = 0;

  content.forEach((block) => {
    const b = block as {
      type?: string;
      paragraph?: { rich_text: Array<{ plain_text: string }> };
      heading_1?: { rich_text: Array<{ plain_text: string }> };
      heading_2?: { rich_text: Array<{ plain_text: string }> };
      heading_3?: { rich_text: Array<{ plain_text: string }> };
      bulleted_list_item?: { rich_text: Array<{ plain_text: string }> };
      numbered_list_item?: { rich_text: Array<{ plain_text: string }> };
    };

    const getText = (rt: Array<{ plain_text: string }> | undefined) =>
      rt?.map((t) => t.plain_text).join("") || "";

    if (b.type === "paragraph") {
      wordCount += getText(b.paragraph?.rich_text).split(/\s+/).length;
    } else if (b.type === "heading_1") {
      wordCount += getText(b.heading_1?.rich_text).split(/\s+/).length;
    } else if (b.type === "heading_2") {
      wordCount += getText(b.heading_2?.rich_text).split(/\s+/).length;
    } else if (b.type === "heading_3") {
      wordCount += getText(b.heading_3?.rich_text).split(/\s+/).length;
    } else if (b.type === "bulleted_list_item") {
      wordCount += getText(b.bulleted_list_item?.rich_text).split(/\s+/).length;
    } else if (b.type === "numbered_list_item") {
      wordCount += getText(b.numbered_list_item?.rich_text).split(/\s+/).length;
    }
  });

  return Math.max(1, Math.ceil(wordCount / 200));
}

// Mock data for fallback
function getMockPosts(): BlogPost[] {
  return [
    {
      id: "1",
      slug: "building-ai-powered-uis-with-langchain",
      title: "Building AI-Powered UIs with LangChain and React",
      description:
        "Learn how to integrate LangChain agents into your React applications for intelligent, conversational user experiences.",
      date: "2024-01-15",
      tags: ["AI/LLM", "React", "LangChain"],
      coverImage: null,
      published: true,
    },
    {
      id: "2",
      slug: "nx-monorepo-best-practices",
      title: "NX Monorepo Best Practices for Enterprise Apps",
      description:
        "A comprehensive guide to structuring large-scale applications with NX, including CI/CD optimization and shared libraries.",
      date: "2024-01-10",
      tags: ["NX", "Architecture", "DevOps"],
      coverImage: null,
      published: true,
    },
    {
      id: "3",
      slug: "streaming-ux-patterns",
      title: "Streaming UX Patterns for LLM Applications",
      description:
        "Best practices for building responsive streaming interfaces that handle real-time AI responses gracefully.",
      date: "2024-01-05",
      tags: ["AI/LLM", "UX", "React"],
      coverImage: null,
      published: true,
    },
    {
      id: "4",
      slug: "accessible-react-components",
      title: "Building WCAG 2.1 Compliant React Components",
      description:
        "Practical techniques for creating accessible React components that work with screen readers and keyboard navigation.",
      date: "2023-12-20",
      tags: ["Accessibility", "React", "UX"],
      coverImage: null,
      published: true,
    },
  ];
}
