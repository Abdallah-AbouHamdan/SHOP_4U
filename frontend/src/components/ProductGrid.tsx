import {useStore} from "../store/useStore";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
    const {products,filters} = useStore();
    const searchTerm = (filters.search ?? "").trim().toLowerCase();
    const filtered = products
    .filter((p) =>{
        if(filters.category !=="All" && p.category !== filters.category) return false;
        if(p.price < filters.minPrice || p.price > filters.maxPrice) return false;
        if(filters.discounted && !p.discounted) return false;
        if(searchTerm.length){
            const haystack = `${p.title} ${p.tagline} ${p.category} ${p.seller}`.toLowerCase();
            if(!haystack.includes(searchTerm)) return false;
        }
        return true;
    })
    .sort((a,b) =>{
        if (filters.sort === "priceLow") return a.price - b.price;
        if (filters.sort === "priceHigh") return b.price - a.price;
        return b.rating - a.rating;
    })
  return (
    <>
    <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
        <span>
            Showing <span className="font-semibold text-slate-900">{filtered.length}</span>{" "}
            {filtered.length === 1 ?"item":"items"}
        </span>
        <span className="hidden sm:block">
        Sorted by{" "}
        <span className="font-medium text-slate-900">
            {filters.sort === "popular"
            ?"Most Popular"
            :filters.sort === "priceLow"
            ?"Price:Low to High"
            :"Price:High to Low"}
        </span>
        </span>
    </div>
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            We couldn't find products that match those filters. Try widening the price
            range or switching categories.
          </div> ) : (
          filtered.map((p) => <ProductCard key={p.id} id={p.id} />)
        )}
      </div>
    </>
  );
}
