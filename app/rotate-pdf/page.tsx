"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import ToolSeoSection from "@/components/ToolSeoSection";
import RelatedTools from "@/components/RelatedTools";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function RotatePdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState(90);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  function clearResult() {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl("");
  }

  function chooseFile(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] ?? null;

    clearResult();
    setMessage("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const looksLikePdf =
      selectedFile.type === "application/pdf" ||
      selectedFile.name.toLowerCase().endsWith(".pdf");

    if (!looksLikePdf) {
      setFile(null);
      setMessage("Please choose a PDF file.");
      event.target.value = "";
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      setFile(null);
      setMessage("The PDF must be 50 MB or smaller.");
      event.target.value = "";
      return;
    }

    setFile(selectedFile);
  }

  async function rotatePdf() {
    if (!file || loading) return;

    setLoading(true);
    clearResult();
    setMessage("Rotating PDF pages...");

    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);

      pdf.getPages().forEach((page) => {
        const current = page.getRotation().angle;
        page.setRotation(degrees((current + rotation) % 360));
      });

      const output = await pdf.save();
      const blob = new Blob([output], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setMessage("Finished — your rotated PDF is ready.");
    } catch {
      setMessage("The PDF could not be rotated.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm font-medium text-blue-400 hover:text-blue-300">
          ← Back to home
        </Link>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          <div className="text-center">
            <div className="text-5xl">🔄</div>
            <h1 className="mt-4 text-4xl font-bold">Rotate PDF Online</h1>
            <p className="mt-3 text-slate-400">
              Rotate every page in a PDF by 90°, 180°, or 270°.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950/40 p-10 text-center">
            <input
              id="rotate-pdf-file"
              type="file"
              accept=".pdf,application/pdf"
              onChange={chooseFile}
              className="hidden"
            />

            <label
              htmlFor="rotate-pdf-file"
              className="inline-block cursor-pointer rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
            >
              Choose PDF
            </label>

            <p className="mt-4 text-sm text-slate-400">
              PDF files · Maximum 50 MB
            </p>

            {file && (
              <p className="mt-3 break-all text-sm text-slate-300">
                {file.name} · {formatBytes(file.size)}
              </p>
            )}
          </div>

          <div className="mt-8">
            <p className="mb-3 text-sm font-semibold">Rotation</p>

            <div className="grid grid-cols-3 gap-3">
              {[90, 180, 270].map((angle) => (
                <button
                  key={angle}
                  type="button"
                  onClick={() => setRotation(angle)}
                  className={`rounded-xl border px-4 py-4 font-semibold ${
                    rotation === angle
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-slate-700 bg-slate-950"
                  }`}
                >
                  {angle}°
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={rotatePdf}
            disabled={!file || loading}
            className="mt-8 w-full rounded-xl bg-blue-600 py-4 font-semibold hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-700"
          >
            {loading ? "Rotating..." : `Rotate PDF ${rotation}°`}
          </button>

          {message && (
            <p className="mt-5 rounded-xl bg-slate-950/60 px-4 py-3 text-center text-sm text-slate-300">
              {message}
            </p>
          )}

          {downloadUrl && file && (
            <a
              href={downloadUrl}
              download={`rotated-${file.name}`}
              className="mt-6 block rounded-xl border border-emerald-700 bg-emerald-950/30 px-6 py-4 text-center font-semibold text-emerald-300"
            >
              Download Rotated PDF
            </a>
          )}
        </section>

        <ToolSeoSection
          tool="Rotate PDF"
          description="Rotate PDF pages online by 90, 180, or 270 degrees. The tool processes the PDF directly in your browser and creates a new downloadable file."
          steps={[
            "Choose a PDF file.",
            "Select 90, 180, or 270 degrees.",
            "Click Rotate PDF.",
            "Download the rotated document.",
          ]}
          benefits={[
            "Fix sideways or upside-down PDF pages.",
            "Rotate all pages in one action.",
            "Process PDFs directly in your browser.",
            "No registration is required.",
          ]}
        />

        <RelatedTools
          title="Related PDF Tools"
          tools={[
            { name: "Compress PDF", href: "/compress-pdf" },
            { name: "Merge PDF", href: "/merge-pdf" },
            { name: "Split PDF", href: "/split-pdf" },
            { name: "PDF Editor", href: "/pdf-editor" },
          ]}
        />
      </div>
    </main>
  );
}
