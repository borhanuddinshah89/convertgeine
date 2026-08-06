"use client";

import { ChangeEvent } from "react";
import { validatePdf } from "@/lib/pdf/validation";
import { formatBytes } from "@/lib/pdf/file";

type Props = {
  file: File | null;
  onFile: (file: File | null) => void;
  onError: (message: string) => void;
};

export default function PdfUploader({
  file,
  onFile,
  onError,
}: Props) {
  function choose(e: ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null;

    if (!selected) {
      onFile(null);
      return;
    }

    const error = validatePdf(selected);

    if (error) {
      onError(error);
      e.target.value = "";
      return;
    }

    onError("");
    onFile(selected);
  }

  return (
    <div className="rounded-2xl border-2 border-dashed border-slate-700 p-10 text-center">
      <input
        id="pdf-upload"
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={choose}
      />

      <label
        htmlFor="pdf-upload"
        className="cursor-pointer rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
      >
        Choose PDF
      </label>

      {file && (
        <p className="mt-4 text-sm text-slate-400">
          {file.name} • {formatBytes(file.size)}
        </p>
      )}
    </div>
  );
}
