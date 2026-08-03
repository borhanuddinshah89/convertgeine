export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-500">
            ConvertGeine
          </h1>

          <div className="hidden gap-6 md:flex">
            <a href="#" className="hover:text-blue-400">Home</a>
            <a href="#" className="hover:text-blue-400">Tools</a>
            <a href="#" className="hover:text-blue-400">Pricing</a>
            <a href="#" className="hover:text-blue-400">Contact</a>
          </div>
        </div>
      </nav>

      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-20 text-center">
        <h2 className="mb-6 text-5xl font-extrabold">
          Your AI Productivity Hub
        </h2>

        <p className="mb-10 max-w-2xl text-lg text-slate-300">
          Convert files, compress PDFs, edit images, and use AI tools—all in one place.
        </p>

        <button className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-700">
          Get Started
        </button>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <h3 className="mb-8 text-center text-3xl font-bold">
          Featured Tools
        </h3>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-4 text-4xl">📄</div>
            <h4 className="mb-2 text-xl font-bold">Compress PDF</h4>
            <p className="mb-4 text-slate-400">
              Reduce PDF size without losing quality.
            </p>

            <button className="w-full rounded-lg bg-blue-600 py-3 hover:bg-blue-700">
              Open Tool
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-4 text-4xl">🖼️</div>
            <h4 className="mb-2 text-xl font-bold">Image Converter</h4>
            <p className="mb-4 text-slate-400">
              Convert PNG, JPG and WEBP instantly.
            </p>

            <button className="w-full rounded-lg bg-slate-700 py-3">
              Coming Soon
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-4 text-4xl">🤖</div>
            <h4 className="mb-2 text-xl font-bold">AI Writer</h4>
            <p className="mb-4 text-slate-400">
              Generate emails, articles and documents.
            </p>

            <button className="w-full rounded-lg bg-slate-700 py-3">
              Coming Soon
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}