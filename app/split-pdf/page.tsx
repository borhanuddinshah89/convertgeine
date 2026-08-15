import type { Metadata } from "next";
import SplitPdfClient from "./SplitPdfClient";

export const metadata: Metadata = {
  title: "Split PDF Online Free | Extract PDF Pages | ConvertGeine",
  description:
    "Split a PDF online for free. Extract individual pages or ranges such as 1-3,5 into a new PDF with no signup required.",
  alternates: {
    canonical: "https://www.convertgeine.com/split-pdf",
  },
  openGraph: {
    title: "Split PDF Online Free | Extract PDF Pages",
    description:
      "Extract selected pages and page ranges into a new PDF. Free and no signup required.",
    url: "https://www.convertgeine.com/split-pdf",
    siteName: "ConvertGeine",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Split PDF Online Free | Extract PDF Pages",
    description: "Create a new PDF from selected pages or page ranges for free.",
  },
};

export default function SplitPdfPage() {
  return <SplitPdfClient />;
}
