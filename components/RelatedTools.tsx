import Link from "next/link";

type Tool = {
  name: string;
  href: string;
};

type Props = {
  title?: string;
  tools: Tool[];
};

export default function RelatedTools({
  title = "Related Tools",
  tools,
}: Props) {
  return (
    <section className="mt-16 rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <h2 className="text-2xl font-bold text-white">{title}</h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="rounded-xl border border-slate-700 bg-slate-950 p-4 transition hover:border-blue-500 hover:bg-slate-800"
          >
            <div className="font-semibold text-white">{tool.name}</div>
            <div className="mt-2 text-sm text-slate-400">Open tool →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
