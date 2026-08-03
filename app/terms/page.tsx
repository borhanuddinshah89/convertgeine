import Link from "next/link";

export const metadata = {
  title: "Terms of Use | ConvertGeine",
  description:
    "Read the terms and conditions for using ConvertGeine's online tools.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <Link
          href="/"
          className="text-blue-400 hover:text-blue-300"
        >
          ← Back to Home
        </Link>

        <h1 className="mt-8 text-5xl font-bold">
          Terms of Use
        </h1>

        <p className="mt-6 leading-8 text-slate-300">
          By accessing or using ConvertGeine, you agree to these
          Terms of Use. Please stop using the website if you do not
          agree with these terms.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">
            Use of the Website
          </h2>

          <p className="mt-4 leading-8 text-slate-300">
            ConvertGeine provides online PDF, image, calculator and
            converter tools for general informational and practical
            purposes. You are responsible for using the tools lawfully
            and for reviewing the accuracy of any output before relying
            on it.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">
            Your Files and Content
          </h2>

          <p className="mt-4 leading-8 text-slate-300">
            You must have the right to upload and process any files or
            content you submit. Do not upload illegal, harmful,
            confidential or copyrighted material unless you have proper
            permission.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">
            No Guarantee of Accuracy
          </h2>

          <p className="mt-4 leading-8 text-slate-300">
            We aim to provide reliable tools, but we do not guarantee
            that every result will be complete, accurate, error-free or
            suitable for a particular purpose.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">
            Official Documents and Photos
          </h2>

          <p className="mt-4 leading-8 text-slate-300">
            Tools related to passport photos, immigration documents,
            taxes, health measurements or official applications are
            provided for convenience only. You must verify current
            requirements with the appropriate authority or qualified
            professional.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">
            Prohibited Use
          </h2>

          <p className="mt-4 leading-8 text-slate-300">
            You may not misuse the website, attempt unauthorized access,
            disrupt the service, upload malicious files, violate another
            person's rights or use the tools for unlawful activities.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">
            Availability
          </h2>

          <p className="mt-4 leading-8 text-slate-300">
            We may update, limit, suspend or discontinue any tool or
            feature without notice. We do not guarantee uninterrupted
            availability.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">
            Limitation of Liability
          </h2>

          <p className="mt-4 leading-8 text-slate-300">
            To the fullest extent permitted by law, ConvertGeine and its
            operators will not be responsible for losses, damaged files,
            missed deadlines, rejected applications or other damages
            resulting from use of the website.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">
            Changes to These Terms
          </h2>

          <p className="mt-4 leading-8 text-slate-300">
            We may revise these Terms of Use as the website changes.
            Continued use after an update means you accept the revised
            terms.
          </p>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-semibold">
            Contact
          </h2>

          <p className="mt-4 leading-8 text-slate-300">
            Questions about these terms can be submitted through the
            Contact page.
          </p>
        </section>

        <p className="mt-10 text-sm text-slate-500">
          Last updated: August 3, 2026
        </p>
      </div>
    </main>
  );
}
