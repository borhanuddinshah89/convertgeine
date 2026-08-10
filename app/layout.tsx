import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Footer from "@/components/Footer";
import "./globals.css";

const siteUrl = "https://www.convertgeine.com";
const siteName = "ConvertGeine";
const siteDescription =
  "Use free online tools to compress, merge, split and convert PDFs, create passport photos, calculate BMI and age, and convert units. No registration required.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Free PDF, Image & Calculator Tools | ConvertGeine",
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
    title: "Free PDF, Image & Calculator Tools | ConvertGeine",
    description: siteDescription,
  },

  twitter: {
    card: "summary",
    title: "Free PDF, Image & Calculator Tools | ConvertGeine",
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
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9419298891554328"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-slate-950 text-white antialiased">
        {children}
        <Footer />
        <GoogleAnalytics gaId="G-8GQ346M0XB" />
      </body>
    </html>
  );
}
