import Filters from "../components/Filters";
import ProductGrid from "../components/ProductGrid";

export default function Home() {
  return (
    <div className="bg-[#e1e1e1] pb-16 pt-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-72">
          <Filters />
        </aside>
        <main className="flex-1 space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tacking-[0.3em] text-purple-500">
                  Discover
                </p>
                <h1 className="text-2xl font-semibold text-slate-900">
                  Discover Amazing Products
                </h1>
                <p className="text-sm text-slate-500">
                  Shop from trusted sellers across multiple categories
                </p>
              </div>
              <div className="flex gap-3 text-sm font-semibold">
                 <button className="rounded-2xl border border-slate-200 px-4 py-2 text-slate-600">
                  Filters
                </button>
                <button className="rounded-2xl bg-slate-900 px-4 py-2 text-white shadow">
                  Flash deals
                </button>
              </div>
            </div>
          </section>

          <ProductGrid />
        </main>
      </div>
    </div>
  );
}
