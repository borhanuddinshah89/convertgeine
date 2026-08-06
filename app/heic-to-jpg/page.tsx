"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ToolSeoSection from "@/components/ToolSeoSection";
import RelatedTools from "@/components/RelatedTools";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function HeicToJpgPage() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.9);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [finalSize, setFinalSize] = useState<number | null>(null);

  const activeUrl = useRef("");

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
    setFinalSize(null);
  }

  function chooseFile(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] ?? null;

    clearResult();
    setMessage("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const name = selectedFile.name.toLowerCase();

    const supported =
      selectedFile.type === "image/heic" ||
      selectedFile.type === "image/heif" ||
      name.endsWith(".heic") ||
      name.endsWith(".heif");

    if (!supported) {
      setFile(null);
      setMessage("Please choose a HEIC or HEIF image.");
      event.target.value = "";
      return;
    }

    if (selectedFile.size > 30 * 1024 * 1024) {
      setFile(null);
      setMessage("The image must be 30 MB or smaller.");
      event.target.value = "";
      return;
    }

    setFile(selectedFile);
  }

  async function convertToJpg() {
    if (!file || loading) return;

    setLoading(true);
    clearResult();
    setMessage("Converting your HEIC image...");

    try {
      const heic2anyModule = await import("heic2any");
      const heic2any = heic2anyModule.default;

      const result = await heic2any({
        blob: file,
        toType: "image/jpeg",
        quality,
      });

      const outputBlob = Array.isArray(result)
        ? result[0]
        : result;

      if (!outputBlob) {
        throw new Error("The HEIC image could not be converted.");
      }

      const url = URL.createObjectURL(outputBlob);
      activeUrl.current = url;

      setDownloadUrl(url);
      setFinalSize(outputBlob.size);
      setMessage("Finished — your JPG image is ready.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "HEIC conversion failed."
      );
    } finally {
      setLoading(false);
    }
  }

  const baseName =
    file?.name.replace(/\.(heic|heif)$/i, "").trim() ||
    "converted-image";

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          ← Back to home
        </Link>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          <div className="text-center">
            <div className="text-5xl">📱</div>

            <h1 className="mt-4 text-4xl font-bold">
              HEIC to JPG Converter
            </h1>

            <p className="mt-3 text-slate-400">
              Convert HEIC and HEIF photos to JPG directly in your browser.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950/40 p-10 text-center">
            <input
              id="heic-file"
              type="file"
              accept=".heic,.heif,image/heic,image/heif"
              onChange={chooseFile}
              className="hidden"
            />

            <label
              htmlFor="heic-file"
              className="inline-block cursor-pointer rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
            >
              Choose HEIC Image
            </label>

            <p className="mt-4 text-sm text-slate-400">
              HEIC or HEIF · Maximum 30 MB
            </p>

            {file && (
              <div className="mt-4">
                <p className="break-all text-sm text-slate-300">
                  {file.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {formatBytes(file.size)}
                </p>
              </div>
            )}
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label
                htmlFor="jpg-quality"
                className="text-sm font-semibold"
              >
                JPG quality
              </label>

              <span className="text-sm text-slate-400">
                {Math.round(quality * 100)}%
              </span>
            </div>

            <input
              id="jpg-quality"
              type="range"
              min="0.5"
              max="1"
              step="0.05"
              value={quality}
              onChange={(event) => {
                setQuality(Number(event.target.value));
                clearResult();
                setMessage("");
              }}
              className="mt-4 w-full"
            />

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Higher quality produces a larger JPG file.
            </p>
          </div>

          <button
            type="button"
            onClick={convertToJpg}
            disabled={!file || loading}
            className="mt-8 w-full rounded-xl bg-blue-600 py-4 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            {loading ? "Converting..." : "Convert HEIC to JPG"}
          </button>

          {message && (
            <p
              className="mt-5 rounded-xl bg-slate-950/60 px-4 py-3 text-center text-sm text-slate-300"
              aria-live="polite"
            >
              {message}
            </p>
          )}

          {file && finalSize !== null && (
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-950/60 p-4">
                <p className="text-xs text-slate-500">Original HEIC</p>
                <p className="mt-1 font-semibold">
                  {formatBytes(file.size)}
                </p>
              </div>

              <div className="rounded-xl bg-slate-950/60 p-4">
                <p className="text-xs text-slate-500">Converted JPG</p>
                <p className="mt-1 font-semibold">
                  {formatBytes(finalSize)}
                </p>
              </div>
            </div>
          )}

          {downloadUrl && (
            <a
              href={downloadUrl}
              download={`${baseName}.jpg`}
              className="mt-6 block rounded-xl border border-emerald-700 bg-emerald-950/30 px-6 py-4 text-center font-semibold text-emerald-300 hover:bg-emerald-950/50"
            >
              Download JPG
            </a>
          )}

          <div className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5">
            <h2 className="font-semibold text-blue-200">
              Private browser conversion
            </h2>

            <p className="mt-2 text-sm leading-6 text-blue-100/70">
              HEIC conversion is processed in your browser. Your image does not
              need to be sent to ConvertGeine's server for conversion.
            </p>
          </div>
        </section>

        <ToolSeoSection
          tool="HEIC to JPG Converter"
          description="Convert HEIC and HEIF photos into widely supported JPG images. This is useful for iPhone photos that need to be uploaded to websites, applications, email, or services that do not accept HEIC."
          steps={[
            "Choose a HEIC or HEIF image from your device.",
            "Select the JPG quality you prefer.",
            "Click Convert HEIC to JPG.",
            "Download the converted JPG image.",
          ]}
          benefits={[
            "Convert iPhone HEIC photos to widely supported JPG files.",
            "Choose the balance between image quality and file size.",
            "Process images directly in your browser.",
            "No registration is required.",
          ]}
        />

        <RelatedTools
          title="Related Image Tools"
          tools={[
            { name: "Image Compressor", href: "/image-compressor" },
            { name: "Image Resizer", href: "/image-resizer" },
            { name: "WebP Converter", href: "/webp-converter" },
            { name: "Passport Photo", href: "/passport-photo" },
          ]}
        />
      </div>
    </main>
  );
}
