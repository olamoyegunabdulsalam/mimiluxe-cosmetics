// components/ProductModal.jsx
import React from "react";
import { FaTimes, FaStar, FaWhatsapp } from "react-icons/fa";

export const ProductModal = ({ product, isOpen, onClose, onWhatsAppClick }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md md:max-w-4xl max-h-[80vh] overflow-y-auto animate-modal">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="w-full md:w-1/2 p-4 md:p-6">
            <div className="relative">
              <button
                onClick={onClose}
                className="absolute top-2 right-2 z-10 bg-white text-gray-600 rounded-full p-2 hover:bg-red-50 hover:text-red-500 transition-all shadow-md"
              >
                <FaTimes size={20} />
              </button>

<img src={product.image}
                alt={product.name}
                className="w-full h-64 sm:h-72 md:h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2 p-4 md:p-8">
            <span className="inline-block px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-sm font-semibold">
              {product.category}
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4 mb-3">
              {product.name}
            </h2>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="flex items-center mb-6">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={18} />
                ))}
              </div>
              <span className="text-gray-500">(48 reviews)</span>
            </div>

            <div className="text-3xl font-bold text-pink-600 mb-8">
              {product.price}
            </div>

            <button
              onClick={() => onWhatsAppClick(product.name)}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all flex items-center justify-center"
            >
              <FaWhatsapp className="mr-3" size={22} />
              Chat Vendor on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
