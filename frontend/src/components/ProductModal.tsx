import { type MouseEvent, useEffect, useMemo, useState } from 'react'
import { useStore } from "../store/useStore";

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
        <div>Product</div>
    )
}
