import { useStore } from "../store/useStore";

const categories = ["All", "Fashion Forward", "Sport Zone", "Tech Zone", "Lifestyle"];

export default function Filters() {
  const { filters, setFilter } = useStore();

  return (
    <section className="space-y-5 rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-purple-500">
          Filters
        </p>
        <h2 className="text-xl font-semibold text-slate-900">Fine tune results</h2>
        <p className="text-sm text-slate-500">
          Shop from trusted sellers across multiple categories.
        </p>
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
            
          </select>
        </div>
      </div>
      </section>
      )}