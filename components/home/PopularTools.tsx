import Link from "next/link";
import { popularTools } from "@/data/homeTools";

export default function PopularTools() {
  return (
    <section id="popular-tools" className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Popular Tools
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Get things done quickly
          </h2>

          <p className="mt-3 text-slate-400">
            Start with some of the most useful ConvertGeine tools.
          </p>
        </div>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popularTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:-translate-y-1 hover:border-blue-500/50"
            >
              <div className="text-3xl">{tool.icon}</div>

              <h3 className="mt-4 text-lg font-bold group-hover:text-blue-400">
                {tool.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {tool.description}
              </p>

              <p className="mt-4 text-sm font-semibold text-blue-400">
                Open Tool →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
