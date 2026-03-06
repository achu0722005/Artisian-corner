import express from "express";
import { addReview, getProductReviews } from "../controllers/reviewController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Public - get reviews for a product
router.get("/:productId", getProductReviews);

// Auth required - add/update review
router.post("/", authMiddleware, addReview);

export default router;
