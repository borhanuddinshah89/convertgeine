"use client";

import Link from "next/link";
import ToolSeoSection from "@/components/ToolSeoSection";
import { useMemo, useState } from "react";

export default function PercentageCalculatorPage() {
  const [percentage, setPercentage] = useState("");
  const [number, setNumber] = useState("");

  const result = useMemo(() => {
    const percentValue = Number(percentage);
    const numberValue = Number(number);

    if (
      percentage === "" ||
      number === "" ||
      Number.isNaN(percentValue) ||
      Number.isNaN(numberValue)
    ) {
      return null;
    }

    return (percentValue / 100) * numberValue;
  }, [percentage, number]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-blue-400">← Back to Home</Link>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <div className="text-center">
            <div className="text-6xl">%</div>
            <h1 className="mt-5 text-4xl font-bold">
              Percentage Calculator
            </h1>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <input
              type="number"
              value={percentage}
              onChange={(event) => setPercentage(event.target.value)}
              placeholder="Percentage"
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-4"
            />

            <input
              type="number"
              value={number}
              onChange={(event) => setNumber(event.target.value)}
              placeholder="Number"
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-4"
            />
          </div>

          {result !== null && (
            <div className="mt-8 rounded-2xl bg-emerald-500/10 p-6 text-center">
              <p className="text-sm text-slate-400">Result</p>
              <p className="mt-3 text-5xl font-bold text-emerald-400">
                {result.toLocaleString(undefined, {
                  maximumFractionDigits: 4,
                })}
              </p>
            </div>
          )}
        </div>
        <ToolSeoSection
          tool="Percentage Calculator"
          description="Calculate percentages quickly for discounts, taxes, tips, marks, price changes, and everyday math. Use the tool to find a percentage of a number or compare values."
          steps={[
            "Enter the number or values you want to calculate.",
            "Choose the percentage calculation you need.",
            "Click the calculate button.",
            "Review the result instantly.",
          ]}
          benefits={[
            "Calculate discounts and price changes.",
            "Work out marks, tips, taxes, and percentages.",
            "Get instant results without registration.",
            "Works on phones, tablets, and computers.",
          ]}
        />
      </div>
    </main>
  );
}
