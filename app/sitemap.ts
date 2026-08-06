import { MetadataRoute } from "next";
import { blogArticles } from "@/data/blogArticles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.convertgeine.com";

  const routes = [
    "",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",

    "/compress-pdf",
    "/merge-pdf",
    "/split-pdf",
    "/rotate-pdf",
    "/pdf-to-jpg",
    "/jpg-to-pdf",
    "/pdf-editor",

    "/image-compressor",
    "/image-resizer",
    "/heic-to-jpg",
    "/webp-converter",
    "/passport-photo",
    "/favicon-generator",

    "/qr-code-generator",
    "/barcode-generator",
    "/uuid-generator",
    "/zip-extractor",

    "/percentage-calculator",
    "/age-calculator",
    "/bmi-calculator",
    "/gst-hst-calculator",

    "/cm-to-feet",
    "/kg-to-pounds",
    "/km-to-miles",
    "/inches-to-cm",
    "/watermark-pdf",
    "/delete-pdf-pages",
    "/extract-pdf-pages",
    "/page-number-pdf",
    "/jpg-to-png",
    "/temperature-converter",
  ];

  const mainPages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogArticles.map((article) => ({
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [...mainPages, ...blogPages];
}
