import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Page Numbers to PDF Online",
  description:
    "Add page numbers to PDF files online for free. Choose the starting number, size and position.",
  alternates: {
    canonical: "/page-number-pdf",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
