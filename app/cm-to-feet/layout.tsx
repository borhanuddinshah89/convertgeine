import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CM to Feet and Inches Converter",
  description: "Convert centimetres to feet and inches instantly with a free, accurate online conversion tool.",
  alternates: { canonical: "/cm-to-feet" },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
