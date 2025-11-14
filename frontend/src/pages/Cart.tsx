import { useMemo } from "react";
import { useStore } from "../store/useStore";

const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
});

export default function Cart() {
    const { products, cart, user } = useStore();

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
        <section className="bg-white">
            <div className="mx-auto w-11/12 max-w-6xl px-4 py-10">
                <div className="flex flex-col gap-6 lg:flex-row">
                    <div className="flex-1 space-y-4">
                        <header>
                            <p className="text-sm text-slate-500">Checkout</p>
                            <h1 className="text-2xl font-semibold text-slate-900">Order summary</h1>
                        </header>

                        <div className="space-y-4 rounded-3xl border border-slate-200 p-4 shadow-sm">
                            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
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
                    </div>
                </div>
            </div>
        </section>
    )
}
