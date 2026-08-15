"use client";

import { useState } from "react";
import Link from "next/link";
import ToolSeoSection from "@/components/ToolSeoSection";
import RelatedTools from "@/components/RelatedTools";
import { trackToolEvent } from "@/lib/analytics";
import PdfUploader from "../../components/PdfUploader";

export default function PdfToJpgPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleFilesChange(selectedFiles: File[]) {
    setFiles(selectedFiles);
    setMessage("");

    const file = selectedFiles[0];
    if (file) {
      trackToolEvent("tool_file_selected", "pdf_to_jpg", {
        file_count: 1,
        file_size_kb: Math.round(file.size / 1024),
      });
    }
  }

  async function convertPdf() {
    const file = files[0];

    if (!file) {
      setMessage("Please select one PDF file.");
      return;
    }

    setLoading(true);
    setMessage("Converting PDF pages to JPG...");
    trackToolEvent("tool_start", "pdf_to_jpg", {
      file_count: 1,
      file_size_kb: Math.round(file.size / 1024),
    });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("https://convertgeine-compressor.onrender.com/pdf-to-jpg", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Conversion failed.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "pdf-images.zip";
      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
      setMessage("Finished! Your JPG images were downloaded.");
      trackToolEvent("tool_complete", "pdf_to_jpg", {
        file_count: 1,
        file_size_kb: Math.round(file.size / 1024),
      });
    } catch (error) {
      trackToolEvent("tool_error", "pdf_to_jpg");
      setMessage(
        error instanceof Error ? error.message : "Conversion failed."
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
            <div className="text-5xl">🖼️</div>

            <h1 className="mt-4 text-4xl font-bold">
              Free PDF to JPG Converter
            </h1>

            <p className="mt-3 text-slate-400">
              Convert every PDF page into a clear JPG image and download all
              pages together. No registration required.
            </p>
          </div>

          <PdfUploader
            files={files}
            onFilesChange={handleFilesChange}
            multiple={false}
            maximumFiles={1}
          />

          <button
            type="button"
            onClick={convertPdf}
            disabled={loading || files.length !== 1}
            className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            {loading ? "Converting..." : "Convert to JPG"}
          </button>

          {message && (
            <p className="mt-5 rounded-xl bg-slate-950/60 px-4 py-3 text-center text-sm text-slate-300">
              {message}
            </p>
          )}
        </div>
        <ToolSeoSection
          tool="PDF to JPG Converter"
          description="Convert each page of a PDF into a downloadable JPG image. Single-page PDFs download as one image, while multi-page PDFs are packaged together for convenient downloading."
          steps={[
            "Choose a PDF file from your device.",
            "Start the PDF to JPG conversion.",
            "Wait while each page is converted into an image.",
            "Download the JPG image or ZIP file containing all converted pages.",
          ]}
          benefits={[
            "Turn PDF pages into widely supported image files.",
            "Use converted pages in presentations, documents, and websites.",
            "Download all pages together when converting a multi-page PDF.",
            "No registration is required.",
          ]}
          fileHandling="Your PDF is sent securely to the conversion service only to create the JPG images. ConvertGeine does not intentionally store the uploaded PDF or downloaded images."
        />

        <section className="mt-12 rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-2xl font-bold">
            Save PDF pages as images for uploads, sharing, and previews
          </h2>

          <div className="mt-4 space-y-4 leading-7 text-slate-300">
            <p>
              JPG works in many places that do not accept PDF files, including
              image upload forms, slide decks, website editors, messaging apps,
              and social posts. This converter renders every page separately so
              you can use the exact page image you need.
            </p>
            <p>
              Multi-page documents are downloaded together in a ZIP file, which
              keeps the page images organized and avoids downloading them one at
              a time. Open the ZIP after downloading to view or move the JPG files.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-5">
              <h3 className="font-bold">PDF is best for documents</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Keep the original PDF when selectable text, multiple pages, or
                printing quality matters.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-5">
              <h3 className="font-bold">JPG is best for compatibility</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Use JPG when a form or app asks for an image instead of a PDF,
                or when you need a quick visual preview.
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-6">
            <Link
              href="/blog/pdf-to-jpg-guide"
              className="font-semibold text-blue-400 hover:text-blue-300"
            >
              Read the PDF-to-JPG guide →
            </Link>
            <Link
              href="/jpg-to-pdf"
              className="font-semibold text-blue-400 hover:text-blue-300"
            >
              Turn JPG images back into a PDF →
            </Link>
          </div>
        </section>
        <RelatedTools
          title="Related PDF Tools"
          tools={[
            { name: "Compress PDF", href: "/compress-pdf" },
            { name: "Merge PDF", href: "/merge-pdf" },
            { name: "Split PDF", href: "/split-pdf" },
            { name: "JPG to PDF", href: "/jpg-to-pdf" },
            { name: "PDF Editor", href: "/pdf-editor" },
          ]}
        />
      </div>
    </main>
  );
}
