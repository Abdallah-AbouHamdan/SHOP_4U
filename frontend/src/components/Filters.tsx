import { CiFilter } from "react-icons/ci";
import { useStore } from "../store/useStore";

const categories = ["All", "Fashion", "Sport Zone", "Tech Zone", "Lifestyle"];
const SLIDER_MIN = 0;
const SLIDER_MAX = 2000;

export default function Filters() {
  const { filters, setFilter } = useStore();

  const handleMinRangeChange = (value: number) => {
    setFilter("minPrice", Math.min(value, filters.maxPrice));
  };

  const handleMaxRangeChange = (value: number) => {
    setFilter("maxPrice", Math.max(value, filters.minPrice));
  };

  const minPercent = (filters.minPrice / SLIDER_MAX) * 100;
  const maxPercent = (filters.maxPrice / SLIDER_MAX) * 100;
  const highlightWidth = Math.max(maxPercent - minPercent, 0);

  return (
    <section className="space-y-5 rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
      <header>
        <div className="flex">
          <span>
            <CiFilter />
          </span>
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
        <div className="space-y-2">
          <div className="relative h-5">
            <div className="absolute inset-0 flex items-center">
              <div className="h-1 w-full rounded-full bg-blue-50" />
            </div>
            <div
              className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-linear-to-br from-green-800 via-green-500 to-green-400"
              style={{ left: `${minPercent}%`, width: `${highlightWidth}%` }}
            />
            <input
              type="range"
              min={SLIDER_MIN}
              max={SLIDER_MAX}
              step={25}
              value={filters.minPrice}
              onChange={(e) => handleMinRangeChange(Number(e.target.value))}
              aria-label="Minimum price"
            className="range-input range-input--handle z-10"
            />
            <input
              type="range"
              min={SLIDER_MIN}
              max={SLIDER_MAX}
              step={25}
              value={filters.maxPrice}
              onChange={(e) => handleMaxRangeChange(Number(e.target.value))}
              aria-label="Maximum price"
              className="range-input range-input--handle z-20"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex-1 rounded-2xl border border-slate-200 bg-white px-3 py-2">
            <label className="text-xs uppercase text-slate-400">Min</label>
            <input
              type="number"
              min={0}
              max={filters.maxPrice}
              value={filters.minPrice}
              onChange={(e) => handleMinRangeChange(Number(e.target.value))}
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
              onChange={(e) => handleMaxRangeChange(Number(e.target.value))}
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

    </section>
  );
}
