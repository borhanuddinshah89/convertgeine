"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";

type PdfUploaderProps = {
  files: File[];
  onFilesChange: (files: File[]) => void;
  multiple?: boolean;
  maximumFiles?: number;
};

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function PdfUploader({
  files,
  onFilesChange,
  multiple = true,
  maximumFiles = 10,
}: PdfUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  function addFiles(selectedFiles: File[]) {
    setError("");

    const pdfFiles = selectedFiles.filter(
      (file) =>
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf")
    );

    if (pdfFiles.length !== selectedFiles.length) {
      setError("Only PDF files are allowed.");
    }

    const newFiles = multiple ? [...files, ...pdfFiles] : pdfFiles.slice(0, 1);

    const uniqueFiles = newFiles.filter(
      (file, index, array) =>
        array.findIndex(
          (item) =>
            item.name === file.name &&
            item.size === file.size &&
            item.lastModified === file.lastModified
        ) === index
    );

    if (uniqueFiles.length > maximumFiles) {
      setError(`You can choose a maximum of ${maximumFiles} files.`);
    }

    onFilesChange(uniqueFiles.slice(0, maximumFiles));
  }

  function handleFileInput(event: ChangeEvent<HTMLInputElement>) {
    addFiles(Array.from(event.target.files ?? []));
    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    addFiles(Array.from(event.dataTransfer.files));
  }

  function removeFile(indexToRemove: number) {
    onFilesChange(files.filter((_, index) => index !== indexToRemove));
  }

  function clearFiles() {
    onFilesChange([]);
    setError("");
  }

  return (
    <div className="mt-8">
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        multiple={multiple}
        onChange={handleFileInput}
        className="hidden"
      />

      <div
        onClick={() => inputRef.current?.click()}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition ${
          isDragging
            ? "border-blue-400 bg-blue-500/10"
            : "border-slate-700 bg-slate-950/40 hover:border-blue-500"
        }`}
      >
        <div className="text-5xl">📄</div>

        <h2 className="mt-4 text-xl font-bold">
          {isDragging ? "Drop your PDFs here" : "Choose PDF files"}
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Drag and drop files here, or click to browse
        </p>

        <button
          type="button"
          className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Browse Files
        </button>

        <p className="mt-4 text-xs text-slate-500">
          PDF only · Maximum {maximumFiles} files
        </p>
      </div>

      {error && (
        <p className="mt-3 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {files.length > 0 && (
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-semibold">
              Selected files ({files.length})
            </p>

            <button
              type="button"
              onClick={clearFiles}
              className="text-sm text-slate-400 hover:text-red-300"
            >
              Clear all
            </button>
          </div>

          <div className="space-y-3">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${file.size}-${index}`}
                className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4"
              >
                <div className="text-2xl">📄</div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{file.name}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="rounded-lg px-3 py-2 text-slate-400 hover:bg-red-500/10 hover:text-red-300"
                  aria-label={`Remove ${file.name}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
