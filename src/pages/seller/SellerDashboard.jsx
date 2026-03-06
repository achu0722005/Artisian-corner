import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axios";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [productCount, setProductCount] = useState(0);
  const [sales, setSales] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    // Fetch vendor products count
    API.get("/products/vendor/my-products")
      .then((res) => setProductCount(res.data.length))
      .catch(() => {});

    // Fetch vendor sales
    API.get("/orders/vendor/sales")
      .then((res) => {
        setSales(res.data);
        const total = res.data.reduce((sum, order) => sum + (order.vendorTotal || 0), 0);
        setTotalEarnings(total);
      })
      .catch(() => {});
  }, []);

  const storeName = user?.storeName || "My Store";
  const description = user?.storeDescription || "";

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white p-8 flex flex-col">
        <h2 className="text-xl font-semibold mb-8">{storeName}</h2>

        <button
          onClick={() => navigate("/seller/add-product")}
          className="mb-4 p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition text-left"
        >
          + Add Product
        </button>

        <button
          onClick={() => navigate("/seller/my-products")}
          className="mb-4 p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition text-left"
        >
          My Products
        </button>

        <button
          onClick={() => navigate("/")}
          className="mt-auto p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition text-left"
        >
          Back to Store
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-gray-50">
        <h1 className="text-3xl font-semibold mb-2">Seller Dashboard</h1>
        <p className="text-gray-500 mb-8">{description}</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm mb-2">Total Products</h3>
            <p className="text-3xl font-bold text-stone-800">{productCount}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm mb-2">Total Sales</h3>
            <p className="text-3xl font-bold text-stone-800">{sales.length}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm mb-2">Total Earnings</h3>
            <p className="text-3xl font-bold text-green-600">${totalEarnings.toFixed(2)}</p>
          </div>
        </div>

        {/* Recent Sales */}
        <h2 className="text-xl font-semibold mb-4">Recent Sales</h2>
        {sales.length === 0 ? (
          <p className="text-gray-400">No sales yet.</p>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Products</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {sales.slice(0, 10).map((order) => (
                  <tr key={order._id} className="border-t">
                    <td className="p-4 text-sm text-gray-500">{order._id.slice(-8)}</td>
                    <td className="p-4 text-sm">
                      {order.products.map((p) => p.product?.name || "Unknown").join(", ")}
                    </td>
                    <td className="p-4 font-medium">${order.vendorTotal?.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        order.status === "Delivered" ? "bg-green-100 text-green-700" :
                        order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
