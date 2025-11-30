import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/static/"],
      },
    ],
    sitemap: "https://yashwanth-vandanapu.dev/sitemap.xml",
    host: "https://yashwanth-vandanapu.dev",
  };
}

