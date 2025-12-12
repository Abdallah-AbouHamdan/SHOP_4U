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
  userEmail: string;
  statusTimeline: OrderStatusTimelineEntry[];
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
  images: string[];
  rating: number;
  reviews: number;
  discounted?: boolean;
  description?: string;
  stock: number;
};

export type Review = {
  id: string;
  productId: string;
  reviewer: string;
  reviewerId: string;
  rating: number;
  text: string;
  createdAt: string;
};

type ProductSeed = Omit<Product, "rating" | "reviews" | "images"> & {
  rating?: number;
  reviews?: number;
  images?: string[];
};

const PRODUCT_SEEDS: ProductSeed[] = [
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
    images: [
      "https://images.unsplash.com/photo-1719473466836-ff9f5ebe0e1b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1566392722006-b3ccec017bec?q=80&w=2166&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1719473442915-016f3ebda79a?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 24,
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
    images: [
      "https://plus.unsplash.com/premium_photo-1666913667023-4bfd0f6cff0a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVubmlzJTIwcmFja2V0fGVufDB8fDB8fHww",
      "https://plus.unsplash.com/premium_photo-1666913667082-c1fecc45275d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVubmlzfGVufDB8fDB8fHww",
      "https://plus.unsplash.com/premium_photo-1666913667081-1d6c8ccb5143?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHRlbm5pc3xlbnwwfHwwfHx8MA%3D%3D",
    ],
    stock: 12,
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
    images: [
      "https://images.unsplash.com/photo-1565443492615-7e3d2324d925?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFjJTIwNCUyMHByb3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1732310964074-2d425d1f8e78?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9vayUyMG00JTIwcHJvfGVufDB8fDB8fHww",
      "https://plus.unsplash.com/premium_photo-1681566925324-ee1e65d9d53e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFjYm9vayUyMG00JTIwcHJvfGVufDB8fDB8fHww",
    ],
    stock: 4,
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
    images: [
      "https://images.unsplash.com/photo-1650542218150-5e59a58d4312?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TGVhdGhlciUyMFdlZWtlbmRlcnxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1630071635402-0f7bf751f646?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGVhdGhlciUyMHdlZWtpbmRlcnxlbnwwfHwwfHx8MA%3D%3D",
      "https://media.istockphoto.com/id/1493644514/photo/brown-duffel-bag-on-mens-shoulder.webp?a=1&b=1&s=612x612&w=0&k=20&c=DkUvHcLYDF8vM-qTyyAXrvjSzxvl2WwHQiTx0nFcpyc=",
    ],
    stock: 8,
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
    images: [
      "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWFyYnVkc3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1615281612781-4b972bd4e3fe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWFyYnVkc3xlbnwwfHwwfHx8MA%3D%3D",
    ],
    stock: 32,
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
    images: [
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cnVubmluZyUyMHNob2VzfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNob2VzfGVufDB8fDB8fHww",
    ],
    stock: 18,
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
    images: [
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amFja2V0fGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amFja2V0fGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1627637454030-5ddd536e06e5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8amFja2V0fGVufDB8fDB8fHww",
    ],
    stock: 26,
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
    images: [
      "https://images.unsplash.com/photo-1461141346587-763ab02bced9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1637160151663-a410315e4e75?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 14,
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
    images: [
      "https://images.unsplash.com/photo-1728897161054-a31928d12a16?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhbmRsZSUyMHNlcnxlbnwwfHwwfHx8MA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1680098056984-0c397d284e74?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FuZGxlc3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1613068431228-8cb6a1e92573?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FuZGxlc3xlbnwwfHwwfHx8MA%3D%3D",
    ],
    stock: 40,
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
    images: [
      "https://plus.unsplash.com/premium_photo-1663090241828-1d5f7456b699?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1646239646963-b0b9be56d6b5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW9nYSUyMG1hdHxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1718862403436-616232ec6005?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8eW9nYSUyMG1hdHxlbnwwfHwwfHx8MA%3D%3D",
    ],
    stock: 20,
    discounted: true,
  },
];

const INITIAL_REVIEWS: Review[] = [
  {
    id: "p1-review-1",
    productId: "p1",
    reviewer: "Lena Ortiz",
    reviewerId: "lena.ortiz@shop4u.com",
    rating: 5,
    text: "Soft cotton shorts that stay breathable through long walks.",
    createdAt: "2024-03-14T12:34:00.000Z",
  },
  {
    id: "p1-review-2",
    productId: "p1",
    reviewer: "Miles Chang",
    reviewerId: "miles.chang@shop4u.com",
    rating: 4,
    text: "True to size and the fabric keeps me cool when layering.",
    createdAt: "2024-03-28T09:17:00.000Z",
  },
  {
    id: "p2-review-1",
    productId: "p2",
    reviewer: "Arianna Lee",
    reviewerId: "arianna.lee@shop4u.com",
    rating: 5,
    text: "Lightweight frame with a premium feel and steady power.",
    createdAt: "2024-04-05T14:21:00.000Z",
  },
  {
    id: "p2-review-2",
    productId: "p2",
    reviewer: "Devon Ross",
    reviewerId: "devon.ross@shop4u.com",
    rating: 4,
    text: "Needed a restring sooner than expected but still reliable.",
    createdAt: "2024-04-20T11:05:00.000Z",
  },
  {
    id: "p3-review-1",
    productId: "p3",
    reviewer: "Tasha Moore",
    reviewerId: "tasha.moore@shop4u.com",
    rating: 5,
    text: "Fans stay whisper quiet and battery lasts a full day.",
    createdAt: "2024-05-02T17:40:00.000Z",
  },
  {
    id: "p3-review-2",
    productId: "p3",
    reviewer: "Jonas Reed",
    reviewerId: "jonas.reed@shop4u.com",
    rating: 4,
    text: "Display is stunning but I wish there were more ports.",
    createdAt: "2024-05-18T08:55:00.000Z",
  },
  {
    id: "p4-review-1",
    productId: "p4",
    reviewer: "Mara Winters",
    reviewerId: "mara.winters@shop4u.com",
    rating: 5,
    text: "Leather feels rich and the carry straps are rock solid.",
    createdAt: "2024-05-25T10:10:00.000Z",
  },
  {
    id: "p4-review-2",
    productId: "p4",
    reviewer: "Isaac Chen",
    reviewerId: "isaac.chen@shop4u.com",
    rating: 4,
    text: "Perfect weekend carry but a little heavy when full.",
    createdAt: "2024-06-03T09:45:00.000Z",
  },
  {
    id: "p5-review-1",
    productId: "p5",
    reviewer: "Elina Shah",
    reviewerId: "elina.shah@shop4u.com",
    rating: 5,
    text: "Noise cancellation is top-tier and the fit stays secure.",
    createdAt: "2024-06-15T16:30:00.000Z",
  },
  {
    id: "p5-review-2",
    productId: "p5",
    reviewer: "Carson Bell",
    reviewerId: "carson.bell@shop4u.com",
    rating: 4,
    text: "Sound is bright but the charging case magnet could be stronger.",
    createdAt: "2024-06-23T13:12:00.000Z",
  },
  {
    id: "p6-review-1",
    productId: "p6",
    reviewer: "Nia Powell",
    reviewerId: "nia.powell@shop4u.com",
    rating: 5,
    text: "Responsive cushioning keeps every run feeling light.",
    createdAt: "2024-06-30T07:05:00.000Z",
  },
  {
    id: "p6-review-2",
    productId: "p6",
    reviewer: "Luis Harper",
    reviewerId: "luis.harper@shop4u.com",
    rating: 4,
    text: "Tread held up well but started flattening around 60 miles.",
    createdAt: "2024-07-09T12:22:00.000Z",
  },
  {
    id: "p7-review-1",
    productId: "p7",
    reviewer: "Ryan Koh",
    reviewerId: "ryan.koh@shop4u.com",
    rating: 4,
    text: "Classic look but the fabric is lighter than expected.",
    createdAt: "2024-07-15T11:50:00.000Z",
  },
  {
    id: "p7-review-2",
    productId: "p7",
    reviewer: "Ani Patel",
    reviewerId: "ani.patel@shop4u.com",
    rating: 4,
    text: "Great layering piece, colors softened after washing though.",
    createdAt: "2024-07-21T09:33:00.000Z",
  },
  {
    id: "p8-review-1",
    productId: "p8",
    reviewer: "Sofia Miller",
    reviewerId: "sofia.miller@shop4u.com",
    rating: 5,
    text: "Notifications are crisp and battery lasts holiday trips.",
    createdAt: "2024-07-29T14:01:00.000Z",
  },
  {
    id: "p8-review-2",
    productId: "p8",
    reviewer: "Devin Park",
    reviewerId: "devin.park@shop4u.com",
    rating: 5,
    text: "Comfortable for long workouts and the OLED remains sharp.",
    createdAt: "2024-08-05T08:48:00.000Z",
  },
  {
    id: "p9-review-1",
    productId: "p9",
    reviewer: "Noor Farah",
    reviewerId: "noor.farah@shop4u.com",
    rating: 5,
    text: "Lavender scent actually fills the room without being overpowering.",
    createdAt: "2024-08-11T10:27:00.000Z",
  },
  {
    id: "p9-review-2",
    productId: "p9",
    reviewer: "Carlos Vega",
    reviewerId: "carlos.vega@shop4u.com",
    rating: 4,
    text: "Burn time is long but there was one small wax drip.",
    createdAt: "2024-08-18T07:59:00.000Z",
  },
  {
    id: "p10-review-1",
    productId: "p10",
    reviewer: "Liang Zhao",
    reviewerId: "liang.zhao@shop4u.com",
    rating: 4,
    text: "Great grip though I hoped for more vibrant colors.",
    createdAt: "2024-09-02T08:12:00.000Z",
  },
  {
    id: "p10-review-2",
    productId: "p10",
    reviewer: "Emma Brooks",
    reviewerId: "emma.brooks@shop4u.com",
    rating: 5,
    text: "Durable, cushioned, and the eco materials feel smart.",
    createdAt: "2024-09-10T09:44:00.000Z",
  },
];

const aggregateReviewStats = (reviews: Review[]) => {
  const stats: Record<string, { sum: number; count: number }> = {};
  reviews.forEach((review) => {
    if (!stats[review.productId]) {
      stats[review.productId] = { sum: 0, count: 0 };
    }
    stats[review.productId].sum += review.rating;
    stats[review.productId].count += 1;
  });
  return stats;
};

const buildProductsFromReviews = (reviews: Review[]) => {
  const stats = aggregateReviewStats(reviews);
  return PRODUCT_SEEDS.map((seed) => {
    const stat = stats[seed.id];
    const rating = stat
      ? Number((stat.sum / stat.count).toFixed(1))
      : seed.rating ?? 0;
    const reviewCount = stat?.count ?? seed.reviews ?? 0;
    const galleryImages = seed.images?.length
      ? seed.images
      : [seed.image];
    return { ...seed, rating, reviews: reviewCount, images: galleryImages };
  });
};

const INITIAL_PRODUCTS = buildProductsFromReviews(INITIAL_REVIEWS);

const DEMO_USER_RECORD: UserRecord = {
  id: "user-demo",
  email: "demo@shop4u.com",
  username: "DemoShopper",
  accountType: "buyer",
  createdAt: "2024-01-01T08:00:00.000Z",
  password: "demo1234",
};

export type AddProductPayload = {
  title: string;
  price: number;
  category: string;
  tagline: string;
  description?: string;
  image: string;
  images?: string[];
  compareAtPrice?: number;
  stock?: number;
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
  reviews: Review[];
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
  setFilter: <K extends keyof State["filters"]>(key: K, value: State["filters"][K]) => void;
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
  addReview: (payload: { productId: string; rating: number; text: string }) => {
    success: boolean;
    error?: string;
  };
  logout: () => void;
  updateUsername: (username: string) => void;
  updateUser: (payload: Partial<User>) => void;
};

export type OrderStatusTimelineEntry = {
  status: OrderStatus;
  detail: string;
  startAt: string;
};

const ORDER_STATUS_SEQUENCE: { status: OrderStatus; detail: string; durationMinutes: number }[] = [
  { status: "Pending", detail: "Awaiting fulfillment", durationMinutes: 5 },
  { status: "Processing", detail: "Processing your order", durationMinutes: 10 },
  { status: "Shipped", detail: "Out for delivery", durationMinutes: 15 },
  { status: "Delivered", detail: "Delivered to your doorstep", durationMinutes: 0 },
];

export const buildStatusTimeline = (createdAt: string): OrderStatusTimelineEntry[] => {
  const timeline: OrderStatusTimelineEntry[] = [];
  let cursor = new Date(createdAt);
  ORDER_STATUS_SEQUENCE.forEach(({ status, detail, durationMinutes }) => {
    timeline.push({ status, detail, startAt: cursor.toISOString() });
    cursor = new Date(cursor.getTime() + durationMinutes * 60_000);
  });
  return timeline;
};

export const getOrderTimeline = (order: Order): OrderStatusTimelineEntry[] =>
  order.statusTimeline && order.statusTimeline.length
    ? order.statusTimeline
    : buildStatusTimeline(order.createdAt);

export const getActiveOrderStatus = (order: Order, now = Date.now()): OrderStatusTimelineEntry => {
  const timeline = getOrderTimeline(order);
  const active =
    [...timeline]
      .reverse()
      .find((entry) => new Date(entry.startAt).getTime() <= now) ?? timeline[0];
  return active;
};

export const isOrderDelivered = (order: Order, now = Date.now()): boolean =>
  getActiveOrderStatus(order, now).status === "Delivered";

const DEMO_ORDER_DATE = "2024-07-01T12:00:00.000Z";
const DEMO_ORDER_TIMELINE = buildStatusTimeline(DEMO_ORDER_DATE);

const INITIAL_ORDERS: Order[] = [
  {
    id: "order-demo-1",
    number: "order-demo-1",
    createdAt: DEMO_ORDER_DATE,
    status: DEMO_ORDER_TIMELINE[0].status,
    statusDetail: DEMO_ORDER_TIMELINE[0].detail,
    statusTimeline: DEMO_ORDER_TIMELINE,
    items: [{ productId: "p5", quantity: 1 }],
    subtotal: 89.99,
    shipping: 10,
    tax: 7.2,
    total: 107.19,
    confirmationCode: "CONF-DEM-0001",
    userEmail: DEMO_USER_RECORD.email,
  },
];

export const useStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      products: INITIAL_PRODUCTS,
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
      savedUsernames: { [DEMO_USER_RECORD.username]: DEMO_USER_RECORD.id },
      userRecords: { [DEMO_USER_RECORD.id]: DEMO_USER_RECORD },
      reviews: INITIAL_REVIEWS,
      orders: INITIAL_ORDERS,
      addToCart: (id) =>
        set((state) => {
          const product = state.products.find((p) => p.id === id);
          if (!product) return {};
          const inCart = state.cart.filter((itemId) => itemId === id).length;
          if (inCart >= product.stock) return {};
          return { cart: [...state.cart, id] };
        }),
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
        const normalizedGallery =
          payload.images?.map((img) => img.trim()).filter(Boolean) ?? [];
        const extraGallery = normalizedGallery.filter((img) => img !== imageUrl);
        const galleryImages = [imageUrl, ...extraGallery];
        let compareAtPrice: number | undefined;
        if (payload.compareAtPrice && payload.compareAtPrice > price) {
          compareAtPrice = payload.compareAtPrice;
        }
        const stockValue = Number(payload.stock ?? 10);
        if (Number.isNaN(stockValue) || stockValue < 0) {
          return { success: false, error: "Specify a valid stock count." };
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
          images: galleryImages,
          rating: 0,
          reviews: 0,
          discounted: Boolean(compareAtPrice),
          stock: Math.floor(stockValue),
          description: payload.description?.trim() || undefined,
        };
        set((state) => ({ products: [...state.products, newProduct] }));
        return { success: true };
      },
      addReview: ({ productId, rating, text }) => {
        const currentUser = get().user;
        if (!currentUser) {
          return { success: false, error: "Log in to leave a review." };
        }
        const trimmedText = text.trim();
        if (!trimmedText) {
          return { success: false, error: "Share what you liked about the product." };
        }
        const eligibleOrder = get().orders.find(
          (order) =>
            order.userEmail === currentUser.email &&
            isOrderDelivered(order) &&
            order.items.some((item) => item.productId === productId)
        );
        if (!eligibleOrder) {
          return {
            success: false,
            error: "You can only review items that have been delivered to you.",
          };
        }
        const userReviewCount = get().reviews.filter(
          (review) =>
            review.productId === productId && review.reviewerId === currentUser.email
        ).length;
        if (userReviewCount >= 2) {
          return {
            success: false,
            error: "Two reviews per delivered item are allowed—feel free to update the existing one.",
          };
        }
        const safeRating = Math.min(5, Math.max(1, Math.round(rating)));
        const newReview: Review = {
          id:
            typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
              ? crypto.randomUUID()
              : `review-${Date.now()}`,
          productId,
          reviewer: currentUser.username ?? currentUser.email,
          reviewerId: currentUser.email,
          rating: safeRating,
          text: trimmedText,
          createdAt: new Date().toISOString(),
        };
        set((state) => {
          const nextReviews = [...state.reviews, newReview];
          const productReviews = nextReviews.filter((review) => review.productId === productId);
          const average =
            productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length;
          const roundedAverage = Number(average.toFixed(1));
          return {
            reviews: nextReviews,
            products: state.products.map((product) =>
              product.id === productId
                ? { ...product, rating: roundedAverage, reviews: productReviews.length }
                : product
            ),
          };
        });
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
      updateUser: (payload: Partial<User>) =>
        set((state) =>
          state.user ? { user: { ...state.user, ...payload } } : {}
        ),
      logout: () => set({ user: null, cart: [], favorites: [] }),
      placeOrder: ({ itemEntries, subtotal, shipping, tax, total }: PlaceOrderPayload) => {
        if (!itemEntries.length) {
          set(() => ({ cart: [] }));
          return { success: false, error: "Cart is empty." };
        }
        const totals = itemEntries.reduce((map, entry) => {
          map.set(entry.productId, (map.get(entry.productId) ?? 0) + entry.quantity);
          return map;
        }, new Map<string, number>());
        const catalog = get().products;
        for (const [productId, quantity] of totals.entries()) {
          const product = catalog.find((p) => p.id === productId);
          if (!product) {
            return { success: false, error: "One of the products in your cart is no longer available." };
          }
          if (product.stock < quantity) {
            return {
              success: false,
              error: `${product.title} only has ${product.stock} ${
                product.stock === 1 ? "unit" : "units"
              } remaining.`,
            };
          }
        }
        set((state) => {
          const customerEmail = state.user?.email ?? "guest@shop4u.com";
          const newOrder: Order = {
            id:
              typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
                ? crypto.randomUUID()
                : `order-${Date.now()}`,
            number: `order${state.orders.length + 1}`,
            createdAt: new Date().toISOString(),
            status: "Pending",
            statusDetail: "Awaiting fulfillment",
            statusTimeline: [],
            items: itemEntries,
            subtotal,
            shipping,
            tax,
            total,
            confirmationCode: `CONF${Math.floor(100000 + Math.random() * 900000)}`,
            userEmail: customerEmail,
          };
          const timeline = buildStatusTimeline(newOrder.createdAt);
          newOrder.statusTimeline = timeline;
          newOrder.status = timeline[0].status;
          newOrder.statusDetail = timeline[0].detail;
          const decrementedProducts = state.products.map((product) => {
            const quantity = totals.get(product.id);
            if (!quantity) return product;
            return { ...product, stock: Math.max(product.stock - quantity, 0) };
          });
          return {
            products: decrementedProducts,
            orders: [...state.orders, newOrder],
            cart: [],
          };
        });
        return { success: true };
      },
    }),
    {
      name: "shop4u-storage",
      partialize: ({
        cart,
        filters,
        user,
        favorites,
        savedUsernames,
        userRecords,
        reviews,
        orders,
        products,
      }) => ({
        cart,
        filters,
        user,
        favorites,
        savedUsernames,
        userRecords,
        reviews,
        orders,
        products,
      }),
    }
  )
);
