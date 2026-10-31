const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <header className="site-header">
      <nav aria-label="Main navigation" className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between gap-6">
        {/* Native navigation keeps the homepage free of client components and route prefetches. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" className="wordmark" aria-label="Yashwanth Vandanapu home">yv<span>.</span></a>
        <ul className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="nav-underline text-sm text-text-secondary hover:text-accent">{item.label}</a>
            </li>
          ))}
        </ul>
        <details className="mobile-menu md:hidden">
          <summary className="cursor-pointer text-sm font-medium py-2">Menu</summary>
          <ul className="mobile-menu-links">
            {navItems.map((item) => (
              <li key={item.href}><a href={item.href}>{item.label}</a></li>
            ))}
          </ul>
        </details>
      </nav>
    </header>
  );
}
