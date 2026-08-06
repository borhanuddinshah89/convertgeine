import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free ZIP File Extractor Online",
  description:
    "Open and extract ZIP files online for free. Browse archive contents and download selected files directly in your browser.",
  alternates: {
    canonical: "/zip-extractor",
  },
  openGraph: {
    title: "Free ZIP File Extractor | ConvertGeine",
    description:
      "Open ZIP archives and extract files directly in your browser.",
    url: "https://www.convertgeine.com/zip-extractor",
    type: "website",
  },
};

export default function ZipExtractorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
