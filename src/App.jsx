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
const res = await fetch("/api/get-products");
const data = await res.json();
console.log(data);

    // Filter out empty/invalid products
    const cleanProducts = data.filter(
      (p) => p.name && p.image && Number(p.price) > 0
    );

    setProducts(cleanProducts);
    setError(null);
  } catch (err) {
    console.error("Failed to fetch products:", err);

    // Fallback demo products
    const fallbackData = [
      {
        id: "8",
        name: "Choco + Bubblegum Lip Gloss",
        category: "gloss",
        price: "5000.00",
        description: "Playful bubblegum pink gloss with a chocolate twist",
        image: "https://mimi-luxe.free.nf/images/combo-1.jpeg",
      },
      {
        id: "7",
        name: "Choco + Hot Pink Lip Gloss",
        category: "gloss",
        price: "5000.00",
        description: "Bold hot pink gloss blended with chocolate",
        image: "https://mimi-luxe.free.nf/images/combo-2.jpeg",
      },
    ];

    setProducts(fallbackData);
    setError("Using demo products. Real products will load when available.");
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


