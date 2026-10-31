import { serializeJsonLd } from "@/lib/serialization";
import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://yashwanth-vandanapu.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Yashwanth Kumar Vandanapu | Senior Software Engineer",
    template: "%s | Yashwanth Kumar Vandanapu",
  },
  description:
    "Senior Software Engineer with 10 years of experience building enterprise-scale React applications, AI/LLM integrations, and accessible web platforms. Expert in Next.js, TypeScript, and workflow automation.",
  keywords: [
    "Yashwanth Kumar Vandanapu",
    "Senior Software Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Expert",
    "Full Stack Developer",
    "Frontend Developer",
    "AI Engineer",
    "LLM Integration",
    "LangChain Developer",
    "Enterprise Applications",
    "Web Accessibility",
    "WCAG Compliance",
    "Toronto Developer",
    "Canada Software Engineer",
  ],
  authors: [{ name: "Yashwanth Kumar Vandanapu", url: siteUrl }],
  creator: "Yashwanth Kumar Vandanapu",
  publisher: "Yashwanth Kumar Vandanapu",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Yashwanth Kumar Vandanapu",
    title: "Yashwanth Kumar Vandanapu | Senior Software Engineer",
    description:
      "Senior Software Engineer specializing in React, Next.js, AI/LLM integrations, and enterprise-scale platforms. 10 years of experience building accessible, high-performance web applications.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Yashwanth Kumar Vandanapu - Senior Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yashwanth Kumar Vandanapu | Senior Software Engineer",
    description:
      "Senior Software Engineer specializing in React, Next.js, AI/LLM integrations, and enterprise-scale platforms.",
    images: ["/opengraph-image"],
    creator: "@yashwanth_v",
  },
  alternates: {
    canonical: siteUrl,
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  category: "technology",
  verification: {
    // Add your verification codes here when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Yashwanth Kumar Vandanapu",
      url: siteUrl,
      image: `${siteUrl}/opengraph-image`,
      jobTitle: "Senior Software Engineer",
      worksFor: {
        "@type": "Organization",
        name: "SurveyMonkey",
      },
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "Conestoga College",
        },
        {
          "@type": "CollegeOrUniversity",
          name: "JNTU Kakinada",
        },
      ],
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "AI/LLM Integration",
        "LangChain",
        "Web Accessibility",
        "Enterprise Software Development",
        "Frontend Development",
        "Full Stack Development",
      ],
      sameAs: [
        "https://linkedin.com/in/Yashwanth-Vandanapu",
        "https://github.com/yashwanth1796",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Yashwanth Kumar Vandanapu",
      description: "Personal portfolio and blog of Yashwanth Kumar Vandanapu, Senior Software Engineer",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },

    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: "Yashwanth Kumar Vandanapu - Portfolio",
      mainEntity: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
