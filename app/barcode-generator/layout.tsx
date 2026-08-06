import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Barcode Generator Online",
  description:
    "Create CODE 128, CODE 39, EAN, UPC, ITF, Codabar and CODE 93 barcodes online for free, then download the barcode as a PNG image.",
  alternates: {
    canonical: "/barcode-generator",
  },
  openGraph: {
    title: "Free Barcode Generator Online | ConvertGeine",
    description:
      "Generate customizable barcodes online and download them as PNG images.",
    url: "https://www.convertgeine.com/barcode-generator",
    type: "website",
  },
};

export default function BarcodeGeneratorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
