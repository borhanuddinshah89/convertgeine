"use client";

import Link from "next/link";
import {
  ChangeEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  degrees,
  PDFDocument,
  rgb,
  StandardFonts,
} from "pdf-lib";

type PageItem = {
  id: string;
  originalIndex: number;
  pageNumber: number;
  rotation: number;
  preview: string;
};

type TextOverlay = {
  id: string;
  pageId: string;
  text: string;
  xPercent: number;
  yPercent: number;
  fontSize: number;
};

type ImageOverlay = {
  id: string;
  pageId: string;
  file: File;
  preview: string;
  xPercent: number;
  yPercent: number;
  widthPercent: number;
};

function createId() {
  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

function downloadBytes(
  bytes: Uint8Array,
  fileName: string
) {
  const safeBuffer = new ArrayBuffer(bytes.byteLength);
    new Uint8Array(safeBuffer).set(bytes);

    const blob = new Blob([safeBuffer], {
      type: "application/pdf",
    });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

export default function PdfEditorPage() {
  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const imageInputRef =
    useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState("");
  const [originalBytes, setOriginalBytes] =
    useState<Uint8Array | null>(null);

  const [pages, setPages] = useState<PageItem[]>([]);
  const [selectedPageId, setSelectedPageId] =
    useState("");

  const [textOverlays, setTextOverlays] =
    useState<TextOverlay[]>([]);

  const [imageOverlays, setImageOverlays] =
    useState<ImageOverlay[]>([]);

  const [newText, setNewText] = useState("");
  const [textSize, setTextSize] = useState(24);
  const [textX, setTextX] = useState(10);
  const [textY, setTextY] = useState(10);

  const [imageX, setImageX] = useState(10);
  const [imageY, setImageY] = useState(10);
  const [imageWidth, setImageWidth] =
    useState(25);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const selectedPage = useMemo(
    () =>
      pages.find(
        (page) => page.id === selectedPageId
      ) ?? null,
    [pages, selectedPageId]
  );

  const selectedPagePosition = useMemo(
    () =>
      pages.findIndex(
        (page) => page.id === selectedPageId
      ),
    [pages, selectedPageId]
  );

  async function choosePdf(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setMessage("Please choose a PDF file.");
      return;
    }

    if (file.size > 40 * 1024 * 1024) {
      setMessage(
        "Please choose a PDF smaller than 40 MB."
      );
      return;
    }

    setLoading(true);
    setMessage("Loading PDF pages...");

    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      setOriginalBytes(bytes);
      setFileName(file.name);
      setTextOverlays([]);

      imageOverlays.forEach((overlay) => {
        URL.revokeObjectURL(overlay.preview);
      });

      setImageOverlays([]);

      const previews =
        await createPagePreviews(bytes);

      setPages(previews);

      if (previews.length > 0) {
        setSelectedPageId(previews[0].id);
      }

      setMessage(
        `${previews.length} page${
          previews.length === 1 ? "" : "s"
        } loaded.`
      );
    } catch (error) {
      console.error("PDF loading failed:", error);

      setMessage(
        "The PDF could not be opened. It may be encrypted or damaged."
      );
    } finally {
      setLoading(false);
      event.target.value = "";
    }
  }

  async function createPagePreviews(
    bytes: Uint8Array
  ): Promise<PageItem[]> {
    const pdfjs: any = await import("pdfjs-dist");

    pdfjs.GlobalWorkerOptions.workerSrc =
      "/pdf.worker.min.mjs";

    const loadingTask = pdfjs.getDocument({
      data: bytes.slice(),
    });

    const pdf = await loadingTask.promise;
    const result: PageItem[] = [];

    for (
      let pageNumber = 1;
      pageNumber <= pdf.numPages;
      pageNumber++
    ) {
      const page = await pdf.getPage(pageNumber);

      const originalViewport = page.getViewport({
        scale: 1,
      });

      const scale =
        Math.min(
          220 / originalViewport.width,
          290 / originalViewport.height
        ) || 1;

      const viewport = page.getViewport({ scale });

      const canvas =
        document.createElement("canvas");

      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error(
          "Canvas is not available."
        );
      }

      await page.render({
        canvas,
        canvasContext: context,
        viewport,
      }).promise;

      result.push({
        id: createId(),
        originalIndex: pageNumber - 1,
        pageNumber,
        rotation: 0,
        preview: canvas.toDataURL(
          "image/jpeg",
          0.82
        ),
      });
    }

    return result;
  }

  function rotateSelectedPage() {
    if (!selectedPageId) return;

    setPages((currentPages) =>
      currentPages.map((page) =>
        page.id === selectedPageId
          ? {
              ...page,
              rotation:
                (page.rotation + 90) % 360,
            }
          : page
      )
    );
  }

  function deleteSelectedPage() {
    if (!selectedPageId) return;

    if (pages.length <= 1) {
      setMessage(
        "A PDF must contain at least one page."
      );
      return;
    }

    const currentIndex = selectedPagePosition;

    const updatedPages = pages.filter(
      (page) => page.id !== selectedPageId
    );

    setPages(updatedPages);

    setTextOverlays((current) =>
      current.filter(
        (overlay) =>
          overlay.pageId !== selectedPageId
      )
    );

    setImageOverlays((current) => {
      const removed = current.filter(
        (overlay) =>
          overlay.pageId === selectedPageId
      );

      removed.forEach((overlay) => {
        URL.revokeObjectURL(overlay.preview);
      });

      return current.filter(
        (overlay) =>
          overlay.pageId !== selectedPageId
      );
    });

    const nextIndex = Math.min(
      currentIndex,
      updatedPages.length - 1
    );

    setSelectedPageId(
      updatedPages[nextIndex]?.id ?? ""
    );

    setMessage("Page removed.");
  }

  function moveSelectedPage(direction: -1 | 1) {
    const currentIndex = selectedPagePosition;

    if (currentIndex < 0) return;

    const destinationIndex =
      currentIndex + direction;

    if (
      destinationIndex < 0 ||
      destinationIndex >= pages.length
    ) {
      return;
    }

    const updatedPages = [...pages];

    const [movedPage] = updatedPages.splice(
      currentIndex,
      1
    );

    updatedPages.splice(
      destinationIndex,
      0,
      movedPage
    );

    setPages(updatedPages);
  }

  function addText() {
    if (!selectedPageId) {
      setMessage("Select a page first.");
      return;
    }

    if (!newText.trim()) {
      setMessage("Enter some text first.");
      return;
    }

    setTextOverlays((current) => [
      ...current,
      {
        id: createId(),
        pageId: selectedPageId,
        text: newText.trim(),
        xPercent: textX,
        yPercent: textY,
        fontSize: textSize,
      },
    ]);

    setNewText("");
    setMessage("Text added to the selected page.");
  }

  function removeTextOverlay(id: string) {
    setTextOverlays((current) =>
      current.filter(
        (overlay) => overlay.id !== id
      )
    );
  }

  function chooseOverlayImage(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file || !selectedPageId) return;

    const lowerName = file.name.toLowerCase();

    const supported =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      lowerName.endsWith(".jpg") ||
      lowerName.endsWith(".jpeg") ||
      lowerName.endsWith(".png");

    if (!supported) {
      setMessage(
        "Choose a JPG or PNG image."
      );
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage(
        "The image must be smaller than 10 MB."
      );
      return;
    }

    const preview = URL.createObjectURL(file);

    setImageOverlays((current) => [
      ...current,
      {
        id: createId(),
        pageId: selectedPageId,
        file,
        preview,
        xPercent: imageX,
        yPercent: imageY,
        widthPercent: imageWidth,
      },
    ]);

    setMessage(
      "Image or signature added to the selected page."
    );

    event.target.value = "";
  }

  function removeImageOverlay(id: string) {
    setImageOverlays((current) => {
      const target = current.find(
        (overlay) => overlay.id === id
      );

      if (target) {
        URL.revokeObjectURL(target.preview);
      }

      return current.filter(
        (overlay) => overlay.id !== id
      );
    });
  }

  async function saveEditedPdf() {
    if (!originalBytes || pages.length === 0) {
      setMessage("Upload a PDF first.");
      return;
    }

    setLoading(true);
    setMessage("Creating edited PDF...");

    try {
      const sourceDocument =
        await PDFDocument.load(
          originalBytes.slice()
        );

      const outputDocument =
        await PDFDocument.create();

      const font =
        await outputDocument.embedFont(
          StandardFonts.Helvetica
        );

      for (const pageItem of pages) {
        const [copiedPage] =
          await outputDocument.copyPages(
            sourceDocument,
            [pageItem.originalIndex]
          );

        outputDocument.addPage(copiedPage);

        const outputPage =
          outputDocument.getPage(
            outputDocument.getPageCount() - 1
          );

        const originalRotation =
          outputPage.getRotation().angle || 0;

        outputPage.setRotation(
          degrees(
            (originalRotation +
              pageItem.rotation) %
              360
          )
        );

        const { width, height } =
          outputPage.getSize();

        const pageTexts = textOverlays.filter(
          (overlay) =>
            overlay.pageId === pageItem.id
        );

        for (const overlay of pageTexts) {
          const safeText = overlay.text.replace(
            /[^\x20-\x7E]/g,
            ""
          );

          if (!safeText) continue;

          const x =
            (overlay.xPercent / 100) * width;

          const y =
            height -
            (overlay.yPercent / 100) *
              height -
            overlay.fontSize;

          outputPage.drawText(safeText, {
            x,
            y,
            size: overlay.fontSize,
            font,
            color: rgb(0.05, 0.05, 0.05),
          });
        }

        const pageImages =
          imageOverlays.filter(
            (overlay) =>
              overlay.pageId === pageItem.id
          );

        for (const overlay of pageImages) {
          const bytes =
            await overlay.file.arrayBuffer();

          const lowerName =
            overlay.file.name.toLowerCase();

          const embeddedImage =
            overlay.file.type === "image/png" ||
            lowerName.endsWith(".png")
              ? await outputDocument.embedPng(
                  bytes
                )
              : await outputDocument.embedJpg(
                  bytes
                );

          const desiredWidth =
            (overlay.widthPercent / 100) *
            width;

          const ratio =
            embeddedImage.height /
            embeddedImage.width;

          const desiredHeight =
            desiredWidth * ratio;

          const x =
            (overlay.xPercent / 100) * width;

          const y =
            height -
            (overlay.yPercent / 100) *
              height -
            desiredHeight;

          outputPage.drawImage(
            embeddedImage,
            {
              x,
              y,
              width: desiredWidth,
              height: desiredHeight,
            }
          );
        }
      }

      const editedBytes =
        await outputDocument.save();

      const outputName = fileName
        ? fileName.replace(
            /\.pdf$/i,
            "-edited.pdf"
          )
        : "edited.pdf";

      downloadBytes(
        new Uint8Array(editedBytes),
        outputName
      );

      setMessage(
        "Finished! Your edited PDF was downloaded."
      );
    } catch (error) {
      console.error(
        "PDF editing failed:",
        error
      );

      setMessage(
        "The edited PDF could not be created."
      );
    } finally {
      setLoading(false);
    }
  }

  function clearEditor() {
    imageOverlays.forEach((overlay) => {
      URL.revokeObjectURL(overlay.preview);
    });

    setFileName("");
    setOriginalBytes(null);
    setPages([]);
    setSelectedPageId("");
    setTextOverlays([]);
    setImageOverlays([]);
    setNewText("");
    setMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const selectedTextOverlays =
    textOverlays.filter(
      (overlay) =>
        overlay.pageId === selectedPageId
    );

  const selectedImageOverlays =
    imageOverlays.filter(
      (overlay) =>
        overlay.pageId === selectedPageId
    );

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          ← Back to Home
        </Link>

        <div className="mt-7 rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-2xl sm:p-8">
          <div className="text-center">
            <div className="text-6xl">✏️</div>

            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
              PDF Editor Lite
            </h1>

            <p className="mx-auto mt-4 max-w-3xl text-slate-400">
              Reorder, rotate and delete pages.
              Add simple text, signatures or
              images, then download the edited
              PDF.
            </p>
          </div>

          {!originalBytes ? (
            <div className="mx-auto mt-10 max-w-3xl rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950/50 p-10 text-center">
              <input
                ref={fileInputRef}
                id="editor-pdf"
                type="file"
                accept="application/pdf,.pdf"
                onChange={choosePdf}
                className="hidden"
              />

              <div className="text-6xl">📄</div>

              <h2 className="mt-5 text-2xl font-bold">
                Choose a PDF to edit
              </h2>

              <p className="mt-3 text-sm text-slate-400">
                Maximum file size: 40 MB
              </p>

              <label
                htmlFor="editor-pdf"
                className="mt-7 inline-block cursor-pointer rounded-xl bg-blue-600 px-7 py-4 font-semibold hover:bg-blue-700"
              >
                Browse PDF
              </label>
            </div>
          ) : (
            <>
              <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold">
                    {fileName}
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    {pages.length} page
                    {pages.length === 1
                      ? ""
                      : "s"}{" "}
                    remaining
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={clearEditor}
                    disabled={loading}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 font-semibold hover:bg-slate-700"
                  >
                    Choose Another PDF
                  </button>

                  <button
                    type="button"
                    onClick={saveEditedPdf}
                    disabled={loading}
                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700 disabled:bg-slate-700"
                  >
                    {loading
                      ? "Creating PDF..."
                      : "Download Edited PDF"}
                  </button>
                </div>
              </div>

              <div className="mt-8 grid gap-8 xl:grid-cols-[1.35fr_0.65fr]">
                <section>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        moveSelectedPage(-1)
                      }
                      disabled={
                        selectedPagePosition <= 0
                      }
                      className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 font-semibold hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ← Move Left
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        moveSelectedPage(1)
                      }
                      disabled={
                        selectedPagePosition < 0 ||
                        selectedPagePosition ===
                          pages.length - 1
                      }
                      className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 font-semibold hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Move Right →
                    </button>

                    <button
                      type="button"
                      onClick={rotateSelectedPage}
                      disabled={!selectedPage}
                      className="rounded-xl border border-blue-500/40 bg-blue-500/10 px-4 py-3 font-semibold text-blue-300 hover:bg-blue-500/20"
                    >
                      ↻ Rotate 90°
                    </button>

                    <button
                      type="button"
                      onClick={deleteSelectedPage}
                      disabled={!selectedPage}
                      className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 font-semibold text-red-300 hover:bg-red-500/20"
                    >
                      Delete Page
                    </button>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {pages.map(
                      (page, index) => (
                        <button
                          key={page.id}
                          type="button"
                          onClick={() =>
                            setSelectedPageId(
                              page.id
                            )
                          }
                          className={`rounded-2xl border p-3 text-left transition ${
                            page.id ===
                            selectedPageId
                              ? "border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/30"
                              : "border-slate-800 bg-slate-950/50 hover:border-slate-600"
                          }`}
                        >
                          <div className="flex min-h-[230px] items-center justify-center overflow-hidden rounded-xl bg-white p-2">
                            <img
                              src={page.preview}
                              alt={`PDF page ${
                                index + 1
                              }`}
                              className="max-h-[220px] max-w-full object-contain transition"
                              style={{
                                transform: `rotate(${page.rotation}deg)`,
                              }}
                            />
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <span className="font-semibold">
                              Page {index + 1}
                            </span>

                            {page.rotation !==
                              0 && (
                              <span className="text-xs text-blue-300">
                                {
                                  page.rotation
                                }
                                °
                              </span>
                            )}
                          </div>

                          <p className="mt-1 text-xs text-slate-500">
                            Original page{" "}
                            {page.pageNumber}
                          </p>
                        </button>
                      )
                    )}
                  </div>
                </section>

                <aside className="space-y-6">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                    <h2 className="text-xl font-bold">
                      Add text
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                      Text is added to the
                      selected page.
                    </p>

                    <textarea
                      value={newText}
                      onChange={(event) =>
                        setNewText(
                          event.target.value
                        )
                      }
                      placeholder="Enter text"
                      rows={3}
                      className="mt-5 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
                    />

                    <label className="mt-4 block text-sm font-semibold">
                      Font size: {textSize}
                    </label>

                    <input
                      type="range"
                      min="8"
                      max="72"
                      value={textSize}
                      onChange={(event) =>
                        setTextSize(
                          Number(
                            event.target.value
                          )
                        )
                      }
                      className="mt-2 w-full"
                    />

                    <label className="mt-4 block text-sm font-semibold">
                      Horizontal position:{" "}
                      {textX}%
                    </label>

                    <input
                      type="range"
                      min="0"
                      max="90"
                      value={textX}
                      onChange={(event) =>
                        setTextX(
                          Number(
                            event.target.value
                          )
                        )
                      }
                      className="mt-2 w-full"
                    />

                    <label className="mt-4 block text-sm font-semibold">
                      Vertical position:{" "}
                      {textY}%
                    </label>

                    <input
                      type="range"
                      min="0"
                      max="95"
                      value={textY}
                      onChange={(event) =>
                        setTextY(
                          Number(
                            event.target.value
                          )
                        )
                      }
                      className="mt-2 w-full"
                    />

                    <button
                      type="button"
                      onClick={addText}
                      disabled={!selectedPage}
                      className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700 disabled:bg-slate-700"
                    >
                      Add Text
                    </button>

                    {selectedTextOverlays.length >
                      0 && (
                      <div className="mt-5 space-y-2">
                        {selectedTextOverlays.map(
                          (overlay) => (
                            <div
                              key={overlay.id}
                              className="flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-900 p-3"
                            >
                              <p className="min-w-0 truncate text-sm">
                                {overlay.text}
                              </p>

                              <button
                                type="button"
                                onClick={() =>
                                  removeTextOverlay(
                                    overlay.id
                                  )
                                }
                                className="text-red-300"
                              >
                                ✕
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                    <h2 className="text-xl font-bold">
                      Add image or signature
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                      Upload a JPG or PNG for the
                      selected page.
                    </p>

                    <label className="mt-4 block text-sm font-semibold">
                      Width: {imageWidth}%
                    </label>

                    <input
                      type="range"
                      min="5"
                      max="80"
                      value={imageWidth}
                      onChange={(event) =>
                        setImageWidth(
                          Number(
                            event.target.value
                          )
                        )
                      }
                      className="mt-2 w-full"
                    />

                    <label className="mt-4 block text-sm font-semibold">
                      Horizontal position:{" "}
                      {imageX}%
                    </label>

                    <input
                      type="range"
                      min="0"
                      max="90"
                      value={imageX}
                      onChange={(event) =>
                        setImageX(
                          Number(
                            event.target.value
                          )
                        )
                      }
                      className="mt-2 w-full"
                    />

                    <label className="mt-4 block text-sm font-semibold">
                      Vertical position:{" "}
                      {imageY}%
                    </label>

                    <input
                      type="range"
                      min="0"
                      max="90"
                      value={imageY}
                      onChange={(event) =>
                        setImageY(
                          Number(
                            event.target.value
                          )
                        )
                      }
                      className="mt-2 w-full"
                    />

                    <input
                      ref={imageInputRef}
                      id="editor-image"
                      type="file"
                      accept="image/jpeg,image/png,.jpg,.jpeg,.png"
                      onChange={chooseOverlayImage}
                      className="hidden"
                    />

                    <label
                      htmlFor="editor-image"
                      className={`mt-5 block rounded-xl px-5 py-3 text-center font-semibold ${
                        selectedPage
                          ? "cursor-pointer bg-emerald-600 hover:bg-emerald-700"
                          : "cursor-not-allowed bg-slate-700 text-slate-400"
                      }`}
                    >
                      Choose Image
                    </label>

                    {selectedImageOverlays.length >
                      0 && (
                      <div className="mt-5 space-y-3">
                        {selectedImageOverlays.map(
                          (overlay) => (
                            <div
                              key={overlay.id}
                              className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900 p-3"
                            >
                              <img
                                src={
                                  overlay.preview
                                }
                                alt="Added PDF overlay"
                                className="h-12 w-12 rounded object-contain bg-white"
                              />

                              <p className="min-w-0 flex-1 truncate text-sm">
                                {
                                  overlay.file
                                    .name
                                }
                              </p>

                              <button
                                type="button"
                                onClick={() =>
                                  removeImageOverlay(
                                    overlay.id
                                  )
                                }
                                className="text-red-300"
                              >
                                ✕
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </aside>
              </div>
            </>
          )}

          {message && (
            <p className="mt-7 rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-center text-sm text-slate-300">
              {message}
            </p>
          )}

          <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5">
            <p className="text-sm leading-7 text-amber-100/80">
              PDF Editor Lite adds new text and
              images on top of PDF pages. It does
              not directly rewrite existing
              paragraphs like a Word document
              editor.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
