/* eslint-disable @next/next/no-html-link-for-pages -- Native navigation avoids Link hydration and route prefetching on the static homepage. */
import SectionNavigation from "./SectionNavigation";

export default function Header() {
  return (
    <header className="profile-rail">
      <div className="profile-top"><a href="#main-content" className="profile-monogram" aria-label="Back to introduction">yv<span>.</span></a></div>
      <h1>Yashwanth <br />Kumar <br /><span>Vandanapu.</span></h1>
      <p className="profile-role">Senior Software Engineer</p>
      <SectionNavigation />
      <div className="profile-bottom"><a className="profile-resume" href="/Resume - Frontend.pdf" download>Download resume <span aria-hidden="true">↓</span></a><div className="profile-social"><a href="https://github.com/yashwanth1796" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://linkedin.com/in/Yashwanth-Vandanapu" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="/blog">Writing ↗</a></div><p>Based in Toronto, Canada</p></div>
    </header>
  );
}
