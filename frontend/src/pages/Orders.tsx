import { FiChevronDown } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { useStore } from "../store/useStore";
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

export default function Orders() {
  const { orders, products } = useStore();
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

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
                          {order.statusDetail}
                        </p>
                      </div>
                      <div className="ml-auto flex flex-col items-end gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${statusBadgeStyles[order.status]}`}
                        >
                          {order.status}
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
                  </div>
                </article>
              );
            })
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-6 text-center text-sm text-slate-500">
              You haven&apos;t placed any orders yet. Place an order to see it here.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
