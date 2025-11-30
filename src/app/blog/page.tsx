import { getAllPosts, getAllTags } from "@/lib/notion";
import type { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog | Yashwanth Kumar Vandanapu",
  description:
    "Technical articles on React, AI/LLM integrations, front-end architecture, and enterprise software development.",
};

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()]);

  return <BlogPageClient posts={posts} tags={tags} />;
}

