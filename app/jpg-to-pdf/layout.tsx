import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free JPG to PDF Converter Online",
  description:
    "Convert JPG and PNG images to one PDF online for free. Fast, mobile-friendly, and no registration required.",
  alternates: {
    canonical: "/jpg-to-pdf",
  },
  openGraph: {
    title: "Free JPG to PDF Converter Online | ConvertGeine",
    description:
      "Combine JPG and PNG images into one downloadable PDF online for free.",
    url: "https://www.convertgeine.com/jpg-to-pdf",
    type: "website",
  },
};

export default function JpgToPdfLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
