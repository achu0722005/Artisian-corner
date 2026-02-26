import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      
      {/* Clickable Area */}
      <Link to={`/product/${product.id}`}>
        <div className="bg-gray-200 h-40 rounded-lg mb-4"></div>

        <h3 className="font-semibold text-lg mb-2">
          {product.name}
        </h3>

        <p className="text-gray-700 mb-4">
          ${product.price}
        </p>
      </Link>

      {/* Add To Cart Button */}
      <button
        onClick={() => addToCart(product)}
        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
      >
        Add to Cart
      </button>

    </div>
  );
};

export default ProductCard;