import Logo from "@/components/Logo";
import Hero from "@/components/home/Hero";
import HomeHero from "@/components/home/HomeHero";
import PopularTools from "@/components/home/PopularTools";
import ToolCategories from "@/components/home/ToolCategories";
import RecentlyAdded from "@/components/home/RecentlyAdded";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo />

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 lg:flex">
            <a href="#pdf-tools" className="hover:text-white">
              PDF
            </a>
            <a href="#image-tools" className="hover:text-white">
              Images
            </a>
            <a href="#calculators" className="hover:text-white">
              Calculators
            </a>
            <a href="#unit-converters" className="hover:text-white">
              Converters
            </a>
            <a href="#utilities" className="hover:text-white">
              Utilities
            </a>
            <a href="/blog" className="hover:text-white">
              Guides
            </a>
          </nav>

          <a
            href="#all-tools"
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-700"
          >
            Browse Tools
          </a>
        </div>
      </header>

      <Hero />
      <PopularTools />
      <ToolCategories />
      <RecentlyAdded />
      <WhyChooseUs />
    </main>
  );
}
