import { Product } from "../models/Product.js";
import { Store } from "../models/Store.js";
import mongoose from "mongoose";


export const createProduct = async (req, res) => {
  try {
    const user = req.user;
    const {
      title,
      description,
      price,
      image,
      images,
      category,
      stock,
    } = req.body;

    if (user.role !== "seller") {
      return res.status(403).json({ error: "Only sellers can create products" });
    }

    const store = await Store.findOne({ owner: user.userId });
    if (!store || !store.approved) {
      return res.status(403).json({ error: "Store not approved" });
    }

    if (!title || !price) {
      return res.status(400).json({ error: "Title and price are required" });
    }

    const product = await Product.create({
      title,
      description,
      price,
      image,
      images,
      category,
      stock,
      store: store._id,
      seller: user.userId,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("store", "name")
      .populate("seller", "name");

    res.json(products);
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product id" });
    }

    const product = await Product.findById(id)
      .populate("store", "name")
      .populate("seller", "name");

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("Get product error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product id" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (
      user.role !== "seller" ||
      product.seller.toString() !== user.userId.toString()
    ) {
      return res.status(403).json({ error: "Not authorized" });
    }

    Object.assign(product, req.body);
    await product.save();

    res.json(product);
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product id" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (
      user.role !== "seller" ||
      product.seller.toString() !== user.userId.toString()
    ) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
