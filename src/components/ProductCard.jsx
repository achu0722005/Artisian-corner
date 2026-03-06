import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const productId = product._id || product.id;

  const handleAddToCart = () => {
    addToCart({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <Link to={`/product/${productId}`}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
        ) : (
          <div className="bg-gray-200 h-40 rounded-lg mb-4 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}

        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>

        {product.vendor?.storeName && (
          <p className="text-xs text-gray-400 mb-2">by {product.vendor.storeName}</p>
        )}

        <p className="text-gray-700 mb-4">${product.price}</p>
      </Link>

      <button
        onClick={handleAddToCart}
        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
