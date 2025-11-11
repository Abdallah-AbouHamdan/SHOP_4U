import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import Filters from "../components/Filters";
import ProductGrid from "../components/ProductGrid";

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilters = () => setIsFilterOpen((prev) => !prev);
  return (
    <div className="bg-[#ffffff] pb-16 pt-8">
      <section className="mx-auto mb-10 w-11/12 max-w-6xl rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-200/60 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-slate-500 sm:text-xs">
              Discover
            </p>
            <h1 className="text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl md:text-4xl">
              Discover Amazing Products
            </h1>
            <p className="text-sm text-slate-500 sm:text-base">
              Shop from trusted sellers across multiple categories
            </p>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-6">
        <button
          onClick={toggleFilters}
          aria-expanded={isFilterOpen}
          aria-controls="mobile-filters"
          className="mb-6 flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 lg:hidden"
        >
          <span className="flex items-center gap-2">
            <CiFilter />
            Filters
          </span>
          <span className="text-xs uppercase tracking-widest text-slate-400">
            {isFilterOpen ? "Hide" : "Show"}
          </span>
        </button>
        {isFilterOpen && (
          <div id="mobile-filters" className="mb-8 lg:hidden">
            <Filters />
          </div>
        )}
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 lg:flex-row">
        <aside className="hidden w-full shrink-0 lg:block lg:w-72">
          <Filters />
        </aside>
        <main className="flex-1 space-y-6">
          

          <ProductGrid />
        </main>
      </div>
    </div>
  );
}