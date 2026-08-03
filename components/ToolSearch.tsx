"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const tools = [
  {
    title: "Compress PDF",
    description: "Reduce PDF file size.",
    category: "PDF",
    icon: "🗜️",
    href: "/compress-pdf",
    keywords: "compress shrink reduce small pdf",
  },
  {
    title: "Merge PDF",
    description: "Combine PDF files into one.",
    category: "PDF",
    icon: "📚",
    href: "/merge-pdf",
    keywords: "merge combine join pdf",
  },
  {
    title: "Split PDF",
    description: "Extract selected PDF pages.",
    category: "PDF",
    icon: "✂️",
    href: "/split-pdf",
    keywords: "split extract pages pdf",
  },
  {
    title: "PDF to JPG",
    description: "Convert PDF pages to JPG images.",
    category: "PDF",
    icon: "🖼️",
    href: "/pdf-to-jpg",
    keywords: "pdf image jpg jpeg convert",
  },
  {
    title: "JPG to PDF",
    description: "Convert images into one PDF.",
    category: "PDF",
    icon: "📑",
    href: "/jpg-to-pdf",
    keywords: "jpg jpeg png image pdf",
  },
  {
    title: "PDF Editor Lite",
    description: "Rotate, reorder, delete and add content.",
    category: "PDF",
    icon: "✏️",
    href: "/pdf-editor",
    keywords: "edit rotate reorder delete text signature pdf",
  },
  {
    title: "Passport Photo Converter",
    description: "Resize and position passport photos.",
    category: "Photo",
    icon: "🪪",
    href: "/passport-photo",
    keywords:
      "passport photo canada pr citizenship visa bangladesh 35x45 50x70",
  },
  {
    title: "Age Calculator",
    description: "Calculate exact age and total days.",
    category: "Calculator",
    icon: "🎂",
    href: "/age-calculator",
    keywords: "age birthday date years months days",
  },
  {
    title: "BMI Calculator",
    description: "Calculate body mass index.",
    category: "Calculator",
    icon: "⚖️",
    href: "/bmi-calculator",
    keywords: "bmi weight height health",
  },
  {
    title: "Percentage Calculator",
    description: "Calculate percentages instantly.",
    category: "Calculator",
    icon: "%",
    href: "/percentage-calculator",
    keywords: "percentage percent calculator",
  },
  {
    title: "GST / HST Calculator",
    description: "Calculate Canadian sales taxes.",
    category: "Calculator",
    icon: "🇨🇦",
    href: "/gst-hst-calculator",
    keywords: "gst hst canada tax",
  },
  {
    title: "CM to Feet",
    description: "Convert centimetres to feet and inches.",
    category: "Converter",
    icon: "📐",
    href: "/cm-to-feet",
    keywords: "cm centimetres feet inches height",
  },
  {
    title: "KG to Pounds",
    description: "Convert kilograms and pounds.",
    category: "Converter",
    icon: "🏋️",
    href: "/kg-to-pounds",
    keywords: "kg kilograms pounds lb weight",
  },
  {
    title: "KM to Miles",
    description: "Convert kilometres and miles.",
    category: "Converter",
    icon: "🛣️",
    href: "/km-to-miles",
    keywords: "km kilometres miles distance",
  },
  {
    title: "Temperature Converter",
    description: "Convert Celsius and Fahrenheit.",
    category: "Converter",
    icon: "🌡️",
    href: "/temperature-converter",
    keywords: "temperature celsius fahrenheit degrees",
  },
  {
    title: "Inches to CM",
    description: "Convert inches and centimetres.",
    category: "Converter",
    icon: "📏",
    href: "/inches-to-cm",
    keywords: "inches cm centimetres length",
  },
];

export default function ToolSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return [];
    }

    return tools.filter((tool) =>
      [
        tool.title,
        tool.description,
        tool.category,
        tool.keywords,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search)
    );
  }, [query]);

  return (
    <section className="mx-auto mt-10 max-w-3xl text-left">
      <div className="relative">
        <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl">
          🔍
        </span>

        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search PDF, passport, age, GST, converter..."
          className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-14 py-5 text-white shadow-2xl outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      {query && (
        <div className="mt-3 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
          {results.length > 0 ? (
            <div className="max-h-96 overflow-y-auto p-2">
              {results.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="flex items-center gap-4 rounded-xl p-4 transition hover:bg-slate-800"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-2xl">
                    {tool.icon}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="font-bold">{tool.title}</span>

                      <span className="rounded-full bg-blue-500/10 px-2 py-1 text-xs text-blue-300">
                        {tool.category}
                      </span>
                    </span>

                    <span className="mt-1 block truncate text-sm text-slate-400">
                      {tool.description}
                    </span>
                  </span>

                  <span className="text-blue-400">→</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-3xl">🔎</p>
              <p className="mt-3 font-semibold">No matching tool found</p>
              <p className="mt-2 text-sm text-slate-500">
                Try PDF, passport, age, GST or converter.
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
