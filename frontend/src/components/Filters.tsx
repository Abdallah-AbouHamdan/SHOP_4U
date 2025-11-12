import { CiFilter } from "react-icons/ci";
import { useStore } from "../store/useStore";

const categories = ["All", "Fashion", "Sport Zone", "Tech Zone", "Lifestyle"];

export default function Filters() {
  const { filters, setFilter } = useStore();

  return (
    <section className="space-y-5 rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
      <header>
        <div className="flex">
          <span><CiFilter /></span>
           <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Filters
        </p>
        </div>
       
      </header>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Category
        </label>
        <div className="rounded-2xl border border-slate-200 bg-white px-3">
          <select
            className="w-full border-none bg-transparent py-2 text-sm font-medium text-slate-800 outline-none"
            value={filters.category}
            onChange={(e) => setFilter("category", e.target.value)}
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Price range
        </label>
        <input
          type="range"
          min={0}
          max={2000}
          step={25}
          value={filters.maxPrice}
          onChange={(e) => setFilter("maxPrice", Number(e.target.value))}
          aria-label="Maximum price"
          className="range-input"
        />
        <div className="flex items-center gap-3 text-sm">
          <div className="flex-1 rounded-2xl border border-slate-200 bg-white px-3 py-2">
            <label className="text-xs uppercase text-slate-400">Min</label>
            <input
              type="number"
              min={0}
              max={filters.maxPrice}
              value={filters.minPrice}
              onChange={(e) => setFilter("minPrice", Number(e.target.value))}
              className="w-full bg-transparent text-slate-800 outline-none"
            />
          </div>
          <span className="text-xs font-semibold uppercase text-slate-400">to</span>
          <div className="flex-1 rounded-2xl border border-slate-200 bg-white px-3 py-2">
            <label className="text-xs uppercase text-slate-400">Max</label>
            <input
              type="number"
              min={filters.minPrice}
              max={2000}
              value={filters.maxPrice}
              onChange={(e) => setFilter("maxPrice", Number(e.target.value))}
              className="w-full bg-transparent text-slate-800 outline-none"
            />
          </div>
        </div>
      </div>

      <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
        Discounted items only
        <input
          type="checkbox"
          className="toggle-input"
          checked={filters.discounted}
          onChange={(e) => setFilter("discounted", e.target.checked)}
        />
      </label>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Sort by
        </label>
        <div className="rounded-2xl border border-slate-200 bg-white px-3">
          <select
            className="w-full border-none bg-transparent py-2 text-sm font-medium text-slate-800 outline-none"
            value={filters.sort}
            onChange={(e) =>
              setFilter("sort", e.target.value as "popular" | "priceLow" | "priceHigh")
            }
          >
            <option value="popular">Most Popular</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>
      </div>
    </section>
  );
}
