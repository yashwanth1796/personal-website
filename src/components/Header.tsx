"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-obsidian/90 backdrop-blur-md border-b border-slate-dark"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight hover:scale-105 transition-transform"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            <span className="text-accent">Y</span>K<span className="text-secondary">V</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="nav-underline text-text-secondary hover:text-accent transition-colors text-sm font-medium tracking-wide uppercase py-1"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="btn-ripple px-5 py-2.5 bg-accent text-midnight font-semibold rounded-lg hover:bg-accent-light transition-all hover:shadow-lg hover:shadow-accent/20 hover:scale-105"
              >
                Hire Me
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-90" : ""}`}
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pb-4 border-t border-slate-dark pt-4">
            <ul className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <li 
                  key={item.href}
                  className={`transition-all duration-300 ${
                    isMobileMenuOpen 
                      ? "opacity-100 translate-x-0" 
                      : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms" }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-text-secondary hover:text-accent transition-colors text-sm font-medium tracking-wide uppercase block py-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li
                className={`transition-all duration-300 ${
                  isMobileMenuOpen 
                    ? "opacity-100 translate-x-0" 
                    : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${navItems.length * 50}ms` : "0ms" }}
              >
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-block px-5 py-2.5 bg-accent text-midnight font-semibold rounded-lg hover:bg-accent-light transition-all"
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
