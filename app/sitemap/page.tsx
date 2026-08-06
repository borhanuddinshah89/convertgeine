import Link from "next/link";

const sections = [
  {
    title: "PDF Tools",
    links: [
      ["Compress PDF", "/compress-pdf"],
      ["Merge PDF", "/merge-pdf"],
      ["Split PDF", "/split-pdf"],
      ["JPG to PDF", "/jpg-to-pdf"],
      ["PDF to JPG", "/pdf-to-jpg"],
      ["PDF Editor", "/pdf-editor"],
    ],
  },
  {
    title: "Photo Tools",
    links: [["Passport Photo", "/passport-photo"]],
  },
  {
    title: "Calculators",
    links: [
      ["Age Calculator", "/age-calculator"],
      ["BMI Calculator", "/bmi-calculator"],
      ["Percentage Calculator", "/percentage-calculator"],
      ["GST / HST Calculator", "/gst-hst-calculator"],
    ],
  },
  {
    title: "Unit Converters",
    links: [
      ["CM to Feet", "/cm-to-feet"],
      ["Inches to CM", "/inches-to-cm"],
      ["KG to Pounds", "/kg-to-pounds"],
      ["KM to Miles", "/km-to-miles"],
      ["Temperature Converter", "/temperature-converter"],
      ["Rotate PDF", "/rotate-pdf"],
      ["ZIP Extractor", "/zip-extractor"],
      ["Favicon Generator", "/favicon-generator"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Contact", "/contact"],
      ["Privacy Policy", "/privacy"],
      ["Terms of Use", "/terms"],
      ["Cookie Policy", "/cookies"],
    ],
  },
];

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          ← Back to home
        </Link>

        <h1 className="mt-8 text-5xl font-bold">HTML Sitemap</h1>

        <p className="mt-4 max-w-2xl text-slate-400">
          Browse all tools and important pages available on ConvertGeine.
        </p>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-bold">{section.title}</h2>

              <div className="mt-5 space-y-3">
                {section.links.map(([name, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="block rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 transition hover:border-blue-500 hover:bg-slate-800"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
