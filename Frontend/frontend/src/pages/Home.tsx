import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import VideoSection from "../components/VideoSection";
import { TrendingUp, Award, BookOpen, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex pt-16">
        <Sidebar />
        
        <main className="flex-1 px-6 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8 fade-in">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Welcome to <span className="bg-gradient-primary bg-clip-text text-transparent">SkillTube</span>
              </h1>
            </div>

            {/* Video Section */}
            <VideoSection />
          </div>
        </main>
      </div>
    </div>
  );
}