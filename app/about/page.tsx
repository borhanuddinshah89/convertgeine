import Link from "next/link";

export const metadata = {
  title: "About ConvertGeine",
  description:
    "Learn about ConvertGeine and our mission to provide free online PDF, image, calculator and converter tools.",
};

export default function AboutPage() {
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
          About ConvertGeine
        </h1>

        <p className="mt-6 text-lg text-slate-300 leading-8">
          ConvertGeine is a free online platform designed to make everyday
          digital tasks simple, fast and accessible. Our goal is to provide
          practical tools that help people convert files, edit PDFs, prepare
          passport photos, calculate values and perform common online tasks
          without installing software.
        </p>

        <p className="mt-6 text-lg text-slate-300 leading-8">
          We believe useful software should be available to everyone. That's
          why our tools are designed to be easy to use, mobile friendly and
          privacy focused.
        </p>

        <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-2xl font-semibold">
            What we offer
          </h2>

          <ul className="mt-6 space-y-4 text-slate-300">
            <li>✅ PDF tools</li>
            <li>✅ Image converters</li>
            <li>✅ Passport photo creator</li>
            <li>✅ Online calculators</li>
            <li>✅ Unit converters</li>
            <li>✅ Fast browser-based processing</li>
            <li>✅ No software installation</li>
          </ul>
        </div>

        <div className="mt-12 rounded-2xl border border-blue-900 bg-blue-950/20 p-8">
          <h2 className="text-2xl font-semibold">
            Our Mission
          </h2>

          <p className="mt-4 text-slate-300 leading-8">
            Our mission is to build one trusted website where anyone can solve
            everyday digital problems quickly, securely and free of charge.
          </p>
        </div>

      </div>
    </main>
  );
}
