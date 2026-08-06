import ToolSearch from "@/components/ToolSearch";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-800 px-6 py-20 sm:py-24">
      <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
          ⚡ Fast, Secure & Free
        </div>

        <h1 className="mt-7 text-4xl font-extrabold tracking-tight sm:text-6xl">
          Free PDF, Image & Online Tools
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          Convert files, edit PDFs, resize images, create QR codes and use
          practical calculators without unnecessary complexity.
        </p>

        <ToolSearch />

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="#popular-tools"
            className="rounded-xl bg-blue-600 px-7 py-4 font-semibold transition hover:bg-blue-700"
          >
            Popular Tools
          </a>

          <a
            href="#all-tools"
            className="rounded-xl border border-slate-700 bg-slate-900 px-7 py-4 font-semibold transition hover:bg-slate-800"
          >
            Browse Categories
          </a>
        </div>
      </div>
    </section>
  );
}
