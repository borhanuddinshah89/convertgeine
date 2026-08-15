"use client";

import { useState } from "react";
import Link from "next/link";
import ToolSeoSection from "@/components/ToolSeoSection";
import RelatedTools from "@/components/RelatedTools";
import { trackToolEvent } from "@/lib/analytics";
import PdfUploader from "../../components/PdfUploader";

export default function MergePdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleFilesChange(nextFiles: File[]) {
    setFiles(nextFiles);

    if (nextFiles.length > files.length) {
      trackToolEvent("tool_file_selected", "merge_pdf", {
        file_count: nextFiles.length,
        total_size_bytes: nextFiles.reduce((total, file) => total + file.size, 0),
      });
    }
  }

  async function merge() {
    if (files.length < 2) {
      setMessage("Please select at least 2 PDF files.");
      return;
    }

    setLoading(true);
    setMessage("Merging your PDFs...");
    const startedAt = performance.now();
    const totalSizeBytes = files.reduce((total, file) => total + file.size, 0);
    trackToolEvent("tool_start", "merge_pdf", {
      file_count: files.length,
      total_size_bytes: totalSizeBytes,
    });

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
      trackToolEvent("tool_complete", "merge_pdf", {
        file_count: files.length,
        total_size_bytes: totalSizeBytes,
        output_size_bytes: blob.size,
        engagement_time_msec: Math.round(performance.now() - startedAt),
      });
    } catch (error) {
      trackToolEvent("tool_error", "merge_pdf");
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
              Merge PDF Files Online for Free
            </h1>

            <p className="mt-3 text-slate-400">
              Combine up to 10 PDFs into one organized document. Files are
              merged in the order you select them, with no signup required.
            </p>
          </div>

          <PdfUploader
            files={files}
            onFilesChange={handleFilesChange}
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
            "Choose files in the order you want them to appear.",
            "Click Merge PDF and download the combined document.",
          ]}
          benefits={[
            "Keep related documents together in one PDF.",
            "Make submissions and email attachments easier to manage.",
            "Preserve the order of your selected files.",
            "No registration is required.",
          ]}
          fileHandling="Your selected PDFs are sent securely to the merge service only to create the combined document. ConvertGeine does not intentionally retain the uploaded files or merged download."
        />

        <section className="mt-12 rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-2xl font-bold">
            Create one organized PDF for applications, reports, and records
          </h2>

          <div className="mt-4 space-y-4 leading-7 text-slate-300">
            <p>
              A single PDF is easier to upload, email, archive, and review than
              a group of separate documents. Merge application forms with
              supporting records, combine monthly statements, or collect report
              sections into one file without changing the originals.
            </p>
            <p>
              The tool places each complete PDF after the previous one. Select
              the files in the order they should appear. If the order is wrong,
              remove the files and select them again before merging.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-5">
              <h3 className="font-bold">Check before submitting</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Open the downloaded PDF and check its first page, last page,
                document order, orientation, and total page count.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-5">
              <h3 className="font-bold">Reduce the final file size</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                If the merged document is too large for an upload or email,
                run the completed file through the PDF compressor.
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-6">
            <Link
              href="/blog/how-to-merge-pdf"
              className="font-semibold text-blue-400 hover:text-blue-300"
            >
              Read the complete PDF merging guide →
            </Link>
            <Link
              href="/compress-pdf"
              className="font-semibold text-blue-400 hover:text-blue-300"
            >
              Compress the merged PDF →
            </Link>
          </div>
        </section>
        <RelatedTools
          title="Related PDF Tools"
          tools={[
            { name: "Compress PDF", href: "/compress-pdf" },
            { name: "Split PDF", href: "/split-pdf" },
            { name: "JPG to PDF", href: "/jpg-to-pdf" },
            { name: "PDF to JPG", href: "/pdf-to-jpg" },
            { name: "PDF Editor", href: "/pdf-editor" },
          ]}
        />
      </div>
    </main>
  );
}
