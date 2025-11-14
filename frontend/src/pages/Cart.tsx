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
        <div>Cart</div>
    )
}
