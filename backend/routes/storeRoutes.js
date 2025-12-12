import express from "express";
import {
  getAllStores,
  getPendingStores,
  approveStore,
  rejectStore,
  getMyStore,
} from "../controllers/storeController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();


router.get("/my", auth, getMyStore);


router.get("/", auth, getAllStores);


router.get("/pending", auth, getPendingStores);


router.put("/:storeId/approve", auth, approveStore);


router.put("/:storeId/reject", auth, rejectStore);

export default router;
