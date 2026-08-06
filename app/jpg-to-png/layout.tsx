import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JPG to PNG Converter Online",
  description:
    "Convert JPG and JPEG images to PNG online for free directly in your browser.",
  alternates: {
    canonical: "/jpg-to-png",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
