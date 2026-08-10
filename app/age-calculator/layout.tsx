import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Age Calculator — Exact Age in Years, Months & Days",
  description: "Calculate your exact age in years, months and days from your date of birth. Free, instant and mobile-friendly.",
  alternates: { canonical: "/age-calculator" },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
