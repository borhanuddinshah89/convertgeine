import type { Metadata } from "next";
import WebpConverterClient from "./WebpConverterClient";

export const metadata: Metadata = {
  title: "WebP Converter Online Free | Convert Images | ConvertGeine",
  description:
    "Convert WebP images online for free. Change WebP files to common image formats quickly with no signup required.",
  alternates: {
    canonical: "https://www.convertgeine.com/webp-converter",
  },
  openGraph: {
    title: "WebP Converter Online Free | ConvertGeine",
    description:
      "Convert WebP images online for free. Fast, simple and no signup required.",
    url: "https://www.convertgeine.com/webp-converter",
    siteName: "ConvertGeine",
    type: "website",
  },
};

export default function WebpConverterPage() {
  return <WebpConverterClient />;
}
