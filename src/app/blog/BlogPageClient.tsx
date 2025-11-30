"use client";

import { useState } from "react";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { BlogPost } from "@/lib/notion";

interface BlogPageClientProps {
  posts: BlogPost[];
  tags: string[];
}

export default function BlogPageClient({ posts, tags }: BlogPageClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.1 });

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts;

  return (
    <main className="min-h-screen bg-midnight pt-24 pb-16">
      {/* Header */}
      <header className="max-w-4xl mx-auto px-6 mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors mb-8"
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
          Back to Home
        </Link>

        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-700 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-accent font-mono text-sm tracking-wider mb-4 uppercase">
            Blog
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Thoughts & <span className="text-gradient">Insights</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl">
            Technical articles on React, AI/LLM integrations, front-end
            architecture, and lessons learned building enterprise software.
          </p>
        </div>
      </header>

      {/* Tags Filter */}
      <section className="max-w-4xl mx-auto px-6 mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedTag === null
                ? "bg-accent text-midnight"
                : "bg-slate-dark border border-slate-medium text-text-secondary hover:border-accent hover:text-accent"
            }`}
          >
            All Posts
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedTag === tag
                  ? "bg-accent text-midnight"
                  : "bg-slate-dark border border-slate-medium text-text-secondary hover:border-accent hover:text-accent"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Posts Grid */}
      <section
        ref={gridRef as React.RefObject<HTMLElement>}
        className="max-w-4xl mx-auto px-6"
      >
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredPosts.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                index={index}
                isVisible={gridVisible}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-text-muted text-lg">
              No posts found with the selected tag.
            </p>
            <button
              onClick={() => setSelectedTag(null)}
              className="mt-4 text-accent hover:underline"
            >
              Clear filter
            </button>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 mt-16">
        <div className="p-8 bg-gradient-to-br from-accent/5 to-secondary/5 rounded-2xl border border-accent/20 text-center">
          <h3 className="text-2xl font-bold mb-2">Want to Connect?</h3>
          <p className="text-text-secondary mb-6">
            Have questions about these topics or want to discuss a project?
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-midnight font-semibold rounded-xl hover:bg-accent-light transition-all"
          >
            Get in Touch
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
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}

