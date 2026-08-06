"use client";

import { useState } from "react";
import Link from "next/link";
import ToolSeoSection from "@/components/ToolSeoSection";
import PdfUploader from "../../components/PdfUploader";

export default function MergePdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function merge() {
    if (files.length < 2) {
      setMessage("Please select at least 2 PDF files.");
      return;
    }

    setLoading(true);
    setMessage("Merging your PDFs...");

    try {
      const form = new FormData();

      files.forEach((file) => {
        form.append("files", file);
      });

      const response = await fetch(
        "https://convertgeine-compressor.onrender.com/merge",
        {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        let errorMessage = "Merge failed.";

        try {
          const result = await response.json();
          errorMessage =
            result.detail ||
            result.error ||
            errorMessage;
        } catch {
          errorMessage = `Merge failed with status ${response.status}.`;
        }

        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "merged.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);

      setMessage("Finished! Your merged PDF was downloaded.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Merge failed."
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
            <div className="text-5xl">📚</div>

            <h1 className="mt-4 text-4xl font-bold">
              Merge PDF
            </h1>

            <p className="mt-3 text-slate-400">
              Combine multiple PDF files into one document.
            </p>
          </div>

          <PdfUploader
            files={files}
            onFilesChange={setFiles}
            multiple
            maximumFiles={10}
          />

          <button
            type="button"
            onClick={merge}
            disabled={loading || files.length < 2}
            className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            {loading
              ? "Merging..."
              : files.length < 2
              ? "Select at least 2 PDFs"
              : `Merge ${files.length} PDFs`}
          </button>

          {message && (
            <p className="mt-5 rounded-xl bg-slate-950/60 px-4 py-3 text-center text-sm text-slate-300">
              {message}
            </p>
          )}
        </div>
        <ToolSeoSection
          tool="Merge PDF"
          description="Combine multiple PDF files into one organized document. This is useful for applications, reports, contracts, receipts, school work, and any task where several PDFs need to be submitted together."
          steps={[
            "Choose two or more PDF files.",
            "Review the selected files and remove any you do not need.",
            "Arrange the files in the order you want.",
            "Click Merge PDF and download the combined document.",
          ]}
          benefits={[
            "Keep related documents together in one PDF.",
            "Make submissions and email attachments easier to manage.",
            "Preserve the order of your selected files.",
            "No registration is required.",
          ]}
        />
      </div>
    </main>
  );
}
