const features = [
  {
    title: "100% Free",
    description: "No registration or hidden fees.",
  },
  {
    title: "Private",
    description: "Your files stay on your device whenever possible.",
  },
  {
    title: "Fast",
    description: "Most conversions finish in seconds.",
  },
  {
    title: "Works Everywhere",
    description: "Desktop, tablet and mobile supported.",
  },
];

export default function ToolFeatures() {
  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold">
        Why use ConvertGeine?
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {features.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
          >
            <h3 className="text-lg font-semibold">
              {item.title}
            </h3>

            <p className="mt-2 text-slate-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
