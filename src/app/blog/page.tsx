import { serializeJsonLd } from "@/lib/serialization";
import { getAllPosts } from "@/lib/notion";
import type { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

const siteUrl = "https://yashwanth-vandanapu.dev";

export const metadata: Metadata = {
  title: "Blog - Technical Articles on React, AI & Web Development",
  description:
    "Explore in-depth technical articles on React, Next.js, AI/LLM integrations, front-end architecture, web accessibility, and enterprise software development by Yashwanth Kumar Vandanapu.",
  keywords: [
    "React tutorials",
    "Next.js guide",
    "AI integration",
    "LLM development",
    "Web accessibility",
    "Frontend architecture",
    "TypeScript tips",
    "Software engineering blog",
  ],
  openGraph: {
    title: "Blog | Yashwanth Kumar Vandanapu",
    description:
      "Technical articles on React, AI/LLM integrations, front-end architecture, and enterprise software development.",
    type: "website",
    url: `${siteUrl}/blog`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Yashwanth Kumar Vandanapu",
    description:
      "Technical articles on React, AI/LLM integrations, front-end architecture, and enterprise software development.",
  },
  alternates: {
    canonical: `${siteUrl}/blog`,
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};


export default async function BlogPage() {
  const posts = await getAllPosts();
  const tags = [...new Set(posts.flatMap((post) => post.tags))].sort();

  // JSON-LD for Blog listing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Yashwanth Kumar Vandanapu's Blog",
    description:
      "Technical articles on React, AI/LLM integrations, front-end architecture, and enterprise software development.",
    url: `${siteUrl}/blog`,
    author: {
      "@type": "Person",
      name: "Yashwanth Kumar Vandanapu",
      url: siteUrl,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: `${siteUrl}/blog/${encodeURIComponent(post.slug)}`,
      author: {
        "@type": "Person",
        name: "Yashwanth Kumar Vandanapu",
      },
      keywords: post.tags.join(", "),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <BlogPageClient posts={posts} tags={tags} />
    </>
  );
}
