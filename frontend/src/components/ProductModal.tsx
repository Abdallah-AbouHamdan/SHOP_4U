import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { FaStar } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import ImageGallery from "./ImageGallery";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export default function ProductModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedProductId, products, closeProductModal, addToCart, user } = useStore();

  const product = useMemo(
    () => products.find((p) => p.id === selectedProductId) ?? null,
    [products, selectedProductId]
  );

  useEffect(() => {
    if (!product) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeProductModal();
      }
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [product, closeProductModal]);

  if (!product) return null;

  const inStock = product.stock > 0;
  const galleryImages = product.images?.length ? product.images : [product.image];
  const handleAddToCart = () => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    addToCart(product.id);
    closeProductModal();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.title} quick view`}
      onClick={closeProductModal}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-4xl bg-white shadow-[0_30px_80px_rgba(15,23,42,0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeProductModal}
          className="absolute right-4 z-10 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:-translate-y-0.5 hover:text-slate-900"
          aria-label="Close product quick view"
        >
          ×
        </button>
        <div className="grid gap-6 lg:grid-cols-[1.1fr,1fr]">
          <div className="bg-slate-50 p-6">
            <ImageGallery
              images={galleryImages}
              alt={product.title}
              className="space-y-4"
              mainImageClassName="h-[320px] w-full rounded-[28px] object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 p-6">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                {product.category}
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">{product.title}</h2>
              <p className="text-sm text-slate-500">{product.tagline}</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <FaStar className="text-amber-400" />
              <span className="font-semibold text-slate-900">{product.rating.toFixed(1)}</span>
              <span className="text-slate-500">({product.reviews.toLocaleString()} reviews)</span>
              <span
                className={`ml-3 text-[11px] font-semibold uppercase tracking-[0.3em] ${
                  inStock ? "text-emerald-600" : "text-rose-500"
                }`}
              >
                {inStock ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-semibold text-slate-900">{currency.format(product.price)}</span>
              {typeof product.compareAtPrice === "number" && (
                <span className="text-sm text-slate-400 line-through">
                  {currency.format(product.compareAtPrice)}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-600">
              {product.description ??
                "Discover the details, reviews, and shipping options for this product."}
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!inStock}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                <GiShoppingCart />
                Add to cart
              </button>
              <button
                type="button"
                onClick={() => {
                  closeProductModal();
                  navigate(`/product/${product.id}`);
                }}
                className="text-sm font-semibold text-slate-700 underline-offset-4 hover:underline"
              >
                View full details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
