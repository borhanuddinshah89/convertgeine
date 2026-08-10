import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KG to Pounds Converter",
  description: "Convert kilograms to pounds and pounds to kilograms instantly with this free weight converter.",
  alternates: { canonical: "/kg-to-pounds" },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
