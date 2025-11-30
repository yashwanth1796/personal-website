import { getPostBySlug, getAllPosts, calculateReadingTime, type NotionBlock } from "@/lib/notion";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import NotionRenderer from "./NotionRenderer";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Yashwanth Kumar Vandanapu",
    };
  }

  return {
    title: `${post.title} | Yashwanth Kumar Vandanapu`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const revalidate = 3600;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-midnight pt-24 pb-16">
      {/* Back link */}
      <div className="max-w-3xl mx-auto px-6 mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <header className="max-w-3xl mx-auto px-6 mb-12">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full border border-accent/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-text-secondary">
          <span>{formattedDate}</span>
          <span className="w-1 h-1 bg-text-muted rounded-full" />
          <span>{readingTime} min read</span>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-lg mt-6 leading-relaxed">
          {post.description}
        </p>
      </header>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-6 mb-12">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-medium to-transparent" />
      </div>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-6 prose prose-invert prose-lg">
        <NotionRenderer blocks={post.content} />
        
        {/* Placeholder content if no Notion blocks */}
        {post.content.length === 0 && (
          <div className="text-text-secondary space-y-6">
            <p>
              This article is coming soon! Connect your Notion database to see the full content.
            </p>
            <div className="p-6 bg-slate-dark/50 rounded-xl border border-slate-medium">
              <h3 className="text-xl font-bold mb-2 text-text-primary">
                How to Connect Notion
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>
                  Create a Notion database with properties: Title, Slug, Description, Date, Tags, Published, Cover
                </li>
                <li>
                  Create an integration at{" "}
                  <a
                    href="https://www.notion.so/my-integrations"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    notion.so/my-integrations
                  </a>
                </li>
                <li>Share your database with the integration</li>
                <li>
                  Add <code className="px-1 py-0.5 bg-midnight rounded text-accent">NOTION_API_KEY</code> and{" "}
                  <code className="px-1 py-0.5 bg-midnight rounded text-accent">NOTION_DATABASE_ID</code> to your environment
                </li>
              </ol>
            </div>
          </div>
        )}
      </article>

      {/* Footer */}
      <footer className="max-w-3xl mx-auto px-6 mt-16">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-medium to-transparent mb-12" />

        {/* Author Card */}
        <div className="p-6 bg-slate-dark/30 rounded-2xl border border-slate-medium">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-xl flex items-center justify-center text-2xl font-bold text-midnight flex-shrink-0">
              YV
            </div>
            <div>
              <h3 className="text-xl font-bold">Yashwanth Kumar Vandanapu</h3>
              <p className="text-accent text-sm mb-2">
                Senior Software Engineer
              </p>
              <p className="text-text-secondary text-sm">
                Building enterprise-scale platforms with React, Next.js, and
                AI/LLM integrations. Passionate about accessible design and
                developer experience.
              </p>
              <div className="flex gap-3 mt-4">
                <Link
                  href="/#contact"
                  className="text-sm text-accent hover:underline"
                >
                  Contact
                </Link>
                <a
                  href="https://linkedin.com/in/Yashwanth-Vandanapu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent hover:underline"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-dark border border-slate-medium rounded-xl text-text-primary font-semibold hover:border-accent hover:text-accent transition-all"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            More Articles
          </Link>
        </div>
      </footer>
    </main>
  );
}

