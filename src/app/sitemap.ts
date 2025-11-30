import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/notion";

const siteUrl = "https://yashwanth-vandanapu.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all blog posts
  const posts = await getAllPosts();

  const blogPosts = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...blogPosts,
  ];
}

