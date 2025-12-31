import React from "react";

export default function ProductTable({ products, onEdit, onDelete }) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl shadow">
        <p className="text-gray-500">No products yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow">
      {/* Desktop / Tablet Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-max">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 object-cover rounded-lg border"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-gray-200 rounded flex items-center justify-center text-xs">
                      No image
                    </div>
                  )}
                </td>

                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4">₦{p.price}</td>
                <td className="p-4 capitalize">{p.category}</td>

                <td className="p-4 flex gap-3">
                  <button
                    onClick={() => onEdit(p)}
                    className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(p.id)}
                    className="px-3 py-1.5 rounded bg-red-600 text-white text-sm hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 p-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="border rounded-xl p-4 flex gap-4 items-start"
          >
            {p.image ? (
              <img
                src={p.image}
                alt={p.name}
                className="w-20 h-20 object-cover rounded-lg border"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-xs">
                No image
              </div>
            )}

            <div className="flex-1">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-500 capitalize">{p.category}</p>
              <p className="font-medium mt-1">₦{p.price}</p>

              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => onEdit(p)}
                  className="flex-1 py-2 rounded bg-blue-600 text-white text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(p.id)}
                  className="flex-1 py-2 rounded bg-red-600 text-white text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
