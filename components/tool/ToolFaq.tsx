type Props = {
  tool: string;
};

export default function ToolFaq({ tool }: Props) {
  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="font-semibold">
            Is this {tool} tool free?
          </h3>
          <p className="mt-2 text-slate-400">
            Yes. You can use ConvertGeine for free.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="font-semibold">
            Are my files private?
          </h3>
          <p className="mt-2 text-slate-400">
            Whenever processing happens in your browser, your files stay on your device.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="font-semibold">
            Which devices are supported?
          </h3>
          <p className="mt-2 text-slate-400">
            ConvertGeine works on desktop, tablet and mobile browsers.
          </p>
        </div>
      </div>
    </section>
  );
}
