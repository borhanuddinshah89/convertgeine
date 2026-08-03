import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://convertgeine.com";

  const routes = [
    "",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
    "/jpg-to-pdf",
    "/pdf-to-jpg",
    "/merge-pdf",
    "/split-pdf",
    "/passport-photo",
    "/age-calculator",
    "/bmi-calculator",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
