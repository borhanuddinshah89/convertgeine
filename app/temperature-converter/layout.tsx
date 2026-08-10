import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Celsius to Fahrenheit Temperature Converter",
  description: "Convert Celsius and Fahrenheit temperatures instantly with this free online temperature converter.",
  alternates: { canonical: "/temperature-converter" },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
