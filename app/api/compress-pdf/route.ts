import { PDFDocument } from "pdf-lib";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

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

    const inputBuffer = await uploadedFile.arrayBuffer();
    const inputBytes = new Uint8Array(inputBuffer);

    const pdfDocument = await PDFDocument.load(inputBytes, {
      updateMetadata: false,
    });

    const outputBytes = await pdfDocument.save({
      useObjectStreams: true,
      addDefaultPage: false,
      objectsPerTick: 50,
    });

    // Copy into a standard ArrayBuffer for Next.js Response compatibility.
    const responseBuffer = new ArrayBuffer(outputBytes.byteLength);
    new Uint8Array(responseBuffer).set(outputBytes);

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
        "X-Original-Size": String(uploadedFile.size),
        "X-Compressed-Size": String(responseBuffer.byteLength),
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
