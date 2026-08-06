type Props = {
  href: string;
  filename: string;
};

export default function PdfDownload({
  href,
  filename,
}: Props) {
  if (!href) return null;

  return (
    <a
      href={href}
      download={filename}
      className="mt-6 block rounded-xl border border-emerald-700 bg-emerald-950/30 px-6 py-4 text-center font-semibold text-emerald-300 hover:bg-emerald-950/50"
    >
      Download PDF
    </a>
  );
}
