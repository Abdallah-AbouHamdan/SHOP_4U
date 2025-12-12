import mongoose from "mongoose";
import { Store } from "../models/Store.js";


export const getAllStores = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Admin only" });
    }

    const stores = await Store.find()
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.json(stores);
  } catch (err) {
    console.error("Get stores error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


export const getPendingStores = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Admin only" });
    }

    const stores = await Store.find({ status: "pending" })
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.json(stores);
  } catch (err) {
    console.error("Get pending stores error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


export const approveStore = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Admin only" });
    }

    const { storeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(storeId)) {
      return res.status(400).json({ error: "Invalid store id" });
    }

    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }

    store.approved = true;
    store.status = "approved";
    await store.save();

    res.json({ message: "Store approved", store });
  } catch (err) {
    console.error("Approve store error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


export const rejectStore = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Admin only" });
    }

    const { storeId } = req.params;
    const { reason } = req.body;

    if (!mongoose.Types.ObjectId.isValid(storeId)) {
      return res.status(400).json({ error: "Invalid store id" });
    }

    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }

    store.approved = false;
    store.status = "rejected";
    store.rejectionReason = reason || "Not specified";
    await store.save();

    res.json({ message: "Store rejected", store });
  } catch (err) {
    console.error("Reject store error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


export const getMyStore = async (req, res) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({ error: "Seller only" });
    }

    const store = await Store.findOne({ owner: req.user.userId });
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }

    res.json(store);
  } catch (err) {
    console.error("Get my store error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
