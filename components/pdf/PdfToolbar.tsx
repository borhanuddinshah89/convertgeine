type Props = {
  children: React.ReactNode;
};

export default function PdfToolbar({
  children,
}: Props) {
  return (
    <div className="mt-8 space-y-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
      {children}
    </div>
  );
}
