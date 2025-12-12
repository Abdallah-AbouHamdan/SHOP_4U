import mongoose from "mongoose";
import { Favorite } from "../models/Favorite.js";
import { Product } from "../models/Product.js";


export const getFavorites = async (req, res) => {
  try {
    const userId = req.user.userId;

    let favorite = await Favorite.findOne({ user: userId })
      .populate("products", "title price image images")
      .lean();

    if (!favorite) {
      favorite = await Favorite.create({ user: userId, products: [] });
    }

    res.json(favorite);
  } catch (err) {
    console.error("Get favorites error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


export const addToFavorites = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product id" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let favorite = await Favorite.findOne({ user: userId });
    if (!favorite) {
      favorite = await Favorite.create({ user: userId, products: [] });
    }

    const exists = favorite.products.some(
      (id) => id.toString() === productId
    );

    if (exists) {
      return res.status(400).json({ error: "Product already in favorites" });
    }

    favorite.products.push(productId);
    await favorite.save();

    const populated = await favorite.populate(
      "products",
      "title price image images"
    );

    res.json(populated);
  } catch (err) {
    console.error("Add favorite error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


export const removeFromFavorites = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product id" });
    }

    const favorite = await Favorite.findOne({ user: userId });
    if (!favorite) {
      return res.status(404).json({ error: "Favorites not found" });
    }

    favorite.products = favorite.products.filter(
      (id) => id.toString() !== productId
    );

    await favorite.save();

    const populated = await favorite.populate(
      "products",
      "title price image images"
    );

    res.json(populated);
  } catch (err) {
    console.error("Remove favorite error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
