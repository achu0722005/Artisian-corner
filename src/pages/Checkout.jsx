import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="p-20">
      <h1 className="text-4xl font-semibold mb-10">Checkout</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="mb-4">
              <p>
                {item.name} × {item.quantity}
              </p>
            </div>
          ))}

          <div className="mt-6 text-2xl font-bold">
            Total: ${totalPrice.toFixed(2)}
          </div>

          <button
            onClick={() => {
              clearCart();
              navigate("/success");
            }}
            className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;