"use client";

import { ChangeEvent, useState } from "react";

export default function CompressPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function chooseFile(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] ?? null;
    setFile(selectedFile);
    setMessage("");
  }

  async function compressPdf() {
    if (!file) return;

    setLoading(true);
    setMessage("Compressing...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/compress-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Compression failed.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `compressed-${file.name}`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
      setMessage("Finished! Your compressed PDF was downloaded.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Compression failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <a href="/" className="text-blue-400">
          ← Back to home
        </a>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <div className="text-center">
            <div className="text-5xl">📄</div>
            <h1 className="mt-4 text-4xl font-bold">Compress PDF</h1>
            <p className="mt-3 text-slate-400">
              Upload a PDF and reduce its file size.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border-2 border-dashed border-slate-700 p-10 text-center">
            <input
              id="pdf-file"
              type="file"
              accept="application/pdf"
              onChange={chooseFile}
              className="hidden"
            />

            <label
              htmlFor="pdf-file"
              className="cursor-pointer rounded-xl bg-blue-600 px-6 py-3 font-semibold"
            >
              Choose PDF
            </label>

            <p className="mt-5 text-sm text-slate-400">
              {file ? file.name : "PDF only — maximum 25 MB"}
            </p>
          </div>

          <button
            type="button"
            onClick={compressPdf}
            disabled={!file || loading}
            className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-semibold disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            {loading ? "Compressing..." : "Compress PDF"}
          </button>

          {message && (
            <p className="mt-5 text-center text-sm text-slate-300">
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
