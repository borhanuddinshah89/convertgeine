"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import PdfLayout from "@/components/pdf/PdfLayout";
import PdfUploader from "@/components/pdf/PdfUploader";
import PdfDownload from "@/components/pdf/PdfDownload";
import PdfSeo from "@/components/pdf/PdfSeo";

export default function ExtractPdfPagesPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState("");
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  async function processPdf() {
    if (!file) return;

    try {
      const bytes = await file.arrayBuffer();
      const source = await PDFDocument.load(bytes);

      const total = source.getPageCount();

      const selected = Array.from(
        new Set(
          pages
            .split(",")
            .map((p) => Number(p.trim()) - 1)
            .filter(
              (n) =>
                Number.isInteger(n) &&
                n >= 0 &&
                n < total
            )
        )
      );

      if (selected.length === 0) {
        setMessage("Enter valid page numbers.");
        return;
      }

      const outputPdf = await PDFDocument.create();
      const copiedPages = await outputPdf.copyPages(
        source,
        selected
      );

      copiedPages.forEach((page) =>
        outputPdf.addPage(page)
      );

      const output = await outputPdf.save();

      const blob = new Blob(
        [output as BlobPart],
        { type: "application/pdf" }
      );

      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setMessage(
        `${selected.length} page${
          selected.length === 1 ? "" : "s"
        } extracted.`
      );
    } catch {
      setMessage("Unable to extract PDF pages.");
    }
  }

  return (
    <PdfLayout
      icon="📤"
      title="Extract PDF Pages"
      description="Create a new PDF using only the pages you choose."
    >
      <PdfUploader
        file={file}
        onFile={setFile}
        onError={setMessage}
      />

      <input
        value={pages}
        onChange={(e) => {
          setPages(e.target.value);
          setDownloadUrl("");
          setMessage("");
        }}
        placeholder="Example: 1,3,5"
        className="mt-6 w-full rounded-xl border border-slate-700 bg-slate-950 p-4"
      />

      <p className="mt-2 text-sm text-slate-500">
        Enter page numbers separated by commas.
      </p>

      <button
        onClick={processPdf}
        disabled={!file}
        className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-bold hover:bg-blue-700 disabled:bg-slate-700"
      >
        Extract Pages
      </button>

      {message && (
        <p className="mt-4 text-center">
          {message}
        </p>
      )}

      {downloadUrl && (
        <PdfDownload
          href={downloadUrl}
          filename="extracted-pages.pdf"
        />
      )}

      <PdfSeo
        tool="Extract PDF Pages"
        description="Extract selected pages from a PDF and create a new PDF online."
      />
    </PdfLayout>
  );
}
