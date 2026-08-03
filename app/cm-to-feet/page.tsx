"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function CmToFeetPage() {
  const [centimetres, setCentimetres] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");

  const cmResult = useMemo(() => {
    const cm = Number(centimetres);

    if (!centimetres || Number.isNaN(cm) || cm < 0) {
      return null;
    }

    const totalInches = cm / 2.54;
    const wholeFeet = Math.floor(totalInches / 12);
    const remainingInches = totalInches - wholeFeet * 12;

    return {
      feet: wholeFeet,
      inches: remainingInches,
      totalInches,
    };
  }, [centimetres]);

  const feetResult = useMemo(() => {
    const feetNumber = Number(feet || 0);
    const inchesNumber = Number(inches || 0);

    if (
      (!feet && !inches) ||
      Number.isNaN(feetNumber) ||
      Number.isNaN(inchesNumber) ||
      feetNumber < 0 ||
      inchesNumber < 0
    ) {
      return null;
    }

    const totalInches = feetNumber * 12 + inchesNumber;
    const cm = totalInches * 2.54;

    return {
      centimetres: cm,
      metres: cm / 100,
    };
  }, [feet, inches]);

  function clearAll() {
    setCentimetres("");
    setFeet("");
    setInches("");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          ← Back to Home
        </Link>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          <div className="text-center">
            <div className="text-6xl">📏</div>

            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              CM to Feet and Inches
            </h1>

            <p className="mt-4 text-slate-400">
              Convert centimetres to feet and inches, or convert feet and
              inches back to centimetres.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <section className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6">
              <h2 className="text-2xl font-bold">
                Centimetres to Feet
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Enter a height or measurement in centimetres.
              </p>

              <label
                htmlFor="centimetres"
                className="mt-6 block text-sm font-semibold text-slate-300"
              >
                Centimetres
              </label>

              <div className="mt-2 flex overflow-hidden rounded-xl border border-slate-700 bg-slate-950 focus-within:border-blue-500">
                <input
                  id="centimetres"
                  type="number"
                  min="0"
                  step="0.01"
                  value={centimetres}
                  onChange={(event) => setCentimetres(event.target.value)}
                  placeholder="Example: 175"
                  className="min-w-0 flex-1 bg-transparent px-4 py-4 text-white outline-none placeholder:text-slate-600"
                />

                <span className="flex items-center border-l border-slate-700 px-4 text-slate-400">
                  cm
                </span>
              </div>

              {cmResult && (
                <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-6 text-center">
                  <p className="text-sm font-semibold uppercase tracking-wider text-blue-300">
                    Result
                  </p>

                  <p className="mt-3 text-4xl font-bold">
                    {cmResult.feet} ft {cmResult.inches.toFixed(2)} in
                  </p>

                  <p className="mt-3 text-sm text-slate-400">
                    {cmResult.totalInches.toFixed(2)} total inches
                  </p>
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6">
              <h2 className="text-2xl font-bold">
                Feet and Inches to CM
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Enter feet and inches to convert them to centimetres.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="feet"
                    className="block text-sm font-semibold text-slate-300"
                  >
                    Feet
                  </label>

                  <div className="mt-2 flex overflow-hidden rounded-xl border border-slate-700 bg-slate-950 focus-within:border-blue-500">
                    <input
                      id="feet"
                      type="number"
                      min="0"
                      step="1"
                      value={feet}
                      onChange={(event) => setFeet(event.target.value)}
                      placeholder="5"
                      className="min-w-0 flex-1 bg-transparent px-4 py-4 text-white outline-none placeholder:text-slate-600"
                    />

                    <span className="flex items-center border-l border-slate-700 px-3 text-slate-400">
                      ft
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="inches"
                    className="block text-sm font-semibold text-slate-300"
                  >
                    Inches
                  </label>

                  <div className="mt-2 flex overflow-hidden rounded-xl border border-slate-700 bg-slate-950 focus-within:border-blue-500">
                    <input
                      id="inches"
                      type="number"
                      min="0"
                      step="0.01"
                      value={inches}
                      onChange={(event) => setInches(event.target.value)}
                      placeholder="9"
                      className="min-w-0 flex-1 bg-transparent px-4 py-4 text-white outline-none placeholder:text-slate-600"
                    />

                    <span className="flex items-center border-l border-slate-700 px-3 text-slate-400">
                      in
                    </span>
                  </div>
                </div>
              </div>

              {feetResult && (
                <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6 text-center">
                  <p className="text-sm font-semibold uppercase tracking-wider text-emerald-300">
                    Result
                  </p>

                  <p className="mt-3 text-4xl font-bold">
                    {feetResult.centimetres.toFixed(2)} cm
                  </p>

                  <p className="mt-3 text-sm text-slate-400">
                    {feetResult.metres.toFixed(3)} metres
                  </p>
                </div>
              )}
            </section>
          </div>

          <button
            type="button"
            onClick={clearAll}
            className="mt-8 w-full rounded-xl border border-slate-700 bg-slate-800 py-4 font-semibold transition hover:bg-slate-700"
          >
            Clear All
          </button>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/50 p-6">
            <h2 className="text-xl font-bold">
              Conversion formula
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              One inch equals 2.54 centimetres, and one foot equals 12
              inches.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
