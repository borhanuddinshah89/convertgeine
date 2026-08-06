import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delete PDF Pages Online",
  description: "Remove pages from PDF files online for free.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
