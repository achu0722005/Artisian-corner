import React from 'react'
import { NavLink } from "react-router-dom";
import { ShoppingCart, Leaf } from "lucide-react";
const Navbar = () => {
  return (
    <nav className='relative z-50 bg-amber-50 flex justify-between items-center px-20 h-20 border-b shadow-sm'>
        
        <div className='flex items-center gap-2 text-stone-800'>
          <Leaf className="text-emerald-600" size={24}   />
          <h1 className='text-2xl font-semibold  tracking-wide' >Artisan’s Corner</h1>
        </div>


        <div className='flex gap-10 text-sm font-medium text-stone-700'>
            <NavLink to="/categories" 
            className={({ isActive }) =>
              isActive 
            ? "text-amber-700 font-semibold border-b-2 border-amber-700 pb-1 " 
            : "hover:text-amber-700  transition shadow-sm hover:shadow-2xl "
  }>categories</NavLink>
            <NavLink to="/sell" className={({isActive})=>
              isActive
            ?"text-amber-700"
            :"hover:text-amber-700 transition shadow-sm hover:shadow-2xl"
            }>Become seller</NavLink>
        </div>


        <div className='flex items-center gap-8 text-sm font-medium text-stone-700'>
            <NavLink to="/login" 
            className="hover:text-amber-700 transition">Login</NavLink>
            <NavLink to="/cart" className="flex items-center gap-1 hover:text-amber-700 transition"><ShoppingCart size={20}/>Cart</NavLink>
        </div>
    </nav>
  );
}

export default Navbar
