import React from "react";
import { ShoppingBag } from "lucide-react";

export const Hero = ({ onWhatsAppClick }) => (
  <div className="relative bg-gradient-to-br from-pink-600 to-pink-300 text-white overflow-hidden">
    <div className="absolute inset-0 bg-black opacity-20"></div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          Elevate Your Everyday Beauty
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-purple-100">
          Luxury lip glosses made for smooth shine and confident beauty.
        </p>
        <button
          onClick={onWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg md:text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center mx-auto"
        >
          <ShoppingBag className="mr-2" />
          Order on WhatsApp
        </button>
      </div>
    </div>
  </div>
);
