import express from "express";
import Product from "../models/Product.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// 🔹 CREATE PRODUCT
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      stock,
    });

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// 🔹 GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;