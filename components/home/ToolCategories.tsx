import Link from "next/link";
import { categories } from "@/data/homeTools";

export default function ToolCategories() {
  return (
    <section
      id="all-tools"
      className="border-y border-slate-800 bg-slate-900/30 px-6 py-16"
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            All Tools
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Browse by category
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Open a category only when you need it. This keeps the homepage
            simple while every tool remains easy to find.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {categories.map((category) => (
            <details
              key={category.id}
              id={category.id}
              className="group scroll-mt-24 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 p-5 sm:p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600/15 text-2xl">
                  {category.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold">
                    {category.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {category.description}
                  </p>
                </div>

                <div className="hidden sm:block">
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
                    {category.tools.length} tools
                  </span>
                </div>

                <span className="text-slate-500 transition group-open:rotate-180">
                  ↓
                </span>
              </summary>

              <div className="grid gap-3 border-t border-slate-800 p-4 sm:grid-cols-2">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4 transition hover:border-blue-500/50"
                  >
                    <span className="text-2xl">{tool.icon}</span>

                    <div>
                      <p className="font-semibold">{tool.title}</p>
                      <p className="mt-1 text-sm leading-5 text-slate-400">
                        {tool.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
