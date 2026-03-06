import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import API from "../api/axios";

// Replace with your Stripe publishable key
const stripePromise = loadStripe("pk_test_51T81fQCT7rvvP31lwS2JEiPUWtG7u7tHif8iVhch0Mi3VdzI7faqhjYpaTIVmxiyRPJIvGHgyBKeYem8fGzKvlDj00iY4ry9OV");

const CheckoutForm = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shipping, setShipping] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const platformFee = Math.round(totalPrice * 0.05 * 100) / 100;

  const handleShippingChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");
    if (!shipping.fullName || !shipping.address || !shipping.city) {
      return setError("Please fill in all shipping fields");
    }

    setLoading(true);
    setError("");

    try {
      // 1. Create payment intent
      const { data } = await API.post("/payment/create-payment-intent", {
        amount: totalPrice,
      });

      // 2. Confirm payment with Stripe
      const cardElement = elements.getElement(CardElement);
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: { name: shipping.fullName },
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      // 3. Create order
      await API.post("/orders", {
        products: cartItems.map((item) => ({
          product: item.id,
          quantity: item.quantity,
        })),
        shippingAddress: shipping,
        paymentId: paymentIntent.id,
      });

      // 4. Clear cart and redirect
      clearCart();
      navigate("/success");
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="p-20 text-center">
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-10 md:p-20 max-w-4xl mx-auto">
      <h1 className="text-4xl font-semibold mb-10">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left - Shipping */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <form className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={shipping.fullName}
              onChange={handleShippingChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={shipping.address}
              onChange={handleShippingChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={shipping.city}
                onChange={handleShippingChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                required
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={shipping.postalCode}
                onChange={handleShippingChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={shipping.country}
              onChange={handleShippingChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
            />
          </form>

          <h2 className="text-xl font-semibold mt-8 mb-4">Payment</h2>
          <div className="border border-gray-300 rounded-lg p-4">
            <CardElement
              options={{
                style: {
                  base: { fontSize: "16px", color: "#32325d" },
                  invalid: { color: "#fa755a" },
                },
              }}
            />
          </div>
        </div>

        {/* Right - Order Summary */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="bg-white p-6 rounded-xl shadow">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-3">
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <hr className="my-4" />
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Platform Fee (5%)</span>
              <span>${platformFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mt-4 text-sm">{error}</div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !stripe}
            className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400"
          >
            {loading ? "Processing..." : `Pay $${totalPrice.toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
