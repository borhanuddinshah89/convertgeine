import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inches to CM Converter",
  description: "Convert inches to centimetres and centimetres to inches instantly with this free length converter.",
  alternates: { canonical: "/inches-to-cm" },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
