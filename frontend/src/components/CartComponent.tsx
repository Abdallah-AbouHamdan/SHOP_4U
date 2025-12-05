import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { useMemo } from "react";
import { FiX } from "react-icons/fi";
import { GiShoppingCart } from "react-icons/gi";
import { FaMinus, FaPlus } from "react-icons/fa";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: Props) {
  const { products, cart, addToCart, removeFromCart, removeProductFromCart } =
    useStore();
  const navigate = useNavigate();

  const items = useMemo(() => {
    const map = new Map<string, number>();
    cart.forEach((id) => {
      map.set(id, (map.get(id) ?? 0) + 1);
    });
    return Array.from(map.entries())
      .map(([id, quantity]) => {
        const product = products.find((p) => p.id === id);
        if (!product) return null;
        return { product, quantity };
      })
      .filter(Boolean) as {
      product: (typeof products)[number];
      quantity: number;
    }[];
  }, [cart, products]);

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, { product, quantity }) => sum + product.price * quantity,
        0
      ),
    [items]
  );

  const totalItems = useMemo(
    () => items.reduce((sum, { quantity }) => sum + quantity, 0),
    [items]
  );

  if (!open) return null;

  return (
     <div className="fixed inset-0 z-50 flex overflow-y-auto">
      <button
        type="button"
        onClick={onClose}
        className="flex-1 bg-slate-900/30 min-h-screen"
        aria-label="Close cart drawer"
      />
      <div className="relative flex w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-2xl h-screen overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
              <GiShoppingCart aria-hidden className="w-6 h-6" />
            <h2 className="text-lg font-semibold text-slate-900">
              Shopping cart ({totalItems})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xl font-semibold text-slate-400 transition hover:text-slate-800 focus:outline-none"
            aria-label="Close cart"
          >
            <FiX className="h-6 w-6 cursor-pointer" aria-hidden="true" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          <div className="space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="relative flex items-center gap-3 rounded-2xl border border-slate-200 p-3 pl-30"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-26 w-26 rounded-2xl absolute top-0.5 left-0.5 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeProductFromCart(product.id)}
                  className="absolute right-3 top-3 text-slate-400 transition hover:text-slate-800 focus:outline-none"
                  aria-label={`Remove ${product.title} from cart`}
                >
                  <FiX className="h-5 w-5 cursor-pointer" aria-hidden="true" />
                </button>
                <div className="flex flex-1 min-w-0 flex-col gap-3">
                  <div className="space-y-1">
                    <p className="font-semibold text-slate-900">{product.title}</p>
                    <p className="text-xs text-slate-500">{product.seller}</p>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        className="inline-flex h-7 w-7 items-center cursor-pointer justify-center rounded-full border border-slate-200"
                      >
                        <FaMinus className="text-2l text-black" />
                      </button>
                      <span className="font-semibold text-slate-900">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => addToCart(product.id)}
                        className="inline-flex h-7 w-7 items-center cursor-pointer justify-center rounded-full border border-slate-200"
                      >
                        <FaPlus className="text-2l text-black" />
                      </button>
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      {currency.format(product.price * quantity)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sticky bottom-0 border-t border-slate-200 bg-white px-6 pb-6 pt-4">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Subtotal</span>
            <span className="font-semibold text-slate-900">
              {currency.format(subtotal)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate("/cart");
            }}
            className="mt-4 w-full rounded-2xl cursor-pointer bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
}
