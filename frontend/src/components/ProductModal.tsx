import React, { useMemo, useState } from 'react'
import { useStore } from "../store/useStore";

const currency = new Intl.NumberFormat("en-US", {
    style:"currency",
    currency:"USD",
    maximumFractionDigits: 2,
});

export default function ProductModal() {
    const { products, selectedProductId, closeProductModal, addToCart } = useStore();

    const [quantity, setQuantity] = useState(1);
  
    const product = useMemo(
        () => products.find((p) => p.id === selectedProductId),
        [products,selectedProductId]
    );
    
    return (
    <div>Product</div>
  )
}
