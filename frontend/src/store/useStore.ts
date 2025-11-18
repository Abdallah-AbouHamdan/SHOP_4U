import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered";

export type OrderItem = {
  productId: string;
  quantity: number;
};

export type Order = {
  id: string;
  number: string;
  createdAt: string;
  status: OrderStatus;
  statusDetail: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  confirmationCode: string;
};

export type PlaceOrderPayload = {
  itemEntries: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

type Credentials = {
  email: string;
  password: string;
  username?: string;
  accountType?: "buyer" | "seller";
};

type RegisterData = Credentials & {
  username: string;
  accountType: "buyer" | "seller";
};

type UserRecord = {
  id: string;
  email: string;
  username: string;
  accountType: "buyer" | "seller";
  createdAt: string;
  password: string;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  seller: string;
  tagline: string;
  image: string;
  rating: number;
  reviews: number;
  discounted?: boolean;
  description?: string;
};

export type AddProductPayload = {
  title: string;
  price: number;
  category: string;
  tagline: string;
  description?: string;
  image: string;
  compareAtPrice?: number;
};

type State = {
  products: Product[];
  cart: string[];
  favorites: string[];
  selectedProductId: string | null;
  filters: {
    category: string;
    minPrice: number;
    maxPrice: number;
    discounted: boolean;
    sort: "popular" | "priceLow" | "priceHigh";
    search: string;
  };
  user: User | null;
  savedUsernames: Record<string, string>;
  userRecords: Record<string, UserRecord>;
  orders: Order[];
};

type User = {
  email: string;
  username?: string;
  accountType?: "buyer" | "seller";
};

type Actions = {
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  removeProductFromCart: (id: string) => void;
  clearCart: () => void;
  setFilter: (key: keyof State["filters"], value: any) => void;
  openProductModal: (id: string) => void;
  closeProductModal: () => void;
  toggleFavorite: (id: string) => void;
  login: (credentials: Credentials) => { success: boolean; error?: string };
  registerUser: (user: RegisterData) => { success: boolean; error?: string };
  changePassword: (payload: { current: string; next: string }) => {
    success: boolean;
    error?: string;
  };
  placeOrder: (payload: PlaceOrderPayload) => { success: boolean; error?: string };
  addProduct: (payload: AddProductPayload) => { success: boolean; error?: string };
  logout: () => void;
  updateUsername: (username: string) => void;
  updateUser: (payload: Partial<User>) => void;
};

const ORDER_STATUS_FLOW: { status: OrderStatus; detail: string }[] = [
  { status: "Pending", detail: "Awaiting fulfillment" },
  { status: "Processing", detail: "Processing" },
  { status: "Shipped", detail: "Out for delivery" },
  { status: "Delivered", detail: "Delivered" },
];

export const useStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      products: [
        {
          id: "p1",
          title: "Cotton Shorts",
          price: 29.99,
          compareAtPrice: 39.99,
          category: "Fashion",
          seller: "Fashion",
          tagline: "Cooling linen weave",
          image:
            "https://images.unsplash.com/photo-1719473466836-ff9f5ebe0e1b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          rating: 4.1,
          reviews: 132,
          discounted: true,
        },
        {
          id: "p2",
          title: "Tennis Racket",
          price: 199.95,
          compareAtPrice: 209.95,
          category: "Sport Zone",
          seller: "Sport Zone",
          tagline: "Carbon string bed",
          image:
            "https://plus.unsplash.com/premium_photo-1666913667023-4bfd0f6cff0a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVubmlzJTIwcmFja2V0fGVufDB8fDB8fHww",
          rating: 4.5,
          reviews: 254,
          discounted: true,
        },
        {
          id: "p3",
          title: "Mac 4 Pro",
          price: 1999.99,
          category: "Tech Zone",
          seller: "Tech Zone",
          tagline: "M3 power for pros",
          image:
            "https://images.unsplash.com/photo-1565443492615-7e3d2324d925?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFjJTIwNCUyMHByb3xlbnwwfHwwfHx8MA%3D%3D",
          rating: 4.7,
          reviews: 982,
        },
        {
          id: "p4",
          title: "Leather Weekender",
          price: 159.99,
          compareAtPrice: 219.99,
          category: "Lifestyle",
          seller: "City Luxe",
          tagline: "Carry-on approved",
          image:
            "https://images.unsplash.com/photo-1650542218150-5e59a58d4312?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TGVhdGhlciUyMFdlZWtlbmRlcnxlbnwwfHwwfHx8MA%3D%3D",
          rating: 4.4,
          reviews: 88,
          discounted: true,
        },
        {
          id: "p5",
          title: "Wireless Earbuds",
          price: 89.99,
          compareAtPrice: 109.99,
          category: "Tech Zone",
          seller: "Soundify",
          tagline: "Noise-cancelling comfort",
          image:
            "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww",
          rating: 4.6,
          reviews: 641,
          discounted: true,
        },
        {
          id: "p6",
          title: "Running Shoes",
          price: 120.0,
          compareAtPrice: 140.0,
          category: "Sport Zone",
          seller: "Peak Performance",
          tagline: "Responsive cushioning system",
          image:
            "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cnVubmluZyUyMHNob2VzfGVufDB8fDB8fHww",
          rating: 4.8,
          reviews: 1194,
          discounted: true,
        },
        {
          id: "p7",
          title: "Classic Jacket",
          price: 89.5,
          compareAtPrice: 99.99,
          category: "Fashion",
          seller: "Urban Stitch",
          tagline: "Timeless everyday layering",
          image:
            "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amFja2V0fGVufDB8fDB8fHww",
          rating: 4.3,
          reviews: 321,
          discounted: true,
        },
        {
          id: "p8",
          title: "Smart Watch",
          price: 399.99,
          compareAtPrice: 449.99,
          category: "Tech Zone",
          seller: "Tech Zone",
          tagline: "Track health & stay connected",
          image:
            "https://images.unsplash.com/photo-1461141346587-763ab02bced9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
          rating: 4.6,
          reviews: 784,
          discounted: true,
        },
        {
          id: "p9",
          title: "Candle Set",
          price: 34.99,
          compareAtPrice: 49.99,
          category: "Lifestyle",
          seller: "Calm Home",
          tagline: "Relaxing lavender blend",
          image:
            "https://images.unsplash.com/photo-1728897161054-a31928d12a16?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhbmRsZSUyMHNlcnxlbnwwfHwwfHx8MA%3D%3D",
          rating: 4.9,
          reviews: 205,
          discounted: true,
        },
        {
          id: "p10",
          title: "Yoga Mat",
          price: 59.99,
          compareAtPrice: 79.99,
          category: "Sport Zone",
          seller: "ZenFit",
          tagline: "Non-slip eco material",
          image:
            "https://plus.unsplash.com/premium_photo-1663090241828-1d5f7456b699?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          rating: 4.5,
          reviews: 420,
          discounted: true,
        },
      ],
      cart: [],
      favorites: [],
      selectedProductId: null,
      filters: {
        category: "All",
        minPrice: 0,
        maxPrice: 2000,
        discounted: false,
        sort: "popular",
        search: "",
      },
      user: null,
      savedUsernames: {},
      userRecords: {},
      orders: [],
      addToCart: (id) => set((s) => ({ cart: [...s.cart, id] })),
      removeFromCart: (id) =>
        set((s) => {
          const index = s.cart.indexOf(id);
          if (index === -1) return {};
          const next = [...s.cart];
          next.splice(index, 1);
          return { cart: next };
        }),
      removeProductFromCart: (id) =>
        set((s) => ({ cart: s.cart.filter((pid) => pid !== id) })),
      clearCart: () => set({ cart: [] }),
      setFilter: (key, value) =>
        set((s) => ({ filters: { ...s.filters, [key]: value } })),
      openProductModal: (id) => set({ selectedProductId: id }),
      closeProductModal: () => set({ selectedProductId: null }),
      toggleFavorite: (id) =>
        set((s) =>
          s.favorites.includes(id)
            ? { favorites: s.favorites.filter((favId) => favId !== id) }
            : { favorites: [...s.favorites, id] }
        ),
      addProduct: (payload) => {
        const currentUser = get().user;
        if (!currentUser) {
          return { success: false, error: "Log in to add a product." };
        }
        if (currentUser.accountType !== "seller") {
          return { success: false, error: "Only seller accounts can add catalog items." };
        }
        const price = Number(payload.price);
        if (Number.isNaN(price) || price <= 0) {
          return { success: false, error: "Enter a valid price greater than zero." };
        }
        const trimmedTitle = payload.title?.trim();
        if (!trimmedTitle) {
          return { success: false, error: "Provide a product name." };
        }
        if (!payload.category) {
          return { success: false, error: "Select a category." };
        }
        const imageUrl =
          payload.image?.trim() ||
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop";
        let compareAtPrice: number | undefined;
        if (payload.compareAtPrice && payload.compareAtPrice > price) {
          compareAtPrice = payload.compareAtPrice;
        }
        const newProduct: Product = {
          id:
            typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
              ? crypto.randomUUID()
              : `seller-product-${Date.now()}`,
          title: trimmedTitle,
          price,
          compareAtPrice,
          category: payload.category,
          seller: currentUser.username ?? currentUser.email,
          tagline: payload.tagline?.trim() || "Seller listing",
          image: imageUrl,
          rating: 4.5,
          reviews: 0,
          discounted: Boolean(compareAtPrice),
          description: payload.description?.trim() || undefined,
        };
        set((state) => ({ products: [...state.products, newProduct] }));
        return { success: true };
      },
      login: (credentials) => {
        const email = credentials.email.trim();
        const password = credentials.password.trim();
        const record = Object.values(get().userRecords).find(
          (entry) => entry.email === email
        );
        if (!record) {
          return { success: false, error: "No account matches that email address." };
        }
        if (record.password !== password) {
          return { success: false, error: "Incorrect password." };
        }
        set({
          user: {
            email: record.email,
            username: record.username,
            accountType: record.accountType,
          },
        });
        return { success: true };
      },
      registerUser: (payload) => {
        const normalizedEmail = payload.email.trim();
        const normalizedUsername = payload.username.trim();
        const existingEmail = Object.values(get().userRecords).find(
          (entry) => entry.email === normalizedEmail
        );
        if (existingEmail) {
          return { success: false, error: "An account already exists with that email address." };
        }
        if (normalizedUsername && get().savedUsernames[normalizedUsername]) {
          return { success: false, error: "That username is already taken." };
        }
        const id =
          typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : `user-${Date.now()}`;
        const record: UserRecord = {
          id,
          email: normalizedEmail,
          username: normalizedUsername,
          accountType: payload.accountType,
          createdAt: new Date().toISOString(),
          password: payload.password.trim(),
        };
        set((state) => ({
          userRecords: { ...state.userRecords, [record.id]: record },
          savedUsernames: { ...state.savedUsernames, [normalizedUsername]: record.id },
          user: {
            email: normalizedEmail,
            username: normalizedUsername,
            accountType: payload.accountType,
          },
        }));
        return { success: true };
      },
      changePassword: ({ current, next }) => {
        const currentUser = get().user;
        if (!currentUser) {
          return { success: false, error: "Log in to change your password." };
        }
        const recordEntry = Object.entries(get().userRecords).find(
          ([, record]) => record.email === currentUser.email
        );
        if (!recordEntry) {
          return { success: false, error: "Account record not found." };
        }
        const [recordId, record] = recordEntry;
        const trimmedCurrent = current.trim();
        const trimmedNext = next.trim();
        if (record.password !== trimmedCurrent) {
          return { success: false, error: "Current password is incorrect." };
        }
        if (trimmedNext.length < 8) {
          return { success: false, error: "New password must be at least 8 characters long." };
        }
        if (record.password === trimmedNext) {
          return { success: false, error: "New password must differ from the current password." };
        }
        const updatedRecord = { ...record, password: trimmedNext };
        set((state) => ({
          userRecords: { ...state.userRecords, [recordId]: updatedRecord },
        }));
        return { success: true };
      },
      updateUsername: (username) =>
        set((state) => {
          if (!state.user) return {};
          const email = state.user.email;
          const userRecordEntry = Object.entries(state.userRecords).find(
            ([, record]) => record.email === email
          );
          if (!userRecordEntry) {
            return { user: { ...state.user, username } };
          }
          const [recordId, record] = userRecordEntry;
          const prevUsername = record.username;
          const updatedRecords = {
            ...state.userRecords,
            [recordId]: { ...record, username },
          };
          const updatedSavedUsernames = { ...state.savedUsernames };
          if (prevUsername) {
            delete updatedSavedUsernames[prevUsername];
          }
          updatedSavedUsernames[username] = recordId;
          return {
            user: { ...state.user, username },
            userRecords: updatedRecords,
            savedUsernames: updatedSavedUsernames,
          };
        }),
      updateUser: (payload) =>
        set((state) =>
          state.user ? { user: { ...state.user, ...payload } } : {}
        ),
      logout: () => set({ user: null, cart: [], favorites: [] }),
      placeOrder: ({ itemEntries, subtotal, shipping, tax, total }: PlaceOrderPayload) => {
        if (!itemEntries.length) {
          set(() => ({ cart: [] }));
          return { success: false, error: "Cart is empty." };
        }
        set((state) => {
          const flow = ORDER_STATUS_FLOW[state.orders.length % ORDER_STATUS_FLOW.length];
          const newOrder: Order = {
            id:
              typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
                ? crypto.randomUUID()
                : `order-${Date.now()}`,
            number: `order${state.orders.length + 1}`,
            createdAt: new Date().toISOString(),
            status: flow.status,
            statusDetail: flow.detail,
            items: itemEntries,
            subtotal,
            shipping,
            tax,
            total,
            confirmationCode: `CONF${Math.floor(100000 + Math.random() * 900000)}`,
          };
          return {
            orders: [...state.orders, newOrder],
            cart: [],
          };
        });
        return { success: true };
      },
    }),
    {
      name: "shop4u-storage",
      partialize: ({ cart, filters, user, favorites, savedUsernames, userRecords, orders }) => ({
        cart,
        filters,
        user,
        favorites,
        savedUsernames,
        userRecords,
        orders,
      }),
    }
  )
);
