import React from "react";
import { NavLink, Link } from "react-router-dom";
import { ShoppingCart, Leaf } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { Gem, Home, Palette, Flower, Shirt } from "lucide-react";
const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-amber-700 font-semibold border-b-2 border-amber-700 pb-1"
      : "hover:text-amber-700 transition duration-200";

  return (
    <nav className="sticky top-0 z-50 bg-amber-50 flex justify-between items-center px-10 lg:px-20 h-20 border-b shadow-sm">
      
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-2 text-stone-800 hover:opacity-80 transition">
        <Leaf className="text-emerald-600" size={24} />
        <h1 className="text-2xl font-semibold tracking-wide">
          Artisan’s Corner
        </h1>
      </Link>


      {/* CENTER LINKS */}
<div className="relative hidden md:flex gap-10 text-sm font-medium text-stone-700">

  {/* Mega Menu */}
  <div className="relative group">
    <span className="flex items-center gap-1 cursor-pointer hover:text-amber-700 transition duration-200">
      Categories
      <span className="text-xs">▾</span>
    </span>

    {/* Mega Menu Panel */}
    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-6 w-[420px]
                    bg-white shadow-2xl rounded-2xl border
                    opacity-0 translate-y-4
                    group-hover:opacity-100
                    group-hover:translate-y-0
                    transition-all duration-300 ease-out">

      <div className="grid grid-cols-2 gap-4 p-6">

        {/* Column 1 */}
        <div className="space-y-3">
          <NavLink
            to="/category/jewelry"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-50 transition"
          >
            <Gem className="text-amber-600" size={18} />
            Handmade Jewelry
          </NavLink>

          <NavLink
            to="/category/decor"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-50 transition"
          >
            <Home className="text-amber-600" size={18} />
            Home Decor
          </NavLink>

          <NavLink
            to="/category/pottery"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-50 transition"
          >
            <Flower className="text-amber-600" size={18} />
            Pottery
          </NavLink>
        </div>

        {/* Column 2 */}
        <div className="space-y-3">
          <NavLink
            to="/category/art"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-50 transition"
          >
            <Palette className="text-amber-600" size={18} />
            Art & Paintings
          </NavLink>

          <NavLink
            to="/category/textiles"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-50 transition"
          >
            <Shirt className="text-amber-600" size={18} />
            Textiles
          </NavLink>
        </div>

      </div>
    </div>
  </div>

  <NavLink
    to="/sell"
    className="hover:text-amber-700 transition duration-200"
  >
    Become Seller
  </NavLink>

</div>
      {/* RIGHT SIDE */}
      <div className="flex items-center gap-8 text-sm font-medium text-stone-700">
        <NavLink to="/login" className={linkStyle}>
          Login
        </NavLink>

        <NavLink
          to="/cart"
          className="relative flex items-center gap-1 hover:text-amber-700 transition"
        >
          <ShoppingCart size={20} />
          Cart

          {totalItems > 0 && (
            <span className="absolute -top-2 -right-4 bg-amber-600 text-white text-xs px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;