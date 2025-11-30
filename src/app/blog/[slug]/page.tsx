import { getPostBySlug, getAllPosts, calculateReadingTime } from "@/lib/notion";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import NotionRenderer from "./NotionRenderer";
import ShareButtons from "./ShareButtons";

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
    <main className="min-h-screen bg-midnight">
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
        
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <div className="relative max-w-4xl mx-auto px-6">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors mb-12 group"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            <span className="text-sm font-medium">Back to all articles</span>
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider rounded-full border border-accent/20 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-[1.1] tracking-tight bg-gradient-to-br from-text-primary via-text-primary to-text-secondary bg-clip-text">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-6 text-text-muted mb-8">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center text-sm font-bold text-midnight">
                YV
              </div>
              <div>
                <p className="text-text-primary font-medium text-sm">Yashwanth Kumar</p>
                <p className="text-xs">Senior Software Engineer</p>
              </div>
            </div>

            <span className="w-px h-8 bg-slate-medium hidden sm:block" />

            {/* Date */}
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <span className="text-sm">{formattedDate}</span>
            </div>

            {/* Reading time */}
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">{readingTime} min read</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xl text-text-secondary leading-relaxed max-w-3xl font-light">
            {post.description}
          </p>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        {/* Decorative line */}
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        </div>

        {/* Content */}
        <article className="prose prose-invert prose-lg max-w-none
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-text-primary
          prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4 prose-h3:text-text-primary
          prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-3
          prose-p:text-text-secondary prose-p:leading-[1.8] prose-p:mb-6
          prose-a:text-accent prose-a:no-underline hover:prose-a:underline
          prose-strong:text-text-primary prose-strong:font-semibold
          prose-code:text-accent prose-code:bg-slate-dark prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-slate-dark prose-pre:border prose-pre:border-slate-medium prose-pre:rounded-xl
          prose-blockquote:border-l-accent prose-blockquote:bg-accent/5 prose-blockquote:rounded-r-xl prose-blockquote:py-1
          prose-ul:text-text-secondary prose-ol:text-text-secondary
          prose-li:marker:text-accent
          prose-img:rounded-xl prose-img:border prose-img:border-slate-medium
        ">
          <NotionRenderer blocks={post.content} />
        </article>

        {/* Share Section */}
        <div className="mt-20 pt-12 border-t border-slate-medium/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-sm text-text-muted uppercase tracking-wider mb-2">Share this article</p>
              <ShareButtons title={post.title} slug={slug} />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-slate-dark/50 text-text-muted text-xs font-medium rounded-lg border border-slate-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Author Card */}
        <div className="mt-12 p-8 bg-gradient-to-br from-slate-dark/80 to-slate-dark/40 rounded-3xl border border-slate-medium backdrop-blur-sm relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full blur-2xl" />
          
          <div className="relative flex flex-col sm:flex-row items-start gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-accent via-secondary to-accent rounded-2xl flex items-center justify-center text-3xl font-bold text-midnight flex-shrink-0 shadow-lg shadow-accent/20">
              YV
            </div>
            <div className="flex-1">
              <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-1">Written by</p>
              <h3 className="text-2xl font-bold mb-1">Yashwanth Kumar Vandanapu</h3>
              <p className="text-accent mb-4">Senior Software Engineer</p>
              <p className="text-text-secondary leading-relaxed mb-6">
                Building enterprise-scale platforms with React, Next.js, and AI/LLM integrations. 
                Passionate about accessible design, developer experience, and pushing the boundaries 
                of what&apos;s possible on the web.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-midnight font-semibold rounded-xl hover:bg-accent/90 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  Get in touch
                </Link>
                <a
                  href="https://linkedin.com/in/Yashwanth-Vandanapu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-medium/50 text-text-primary font-semibold rounded-xl hover:bg-slate-medium transition-colors border border-slate-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="https://github.com/yashwanth1796"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-medium/50 text-text-primary font-semibold rounded-xl hover:bg-slate-medium transition-colors border border-slate-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* More Articles CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-slate-dark to-slate-dark/80 border border-slate-medium rounded-2xl text-text-primary font-semibold hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
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
            <span>Explore More Articles</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
