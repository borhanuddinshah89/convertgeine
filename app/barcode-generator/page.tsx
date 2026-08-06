"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import ToolSeoSection from "@/components/ToolSeoSection";
import RelatedTools from "@/components/RelatedTools";

type BarcodeFormat =
  | "CODE128"
  | "CODE39"
  | "EAN13"
  | "EAN8"
  | "UPC"
  | "ITF14"
  | "codabar"
  | "CODE93";

const FORMATS: {
  value: BarcodeFormat;
  label: string;
  example: string;
  description: string;
}[] = [
  {
    value: "CODE128",
    label: "CODE 128",
    example: "ConvertGeine-123",
    description: "Flexible letters, numbers, and symbols.",
  },
  {
    value: "CODE39",
    label: "CODE 39",
    example: "CODE39-123",
    description: "Common letters, numbers, and selected symbols.",
  },
  {
    value: "EAN13",
    label: "EAN-13",
    example: "5901234123457",
    description: "13-digit retail product barcode.",
  },
  {
    value: "EAN8",
    label: "EAN-8",
    example: "96385074",
    description: "Compact 8-digit retail barcode.",
  },
  {
    value: "UPC",
    label: "UPC-A",
    example: "123456789012",
    description: "12-digit retail barcode commonly used in North America.",
  },
  {
    value: "ITF14",
    label: "ITF-14",
    example: "12345678901231",
    description: "14-digit shipping and packaging barcode.",
  },
  {
    value: "codabar",
    label: "Codabar",
    example: "A123456A",
    description: "Barcode format used by some libraries and laboratories.",
  },
  {
    value: "CODE93",
    label: "CODE 93",
    example: "CODE93",
    description: "Compact alphanumeric barcode.",
  },
];

export default function BarcodeGeneratorPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [value, setValue] = useState("ConvertGeine-123");
  const [format, setFormat] = useState<BarcodeFormat>("CODE128");
  const [barWidth, setBarWidth] = useState(2);
  const [barHeight, setBarHeight] = useState(100);
  const [fontSize, setFontSize] = useState(20);
  const [margin, setMargin] = useState(10);
  const [displayValue, setDisplayValue] = useState(true);
  const [lineColor, setLineColor] = useState("#000000");
  const [background, setBackground] = useState("#ffffff");
  const [message, setMessage] = useState("");

  function generateBarcode() {
    const canvas = canvasRef.current;

    if (!canvas) return;

    if (!value.trim()) {
      setMessage("Please enter a barcode value.");
      return;
    }

    try {
      JsBarcode(canvas, value.trim(), {
        format,
        width: barWidth,
        height: barHeight,
        displayValue,
        fontSize,
        margin,
        lineColor,
        background,
        valid(valid) {
          if (!valid) {
            throw new Error(
              `The entered value is not valid for ${format}.`
            );
          }
        },
      });

      setMessage("Your barcode is ready.");
    } catch (error) {
      const context = canvas.getContext("2d");

      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }

      setMessage(
        error instanceof Error
          ? error.message
          : "The barcode could not be generated."
      );
    }
  }

  useEffect(() => {
    generateBarcode();
    // Generate when the selected format changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format]);

  function selectFormat(nextFormat: BarcodeFormat) {
    const details = FORMATS.find((item) => item.value === nextFormat);

    setFormat(nextFormat);
    setValue(details?.example ?? "");
    setMessage("");
  }

  function downloadBarcode() {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `convertgeine-${format.toLowerCase()}-barcode.png`;

    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  const selectedFormat = FORMATS.find((item) => item.value === format);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          ← Back to home
        </Link>

        <section className="mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
          <div className="border-b border-slate-800 px-6 py-8 text-center sm:px-10">
            <div className="text-5xl" aria-hidden="true">
              ▥
            </div>

            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
              Free Barcode Generator
            </h1>

            <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-400">
              Create customizable barcodes and download them as PNG images.
            </p>
          </div>

          <div className="grid gap-8 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
            <div>
              <div>
                <label
                  htmlFor="barcode-format"
                  className="mb-2 block text-sm font-semibold"
                >
                  Barcode format
                </label>

                <select
                  id="barcode-format"
                  value={format}
                  onChange={(event) =>
                    selectFormat(event.target.value as BarcodeFormat)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 text-white"
                >
                  {FORMATS.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {selectedFormat?.description}
                </p>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="barcode-value"
                  className="mb-2 block text-sm font-semibold"
                >
                  Barcode value
                </label>

                <input
                  id="barcode-value"
                  type="text"
                  value={value}
                  onChange={(event) => {
                    setValue(event.target.value);
                    setMessage("");
                  }}
                  placeholder={selectedFormat?.example}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 text-white outline-none focus:border-blue-500"
                />

                <p className="mt-2 text-xs text-slate-500">
                  Example: {selectedFormat?.example}
                </p>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div>
                  <div className="flex justify-between text-sm">
                    <label htmlFor="barcode-width" className="font-semibold">
                      Bar width
                    </label>
                    <span className="text-slate-400">{barWidth}</span>
                  </div>

                  <input
                    id="barcode-width"
                    type="range"
                    min="1"
                    max="5"
                    step="0.5"
                    value={barWidth}
                    onChange={(event) => {
                      setBarWidth(Number(event.target.value));
                      setMessage("");
                    }}
                    className="mt-4 w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm">
                    <label htmlFor="barcode-height" className="font-semibold">
                      Bar height
                    </label>
                    <span className="text-slate-400">{barHeight}px</span>
                  </div>

                  <input
                    id="barcode-height"
                    type="range"
                    min="40"
                    max="200"
                    step="10"
                    value={barHeight}
                    onChange={(event) => {
                      setBarHeight(Number(event.target.value));
                      setMessage("");
                    }}
                    className="mt-4 w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm">
                    <label htmlFor="barcode-font-size" className="font-semibold">
                      Text size
                    </label>
                    <span className="text-slate-400">{fontSize}px</span>
                  </div>

                  <input
                    id="barcode-font-size"
                    type="range"
                    min="10"
                    max="36"
                    step="1"
                    value={fontSize}
                    onChange={(event) => {
                      setFontSize(Number(event.target.value));
                      setMessage("");
                    }}
                    className="mt-4 w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm">
                    <label htmlFor="barcode-margin" className="font-semibold">
                      Margin
                    </label>
                    <span className="text-slate-400">{margin}px</span>
                  </div>

                  <input
                    id="barcode-margin"
                    type="range"
                    min="0"
                    max="40"
                    step="2"
                    value={margin}
                    onChange={(event) => {
                      setMargin(Number(event.target.value));
                      setMessage("");
                    }}
                    className="mt-4 w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="barcode-line-colour"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Barcode colour
                  </label>

                  <input
                    id="barcode-line-colour"
                    type="color"
                    value={lineColor}
                    onChange={(event) => {
                      setLineColor(event.target.value);
                      setMessage("");
                    }}
                    className="h-14 w-full cursor-pointer rounded-xl border border-slate-700 bg-slate-950 p-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="barcode-background"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Background colour
                  </label>

                  <input
                    id="barcode-background"
                    type="color"
                    value={background}
                    onChange={(event) => {
                      setBackground(event.target.value);
                      setMessage("");
                    }}
                    className="h-14 w-full cursor-pointer rounded-xl border border-slate-700 bg-slate-950 p-2"
                  />
                </div>
              </div>

              <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-4">
                <input
                  type="checkbox"
                  checked={displayValue}
                  onChange={(event) => {
                    setDisplayValue(event.target.checked);
                    setMessage("");
                  }}
                  className="h-5 w-5"
                />

                <span className="text-sm font-semibold text-slate-300">
                  Display the value below the barcode
                </span>
              </label>

              <button
                type="button"
                onClick={generateBarcode}
                className="mt-8 w-full rounded-xl bg-blue-600 py-4 font-semibold transition hover:bg-blue-500"
              >
                Generate Barcode
              </button>

              {message && (
                <p
                  className="mt-5 rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-center text-sm text-slate-300"
                  aria-live="polite"
                >
                  {message}
                </p>
              )}
            </div>

            <div>
              <div className="flex min-h-[350px] items-center justify-center overflow-auto rounded-2xl border border-slate-700 bg-white p-6">
                <canvas
                  ref={canvasRef}
                  className="h-auto max-w-full"
                  aria-label="Generated barcode preview"
                />
              </div>

              <button
                type="button"
                onClick={downloadBarcode}
                className="mt-5 w-full rounded-xl border border-emerald-700 bg-emerald-950/30 py-4 font-semibold text-emerald-300 transition hover:bg-emerald-950/50"
              >
                Download PNG
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                Barcode generation happens directly in your browser.
              </p>
            </div>
          </div>
        </section>

        <ToolSeoSection
          tool="Barcode Generator"
          description="Create downloadable barcodes in CODE 128, CODE 39, EAN-13, EAN-8, UPC-A, ITF-14, Codabar, and CODE 93 formats. Customize the dimensions, colours, text, and margin before downloading a PNG image."
          steps={[
            "Select the barcode format you need.",
            "Enter a value that is valid for that format.",
            "Adjust the dimensions, colours, text, and margin.",
            "Generate and download the barcode as a PNG image.",
          ]}
          benefits={[
            "Create several common barcode formats.",
            "Customize barcode colours and dimensions.",
            "Download a clean PNG image.",
            "No registration is required.",
          ]}
        />

        <RelatedTools
          title="Related Tools"
          tools={[
            { name: "QR Code Generator", href: "/qr-code-generator" },
            { name: "Image Resizer", href: "/image-resizer" },
            { name: "Image Compressor", href: "/image-compressor" },
            { name: "WebP Converter", href: "/webp-converter" },
          ]}
        />
      </div>
    </main>
  );
}
