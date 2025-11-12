import { useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { FiMoon, FiMenu, FiX } from "react-icons/fi";
import { GiShoppingCart } from "react-icons/gi";
import { useStore } from "../store/useStore";
import { Link } from "react-router-dom";

export default function Navbar() {
  const search = useStore((s) => s.filters.search ?? "");
  const setFilter = useStore((s) => s.setFilter);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex flex-row items-center gap-4 md:gap-6">
          <div className="flex flex-1 items-center justify-between gap-3 text-slate-900 md:flex-none">
            <Link to="/" className="flex items-center gap-3 transition hover:opacity-80">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-purple-500 via-violet-500 to-blue-500 text-2xl text-white shadow-lg">
                <MdOutlineShoppingCart />
              </span>
              <div>
                <p className="text-lg font-semibold">SHOP_4U</p>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  quick shop
                </p>
              </div>
            </Link>
          </div>

          <div className="hidden flex-1 items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500 md:flex">
            <span aria-hidden>
              <IoIosSearch />
            </span>
            <input
              type="text"
              placeholder="Search products ..."
              value={search}
              onChange={(e) => setFilter("search", e.target.value)}
              className="flex-1 bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex w-full items-center justify-end gap-3 py-4 text-lg md:ml-auto md:w-auto">
            <button
              aria-label="theme"
              className="hidden rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-500 transition hover:text-slate-900 md:flex"
            >
              <FiMoon />
            </button>
            <button
              aria-label="cart"
              className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-500 transition hover:text-slate-900"
            >
              <GiShoppingCart />
            </button>
            <Link
              to="/login"
              className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800"
            >
              Login
            </Link>
            <button
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="rounded-2xl border border-slate-200 bg-white p-2 text-slate-600 transition hover:text-slate-900 md:hidden"
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <>
          <button
            aria-label="Close menu overlay"
            className="fixed inset-0 z-30 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed left-1/2 top-20 z-40 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 md:hidden">
            <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-2xl shadow-slate-900/10">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500">
                <span aria-hidden>
                  <IoIosSearch />
                </span>
                <input
                  type="text"
                  placeholder="Search products ..."
                  value={search}
                  onChange={(e) => setFilter("search", e.target.value)}
                  className="flex-1 bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
              <button
                aria-label="theme"
                className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
              >
                <FiMoon />
                <span>Toggle theme</span>
              </button>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
