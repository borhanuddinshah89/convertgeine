import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HEIC to JPG Converter - Free Online Tool",
  description:
    "Convert HEIC and HEIF photos to JPG online for free. Adjust JPG quality and download your converted image with no registration required.",
  alternates: {
    canonical: "/heic-to-jpg",
  },
  openGraph: {
    title: "HEIC to JPG Converter | ConvertGeine",
    description:
      "Convert HEIC and HEIF photos to JPG directly in your browser.",
    url: "https://www.convertgeine.com/heic-to-jpg",
    type: "website",
  },
};

export default function HeicToJpgLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
