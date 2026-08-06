"use client";

import { useState } from "react";
import Link from "next/link";
import ToolSeoSection from "@/components/ToolSeoSection";
import PdfUploader from "../../components/PdfUploader";

export default function PdfToJpgPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function convertPdf() {
    const file = files[0];

    if (!file) {
      setMessage("Please select one PDF file.");
      return;
    }

    setLoading(true);
    setMessage("Converting PDF pages to JPG...");

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
    } catch (error) {
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
              PDF to JPG
            </h1>

            <p className="mt-3 text-slate-400">
              Convert every PDF page into a high-quality JPG image.
            </p>
          </div>

          <PdfUploader
            files={files}
            onFilesChange={setFiles}
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
        />
      </div>
    </main>
  );
}
