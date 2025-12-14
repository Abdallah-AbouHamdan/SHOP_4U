import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    image: { type: String },
    images: [{ type: String }],
    category: { type: String, default: "General" },
    stock: { type: Number, default: 0, min: 0 },
    store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", ProductSchema);
