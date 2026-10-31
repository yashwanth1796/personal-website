"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Selected work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "About & approach", href: "#about" },
  { label: "Capabilities", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function SectionNavigation() {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const visible = new Set<string>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(`#${entry.target.id}`);
        else visible.delete(`#${entry.target.id}`);
      }
      setActive(links.find(link => visible.has(link.href))?.href ?? "");
    }, { rootMargin: "-10% 0px -35% 0px" });

    for (const link of links) {
      const section = document.querySelector(link.href);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Main navigation" className="profile-navigation">
      <ol>{links.map((link, i) => (
        <li key={link.href}>
          <a href={link.href} aria-current={active === link.href ? "location" : undefined}>
            <span>0{i + 1}</span>{link.label}<span aria-hidden="true">↗</span>
          </a>
        </li>
      ))}</ol>
    </nav>
  );
}
