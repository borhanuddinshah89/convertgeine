import Link from "next/link";

const benefits = [
  {
    icon: "🚫",
    title: "No registration",
    description:
      "Use the currently available tools without creating an account.",
  },
  {
    icon: "⚡",
    title: "Quick workflows",
    description:
      "Each tool is designed to complete a focused task with minimal steps.",
  },
  {
    icon: "🔒",
    title: "Privacy aware",
    description:
      "Browser-based tools keep processing on your device whenever possible.",
  },
  {
    icon: "💧",
    title: "No watermark",
    description:
      "Completed files are downloaded without a ConvertGeine watermark.",
  },
  {
    icon: "📱",
    title: "Mobile friendly",
    description:
      "Use the website on compatible phones, tablets and computers.",
  },
  {
    icon: "🧭",
    title: "Clear instructions",
    description:
      "Straightforward controls and explanations help reduce confusion.",
  },
];

const facts = [
  {
    value: "16+",
    label: "Working tools",
  },
  {
    value: "4",
    label: "Tool categories",
  },
  {
    value: "$0",
    label: "Current usage cost",
  },
  {
    value: "0",
    label: "Accounts required",
  },
];

const faqs = [
  {
    question: "Is ConvertGeine free?",
    answer:
      "Yes. The tools currently available on ConvertGeine are free to use. File-size or processing limits may apply to certain tools.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. An account is not currently required to use the available tools.",
  },
  {
    question: "Are my files stored permanently?",
    answer:
      "Some tools process files directly in your browser. Tools that require server processing should use files only temporarily to complete the requested task. Review the Privacy Policy for current details.",
  },
  {
    question: "Does ConvertGeine work on mobile devices?",
    answer:
      "The website is designed to be mobile friendly, although large PDF and image operations may work better on a computer with more memory.",
  },
  {
    question: "Does the passport-photo tool guarantee acceptance?",
    answer:
      "No. It helps resize and position a photograph, but users must confirm the latest requirements with the relevant government authority or professional photographer.",
  },
  {
    question: "Can the PDF Editor change existing paragraphs?",
    answer:
      "PDF Editor Lite can reorder, rotate and remove pages and add new text or images. It does not rewrite existing PDF paragraphs like a word processor.",
  },
];

export default function HomeTrustSections() {
  return (
    <>
      <section className="border-y border-slate-800 bg-slate-900/30 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Built for everyday tasks
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Why use ConvertGeine?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
              Practical tools designed to be understandable, accessible and
              easy to use.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 transition hover:-translate-y-1 hover:border-blue-500/40"
              >
                <div className="text-3xl">{benefit.icon}</div>

                <h3 className="mt-4 text-xl font-bold">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7 shadow-2xl sm:p-10">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 text-center"
                >
                  <p className="text-4xl font-extrabold text-blue-400">
                    {fact.value}
                  </p>

                  <p className="mt-2 text-sm font-medium text-slate-400">
                    {fact.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/30 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Help and information
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Frequently asked questions
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
              Important information about files, privacy and how the tools work.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-800 bg-slate-950/60 p-5 open:border-blue-500/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold">
                  <span>{faq.question}</span>

                  <span className="text-xl text-blue-400 transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-4 border-t border-slate-800 pt-4 text-sm leading-7 text-slate-400">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-7 text-center">
            <h3 className="text-2xl font-bold">
              Need help with a tool?
            </h3>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-300">
              Report a problem or share an improvement suggestion through the
              contact page.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
            >
              Contact ConvertGeine
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
