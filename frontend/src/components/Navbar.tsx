import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { FiMoon } from "react-icons/fi";
import { GiShoppingCart } from "react-icons/gi";

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
        <div className="flex flex-1 items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500">
          <span aria-hidden><IoIosSearch /></span>
          <input type="text" placeholder="Search products ..." className="flex-1 bg-transporent text-slate-900 outline-none placeholder:text-slate-400" />
        </div>
        <div className="flex items-center gap-3 text-lg">
          <button aria-label="theme" className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-500 hover:text-slate-900">
          <FiMoon />
          </button>
          <button aria-label="cart" className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-500 hover:text-slate-900">
          <GiShoppingCart />
          </button>
          <button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibolde text-white shaddow-md hover:bg-slate-800">
          Login
          </button>
        </div>
        </div>
        </nav>
  )
}
