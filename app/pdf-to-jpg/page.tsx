import type { Metadata } from "next";
import PdfToJpgClient from "./PdfToJpgClient";

export const metadata: Metadata = {
  title: "PDF to JPG Converter — Save Every Page as an Image",
  description:
    "Convert every PDF page to a clear JPG image and download the results in one ZIP file. Free, mobile-friendly, and no registration required.",
  alternates: {
    canonical: "https://www.convertgeine.com/pdf-to-jpg",
  },
  openGraph: {
    title: "Free PDF to JPG Converter Online | ConvertGeine",
    description:
      "Turn every PDF page into a downloadable JPG image. Free and easy to use on desktop or mobile.",
    url: "https://www.convertgeine.com/pdf-to-jpg",
    siteName: "ConvertGeine",
    type: "website",
  },
};

export default function PdfToJpgPage() {
  return <PdfToJpgClient />;
}
