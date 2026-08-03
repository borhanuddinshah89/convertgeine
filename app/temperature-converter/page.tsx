"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function TemperatureConverterPage() {
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");

  const fahrenheitResult = useMemo(() => {
    const value = Number(celsius);
    return celsius === "" || Number.isNaN(value)
      ? null
      : value * 9 / 5 + 32;
  }, [celsius]);

  const celsiusResult = useMemo(() => {
    const value = Number(fahrenheit);
    return fahrenheit === "" || Number.isNaN(value)
      ? null
      : (value - 32) * 5 / 9;
  }, [fahrenheit]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-blue-400">← Back to Home</Link>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h1 className="text-center text-4xl font-bold">
            Temperature Converter
          </h1>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <section className="rounded-2xl bg-slate-950/50 p-6">
              <input
                type="number"
                value={celsius}
                onChange={(event) => setCelsius(event.target.value)}
                placeholder="Celsius"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4"
              />

              {fahrenheitResult !== null && (
                <p className="mt-6 text-center text-3xl font-bold text-orange-400">
                  {fahrenheitResult.toFixed(2)} °F
                </p>
              )}
            </section>

            <section className="rounded-2xl bg-slate-950/50 p-6">
              <input
                type="number"
                value={fahrenheit}
                onChange={(event) => setFahrenheit(event.target.value)}
                placeholder="Fahrenheit"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4"
              />

              {celsiusResult !== null && (
                <p className="mt-6 text-center text-3xl font-bold text-blue-400">
                  {celsiusResult.toFixed(2)} °C
                </p>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
