import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase"; 

export default function ProductForm({ close, refresh, editing }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null, // File object
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm({
        ...editing,
        image: null, // Clear file input, keep URL in table
      });
    }
  }, [editing]);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");
    return data.url; // Supabase public URL
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = form.image
        ? await uploadImage(form.image)
        : editing?.image || null;

      const payload = {
        ...form,
        image: imageUrl,
      };

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

      refresh();
      close();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-xl w-96 space-y-3"
      >
        <h2 className="text-lg font-bold">
          {editing ? "Edit Product" : "Add Product"}
        </h2>

        <input
          placeholder="Name"
          className="w-full border p-2 rounded"
          value={form.name || ""}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Price"
          type="number"
          className="w-full border p-2 rounded"
          value={form.price || ""}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          placeholder="Category"
          className="w-full border p-2 rounded"
          value={form.category || ""}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={form.description || ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="file"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={uploading}
            className="bg-pink-600 text-white w-full py-2 rounded"
          >
            {uploading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={close}
            className="bg-gray-300 w-full py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
