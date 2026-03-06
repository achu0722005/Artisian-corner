import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  getVendorProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import vendorMiddleware from "../middleware/vendorMiddleware.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// Public routes
router.get("/", getAllProducts);

// Image upload endpoint
router.post("/upload", authMiddleware, vendorMiddleware, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }
  res.json({ imageUrl: req.file.path });
});

// Vendor routes (must be BEFORE /:id to avoid conflicts)
router.get("/vendor/my-products", authMiddleware, vendorMiddleware, getVendorProducts);
router.post("/", authMiddleware, vendorMiddleware, createProduct);
router.put("/:id", authMiddleware, vendorMiddleware, updateProduct);
router.delete("/:id", authMiddleware, vendorMiddleware, deleteProduct);

// Parameterized route last
router.get("/:id", getProductById);

export default router;
