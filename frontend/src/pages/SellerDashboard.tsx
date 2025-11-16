import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const categoryOptions = [
  "Fashion",
  "Tech Zone",
  "Lifestyle",
  "Sport Zone",
  "Home",
  "Wellness",
];

const initialFormState = {
  title: "",
  tagline: "",
  category: categoryOptions[0],
  price: "",
  compareAtPrice: "",
  image: "",
  description: "",
  discountActive: false,
};

type SellerFormState = typeof initialFormState;

export default function SellerDashboard() {
  const user = useStore((state) => state.user);
  const addProduct = useStore((state) => state.addProduct);
  const products = useStore((state) => state.products);
  const [formState, setFormState] = useState<SellerFormState>(initialFormState);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const navigate = useNavigate();

  const sellerLabel = user ? user.username ?? user.email : "Seller";

  const sellerProducts = useMemo(
    () => products.filter((product) => product.seller === sellerLabel),
    [products, sellerLabel]
  );

  const totalListings = sellerProducts.length;
  const discountedCount = sellerProducts.filter((product) => product.discounted).length;

  const handleInputChange = <K extends keyof SellerFormState>(
    field: K,
    value: SellerFormState[K]
  ) => {
    setStatus(null);
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const price = Number(formState.price);
    if (Number.isNaN(price) || price <= 0) {
      setStatus({ type: "error", text: "Enter a valid price above zero." });
      return;
    }
    const trimmedTitle = formState.title.trim();
    if (!trimmedTitle) {
      setStatus({ type: "error", text: "Product title is required." });
      return;
    }
    if (!formState.category) {
      setStatus({ type: "error", text: "Pick a category to continue." });
      return;
    }
    let compareAtPrice: number | undefined;
    if (formState.discountActive) {
      const parsed = Number(formState.compareAtPrice);
      if (Number.isNaN(parsed) || parsed <= price) {
        setStatus({
          type: "error",
          text: "Compare price must be higher than the final selling price.",
        });
        return;
      }
      compareAtPrice = parsed;
    }

    const result = addProduct({
      title: trimmedTitle,
      tagline: formState.tagline.trim() || "Fresh seller listing",
      category: formState.category,
      price,
      compareAtPrice,
      image: formState.image.trim() || "",
      description: formState.description.trim() || undefined,
    });

    if (!result.success) {
      setStatus({ type: "error", text: result.error ?? "Unable to save product." });
      return;
    }

    setFormState({ ...initialFormState });
    setStatus({ type: "success", text: "Product added to your storefront." });
  };

  return (
    <div className="bg-[#f9fafb] py-10">
      <div className="mx-auto w-11/12 max-w-6xl space-y-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Seller dashboard
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Welcome back, {user?.username ?? "Seller"}
          </h1>
          <p className="text-sm text-slate-600">
            Add new listings, highlight discounts, and keep your storefront fresh. Your
            catalog syncs automatically across buyer feeds.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(`/shop/${encodeURIComponent(sellerLabel)}`)}
              className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Visit your shop
            </button>
            <span className="text-xs text-slate-400">
              Customers will see every listing listed here in their browse feed.
            </span>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.3fr,0.9fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5"
          >
            <header>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Add product
              </p>
              <h2 className="text-xl font-semibold text-slate-900">New listing</h2>
            </header>

            <div className="space-y-3">
              <label className="space-y-1 text-sm font-semibold text-slate-600">
                Product title
                <input
                  type="text"
                  value={formState.title}
                  onChange={(event) => handleInputChange("title", event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400 focus:bg-white"
                  placeholder="E.g. Aero Travel Pack"
                  required
                />
              </label>

              <label className="space-y-1 text-sm font-semibold text-slate-600">
                Tagline
                <input
                  type="text"
                  value={formState.tagline}
                  onChange={(event) => handleInputChange("tagline", event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400 focus:bg-white"
                  placeholder="Short punchy benefit"
                />
              </label>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <label className="space-y-1 text-sm font-semibold text-slate-600">
                  Category
                  <select
                    value={formState.category}
                    onChange={(event) => handleInputChange("category", event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400 focus:bg-white"
                  >
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1 text-sm font-semibold text-slate-600">
                  Image URL
                  <input
                    type="url"
                    value={formState.image}
                    onChange={(event) => handleInputChange("image", event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400 focus:bg-white"
                    placeholder="https://images.unsplash.com/..."
                  />
                </label>
              </div>

              <label className="space-y-1 text-sm font-semibold text-slate-600">
                Description (optional)
                <textarea
                  value={formState.description}
                  onChange={(event) => handleInputChange("description", event.target.value)}
                  className="h-24 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400 focus:bg-white"
                  placeholder="Add delivery info, sizing, or features."
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <label className="space-y-1 text-sm font-semibold text-slate-600">
                Price
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formState.price}
                  onChange={(event) => handleInputChange("price", event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400 focus:bg-white"
                  placeholder="49.99"
                  required
                />
              </label>
              <label className="space-y-1 text-sm font-semibold text-slate-600 md:col-span-2">
                Discount option
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600">
                    <input
                      type="checkbox"
                      checked={formState.discountActive}
                      onChange={(event) =>
                        handleInputChange("discountActive", event.target.checked)
                      }
                      className="h-4 w-4 rounded border border-slate-300 accent-slate-900"
                    />
                    Offer a compare price
                  </label>
                  <span className="text-xs text-slate-400">
                    Show savings across the catalog.
                  </span>
                </div>
              </label>
            </div>

            {formState.discountActive && (
              <label className="space-y-1 text-sm font-semibold text-slate-600">
                Compare at price
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formState.compareAtPrice}
                  onChange={(event) => handleInputChange("compareAtPrice", event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400 focus:bg-white"
                  placeholder="59.99"
                  required
                />
              </label>
            )}

            {status && (
              <p
                className={`text-sm font-semibold ${
                  status.type === "success" ? "text-emerald-600" : "text-rose-500"
                }`}
                role={status.type === "error" ? "alert" : "status"}
              >
                {status.text}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Publish item
            </button>
          </form>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Snapshot
            </p>
            <h3 className="text-lg font-semibold text-slate-900">Your storefront</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>
                Listings:{" "}
                <span className="font-semibold text-slate-900">{totalListings}</span>
              </p>
              <p>
                Discounts active:{" "}
                <span className="font-semibold text-slate-900">{discountedCount}</span>
              </p>
              <p>
                Shoppable by buyers instantly. Every listing syncs to the storefront feed.
              </p>
            </div>
          </div>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Active listings
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">Your catalog</h2>
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              {sellerProducts.length} {sellerProducts.length === 1 ? "item" : "items"}
            </span>
          </header>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {sellerProducts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
                No listings yet. Add your first product to unlock buyer visibility.
              </div>
            ) : (
              sellerProducts.map((product) => {
                const discountPercent =
                  product.compareAtPrice
                    ? Math.round(
                        ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
                      )
                    : null;
                return (
                  <article
                    key={product.id}
                    className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-[#f9f9f9] p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                        {product.category}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{product.tagline}</p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-xl font-semibold text-slate-900">
                        {currency.format(product.price)}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-xs text-slate-500 line-through">
                          {currency.format(product.compareAtPrice)}
                        </span>
                      )}
                      {discountPercent && (
                        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
                          Save {discountPercent}%
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Reviews: {product.reviews}</span>
                      <span>Rating: {product.rating.toFixed(1)}</span>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
