import React, { useState } from "react";

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("email", username); 
  formData.append("password", password);

  try {
    const res = await fetch("https://mimi-luxe.free.nf/login.php", {
      method: "POST",
      body: formData,
    });

    const data = await res.json(); 
    if (data.success) {
      onLoginSuccess();
    } else {
      alert(data.message || "Invalid credentials");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Server error. Check console.");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />
        <button className="w-full bg-pink-600 text-white p-3 rounded hover:bg-pink-700 transition">
          Login
        </button>
      </form>
    </div>
  );
}
