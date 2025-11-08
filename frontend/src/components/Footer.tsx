import { MdOutlineShoppingCart } from "react-icons/md";

const quickLinks = ["About Us", "Sell on QuickShop", "Shipping & Delivery", "Returns & Refunds"];
const customerLinks = ["Help Center", "Track Order", "Payment Methods", "FAQ"];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#dcdcdc] py-10 text-sm text-slate-600">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 lg:flex-row lg:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-3 text-slate-900">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-purple-500 via-violet-500 to-fuchsia-500 text-2xl text-white shadow-lg">
             <MdOutlineShoppingCart />
            </span>
            <div>
              <p className="text-lg font-semibold">SHOP_4U</p>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">quick shop</p>
            </div>
          </div>
          <p className="mt-3">
            Your trusted marketplace for quality products from verified sellers. Discover
            new arrivals every day.
          </p>
        </div>
        <div className="grid flex-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-semibold text-slate-900">Quick links</p>
            <ul className="mt-2 space-y-1">
              {quickLinks.map((item) => (
                <li key={item} className="hover:text-slate-900">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Customer service</p>
            <ul className="mt-2 space-y-1">
              {customerLinks.map((item) => (
                <li key={item} className="hover:text-slate-900">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Contact us</p>
            <p className="mt-2">support@quickshop.com</p>
            <p>1-800-QUICKSHOP</p>
            <p>123 Commerce St, Tech City, TC 12345</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
