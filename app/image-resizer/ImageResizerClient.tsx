"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import ToolSeoSection from "@/components/ToolSeoSection";
import RelatedTools from "@/components/RelatedTools";

type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function extensionFor(type: OutputFormat) {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  return "jpg";
}

export default function ImageResizerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [lockRatio, setLockRatio] = useState(true);
  const [quality, setQuality] = useState(0.9);
  const [outputFormat, setOutputFormat] =
    useState<OutputFormat>("image/jpeg");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [finalSize, setFinalSize] = useState<number | null>(null);

  const activeUrl = useRef("");

  const aspectRatio = useMemo(() => {
    if (!originalWidth || !originalHeight) return 1;
    return originalWidth / originalHeight;
  }, [originalWidth, originalHeight]);

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

  async function chooseFile(event: ChangeEvent<HTMLInputElement>) {
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

    const sourceUrl = URL.createObjectURL(selectedFile);
    const image = new Image();

    try {
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () =>
          reject(new Error("The image could not be loaded."));
        image.src = sourceUrl;
      });

      setFile(selectedFile);
      setOriginalWidth(image.naturalWidth);
      setOriginalHeight(image.naturalHeight);
      setWidth(image.naturalWidth);
      setHeight(image.naturalHeight);

      if (selectedFile.type === "image/png") {
        setOutputFormat("image/png");
      } else if (selectedFile.type === "image/webp") {
        setOutputFormat("image/webp");
      } else {
        setOutputFormat("image/jpeg");
      }
    } catch (error) {
      setFile(null);
      setMessage(
        error instanceof Error ? error.message : "The image could not be loaded."
      );
    } finally {
      URL.revokeObjectURL(sourceUrl);
    }
  }

  function updateWidth(value: number) {
    const safeValue = Math.max(1, Math.round(value));
    setWidth(safeValue);

    if (lockRatio && aspectRatio) {
      setHeight(Math.max(1, Math.round(safeValue / aspectRatio)));
    }

    clearResult();
  }

  function updateHeight(value: number) {
    const safeValue = Math.max(1, Math.round(value));
    setHeight(safeValue);

    if (lockRatio && aspectRatio) {
      setWidth(Math.max(1, Math.round(safeValue * aspectRatio)));
    }

    clearResult();
  }

  function applyPreset(percent: number) {
    if (!originalWidth || !originalHeight) return;

    const nextWidth = Math.max(1, Math.round(originalWidth * percent));
    const nextHeight = Math.max(1, Math.round(originalHeight * percent));

    setWidth(nextWidth);
    setHeight(nextHeight);
    clearResult();
    setMessage("");
  }

  async function resizeImage() {
    if (!file || loading || width < 1 || height < 1) return;

    setLoading(true);
    clearResult();
    setMessage("Resizing your image...");

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

      canvas.width = width;
      canvas.height = height;

      if (outputFormat === "image/jpeg") {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, width, height);
      }

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.drawImage(image, 0, 0, width, height);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (result) => {
            if (result) resolve(result);
            else reject(new Error("Resizing failed."));
          },
          outputFormat,
          outputFormat === "image/png" ? undefined : quality
        );
      });

      const resultUrl = URL.createObjectURL(blob);
      activeUrl.current = resultUrl;

      setDownloadUrl(resultUrl);
      setFinalSize(blob.size);
      setMessage("Finished — your resized image is ready.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Resizing failed."
      );
    } finally {
      if (sourceUrl) URL.revokeObjectURL(sourceUrl);
      setLoading(false);
    }
  }

  const baseName =
    file?.name.replace(/\.[^.]+$/, "").trim() || "resized-image";

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
            <div className="text-5xl">📐</div>

            <h1 className="mt-4 text-4xl font-bold">
              Free Image Resizer
            </h1>

            <p className="mt-3 text-slate-400">
              Resize JPG, PNG, and WebP images by width and height.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950/40 p-10 text-center">
            <input
              id="resize-image-file"
              type="file"
              accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
              onChange={chooseFile}
              className="hidden"
            />

            <label
              htmlFor="resize-image-file"
              className="inline-block cursor-pointer rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
            >
              Choose Image
            </label>

            <p className="mt-4 text-sm text-slate-400">
              JPG, PNG, or WebP · Maximum 20 MB
            </p>

            {file && (
              <div className="mt-4 text-sm text-slate-300">
                <p className="break-all">{file.name}</p>
                <p className="mt-1">
                  {originalWidth} × {originalHeight} px · {formatBytes(file.size)}
                </p>
              </div>
            )}
          </div>

          {file && (
            <>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="resize-width"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Width (px)
                  </label>

                  <input
                    id="resize-width"
                    type="number"
                    min="1"
                    value={width}
                    onChange={(event) =>
                      updateWidth(Number(event.target.value))
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="resize-height"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Height (px)
                  </label>

                  <input
                    id="resize-height"
                    type="number"
                    min="1"
                    value={height}
                    onChange={(event) =>
                      updateHeight(Number(event.target.value))
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 text-white"
                  />
                </div>
              </div>

              <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-4">
                <input
                  type="checkbox"
                  checked={lockRatio}
                  onChange={(event) => setLockRatio(event.target.checked)}
                  className="h-5 w-5"
                />

                <span className="text-sm font-semibold text-slate-300">
                  Keep original aspect ratio
                </span>
              </label>

              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold">Quick resize</p>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => applyPreset(0.25)}
                    className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 hover:border-blue-500"
                  >
                    25%
                  </button>

                  <button
                    type="button"
                    onClick={() => applyPreset(0.5)}
                    className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 hover:border-blue-500"
                  >
                    50%
                  </button>

                  <button
                    type="button"
                    onClick={() => applyPreset(0.75)}
                    className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 hover:border-blue-500"
                  >
                    75%
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <label
                  htmlFor="resize-output-format"
                  className="mb-3 block text-sm font-semibold"
                >
                  Output format
                </label>

                <select
                  id="resize-output-format"
                  value={outputFormat}
                  onChange={(event) => {
                    setOutputFormat(event.target.value as OutputFormat);
                    clearResult();
                  }}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 text-white"
                >
                  <option value="image/jpeg">JPG</option>
                  <option value="image/png">PNG</option>
                  <option value="image/webp">WebP</option>
                </select>
              </div>

              {outputFormat !== "image/png" && (
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="resize-quality"
                      className="text-sm font-semibold"
                    >
                      Image quality
                    </label>

                    <span className="text-sm text-slate-400">
                      {Math.round(quality * 100)}%
                    </span>
                  </div>

                  <input
                    id="resize-quality"
                    type="range"
                    min="0.4"
                    max="1"
                    step="0.05"
                    value={quality}
                    onChange={(event) => {
                      setQuality(Number(event.target.value));
                      clearResult();
                    }}
                    className="mt-4 w-full"
                  />
                </div>
              )}

              <button
                type="button"
                onClick={resizeImage}
                disabled={loading}
                className="mt-8 w-full rounded-xl bg-blue-600 py-4 font-semibold hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
              >
                {loading ? "Resizing..." : "Resize Image"}
              </button>
            </>
          )}

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
                  {originalWidth} × {originalHeight}
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  {formatBytes(file.size)}
                </p>
              </div>

              <div className="rounded-xl bg-slate-950/60 p-4">
                <p className="text-xs text-slate-500">Resized</p>
                <p className="mt-1 font-semibold">
                  {width} × {height}
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  {formatBytes(finalSize)}
                </p>
              </div>
            </div>
          )}

          {downloadUrl && (
            <a
              href={downloadUrl}
              download={`${baseName}-${width}x${height}.${extensionFor(
                outputFormat
              )}`}
              className="mt-6 block rounded-xl border border-emerald-700 bg-emerald-950/30 px-6 py-4 text-center font-semibold text-emerald-300 hover:bg-emerald-950/50"
            >
              Download Resized Image
            </a>
          )}
        </section>

        <ToolSeoSection
          tool="Image Resizer"
          description="Resize JPG, PNG, and WebP images by entering custom pixel dimensions or using quick percentage presets. The tool works directly in your browser and supports multiple output formats."
          steps={[
            "Choose a JPG, PNG, or WebP image.",
            "Enter the new width and height or select a percentage preset.",
            "Keep the aspect ratio locked if you want to avoid distortion.",
            "Resize and download the finished image.",
          ]}
          benefits={[
            "Prepare images for websites, forms, email, and social media.",
            "Keep the original image proportions automatically.",
            "Convert the resized image to JPG, PNG, or WebP.",
            "No registration is required.",
          ]}
        />

        <RelatedTools
          title="Related Image Tools"
          tools={[
            { name: "Image Compressor", href: "/image-compressor" },
            { name: "WebP Converter", href: "/webp-converter" },
            { name: "Passport Photo", href: "/passport-photo" },
            { name: "JPG to PDF", href: "/jpg-to-pdf" },
          ]}
        />
      </div>
    </main>
  );
}
