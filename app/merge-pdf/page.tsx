import type { Metadata } from "next";
import MergePdfClient from "./MergePdfClient";

export const metadata: Metadata = {
  title: "Merge PDF Online Free | Combine PDF Files | ConvertGeine",
  description:
    "Merge PDF files online for free. Combine multiple PDFs into one document quickly with no signup required.",
  alternates: {
    canonical: "https://www.convertgeine.com/merge-pdf",
  },
  openGraph: {
    title: "Merge PDF Online Free | ConvertGeine",
    description:
      "Combine multiple PDF files into one document online for free. Fast and no signup required.",
    url: "https://www.convertgeine.com/merge-pdf",
    siteName: "ConvertGeine",
    type: "website",
  },
};

export default function MergePdfPage() {
  return <MergePdfClient />;
}
