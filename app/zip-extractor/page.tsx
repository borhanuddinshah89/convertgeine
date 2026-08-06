"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import ToolSeoSection from "@/components/ToolSeoSection";
import RelatedTools from "@/components/RelatedTools";

type ZipItem = {
  path: string;
  name: string;
  directory: boolean;
  selected: boolean;
};

const MAX_ZIP_SIZE = 100 * 1024 * 1024;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function safeFileName(path: string) {
  const pieces = path.split("/").filter(Boolean);
  return pieces[pieces.length - 1] || "file";
}

export default function ZipExtractorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [zip, setZip] = useState<JSZip | null>(null);
  const [items, setItems] = useState<ZipItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function chooseZip(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] ?? null;

    setFile(null);
    setZip(null);
    setItems([]);
    setMessage("");

    if (!selectedFile) return;

    const looksLikeZip =
      selectedFile.type === "application/zip" ||
      selectedFile.type === "application/x-zip-compressed" ||
      selectedFile.name.toLowerCase().endsWith(".zip");

    if (!looksLikeZip) {
      setMessage("Please choose a ZIP file.");
      event.target.value = "";
      return;
    }

    if (selectedFile.size === 0) {
      setMessage("The selected ZIP file is empty.");
      event.target.value = "";
      return;
    }

    if (selectedFile.size > MAX_ZIP_SIZE) {
      setMessage("The ZIP file must be 100 MB or smaller.");
      event.target.value = "";
      return;
    }

    setLoading(true);
    setMessage("Reading ZIP archive...");

    try {
      const loadedZip = await JSZip.loadAsync(selectedFile, {
        checkCRC32: false,
      });

      const foundItems: ZipItem[] = [];

      loadedZip.forEach((relativePath, entry) => {
        foundItems.push({
          path: relativePath,
          name: safeFileName(relativePath),
          directory: entry.dir,
          selected: !entry.dir,
        });
      });

      setFile(selectedFile);
      setZip(loadedZip);
      setItems(foundItems);

      const fileCount = foundItems.filter(
        (item) => !item.directory
      ).length;

      setMessage(
        fileCount > 0
          ? `Found ${fileCount} file${fileCount === 1 ? "" : "s"}.`
          : "This ZIP archive does not contain any files."
      );
    } catch {
      setMessage(
        "This ZIP file could not be opened. It may be damaged or use an unsupported encryption method."
      );
    } finally {
      setLoading(false);
    }
  }

  function toggleItem(path: string) {
    setItems((current) =>
      current.map((item) =>
        item.path === path
          ? { ...item, selected: !item.selected }
          : item
      )
    );
  }

  function selectAll() {
    setItems((current) =>
      current.map((item) => ({
        ...item,
        selected: !item.directory,
      }))
    );
  }

  function clearSelection() {
    setItems((current) =>
      current.map((item) => ({
        ...item,
        selected: false,
      }))
    );
  }

  async function downloadOne(path: string) {
    if (!zip) return;

    const entry = zip.file(path);

    if (!entry) {
      setMessage("The selected file could not be extracted.");
      return;
    }

    try {
      setMessage(`Extracting ${safeFileName(path)}...`);

      const blob = await entry.async("blob");

      saveAs(blob, safeFileName(path));

      setMessage("File downloaded.");
    } catch {
      setMessage("The selected file could not be extracted.");
    }
  }

  async function downloadSelected() {
    if (!zip || loading) return;

    const selected = items.filter(
      (item) => item.selected && !item.directory
    );

    if (selected.length === 0) {
      setMessage("Select at least one file.");
      return;
    }

    setLoading(true);
    setMessage(
      `Preparing ${selected.length} selected file${
        selected.length === 1 ? "" : "s"
      }...`
    );

    try {
      if (selected.length === 1) {
        await downloadOne(selected[0].path);
        return;
      }

      const outputZip = new JSZip();

      for (const item of selected) {
        const sourceEntry = zip.file(item.path);

        if (!sourceEntry) continue;

        const data = await sourceEntry.async("uint8array");

        outputZip.file(item.path, data);
      }

      const result = await outputZip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: {
          level: 6,
        },
      });

      const originalName =
        file?.name.replace(/\.zip$/i, "") || "archive";

      saveAs(result, `${originalName}-extracted.zip`);

      setMessage("Selected files are ready and downloaded.");
    } catch {
      setMessage("The selected files could not be extracted.");
    } finally {
      setLoading(false);
    }
  }

  const filesOnly = items.filter((item) => !item.directory);
  const selectedCount = filesOnly.filter(
    (item) => item.selected
  ).length;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          ← Back to home
        </Link>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8">
          <div className="text-center">
            <div className="text-5xl">🗜️</div>

            <h1 className="mt-4 text-4xl font-bold">
              Free ZIP File Extractor
            </h1>

            <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-400">
              Open ZIP archives, preview the files inside, and download
              selected files directly from your browser.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950/40 p-10 text-center">
            <input
              id="zip-file"
              type="file"
              accept=".zip,application/zip,application/x-zip-compressed"
              onChange={chooseZip}
              className="hidden"
            />

            <label
              htmlFor="zip-file"
              className="inline-block cursor-pointer rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
            >
              Choose ZIP File
            </label>

            <p className="mt-4 text-sm text-slate-400">
              ZIP files · Maximum 100 MB
            </p>

            {file && (
              <p className="mt-3 break-all text-sm text-slate-300">
                {file.name} · {formatBytes(file.size)}
              </p>
            )}
          </div>

          {filesOnly.length > 0 && (
            <div className="mt-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    Files in archive
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    {filesOnly.length} file
                    {filesOnly.length === 1 ? "" : "s"} ·{" "}
                    {selectedCount} selected
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={selectAll}
                    className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold hover:border-blue-500"
                  >
                    Select all
                  </button>

                  <button
                    type="button"
                    onClick={clearSelection}
                    className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold hover:border-slate-500"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="mt-5 max-h-[500px] space-y-3 overflow-auto rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                {filesOnly.map((item) => (
                  <div
                    key={item.path}
                    className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4"
                  >
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() =>
                        toggleItem(item.path)
                      }
                      className="h-5 w-5 shrink-0"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">
                        {item.name}
                      </p>

                      {item.path !== item.name && (
                        <p className="mt-1 truncate text-xs text-slate-500">
                          {item.path}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        downloadOne(item.path)
                      }
                      className="shrink-0 rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-blue-300 hover:border-blue-500"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={downloadSelected}
                disabled={
                  loading || selectedCount === 0
                }
                className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
              >
                {loading
                  ? "Preparing Files..."
                  : selectedCount === 1
                  ? "Download Selected File"
                  : `Download ${selectedCount} Selected Files`}
              </button>
            </div>
          )}

          {message && (
            <p
              className="mt-6 rounded-xl bg-slate-950/60 px-4 py-3 text-center text-sm text-slate-300"
              aria-live="polite"
            >
              {message}
            </p>
          )}

          <div className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5">
            <h2 className="font-semibold text-blue-200">
              Browser-based ZIP extraction
            </h2>

            <p className="mt-2 text-sm leading-6 text-blue-100/70">
              ZIP processing happens in your browser. Large or highly
              compressed archives may require significant device memory.
            </p>
          </div>
        </section>

        <ToolSeoSection
          tool="ZIP File Extractor"
          description="Open and extract ZIP archives online directly in your browser. Browse the files inside an archive, download individual files, or select multiple files for download."
          steps={[
            "Choose a ZIP archive from your device.",
            "Review the files contained in the archive.",
            "Select the files you want to extract.",
            "Download individual files or all selected files.",
          ]}
          benefits={[
            "Open ZIP files without installing desktop software.",
            "Choose exactly which files you want to extract.",
            "Process archives directly in your browser.",
            "No registration is required.",
          ]}
        />

        <RelatedTools
          title="Related Tools"
          tools={[
            {
              name: "Compress PDF",
              href: "/compress-pdf",
            },
            {
              name: "Image Compressor",
              href: "/image-compressor",
            },
            {
              name: "QR Code Generator",
              href: "/qr-code-generator",
            },
            {
              name: "Barcode Generator",
              href: "/barcode-generator",
            },
          ]}
        />
      </div>
    </main>
  );
}
