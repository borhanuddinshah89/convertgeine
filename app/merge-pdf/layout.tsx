const softwareApplication = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ConvertGeine Merge PDF",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  url: "https://www.convertgeine.com/merge-pdf",
  description:
    "Combine up to 10 PDF files into one downloadable PDF document online for free.",
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
      name: "Merge PDF",
      item: "https://www.convertgeine.com/merge-pdf",
    },
  ],
};

export default function MergePdfLayout({
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
