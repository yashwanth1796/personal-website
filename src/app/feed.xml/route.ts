import { escapeXml } from "@/lib/serialization";
import { getAllPosts } from "@/lib/notion";

const siteUrl = "https://yashwanth-vandanapu.dev";

export const dynamic = "force-static";

export async function GET() {
  const posts = await getAllPosts();

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Yashwanth Kumar Vandanapu - Blog</title>
    <link>${siteUrl}</link>
    <description>Insights on React, Next.js, AI/LLM integrations, and enterprise software development by Yashwanth Kumar Vandanapu.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>yashwanth.vandanapu@gmail.com (Yashwanth Kumar Vandanapu)</managingEditor>
    <webMaster>yashwanth.vandanapu@gmail.com (Yashwanth Kumar Vandanapu)</webMaster>
    <image>
      <url>${siteUrl}/icon-192.png</url>
      <title>Yashwanth Kumar Vandanapu - Blog</title>
      <link>${siteUrl}</link>
    </image>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(`${siteUrl}/blog/${encodeURIComponent(post.slug)}`)}</link>
      <guid isPermaLink="true">${escapeXml(`${siteUrl}/blog/${encodeURIComponent(post.slug)}`)}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
      <author>yashwanth.vandanapu@gmail.com (Yashwanth Kumar Vandanapu)</author>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

