// components/FloatingWhatsAppButton.jsx
import React from "react";
import { MessageCircle } from "lucide-react";

export const FloatingWhatsAppButton = ({ onWhatsAppClick }) => (
  <button
    onClick={() => onWhatsAppClick()}
    className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-pulse-slow"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle size={28} />
    <span className="absolute -top-1 -right-1 flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
    </span>
  </button>
);
