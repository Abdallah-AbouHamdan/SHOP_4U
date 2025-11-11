import { type MouseEvent, useEffect, useMemo, useState } from 'react'
import { useStore } from "../store/useStore";
import { CiHeart } from 'react-icons/ci';
import { GiShoppingCart } from 'react-icons/gi';
import { HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi';
import { IoIosClose, IoIosHome } from 'react-icons/io';
import { FaStar } from 'react-icons/fa';

const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
});

export default function ProductModal() {
    const { products, selectedProductId, closeProductModal, addToCart } = useStore();

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
    const hasCompare = typeof product.compareAtPrice === "number";

    const discountPercent =
        hasCompare && product.compareAtPrice
            ? Math.round(
                ((product.compareAtPrice - product.price) / product.compareAtPrice) *
                100
            )
            : null;
    const description = product.tagline
        ? `${product.tagline}. Experience the best of ${product.category.toLowerCase()} from ${product.seller}.`
        : `Experience the best of ${product.category.toLowerCase()} from ${product.seller}.`;
    const stockEstimate = 40 + Math.round(product.rating * 2);
    const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) closeProductModal();
    };
    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i += 1) {
            addToCart(product.id);
        }
    };
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-6 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={`${product.title} details`}
            onMouseDown={handleOverlayClick}
        >
            <div className="relative w-full max-w-3xl rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.35)] sm:p-8">
                <button
                    type="button"
                    onClick={closeProductModal}
                    className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:scale-105 hover:text-slate-900"
                    aria-label="Close product details"
                >
                    <IoIosClose className="text-2xl" />
                </button>
                <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
                    <div className="overflow-hidden rounded-[28px] border border-slate-100 bg-slate-50 shadow-inner">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="space-y-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                <IoIosHome className="text-base text-slate-500" />
                                {product.seller}
                            </span>
                            {discountPercent && (
                                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600">
                                    Save {discountPercent}%
                                </span>
                            )}
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                                {product.title}
                            </h2>
                            <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                                <FaStar className="text-amber-400" />
                                <span className="font-semibold text-slate-900">
                                    {product.rating.toFixed(1)}
                                </span>
                                <span>({product.reviews.toLocaleString()} reviews)</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-baseline gap-4">
                            <span className="text-3xl font-semibold text-slate-900">
                                {currency.format(product.price)}
                            </span>
                            {hasCompare && (
                                <span className="text-base text-slate-400 line-through">
                                    {currency.format(product.compareAtPrice!)}
                                </span>
                            )}
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                                Description
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                {description}
                            </p>
                            <p className="mt-3 text-sm font-semibold text-emerald-600">
                                In stock ({stockEstimate} available)
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
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
                            <div className="flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                                    onClick={handleAddToCart}
                                >
                                    <GiShoppingCart aria-hidden />
                                    Add to cart
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 text-2xl text-slate-500 transition hover:border-slate-300 hover:text-slate-800"
                                    aria-label="Add to wishlist"
                                >
                                    <CiHeart />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-3 text-sm font-semibold">
                                <button
                                    type="button"
                                    className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                                >
                                    Reviews
                                </button>
                                <button
                                    type="button"
                                    className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                                >
                                    Product details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}