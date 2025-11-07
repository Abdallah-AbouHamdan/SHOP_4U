import { FaStar } from "react-icons/fa";
import { useStore } from "../store/useStore";

type Props = {id:string};

const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency:  "USD",
    maximumFractionDigits:2,
});

export default function ProductCard({id}:Props){
    const {products,addToCart} = useStore();
    const p = products.find((x) => x.id === id );
    if (!p) return null;

    return(
        <article className="group flex flex-coll rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm transition hover:-translate-y-1 hover:border-slate-400 hover:shadow-xl">
            <div className="relative overflow-hidden rounded-2xl bg-slate-100">
                <img src={p.image} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" alt={p.title} />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow">{p.category}</span>
            </div>
            <div className="mt-4 flex-1 space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-400">
                <span>{p.seller}</span>
                <span className="flex items-center gap-1 text-amber-500">
                    <FaStar />{p.rating.toFixed(1)}
                    <span className="text-[11px] text-slate-400">
                        ({p.reviews.toLocaleString()})
                    </span>
                </span>
            </div>
            <div>
                <h3 className="text-lg font-semibold capitalize text-slate-900">{p.title}</h3>
                <p className="text-slate-500">{}p.tagline</p>
            </div>
                <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-slate-900">{currency.format(p.price)}</span>
                    {p.compareAtPrice && (
                <span className="text-sm text-slate-400 line-through">
                {currency.format(p.compareAtPrice)}
                </span>
             )}
            </div>
            </div>
            
        </article>
    )
}