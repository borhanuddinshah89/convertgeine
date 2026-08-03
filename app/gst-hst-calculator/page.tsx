"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const taxRates = [
  { name: "GST 5%", value: 5 },
  { name: "HST 13%", value: 13 },
  { name: "HST 15%", value: 15 },
  { name: "Custom rate", value: 0 },
];

export default function GstHstCalculatorPage() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("5");
  const [customRate, setCustomRate] = useState("");

  const result = useMemo(() => {
    const baseAmount = Number(amount);
    const selectedRate = Number(rate) === 0 ? Number(customRate) : Number(rate);

    if (
      amount === "" ||
      Number.isNaN(baseAmount) ||
      Number.isNaN(selectedRate)
    ) {
      return null;
    }

    const tax = baseAmount * selectedRate / 100;

    return {
      rate: selectedRate,
      tax,
      total: baseAmount + tax,
    };
  }, [amount, rate, customRate]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-blue-400">← Back to Home</Link>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <div className="text-center">
            <div className="text-6xl">🇨🇦</div>
            <h1 className="mt-5 text-4xl font-bold">
              GST / HST Calculator
            </h1>
          </div>

          <div className="mt-10 space-y-5">
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="Amount before tax"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4"
            />

            <select
              value={rate}
              onChange={(event) => setRate(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4"
            >
              {taxRates.map((taxRate) => (
                <option key={taxRate.name} value={taxRate.value}>
                  {taxRate.name}
                </option>
              ))}
            </select>

            {rate === "0" && (
              <input
                type="number"
                min="0"
                value={customRate}
                onChange={(event) => setCustomRate(event.target.value)}
                placeholder="Custom tax rate %"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4"
              />
            )}
          </div>

          {result && (
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-950 p-5 text-center">
                <p className="text-sm text-slate-400">Rate</p>
                <p className="mt-2 text-2xl font-bold">{result.rate}%</p>
              </div>

              <div className="rounded-xl bg-slate-950 p-5 text-center">
                <p className="text-sm text-slate-400">Tax</p>
                <p className="mt-2 text-2xl font-bold text-blue-400">
                  ${result.tax.toFixed(2)}
                </p>
              </div>

              <div className="rounded-xl bg-slate-950 p-5 text-center">
                <p className="text-sm text-slate-400">Total</p>
                <p className="mt-2 text-2xl font-bold text-emerald-400">
                  ${result.total.toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
