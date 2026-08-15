const softwareApplication = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ConvertGeine PDF to JPG Converter",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  url: "https://www.convertgeine.com/pdf-to-jpg",
  description:
    "Convert every page of a PDF into downloadable JPG images online for free.",
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
      name: "PDF to JPG Converter",
      item: "https://www.convertgeine.com/pdf-to-jpg",
    },
  ],
};

export default function PdfToJpgLayout({
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
