import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import products from "../data/products";


const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <div className="p-20">Product not found</div>;
  }

  return (
    <div className="p-20 grid grid-cols-1 md:grid-cols-2 gap-12">
      
      {/* LEFT SIDE - IMAGE PLACEHOLDER */}
      <div className="bg-gray-200 h-96 rounded-xl"></div>

      {/* RIGHT SIDE - DETAILS */}
      <div>
        <h1 className="text-4xl font-semibold mb-6">{product.name}</h1>
        <p className="text-xl mb-4">${product.price}</p>
        <p className="text-gray-600 mb-6">{product.description}</p>

        <button
          onClick={() => addToCart(product)}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;