import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  User, 
  Settings, 
  GraduationCap, 
  Shield, 
  LogIn, 
  UserPlus,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigationItems = [
  { to: "/", icon: LogIn, label: "Login" },
  { to: "/register", icon: UserPlus, label: "Register" },
  { to: "/home", icon: Home, label: "Home" },
  { to: "/profile", icon: User, label: "Profile" },
  { to: "/teacher", icon: GraduationCap, label: "Teacher Dashboard" },
  { to: "/admin", icon: Shield, label: "Admin Panel" },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border transition-all duration-300 z-40",
        isCollapsed ? "w-16" : "w-64"
      )}>
        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-4 bg-card border border-border rounded-full shadow-lg hover:bg-hover"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>

        {/* Navigation */}
        <nav className="pt-8 px-3 space-y-2">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold mb-6 px-3 text-foreground">
              Navigation
            </h2>
          )}
          
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.to;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                  isActive 
                    ? "bg-brand text-brand-foreground shadow-brand" 
                    : "text-muted-foreground hover:text-foreground hover:bg-hover",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <Icon className={cn(
                  "h-5 w-5 transition-colors duration-200",
                  isActive && "text-brand-foreground"
                )} />
                
                {!isCollapsed && (
                  <span className="font-medium transition-colors duration-200">
                    {item.label}
                  </span>
                )}
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
      
      {/* Spacer for collapsed/expanded sidebar */}
      <div className={cn(
        "transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )} />
    </>
  );
}
