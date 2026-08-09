import type { Metadata } from "next";
import ImageResizerClient from "./ImageResizerClient";

export const metadata: Metadata = {
  title: "Resize Images Online Free | JPG PNG WebP | ConvertGeine",
  description:
    "Resize JPG, PNG and WebP images online for free. Change image dimensions quickly with no signup required.",
  alternates: {
    canonical: "https://www.convertgeine.com/image-resizer",
  },
  openGraph: {
    title: "Resize Images Online Free | ConvertGeine",
    description:
      "Resize JPG, PNG and WebP images online for free. Fast, simple and no signup required.",
    url: "https://www.convertgeine.com/image-resizer",
    siteName: "ConvertGeine",
    type: "website",
  },
};

export default function ImageResizerPage() {
  return <ImageResizerClient />;
}
