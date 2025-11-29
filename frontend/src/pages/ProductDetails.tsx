import { useMemo } from "react";
import { FaStar } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { useNavigate, useParams } from "react-router-dom";
import ImageGallery from "../components/ImageGallery";
import { useStore } from "../store/useStore";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, reviews, user, addToCart } = useStore();

  const product = products.find((p) => p.id === productId);
  const productReviews = useMemo(() => {
    if (!product) return [];
    return reviews
      .filter((review) => review.productId === product.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [product, reviews]);

  if (!product) {
    return (
      <section className="bg-white min-h-screen">
        <div className="mx-auto w-11/12 max-w-4xl px-4 py-12">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500"
          >
            ← Back
          </button>
          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-sm text-slate-500">
            Product not found.
          </div>
        </div>
      </section>
    );
  }

  const galleryImages = product.images?.length ? product.images : [product.image];

  const inStock = product.stock > 0;
  const handleAdd = () => {
    if (!user) {
      navigate("/login", { state: { from: `/product/${product.id}` } });
      return;
    }
    addToCart(product.id);
  };

  return (
    <section className="bg-white min-h-screen">
      <div className="mx-auto w-11/12 max-w-6xl px-4 py-12">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500"
        >
          ← Back to shop
        </button>
        <div className="mt-6 rounded-4xl border border-slate-100 bg-white p-6 shadow-[0_25px_40px_rgba(15,23,42,0.08)] lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.15fr,1fr]">
            <div className="rounded-3xl border border-slate-100 bg-slate-50/70 p-4 shadow-[0_15px_35px_rgba(15,23,42,0.08)]">
              <ImageGallery
                images={galleryImages}
                alt={product.title}
                className="space-y-4"
                mainImageClassName="h-[420px] w-full rounded-[28px] object-cover"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-400">
                  {product.category}
                </p>
                <h1 className="text-3xl font-semibold text-slate-900">{product.title}</h1>
                <p className="text-sm text-slate-500">{product.tagline}</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <FaStar className="text-amber-400" />
                  <span className="font-semibold text-slate-900">{product.rating.toFixed(1)}</span>
                  <span className="text-xs text-slate-500">({product.reviews.toLocaleString()} reviews)</span>
                </div>
                <span
                  className={`text-[11px] font-semibold uppercase tracking-[0.3em] ${
                    inStock ? "text-emerald-600" : "text-rose-500"
                  }`}
                >
                  {inStock ? `${product.stock} ${product.stock === 1 ? "unit" : "units"} available` : "Out of stock"}
                </span>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-semibold text-slate-900">{currency.format(product.price)}</span>
                {typeof product.compareAtPrice === "number" && (
                  <span className="text-sm text-slate-400 line-through">{currency.format(product.compareAtPrice)}</span>
                )}
              </div>
              <p className="text-sm leading-relaxed text-slate-600">{product.description ?? product.tagline}</p>
              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Seller</span>
                  <span>{product.seller}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Category</span>
                  <span>{product.category}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Stock</span>
                  <span>{product.stock}</span>
                </div>
              </div>
              <div className="mt-auto flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={!inStock}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  <GiShoppingCart />
                  Add to cart
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="text-sm font-semibold text-slate-700 underline-offset-4 hover:underline"
                >
                  Continue shopping
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-4xl border border-slate-100 bg-white p-6 shadow-[0_25px_40px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Reviews</h2>
            <span className="text-xs text-slate-500">{productReviews.length} shared</span>
          </div>
          <div className="mt-4 space-y-4">
            {productReviews.length ? (
              productReviews.slice(0, 4).map((review) => (
                <div key={review.id} className="space-y-1 rounded-2xl border border-slate-100 p-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">{review.reviewer}</span>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
                      {dateFormatter.format(new Date(review.createdAt))}
                    </span>
                  </div>
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar key={index} className={index < review.rating ? "text-amber-400" : "text-slate-200"} />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600">{review.text}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
