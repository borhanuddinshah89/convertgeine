"use client";

import Link from "next/link";

export default function FaviconGeneratorPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-16">
      <div className="mx-auto max-w-4xl">

        <Link
          href="/"
          className="text-blue-400"
        >
          ← Back
        </Link>

        <h1 className="mt-8 text-5xl font-bold">
          Favicon Generator
        </h1>

        <p className="mt-4 text-slate-400">
          Upload any PNG or JPG image and generate favicons for websites.
        </p>

        <div className="mt-10 rounded-2xl border-2 border-dashed border-slate-700 p-16 text-center">
          <p className="text-slate-400">
            Upload UI coming next...
          </p>
        </div>

      </div>
    </main>
  );
}
