import CareerMap from "@/components/CareerMap";
import ClassicView from "@/components/ClassicView";
import { viewBootScript } from "@/components/ViewToggle";
import { getAllPosts } from "@/lib/notion";

export const revalidate = 3600;

export default async function Home() {
  // The Writing link appears once a real post is published. If Notion is unreachable,
  // keep the link: the blog page has its own error and retry handling.
  const posts = await getAllPosts().catch(() => null);
  const showWriting = posts === null || posts.length > 0;
  return (
    <main id="main-content" tabIndex={-1}>
      <script dangerouslySetInnerHTML={{ __html: viewBootScript }} />
      <CareerMap showWriting={showWriting} />
      <ClassicView showWriting={showWriting} />
      <noscript>
        <style>{`.metro { display: none !important; } .classic { display: block !important; } .view-toggle { display: none; }`}</style>
      </noscript>
    </main>
  );
}
