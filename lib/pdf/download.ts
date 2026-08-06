export function downloadBlob(
  bytes: Uint8Array,
  filename: string,
  type = "application/pdf"
) {
  const blob = new Blob([bytes.buffer], { type });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
