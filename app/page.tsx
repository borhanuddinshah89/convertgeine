import Link from "next/link";
import ToolSearch from "../components/ToolSearch";
import Logo from "../components/Logo";

type Tool = {
  title: string;
  description: string;
  icon: string;
  href: string;
};

type Category = {
  id: string;
  title: string;
  description: string;
  icon: string;
  tools: Tool[];
};

const categories: Category[] = [
  {
    id: "pdf-tools",
    title: "PDF Tools",
    description: "Convert, organize and edit PDF documents.",
    icon: "📄",
    tools: [
      {
        title: "Compress PDF",
        description: "Reduce PDF file size while preserving useful quality.",
        icon: "🗜️",
        href: "/compress-pdf",
      },
      {
        title: "Merge PDF",
        description: "Combine several PDF files into one document.",
        icon: "📚",
        href: "/merge-pdf",
      },
      {
        title: "Split PDF",
        description: "Extract selected pages into a new PDF.",
        icon: "✂️",
        href: "/split-pdf",
      },
      {
        title: "PDF to JPG",
        description: "Convert PDF pages into downloadable JPG images.",
        icon: "🖼️",
        href: "/pdf-to-jpg",
      },
      {
        title: "JPG to PDF",
        description: "Combine JPG and PNG images into one PDF.",
        icon: "📑",
        href: "/jpg-to-pdf",
      },
      {
        title: "PDF Editor Lite",
        description: "Rotate, remove, reorder and add content to PDF pages.",
        icon: "✏️",
        href: "/pdf-editor",
      },
    ],
  },
  {
    id: "photo-tools",
    title: "Photo Tools",
    description: "Prepare images for official documents and applications.",
    icon: "📸",
    tools: [
      {
        title: "Passport Photo Converter",
        description:
          "Crop and resize photos using passport and immigration presets.",
        icon: "🪪",
        href: "/passport-photo",
      },
    ],
  },
  {
    id: "calculators",
    title: "Calculators",
    description: "Simple calculators for everyday questions.",
    icon: "🧮",
    tools: [
      {
        title: "Age Calculator",
        description: "Calculate exact age in years, months and days.",
        icon: "🎂",
        href: "/age-calculator",
      },
      {
        title: "BMI Calculator",
        description: "Calculate body mass index using weight and height.",
        icon: "⚖️",
        href: "/bmi-calculator",
      },
      {
        title: "Percentage Calculator",
        description: "Calculate a percentage of any number instantly.",
        icon: "%",
        href: "/percentage-calculator",
      },
      {
        title: "GST / HST Calculator",
        description: "Calculate Canadian GST, HST and custom tax rates.",
        icon: "🇨🇦",
        href: "/gst-hst-calculator",
      },
    ],
  },
  {
    id: "unit-converters",
    title: "Unit Converters",
    description: "Convert common measurements quickly and accurately.",
    icon: "📏",
    tools: [
      {
        title: "CM to Feet",
        description: "Convert centimetres to feet and inches and back.",
        icon: "📐",
        href: "/cm-to-feet",
      },
      {
        title: "KG to Pounds",
        description: "Convert kilograms and pounds in either direction.",
        icon: "🏋️",
        href: "/kg-to-pounds",
      },
      {
        title: "KM to Miles",
        description: "Convert kilometres and miles instantly.",
        icon: "🛣️",
        href: "/km-to-miles",
      },
      {
        title: "Temperature Converter",
        description: "Convert Celsius and Fahrenheit temperatures.",
        icon: "🌡️",
        href: "/temperature-converter",
      },
      {
        title: "Inches to CM",
        description: "Convert inches and centimetres in either direction.",
        icon: "📏",
        href: "/inches-to-cm",
      },
    ],
  },
];

const popularTools = [
  {
    title: "Compress PDF",
    description: "Make a PDF smaller for email, applications and uploads.",
    icon: "🗜️",
    href: "/compress-pdf",
  },
  {
    title: "Passport Photo",
    description: "Prepare a clean photo using common official dimensions.",
    icon: "🪪",
    href: "/passport-photo",
  },
  {
    title: "Merge PDF",
    description: "Combine several documents into one organized PDF.",
    icon: "📚",
    href: "/merge-pdf",
  },
  {
    title: "Age Calculator",
    description: "Find your exact age for any selected date.",
    icon: "🎂",
    href: "/age-calculator",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo />

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-300 lg:flex">
            <a href="#pdf-tools" className="transition hover:text-white">
              PDF
            </a>

            <a href="#photo-tools" className="transition hover:text-white">
              Photos
            </a>

            <a href="#calculators" className="transition hover:text-white">
              Calculators
            </a>

            <a href="#unit-converters" className="transition hover:text-white">
              Converters
            </a>

            <a href="#about" className="transition hover:text-white">
              About
            </a>
          </nav>

          <a
            href="#all-tools"
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-700"
          >
            Browse Tools
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-slate-800 px-6 py-24">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
            <span>✨</span>
            Free PDF, photo, calculator and converter tools
          </div>

          <h1 className="mt-8 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Free PDF Tools, Image Converter & Online Calculators
            <span className="mt-2 block text-blue-500">
              Fast, Secure & Free
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-400">
            Compress documents, convert files, prepare passport photos and use
            practical calculators from one convenient website.
          </p>

          <ToolSearch />

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#popular-tools"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700"
            >
              Start Using Tools
            </a>

            <a
              href="#all-tools"
              className="rounded-xl border border-slate-700 bg-slate-900 px-8 py-4 font-semibold transition hover:border-slate-500 hover:bg-slate-800"
            >
              View All Tools
            </a>
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <p className="text-2xl">⚡</p>
              <p className="mt-2 font-semibold">Fast</p>
              <p className="mt-1 text-sm text-slate-500">
                Designed for quick results
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <p className="text-2xl">🔒</p>
              <p className="mt-2 font-semibold">Privacy focused</p>
              <p className="mt-1 text-sm text-slate-500">
                Clear file-handling information
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <p className="text-2xl">📱</p>
              <p className="mt-2 font-semibold">Mobile friendly</p>
              <p className="mt-1 text-sm text-slate-500">
                Useful on phones and computers
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="popular-tools" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                Popular tools
              </p>

              <h2 className="mt-3 text-4xl font-bold">
                Start with our most useful tools
              </h2>

              <p className="mt-4 text-slate-400">
                Complete common document, photo and calculation tasks.
              </p>
            </div>

            <a
              href="#all-tools"
              className="font-semibold text-blue-400 hover:text-blue-300"
            >
              Explore everything →
            </a>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {popularTools.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-2xl"
              >
                <div className="text-4xl">{tool.icon}</div>

                <h3 className="mt-5 text-xl font-bold transition group-hover:text-blue-400">
                  {tool.title}
                </h3>

                <p className="mt-3 min-h-20 text-sm leading-6 text-slate-400">
                  {tool.description}
                </p>

                <p className="mt-5 font-semibold text-blue-400">
                  Open Tool →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="all-tools"
        className="border-y border-slate-800 bg-slate-900/30 px-6 py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Complete toolkit
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Browse tools by category
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Choose the category that matches the task you want to complete.
            </p>
          </div>

          <div className="mt-14 space-y-16">
            {categories.map((category) => (
              <section
                key={category.id}
                id={category.id}
                className="scroll-mt-24"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600/15 text-3xl">
                    {category.icon}
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold">{category.title}</h3>

                    <p className="mt-2 text-slate-400">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {category.tools.map((tool) => (
                    <Link
                      key={tool.title}
                      href={tool.href}
                      className="group flex gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 transition hover:border-blue-500/50 hover:bg-slate-900"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-2xl">
                        {tool.icon}
                      </div>

                      <div>
                        <h4 className="font-bold transition group-hover:text-blue-400">
                          {tool.title}
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {tool.description}
                        </p>

                        <p className="mt-3 text-sm font-semibold text-blue-400">
                          Open →
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              About ConvertGeine
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Practical tools without unnecessary complexity
            </h2>

            <p className="mt-6 leading-8 text-slate-400">
              ConvertGeine brings together useful PDF tools, photo preparation,
              everyday calculators and unit converters. Each tool is designed
              to be understandable and easy to use.
            </p>

            <p className="mt-4 leading-8 text-slate-400">
              Some tools process information directly in the browser. Tools
              requiring server processing should clearly explain their file
              limits and temporary handling practices.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-3xl">🚫</p>
              <h3 className="mt-4 text-xl font-bold">No account required</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Use the current free tools without registering.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-3xl">💧</p>
              <h3 className="mt-4 text-xl font-bold">No watermark</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Download your completed files without branded watermarks.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-3xl">🧭</p>
              <h3 className="mt-4 text-xl font-bold">Clear instructions</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Each tool is designed around a straightforward workflow.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-3xl">🛠️</p>
              <h3 className="mt-4 text-xl font-bold">Growing toolkit</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Existing tools will be improved based on real usage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/40 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Frequently asked questions
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Common questions
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            <details className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <summary className="cursor-pointer font-semibold">
                Is ConvertGeine free?
              </summary>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                The tools currently available on this website are free to use.
                Limits may apply to large files or resource-intensive tasks.
              </p>
            </details>

            <details className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <summary className="cursor-pointer font-semibold">
                Do I need to create an account?
              </summary>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                No account is currently required to use the available tools.
              </p>
            </details>

            <details className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <summary className="cursor-pointer font-semibold">
                Are uploaded files stored permanently?
              </summary>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                Browser-based tools keep processing on your device. Tools that
                require server processing should use files temporarily and
                remove temporary processing files after completing the task.
                Full details will be included in the Privacy Policy.
              </p>
            </details>

            <details className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <summary className="cursor-pointer font-semibold">
                Does the passport photo tool guarantee government acceptance?
              </summary>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                No. It assists with resizing and positioning, but users must
                verify the current official requirements and use a professional
                photographer where required.
              </p>
            </details>
          </div>
        </div>
      </section>

      <footer className="px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                ⚡
              </span>

              <span className="text-xl font-bold">ConvertGeine</span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-500">
              Free PDF, photo, calculator and unit-conversion tools for
              everyday digital tasks.
            </p>
          </div>

          <div>
            <h3 className="font-bold">PDF Tools</h3>

            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <p>
                <Link href="/compress-pdf" className="hover:text-white">
                  Compress PDF
                </Link>
              </p>
              <p>
                <Link href="/merge-pdf" className="hover:text-white">
                  Merge PDF
                </Link>
              </p>
              <p>
                <Link href="/split-pdf" className="hover:text-white">
                  Split PDF
                </Link>
              </p>
              <p>
                <Link href="/pdf-editor" className="hover:text-white">
                  PDF Editor Lite
                </Link>
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Popular Tools</h3>

            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <p>
                <Link href="/passport-photo" className="hover:text-white">
                  Passport Photo
                </Link>
              </p>
              <p>
                <Link href="/age-calculator" className="hover:text-white">
                  Age Calculator
                </Link>
              </p>
              <p>
                <Link href="/cm-to-feet" className="hover:text-white">
                  CM to Feet
                </Link>
              </p>
              <p>
                <Link href="/gst-hst-calculator" className="hover:text-white">
                  GST / HST Calculator
                </Link>
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Company</h3>

            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <p>
                <a href="/about" className="hover:text-white">
                  About
                </a>
              </p>
              <p><a href="/privacy" className="hover:text-white">Privacy Policy</a></p>
              <p><a href="/terms" className="hover:text-white">Terms of Use</a></p>
              <p><a href="/contact" className="hover:text-white">Contact</a></p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-slate-800 pt-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ConvertGeine. All rights reserved.</p>

          <p>Fast and practical online tools.</p>
        </div>
      </footer>
    </main>
  );
}
