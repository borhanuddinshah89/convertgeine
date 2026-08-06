import type { Metadata } from "next";

export const metadata: Metadata = {
  title:"Free UUID Generator",
  description:"Generate Version 4 UUIDs online for free.",
};

export default function Layout({children}:{children:React.ReactNode}){
  return children;
}
