import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | ConvertGeine",
  description: "Privacy Policy for ConvertGeine.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">

        <Link href="/" className="text-blue-400 hover:text-blue-300">
          ← Back to Home
        </Link>

        <h1 className="mt-8 text-5xl font-bold">
          Privacy Policy
        </h1>

        <p className="mt-6 text-slate-300 leading-8">
          At ConvertGeine, your privacy is important. We design our tools to
          process files in the most privacy-friendly way possible.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">
          Information We Collect
        </h2>

        <p className="mt-4 text-slate-300 leading-8">
          We may collect basic website analytics, browser information and
          anonymous usage statistics to improve our services.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">
          Uploaded Files
        </h2>

        <p className="mt-4 text-slate-300 leading-8">
          Files uploaded to our tools are processed only to provide the
          requested service. We do not sell your files or personal information.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">
          Cookies
        </h2>

        <p className="mt-4 text-slate-300 leading-8">
          Cookies may be used to improve website functionality, remember
          preferences and provide analytics.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">
          Contact
        </h2>

        <p className="mt-4 text-slate-300 leading-8">
          If you have questions regarding this Privacy Policy, please contact
          us through the Contact page.
        </p>

      </div>
    </main>
  );
}
