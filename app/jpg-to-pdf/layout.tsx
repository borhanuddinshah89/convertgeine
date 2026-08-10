import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JPG to PDF Converter — Combine Images Free Online",
  description:
    "Combine up to 20 JPG and PNG images into one PDF in your chosen order. Free, mobile-friendly, and no registration required.",
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
  const softwareApplication = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ConvertGeine JPG to PDF Converter",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    url: "https://www.convertgeine.com/jpg-to-pdf",
    description: "Combine JPG and PNG images into one PDF online in your chosen order.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplication) }}
      />
      {children}
    </>
  );
}
