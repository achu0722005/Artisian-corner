import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    API.get(`/products?category=${categoryName}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [categoryName]);

  if (loading) return <div className="p-20 text-center">Loading...</div>;

  return (
    <div className="p-20">
      <h1 className="text-4xl font-semibold capitalize mb-10">
        {categoryName}
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No products in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
