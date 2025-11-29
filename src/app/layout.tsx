import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yashwanth Kumar Vandanapu | Senior Software Engineer",
  description: "Senior Software Engineer with 7+ years of experience in React, Next.js, TypeScript, and AI/LLM integrations. Building enterprise-scale platforms and workflow automation.",
  keywords: ["Software Engineer", "React", "Next.js", "TypeScript", "LLM", "AI", "Full Stack Developer", "Frontend Developer"],
  authors: [{ name: "Yashwanth Kumar Vandanapu" }],
  openGraph: {
    title: "Yashwanth Kumar Vandanapu | Senior Software Engineer",
    description: "Senior Software Engineer specializing in React, AI/LLM integrations, and enterprise-scale platforms.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=JetBrains+Mono:wght@400;500;600&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
