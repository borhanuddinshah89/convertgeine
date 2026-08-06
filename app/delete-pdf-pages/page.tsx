"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import PdfLayout from "@/components/pdf/PdfLayout";
import PdfUploader from "@/components/pdf/PdfUploader";
import PdfDownload from "@/components/pdf/PdfDownload";
import PdfSeo from "@/components/pdf/PdfSeo";

export default function DeletePdfPagesPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState("");
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  async function processPdf() {
    if (!file) return;

    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);

      const total = pdf.getPageCount();

      const remove = pages
        .split(",")
        .map((p) => Number(p.trim()) - 1)
        .filter((n) => !Number.isNaN(n))
        .sort((a, b) => b - a);

      for (const page of remove) {
        if (page >= 0 && page < total) {
          pdf.removePage(page);
        }
      }

      const output = await pdf.save();

      const blob = new Blob([output as BlobPart], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setMessage("PDF ready.");
    } catch {
      setMessage("Unable to process PDF.");
    }
  }

  return (
    <PdfLayout
      icon="🗑️"
      title="Delete PDF Pages"
      description="Remove selected pages from a PDF."
    >
      <PdfUploader
        file={file}
        onFile={setFile}
        onError={setMessage}
      />

      <input
        value={pages}
        onChange={(e) => setPages(e.target.value)}
        placeholder="Example: 2,5,8"
        className="mt-6 w-full rounded-xl border border-slate-700 bg-slate-950 p-4"
      />

      <button
        onClick={processPdf}
        className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-bold hover:bg-blue-700"
      >
        Delete Pages
      </button>

      {message && (
        <p className="mt-4 text-center">{message}</p>
      )}

      {downloadUrl && (
        <PdfDownload
          href={downloadUrl}
          filename="pages-removed.pdf"
        />
      )}

      <PdfSeo
        tool="Delete PDF Pages"
        description="Delete unwanted pages from PDF files online."
      />
    </PdfLayout>
  );
}
