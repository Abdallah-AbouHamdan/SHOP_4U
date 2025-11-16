import { useMemo } from "react";
import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";

const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
});

export default function Cart() {
    const { products, cart, user } = useStore();
    const placeOrder = useStore((s) => s.placeOrder);
    const navigate = useNavigate();

    const items = useMemo(() => {
        const map = new Map<string, number>();
        cart.forEach((id) => map.set(id, (map.get(id) ?? 0) + 1));
        return Array.from(map.entries())
            .map(([id, quantity]) => {
                const product = products.find((p) => p.id === id);
                if (!product) return null;
                return { product, quantity };
            })
            .filter(Boolean) as { product: (typeof products)[number]; quantity: number }[];
    }, [cart, products]);

    const subtotal = useMemo(
        () =>
            items.reduce(
                (sum, { product, quantity }) => sum + product.price * quantity,
                0
            ),
        [items]
    );

    const shipping = items.length ? 10 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    return (
        <section className="bg-white min-h-screen">
            <div className="mx-auto w-11/12 max-w-6xl px-4 py-10">
                <div className="flex flex-col gap-6 lg:flex-row">
                    <div className="flex-1 space-y-4">
                        <header>
                            <p className="text-sm text-slate-500">Checkout</p>
                            <h1 className="text-2xl font-semibold text-slate-900">Order summary</h1>
                        </header>

                        <div className="space-y-4 rounded-3xl border border-slate-200 p-4 shadow-sm">
                            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                                {items.map(({ product, quantity }) => (
                                    <div
                                        key={product.id}
                                        className="flex items-center justify-between rounded-2xl border border-slate-200 p-3"
                                    >
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="h-16 w-16 rounded-2xl object-cover"
                                            />
                                            <div>
                                                <p className="text-sm font-semibold text-slate-900">
                                                    {product.title}
                                                </p>
                                                <p className="text-xs text-slate-500">{product.seller}</p>
                                            </div>
                                        </div>
                                        <div className="text-sm font-semibold text-slate-900">
                                            {currency.format(product.price * quantity)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3 rounded-3xl border border-slate-200 p-4 shadow-sm">
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                                Delivery information
                            </p>
                            <div className="text-sm text-slate-600">
                                <p>
                                Name:{" "}
                                    <span className="font-semibold text-slate-900">
                                        {user?.username ?? "Shopper"}
                                    </span>
                                </p>
                                <p>
                                    Email:{" "}
                                    <span className="font-semibold text-slate-900">
                                        {user?.email ?? "guest@shop4u.com"}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <aside className=" mt-17 w-full max-w-sm space-y-4">
                        <div className="rounded-3xl border border-slate-200 p-4 shadow-sm">
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                                Order total
                            </p>
                            <div className="mt-4 space-y-2 text-sm text-slate-600">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="text-slate-900">{currency.format(subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-slate-900">{currency.format(shipping)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span className="text-slate-900">{currency.format(tax)}</span>
                                </div>
                            </div>
                            <div className="mt-4 border-t border-slate-200 pt-3">
                                <div className="flex items-center justify-between text-lg font-semibold text-slate-900">
                                    <span>Total</span>
                                    <span>{currency.format(total)}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (!items.length) return;
                                        placeOrder({
                                            itemEntries: items.map(({ product, quantity }) => ({
                                                productId: product.id,
                                                quantity,
                                            })),
                                            subtotal,
                                            shipping,
                                            tax,
                                            total,
                                        });
                                        navigate("/orders");
                                    }}
                                    disabled={!items.length}
                                    className="mt-5 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                                >                                    Place order
                                </button>
                                <p className="mt-3 text-xs text-slate-500">
                                    By placing your order, you agree to our terms and conditions.
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}