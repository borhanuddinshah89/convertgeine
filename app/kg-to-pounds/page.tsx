"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function KgToPoundsPage() {
  const [kg, setKg] = useState("");
  const [pounds, setPounds] = useState("");

  const kgResult = useMemo(() => {
    const value = Number(kg);
    return kg === "" || Number.isNaN(value) ? null : value * 2.2046226218;
  }, [kg]);

  const poundsResult = useMemo(() => {
    const value = Number(pounds);
    return pounds === "" || Number.isNaN(value) ? null : value / 2.2046226218;
  }, [pounds]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-blue-400">← Back to Home</Link>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h1 className="text-center text-4xl font-bold">
            KG ↔ Pounds Converter
          </h1>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <section className="rounded-2xl bg-slate-950/50 p-6">
              <input
                type="number"
                value={kg}
                onChange={(event) => setKg(event.target.value)}
                placeholder="Kilograms"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4"
              />

              {kgResult !== null && (
                <p className="mt-6 text-center text-3xl font-bold text-blue-400">
                  {kgResult.toFixed(2)} lb
                </p>
              )}
            </section>

            <section className="rounded-2xl bg-slate-950/50 p-6">
              <input
                type="number"
                value={pounds}
                onChange={(event) => setPounds(event.target.value)}
                placeholder="Pounds"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4"
              />

              {poundsResult !== null && (
                <p className="mt-6 text-center text-3xl font-bold text-emerald-400">
                  {poundsResult.toFixed(2)} kg
                </p>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
