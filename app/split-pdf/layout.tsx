const softwareApplication = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ConvertGeine Split PDF Tool",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  url: "https://www.convertgeine.com/split-pdf",
  description: "Extract selected pages or page ranges from a PDF into a new document.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const breadcrumbList = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.convertgeine.com" },
    { "@type": "ListItem", position: 2, name: "Split PDF", item: "https://www.convertgeine.com/split-pdf" },
  ],
};

export default function SplitPdfLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplication).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList).replace(/</g, "\\u003c") }} />
      {children}
    </>
  );
}
