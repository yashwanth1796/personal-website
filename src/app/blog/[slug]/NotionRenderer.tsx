"use client";

import { Fragment } from "react";
import type { NotionBlock } from "@/lib/notion";

interface NotionRendererProps {
  blocks: NotionBlock[];
}

interface RichTextItem {
  plain_text: string;
  href?: string | null;
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    code?: boolean;
    color?: string;
  };
}

// Render rich text with formatting
function RichText({ richText }: { richText: RichTextItem[] }) {
  if (!richText || richText.length === 0) return null;
  
  return (
    <>
      {richText.map((text, index) => {
        const { annotations, plain_text, href } = text;
        const bold = annotations?.bold;
        const italic = annotations?.italic;
        const strikethrough = annotations?.strikethrough;
        const underline = annotations?.underline;
        const code = annotations?.code;

        let className = "";
        if (bold) className += "font-semibold text-text-primary ";
        if (italic) className += "italic ";
        if (strikethrough) className += "line-through ";
        if (underline) className += "underline ";
        if (code) className += "px-1.5 py-0.5 bg-accent/10 text-accent rounded font-mono text-[0.9em] ";

        const content = (
          <span key={index} className={className.trim() || undefined}>
            {plain_text}
          </span>
        );

        if (href) {
          return (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline underline-offset-2 decoration-accent/50"
            >
              {content}
            </a>
          );
        }

        return content;
      })}
    </>
  );
}

// Render a single block
function Block({ block }: { block: NotionBlock }) {
  const b = block as {
    type?: string;
    paragraph?: { rich_text: RichTextItem[] };
    heading_1?: { rich_text: RichTextItem[] };
    heading_2?: { rich_text: RichTextItem[] };
    heading_3?: { rich_text: RichTextItem[] };
    bulleted_list_item?: { rich_text: RichTextItem[] };
    numbered_list_item?: { rich_text: RichTextItem[] };
    to_do?: { rich_text: RichTextItem[]; checked: boolean };
    toggle?: { rich_text: RichTextItem[] };
    code?: { rich_text: RichTextItem[]; language?: string };
    quote?: { rich_text: RichTextItem[] };
    callout?: { rich_text: RichTextItem[]; icon?: { type: string; emoji?: string } };
    image?: {
      type: string;
      file?: { url: string };
      external?: { url: string };
      caption: RichTextItem[];
    };
    video?: {
      type: string;
      file?: { url: string };
      external?: { url: string };
    };
    bookmark?: { url: string; caption?: RichTextItem[] };
    embed?: { url: string };
  };

  switch (b.type) {
    case "paragraph":
      if (!b.paragraph?.rich_text || b.paragraph.rich_text.length === 0) {
        return <div className="h-6" />;
      }
      return (
        <p className="mb-6 text-text-secondary leading-[1.85] text-lg">
          <RichText richText={b.paragraph.rich_text} />
        </p>
      );

    case "heading_1":
      return (
        <h2 className="text-3xl sm:text-4xl font-bold mt-16 mb-6 text-text-primary tracking-tight">
          <RichText richText={b.heading_1?.rich_text || []} />
        </h2>
      );

    case "heading_2":
      return (
        <h3 className="text-2xl sm:text-3xl font-bold mt-12 mb-5 text-text-primary tracking-tight">
          <RichText richText={b.heading_2?.rich_text || []} />
        </h3>
      );

    case "heading_3":
      return (
        <h4 className="text-xl sm:text-2xl font-bold mt-10 mb-4 text-text-primary">
          <RichText richText={b.heading_3?.rich_text || []} />
        </h4>
      );

    case "bulleted_list_item":
      return (
        <li className="ml-6 mb-3 text-text-secondary text-lg leading-[1.8] list-disc marker:text-accent">
          <RichText richText={b.bulleted_list_item?.rich_text || []} />
        </li>
      );

    case "numbered_list_item":
      return (
        <li className="ml-6 mb-3 text-text-secondary text-lg leading-[1.8] list-decimal marker:text-accent marker:font-semibold">
          <RichText richText={b.numbered_list_item?.rich_text || []} />
        </li>
      );

    case "to_do":
      return (
        <div className="flex items-start gap-3 mb-3 text-text-secondary">
          <input
            type="checkbox"
            checked={b.to_do?.checked}
            readOnly
            className="mt-1.5 w-5 h-5 accent-accent rounded"
          />
          <span className={`text-lg leading-[1.8] ${b.to_do?.checked ? "line-through opacity-60" : ""}`}>
            <RichText richText={b.to_do?.rich_text || []} />
          </span>
        </div>
      );

    case "toggle":
      return (
        <details className="mb-6 group">
          <summary className="cursor-pointer font-semibold text-text-primary text-lg p-4 bg-slate-dark/50 rounded-xl border border-slate-medium hover:border-accent/50 transition-colors list-none flex items-center gap-2">
            <svg 
              className="w-5 h-5 text-accent transition-transform group-open:rotate-90" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <RichText richText={b.toggle?.rich_text || []} />
          </summary>
          <div className="mt-2 ml-7 pl-4 border-l-2 border-accent/30">
            {/* Toggle children would go here */}
          </div>
        </details>
      );

    case "code":
      return (
        <div className="mb-8 rounded-2xl overflow-hidden border border-slate-medium bg-[#0d1117]">
          {b.code?.language && (
            <div className="px-4 py-2 bg-slate-dark/80 border-b border-slate-medium flex items-center justify-between">
              <span className="text-xs font-mono text-accent uppercase tracking-wider">
                {b.code.language}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
            </div>
          )}
          <pre className="p-6 overflow-x-auto">
            <code className="text-sm font-mono text-gray-300 leading-relaxed">
              {b.code?.rich_text?.map((t) => t.plain_text).join("") || ""}
            </code>
          </pre>
        </div>
      );

    case "quote":
      return (
        <blockquote className="my-8 pl-6 py-4 border-l-4 border-accent bg-gradient-to-r from-accent/10 to-transparent rounded-r-xl">
          <p className="text-xl italic text-text-secondary leading-relaxed">
            <RichText richText={b.quote?.rich_text || []} />
          </p>
        </blockquote>
      );

    case "callout":
      return (
        <div className="my-8 p-6 bg-gradient-to-br from-accent/10 to-secondary/5 border border-accent/20 rounded-2xl flex gap-4">
          {b.callout?.icon?.type === "emoji" && (
            <span className="text-2xl flex-shrink-0">{b.callout.icon.emoji}</span>
          )}
          <div className="text-text-secondary text-lg leading-relaxed">
            <RichText richText={b.callout?.rich_text || []} />
          </div>
        </div>
      );

    case "divider":
      return (
        <div className="my-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-medium to-transparent" />
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-accent/60 rounded-full" />
            <span className="w-1.5 h-1.5 bg-accent/40 rounded-full" />
            <span className="w-1.5 h-1.5 bg-accent/20 rounded-full" />
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-medium to-transparent" />
        </div>
      );

    case "image": {
      const imageUrl = b.image?.type === "file" 
        ? b.image.file?.url 
        : b.image?.external?.url;
      const caption = b.image?.caption?.map((c) => c.plain_text).join("") || null;

      if (!imageUrl) return null;

      return (
        <figure className="my-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={caption || "Blog image"}
            className="w-full rounded-2xl border border-slate-medium shadow-xl shadow-black/20"
          />
          {caption && (
            <figcaption className="mt-4 text-center text-sm text-text-muted italic">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "video": {
      const videoUrl = b.video?.type === "file"
        ? b.video.file?.url
        : b.video?.external?.url;
      
      if (!videoUrl) return null;

      return (
        <div className="my-10 rounded-2xl overflow-hidden border border-slate-medium shadow-xl shadow-black/20">
          <video src={videoUrl} controls className="w-full" />
        </div>
      );
    }

    case "bookmark":
      if (!b.bookmark?.url) return null;
      return (
        <a
          href={b.bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="my-6 block p-5 bg-slate-dark/50 rounded-xl border border-slate-medium hover:border-accent/50 hover:bg-slate-dark/80 transition-all group"
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
            <span className="text-accent text-sm truncate group-hover:underline">
              {b.bookmark.url}
            </span>
          </div>
        </a>
      );

    case "embed":
      if (!b.embed?.url) return null;
      
      // Handle YouTube embeds
      const youtubeMatch = b.embed.url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\s]+)/);
      if (youtubeMatch) {
        return (
          <div className="my-10 rounded-2xl overflow-hidden border border-slate-medium shadow-xl shadow-black/20 aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeMatch[1]}`}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        );
      }

      return (
        <div className="my-10 rounded-2xl overflow-hidden border border-slate-medium">
          <iframe
            src={b.embed.url}
            className="w-full h-96"
            allowFullScreen
          />
        </div>
      );

    default:
      return null;
  }
}

export default function NotionRenderer({ blocks }: NotionRendererProps) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="text-center py-12 text-text-muted">
        <p>Content coming soon...</p>
      </div>
    );
  }

  return (
    <div className="notion-content">
      {blocks.map((block) => (
        <Fragment key={block.id}>
          <Block block={block} />
        </Fragment>
      ))}
    </div>
  );
}
