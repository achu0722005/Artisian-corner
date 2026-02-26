const Success = () => {
  return (
    <div className="p-20 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-6">
        ❤️ Order Placed Successfully!
      </h1>

      <p className="text-lg mb-8">
        Thank you for shopping with us.
      </p>

      <a
        href="/"
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
      >
        Continue Shopping
      </a>
    </div>
  );
};

export default Success;