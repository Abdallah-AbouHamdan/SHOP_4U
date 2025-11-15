import { FiChevronDown } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { useStore } from "../store/useStore";
import type { OrderStatus } from "../store/useStore";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const statusStyles: Record<OrderStatus, string> = {
  Pending: "bg-amber-200 text-amber-900",
  Processing: "bg-sky-200 text-sky-900",
  Delivered: "bg-emerald-200 text-emerald-900",
};

const statusCopy: Record<OrderStatus, string> = {
  Pending: "Preparing your order",
  Processing: "On the way",
  Delivered: "Delivered",
};

export default function Orders() {
  const user = useStore((state) => state.user);
  const orders = useStore((state) => state.orders);

  return (
    <section className="bg-[#f3f5fa] min-h-screen py-12">
      <div className="mx-auto w-11/12 max-w-6xl space-y-8">
        <header className="space-y-2">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold tracking-[0.4em] text-slate-400 uppercase">
              Orders
            </p>
            <h1 className="text-3xl font-semibold text-slate-900">My Orders</h1>
          </div>
          <p className="text-sm text-slate-500">
            View and track every purchase you made on SHOP_4U{user ? `, ${user.username}` : ""}.
          </p>
        </header>

        {orders.length ? (
          <div className="space-y-5">
            {orders.map((order) => {
              const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              });
              const itemsCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
              return (
                <article
                  key={order.id}
                  className="group flex flex-col gap-4 rounded-[32px] border border-slate-200 bg-white/90 px-5 py-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
                        <BsBoxSeam className="text-2xl text-slate-500" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-lg font-semibold text-slate-900">
                          Order #{order.orderNumber}
                        </p>
                        <p className="text-sm text-slate-500">{formattedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] ${statusStyles[order.status]}`}
                      >
                        {order.status}
                      </span>
                      <FiChevronDown className="text-slate-400" size={18} />
                    </div>
                  </div>
                  <div className="text-sm text-slate-500">
                    <p className="text-sm text-slate-500">{statusCopy[order.status]}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                      <span>{itemsCount} item{itemsCount > 1 ? "s" : ""}</span>
                      <span>Total: {currencyFormatter.format(order.total)}</span>
                      <span>Shipping: {currencyFormatter.format(order.shipping)}</span>
                    </div>
                    <p className="mt-3 text-xs uppercase tracking-[0.3em] text-slate-400">
                      Confirmation Code: {order.confirmationCode}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-sm text-slate-600 shadow-sm">
            <p className="text-lg font-semibold text-slate-900">No orders yet</p>
            <p className="mt-2">Place an order from your cart to see it appear here.</p>
          </div>
        )}
      </div>
    </section>
  );
}
