import Link from "next/link";
import { recentlyAdded } from "@/data/homeTools";

export default function RecentlyAdded() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Recently Added
        </p>

        <h2 className="mt-3 text-3xl font-bold">
          New tools to try
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recentlyAdded.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-blue-500/50"
            >
              <div className="text-3xl">{tool.icon}</div>

              <h3 className="mt-3 font-bold">{tool.title}</h3>

              <p className="mt-2 text-sm text-slate-400">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
