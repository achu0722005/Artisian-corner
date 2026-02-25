import Navbar from './components/Navbar'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
function App() {


  return (
    <div className="bg-amber-50 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
      </Routes>
    </div>
  )
}

export default App
