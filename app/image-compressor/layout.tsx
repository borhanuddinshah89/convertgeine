import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Image Compressor Online",
  description:
    "Compress JPG, PNG and WebP images online for free. Reduce image file size directly in your browser with no registration required.",
  alternates: {
    canonical: "/image-compressor",
  },
};

export default function ImageCompressorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
