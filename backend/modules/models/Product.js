import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tagline: { type: String, default: "" },
    category: { type: String, required: true },

    price: { type: Number, required: true },
    compareAtPrice: { type: Number },

    image: { type: String, required: true },
    images: [{ type: String }],

    stock: { type: Number, default: 0 },

    description: { type: String },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },

    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
