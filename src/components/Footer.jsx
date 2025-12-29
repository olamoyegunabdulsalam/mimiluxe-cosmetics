import React from "react";
import { Shield, Truck, MessageCircle } from "lucide-react";

export const Footer = () => (
  <footer className="bg-gray-900 text-gray-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Top Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">YourGlossBrand</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Premium lip glosses crafted to deliver smooth shine, soft comfort,
            and effortless beauty. All orders are placed easily via WhatsApp
            with fast delivery across Nigeria.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Explore</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#products" className="hover:text-white transition">
                All Glosses
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white transition">
                About the Brand
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white transition">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Support / Trust */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Why Shop With Us
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-pink-400" />
              Trusted & Quality Products
            </li>
            <li className="flex items-center gap-3">
              <Truck className="w-4 h-4 text-rose-400" />
              Fast Delivery Nationwide
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle className="w-4 h-4 text-green-400" />
              Quick WhatsApp Support
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}MIMILUXE. All rights reserved.
        <span className="block mt-2">
          Crafted with love • Orders via WhatsApp
        </span>
      </div>
    </div>
  </footer>
);
