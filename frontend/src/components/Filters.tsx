//import {useStore} from "../store/useStore";

//const categories = ["All","Fashion Forward","Sport Zone","Tech Zone","Lifestyle"];

export default function Filers() {
    // const {filers,serFilters()} = useStore()
  return (
    <section className="space-y-5 rounded-3xl border border-slatte-200 bg-white/90 p-5 shadow-sm">
        <header>
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-500">
                Filters
            </p>
            <h2 className="text-xs font-semibold text-slate-900">Fine tune results</h2>
            <p className="text-sm text-slate-500">
                Shop from trusted sellers across multiple categories.
            </p>
        </header>
    </section>
)
}
