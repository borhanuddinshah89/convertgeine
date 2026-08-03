"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function KmToMilesPage() {
  const [kilometres, setKilometres] = useState("");
  const [miles, setMiles] = useState("");

  const milesResult = useMemo(() => {
    const value = Number(kilometres);
    return kilometres === "" || Number.isNaN(value)
      ? null
      : value * 0.6213711922;
  }, [kilometres]);

  const kilometresResult = useMemo(() => {
    const value = Number(miles);
    return miles === "" || Number.isNaN(value)
      ? null
      : value / 0.6213711922;
  }, [miles]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-blue-400">← Back to Home</Link>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h1 className="text-center text-4xl font-bold">
            KM ↔ Miles Converter
          </h1>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <section className="rounded-2xl bg-slate-950/50 p-6">
              <input
                type="number"
                value={kilometres}
                onChange={(event) => setKilometres(event.target.value)}
                placeholder="Kilometres"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4"
              />

              {milesResult !== null && (
                <p className="mt-6 text-center text-3xl font-bold text-blue-400">
                  {milesResult.toFixed(3)} miles
                </p>
              )}
            </section>

            <section className="rounded-2xl bg-slate-950/50 p-6">
              <input
                type="number"
                value={miles}
                onChange={(event) => setMiles(event.target.value)}
                placeholder="Miles"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4"
              />

              {kilometresResult !== null && (
                <p className="mt-6 text-center text-3xl font-bold text-emerald-400">
                  {kilometresResult.toFixed(3)} km
                </p>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
