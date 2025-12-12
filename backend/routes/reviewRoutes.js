import express from "express";
import {
  getReviewsByProduct,
  addReview,
} from "../controllers/reviewController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();


router.get("/:productId", getReviewsByProduct);


router.post("/", auth, addReview);

export default router;
