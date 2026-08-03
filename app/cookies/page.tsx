import Link from "next/link";

export const metadata = {
  title: "Cookie Policy | ConvertGeine",
  description: "Cookie Policy for ConvertGeine.",
};

export default function CookiePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">

        <Link href="/" className="text-blue-400 hover:text-blue-300">
          ← Back to Home
        </Link>

        <h1 className="mt-8 text-5xl font-bold">
          Cookie Policy
        </h1>

        <p className="mt-6 leading-8 text-slate-300">
          ConvertGeine uses cookies and similar technologies to improve your
          browsing experience, remember preferences, understand how our website
          is used, and maintain security.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">
          Types of Cookies
        </h2>

        <ul className="mt-5 list-disc space-y-3 pl-6 text-slate-300">
          <li>Essential cookies for basic website functionality.</li>
          <li>Analytics cookies to understand website usage.</li>
          <li>Preference cookies to remember settings.</li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold">
          Managing Cookies
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          Most web browsers allow you to control, block or delete cookies
          through browser settings. Disabling some cookies may affect website
          functionality.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">
          Changes
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          This Cookie Policy may be updated from time to time as our services
          evolve.
        </p>

        <p className="mt-12 text-sm text-slate-500">
          Last updated: August 3, 2026
        </p>

      </div>
    </main>
  );
}
