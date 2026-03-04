import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// 🔹 CREATE ORDER
router.post("/", authMiddleware, async (req, res) => {
  try {
    console.log("REQ USER:", req.user);
    const { products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products in order" });
    }

    let totalPrice = 0;

    for (let item of products) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: "Not enough stock available" });
      }

      totalPrice += product.price * item.quantity;

      // 🔥 Reduce stock
      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      user: req.user._id,
      products,
      totalPrice,
    });

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// 🔹 GET MY ORDERS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("products.product"); // 🔥 important change

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;