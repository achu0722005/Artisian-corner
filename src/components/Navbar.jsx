import React from 'react'
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className='bg-blue-100 justify-between items-center px-20 h-16 border-b'>
        <h1 >Artisan’s Corner</h1>
        <div>
            <NavLink to="/categories">categories</NavLink>
            <NavLink to="/sell">Become seller</NavLink>
        </div>
        <div>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/cart">Cart</NavLink>
        </div>
    </nav>
  );
}

export default Navbar
