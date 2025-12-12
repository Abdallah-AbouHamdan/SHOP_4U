import { type FormEvent, type MouseEvent, useEffect, useMemo, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { IoIosClose, IoIosHome } from "react-icons/io";
import { isOrderDelivered, useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";
import ImageGallery from "./ImageGallery";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const reviewDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

type ReviewFeedback = { type: "success" | "error"; text: string };

export default function ProductModal() {
  const {
    products,
    selectedProductId,
    closeProductModal,
    addToCart,
    favorites,
    toggleFavorite,
    user,
    reviews,
    orders,
    addReview,
  } =
    useStore();
  const [quantity, setQuantity] = useState(1);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewMessage, setReviewMessage] = useState<ReviewFeedback | null>(null);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const navigate = useNavigate();

  const product = useMemo(
    () => products.find((p) => p.id === selectedProductId),
    [products, selectedProductId]
  );

  const galleryImages = useMemo(() => {
    if (!product) return [];
    return product.images?.length ? product.images : [product.image];
  }, [product]);

  const productReviews = useMemo(() => {
    if (!product) return [];
    return reviews
      .filter((review) => review.productId === product.id)
      .sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }, [product, reviews]);

  const canLeaveReview = useMemo(() => {
    if (!product || !user) return false;
    return orders.some(
      (order) =>
        order.userEmail === user.email &&
        isOrderDelivered(order) &&
        order.items.some((item) => item.productId === product.id)
    );
  }, [orders, product, user]);

  useEffect(() => {
    setQuantity(1);
  }, [selectedProductId]);

  useEffect(() => {
    setReviewRating(5);
    setReviewText("");
    setReviewMessage(null);
    setReviewsOpen(false);
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
    if (!user) {
      navigate("/login", { state: { from: "/dashboard" } });
      return;
    }
    for (let i = 0; i < quantity; i += 1) addToCart(product.id);
  };

  const handleReviewSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!product) return;
    const result = addReview({
      productId: product.id,
      rating: reviewRating,
      text: reviewText,
    });
    if (!result.success) {
      setReviewMessage({
        type: "error",
        text: result.error ?? "Unable to submit your review.",
      });
      return;
    }
    setReviewMessage({ type: "success", text: "Thanks for sharing your experience!" });
    setReviewRating(5);
    setReviewText("");
  };

  const openProductDetails = () => {
    if (!product) return;
    closeProductModal();
    navigate(`/product/${product.id}`);
  };

  const toggleReviewsPanel = () => {
    setReviewsOpen((prev) => !prev);
    if (reviewMessage) setReviewMessage(null);
  };

  const handleFavorite = () => {
    if (!user) {
      navigate("/login", { state: { from: "/dashboard" } });
      return;
    }
    toggleFavorite(product.id);
  };

  const isFavorite = favorites.includes(product.id);

  const outOfStock = product.stock === 0;

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
          className="absolute right-4 top-4 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:scale-105 hover:text-slate-900"
          aria-label="Close product details"
        >
          <IoIosClose className="text-2xl hover:text-3xl" />
        </button>

        <div className="pr-1 sm:pr-3">
          <div className="grid gap-4 grid-cols-[minmax(120px,150px)_minmax(0,1fr)] sm:grid-cols-[230px_minmax(0,1fr)] sm:items-start sm:gap-6">
            <div className="space-y-2 sm:space-y-3">
              <div className="overflow-hidden rounded-3xl border border-slate-100 bg-slate-50 shadow-inner sm:rounded-[28px]">
                <ImageGallery
                  images={galleryImages}
                  alt={product.title}
                  className="space-y-3 p-3 sm:p-4"
                  mainImageClassName="h-[150px] w-full object-cover rounded-2xl sm:h-[200px]"
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

              <div className="space-y-1">
                <div className="flex items-baseline gap-3 text-slate-900">
                  <span className="text-2xl font-semibold sm:text-3xl">
                    {currency.format(product.price)}
                  </span>
                  {hasCompare && (
                    <span className="text-sm text-slate-400 line-through sm:text-base">
                      {currency.format(product.compareAtPrice!)}
                    </span>
                  )}
                </div>
                <p
                  className={`text-xs font-semibold uppercase tracking-[0.3em] ${
                    outOfStock ? "text-rose-500" : "text-emerald-600"
                  }`}
                >
                  {outOfStock
                    ? "Out of stock"
                    : `${product.stock} ${product.stock === 1 ? "unit" : "units"} available`}
                </p>
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
                      className="flex h-10 w-10 items-center cursor-pointer justify-center text-slate-600 transition hover:text-slate-900"
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
                      className="flex h-10 w-10 items-center justify-center cursor-pointer text-slate-600 transition hover:text-slate-900"
                      aria-label="Increase quantity"
                    >
                      <HiOutlinePlus />
                    </button>
                </div>
              </div>

                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex flex-1 items-center justify-center gap-2 cursor-pointer rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 sm:px-5 sm:py-3"
                    onClick={handleAddToCart}
                    disabled={outOfStock}
                  >
                      <GiShoppingCart aria-hidden />
                      Add to cart
                    </button>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={handleFavorite}
                      className={`inline-flex h-11 w-11 items-center cursor-pointer justify-center rounded-2xl border text-xl transition sm:h-12 sm:w-12 sm:text-2xl ${isFavorite
                        ? "border-rose-200 bg-rose-50 text-rose-600"
                        : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-800"
                        }`}
                      aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
                      aria-pressed={isFavorite}>
                      <CiHeart />
                    </button>

                    {favorites.length > 0 && (
                      <span className="absolute -top-1 -right-1 rounded-full bg-rose-500 px-2 text-[9px] font-semibold text-white">
                        {favorites.length}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-1.5 text-xs font-semibold sm:grid-cols-2 sm:gap-2 sm:text-sm">
                  <button
                    type="button"
                    onClick={toggleReviewsPanel}
                    className={`rounded-2xl border px-3 py-2 transition ${reviewsOpen
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900"
                      }`}
                    aria-pressed={reviewsOpen}
                  >
                    Reviews
                  </button>
                  <button
                    type="button"
                    onClick={openProductDetails}
                    className="rounded-2xl border border-slate-200 px-3 py-2 cursor-pointer text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                  >
                    Product details
                  </button>
                </div>
                {reviewsOpen && (
                  <div className="mt-6 space-y-4 border-t border-slate-100 pt-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                        Reviews
                      </p>
                      <span className="text-xs text-slate-500">
                        {product.reviews.toLocaleString()} total
                      </span>
                    </div>
                    <div className="space-y-3">
                      {productReviews.length ? (
                        productReviews.slice(0, 3).map((review) => (
                          <div
                            key={review.id}
                            className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3"
                          >
                            <div className="flex items-center justify-between text-[11px] text-slate-500">
                              <span className="font-semibold text-slate-700">
                                {review.reviewer}
                              </span>
                              <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
                                {reviewDateFormatter.format(new Date(review.createdAt))}
                              </span>
                            </div>
                            <div className="mt-1 flex gap-1">
                              {Array.from({ length: 5 }).map((_, index) => (
                                <FaStar
                                  key={index}
                                  className={`text-sm ${
                                    index < review.rating ? "text-amber-400" : "text-slate-200"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="mt-2 text-sm text-slate-600">{review.text}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500">
                          Be the first to share what you loved.
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <FaStar className="text-amber-400" />
                        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                          Add your review
                        </p>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        We limit reviews to two submissions per delivered item so every voice stays meaningful.
                      </p>
                      {canLeaveReview ? (
                        <form onSubmit={handleReviewSubmit} className="space-y-3">
                          <div className="flex gap-2">
                            {[5, 4, 3, 2, 1].map((value) => (
                              <button
                                key={value}
                                type="button"
                                onClick={() => {
                                  setReviewRating(value);
                                  setReviewMessage(null);
                                }}
                                className={`flex h-9 w-9 items-center justify-center rounded-2xl border text-xs font-semibold transition ${
                                  value <= reviewRating
                                    ? "border-amber-300 bg-amber-50 text-amber-600"
                                    : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-900"
                                }`}
                                aria-label={`Give ${value} star${value > 1 ? "s" : ""}`}
                              >
                                <FaStar className="text-base" />
                              </button>
                            ))}
                          </div>
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                              Share your experience
                            </label>
                            <textarea
                              value={reviewText}
                              onChange={(event) => {
                                setReviewText(event.target.value);
                                if (reviewMessage) setReviewMessage(null);
                              }}
                              placeholder="Let other shoppers know what stood out."
                              className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                              rows={3}
                            />
                          </div>
                          <div className="flex items-center justify-between gap-3">
                            <button
                              type="submit"
                              disabled={!reviewText.trim()}
                              className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                            >
                              Publish review
                            </button>
                            {reviewMessage && (
                              <p
                                className={`text-xs font-semibold ${
                                  reviewMessage.type === "success"
                                    ? "text-emerald-600"
                                    : "text-rose-500"
                                }`}
                              >
                                {reviewMessage.text}
                              </p>
                            )}
                          </div>
                        </form>
                      ) : (
                        <p className="text-xs text-slate-500">
                          {user
                            ? "Reviews are limited to delivered purchases of this product."
                            : "Log in to review delivered purchases."}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
