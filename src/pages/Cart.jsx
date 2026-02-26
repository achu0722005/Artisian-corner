import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <div className="p-20">
      <h1 className="text-4xl font-semibold mb-10">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-xl shadow mb-6">
            <h3 className="font-semibold">{item.name}</h3>
            <p>${item.price}</p>
            <p>Quantity: {item.quantity}</p>

            <div className="flex gap-3 mt-3">
              <button onClick={() => decreaseQuantity(item.id)} className="px-3 bg-gray-200">-</button>
              <button onClick={() => increaseQuantity(item.id)} className="px-3 bg-gray-200">+</button>
              <button onClick={() => removeFromCart(item.id)} className="px-3 bg-red-500 text-white">Remove</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;