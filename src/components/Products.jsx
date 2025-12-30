import React from "react";
import { ShoppingBag, Eye } from "lucide-react";

export const Products = ({ products, onProductClick }) => (
  <div
    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-100"
    id="products"
  >
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
      <span className="text-gray-600">{products?.length ?? 0} products</span>
    </div>

    {!products || products.length === 0 ? (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No products found. Try a different search.
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="cursor-pointer group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 relative flex flex-col"
            onClick={() => onProductClick(product)}
          >
            <div className="relative overflow-hidden">
              <img
                src={product.image || "/placeholder.png"} // fallback image
                alt={product.name || "Product"}
                className="w-full h-48 sm:h-56 md:h-60 object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onProductClick(product);
                }}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <Eye className="w-5 h-5 text-gray-700" />
              </button>

              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
                <span className="font-bold text-pink-600 text-sm sm:text-base">
                  ₦{Number(product.price ?? 0).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex flex-col flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                {product.name || "Unnamed Product"}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                {product.description || "No description available."}
              </p>
              <button
                onClick={() => onProductClick(product)}
                className="mt-auto bg-gradient-to-r from-green-500 to-green-600 text-white py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base flex items-center justify-center"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
