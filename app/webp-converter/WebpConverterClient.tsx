"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ToolSeoSection from "@/components/ToolSeoSection";
import RelatedTools from "@/components/RelatedTools";

type OutputFormat = "image/webp" | "image/jpeg" | "image/png";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function extensionFor(type: OutputFormat) {
  if (type === "image/webp") return "webp";
  if (type === "image/png") return "png";
  return "jpg";
}

export default function WebpConverterPage() {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] =
    useState<OutputFormat>("image/webp");
  const [quality, setQuality] = useState(0.85);
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

    const supported =
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/webp" ||
      /\.(jpe?g|png|webp)$/i.test(selectedFile.name);

    if (!supported) {
      setFile(null);
      setMessage("Please choose a JPG, PNG, or WebP image.");
      event.target.value = "";
      return;
    }

    if (selectedFile.size > 20 * 1024 * 1024) {
      setFile(null);
      setMessage("The image must be 20 MB or smaller.");
      event.target.value = "";
      return;
    }

    setFile(selectedFile);

    if (selectedFile.type === "image/webp") {
      setOutputFormat("image/jpeg");
    } else {
      setOutputFormat("image/webp");
    }
  }

  async function convertImage() {
    if (!file || loading) return;

    setLoading(true);
    clearResult();
    setMessage("Converting your image...");

    let sourceUrl = "";

    try {
      sourceUrl = URL.createObjectURL(file);
      const image = new Image();

      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () =>
          reject(new Error("The image could not be loaded."));
        image.src = sourceUrl;
      });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Your browser could not process this image.");
      }

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      if (outputFormat === "image/jpeg") {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      context.drawImage(image, 0, 0);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (result) => {
            if (result) resolve(result);
            else reject(new Error("Conversion failed."));
          },
          outputFormat,
          outputFormat === "image/png" ? undefined : quality
        );
      });

      const resultUrl = URL.createObjectURL(blob);
      activeUrl.current = resultUrl;

      setDownloadUrl(resultUrl);
      setFinalSize(blob.size);
      setMessage("Finished — your converted image is ready.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Conversion failed."
      );
    } finally {
      if (sourceUrl) URL.revokeObjectURL(sourceUrl);
      setLoading(false);
    }
  }

  const baseName =
    file?.name.replace(/\.[^.]+$/, "").trim() || "converted-image";

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          ← Back to home
        </Link>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          <div className="text-center">
            <div className="text-5xl">🖼️</div>

            <h1 className="mt-4 text-4xl font-bold">
              Free WebP Image Converter
            </h1>

            <p className="mt-3 text-slate-400">
              Convert JPG or PNG to WebP, and WebP to JPG or PNG.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950/40 p-10 text-center">
            <input
              id="webp-image-file"
              type="file"
              accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
              onChange={chooseFile}
              className="hidden"
            />

            <label
              htmlFor="webp-image-file"
              className="inline-block cursor-pointer rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
            >
              Choose Image
            </label>

            <p className="mt-4 text-sm text-slate-400">
              JPG, PNG, or WebP · Maximum 20 MB
            </p>

            {file && (
              <p className="mt-3 break-all text-sm text-slate-300">
                {file.name} · {formatBytes(file.size)}
              </p>
            )}
          </div>

          <div className="mt-8">
            <label
              htmlFor="output-format"
              className="mb-3 block text-sm font-semibold"
            >
              Convert to
            </label>

            <select
              id="output-format"
              value={outputFormat}
              onChange={(event) => {
                setOutputFormat(event.target.value as OutputFormat);
                clearResult();
                setMessage("");
              }}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 text-white"
            >
              <option value="image/webp">WebP</option>
              <option value="image/jpeg">JPG</option>
              <option value="image/png">PNG</option>
            </select>
          </div>

          {outputFormat !== "image/png" && (
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="quality"
                  className="text-sm font-semibold"
                >
                  Image quality
                </label>

                <span className="text-sm text-slate-400">
                  {Math.round(quality * 100)}%
                </span>
              </div>

              <input
                id="quality"
                type="range"
                min="0.4"
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
            </div>
          )}

          <button
            type="button"
            onClick={convertImage}
            disabled={!file || loading}
            className="mt-8 w-full rounded-xl bg-blue-600 py-4 font-semibold hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            {loading
              ? "Converting..."
              : `Convert to ${extensionFor(outputFormat).toUpperCase()}`}
          </button>

          {message && (
            <p className="mt-5 rounded-xl bg-slate-950/60 px-4 py-3 text-center text-sm text-slate-300">
              {message}
            </p>
          )}

          {file && finalSize !== null && (
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-950/60 p-4">
                <p className="text-xs text-slate-500">Original</p>
                <p className="mt-1 font-semibold">
                  {formatBytes(file.size)}
                </p>
              </div>

              <div className="rounded-xl bg-slate-950/60 p-4">
                <p className="text-xs text-slate-500">Converted</p>
                <p className="mt-1 font-semibold">
                  {formatBytes(finalSize)}
                </p>
              </div>
            </div>
          )}

          {downloadUrl && (
            <a
              href={downloadUrl}
              download={`${baseName}.${extensionFor(outputFormat)}`}
              className="mt-6 block rounded-xl border border-emerald-700 bg-emerald-950/30 px-6 py-4 text-center font-semibold text-emerald-300 hover:bg-emerald-950/50"
            >
              Download Converted Image
            </a>
          )}
        </section>

        <ToolSeoSection
          tool="WebP Converter"
          description="Convert JPG and PNG images to WebP, or turn WebP images into JPG or PNG directly in your browser. WebP is useful for smaller website images, while JPG and PNG provide broad compatibility."
          steps={[
            "Choose a JPG, PNG, or WebP image.",
            "Select WebP, JPG, or PNG as the output format.",
            "Adjust quality when converting to WebP or JPG.",
            "Convert and download the finished image.",
          ]}
          benefits={[
            "Convert between widely used image formats.",
            "Create smaller WebP images for websites.",
            "Turn WebP files into compatible JPG or PNG files.",
            "Process images privately in your browser.",
          ]}
        />

        <RelatedTools
          title="Related Image Tools"
          tools={[
            { name: "Image Compressor", href: "/image-compressor" },
            { name: "Passport Photo", href: "/passport-photo" },
            { name: "JPG to PDF", href: "/jpg-to-pdf" },
            { name: "PDF to JPG", href: "/pdf-to-jpg" },
          ]}
        />
      </div>
    </main>
  );
}
