"use client";

import Link from "next/link";
import { ChangeEvent, useMemo, useState } from "react";
import ToolSeoSection from "@/components/ToolSeoSection";
import RelatedTools from "@/components/RelatedTools";

type CompressionLevel = "maximum" | "balanced" | "quality";

const PRESETS = {
  maximum: {
    label: "Maximum compression",
    description: "Smallest file size with more visible quality reduction.",
    quality: 0.5,
  },
  balanced: {
    label: "Balanced",
    description: "Recommended balance between quality and file size.",
    quality: 0.72,
  },
  quality: {
    label: "Best quality",
    description: "Higher image quality with moderate compression.",
    quality: 0.86,
  },
} satisfies Record<
  CompressionLevel,
  {
    label: string;
    description: string;
    quality: number;
  }
>;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ImageCompressorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<CompressionLevel>("balanced");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [finalSize, setFinalSize] = useState<number | null>(null);

  const preset = useMemo(() => PRESETS[level], [level]);

  function chooseFile(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] ?? null;

    setMessage("");
    setDownloadUrl("");
    setFinalSize(null);

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
  }

  async function compressImage() {
    if (!file || loading) return;

    setLoading(true);
    setMessage("Compressing your image...");
    setDownloadUrl("");
    setFinalSize(null);

    try {
      const imageUrl = URL.createObjectURL(file);
      const image = new Image();

      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("The image could not be loaded."));
        image.src = imageUrl;
      });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Your browser could not process this image.");
      }

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      context.drawImage(image, 0, 0);

      const outputType =
        file.type === "image/png" ? "image/webp" : "image/jpeg";

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (result) => {
            if (result) resolve(result);
            else reject(new Error("Compression failed."));
          },
          outputType,
          preset.quality
        );
      });

      URL.revokeObjectURL(imageUrl);

      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setFinalSize(blob.size);

      const savedPercent = Math.max(
        0,
        Math.round((1 - blob.size / file.size) * 100)
      );

      setMessage(
        blob.size < file.size
          ? `Finished — image is ${savedPercent}% smaller.`
          : "The original image was already well optimized."
      );
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
        <Link
          href="/"
          className="text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          ← Back to home
        </Link>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          <div className="text-center">
            <div className="text-5xl">🗜️</div>

            <h1 className="mt-4 text-4xl font-bold">
              Free Image Compressor
            </h1>

            <p className="mt-3 text-slate-400">
              Compress JPG, PNG, and WebP images directly in your browser.
            </p>
          </div>

          <div className="mt-10">
            <p className="mb-3 text-sm font-semibold">
              Compression level
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              {(Object.keys(PRESETS) as CompressionLevel[]).map((option) => {
                const details = PRESETS[option];
                const selected = option === level;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setLevel(option)}
                    className={`rounded-2xl border p-4 text-left ${
                      selected
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-slate-700 bg-slate-950/40"
                    }`}
                  >
                    <span className="block font-semibold">
                      {details.label}
                    </span>

                    <span className="mt-2 block text-xs leading-5 text-slate-400">
                      {details.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950/40 p-10 text-center">
            <input
              id="image-file"
              type="file"
              accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
              onChange={chooseFile}
              className="hidden"
            />

            <label
              htmlFor="image-file"
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

          <button
            type="button"
            onClick={compressImage}
            disabled={!file || loading}
            className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-semibold hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            {loading ? "Compressing..." : `Compress Image — ${preset.label}`}
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
                <p className="text-xs text-slate-500">Compressed</p>
                <p className="mt-1 font-semibold">
                  {formatBytes(finalSize)}
                </p>
              </div>
            </div>
          )}

          {downloadUrl && file && (
            <a
              href={downloadUrl}
              download={`compressed-${file.name.replace(/\.[^.]+$/, "")}.jpg`}
              className="mt-6 block rounded-xl border border-emerald-700 bg-emerald-950/30 px-6 py-4 text-center font-semibold text-emerald-300 hover:bg-emerald-950/50"
            >
              Download Compressed Image
            </a>
          )}
        </section>

        <ToolSeoSection
          tool="Image Compressor"
          description="Reduce the file size of JPG, PNG, and WebP images directly in your browser. Smaller images are easier to upload, email, share, and use on websites."
          steps={[
            "Choose a JPG, PNG, or WebP image.",
            "Select the compression level you prefer.",
            "Click Compress Image.",
            "Review the size reduction and download the result.",
          ]}
          benefits={[
            "Make images easier to upload and share.",
            "Choose between smaller files and higher quality.",
            "Process images privately in your browser.",
            "No registration is required.",
          ]}
        />

        <RelatedTools
          title="Related Image and PDF Tools"
          tools={[
            { name: "Passport Photo", href: "/passport-photo" },
            { name: "JPG to PDF", href: "/jpg-to-pdf" },
            { name: "PDF to JPG", href: "/pdf-to-jpg" },
            { name: "Compress PDF", href: "/compress-pdf" },
          ]}
        />
      </div>
    </main>
  );
}
