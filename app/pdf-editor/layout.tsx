import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online PDF Editor",
  description: "Edit and organize PDF pages online for free. No registration required.",
  alternates: { canonical: "/pdf-editor" },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
