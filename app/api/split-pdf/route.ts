import { PDFDocument } from "pdf-lib";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File;
    const pages = (formData.get("pages") as string).trim();

    if (!file) {
      return Response.json(
        { error: "Please upload a PDF." },
        { status: 400 }
      );
    }

    if (!pages) {
      return Response.json(
        { error: "Please enter page numbers." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();

    const pdf = await PDFDocument.load(bytes);
    const output = await PDFDocument.create();

    const pageNumbers = pages
      .split(",")
      .flatMap((part) => {
        part = part.trim();

        if (part.includes("-")) {
          const [start, end] = part.split("-").map(Number);
          return Array.from(
            { length: end - start + 1 },
            (_, i) => start + i
          );
        }

        return [Number(part)];
      });

    for (const page of pageNumbers) {
      if (page >= 1 && page <= pdf.getPageCount()) {
        const [copied] = await output.copyPages(pdf, [page - 1]);
        output.addPage(copied);
      }
    }

    const result = await output.save();

    return new Response(result, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="split-pages.pdf"',
      },
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Split failed." },
      { status: 500 }
    );
  }
}
