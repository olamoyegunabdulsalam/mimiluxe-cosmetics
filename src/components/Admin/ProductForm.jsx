import { useState, useEffect } from "react";

export default function ProductForm({ close, refresh, editing }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (editing) {
      setForm(editing);
    }
  }, [editing]);

  const submit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((k) => data.append(k, form[k]));
    if (editing) data.append("id", editing.id);

    await fetch(
      editing
        ? "https://mimi-luxe.free.nf/update-product.php"
        : "https://mimi-luxe.free.nf/add-product.php",
      { method: "POST", body: data }
    );

    close();
    refresh();
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
          <button className="bg-pink-600 text-white w-full py-2 rounded">
            Save
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
