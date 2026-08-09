import type { Metadata } from "next";
import CompressPdfClient from "./CompressPdfClient";

export const metadata: Metadata = {
  title: "Compress PDF Online Free | Reduce PDF File Size | ConvertGeine",
  description:
    "Compress PDF files online for free. Reduce PDF file size directly in your browser with multiple compression levels. No signup required.",
  alternates: {
    canonical: "https://www.convertgeine.com/compress-pdf",
  },
  openGraph: {
    title: "Compress PDF Online Free | ConvertGeine",
    description:
      "Reduce PDF file size online for free with multiple compression levels. Fast, browser-based and no signup required.",
    url: "https://www.convertgeine.com/compress-pdf",
    siteName: "ConvertGeine",
    type: "website",
  },
};

export default function CompressPdfPage() {
  return <CompressPdfClient />;
}
