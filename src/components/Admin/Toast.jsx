import React from "react";

export default function Toast({ message, type, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed top-6 right-6 z-[9999]">
      <div
        className={`px-5 py-4 rounded-lg shadow-lg text-white flex items-center gap-3
        ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
      >
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
