import React, { useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import Toast from "./Toast";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "" });

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });

  const categories = ["oil", "masks", "gloss"];

  const tempId = () => "temp-" + Math.random().toString(36).slice(2);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://mimi-luxe.free.nf/get-products.php");
      const data = await res.json();
      setProducts(data);
    } catch {
      showToast("Failed to load products", "error");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm((prev) => ({ ...prev, image: files[0] || null }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const openEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      image: null,
    });
    setEditing(product.id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    const previous = products;
    setProducts((prev) => prev.filter((p) => p.id !== id));

    try {
      const res = await fetch(
        `https://mimi-luxe.free.nf/delete-product.php?id=${id}`
      );
      const result = await res.json();
      if (!result.success) {
        throw new Error("Delete failed");
      }
      showToast("Product deleted successfully");
    } catch (err) {
      setProducts(previous);
      showToast("Delete failed", "error");
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const isEditing = Boolean(editing);

  // ✅ Create optimistic product
  const optimisticProduct = {
    id: editing || "temp-" + Math.random().toString(36).slice(2),
    name: form.name,
    price: form.price,
    category: form.category,
    description: form.description,
    image: form.image
      ? URL.createObjectURL(form.image)
      : products.find(p => p.id === editing)?.image,
  };

  // ✅ Update the products state immediately
  if (isEditing) {
    setProducts(prev =>
      prev.map(p => (p.id === editing ? optimisticProduct : p))
    );
  } else {
    setProducts(prev => [optimisticProduct, ...prev]);
  }

  setOpen(false);
  setEditing(null);

  // ✅ Send to backend
  const data = new FormData();
  Object.keys(form).forEach(key => data.append(key, form[key]));
  if (editing) data.append("id", editing);

  try {
    const res = await fetch(
      isEditing
        ? "https://mimi-luxe.free.nf/update-product.php"
        : "https://mimi-luxe.free.nf/add-product.php",
      { method: "POST", body: data }
    );
    const result = await res.json();

    // ✅ Replace optimistic product with real data from backend
    if (result.success) {
      setProducts(prev =>
        prev.map(p =>
          p.id === optimisticProduct.id ? result.product : p
        )
      );

      // Revoke temporary image blob if used
      if (optimisticProduct.image?.startsWith("blob:")) {
        URL.revokeObjectURL(optimisticProduct.image);
      }
    }
  } catch (err) {
    // ❌ Rollback on error
    setProducts(prev => prev.map(p =>
      p.id === optimisticProduct.id ? products.find(pp => pp.id === p.id) : p
    ));
    alert("Something went wrong. Try again.");
  }

  // Reset form
  setForm({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });
};


const logout = async () => {
  // 1. Call logout API
  try {
    await fetch("https://mimi-luxe.free.nf/logout.php", {
      method: "POST",
      credentials: "include"
    });
  } catch (error) {
    console.log("Logout API error:", error);
  }
  
  window.location.href = "/MIMILUXE/";
  
};

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "" })}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage products</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setForm({
                name: "",
                price: "",
                category: "",
                description: "",
                image: null,
              });
              setEditing(null);
              setOpen(true);
            }}
            className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition"
          >
            + Add Product
          </button>

          <button
            onClick={logout}
            className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-black transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <p className="text-sm text-gray-500">Total Products</p>
        <h2 className="text-3xl font-bold">{products.length}</h2>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow p-6">
        <ProductTable
          products={products}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative">
            <button
              onClick={() => {
                setOpen(false);
                setEditing(null);
                setForm({
                  name: "",
                  price: "",
                  category: "",
                  description: "",
                  image: null,
                });
              }}
              className="absolute top-4 right-4 text-gray-500"
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold mb-4">
              {editing ? "Edit Product" : "Add Product"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                placeholder="Product name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-pink-700"
                required
              />

              <input
                name="price"
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-pink-700"
                required
              />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-pink-700"
                required
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-pink-700"
              />

<div className="relative">
  <input
    type="file"
    name="image"
    accept="image/*"
    className="hidden"
    id="file-upload"
    onChange={handleChange}
  />
  
  <label
    htmlFor="file-upload"
    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-pink-300 rounded-lg cursor-pointer bg-pink-50 hover:bg-pink-100 transition-colors"
  >
    <div className="flex flex-col items-center justify-center pt-5 pb-6">
      <svg className="w-8 h-8 mb-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
      </svg>
      <p className="mb-2 text-sm text-pink-700">
        <span className="font-semibold">Click to upload</span> or drag and drop
      </p>
      <p className="text-xs text-pink-500">PNG, JPG, GIF up to 5MB</p>
    </div>
  </label>
  
  {/* Show selected file name */}
  {form.image && (
    <div className="mt-2 text-sm text-gray-600">
      Selected: {form.image.name}
    </div>
  )}
</div>

              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition"
              >
                {editing ? "Update Product" : "Save Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}