"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  PDFDocument,
  StandardFonts,
  degrees,
  rgb,
} from "pdf-lib";
import ToolSeoSection from "@/components/ToolSeoSection";
import RelatedTools from "@/components/RelatedTools";

type Position =
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function WatermarkPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [watermark, setWatermark] = useState("CONFIDENTIAL");
  const [opacity, setOpacity] = useState(30);
  const [rotation, setRotation] = useState(45);
  const [fontSize, setFontSize] = useState(48);
  const [position, setPosition] = useState<Position>("center");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

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

    if (selectedFile.size > 50 * 1024 * 1024) {
      setFile(null);
      setMessage("The PDF must be 50 MB or smaller.");
      event.target.value = "";
      return;
    }

    setFile(selectedFile);
  }

  function getPosition(
    width: number,
    height: number,
    textWidth: number,
    textHeight: number
  ) {
    const margin = 30;

    switch (position) {
      case "top-left":
        return {
          x: margin,
          y: height - textHeight - margin,
        };

      case "top-right":
        return {
          x: width - textWidth - margin,
          y: height - textHeight - margin,
        };

      case "bottom-left":
        return {
          x: margin,
          y: margin,
        };

      case "bottom-right":
        return {
          x: width - textWidth - margin,
          y: margin,
        };

      default:
        return {
          x: (width - textWidth) / 2,
          y: (height - textHeight) / 2,
        };
    }
  }

  async function addWatermark() {
    if (!file || loading) return;

    const cleanText = watermark.trim();

    if (!cleanText) {
      setMessage("Enter watermark text first.");
      return;
    }

    setLoading(true);
    clearResult();
    setMessage("Adding watermark to your PDF...");

    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);

      const font = await pdf.embedFont(StandardFonts.HelveticaBold);

      for (const page of pdf.getPages()) {
        const { width, height } = page.getSize();

        const textWidth = font.widthOfTextAtSize(
          cleanText,
          fontSize
        );

        const textHeight = font.heightAtSize(fontSize);

        const { x, y } = getPosition(
          width,
          height,
          textWidth,
          textHeight
        );

        page.drawText(cleanText, {
          x,
          y,
          size: fontSize,
          font,
          rotate: degrees(rotation),
          opacity: opacity / 100,
          color: rgb(0.45, 0.45, 0.45),
        });
      }

      const output = await pdf.save();

      const blob = new Blob(
        [new Uint8Array(output)],
        {
          type: "application/pdf",
        }
      );

      const url = URL.createObjectURL(blob);
      activeUrl.current = url;

      setDownloadUrl(url);
      setMessage(
        `Finished — watermark added to ${pdf.getPageCount()} page${
          pdf.getPageCount() === 1 ? "" : "s"
        }.`
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "The watermark could not be added."
      );
    } finally {
      setLoading(false);
    }
  }

  const outputName = file
    ? `watermarked-${file.name}`
    : "watermarked-document.pdf";

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          ← Back to home
        </Link>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8">
          <div className="text-center">
            <div className="text-5xl">💧</div>

            <h1 className="mt-4 text-4xl font-bold">
              Watermark PDF Online
            </h1>

            <p className="mt-3 text-slate-400">
              Add custom text watermarks to every page of your PDF.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950/40 p-10 text-center">
            <input
              id="watermark-pdf-file"
              type="file"
              accept=".pdf,application/pdf"
              onChange={chooseFile}
              className="hidden"
            />

            <label
              htmlFor="watermark-pdf-file"
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
            <label
              htmlFor="watermark-text"
              className="mb-2 block text-sm font-semibold"
            >
              Watermark text
            </label>

            <input
              id="watermark-text"
              type="text"
              value={watermark}
              onChange={(event) => {
                setWatermark(event.target.value);
                clearResult();
                setMessage("");
              }}
              placeholder="CONFIDENTIAL"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="watermark-position"
                className="mb-2 block text-sm font-semibold"
              >
                Position
              </label>

              <select
                id="watermark-position"
                value={position}
                onChange={(event) => {
                  setPosition(event.target.value as Position);
                  clearResult();
                }}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4"
              >
                <option value="center">Center</option>
                <option value="top-left">Top left</option>
                <option value="top-right">Top right</option>
                <option value="bottom-left">Bottom left</option>
                <option value="bottom-right">Bottom right</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="watermark-font-size"
                className="mb-2 block text-sm font-semibold"
              >
                Font size
              </label>

              <select
                id="watermark-font-size"
                value={fontSize}
                onChange={(event) => {
                  setFontSize(Number(event.target.value));
                  clearResult();
                }}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4"
              >
                <option value="24">24 px</option>
                <option value="36">36 px</option>
                <option value="48">48 px</option>
                <option value="64">64 px</option>
                <option value="80">80 px</option>
              </select>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-between text-sm">
              <label
                htmlFor="watermark-opacity"
                className="font-semibold"
              >
                Opacity
              </label>

              <span className="text-slate-400">
                {opacity}%
              </span>
            </div>

            <input
              id="watermark-opacity"
              type="range"
              min="10"
              max="100"
              step="5"
              value={opacity}
              onChange={(event) => {
                setOpacity(Number(event.target.value));
                clearResult();
              }}
              className="mt-4 w-full"
            />
          </div>

          <div className="mt-8">
            <div className="flex justify-between text-sm">
              <label
                htmlFor="watermark-rotation"
                className="font-semibold"
              >
                Rotation
              </label>

              <span className="text-slate-400">
                {rotation}°
              </span>
            </div>

            <input
              id="watermark-rotation"
              type="range"
              min="-90"
              max="90"
              step="5"
              value={rotation}
              onChange={(event) => {
                setRotation(Number(event.target.value));
                clearResult();
              }}
              className="mt-4 w-full"
            />
          </div>

          <button
            type="button"
            onClick={addWatermark}
            disabled={!file || loading}
            className="mt-10 w-full rounded-xl bg-blue-600 py-4 font-semibold hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            {loading
              ? "Adding Watermark..."
              : "Add Watermark"}
          </button>

          {message && (
            <p
              className="mt-5 rounded-xl bg-slate-950/60 px-4 py-3 text-center text-sm text-slate-300"
              aria-live="polite"
            >
              {message}
            </p>
          )}

          {downloadUrl && (
            <a
              href={downloadUrl}
              download={outputName}
              className="mt-6 block rounded-xl border border-emerald-700 bg-emerald-950/30 px-6 py-4 text-center font-semibold text-emerald-300 hover:bg-emerald-950/50"
            >
              Download Watermarked PDF
            </a>
          )}

          <div className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5">
            <h2 className="font-semibold text-blue-200">
              Browser-based processing
            </h2>

            <p className="mt-2 text-sm leading-6 text-blue-100/70">
              The watermark is added directly in your browser. The PDF
              does not need to be uploaded to ConvertGeine for this tool.
            </p>
          </div>
        </section>

        <ToolSeoSection
          tool="Watermark PDF"
          description="Add a custom text watermark to every page of a PDF online. Choose the watermark text, position, font size, transparency and rotation before downloading the finished PDF."
          steps={[
            "Choose the PDF you want to watermark.",
            "Enter your watermark text.",
            "Adjust the position, size, opacity and rotation.",
            "Add the watermark and download the finished PDF.",
          ]}
          benefits={[
            "Mark confidential or draft documents.",
            "Add the watermark to every page automatically.",
            "Customize watermark appearance and placement.",
            "Process the PDF directly in your browser.",
          ]}
        />

        <RelatedTools
          title="Related PDF Tools"
          tools={[
            { name: "Compress PDF", href: "/compress-pdf" },
            { name: "Rotate PDF", href: "/rotate-pdf" },
            { name: "Merge PDF", href: "/merge-pdf" },
            { name: "Split PDF", href: "/split-pdf" },
          ]}
        />
      </div>
    </main>
  );
}
