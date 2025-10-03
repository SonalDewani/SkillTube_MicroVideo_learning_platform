import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "@/components/ProtectedRoute";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import TeacherDashboard from "./pages/TeacherDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


import React, { useEffect, useState } from "react";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200); // 1.2s animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "#111",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity 0.5s",
            flexDirection: "column"
          }}
        >
          <img 
            src="/public/logo.png"
            alt="Loading..."
            style={{
              width: 80,
              height: 80,
              animation: "zoomInOut 1.2s ease-in-out infinite"
            }}
          />
          <span className="p-4 text-3xl font-bold bg-white bg-clip-text text-transparent">
            SkillTube
          </span>
          <style>{`
            @keyframes zoomInOut {
              0% { transform: scale(1); opacity: 0.7; }
              50% { transform: scale(1.15); opacity: 1; }
              100% { transform: scale(1); opacity: 0.7; }
            }
          `}</style>
        </div>
      )}
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/teacher" element={<TeacherDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
