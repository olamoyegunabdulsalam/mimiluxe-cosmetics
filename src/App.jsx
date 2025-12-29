// App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/Dashboard";

import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Products } from "./components/Products";
import { Categories } from "./components/Categories";
import { ProductModal } from "./components/ProductModal";
import { AboutUs } from "./components/AboutUs";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { FloatingWhatsAppButton } from "./components/FloatingWhatsAppButton";

const CATEGORIES = [
  { id: "all", name: "All Items" },
  { id: "oil", name: "Oil" },
  { id: "masks", name: "Masks" },
  { id: "gloss", name: "Gloss" },
];

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null); // Add error state

  const fetchProducts = async () => {
    try {
      // Try Vercel API
      const res = await fetch("/api/products");
      const text = await res.text();

      console.log("API response:", text.substring(0, 200));

      // Check if we got source code instead of JSON
      if (text.includes("import ") || text.includes("module.exports")) {
        throw new Error("Got source code instead of API response");
      }

      const data = JSON.parse(text);
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error("API failed:", err);

      // Fallback to direct InfinityFree PHP (if accessible)
      try {
        const proxy = "https://corsproxy.io/?";
        const res2 = await fetch(
          `${proxy}${encodeURIComponent(
            "https://mimi-luxe.free.nf/get-products.json"
          )}`
        );
        const data2 = await res2.json();
        setProducts(data2);
        setError("Using PHP API fallback");
      } catch (err2) {
        console.error("Fallback also failed");
        setError("Products temporarily unavailable");
      }
    }
  };

  const refreshProducts = () => fetchProducts();

  useEffect(() => {
    console.log("Current origin:", window.location.origin);
    fetchProducts();

    const interval = setInterval(() => {
      fetchProducts();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, products]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    document.body.style.overflow = "auto";
  };

  // ✅ CLEAN WhatsApp logic (no object bug)
  const handleWhatsAppClick = (product) => {
    const phoneNumber = "2349162758687";

    const productName = typeof product === "string" ? product : product?.name;

    const message = productName
      ? `Hello, I'm interested in the ${productName}. Is it still available?`
      : `Hello, I'd like to enquire about your lip gloss products.`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <Routes>
      {/* Public Site */}
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-gray-50">
            <Header onWhatsAppClick={() => handleWhatsAppClick()} />
            <Hero onWhatsAppClick={() => handleWhatsAppClick()} />

            <Categories
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />

            {/* Display error if any */}
            {error && (
              <div className="max-w-7xl mx-auto px-4 py-3 bg-yellow-50 text-yellow-800 rounded-lg my-4">
                {error}
              </div>
            )}

            <Products
              products={filteredProducts}
              onProductClick={handleProductClick}
              onWhatsAppClick={(product) => handleWhatsAppClick(product)}
            />

            <ProductModal
              isOpen={isModalOpen}
              product={selectedProduct}
              onClose={closeModal}
              onWhatsAppClick={(product) => handleWhatsAppClick(product)}
            />

            <AboutUs onWhatsAppClick={handleWhatsAppClick} />
            <Contact onWhatsAppClick={handleWhatsAppClick} />
            <Footer />
            <FloatingWhatsAppButton onWhatsAppClick={handleWhatsAppClick} />
          </div>
        }
      />

      {/* Admin */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;

