import { MdOutlineShoppingCart } from "react-icons/md";

export default function Navbar() {
  return (
       <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 text-slate-900">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-purple-500 via-violet-500 to-blue-500 text-2xl text-white shadow-lg">
           <MdOutlineShoppingCart />
          </span>
          <div>
            <p className="text-lg font-semibold">SHOP_4U</p>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              quick shop
            </p>
          </div>
        </div>
        </div>
        </nav>
  )
}
