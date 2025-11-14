import { useMemo } from 'react'
import { useStore } from '../store/useStore'

export default function Favorites() {
    const { products , favorites } = useStore();
    const favoriteProducts = useMemo(
        ()=> products.filter((product) => favorites.includes(product.id)),
        [favorites, products]
    )
  return (
    <div>Favorites</div>
  )
}
