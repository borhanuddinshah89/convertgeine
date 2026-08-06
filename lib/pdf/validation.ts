export const MAX_PDF_SIZE = 50 * 1024 * 1024;

export function validatePdf(file: File): string | null {
  const isPdf =
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf");

  if (!isPdf) return "Please choose a PDF file.";

  if (file.size === 0) return "The selected PDF is empty.";

  if (file.size > MAX_PDF_SIZE)
    return "PDF must be smaller than 50 MB.";

  return null;
}
