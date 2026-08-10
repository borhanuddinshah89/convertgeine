"use client";

import { ChangeEvent, useState } from "react";
import Link from "next/link";
import ToolSeoSection from "@/components/ToolSeoSection";
import RelatedTools from "@/components/RelatedTools";
import { trackToolEvent } from "@/lib/analytics";

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function JpgToPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function chooseFiles(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []).filter(
      (file) =>
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.name.toLowerCase().endsWith(".jpg") ||
        file.name.toLowerCase().endsWith(".jpeg") ||
        file.name.toLowerCase().endsWith(".png")
    );

    setFiles((currentFiles) => [...currentFiles, ...selectedFiles].slice(0, 20));
    setMessage(
      files.length + selectedFiles.length > 20
        ? "A maximum of 20 images can be included in one PDF."
        : ""
    );
    event.target.value = "";
  }

  function removeFile(indexToRemove: number) {
    setFiles((currentFiles) =>
      currentFiles.filter((_, index) => index !== indexToRemove)
    );
  }

  function moveFile(index: number, direction: -1 | 1) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= files.length) return;

    setFiles((currentFiles) => {
      const reordered = [...currentFiles];
      [reordered[index], reordered[newIndex]] = [
        reordered[newIndex],
        reordered[index],
      ];
      return reordered;
    });
  }

  async function convertToPdf() {
    if (files.length === 0) {
      setMessage("Please choose at least one image.");
      return;
    }

    setLoading(true);
    setMessage("Creating your PDF...");
    trackToolEvent("tool_start", "jpg_to_pdf", { file_count: files.length });

    try {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/jpg-to-pdf", {
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
      link.download = "images.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
      setMessage("Finished! Your PDF was downloaded.");
      trackToolEvent("tool_complete", "jpg_to_pdf", { file_count: files.length });
    } catch (error) {
      trackToolEvent("tool_error", "jpg_to_pdf");
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
            <div className="text-5xl">📄</div>

            <h1 className="mt-4 text-4xl font-bold">Free JPG to PDF Converter</h1>

            <p className="mt-3 text-slate-400">
              Combine up to 20 JPG and PNG images into one PDF in the order you choose. No registration required.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950/40 p-10 text-center">
            <input
              id="image-files"
              type="file"
              accept="image/jpeg,image/png,.jpg,.jpeg,.png"
              multiple
              onChange={chooseFiles}
              className="hidden"
            />

            <label
              htmlFor="image-files"
              className="inline-block cursor-pointer rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
            >
              Choose Images
            </label>

            <p className="mt-4 text-sm text-slate-400">
              JPG and PNG · Up to 20 images · Maximum 15 MB each
            </p>
          </div>

          {files.length > 0 && (
            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-semibold">
                  Selected images ({files.length})
                </p>

                <button
                  type="button"
                  onClick={() => setFiles([])}
                  className="text-sm text-slate-400 hover:text-red-300"
                >
                  Clear all
                </button>
              </div>

              <div className="space-y-3">
                {files.map((file, index) => (
                  <div
                    key={`${file.name}-${file.size}-${index}`}
                    className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4"
                  >
                    <div className="text-2xl">🖼️</div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{file.name}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>

                    <div className="flex gap-1" aria-label={`Change the order of ${file.name}`}>
                      <button
                        type="button"
                        onClick={() => moveFile(index, -1)}
                        disabled={index === 0}
                        className="rounded-lg px-2 py-2 text-slate-300 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label={`Move ${file.name} up`}
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveFile(index, 1)}
                        disabled={index === files.length - 1}
                        className="rounded-lg px-2 py-2 text-slate-300 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30"
                        aria-label={`Move ${file.name} down`}
                      >
                        ↓
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="rounded-lg px-3 py-2 text-slate-400 hover:bg-red-500/10 hover:text-red-300"
                      aria-label={`Remove ${file.name}`}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={convertToPdf}
            disabled={loading || files.length === 0}
            className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            {loading ? "Creating PDF..." : `Create PDF from ${files.length} image${files.length === 1 ? "" : "s"}`}
          </button>

          {message && (
            <p className="mt-5 rounded-xl bg-slate-950/60 px-4 py-3 text-center text-sm text-slate-300">
              {message}
            </p>
          )}
        </div>

        <ToolSeoSection
          tool="JPG to PDF Converter"
          description="Combine JPG and PNG images into one PDF document online. This is useful for applications, receipts, scanned pages, photos, and documents that need to be shared as a single file."
          steps={[
            "Choose one or more JPG or PNG images.",
            "Use the arrow buttons to arrange the images in your preferred page order.",
            "Review the list and remove any images you do not need.",
            "Click Create PDF.",
            "Download the finished PDF to your device.",
          ]}
          benefits={[
            "Combine multiple images into one organized PDF.",
            "Create files that are easier to email and submit.",
            "Use the tool on desktop, tablet, or mobile.",
            "No registration is required.",
          ]}
          fileHandling="Your selected images are sent securely to the conversion service only to create the PDF. ConvertGeine does not intentionally store the uploaded images or finished document."
        />

        <section className="mt-12 rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-2xl font-bold">Turn photos and scans into one organized PDF</h2>
          <div className="mt-4 space-y-4 leading-7 text-slate-300">
            <p>
              A single PDF is easier to upload, email and review than a folder of separate images. Use this converter for photographed forms, receipts, class notes, application documents and scanned pages.
            </p>
            <p>
              Each image becomes one A4-size PDF page and is scaled to fit without stretching. Portrait and landscape images keep their original proportions, and the order shown above becomes the page order in the downloaded PDF.
            </p>
          </div>
        </section>
        <RelatedTools
          title="Related PDF Tools"
          tools={[
            { name: "Compress PDF", href: "/compress-pdf" },
            { name: "Merge PDF", href: "/merge-pdf" },
            { name: "Split PDF", href: "/split-pdf" },
            { name: "PDF to JPG", href: "/pdf-to-jpg" },
            { name: "PDF Editor", href: "/pdf-editor" },
          ]}
        />
      </div>
    </main>
  );
}
