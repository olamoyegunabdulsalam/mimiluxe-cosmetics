import { Navigate } from "react-router-dom";

export default function AdminGuard({ children }) {
  const isAdmin = localStorage.getItem("admin");

  if (!isAdmin) {
    return <Navigate to="/admin" />;
  }

  return children;
}
