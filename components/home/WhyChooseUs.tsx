const benefits = [
  ["⚡", "Fast", "Designed for quick everyday tasks."],
  ["🔒", "Privacy focused", "Many tools process files directly in your browser."],
  ["🚫", "No account required", "Use the free tools without creating an account."],
  ["📱", "Mobile friendly", "Works on phones, tablets and computers."],
];

export default function WhyChooseUs() {
  return (
    <section className="border-t border-slate-800 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            Why use ConvertGeine?
          </h2>

          <p className="mt-3 text-slate-400">
            Practical online tools without unnecessary steps.
          </p>
        </div>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(([icon, title, description]) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <div className="text-3xl">{icon}</div>
              <h3 className="mt-3 font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
