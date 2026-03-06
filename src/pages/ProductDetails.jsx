import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import API from "../api/axios";
import StarRating from "../components/StarRating";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [myRating, setMyRating] = useState(0);
  const [myComment, setMyComment] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState("");

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));

    // Fetch reviews
    API.get(`/reviews/${id}`)
      .then((res) => setReviews(res.data))
      .catch(() => {});
  }, [id]);

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (!product) return <div className="p-20">Product not found</div>;

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="p-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* LEFT SIDE - IMAGE */}
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-xl"
          />
        ) : (
          <div className="bg-gray-200 h-96 rounded-xl flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}

        {/* RIGHT SIDE - DETAILS */}
        <div>
          <h1 className="text-4xl font-semibold mb-4">{product.name}</h1>
          {product.vendor?.storeName && (
            <p className="text-sm text-gray-400 mb-4">Sold by {product.vendor.storeName}</p>
          )}
          <p className="text-2xl font-bold text-amber-700 mb-4">${product.price}</p>
          <p className="text-gray-600 mb-2">Category: <span className="capitalize">{product.category}</span></p>
          <p className="text-gray-600 mb-2">Stock: {product.stock > 0 ? product.stock : "Out of stock"}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Reviews & Ratings</h2>

        {/* Average Rating */}
        {reviews.length > 0 && (
          <div className="flex items-center gap-3 mb-6">
            <StarRating
              rating={Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length)}
              size={24}
            />
            <span className="text-gray-500">
              ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
            </span>
          </div>
        )}

        {/* Write Review Form */}
        {user && (
          <div className="bg-white p-6 rounded-xl shadow mb-8">
            <h3 className="font-semibold mb-3">Write a Review</h3>
            <StarRating rating={myRating} onRate={setMyRating} />
            <textarea
              placeholder="Share your experience..."
              value={myComment}
              onChange={(e) => setMyComment(e.target.value)}
              className="w-full mt-3 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 h-24 resize-none"
            />
            {reviewError && <p className="text-red-500 text-sm mt-2">{reviewError}</p>}
            {reviewSuccess && <p className="text-green-500 text-sm mt-2">{reviewSuccess}</p>}
            <button
              onClick={async () => {
                if (!myRating) return setReviewError("Please select a rating");
                setReviewError("");
                setReviewSuccess("");
                try {
                  await API.post("/reviews", {
                    productId: id,
                    rating: myRating,
                    comment: myComment,
                  });
                  setReviewSuccess("Review submitted!");
                  setMyRating(0);
                  setMyComment("");
                  // Refresh reviews
                  const res = await API.get(`/reviews/${id}`);
                  setReviews(res.data);
                } catch (err) {
                  setReviewError(err.response?.data?.message || "Failed to submit review");
                }
              }}
              className="mt-3 bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition"
            >
              Submit Review
            </button>
          </div>
        )}

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <p className="text-gray-400">No reviews yet. Be the first to review!</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="bg-white p-5 rounded-xl shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{review.user?.name || "Anonymous"}</span>
                    <StarRating rating={review.rating} size={16} />
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {review.comment && <p className="text-gray-600">{review.comment}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
