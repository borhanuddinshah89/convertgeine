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
    links: [
      ["Passport Photo", "/passport-photo"],
    ],
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
    title: "Company",
    links: [
      ["About", "/about"],
      ["Contact", "/contact"],
      ["Privacy Policy", "/privacy"],
      ["Terms", "/terms"],
      ["Cookie Policy", "/cookies"],
    ],
  },
];

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-5xl font-bold">HTML Sitemap</h1>

        <p className="mt-4 text-slate-400">
          Browse every tool and page available on ConvertGeine.
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
                    className="block rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 hover:border-blue-500"
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
