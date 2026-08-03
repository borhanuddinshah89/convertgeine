"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function AgeCalculatorPage() {
  const today = new Date().toISOString().split("T")[0];

  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState(today);

  const result = useMemo(() => {
    if (!birthDate) return null;

    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (birth > target) {
      return { error: "Birth date cannot be after the target date." };
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const previousMonth = new Date(
        target.getFullYear(),
        target.getMonth(),
        0
      );
      days += previousMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor(
      (target.getTime() - birth.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    return {
      years,
      months,
      days,
      totalDays,
    };
  }, [birthDate, targetDate]);

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-16">
      <div className="mx-auto max-w-3xl">

        <Link
          href="/"
          className="text-blue-400 hover:text-blue-300"
        >
          ← Back to Home
        </Link>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

          <div className="text-center">

            <div className="text-6xl">🎂</div>

            <h1 className="mt-5 text-5xl font-bold">
              Age Calculator
            </h1>

            <p className="mt-4 text-slate-400">
              Calculate your exact age in years,
              months and days.
            </p>

          </div>

          <div className="mt-10 space-y-6">

            <div>

              <label className="mb-2 block font-semibold">
                Date of Birth
              </label>

              <input
                type="date"
                value={birthDate}
                onChange={(e) =>
                  setBirthDate(e.target.value)
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4"
              />

            </div>

            <div>

              <label className="mb-2 block font-semibold">
                Calculate Age On
              </label>

              <input
                type="date"
                value={targetDate}
                onChange={(e) =>
                  setTargetDate(e.target.value)
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4"
              />

            </div>

          </div>

          {result && !("error" in result) && (

            <div className="mt-10 grid gap-5 md:grid-cols-2">

              <div className="rounded-2xl bg-slate-950 p-6 text-center">

                <div className="text-4xl font-bold text-blue-400">
                  {result.years}
                </div>

                <div className="mt-2 text-slate-400">
                  Years
                </div>

              </div>

              <div className="rounded-2xl bg-slate-950 p-6 text-center">

                <div className="text-4xl font-bold text-green-400">
                  {result.months}
                </div>

                <div className="mt-2 text-slate-400">
                  Months
                </div>

              </div>

              <div className="rounded-2xl bg-slate-950 p-6 text-center">

                <div className="text-4xl font-bold text-purple-400">
                  {result.days}
                </div>

                <div className="mt-2 text-slate-400">
                  Days
                </div>

              </div>

              <div className="rounded-2xl bg-slate-950 p-6 text-center">

                <div className="text-4xl font-bold text-yellow-400">
                  {result.totalDays.toLocaleString()}
                </div>

                <div className="mt-2 text-slate-400">
                  Total Days
                </div>

              </div>

            </div>

          )}

          {result && "error" in result && (

            <div className="mt-8 rounded-xl bg-red-500/10 p-4 text-red-300">
              {result.error}
            </div>

          )}

        </div>
      </div>
    </main>
  );
}
