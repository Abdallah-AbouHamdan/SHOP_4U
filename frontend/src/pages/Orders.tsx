import { BiChevronDown } from "react-icons/bi";
import { TbPackage } from "react-icons/tb";
import { getActiveOrderStatus, getOrderTimeline, useStore } from "../store/useStore";
import type { OrderStatus } from "../store/useStore";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const statusBadgeStyles: Record<OrderStatus, string> = {
  Pending: "bg-amber-100 text-amber-900",
  Processing: "bg-sky-100 text-sky-900",
  Shipped: "bg-cyan-100 text-cyan-900",
  Delivered: "bg-emerald-100 text-emerald-900",
};

const statusTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export default function Orders() {
  const { orders, products, user } = useStore();
  const userOrders = user ? orders.filter((order) => order.userEmail === user.email) : [];
  const sortedOrders = [...userOrders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const emptyMessage = user
    ? "You haven't placed any orders yet. Place an order to see it here."
    : "Log in to track your orders and leave reviews once your purchases deliver.";

  return (
    <section className="bg-[#f5f5f5] min-h-screen">
      <div className="mx-auto w-11/12 max-w-6xl px-4 py-10">
        <header className="space-y-1 text-slate-900">
          <p className="text-sm text-slate-500">View and track all your orders</p>
          <h1 className="text-3xl font-semibold">My Orders</h1>
        </header>
        <div className="mt-8 space-y-4">
          {sortedOrders.length ? (
            sortedOrders.map((order) => {
              const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
              const previewProduct = products.find((p) => p.id === order.items[0]?.productId);
              const orderDate = new Intl.DateTimeFormat("en-US", {

                month: "long",
                day: "numeric",
                year: "numeric",
              }).format(new Date(order.createdAt));
              const timeline = getOrderTimeline(order);
              const activeStatus = getActiveOrderStatus(order);
              return (
                <article
                  key={order.id}
                  className="relative flex flex-wrap items-center gap-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100">
                    {previewProduct ? (
                      <img
                        src={previewProduct.image}
                        alt={previewProduct.title}
                        className="h-full w-full rounded-2xl object-cover"
                      />
                    ) : (
                      <TbPackage className="text-3xl text-slate-400" />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-3 text-slate-700">
                    <div className="flex items-start gap-3">
                      <div className="space-y-1">
                        <p className="text-lg font-semibold text-slate-900">
                          Order #{order.number}
                        </p>
                        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                          {orderDate}
                        </p>
                        <p className="text-sm font-semibold text-slate-500">
                          {activeStatus.detail}
                        </p>
                      </div>
                      <div className="ml-auto flex flex-col items-end gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${statusBadgeStyles[activeStatus.status]}`}
                        >
                          {activeStatus.status}
                        </span>
                        <BiChevronDown className="text-lg text-slate-300" />
                      </div>
                    </div>
                    <dl className="space-y-1 text-sm text-slate-500">
                      <div className="flex flex-wrap gap-3">
                        <dt className="font-semibold text-slate-600">Items</dt>
                        <dd>
                          {totalItems} item{totalItems > 1 ? "s" : ""}
                        </dd>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <dt className="font-semibold text-slate-600">Total</dt>
                        <dd>{currency.format(order.total)}</dd>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <dt className="font-semibold text-slate-600">Confirmation Code</dt>
                        <dd className="text-slate-900">{order.confirmationCode}</dd>
                      </div>
                    </dl>
                    <div className="mt-4 grid gap-3 text-[11px] sm:grid-cols-4">
                      {timeline.map((entry) => {
                        const isCurrent = entry.status === activeStatus.status;
                        return (
                          <div
                            key={entry.status}
                            className={`rounded-2xl border px-3 py-2 ${
                              isCurrent
                                ? "border-slate-900 bg-slate-50 text-slate-900"
                                : "border-slate-200 bg-white text-slate-500"
                            }`}
                          >
                            <p className="font-semibold uppercase tracking-[0.3em]">
                              {entry.status}
                            </p>
                            <p className="mt-1 text-[10px] font-semibold text-slate-600">
                              {statusTimeFormatter.format(new Date(entry.startAt))}
                            </p>
                            <p className="text-[10px] text-slate-500">{entry.detail}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-6 text-center text-sm text-slate-500">
              {emptyMessage}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
