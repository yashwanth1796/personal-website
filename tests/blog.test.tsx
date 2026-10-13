import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import NotionRenderer from "../src/app/blog/[slug]/NotionRenderer";
import { calculateReadingTime, getAllPosts, getPostBySlug } from "../src/lib/notion";
import { serializeJsonLd } from "../src/lib/serialization";
import { GET } from "../src/app/feed.xml/route";

const richText = (plain_text: string) => [{ plain_text }];
const page = (id: string, slug = id) => ({
  id, created_time: "2026-10-12T00:00:00Z",
  properties: {
    Title: { title: richText("React & Next <guide> ]]> </script>") },
    Slug: { rich_text: richText(slug) },
    Description: { rich_text: richText("A < B & C ]]> D") },
    Tags: { multi_select: [{ name: "React & Next.js" }] },
  },
});

test("CMS pagination, nested content, failures, and RSS", async (t) => {
  const originalFetch = globalThis.fetch;
  const key = process.env.NOTION_API_KEY;
  const database = process.env.NOTION_DATABASE_ID;
  t.after(() => {
    globalThis.fetch = originalFetch;
    if (key === undefined) delete process.env.NOTION_API_KEY; else process.env.NOTION_API_KEY = key;
    if (database === undefined) delete process.env.NOTION_DATABASE_ID; else process.env.NOTION_DATABASE_ID = database;
  });

  await t.test("unconfigured blog contains no sample posts", async () => {
    delete process.env.NOTION_API_KEY;
    delete process.env.NOTION_DATABASE_ID;
    globalThis.fetch = async () => { throw new Error("Unexpected API call"); };
    assert.deepEqual(await getAllPosts(), []);
    assert.equal(await getPostBySlug("building-ai-powered-uis-with-langchain"), null);
  });

  process.env.NOTION_API_KEY = "test-token";
  process.env.NOTION_DATABASE_ID = "test-database";
  const cursors: (string | undefined)[] = [];
  globalThis.fetch = async (input, options) => {
    const url = new URL(String(input));
    if (url.pathname.endsWith("/query")) {
      const body = JSON.parse(options?.body as string);
      cursors.push(body.start_cursor);
      return Response.json(body.start_cursor
        ? { results: [page("second")], next_cursor: null }
        : { results: [page("first", "spaces & symbols")], next_cursor: "next-page" });
    }
    if (url.pathname.includes("/blocks/first/")) {
      return Response.json(url.searchParams.has("start_cursor")
        ? { results: [{ id: "last", type: "paragraph", paragraph: { rich_text: richText("Last paragraph") } }], next_cursor: null }
        : { results: [{ id: "toggle", type: "toggle", has_children: true, toggle: { rich_text: richText("Details") } }], next_cursor: "more-blocks" });
    }
    if (url.pathname.includes("/blocks/toggle/")) {
      return Response.json({ results: [{ id: "nested", type: "paragraph", paragraph: { rich_text: richText("Nested text") } }], next_cursor: null });
    }
    throw new Error(`Unexpected URL: ${url}`);
  };

  await t.test("all listing and content pages are fetched, including toggle children", async () => {
    const posts = await getAllPosts();
    assert.deepEqual(posts.map((post) => post.id), ["first", "second"]);
    assert.deepEqual(cursors, [undefined, "next-page"]);
    const post = await getPostBySlug("spaces & symbols");
    assert.equal(post?.content.length, 2);
    assert.equal(post?.content[0].children?.[0].id, "nested");
    assert.equal(post?.date, "2026-10-12");
    assert.equal(await getPostBySlug("missing"), null);
  });

  await t.test("RSS safely encodes XML metacharacters, CDATA terminators, and slugs", async () => {
    const response = await GET();
    const xml = await response.text();
    assert.match(xml, /React &amp; Next &lt;guide&gt; \]\]&gt; &lt;\/script&gt;/);
    assert.match(xml, /<category>React &amp; Next.js<\/category>/);
    assert.match(xml, /\/blog\/spaces%20%26%20symbols/);
    assert.ok(!xml.includes("<![CDATA["));
  });

  await t.test("empty database stays empty", async () => {
    globalThis.fetch = async () => Response.json({ results: [], next_cursor: null });
    assert.deepEqual(await getAllPosts(), []);
  });

  await t.test("API failures propagate instead of becoming sample posts or partial content", async () => {
    globalThis.fetch = async () => new Response("Unavailable", { status: 503 });
    await assert.rejects(getAllPosts(), /Notion API error: 503/);
    globalThis.fetch = async (input) => String(input).includes("/query")
      ? Response.json({ results: [page("first")], next_cursor: null })
      : new Response("Unavailable", { status: 503 });
    await assert.rejects(getPostBySlug("first"), /Notion API error: 503/);
  });
});

test("structured data cannot close its script tag and retains original text", () => {
  const data = { title: '</script><script>alert("x")</script>' };
  const output = serializeJsonLd(data);
  assert.ok(!output.includes("<"));
  assert.deepEqual(JSON.parse(output), data);
});

test("renderer groups lists, preserves nested toggle content, and rejects unsafe links", () => {
  const html = renderToStaticMarkup(<NotionRenderer blocks={[
    { id: "1", type: "numbered_list_item", numbered_list_item: { rich_text: richText("First") } },
    { id: "2", type: "numbered_list_item", numbered_list_item: { rich_text: richText("Second") }, children: [
      { id: "nested-list", type: "bulleted_list_item", bulleted_list_item: { rich_text: richText("Nested item") } },
    ] },
    { id: "3", type: "toggle", toggle: { rich_text: richText("Expand") }, children: [
      { id: "child", type: "paragraph", paragraph: { rich_text: richText("Child content") } },
    ] },
    { id: "4", type: "paragraph", paragraph: { rich_text: [{ plain_text: "Unsafe", href: "javascript:alert(1)" }] } },
    { id: "5", type: "embed", embed: { url: "javascript:alert(1)" } },
    { id: "6", type: "video", video: { type: "external", external: { url: "https://youtu.be/dQw4w9WgXcQ" } } },
  ]} />);
  assert.equal((html.match(/<ol/g) || []).length, 1);
  assert.match(html, /<ul.*Nested item.*<\/ul>/);
  assert.match(html, /<details.*Child content.*<\/details>/);
  assert.ok(!html.includes("javascript:"));
  assert.match(html, /youtube-nocookie.com\/embed\/dQw4w9WgXcQ/);
});

test("reading time counts nested content and ignores empty text", () => {
  assert.equal(calculateReadingTime([]), 1);
  assert.equal(calculateReadingTime([
    { id: "toggle", type: "toggle", toggle: { rich_text: [] }, children: [
      { id: "paragraph", type: "paragraph", paragraph: { rich_text: richText(Array(401).fill("word").join(" ")) } },
    ] },
  ]), 3);
});
