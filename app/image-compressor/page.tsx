import type { Metadata } from "next";
import ImageCompressorClient from "./ImageCompressorClient";

export const metadata: Metadata = {
  title: "Compress Images Online Free | JPG PNG WebP | ConvertGeine",
  description:
    "Compress JPG, PNG and WebP images online for free. Reduce image file size quickly with no signup required.",
  alternates: {
    canonical: "https://www.convertgeine.com/image-compressor",
  },
  openGraph: {
    title: "Compress Images Online Free | ConvertGeine",
    description:
      "Reduce JPG, PNG and WebP image file sizes online for free. Fast and easy to use.",
    url: "https://www.convertgeine.com/image-compressor",
    siteName: "ConvertGeine",
    type: "website",
  },
};

export default function ImageCompressorPage() {
  return <ImageCompressorClient />;
}
