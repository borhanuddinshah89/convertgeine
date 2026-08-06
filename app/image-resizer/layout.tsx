import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Image Resizer Online",
  description:
    "Resize JPG, PNG and WebP images online for free. Change image width and height directly in your browser with no registration required.",
  alternates: {
    canonical: "/image-resizer",
  },
};

export default function ImageResizerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
