import { useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { IoBagOutline, IoHeartOutline, IoPersonOutline } from "react-icons/io5";
import { FiMenu, FiMoon, FiX } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";

export default function Navbar() {
  const search = useStore((s) => s.filters.search ?? "");
  const setFilter = useStore((s) => s.setFilter);
  const user = useStore((s) => s.user);
  const logout = useStore((s) => s.logout);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleProtectedNav = () => {
    if (!user) {
      navigate("/login", { state: { from: "/dashboard" } });
      return;
    }
    navigate("/dashboard");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleThemeToggle = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  };

  const handleSettingsNav = () => {
    if (!user) {
      navigate("/login", { state: { from: "/settings" } });
      return;
    }
    navigate("/settings");
    setIsMenuOpen(false);
  };

  if (!user) {
    const redirectToLogin = () =>
      navigate("/login", { state: { from: location.pathname } });

    return (
      <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white">
        <div className="mx-auto w-11/12 max-w-6xl px-2 py-4 sm:px-4">
          <div className="flex gap-3 md:flex-row md:items-center md:gap-6">
            <Link
              to="/"
              className="flex items-center gap-3 text-slate-900 transition hover:opacity-80"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-purple-500 via-violet-500 to-blue-500 text-2xl text-white shadow-lg">
                <MdOutlineShoppingCart />
              </span>
              <div className="leading-tight">
                <p className="text-lg font-semibold">SHOP_4U</p>
                <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400">
                  quick shop
                </p>
              </div>
            </Link>

            <div className="flex items-center justify-end gap-3 md:ml-auto">
              <button
                type="button"
                aria-label="Toggle dark mode"
                onClick={handleThemeToggle}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900 ${isDarkMode ? "text-slate-900" : ""}`}
              >
                <FiMoon />
              </button>
              <button
                type="button"
                aria-label="Cart"
                onClick={redirectToLogin}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
              >
                <IoBagOutline />
              </button>
              <Link
                to="/login"
                className="rounded-xl bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800"
              >
                Login
              </Link>
              <button
                type="button"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                className="rounded-2xl border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-slate-300 hover:text-slate-900 md:hidden"
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
              <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-2xl shadow-slate-900/10">
              <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-2xl shadow-slate-900/10">
                <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-[#f2f2f2] px-5 py-3 text-sm text-slate-500">
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
                  type="button"
                  aria-label="Toggle dark mode"
                  onClick={handleThemeToggle}
                  className={`rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900 ${isDarkMode ? "text-slate-900" : ""}`}
                >
                  Toggle theme
                </button>
              </div>
              </div>
            </div>
          </>
        )}
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white">
      <div className="mx-auto w-11/12 max-w-6xl px-2 py-4 sm:px-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <div className="flex items-center justify-between gap-3">
            <Link to="/" className="flex items-center gap-3 transition hover:opacity-80">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-purple-500 via-violet-500 to-blue-500 text-2xl text-white shadow-lg">
                <MdOutlineShoppingCart />
              </span>
              <div className="leading-tight">
                <p className="text-lg font-semibold text-slate-900">SHOP_4U</p>
                <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400">
                  quick shop
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                aria-label="Cart"
                onClick={handleProtectedNav}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
              >
                <IoBagOutline />
              </button>
              <button
                type="button"
                aria-label="Settings"
                onClick={handleSettingsNav}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
              >
                <IoPersonOutline />
              </button>
              <button
                type="button"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                className="rounded-2xl border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
              >
                {isMenuOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>

          <div className="hidden flex-1 items-center gap-3 rounded-full border border-slate-200 bg-[#f2f2f2] px-6 py-3 text-sm text-slate-500 md:flex">
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

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              aria-label="Toggle dark mode"
              onClick={handleThemeToggle}
              className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900 ${
                isDarkMode ? "text-slate-900" : ""
              }`}
            >
              <FiMoon />
            </button>
            <button
              type="button"
              aria-label="Cart"
              onClick={handleProtectedNav}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              <IoBagOutline />
            </button>
            <button
              type="button"
              aria-label="Favorites"
              onClick={handleProtectedNav}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              <IoHeartOutline />
            </button>
            <button
              type="button"
              aria-label="Settings"
              onClick={handleSettingsNav}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              <IoPersonOutline />
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
            <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-2xl shadow-slate-900/10">
              <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-[#f2f2f2] px-5 py-3 text-sm text-slate-500">
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
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  aria-label="Favorites"
                  onClick={handleProtectedNav}
                  className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white py-3 text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                >
                  <IoHeartOutline />
                </button>
                <button
                  type="button"
                  aria-label="Toggle dark mode"
                  onClick={handleThemeToggle}
                  className={`flex items-center justify-center rounded-2xl border border-slate-200 bg-white py-3 text-slate-600 transition hover:border-slate-300 hover:text-slate-900 ${
                    isDarkMode ? "text-slate-900" : ""
                  }`}
                >
                  <FiMoon />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleSettingsNav}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                >
                  Settings
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}