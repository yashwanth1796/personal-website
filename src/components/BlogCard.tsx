"use client";

import Link from "next/link";
import type { BlogPost } from "@/lib/notion";

interface BlogCardProps {
  post: BlogPost;
  index: number;
  isVisible: boolean;
}

export default function BlogCard({ post, index, isVisible }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Generate gradient based on tags
  const getGradient = () => {
    const tagGradients: Record<string, string> = {
      "AI/LLM": "from-accent to-teal-400",
      React: "from-blue-500 to-cyan-400",
      LangChain: "from-secondary to-pink-400",
      NX: "from-amber-500 to-orange-400",
      Architecture: "from-emerald-500 to-green-400",
      Accessibility: "from-rose-500 to-red-400",
      UX: "from-violet-500 to-purple-400",
    };

    for (const tag of post.tags) {
      if (tagGradients[tag]) {
        return tagGradients[tag];
      }
    }
    return "from-accent to-secondary";
  };

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block p-6 rounded-2xl border border-slate-medium bg-slate-dark/30 hover:border-slate-light transition-all card-tilt ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
        transitionDuration: "600ms",
      }}
    >
      {/* Gradient accent */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${getGradient()} opacity-60 group-hover:opacity-100 transition-opacity`}
      />

      {/* Cover image placeholder or gradient */}
      <div
        className={`w-full h-32 rounded-xl mb-4 bg-gradient-to-br ${getGradient()} opacity-20 group-hover:opacity-30 transition-opacity flex items-center justify-center`}
      >
        <svg
          className="w-12 h-12 text-white/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {post.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full border border-accent/20"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors line-clamp-2">
        {post.title}
      </h3>

      {/* Description */}
      <p className="text-text-secondary text-sm mb-4 line-clamp-2">
        {post.description}
      </p>

      {/* Meta */}
      <div className="flex items-center justify-between text-text-muted text-xs">
        <span>{formattedDate}</span>
        <span className="flex items-center gap-1 group-hover:text-accent transition-colors">
          Read more
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
        </span>
      </div>
    </Link>
  );
}

