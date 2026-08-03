import Link from "next/link";

export const metadata = {
  title: "Contact | ConvertGeine",
  description:
    "Contact ConvertGeine for support, feedback, partnerships or general questions.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">

        <Link
          href="/"
          className="text-blue-400 hover:text-blue-300"
        >
          ← Back to Home
        </Link>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

          <div className="text-center">
            <div className="text-6xl">✉️</div>

            <h1 className="mt-5 text-5xl font-bold">
              Contact ConvertGeine
            </h1>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
              We'd love to hear from you. Whether you found a bug,
              have a suggestion, want to report an issue, or simply
              have a question, feel free to contact us.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">

            <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6">

              <h2 className="text-2xl font-semibold">
                📧 Email
              </h2>

              <p className="mt-4 text-slate-400 leading-7">
                Send us an email anytime.
              </p>

              <a
                href="mailto:borhanuddinshah89@gmail.com"
                className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700"
              >
                borhanuddinshah89@gmail.com
              </a>

            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6">

              <h2 className="text-2xl font-semibold">
                💬 Support
              </h2>

              <p className="mt-4 text-slate-400 leading-7">
                We try to respond as quickly as possible.
                Please include the name of the tool you were using
                and describe the issue clearly.
              </p>

            </div>

          </div>

          <div className="mt-8 rounded-2xl border border-yellow-700/40 bg-yellow-900/10 p-6">

            <h2 className="text-xl font-semibold text-yellow-300">
              Security Notice
            </h2>

            <p className="mt-3 text-slate-300 leading-7">
              Please do not send passports, banking information,
              passwords, government IDs, immigration documents,
              or any other sensitive personal information by email.
            </p>

          </div>

        </div>

      </div>
    </main>
  );
}
