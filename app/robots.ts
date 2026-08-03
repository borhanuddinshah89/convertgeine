import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://convertgeine.com/sitemap.xml",
    host: "https://convertgeine.com",
  };
}
