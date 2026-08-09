import type { Metadata } from "next";
import PdfToJpgClient from "./PdfToJpgClient";

export const metadata: Metadata = {
  title: "PDF to JPG Converter Online Free | ConvertGeine",
  description:
    "Convert PDF pages to JPG images online for free. Fast conversion with no signup required.",
  alternates: {
    canonical: "https://www.convertgeine.com/pdf-to-jpg",
  },
  openGraph: {
    title: "PDF to JPG Converter Online Free | ConvertGeine",
    description:
      "Turn PDF pages into JPG images online for free. Fast and easy to use.",
    url: "https://www.convertgeine.com/pdf-to-jpg",
    siteName: "ConvertGeine",
    type: "website",
  },
};

export default function PdfToJpgPage() {
  return <PdfToJpgClient />;
}
