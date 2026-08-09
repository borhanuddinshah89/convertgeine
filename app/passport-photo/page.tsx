import type { Metadata } from "next";
import PassportPhotoClient from "./PassportPhotoClient";

export const metadata: Metadata = {
  title: "Passport Photo Maker Online Free | ConvertGeine",
  description:
    "Create passport-style photos online for free. Crop and resize your photo for common document photo sizes with no signup required.",
  alternates: {
    canonical: "https://www.convertgeine.com/passport-photo",
  },
  openGraph: {
    title: "Passport Photo Maker Online Free | ConvertGeine",
    description:
      "Create and resize passport-style photos online for free. Fast, simple and no signup required.",
    url: "https://www.convertgeine.com/passport-photo",
    siteName: "ConvertGeine",
    type: "website",
  },
};

export default function PassportPhotoPage() {
  return <PassportPhotoClient />;
}
