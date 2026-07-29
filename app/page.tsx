export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="max-w-2xl px-6 text-center">
        <h1 className="text-5xl font-bold text-blue-600">
          ConvertGeine
        </h1>

        <p className="mt-4 text-xl text-gray-700">
          Your AI Productivity Hub
        </p>

        <p className="mt-6 text-gray-500">
          Convert files, compress PDFs, edit images, and use AI tools—all in
          one place.
        </p>

        <button className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
          Explore Tools
        </button>
      </div>
    </main>
  );
}