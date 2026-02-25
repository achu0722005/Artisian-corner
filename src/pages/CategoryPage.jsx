import React from 'react'
import { useParams } from 'react-router-dom'
const CategoryPage = () => {
    const { categoryName } = useParams();

    const products = [
    { id: 1, name: "Clay Vase", category: "pottery", price: 1200 },
    { id: 2, name: "Ceramic Bowl", category: "pottery", price: 800 },
    { id: 3, name: "Wall Art Frame", category: "home decor", price: 1500 },
    { id: 4, name: "Silver Necklace", category: "jewelry", price: 2000 },
    { id: 5, name: "Handwoven Rug", category: "textiles", price: 2500 },
  ];
  const filteredProducts = products.filter(
    (product) => product.category === categoryName
  );
  return (
    <div className="px-20 py-16">

      <h2 className="text-3xl font-semibold mb-10 capitalize">
        {categoryName}
      </h2>

      {filteredProducts.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-600 mt-2">₹ {product.price}</p>

              <button className="mt-4 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryPage
