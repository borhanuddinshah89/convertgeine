import type { Metadata } from "next";
import CompressPdfClient from "./CompressPdfClient";

export const metadata: Metadata = {
  title: "Compress PDF Online — Reduce PDF File Size Free",
  description:
    "Compress a PDF online for free. Choose maximum, balanced, or best-quality compression to reduce scanned and image-heavy PDFs up to 25 MB.",
  alternates: {
    canonical: "https://www.convertgeine.com/compress-pdf",
  },
  openGraph: {
    title: "Compress PDF Online — Reduce PDF File Size Free",
    description:
      "Reduce scanned and image-heavy PDF files with three compression levels. Free, private browser processing with no signup.",
    url: "https://www.convertgeine.com/compress-pdf",
    siteName: "ConvertGeine",
    type: "website",
  },
};

export default function CompressPdfPage() {
  return <CompressPdfClient />;
}
