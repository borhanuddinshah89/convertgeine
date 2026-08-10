import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free BMI Calculator — Metric & Imperial",
  description: "Calculate body mass index using metric or imperial measurements and understand your BMI category instantly.",
  alternates: { canonical: "/bmi-calculator" },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
