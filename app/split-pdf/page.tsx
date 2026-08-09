import type { Metadata } from "next";
import SplitPdfClient from "./SplitPdfClient";

export const metadata: Metadata = {
  title: "Split PDF Online Free | Separate PDF Pages | ConvertGeine",
  description:
    "Split PDF files online for free. Separate pages or extract parts of a PDF quickly with no signup required.",
  alternates: {
    canonical: "https://www.convertgeine.com/split-pdf",
  },
  openGraph: {
    title: "Split PDF Online Free | ConvertGeine",
    description:
      "Separate PDF pages online for free. Fast, simple and no signup required.",
    url: "https://www.convertgeine.com/split-pdf",
    siteName: "ConvertGeine",
    type: "website",
  },
};

export default function SplitPdfPage() {
  return <SplitPdfClient />;
}
