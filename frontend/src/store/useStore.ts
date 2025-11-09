import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Product = {
  id: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  seller: string;
  tagline: string;
  image: string;
  rating: number;
  reviews: number;
  discounted?: boolean;
};

type State = {
  products: Product[];
  cart: string[];
  filters: {
    category: string;
    minPrice: number;
    maxPrice: number;
    discounted: boolean;
    sort: "popular" | "priceLow" | "priceHigh";
    search: string;
  };
};

type Actions = {
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  setFilter: (key: keyof State["filters"], value: any) => void;
};

export const useStore = create<State & Actions>()(
  persist(
    (set) => ({
      products: [
  {
    id: "p1",
    title: "Cotton Shorts",
    price: 29.99,
    compareAtPrice: 39.99,
    category: "Fashion Forward",
    seller: "Fashion Forward",
    tagline: "Cooling linen weave",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    rating: 4.1,
    reviews: 132,
    discounted: true,
  },
  {
    id: "p2",
    title: "Tennis Racket",
    price: 199.95,
    compareAtPrice: 209.95,
    category: "Sport Zone",
    seller: "Sport Zone",
    tagline: "Carbon string bed",
    image:
      "https://images.unsplash.com/photo-1515664069236-68a7992cb90c?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    reviews: 254,
    discounted: true,
  },
  {
    id: "p3",
    title: "Mac 14 Pro",
    price: 1999.99,
    category: "Tech Zone",
    seller: "Tech Zone",
    tagline: "M3 power for pros",
    image:
      "https://images.unsplash.com/photo-1484712401471-05c7215830eb?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    reviews: 982,
  },
  {
    id: "p4",
    title: "Leather Weekender",
    price: 159.99,
    compareAtPrice: 219.99,
    category: "Lifestyle",
    seller: "City Luxe",
    tagline: "Carry-on approved",
    image:
      "https://images.unsplash.com/photo-1528701800489-20be3c18c6da?auto=format&fit=crop&w=600&q=80",
    rating: 4.4,
    reviews: 88,
    discounted: true,
  },
  {
    id: "p5",
    title: "Wireless Earbuds",
    price: 89.99,
    compareAtPrice: 109.99,
    category: "Tech Zone",
    seller: "Soundify",
    tagline: "Noise-cancelling comfort",
    image:
      "https://images.unsplash.com/photo-1585386959984-a4155223163e?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    reviews: 641,
    discounted: true,
  },
  {
    id: "p6",
    title: "Running Shoes",
    price: 120.0,
    compareAtPrice: 140.0,
    category: "Sport Zone",
    seller: "Peak Performance",
    tagline: "Responsive cushioning system",
    image:
      "https://images.unsplash.com/photo-1600185365881-3b4e27b6f3e8?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviews: 1194,
    discounted: true,
  },
  {
    id: "p7",
    title: "Classic Jacket",
    price: 89.5,
    compareAtPrice: 99.99,
    category: "Fashion Forward",
    seller: "Urban Stitch",
    tagline: "Timeless everyday layering",
    image:
      "https://images.unsplash.com/photo-1593032457862-6c67fdc5b427?auto=format&fit=crop&w=600&q=80",
    rating: 4.3,
    reviews: 321,
    discounted: true,
  },
  {
    id: "p8",
    title: "Smart Watch",
    price: 399.99,
    compareAtPrice: 449.99,
    category: "Tech Zone",
    seller: "Tech Zone",
    tagline: "Track health & stay connected",
    image:
      "https://images.unsplash.com/photo-1517153297954-9d81b763f42d?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    reviews: 784,
    discounted: true,
  },
  {
    id: "p9",
    title: "Candle Set",
    price: 34.99,
    compareAtPrice: 49.99,
    category: "Lifestyle",
    seller: "Calm Home",
    tagline: "Relaxing lavender blend",
    image:
      "https://images.unsplash.com/photo-1608222021266-0c0e5b8f05df?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviews: 205,
    discounted: true,
  },
  {
    id: "p10",
    title: "Yoga Mat",
    price: 59.99,
    compareAtPrice: 79.99,
    category: "Sport Zone",
    seller: "ZenFit",
    tagline: "Non-slip eco material",
    image:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    reviews: 420,
    discounted: true,
  },
],
      cart: [],
      filters: {
        category: "All",
        minPrice: 0,
        maxPrice: 2000,
        discounted: false,
        sort: "popular",
        search: "",
      },
      addToCart: (id) => set((s) => ({ cart: [...s.cart, id] })),
      removeFromCart: (id) =>
        set((s) => ({ cart: s.cart.filter((pid) => pid !== id) })),
      setFilter: (key, value) =>
        set((s) => ({ filters: { ...s.filters, [key]: value } })),
    }),
    { name: "shop4u-storage" }
  )
);
