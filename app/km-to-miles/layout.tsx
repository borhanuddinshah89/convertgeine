import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KM to Miles Converter",
  description: "Convert kilometres to miles and miles to kilometres instantly with this free distance converter.",
  alternates: { canonical: "/km-to-miles" },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
