import { useState, useEffect, useRef } from "react";
import { supabase } from "../../lib/supabase";
import ProductTable from "./ProductTable";
import Toast from "./Toast";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });

const fileInputRef = useRef(null);
  const categories = ["oil", "masks", "gloss"];

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  // Fetch products from Supabase
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });
    if (error) {
      showToast("Failed to load products", "error");
      return;
    }
    setProducts(data);
  };

  const checkAdmin = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching user:", error);
      window.location.href = "/admin";
      return null;
    }

    if (!user || user.email !== "admin@mimiluxe.com") {
      window.location.href = "/admin";
      return null;
    }

    return user; // admin user
  };

  useEffect(() => {
    const init = async () => {
      const user = await checkAdmin();
      if (user) await fetchProducts();
    };
    init();
  }, []);

  const uploadImage = async (file) => {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage.from("products").getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const user = await checkAdmin();
      if (!user) return; // redirect already handled in checkAdmin

      let imageUrl = form.image
        ? await uploadImage(form.image)
        : editing?.image || null;

      const payload = { ...form, image: imageUrl };

      if (editing) {
        // UPDATE
        const { error } = await supabase
          .from("products")
          .update(payload)
          .eq("id", editing.id);
        if (error) throw error;
      } else {
        // INSERT
        const { error } = await supabase.from("products").insert([payload]);
        if (error) throw error;
      }

      await refresh();
      showToast(editing ? "Product updated" : "Product added");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin";
  };

  const refresh = async () => {
    await fetchProducts();
    setOpen(false);
    setEditing(null);
    setForm({
      name: "",
      price: "",
      category: "",
      description: "",
      image: null,
    });
  };

  const openEdit = (product) => {
    setEditing(product);
    setForm({ ...product, image: null });
    setPreview(product.image); // show existing image
    setOpen(true);
  };

  // Delete Product
  const handleDelete = (id) => {
    setDeleteId(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "" })}
        />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage products</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                setForm({
                  name: "",
                  price: "",
                  category: "",
                  description: "",
                  image: null,
                });
                setPreview(null);
                setEditing(null);
                setOpen(true);
              }}
              className="w-full sm:w-auto bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition"
            >
              + Add Product
            </button>

            <button
              onClick={logout}
              className="w-full sm:w-auto bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-black transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-6 sm:mb-8">
          <p className="text-sm text-gray-500">Total Products</p>
          <h2 className="text-3xl font-bold">{products.length}</h2>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 overflow-x-auto">
          <ProductTable
            products={products}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        </div>

        {/* Modal */}
        {open && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-lg mx-4 relative">
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

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <input
                  type="text"
                  placeholder="Product name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                />

                <input
                  type="number"
                  placeholder="Price"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                  className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                />

                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  required
                  className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Select category</option>
                  <option value="oil">Oil</option>
                  <option value="masks">Masks</option>
                  <option value="gloss">Gloss</option>
                </select>

                <textarea
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  required
                  className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"                />

                {/* Hidden file input */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    setForm({ ...form, image: file });
                    setPreview(URL.createObjectURL(file));
                  }}
                />

                {/* Upload button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg py-4 text-gray-600 hover:border-pink-500 hover:text-pink-600 transition"
                >
                  {preview ? "Change image" : "Upload image"}
                </button>

                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border mt-3 mx-auto"
                  />
                )}
                <p className="text-xs text-gray-400 mt-1">
                  JPG or PNG • Max 5MB
                </p>

                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-pink-600 text-white py-3 rounded disabled:opacity-50"
                >
                  {uploading
                    ? "Saving..."
                    : editing
                    ? "Update Product"
                    : "Add Product"}
                </button>
              </form>
            </div>
          </div>
        )}
        {deleteId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-5 w-full max-w-sm mx-4">
              <h3 className="text-lg font-semibold mb-2">Delete product?</h3>
              <p className="text-gray-600 mb-6">
                This action cannot be undone.
              </p>

              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>

                <button
                  onClick={async () => {
                    const { error } = await supabase
                      .from("products")
                      .delete()
                      .eq("id", deleteId);

                    if (!error) {
                      setProducts((prev) =>
                        prev.filter((p) => p.id !== deleteId)
                      );
                      showToast("Product deleted");
                    } else {
                      showToast("Delete failed", "error");
                    }

                    setDeleteId(null);
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
