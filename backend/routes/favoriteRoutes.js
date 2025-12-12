import express from "express";
import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
} from "../controllers/favoriteController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getFavorites);


router.post("/", auth, addToFavorites);


router.delete("/:productId", auth, removeFromFavorites);

export default router;
