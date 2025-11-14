import { useMemo } from 'react'
import { useStore } from '../store/useStore'

export default function Favorites() {
    const { products , favorites } = useStore();
    const favoriteProducts = useMemo(
        ()=> products.filter((product) => favorites.includes(product.id)),
        [favorites, products]
    )
  return (
    <div className='bg-[#ffffff] pb-16 pt-8 min-h-screen'>
        <section className='mx-auto mb-10 w-11/12 max-w-6xl rounded-3xl border border-slate-200/60 md:p-10'>
            <div className="space-y-3">
                <p className='text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-slate-500 sm:text-xs'>
                    Wishlist
                </p>
                <h1 className="text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl md:text-4xl">
                    Your favorites
                </h1>
                <p className="text-sm text-slate-500 sm:text-base">
                    Save items you love fore quick access later.
                </p>
            </div>
        </section>
        
    </div>
  )
}
