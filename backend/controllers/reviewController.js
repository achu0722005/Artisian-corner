import Review from "../models/Review.js";
import Order from "../models/Order.js";

// Add review (only buyers who purchased the product)
export const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    // Check if user has purchased this product
    const orders = await Order.find({
      user: req.user._id,
      "products.product": productId,
    });

    if (orders.length === 0) {
      return res
        .status(403)
        .json({ message: "You can only review products you have purchased" });
    }

    // Check if already reviewed
    const existingReview = await Review.findOne({
      user: req.user._id,
      product: productId,
    });

    if (existingReview) {
      // Update existing review
      existingReview.rating = rating;
      existingReview.comment = comment;
      const updated = await existingReview.save();
      return res.json(updated);
    }

    const review = await Review.create({
      user: req.user._id,
      product: productId,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reviews for a product
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
