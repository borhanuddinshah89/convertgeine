import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl text-center">
        <div className="text-7xl">🧭</div>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Error 404
        </p>

        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
          Page not found
        </h1>

        <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
          The page may have moved, been removed, or the address may be incorrect.
          Use one of the links below to continue using ConvertGeine.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500"
          >
            Return to homepage
          </Link>

          <Link
            href="/compress-pdf"
            className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 font-semibold transition hover:border-slate-500"
          >
            Open Compress PDF
          </Link>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          <Link
            href="/merge-pdf"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-blue-500"
          >
            <p className="font-bold">Merge PDF</p>
            <p className="mt-2 text-sm text-slate-400">
              Combine several PDF files into one document.
            </p>
          </Link>

          <Link
            href="/jpg-to-pdf"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-blue-500"
          >
            <p className="font-bold">JPG to PDF</p>
            <p className="mt-2 text-sm text-slate-400">
              Convert JPG and PNG images into one PDF.
            </p>
          </Link>

          <Link
            href="/passport-photo"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-blue-500"
          >
            <p className="font-bold">Passport Photo</p>
            <p className="mt-2 text-sm text-slate-400">
              Prepare common passport-photo dimensions.
            </p>
          </Link>

          <Link
            href="/age-calculator"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-blue-500"
          >
            <p className="font-bold">Age Calculator</p>
            <p className="mt-2 text-sm text-slate-400">
              Calculate an exact age in years, months and days.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
