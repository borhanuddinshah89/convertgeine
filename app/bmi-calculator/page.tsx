"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function BmiCalculatorPage() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const result = useMemo(() => {
    const kg = Number(weight);
    const cm = Number(height);

    if (!kg || !cm || kg <= 0 || cm <= 0) return null;

    const metres = cm / 100;
    const bmi = kg / (metres * metres);

    let category = "Normal weight";

    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal weight";
    else if (bmi < 30) category = "Overweight";
    else category = "Obesity range";

    return { bmi, category };
  }, [weight, height]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-blue-400">← Back to Home</Link>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <div className="text-center">
            <div className="text-6xl">⚖️</div>
            <h1 className="mt-5 text-4xl font-bold">BMI Calculator</h1>
            <p className="mt-3 text-slate-400">
              Calculate body mass index from weight and height.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <input
              type="number"
              min="0"
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              placeholder="Weight in kg"
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-4"
            />

            <input
              type="number"
              min="0"
              value={height}
              onChange={(event) => setHeight(event.target.value)}
              placeholder="Height in cm"
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-4"
            />
          </div>

          {result && (
            <div className="mt-8 rounded-2xl bg-blue-500/10 p-6 text-center">
              <p className="text-5xl font-bold text-blue-400">
                {result.bmi.toFixed(1)}
              </p>
              <p className="mt-3 text-slate-300">{result.category}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
