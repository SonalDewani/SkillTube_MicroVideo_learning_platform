import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
