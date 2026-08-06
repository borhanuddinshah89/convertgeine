import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free WebP Converter Online",
  description:
    "Convert JPG and PNG to WebP or convert WebP to JPG and PNG online for free. Fast browser-based conversion with no registration required.",
  alternates: {
    canonical: "/webp-converter",
  },
};

export default function WebpConverterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
