import { PDFDocument } from "pdf-lib";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const uploadedFiles = formData.getAll("files");

    const pdfFiles = uploadedFiles.filter(
      (item): item is File => item instanceof File
    );

    if (pdfFiles.length < 2) {
      return Response.json(
        { error: "Please choose at least 2 PDF files." },
        { status: 400 }
      );
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of pdfFiles) {
      if (file.type !== "application/pdf") {
        return Response.json(
          { error: "Only PDF files are allowed." },
          { status: 400 }
        );
      }

      if (file.size > 25 * 1024 * 1024) {
        return Response.json(
          { error: `${file.name} is larger than 25 MB.` },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(bytes);
      const pageIndexes = sourcePdf.getPageIndices();
      const copiedPages = await mergedPdf.copyPages(sourcePdf, pageIndexes);

      for (const page of copiedPages) {
        mergedPdf.addPage(page);
      }
    }

    const mergedBytes = await mergedPdf.save();

    return new Response(mergedBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="merged.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF merge failed:", error);

    return Response.json(
      { error: "The PDFs could not be merged." },
      { status: 500 }
    );
  }
}
