import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProducts);


router.get("/:id", getProductById);


router.post("/", auth, createProduct);


router.put("/:id", auth, updateProduct);


router.delete("/:id", auth, deleteProduct);

export default router;
