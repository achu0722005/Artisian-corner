import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
  const {
  cartItems,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart
} = useCart();
const navigate = useNavigate();
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="p-20">
      <h1 className="text-4xl font-semibold mb-10">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-xl shadow mb-6">
              <h3 className="font-semibold">{item.name}</h3>
              <p>${item.price}</p>
              <p>Quantity: {item.quantity}</p>

              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="px-3 bg-gray-200"
                >
                  -
                </button>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="px-3 bg-gray-200"
                >
                  +
                </button>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-3 bg-red-500 text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-10 text-2xl font-semibold text-right">
            Total: ${totalPrice.toFixed(2)}
          </div>
          <button
  onClick={clearCart}
  className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
>
  Clear Cart
</button>
<button
  onClick={() => navigate("/checkout")}
  className="mt-6 ml-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
>
  Proceed to Checkout
</button>
        </>
      )}
    </div>
  );
};

export default CartPage;