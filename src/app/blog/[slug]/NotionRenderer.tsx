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
        const color = annotations?.color;

        let className = "";
        if (bold) className += "font-bold ";
        if (italic) className += "italic ";
        if (strikethrough) className += "line-through ";
        if (underline) className += "underline ";
        if (code) className += "px-1.5 py-0.5 bg-slate-dark rounded font-mono text-accent text-sm ";
        if (color && color !== "default") className += `text-${color} `;

        const content = (
          <span key={index} className={className.trim()}>
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
              className="text-accent hover:underline"
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
    bookmark?: { url: string };
    embed?: { url: string };
  };

  switch (b.type) {
    case "paragraph":
      if (!b.paragraph?.rich_text || b.paragraph.rich_text.length === 0) {
        return <div className="h-4" />;
      }
      return (
        <p className="mb-4 text-text-secondary leading-relaxed">
          <RichText richText={b.paragraph.rich_text} />
        </p>
      );

    case "heading_1":
      return (
        <h2 className="text-3xl font-bold mt-8 mb-4 text-text-primary">
          <RichText richText={b.heading_1?.rich_text || []} />
        </h2>
      );

    case "heading_2":
      return (
        <h3 className="text-2xl font-bold mt-6 mb-3 text-text-primary">
          <RichText richText={b.heading_2?.rich_text || []} />
        </h3>
      );

    case "heading_3":
      return (
        <h4 className="text-xl font-bold mt-4 mb-2 text-text-primary">
          <RichText richText={b.heading_3?.rich_text || []} />
        </h4>
      );

    case "bulleted_list_item":
      return (
        <li className="ml-6 mb-2 text-text-secondary list-disc">
          <RichText richText={b.bulleted_list_item?.rich_text || []} />
        </li>
      );

    case "numbered_list_item":
      return (
        <li className="ml-6 mb-2 text-text-secondary list-decimal">
          <RichText richText={b.numbered_list_item?.rich_text || []} />
        </li>
      );

    case "to_do":
      return (
        <div className="flex items-start gap-2 mb-2 text-text-secondary">
          <input
            type="checkbox"
            checked={b.to_do?.checked}
            readOnly
            className="mt-1.5 accent-accent"
          />
          <span className={b.to_do?.checked ? "line-through opacity-60" : ""}>
            <RichText richText={b.to_do?.rich_text || []} />
          </span>
        </div>
      );

    case "toggle":
      return (
        <details className="mb-4 p-4 bg-slate-dark/50 rounded-xl border border-slate-medium">
          <summary className="cursor-pointer font-medium text-text-primary">
            <RichText richText={b.toggle?.rich_text || []} />
          </summary>
        </details>
      );

    case "code":
      return (
        <pre className="p-4 bg-slate-dark rounded-xl border border-slate-medium overflow-x-auto mb-4">
          <code className="text-sm font-mono text-accent">
            <RichText richText={b.code?.rich_text || []} />
          </code>
          {b.code?.language && (
            <div className="mt-2 text-xs text-text-muted uppercase">
              {b.code.language}
            </div>
          )}
        </pre>
      );

    case "quote":
      return (
        <blockquote className="border-l-4 border-accent pl-4 py-2 mb-4 italic text-text-secondary bg-accent/5 rounded-r-lg">
          <RichText richText={b.quote?.rich_text || []} />
        </blockquote>
      );

    case "callout":
      return (
        <div className="p-4 mb-4 bg-accent/10 border border-accent/20 rounded-xl flex gap-3">
          {b.callout?.icon?.type === "emoji" && (
            <span className="text-xl">{b.callout.icon.emoji}</span>
          )}
          <div className="text-text-secondary">
            <RichText richText={b.callout?.rich_text || []} />
          </div>
        </div>
      );

    case "divider":
      return (
        <hr className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-slate-medium to-transparent" />
      );

    case "image": {
      const imageUrl = b.image?.type === "file" 
        ? b.image.file?.url 
        : b.image?.external?.url;
      const caption = b.image?.caption?.map((c) => c.plain_text).join("") || null;

      if (!imageUrl) return null;

      return (
        <figure className="mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={caption || "Blog image"}
            className="w-full rounded-xl border border-slate-medium"
          />
          {caption && (
            <figcaption className="mt-2 text-center text-sm text-text-muted">
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
        <div className="mb-6 rounded-xl overflow-hidden border border-slate-medium">
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
          className="block p-4 mb-4 bg-slate-dark/50 rounded-xl border border-slate-medium hover:border-accent transition-colors"
        >
          <div className="text-accent text-sm truncate">
            {b.bookmark.url}
          </div>
        </a>
      );

    case "embed":
      if (!b.embed?.url) return null;
      return (
        <div className="mb-6 rounded-xl overflow-hidden border border-slate-medium">
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
