// components/Header.jsx
import React from "react";
import { WandSparkles, Menu, X } from "lucide-react";

export const Header = ({ onWhatsAppClick }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);


  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <WandSparkles className="h-8 w-8 text-pink-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              MIMILUXE
            </span>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={onWhatsAppClick}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Order Now
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t mt-2 py-4">
            <div className="flex flex-col space-y-4 px-2">
              <button
                onClick={() => {
                  onWhatsAppClick();
                  setIsMenuOpen(false);
                }}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-medium mt-4"
              >
                Order on WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
