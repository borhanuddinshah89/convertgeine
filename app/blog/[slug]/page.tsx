import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  blogArticles,
  getBlogArticle,
} from "@/data/blogArticles";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) return {};

  return {
    title: `${article.title} | ConvertGeine`,
    description: article.description,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: `https://www.convertgeine.com/blog/${article.slug}`,
    },
  };
}

export default async function BlogArticlePage({
  params,
}: Props) {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) notFound();

  const related = blogArticles
    .filter((item) => item.slug !== article.slug)
    .sort((a, b) => {
      const aMatchesTool = a.toolHref === article.toolHref ? 1 : 0;
      const bMatchesTool = b.toolHref === article.toolHref ? 1 : 0;
      return bMatchesTool - aMatchesTool;
    })
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    mainEntityOfPage:
      `https://www.convertgeine.com/blog/${article.slug}`,
    publisher: {
      "@type": "Organization",
      name: "ConvertGeine",
      url: "https://www.convertgeine.com",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-14 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <article className="mx-auto max-w-3xl">
        <nav className="text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-400">
            Home
          </Link>
          {" / "}
          <Link href="/blog" className="hover:text-blue-400">
            Guides
          </Link>
        </nav>

        <h1 className="mt-7 text-4xl font-extrabold leading-tight sm:text-5xl">
          {article.title}
        </h1>

        <p className="mt-5 text-lg leading-8 text-slate-400">
          {article.description}
        </p>

        <Link
          href={article.toolHref}
          className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
        >
          Try {article.toolLabel} →
        </Link>

        <div className="mt-12 space-y-12">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold">
                {section.heading}
              </h2>

              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="leading-8 text-slate-300"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-7">
          <h2 className="text-2xl font-bold">
            Ready to try it?
          </h2>

          <p className="mt-3 leading-7 text-slate-300">
            Use the free ConvertGeine {article.toolLabel} tool directly
            from your browser.
          </p>

          <Link
            href={article.toolHref}
            className="mt-5 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
          >
            Open {article.toolLabel} →
          </Link>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold">
            Frequently Asked Questions
          </h2>

          <div className="mt-6 space-y-4">
            {article.faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >
                <h3 className="font-bold">{faq.question}</h3>
                <p className="mt-3 leading-7 text-slate-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold">
            More ConvertGeine Guides
          </h2>

          <div className="mt-6 grid gap-4">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5 hover:border-blue-500/50"
              >
                <p className="font-semibold">{item.title}</p>
                <p className="mt-2 text-sm text-slate-400">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
