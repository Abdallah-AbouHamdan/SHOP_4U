import { FaStar } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { useStore } from "../store/useStore";

type Props = { id: string };

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export default function ProductCard({ id }: Props) {
  const { products, addToCart } = useStore();
  const p = products.find((x) => x.id === id);
  if (!p) return null;

  const hasCompare = typeof p.compareAtPrice === "number";
  const discountPercent =
    hasCompare && p.compareAtPrice
      ? Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100)
      : null;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white p-4 shadow-[0_15px_45px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:border-slate-200 hover:shadow-[0_20px_55px_rgba(15,23,42,0.12)]">
      <div className="relative overflow-hidden rounded-2xl bg-slate-100">
        <img
          src={p.image}
          className="h-56 w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
          alt={p.title}
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-900/60 via-slate-900/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        <div className="absolute left-4 right-4 top-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700 shadow">
            {p.category}
          </span>
          {discountPercent && (
            <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow">
              Save {discountPercent}%
            </span>
          )}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-semibold text-white">
          <span className="flex items-center gap-1">
            <FaStar className="text-amber-400" />
            <span>{p.rating.toFixed(1)}</span>
            <span className="text-[11px] text-white/80">
              ({p.reviews.toLocaleString()})
            </span>
          </span>
          <span className="uppercase tracking-wide text-white/80">
            {p.seller}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-1 py-4 text-sm text-slate-600 sm:px-2">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{p.title}</h3>
          <p className="text-slate-500">{p.tagline}</p>
        </div>

        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-semibold text-slate-900">
            {currency.format(p.price)}
          </span>
          {hasCompare && (
            <span className="text-sm text-slate-400 line-through">
              {currency.format(p.compareAtPrice!)}
            </span>
          )}
        </div>

        <div className="mt-auto">
          <button
            onClick={() => addToCart(p.id)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <GiShoppingCart aria-hidden />
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
