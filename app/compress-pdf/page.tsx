"use client";

import Link from "next/link";
import {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PDFDocument } from "pdf-lib";

type CompressionLevel = "maximum" | "balanced" | "quality";

type CompressionPreset = {
  label: string;
  description: string;
  renderScale: number;
  jpegQuality: number;
};

type ResultDetails = {
  originalSize: number;
  finalSize: number;
  savedPercent: number;
  compressed: boolean;
  pages: number;
};

const MAX_FILE_SIZE = 25 * 1024 * 1024;

const PRESETS: Record<CompressionLevel, CompressionPreset> = {
  maximum: {
    label: "Maximum compression",
    description: "Smallest file, suitable for email and online uploads.",
    renderScale: 1,
    jpegQuality: 0.5,
  },
  balanced: {
    label: "Balanced",
    description: "Recommended combination of quality and file size.",
    renderScale: 1.35,
    jpegQuality: 0.68,
  },
  quality: {
    label: "Best quality",
    description: "Sharper pages with a more moderate size reduction.",
    renderScale: 1.75,
    jpegQuality: 0.82,
  },
};

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  const unitIndex = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );

  const value = bytes / 1024 ** unitIndex;
  const decimals = unitIndex === 0 ? 0 : value >= 10 ? 1 : 2;

  return `${value.toFixed(decimals)} ${units[unitIndex]}`;
}

function bytesToArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return buffer;
}

function canvasToJpeg(
  canvas: HTMLCanvasElement,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("A PDF page could not be converted."));
        }
      },
      "image/jpeg",
      quality
    );
  });
}

export default function CompressPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<CompressionLevel>("balanced");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<ResultDetails | null>(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [downloadName, setDownloadName] = useState("");

  const activeUrl = useRef("");

  const preset = useMemo(() => PRESETS[level], [level]);

  useEffect(() => {
    return () => {
      if (activeUrl.current) {
        URL.revokeObjectURL(activeUrl.current);
      }
    };
  }, []);

  function clearResult() {
    if (activeUrl.current) {
      URL.revokeObjectURL(activeUrl.current);
      activeUrl.current = "";
    }

    setDownloadUrl("");
    setDownloadName("");
    setResult(null);
    setProgress(0);
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

    if (selectedFile.size === 0) {
      setFile(null);
      setMessage("The selected PDF is empty.");
      event.target.value = "";
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setFile(null);
      setMessage("The PDF must be 25 MB or smaller.");
      event.target.value = "";
      return;
    }

    setFile(selectedFile);
  }

  async function compressPdf() {
    if (!file || loading) return;

    setLoading(true);
    setProgress(0);
    setMessage("Reading your PDF...");
    clearResult();

    try {
      const pdfjs = await import("pdfjs-dist");

      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

      const originalBuffer = await file.arrayBuffer();

      // Keep one untouched copy for downloading if compression is ineffective.
      // PDF.js may transfer/detach the buffer passed to it.
      const originalBytes = new Uint8Array(originalBuffer);
      const pdfJsBytes = originalBytes.slice();

      const loadingTask = pdfjs.getDocument({
        data: pdfJsBytes,
        useWorkerFetch: true,
        isEvalSupported: false,
      });

      const sourcePdf = await loadingTask.promise;
      const outputPdf = await PDFDocument.create();

      for (let pageNumber = 1; pageNumber <= sourcePdf.numPages; pageNumber++) {
        setMessage(
          `Compressing page ${pageNumber} of ${sourcePdf.numPages}...`
        );

        const sourcePage = await sourcePdf.getPage(pageNumber);

        const pageViewport = sourcePage.getViewport({ scale: 1 });
        const renderViewport = sourcePage.getViewport({
          scale: preset.renderScale,
        });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d", {
          alpha: false,
          willReadFrequently: false,
        });

        if (!context) {
          throw new Error("Your browser could not process this PDF.");
        }

        canvas.width = Math.max(1, Math.ceil(renderViewport.width));
        canvas.height = Math.max(1, Math.ceil(renderViewport.height));

        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);

        await sourcePage.render({
          canvas,
          canvasContext: context,
          viewport: renderViewport,
          background: "#ffffff",
        }).promise;

        const jpegBlob = await canvasToJpeg(
          canvas,
          preset.jpegQuality
        );

        const jpegBytes = await jpegBlob.arrayBuffer();
        const embeddedImage = await outputPdf.embedJpg(jpegBytes);

        const outputPage = outputPdf.addPage([
          pageViewport.width,
          pageViewport.height,
        ]);

        outputPage.drawImage(embeddedImage, {
          x: 0,
          y: 0,
          width: pageViewport.width,
          height: pageViewport.height,
        });

        sourcePage.cleanup();
        canvas.width = 1;
        canvas.height = 1;

        setProgress(
          Math.round((pageNumber / sourcePdf.numPages) * 100)
        );

        // Allow the interface to update between pages.
        await new Promise<void>((resolve) => {
          window.setTimeout(resolve, 0);
        });
      }

      setMessage("Preparing your download...");

      const compressedBytes = await outputPdf.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 25,
      });

      if (typeof sourcePdf.destroy === "function") {
        await sourcePdf.destroy();
      }

      const compressionWasUseful =
        compressedBytes.byteLength > 0 &&
        compressedBytes.byteLength < originalBytes.byteLength;

      const finalBuffer = compressionWasUseful
        ? bytesToArrayBuffer(compressedBytes)
        : bytesToArrayBuffer(originalBytes);

      const finalSize = finalBuffer.byteLength;
      const savedPercent = compressionWasUseful
        ? Math.max(
            0,
            Math.round(
              (1 - finalSize / originalBytes.byteLength) * 100
            )
          )
        : 0;

      const outputBlob = new Blob([finalBuffer], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(outputBlob);
      activeUrl.current = url;

      const baseName =
        file.name.replace(/\.pdf$/i, "").trim() || "document";

      setDownloadUrl(url);
      setDownloadName(`compressed-${baseName}.pdf`);
      setResult({
        originalSize: originalBytes.byteLength,
        finalSize,
        savedPercent,
        compressed: compressionWasUseful,
        pages: sourcePdf.numPages,
      });

      if (compressionWasUseful) {
        setMessage(
          `Finished — your PDF is ${savedPercent}% smaller.`
        );
      } else {
        setMessage(
          "This PDF was already highly optimized. The original file was preserved because recompressing it would make it larger."
        );
      }
    } catch (error) {
      console.error("PDF compression failed:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "The PDF could not be compressed.";

      const normalizedMessage = errorMessage.toLowerCase();

      if (
        normalizedMessage.includes("password") ||
        normalizedMessage.includes("encrypted")
      ) {
        setMessage(
          "Password-protected or encrypted PDFs are not currently supported."
        );
      } else if (
        normalizedMessage.includes("invalid") ||
        normalizedMessage.includes("format")
      ) {
        setMessage(
          "The selected file appears to be damaged or is not a supported PDF."
        );
      } else {
        setMessage(errorMessage);
      }

      setProgress(0);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition hover:text-blue-300"
        >
          <span aria-hidden="true">←</span>
          Back to home
        </Link>

        <section className="mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/20">
          <div className="border-b border-slate-800 px-6 py-8 text-center sm:px-10">
            <div className="text-5xl" aria-hidden="true">
              📄
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Compress PDF
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
              Reduce the size of scanned and image-heavy PDF files.
              Processing happens privately in your browser.
            </p>
          </div>

          <div className="space-y-7 p-6 sm:p-10">
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-200">
                Compression level
              </label>

              <div className="grid gap-3 sm:grid-cols-3">
                {(Object.keys(PRESETS) as CompressionLevel[]).map(
                  (option) => {
                    const details = PRESETS[option];
                    const selected = level === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setLevel(option);
                          clearResult();
                          setMessage("");
                        }}
                        disabled={loading}
                        className={`rounded-2xl border p-4 text-left transition ${
                          selected
                            ? "border-blue-500 bg-blue-500/10 ring-1 ring-blue-500"
                            : "border-slate-700 bg-slate-950/40 hover:border-slate-600"
                        } disabled:cursor-not-allowed disabled:opacity-60`}
                      >
                        <span className="block text-sm font-semibold text-white">
                          {details.label}
                        </span>
                        <span className="mt-2 block text-xs leading-5 text-slate-400">
                          {details.description}
                        </span>
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            <div className="rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950/30 p-8 text-center transition hover:border-slate-600 sm:p-10">
              <input
                id="pdf-file"
                type="file"
                accept="application/pdf,.pdf"
                onChange={chooseFile}
                disabled={loading}
                className="hidden"
              />

              <label
                htmlFor="pdf-file"
                className={`inline-flex rounded-xl px-6 py-3 font-semibold transition ${
                  loading
                    ? "cursor-not-allowed bg-slate-700 text-slate-400"
                    : "cursor-pointer bg-blue-600 hover:bg-blue-500"
                }`}
              >
                Choose PDF
              </label>

              <p className="mt-5 break-all text-sm text-slate-300">
                {file ? file.name : "Select one PDF file"}
              </p>

              <p className="mt-2 text-xs text-slate-500">
                PDF only · Maximum 25 MB · Files remain on your device
              </p>

              {file && (
                <p className="mt-2 text-xs font-medium text-blue-300">
                  Original size: {formatBytes(file.size)}
                </p>
              )}
            </div>

            {loading && (
              <div
                className="rounded-2xl border border-slate-700 bg-slate-950/40 p-4"
                aria-live="polite"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-200">
                    Compressing
                  </span>
                  <span className="text-slate-400">{progress}%</span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={compressPdf}
              disabled={!file || loading}
              className="w-full rounded-xl bg-blue-600 py-4 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
            >
              {loading
                ? `Compressing${progress ? ` — ${progress}%` : "..."}`
                : `Compress PDF — ${preset.label}`}
            </button>

            {message && (
              <p
                className="rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-center text-sm leading-6 text-slate-300"
                aria-live="polite"
              >
                {message}
              </p>
            )}

            {result && downloadUrl && (
              <div className="rounded-2xl border border-emerald-800/60 bg-emerald-950/20 p-5">
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">
                    {result.compressed ? "✅" : "ℹ️"}
                  </span>
                  <div>
                    <h2 className="font-semibold text-white">
                      {result.compressed
                        ? "Compression complete"
                        : "Already optimized"}
                    </h2>
                    <p className="mt-1 text-xs text-slate-400">
                      {result.pages} page
                      {result.pages === 1 ? "" : "s"} processed
                    </p>
                  </div>
                </div>

                <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                  <div className="rounded-xl bg-slate-950/50 p-3">
                    <dt className="text-xs text-slate-500">
                      Original
                    </dt>
                    <dd className="mt-1 font-semibold">
                      {formatBytes(result.originalSize)}
                    </dd>
                  </div>

                  <div className="rounded-xl bg-slate-950/50 p-3">
                    <dt className="text-xs text-slate-500">
                      Download
                    </dt>
                    <dd className="mt-1 font-semibold">
                      {formatBytes(result.finalSize)}
                    </dd>
                  </div>

                  <div className="col-span-2 rounded-xl bg-slate-950/50 p-3 sm:col-span-1">
                    <dt className="text-xs text-slate-500">
                      Saved
                    </dt>
                    <dd className="mt-1 font-semibold text-emerald-300">
                      {result.savedPercent}%
                    </dd>
                  </div>
                </dl>

                <a
                  href={downloadUrl}
                  download={downloadName}
                  className="mt-5 flex w-full items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-500"
                >
                  Download PDF
                </a>
              </div>
            )}

            <div className="rounded-2xl border border-amber-900/50 bg-amber-950/20 p-4 text-xs leading-5 text-amber-100/80">
              <strong className="text-amber-200">Please note:</strong>{" "}
              very small or already optimized PDFs may not become
              smaller. Scanned and image-heavy documents normally
              achieve the greatest reduction.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
