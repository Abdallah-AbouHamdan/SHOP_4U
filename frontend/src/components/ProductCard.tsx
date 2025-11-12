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
  const { products, addToCart, openProductModal } = useStore();
  const p = products.find((x) => x.id === id);
  if (!p) return null;

  const hasCompare = typeof p.compareAtPrice === "number";
  const discountPercent =
    hasCompare && p.compareAtPrice
      ? Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100)
      : null;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white p-4 shadow-[0_15px_45px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:border-slate-200 hover:shadow-[0_20px_55px_rgba(15,23,42,0.12)]">
      <button
        type="button"
        onClick={() => openProductModal(p.id)}
        className="relative w-full overflow-hidden rounded-2xl bg-slate-100 text-left transition focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        aria-label={`View details for ${p.title}`}
      >
        <img
          src={p.image}
          className="h-56 w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
          alt={p.title}
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-900/60 via-slate-900/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        <div className="absolute left-4 right-4 top-4 flex flex-wrap items-center gap-2">
          {discountPercent && (
            <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow">
              Save {discountPercent}%
            </span>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-2 bg-linear-to-t from-slate-900/95 to-transparent px-3 py-2 text-white sm:gap-3 sm:px-4 sm:py-3">
          <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.25em] sm:px-3 sm:py-1 sm:text-[11px]">
            {p.category}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-semibold sm:text-xs">
            <FaStar className="text-amber-300" />
            <span>{p.rating.toFixed(1)}</span>
            <span className="text-[10px] text-white/70 sm:text-[11px]">
              ({p.reviews.toLocaleString()})
            </span>
          </span>
        </div>
      </button>
          
      <div className="flex flex-1 flex-col gap-2 px-1 py-3 text-[13px] text-slate-600 sm:gap-3 sm:px-2 sm:py-4 sm:text-sm">
        <div>
          <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
            {p.title}
          </h3>
          <p className="text-xs text-slate-500 sm:text-sm">{p.tagline}</p>
        </div>

        <div className="flex items-baseline gap-2 sm:gap-3">
          <span className="text-xl font-semibold text-slate-900 sm:text-2xl">
            {currency.format(p.price)}
          </span>
          {hasCompare && (
            <span className="text-xs text-slate-400 line-through sm:text-sm">
              {currency.format(p.compareAtPrice!)}
            </span>
          )}
        </div>

        <div className="mt-auto">
          <button
            onClick={() => addToCart(p.id)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800 sm:px-5 sm:py-3 sm:text-sm"
          >
            <GiShoppingCart aria-hidden />
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
