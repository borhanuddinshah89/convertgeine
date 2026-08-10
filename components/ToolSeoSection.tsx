type Props = {
  tool: string;
  description: string;
  steps: string[];
  benefits: string[];
  fileHandling?: string;
};

export default function ToolSeoSection({
  tool,
  description,
  steps,
  benefits,
  fileHandling = "Your files stay on your device unless a tool clearly states otherwise.",
}: Props) {
  return (
    <section className="mt-16 space-y-10 border-t border-slate-800 pt-12">
      <div>
        <h2 className="text-2xl font-bold text-white">
          About {tool}
        </h2>

        <p className="mt-4 leading-7 text-slate-300">
          {description}
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white">
          How to use
        </h2>

        <ol className="mt-4 list-decimal space-y-3 pl-6 text-slate-300">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white">
          Benefits
        </h2>

        <ul className="mt-4 list-disc space-y-3 pl-6 text-slate-300">
          {benefits.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white">
          Frequently Asked Questions
        </h2>

        <div className="mt-5 space-y-6">
          <div>
            <h3 className="font-semibold text-white">
              Is this tool free?
            </h3>

            <p className="mt-2 text-slate-300">
              Yes. All tools on ConvertGeine are free to use.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Are my files uploaded?
            </h3>

            <p className="mt-2 text-slate-300">
              {fileHandling}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Does it work on mobile?
            </h3>

            <p className="mt-2 text-slate-300">
              Yes. ConvertGeine works on desktop, tablet and mobile devices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
