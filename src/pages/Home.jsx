import React from 'react'
import Navbar from '../components/Navbar'
import hero from "../assets/hero.jpg";

import CategoryCard from "../components/CategoryCard.jsx";
import category1 from "../assets/category1.jpg"
import category2 from "../assets/category2.jpg"
import category3 from "../assets/category3.jpg"
import category4 from "../assets/category4.jpg"
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();
  const categories = [
  { title: "Pottery", image: category1 },
  { title: "Home Decor", image: category2 },
  { title: "Jewelry", image: category3 },
  { title: "Textiles", image: category4 },
];
  return (
    <div >
      {/* hero section */}
      <div className='relative h-[500px]'>
        <img src={hero} alt="Hero" className='w-full h-full object-cover' />
      

      <div className="absolute inset-0 bg-black/50 flex items-center justify-start">
        <div className="px-20 max-w-xl space-y-6">
          <h1 className="text-5xl font-semibold text-white">
            Discover Unique Handmade Creations
          </h1>
          <p className='text-gray-400 text-lg'>
            Shop beautiful, handcrafted products made by talented artisans.
          </p>
        <button className="inline-flex items-center justify-center 
                   bg-amber-600 hover:bg-amber-700 
                   text-white font-semibold 
                   px-8 py-3 
                   rounded-xl 
                   shadow-lg 
                   hover:-translate-y-1 
                   transition-all duration-300" onClick={()=>navigate("/category/pottery")}>
              Explore Now
            </button>
            </div>
        </div>
      </div>
      <div className="py-20 px-20 bg-amber-50">
        <h2 className="text-3xl font-semibold text-center text-stone-800 mb-12">Shop by category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category,index)=>(<CategoryCard key={index} title={category.title}image={category.image}/>
          ))}
        </div>
      </div>
      <div className="py-20 px-20 bg-white">
  <h2 className="text-3xl font-semibold text-center mb-12">
    Featured Products
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    <div className="bg-amber-50 p-6 rounded-xl shadow">
      <h3 className="font-semibold">Handmade Vase</h3>
      <p className="text-gray-600">$45</p>
    </div>

    <div className="bg-amber-50 p-6 rounded-xl shadow">
      <h3 className="font-semibold">Wooden Wall Art</h3>
      <p className="text-gray-600">$60</p>
    </div>
    <div className="bg-amber-50 p-6 rounded-xl shadow">
      <h3 className="font-semibold">Wooden Wall Art</h3>
      <p className="text-gray-600">$60</p>
    </div>
    <div className="bg-amber-50 p-6 rounded-xl shadow">
      <h3 className="font-semibold">Wooden Wall Art</h3>
      <p className="text-gray-600">$60</p>
    </div>

    <div className="bg-amber-50 p-6 rounded-xl shadow">
      <h3 className="font-semibold">Beaded Necklace</h3>
      <p className="text-gray-600">$30</p>
    </div>
    <div className="bg-amber-50 p-6 rounded-xl shadow">
      <h3 className="font-semibold">Beaded Necklace</h3>
      <p className="text-gray-600">$30</p>
    </div>
    <div className="bg-amber-50 p-6 rounded-xl shadow">
      <h3 className="font-semibold">Beaded Necklace</h3>
      <p className="text-gray-600">$30</p>
    </div>
  </div>
</div>
<footer className="bg-stone-900 text-gray-300 pt-16 pb-8 px-20">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

    {/* Brand Section */}
    <div>
      <h2 className="text-2xl font-semibold text-white mb-4">
        Artisan’s Corner
      </h2>
      <p className="text-sm leading-6">
        Discover unique handmade creations crafted with passion by talented artisans around the world.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
      <ul className="space-y-2 text-sm">
        <li className="hover:text-amber-400 cursor-pointer">Home</li>
        <li className="hover:text-amber-400 cursor-pointer">Categories</li>
        <li className="hover:text-amber-400 cursor-pointer">About Us</li>
        <li className="hover:text-amber-400 cursor-pointer">Contact</li>
      </ul>
    </div>

    {/* Categories */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
      <ul className="space-y-2 text-sm">
        <li className="hover:text-amber-400 cursor-pointer">Pottery</li>
        <li className="hover:text-amber-400 cursor-pointer">Jewelry</li>
        <li className="hover:text-amber-400 cursor-pointer">Textiles</li>
        <li className="hover:text-amber-400 cursor-pointer">Home Decor</li>
      </ul>
    </div>

    {/* Seller Section */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">For Sellers</h3>
      <ul className="space-y-2 text-sm">
        <li className="hover:text-amber-400 cursor-pointer">Become a Seller</li>
        <li className="hover:text-amber-400 cursor-pointer">Seller Dashboard</li>
        <li className="hover:text-amber-400 cursor-pointer">Seller Guidelines</li>
        <li className="hover:text-amber-400 cursor-pointer">FAQs</li>
      </ul>
    </div>

  </div>

  {/* Divider */}
  <div className="border-t border-stone-700 mt-12 pt-6 text-center text-sm">
    © 2026 Artisan’s Corner. All rights reserved Built With ❤️.
  </div>
</footer>
    </div>
  )
}

export default Home
