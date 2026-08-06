import { MetadataRoute } from "next";

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
    "/pdf-to-jpg",
    "/jpg-to-pdf",
    "/pdf-editor",

    "/image-compressor",
    "/image-resizer",
    "/webp-converter",
    "/passport-photo",

    "/qr-code-generator",
    "/barcode-generator",
    "/uuid-generator",

    "/percentage-calculator",
    "/age-calculator",
    "/bmi-calculator",
    "/gst-hst-calculator",
    "/cm-to-feet",
    "/kg-to-pounds",
    "/km-to-miles",
    "/inches-to-cm",
    "/temperature-converter",

    "/sitemap",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
