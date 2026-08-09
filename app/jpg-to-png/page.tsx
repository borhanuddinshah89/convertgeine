import type { Metadata } from "next";
import JpgToPngClient from "./JpgToPngClient";

export const metadata: Metadata = {
  title: "JPG to PNG Converter Online Free | ConvertGeine",
  description:
    "Convert JPG and JPEG images to PNG online for free. Fast browser-based conversion with no signup required.",
  alternates: {
    canonical: "https://www.convertgeine.com/jpg-to-png",
  },
  openGraph: {
    title: "JPG to PNG Converter Online Free | ConvertGeine",
    description:
      "Convert JPG and JPEG images to PNG online for free. Fast, simple and no signup required.",
    url: "https://www.convertgeine.com/jpg-to-png",
    siteName: "ConvertGeine",
    type: "website",
  },
};

export default function JpgToPngPage() {
  return <JpgToPngClient />;
}
