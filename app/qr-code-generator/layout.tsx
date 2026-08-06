import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free QR Code Generator Online",
  description:
    "Create free QR codes for URLs, text, Wi-Fi, email and phone numbers. Customize the size and colours, then download your QR code as PNG.",
  alternates: {
    canonical: "/qr-code-generator",
  },
  openGraph: {
    title: "Free QR Code Generator Online | ConvertGeine",
    description:
      "Generate customizable QR codes for websites, Wi-Fi, text, email and phone numbers.",
    url: "https://www.convertgeine.com/qr-code-generator",
    type: "website",
  },
};

export default function QrCodeGeneratorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
