import {useStore} from "../store/useStore";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
    const {products,filters} = useStore();
    const filtered = products
    .filter((p) =>{
        if(filters.category !=="All" && p.category !== filters.category) return false;
        if(p.price < filters.minPrice || p.price > filters.maxPrice) return false;
        if(filters.discounted && !p.discounted) return false;
        return true;
    })
  return (
    
  )
}
