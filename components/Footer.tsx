import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl">
              ⚡
            </span>

            <span className="text-xl font-bold">ConvertGeine</span>
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
            Free PDF, image, passport photo, calculator and unit-conversion
            tools for everyday digital tasks.
          </p>
        </div>

        <div>
          <h2 className="font-bold">PDF Tools</h2>

          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <p><Link href="/compress-pdf" className="hover:text-white">Compress PDF</Link></p>
            <p><Link href="/merge-pdf" className="hover:text-white">Merge PDF</Link></p>
            <p><Link href="/split-pdf" className="hover:text-white">Split PDF</Link></p>
            <p><Link href="/jpg-to-pdf" className="hover:text-white">JPG to PDF</Link></p>
            <p><Link href="/pdf-to-jpg" className="hover:text-white">PDF to JPG</Link></p>
          </div>
        </div>

        <div>
          <h2 className="font-bold">Popular Tools</h2>

          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <p><Link href="/passport-photo" className="hover:text-white">Passport Photo</Link></p>
            <p><Link href="/image-compressor" className="hover:text-white">Image Compressor</Link></p>
            <p><Link href="/webp-converter" className="hover:text-white">WebP Converter</Link></p>
            <p><Link href="/image-resizer" className="hover:text-white">Image Resizer</Link></p>
            <p><Link href="/image-compressor" className="hover:text-white">Image Compressor</Link></p>
            <p><Link href="/age-calculator" className="hover:text-white">Age Calculator</Link></p>
            <p><Link href="/bmi-calculator" className="hover:text-white">BMI Calculator</Link></p>
            <p><Link href="/percentage-calculator" className="hover:text-white">Percentage Calculator</Link></p>
            <p><Link href="/gst-hst-calculator" className="hover:text-white">GST / HST Calculator</Link></p>
          </div>
        </div>

        <div>
          <h2 className="font-bold">Company</h2>

          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <p><Link href="/about" className="hover:text-white">About</Link></p>
            <p><Link href="/contact" className="hover:text-white">Contact</Link></p>
            <p><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></p>
            <p><Link href="/terms" className="hover:text-white">Terms of Use</Link></p>
            <p><Link href="/cookies" className="hover:text-white">Cookie Policy</Link></p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-slate-800 pt-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 ConvertGeine. All rights reserved.</p>
        <p>Free online tools with no registration required.</p>
      </div>
    </footer>
  );
}
