import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Canadian GST/HST Calculator by Province",
  description: "Calculate GST, HST and the total price for every Canadian province and territory with this free calculator.",
  alternates: { canonical: "/gst-hst-calculator" },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
