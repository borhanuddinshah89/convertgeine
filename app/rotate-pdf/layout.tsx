import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rotate PDF Online - Free PDF Rotator",
  description:
    "Rotate PDF pages online for free by 90, 180 or 270 degrees. Fast browser-based PDF rotation with no registration required.",
  alternates: {
    canonical: "/rotate-pdf",
  },
};

export default function RotatePdfLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
