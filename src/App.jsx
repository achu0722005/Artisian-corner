import Navbar from './components/Navbar'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage"; 
import CartPage from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
function App() {


  return (
    <div className="bg-amber-50 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
              </Routes>
    </div>
  )
}

export default App
