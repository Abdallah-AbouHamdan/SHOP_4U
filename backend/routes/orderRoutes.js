import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();


router.post("/", auth, createOrder);


router.get("/my", auth, getMyOrders);


router.get("/:id", auth, getOrderById);


router.put("/:id/status", auth, updateOrderStatus);

export default router;
