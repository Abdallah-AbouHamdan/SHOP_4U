import mongoose from "mongoose";
import { Review } from "../models/Review.js";
import { Order } from "../models/Order.js";


export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product id" });
    }

    const reviews = await Review.find({ product: productId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    console.error("Get reviews error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const addReview = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, orderId, rating, comment } = req.body;


    if (
      !mongoose.Types.ObjectId.isValid(productId) ||
      !mongoose.Types.ObjectId.isValid(orderId)
    ) {
      return res.status(400).json({ error: "Invalid product or order id" });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    const order = await Order.findOne({
      _id: orderId,
      user: userId,
      "items.product": productId,
    });

    if (!order) {
      return res.status(403).json({
        error: "You can only review products you purchased",
      });
    }

    const existingReview = await Review.findOne({
      user: userId,
      product: productId,
      order: orderId,
    });

    if (existingReview) {
      return res.status(400).json({ error: "Review already submitted" });
    }

    const review = await Review.create({
      user: userId,
      product: productId,
      order: orderId,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (err) {
    console.error("Add review error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
