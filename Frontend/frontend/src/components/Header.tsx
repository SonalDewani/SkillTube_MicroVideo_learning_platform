import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Search, Bell, User, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/logout", {}, {
        withCredentials: true,
      });
    } catch (err) {
      // Optionally handle error
    }
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div 
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={() => navigate("/home")}
        >
          <div className="p-2 rounded-lg group-hover:scale-105 transition-transform duration-300">
            <img src="/public/logo.png" alt="SkillTube Logo" className="h-8" />
          </div>
          <span className="text-xl font-bold bg-white bg-clip-text text-transparent">
            SkillTube
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Search for courses, tutorials..." 
              className="search-input pl-10 w-full"
            />
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost"
            size="icon"
            className="hover:bg-hover transition-colors duration-200"
            onClick={() => alert("Notifications coming soon!")}
          >
            <Bell className="h-5 w-5" />
          </Button>

          <Button 
            variant="ghost"
            size="icon"
            className="hover:bg-hover transition-colors duration-200"
            onClick={() => navigate("/profile")}
          >
            <User className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="ml-2"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;