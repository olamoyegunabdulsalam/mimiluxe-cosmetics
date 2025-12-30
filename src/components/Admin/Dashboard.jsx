import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import ProductTable from "./ProductTable";
import Toast from "./Toast";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [ toast, setToast ] = useState({ message: "", type: "" });
   const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });

  const categories = ["oil", "masks", "gloss"];

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  // Fetch products from Supabase
  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*").order("id", { ascending: false });
    if (error) {
      showToast("Failed to load products", "error");
      return;
    }
    setProducts(data);
  };

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (!data?.user) {
        window.location.href = "/admin";
        return;
      }

      // ✅ user exists → fetch products
      await fetchProducts();
    };

    checkAuthAndFetch();
  }, []);


const uploadImage = async (file) => {
  const fileName = `${Date.now()}-${file.name}`; 
  const { data, error } = await supabase.storage
    .from("products") 
    .upload(`products/${fileName}`, file)

  if (error) throw error;

  const { publicUrl, error: urlError } = supabase.storage
    .from("products")
    .getPublicUrl(`products/${fileName}`);

  if (urlError) throw urlError;

  return publicUrl;
};


 const handleSubmit = async (e) => {
   e.preventDefault();
   setUploading(true);
   try {
     let imageUrl = form.image
       ? await uploadImage(form.image)
       : editing?.image || null;
     const payload = { ...form, image: imageUrl };

     if (editing) {
       const { error } = await supabase
         .from("products")
         .update(payload)
         .eq("id", editing.id);
       if (error) throw error;
     } else {
       const { error } = await supabase.from("products").insert([payload]);
       if (error) throw error;
     }

     showToast(editing ? "Product updated" : "Product added");
     await refresh();
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
    setForm({ ...product, image: null }); // keep current image URL
    setOpen(true);
  };

  
  // Delete Product
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    const previous = products;
    setProducts((prev) => prev.filter((p) => p.id !== id));

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      setProducts(previous);
      showToast("Delete failed", "error");
      return;
    }

    showToast("Product deleted successfully");
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
              {/* Your form inputs (name, price, category, description, image) unchanged */}
              {/* ... same as your original code */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
