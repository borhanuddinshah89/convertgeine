import type { Metadata } from "next";
import MergePdfClient from "./MergePdfClient";

export const metadata: Metadata = {
  title: "Merge PDF Online — Combine PDF Files Free | ConvertGeine",
  description:
    "Merge up to 10 PDF files into one document online for free. Keep files in your selected order, download the combined PDF, and sign up for nothing.",
  alternates: {
    canonical: "https://www.convertgeine.com/merge-pdf",
  },
  openGraph: {
    title: "Merge PDF Online — Combine PDF Files Free | ConvertGeine",
    description:
      "Combine up to 10 PDF files into one document online for free. No signup required.",
    url: "https://www.convertgeine.com/merge-pdf",
    siteName: "ConvertGeine",
    type: "website",
  },
};

export default function MergePdfPage() {
  return <MergePdfClient />;
}
