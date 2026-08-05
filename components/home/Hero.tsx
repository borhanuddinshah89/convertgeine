export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl py-16 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight">
        Free Online PDF, Image, ZIP & Calculator Tools
      </h1>

      <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
        Fast, secure and completely free online tools.
        No registration. No installation.
        Works on desktop and mobile.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
        <span className="rounded-full bg-green-900/30 px-4 py-2">✅ Free Forever</span>
        <span className="rounded-full bg-blue-900/30 px-4 py-2">🔒 Secure</span>
        <span className="rounded-full bg-purple-900/30 px-4 py-2">📱 Mobile Friendly</span>
        <span className="rounded-full bg-orange-900/30 px-4 py-2">⚡ Fast</span>
      </div>
    </section>
  );
}
