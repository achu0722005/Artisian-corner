import { useParams } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";
const CategoryPage = () => {
  const { categoryName } = useParams();
  const { addToCart } = useCart(); 

  const filteredProducts = products.filter(
    (product) => product.category === categoryName
  );

  return (
    <div className="p-20">
      <h1 className="text-4xl font-semibold capitalize mb-10">
        {categoryName}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-xl shadow">
            <img src={product.image} className="w-full h-48 object-cover mb-4" />
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <button onClick={() => addToCart(product)} className="mt-3 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;