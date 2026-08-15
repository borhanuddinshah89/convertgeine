const softwareApplication = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ConvertGeine PDF Compressor",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  url: "https://www.convertgeine.com/compress-pdf",
  description:
    "Reduce the size of scanned and image-heavy PDF files online with three compression levels.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const breadcrumbList = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.convertgeine.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Compress PDF",
      item: "https://www.convertgeine.com/compress-pdf",
    },
  ],
};

export default function CompressPdfLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplication).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbList).replace(/</g, "\\u003c"),
        }}
      />
      {children}
    </>
  );
}
