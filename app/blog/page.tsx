import type { Metadata } from "next";
import Link from "next/link";
import { blogArticles } from "@/data/blogArticles";

export const metadata: Metadata = {
  title: "PDF, Image & Online Tool Guides | ConvertGeine",
  description:
    "Practical guides for working with PDF files, images, QR codes, ZIP archives, calculators and other online tools.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-blue-400 hover:text-blue-300">
          ← ConvertGeine
        </Link>

        <h1 className="mt-8 text-4xl font-bold sm:text-5xl">
          Guides & Tutorials
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
          Straightforward guides for PDFs, images, online file tools,
          generators and calculators.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {blogArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500/60"
            >
              <h2 className="text-xl font-bold group-hover:text-blue-400">
                {article.title}
              </h2>

              <p className="mt-3 leading-7 text-slate-400">
                {article.description}
              </p>

              <p className="mt-5 font-semibold text-blue-400">
                Read guide →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
