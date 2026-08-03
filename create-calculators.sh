#!/bin/bash

set -e

PROJECT="$HOME/convertgeine"

mkdir -p \
  "$PROJECT/app/bmi-calculator" \
  "$PROJECT/app/percentage-calculator" \
  "$PROJECT/app/kg-to-pounds" \
  "$PROJECT/app/temperature-converter" \
  "$PROJECT/app/km-to-miles" \
  "$PROJECT/app/inches-to-cm" \
  "$PROJECT/app/gst-hst-calculator"

cat > "$PROJECT/app/bmi-calculator/page.tsx" <<'EOF'
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
EOF

cat > "$PROJECT/app/percentage-calculator/page.tsx" <<'EOF'
"use client";

import Link from "next/link";
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
      </div>
    </main>
  );
}
EOF

cat > "$PROJECT/app/kg-to-pounds/page.tsx" <<'EOF'
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
EOF

cat > "$PROJECT/app/temperature-converter/page.tsx" <<'EOF'
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
EOF

cat > "$PROJECT/app/km-to-miles/page.tsx" <<'EOF'
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
EOF

cat > "$PROJECT/app/inches-to-cm/page.tsx" <<'EOF'
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
EOF

cat > "$PROJECT/app/gst-hst-calculator/page.tsx" <<'EOF'
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
EOF

echo "All calculator pages created successfully."
