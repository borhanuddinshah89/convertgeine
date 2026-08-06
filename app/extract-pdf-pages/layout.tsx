import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Extract PDF Pages Online",
  description:
    "Extract selected PDF pages and create a new PDF online for free.",
  alternates: {
    canonical: "/extract-pdf-pages",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
