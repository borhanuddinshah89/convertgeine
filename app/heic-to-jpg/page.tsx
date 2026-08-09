import type { Metadata } from "next";
import HeicToJpgClient from "./HeicToJpgClient";

export const metadata: Metadata = {
  title: "HEIC to JPG Converter Online Free | ConvertGeine",
  description:
    "Convert HEIC and HEIF images to JPG online for free. Make iPhone photos easier to upload and share with no signup required.",
  alternates: {
    canonical: "https://www.convertgeine.com/heic-to-jpg",
  },
  openGraph: {
    title: "HEIC to JPG Converter Online Free | ConvertGeine",
    description:
      "Convert iPhone HEIC photos to JPG online for free. Fast, simple and no signup required.",
    url: "https://www.convertgeine.com/heic-to-jpg",
    siteName: "ConvertGeine",
    type: "website",
  },
};

export default function HeicToJpgPage() {
  return <HeicToJpgClient />;
}
