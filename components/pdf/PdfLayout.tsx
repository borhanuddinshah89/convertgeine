import Link from "next/link";

type Props = {
  title: string;
  description: string;
  icon: string;
  children: React.ReactNode;
};

export default function PdfLayout({
  title,
  description,
  icon,
  children,
}: Props) {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">

        <Link
          href="/"
          className="text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          ← Back to home
        </Link>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

          <div className="text-center">

            <div className="text-5xl">
              {icon}
            </div>

            <h1 className="mt-4 text-4xl font-bold">
              {title}
            </h1>

            <p className="mt-3 text-slate-400">
              {description}
            </p>

          </div>

          <div className="mt-10">
            {children}
          </div>

        </section>

      </div>
    </main>
  );
}
