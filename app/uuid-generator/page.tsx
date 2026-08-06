"use client";

import { useState } from "react";
import Link from "next/link";
import ToolSeoSection from "@/components/ToolSeoSection";
import RelatedTools from "@/components/RelatedTools";

function generateUUID() {
  return crypto.randomUUID();
}

export default function UUIDGeneratorPage() {
  const [uuids, setUuids] = useState([generateUUID()]);
  const [count, setCount] = useState(1);

  function generate() {
    setUuids(
      Array.from(
        { length: count },
        () => generateUUID()
      )
    );
  }

  async function copyAll() {
    await navigator.clipboard.writeText(
      uuids.join("\n")
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-16">
      <div className="mx-auto max-w-4xl">

        <Link
          href="/"
          className="text-blue-400"
        >
          ← Back
        </Link>

        <h1 className="mt-8 text-5xl font-bold">
          UUID Generator
        </h1>

        <p className="mt-4 text-slate-400">
          Generate secure Version 4 UUIDs instantly.
        </p>

        <div className="mt-8 flex gap-4">

          <select
            value={count}
            onChange={(e)=>
              setCount(Number(e.target.value))
            }
            className="rounded-xl bg-slate-900 border border-slate-700 px-4 py-3"
          >
            {[1,5,10,20,50,100].map(n=>(
              <option key={n}>
                {n}
              </option>
            ))}
          </select>

          <button
            onClick={generate}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold"
          >
            Generate
          </button>

          <button
            onClick={copyAll}
            className="rounded-xl bg-green-600 px-6 py-3 font-semibold"
          >
            Copy All
          </button>

        </div>

        <div className="mt-8 rounded-2xl bg-slate-900 border border-slate-800 p-6">

          {uuids.map((uuid,index)=>(
            <div
              key={index}
              className="border-b border-slate-800 py-3 break-all"
            >
              {uuid}
            </div>
          ))}

        </div>

        <ToolSeoSection
          tool="UUID Generator"
          description="Generate Version 4 UUIDs instantly using your browser."
          steps={[
            "Select quantity.",
            "Generate UUIDs.",
            "Copy or use them."
          ]}
          benefits={[
            "Secure random UUIDs.",
            "Unlimited generation.",
            "Works offline."
          ]}
        />

        <RelatedTools
          tools={[
            {
              name:"QR Code Generator",
              href:"/qr-code-generator"
            },
            {
              name:"Barcode Generator",
              href:"/barcode-generator"
            },
            {
              name:"Image Compressor",
              href:"/image-compressor"
            },
            {
              name:"WebP Converter",
              href:"/webp-converter"
            }
          ]}
        />

      </div>
    </main>
  );
}
