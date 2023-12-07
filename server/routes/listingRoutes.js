import express from "express";
import {
  createListing,
  // updateListing,
  deleteListing,
} from "../controllers/listingControllers.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/create", verifyToken, createListing);
// router.post("/update/:id", verifyToken, updateListing);
router.delete("/delete/:id", verifyToken, deleteListing);

export default router;
