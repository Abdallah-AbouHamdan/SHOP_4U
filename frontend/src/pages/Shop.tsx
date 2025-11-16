import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../store/useStore";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const { seller } = useParams<{ seller?: string }>();
  const decodedSeller = seller ? decodeURIComponent(seller) : "";
  const products = useStore((state) => state.products);

  const sellerProducts = useMemo(() => {
    if (!decodedSeller) return [];
    return products.filter((product) => product.seller === decodedSeller);
  }, [decodedSeller, products]);

  return (
    <div className="bg-[#ffffff] pb-16 pt-8">
      <section className="mx-auto mb-10 w-11/12 max-w-6xl rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg shadow-slate-200/60 md:p-10">
        <div className="space-y-3 text-center">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-slate-500 sm:text-xs">
            Seller storefront
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">{decodedSeller || "Shop"}</h1>
          <p className="text-sm text-slate-500 sm:text-base">
            {sellerProducts.length
              ? `${sellerProducts.length} listings available`
              : "Product updates will show here once you add them."}
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-6">
        {sellerProducts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            This seller hasn&apos;t published a shop yet.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {sellerProducts.map((product) => (
              <ProductCard key={product.id} id={product.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
