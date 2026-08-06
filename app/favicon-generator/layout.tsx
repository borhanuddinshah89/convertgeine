import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Favicon Generator",
  description: "Generate favicon.ico and favicon PNG sizes online.",
};

export default function Layout({
  children,
}:{
  children:React.ReactNode
}){
  return children;
}
