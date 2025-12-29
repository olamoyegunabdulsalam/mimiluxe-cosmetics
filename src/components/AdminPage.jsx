import React, { useState } from "react";
import AdminLogin from "./Admin/AdminLogin";
import Dashboard from "./Admin/Dashboard";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return isLoggedIn ? (
    <Dashboard />
  ) : (
    <AdminLogin onLoginSuccess={handleLoginSuccess} />
  );
}
