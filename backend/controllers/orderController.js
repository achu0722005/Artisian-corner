import Order from "../models/Order.js";
import Product from "../models/Product.js";

// Create order
export const createOrder = async (req, res) => {
  try {
    const { products, shippingAddress, paymentId } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products in order" });
    }

    let totalPrice = 0;
    const orderProducts = [];

    for (let item of products) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: `Product ${item.product} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${product.name}` });
      }

      totalPrice += product.price * item.quantity;
      orderProducts.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      // Reduce stock
      product.stock -= item.quantity;
      await product.save();
    }

    // 5% platform commission
    const platformFee = Math.round(totalPrice * 0.05 * 100) / 100;

    const order = await Order.create({
      user: req.user._id,
      products: orderProducts,
      totalPrice,
      platformFee,
      shippingAddress: shippingAddress || {},
      paymentId: paymentId || "",
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get my orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status (admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = req.body.status || order.status;
    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get vendor sales (orders containing vendor's products)
export const getVendorSales = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("products.product")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    // Filter orders that contain this vendor's products
    const vendorOrders = orders
      .map((order) => {
        const vendorProducts = order.products.filter(
          (item) =>
            item.product &&
            item.product.vendor &&
            item.product.vendor.toString() === req.user._id.toString()
        );
        if (vendorProducts.length > 0) {
          return {
            _id: order._id,
            user: order.user,
            products: vendorProducts,
            status: order.status,
            createdAt: order.createdAt,
            vendorTotal: vendorProducts.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            ),
          };
        }
        return null;
      })
      .filter(Boolean);

    res.json(vendorOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};