"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function InchesToCmPage() {
  const [inches, setInches] = useState("");
  const [centimetres, setCentimetres] = useState("");

  const centimetresResult = useMemo(() => {
    const value = Number(inches);
    return inches === "" || Number.isNaN(value) ? null : value * 2.54;
  }, [inches]);

  const inchesResult = useMemo(() => {
    const value = Number(centimetres);
    return centimetres === "" || Number.isNaN(value) ? null : value / 2.54;
  }, [centimetres]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-blue-400">← Back to Home</Link>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h1 className="text-center text-4xl font-bold">
            Inches ↔ CM Converter
          </h1>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <section className="rounded-2xl bg-slate-950/50 p-6">
              <input
                type="number"
                value={inches}
                onChange={(event) => setInches(event.target.value)}
                placeholder="Inches"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4"
              />

              {centimetresResult !== null && (
                <p className="mt-6 text-center text-3xl font-bold text-blue-400">
                  {centimetresResult.toFixed(2)} cm
                </p>
              )}
            </section>

            <section className="rounded-2xl bg-slate-950/50 p-6">
              <input
                type="number"
                value={centimetres}
                onChange={(event) => setCentimetres(event.target.value)}
                placeholder="Centimetres"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4"
              />

              {inchesResult !== null && (
                <p className="mt-6 text-center text-3xl font-bold text-emerald-400">
                  {inchesResult.toFixed(2)} inches
                </p>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
