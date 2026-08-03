import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://convertgeine.com";
const siteName = "ConvertGeine";
const siteDescription =
  "Free online PDF, photo, calculator and unit converter tools. Compress, merge, split and edit PDFs, prepare passport photos, and complete everyday digital tasks.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "ConvertGeine | Free PDF, Photo & Calculator Tools",
    template: "%s | ConvertGeine",
  },

  description: siteDescription,

  applicationName: siteName,

  keywords: [
    "free online tools",
    "PDF tools",
    "compress PDF",
    "merge PDF",
    "split PDF",
    "PDF editor",
    "PDF to JPG",
    "JPG to PDF",
    "passport photo converter",
    "age calculator",
    "BMI calculator",
    "percentage calculator",
    "GST calculator",
    "HST calculator",
    "unit converter",
    "CM to feet",
    "KG to pounds",
  ],

  authors: [
    {
      name: "ConvertGeine",
      url: siteUrl,
    },
  ],

  creator: "ConvertGeine",
  publisher: "ConvertGeine",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },

  openGraph: {
    type: "website",
    locale: "en_CA",
    url: siteUrl,
    siteName,
    title: "ConvertGeine | Free PDF, Photo & Calculator Tools",
    description: siteDescription,
  },

  twitter: {
    card: "summary",
    title: "ConvertGeine | Free PDF, Photo & Calculator Tools",
    description: siteDescription,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020617",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA">
      <body className="bg-slate-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
