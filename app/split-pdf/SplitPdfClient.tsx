"use client";

import { useState } from "react";
import Link from "next/link";
import ToolSeoSection from "@/components/ToolSeoSection";
import RelatedTools from "@/components/RelatedTools";
import PdfUploader from "../../components/PdfUploader";

export default function SplitPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [pageRange, setPageRange] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function splitPdf() {
    const file = files[0];

    if (!file) {
      setMessage("Please select one PDF file.");
      return;
    }

    if (!pageRange.trim()) {
      setMessage("Enter pages like 1-3,5,7.");
      return;
    }

    setLoading(true);
    setMessage("Splitting your PDF...");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("pages", pageRange);

      const response = await fetch("https://convertgeine-compressor.onrender.com/split", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Split failed.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "split-pages.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
      setMessage("Finished! Your selected pages were downloaded.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Split failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          ← Back to home
        </Link>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          <div className="text-center">
            <div className="text-5xl">✂️</div>

            <h1 className="mt-4 text-4xl font-bold">
              Split PDF
            </h1>

            <p className="mt-3 text-slate-400">
              Extract selected pages into a new PDF.
            </p>
          </div>

          <PdfUploader
            files={files}
            onFilesChange={setFiles}
            multiple={false}
            maximumFiles={1}
          />

          <div className="mt-6">
            <label
              htmlFor="page-range"
              className="mb-2 block text-sm font-semibold text-slate-300"
            >
              Pages to extract
            </label>

            <input
              id="page-range"
              type="text"
              value={pageRange}
              onChange={(event) => setPageRange(event.target.value)}
              placeholder="Example: 1-3,5,7"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />

            <p className="mt-2 text-xs text-slate-500">
              Use commas for separate pages and hyphens for ranges.
            </p>
          </div>

          <button
            type="button"
            onClick={splitPdf}
            disabled={loading || files.length !== 1 || !pageRange.trim()}
            className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            {loading ? "Splitting..." : "Split PDF"}
          </button>

          {message && (
            <p className="mt-5 rounded-xl bg-slate-950/60 px-4 py-3 text-center text-sm text-slate-300">
              {message}
            </p>
          )}
        </div>
        <ToolSeoSection
          tool="Split PDF"
          description="Extract selected pages from a PDF and save them as a new document. This is useful when you only need part of a larger file for an application, report, email, or submission."
          steps={[
            "Choose a PDF file from your device.",
            "Enter or select the pages you want to extract.",
            "Start the split process.",
            "Download the new PDF containing only the selected pages.",
          ]}
          benefits={[
            "Keep only the pages you need.",
            "Create smaller, easier-to-share PDF files.",
            "Prepare documents for applications and submissions.",
            "No registration is required.",
          ]}
        />
        <RelatedTools
          title="Related PDF Tools"
          tools={[
            { name: "Compress PDF", href: "/compress-pdf" },
            { name: "Merge PDF", href: "/merge-pdf" },
            { name: "JPG to PDF", href: "/jpg-to-pdf" },
            { name: "PDF to JPG", href: "/pdf-to-jpg" },
            { name: "PDF Editor", href: "/pdf-editor" },
          ]}
        />
      </div>
    </main>
  );
}
