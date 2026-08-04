import { PDFDocument } from "pdf-lib";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return buffer;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const uploadedFile = formData.get("file");

    if (!(uploadedFile instanceof File)) {
      return Response.json(
        { error: "Please select a PDF file." },
        { status: 400 }
      );
    }

    if (
      uploadedFile.type !== "application/pdf" &&
      !uploadedFile.name.toLowerCase().endsWith(".pdf")
    ) {
      return Response.json(
        { error: "The selected file must be a PDF." },
        { status: 400 }
      );
    }

    if (uploadedFile.size === 0) {
      return Response.json(
        { error: "The selected PDF is empty." },
        { status: 400 }
      );
    }

    if (uploadedFile.size > MAX_FILE_SIZE) {
      return Response.json(
        { error: "The PDF is too large. Maximum size is 50 MB." },
        { status: 413 }
      );
    }

    const originalBuffer = await uploadedFile.arrayBuffer();
    const originalBytes = new Uint8Array(originalBuffer);

    const pdfDocument = await PDFDocument.load(originalBytes, {
      updateMetadata: false,
    });

    const processedBytes = await pdfDocument.save({
      useObjectStreams: true,
      addDefaultPage: false,
      objectsPerTick: 50,
    });

    const useProcessedVersion =
      processedBytes.byteLength < originalBytes.byteLength;

    const finalBytes = useProcessedVersion
      ? processedBytes
      : originalBytes;

    const responseBuffer = toArrayBuffer(finalBytes);

    const originalName = uploadedFile.name.replace(/\.pdf$/i, "");
    const safeName =
      originalName.replace(/[^a-zA-Z0-9._-]/g, "-") || "document";

    return new Response(responseBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          `attachment; filename="compressed-${safeName}.pdf"`,
        "Content-Length": String(responseBuffer.byteLength),
        "Cache-Control": "no-store",
        "X-Original-Size": String(originalBytes.byteLength),
        "X-Final-Size": String(finalBytes.byteLength),
        "X-Compression-Applied": useProcessedVersion ? "yes" : "no",
      },
    });
  } catch (error) {
    console.error("PDF compression failed:", error);

    const message =
      error instanceof Error &&
      error.message.toLowerCase().includes("encrypted")
        ? "Encrypted or password-protected PDFs are not supported."
        : "The PDF could not be processed. It may be damaged or unsupported.";

    return Response.json({ error: message }, { status: 500 });
  }
}
