import { type MouseEvent, useEffect, useMemo, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { IoIosClose, IoIosHome } from "react-icons/io";
import { useStore } from "../store/useStore";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export default function ProductModal() {
  const { products, selectedProductId, closeProductModal, addToCart } =
    useStore();
  const [quantity, setQuantity] = useState(1);

  const product = useMemo(
    () => products.find((p) => p.id === selectedProductId),
    [products, selectedProductId]
  );

  useEffect(() => {
    setQuantity(1);
  }, [selectedProductId]);

  useEffect(() => {
    if (!selectedProductId) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProductModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeProductModal, selectedProductId]);

  if (!selectedProductId || !product) return null;

  const description = product.description ?? product.tagline;

  const hasCompare = typeof product.compareAtPrice === "number";
  const discountPercent =
    hasCompare && product.compareAtPrice
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) *
            100
        )
      : null;



  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) closeProductModal();
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i += 1) addToCart(product.id);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 px-4 py-6 backdrop-blur-sm sm:px-6 sm:py-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.title} details`}
      onMouseDown={handleOverlayClick}
    >
      <div className="relative w-full max-w-[420px] max-h-[90vh] overflow-y-auto rounded-4xl border border-slate-100 bg-white p-4 shadow-[0_30px_80px_rgba(15,23,42,0.35)] sm:max-w-3xl sm:border-slate-200 sm:p-6 md:max-h-[85vh]">
        <button
          type="button"
          onClick={closeProductModal}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:scale-105 hover:text-slate-900"
          aria-label="Close product details"
        >
          <IoIosClose className="text-2xl" />
        </button>

        <div className="pr-1 sm:pr-3">
          <div className="grid gap-4 [grid-template-columns:minmax(120px,150px)_minmax(0,1fr)] sm:grid-cols-[230px_minmax(0,1fr)] sm:items-start sm:gap-6">
            <div className="space-y-2 sm:space-y-3">
              <div className="overflow-hidden rounded-[24px] border border-slate-100 bg-slate-50 shadow-inner sm:rounded-[28px]">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-[150px] w-full object-cover sm:h-[200px]"
                />
              </div>
            </div>

            <div className="space-y-4 sm:space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500 sm:text-xs">
                <span className="inline-flex items-center gap-1">
                  <IoIosHome className="text-sm text-slate-500 sm:text-base" />
                  {product.seller}
                </span>
                {discountPercent && (
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold tracking-normal text-emerald-600 sm:px-3 sm:py-1 sm:text-xs">
                    Save {discountPercent}%
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-slate-900 sm:text-[28px]">
                  {product.title}
                </h2>
                <div className="flex items-center gap-2 text-[11px] text-slate-600 sm:text-sm">
                  <FaStar className="text-amber-400" />
                  <span className="font-semibold text-slate-900">
                    {product.rating.toFixed(1)}
                  </span>
                  <span>({product.reviews.toLocaleString()} reviews)</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400 sm:text-xs">
                  Description
                </span>
                <p className="text-[12px] leading-relaxed text-slate-600 sm:text-base sm:leading-relaxed">
                  {description}
                </p>
              </div>

              <div className="flex flex-wrap items-baseline gap-3 text-slate-900">
                <span className="text-2xl font-semibold sm:text-3xl">
                  {currency.format(product.price)}
                </span>
                {hasCompare && (
                  <span className="text-sm text-slate-400 line-through sm:text-base">
                    {currency.format(product.compareAtPrice!)}
                  </span>
                )}
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 sm:text-sm">
                    Quantity
                  </span>
                  <div className="inline-flex items-center rounded-full border border-slate-200 bg-white">
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((qty) => (qty > 1 ? qty - 1 : qty))
                      }
                      className="flex h-10 w-10 items-center justify-center text-slate-600 transition hover:text-slate-900"
                      aria-label="Decrease quantity"
                    >
                      <HiOutlineMinus />
                    </button>
                    <span className="min-w-[3ch] text-center text-base font-semibold text-slate-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((qty) => qty + 1)}
                      className="flex h-10 w-10 items-center justify-center text-slate-600 transition hover:text-slate-900"
                      aria-label="Increase quantity"
                    >
                      <HiOutlinePlus />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 sm:px-5 sm:py-3"
                    onClick={handleAddToCart}
                  >
                    <GiShoppingCart aria-hidden />
                    Add to cart
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-xl text-slate-500 transition hover:border-slate-300 hover:text-slate-800 sm:h-12 sm:w-12 sm:text-2xl"
                    aria-label="Add to wishlist"
                  >
                    <CiHeart />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-1.5 text-xs font-semibold sm:grid-cols-2 sm:gap-2 sm:text-sm">
                  <button
                    type="button"
                    className="rounded-2xl border border-slate-200 px-3 py-2 text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                  >
                    Reviews
                  </button>
                  <button
                    type="button"
                    className="rounded-2xl border border-slate-200 px-3 py-2 text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                  >
                    Product details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
