import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watermark PDF Online - Free PDF Watermark Tool",
  description:
    "Add text watermarks to PDF files online for free. Customize watermark text, position, opacity, size and rotation with no registration required.",
  alternates: {
    canonical: "/watermark-pdf",
  },
};

export default function WatermarkPdfLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
