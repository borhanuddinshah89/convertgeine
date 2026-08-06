"use client";

import { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import PdfLayout from "@/components/pdf/PdfLayout";
import PdfUploader from "@/components/pdf/PdfUploader";
import PdfDownload from "@/components/pdf/PdfDownload";
import PdfSeo from "@/components/pdf/PdfSeo";

type Position = "bottom-center" | "bottom-right" | "top-center" | "top-right";

export default function PageNumberPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [startAt, setStartAt] = useState(1);
  const [fontSize, setFontSize] = useState(12);
  const [position, setPosition] = useState<Position>("bottom-center");
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  async function addPageNumbers() {
    if (!file) return;

    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const font = await pdf.embedFont(StandardFonts.Helvetica);

      pdf.getPages().forEach((page, index) => {
        const { width, height } = page.getSize();
        const text = String(startAt + index);
        const textWidth = font.widthOfTextAtSize(text, fontSize);

        let x = (width - textWidth) / 2;
        let y = 24;

        if (position === "bottom-right") {
          x = width - textWidth - 24;
          y = 24;
        }

        if (position === "top-center") {
          x = (width - textWidth) / 2;
          y = height - fontSize - 24;
        }

        if (position === "top-right") {
          x = width - textWidth - 24;
          y = height - fontSize - 24;
        }

        page.drawText(text, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(0.2, 0.2, 0.2),
        });
      });

      const output = await pdf.save();

      const blob = new Blob(
        [output as BlobPart],
        { type: "application/pdf" }
      );

      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setMessage("Page numbers added.");
    } catch {
      setMessage("Unable to add page numbers.");
    }
  }

  return (
    <PdfLayout
      icon="🔢"
      title="Add Page Numbers to PDF"
      description="Add page numbers to every page of a PDF."
    >
      <PdfUploader
        file={file}
        onFile={setFile}
        onError={setMessage}
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Start numbering at
          </label>

          <input
            type="number"
            min="1"
            value={startAt}
            onChange={(e) => setStartAt(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Font size
          </label>

          <select
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4"
          >
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="14">14</option>
            <option value="16">16</option>
            <option value="18">18</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-semibold">
          Position
        </label>

        <select
          value={position}
          onChange={(e) => setPosition(e.target.value as Position)}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4"
        >
          <option value="bottom-center">Bottom center</option>
          <option value="bottom-right">Bottom right</option>
          <option value="top-center">Top center</option>
          <option value="top-right">Top right</option>
        </select>
      </div>

      <button
        onClick={addPageNumbers}
        disabled={!file}
        className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-bold hover:bg-blue-700 disabled:bg-slate-700"
      >
        Add Page Numbers
      </button>

      {message && (
        <p className="mt-4 text-center">
          {message}
        </p>
      )}

      {downloadUrl && (
        <PdfDownload
          href={downloadUrl}
          filename="numbered-pages.pdf"
        />
      )}

      <PdfSeo
        tool="Add Page Numbers to PDF"
        description="Add page numbers to PDF files online with custom starting number, size and position."
      />
    </PdfLayout>
  );
}
