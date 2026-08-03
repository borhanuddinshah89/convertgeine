import Link from "next/link";

const tools = [
  {
    title: "Compress PDF",
    description: "Reduce PDF file size while keeping good quality.",
    icon: "🗜️",
    href: "/compress-pdf",
    status: "Available",
  },
  {
    title: "Merge PDF",
    description: "Combine multiple PDF files into one document.",
    icon: "📚",
    href: "/merge-pdf",
    status: "Available",
  },
  {
    title: "Split PDF",
    description: "Extract selected pages into a new PDF file.",
    icon: "✂️",
    href: "/split-pdf",
    status: "Available",
  },
  {
    title: "PDF to JPG",
    description: "Convert PDF pages into high-quality JPG images.",
    icon: "🖼️",
    href: "#",
    status: "Coming soon",
  },
  {
    title: "JPG to PDF",
    description: "Turn multiple images into one PDF document.",
    icon: "📄",
    href: "#",
    status: "Coming soon",
  },
  {
    title: "Rotate PDF",
    description: "Rotate selected PDF pages quickly.",
    icon: "🔄",
    href: "#",
    status: "Coming soon",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold text-blue-500">
            ConvertGeine
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <Link href="/" className="hover:text-white">
              Home
            </Link>

            <a href="#tools" className="hover:text-white">
              Tools
            </a>

            <a href="#pricing" className="hover:text-white">
              Pricing
            </a>

            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <section className="border-b border-slate-800 px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            Fast, private and simple file tools
          </div>

          <h1 className="mt-8 text-5xl font-extrabold tracking-tight sm:text-6xl">
            Powerful PDF tools
            <span className="block text-blue-500">
              in one simple place
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Compress, merge and split PDF files directly from your browser
            using fast and easy tools.
          </p>

          <a
            href="#tools"
            className="mt-10 inline-block rounded-xl bg-blue-600 px-7 py-4 font-semibold transition hover:bg-blue-700"
          >
            Explore Tools
          </a>
        </div>
      </section>

      <section id="tools" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              PDF toolkit
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Choose a tool
            </h2>

            <p className="mt-4 text-slate-400">
              Start with one of our available PDF tools.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => {
              const isAvailable = tool.status === "Available";

              return (
                <div
                  key={tool.title}
                  className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-2xl"
                >
                  <div className="flex items-start justify-between">
                    <div className="text-4xl">{tool.icon}</div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        isAvailable
                          ? "bg-emerald-500/10 text-emerald-300"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {tool.status}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-bold">
                    {tool.title}
                  </h3>

                  <p className="mt-3 min-h-12 text-sm leading-6 text-slate-400">
                    {tool.description}
                  </p>

                  {isAvailable ? (
                    <Link
                      href={tool.href}
                      className="mt-6 block rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold transition hover:bg-blue-700"
                    >
                      Open Tool
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="mt-6 w-full cursor-not-allowed rounded-xl bg-slate-800 px-5 py-3 font-semibold text-slate-500"
                    >
                      Coming Soon
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="border-y border-slate-800 bg-slate-900/40 px-6 py-20"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold">
            Simple tools. No complicated setup.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-400">
            Use the available tools for free while ConvertGeine continues to
            grow.
          </p>
        </div>
      </section>

      <footer id="contact" className="px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-center text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:text-left">
          <p>© 2026 ConvertGeine. All rights reserved.</p>

          <p>Built for fast and simple document processing.</p>
        </div>
      </footer>
    </main>
  );
}
