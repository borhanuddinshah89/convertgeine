"use client";

import { useState } from "react";
import PdfLayout from "@/components/pdf/PdfLayout";

export default function JpgToPngPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  async function convert() {
    if (!file) return;

    setMessage("Converting...");

    try {
      const bitmap = await createImageBitmap(file);

      const canvas = document.createElement("canvas");
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Canvas unavailable.");
      }

      ctx.drawImage(bitmap, 0, 0);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      if (!blob) {
        throw new Error("Conversion failed.");
      }

      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setMessage("PNG ready.");
    } catch {
      setMessage("Unable to convert image.");
    }
  }

  return (
    <PdfLayout
      icon="🖼️"
      title="JPG to PNG Converter"
      description="Convert JPG and JPEG images to PNG directly in your browser."
    >
      <input
        type="file"
        accept=".jpg,.jpeg,image/jpeg"
        onChange={(e) => {
          const selected = e.target.files?.[0] ?? null;
          setFile(selected);
          setDownloadUrl("");
          setMessage("");
        }}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4"
      />

      <button
        onClick={convert}
        disabled={!file}
        className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-bold hover:bg-blue-700 disabled:bg-slate-700"
      >
        Convert JPG to PNG
      </button>

      {message && (
        <p className="mt-4 text-center text-slate-300">
          {message}
        </p>
      )}

      {downloadUrl && (
        <a
          href={downloadUrl}
          download={
            file
              ? file.name.replace(/\.(jpg|jpeg)$/i, ".png")
              : "converted.png"
          }
          className="mt-6 block rounded-xl border border-emerald-700 bg-emerald-950/30 px-6 py-4 text-center font-semibold text-emerald-300"
        >
          Download PNG
        </a>
      )}
    </PdfLayout>
  );
}
