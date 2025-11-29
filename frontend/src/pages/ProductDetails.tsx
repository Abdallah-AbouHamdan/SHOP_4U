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
  }, [product?.id, reviews]);

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
      <div className="mx-auto w-11/12 max-w-5xl px-4 py-12">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500"
        >
          ← Back to shop
        </button>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr,1fr]">
          <div className="rounded-4xl border border-slate-100 bg-slate-50 p-6 shadow-[0_25px_40px_rgba(15,23,42,0.15)]">
            <ImageGallery
              images={galleryImages}
              alt={product.title}
              className="space-y-3"
              mainImageClassName="h-[360px] w-full rounded-[28px] object-cover"
            />
            <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-slate-500">
              <span className="rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-slate-400">
                {product.category}
              </span>
              <span className="text-[10px] text-slate-400">{product.tagline}</span>
            </div>
            <div className="mt-5 flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <FaStar className="text-amber-400" />
                <span className="font-semibold text-slate-900">{product.rating.toFixed(1)}</span>
                <span className="text-xs text-slate-500">({product.reviews.toLocaleString()} reviews)</span>
              </div>
              <p
                className={`text-xs font-semibold uppercase tracking-[0.3em] ${
                  inStock ? "text-emerald-600" : "text-rose-500"
                }`}
              >
                {inStock ? `${product.stock} ${product.stock === 1 ? "unit" : "units"} available` : "Out of stock"}
              </p>
            </div>
            <div className="mt-6 flex items-baseline gap-4">
              <span className="text-3xl font-semibold text-slate-900">{currency.format(product.price)}</span>
              {typeof product.compareAtPrice === "number" && (
                <span className="text-sm text-slate-400 line-through">{currency.format(product.compareAtPrice)}</span>
              )}
            </div>
            <p className="mt-4 text-sm text-slate-600">{product.description ?? product.tagline}</p>
            <button
              type="button"
              onClick={handleAdd}
              disabled={!inStock}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              <GiShoppingCart />
              Add to cart
            </button>
          </div>
          <div className="space-y-6">
            <div className="rounded-4xl border border-slate-100 bg-white p-6 shadow-[0_25px_40px_rgba(15,23,42,0.08)]">
              <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Product details</h2>
              <dl className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="flex justify-between">
                  <dt className="font-semibold text-slate-700">Seller</dt>
                  <dd>{product.seller}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-semibold text-slate-700">Category</dt>
                  <dd>{product.category}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-semibold text-slate-700">Stock</dt>
                  <dd>{product.stock}</dd>
                </div>
              </dl>
              
            </div>
            <div className="rounded-4xl border border-slate-100 bg-white p-6 shadow-[0_25px_40px_rgba(15,23,42,0.08)]">
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
        </div>
      </div>
    </section>
  );
}
