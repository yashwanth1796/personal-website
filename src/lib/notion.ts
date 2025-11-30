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

// Mock data for blog posts
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

// Fetch all published blog posts
export async function getAllPosts(): Promise<BlogPost[]> {
  // For production with Notion integration, implement the API calls here
  // Currently returning mock data for preview
  return getMockPosts();
}

// Fetch a single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPostWithContent | null> {
  const posts = await getAllPosts();
  const post = posts.find((p) => p.slug === slug);
  
  if (!post) return null;
  
  // Return post with empty content (placeholder)
  // When Notion is configured, fetch actual content here
  return { ...post, content: [] };
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
  if (content.length === 0) return 5; // Default reading time for placeholder
  
  let wordCount = 0;

  content.forEach((block) => {
    const b = block as { 
      type?: string; 
      paragraph?: { rich_text: Array<{ plain_text: string }> }; 
      heading_1?: { rich_text: Array<{ plain_text: string }> }; 
      heading_2?: { rich_text: Array<{ plain_text: string }> }; 
      heading_3?: { rich_text: Array<{ plain_text: string }> }; 
      bulleted_list_item?: { rich_text: Array<{ plain_text: string }> }; 
      numbered_list_item?: { rich_text: Array<{ plain_text: string }> } 
    };
    
    if (b.type === "paragraph" && b.paragraph?.rich_text) {
      wordCount += b.paragraph.rich_text.map((t) => t.plain_text).join("").split(/\s+/).length;
    } else if (b.type === "heading_1" && b.heading_1?.rich_text) {
      wordCount += b.heading_1.rich_text.map((t) => t.plain_text).join("").split(/\s+/).length;
    } else if (b.type === "heading_2" && b.heading_2?.rich_text) {
      wordCount += b.heading_2.rich_text.map((t) => t.plain_text).join("").split(/\s+/).length;
    } else if (b.type === "heading_3" && b.heading_3?.rich_text) {
      wordCount += b.heading_3.rich_text.map((t) => t.plain_text).join("").split(/\s+/).length;
    } else if (b.type === "bulleted_list_item" && b.bulleted_list_item?.rich_text) {
      wordCount += b.bulleted_list_item.rich_text.map((t) => t.plain_text).join("").split(/\s+/).length;
    } else if (b.type === "numbered_list_item" && b.numbered_list_item?.rich_text) {
      wordCount += b.numbered_list_item.rich_text.map((t) => t.plain_text).join("").split(/\s+/).length;
    }
  });

  return Math.max(1, Math.ceil(wordCount / 200));
}
