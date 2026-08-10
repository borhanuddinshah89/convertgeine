import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Percentage Calculator Online",
  description: "Calculate percentages, percentage change and percentage differences instantly with this free online calculator.",
  alternates: { canonical: "/percentage-calculator" },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
