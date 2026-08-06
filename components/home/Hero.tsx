export default function Hero() {
  return (
    <section className="py-16 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight">
        Free PDF & Image Tools
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
        Convert, compress, merge, split and edit PDFs and images in seconds.
        Fast, secure and free.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <a
          href="/compress-pdf"
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
        >
          Compress PDF
        </a>

        <a
          href="/merge-pdf"
          className="rounded-xl border border-slate-700 px-6 py-3 font-semibold hover:bg-slate-800"
        >
          Merge PDF
        </a>
      </div>
    </section>
  );
}
