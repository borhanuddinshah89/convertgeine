import Link from "next/link";

const articles = [
  {
    title: "How to Compress a PDF Without Losing Quality",
    href: "/blog/how-to-compress-pdf",
    description: "Reduce PDF file size quickly while maintaining quality.",
  },
  {
    title: "How to Merge PDF Files Online",
    href: "/blog/how-to-merge-pdf",
    description: "Combine multiple PDF files into one document.",
  },
  {
    title: "How to Split PDF Pages",
    href: "/blog/how-to-split-pdf",
    description: "Extract or separate pages from any PDF.",
  },
  {
    title: "How to Convert JPG to PNG",
    href: "/blog/how-to-jpg-to-png",
    description: "Convert JPEG images into PNG format in seconds.",
  },
];

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-5xl font-bold">
        ConvertGeine Blog
      </h1>

      <p className="mt-4 text-slate-400">
        Learn how to work with PDFs and images using free online tools.
      </p>

      <div className="mt-12 grid gap-6">
        {articles.map((article) => (
          <Link
            key={article.href}
            href={article.href}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
          >
            <h2 className="text-2xl font-semibold">
              {article.title}
            </h2>

            <p className="mt-3 text-slate-400">
              {article.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
