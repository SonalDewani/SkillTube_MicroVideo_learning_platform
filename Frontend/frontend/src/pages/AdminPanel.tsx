import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Shield, Users, Settings, BarChart3, BookOpen, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const adminFeatures = [
  {
    icon: Users,
    title: "Manage Users",
    description: "View, edit, and manage user accounts and permissions",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Settings,
    title: "App Settings",
    description: "Configure global application settings and preferences",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "View detailed analytics and generate usage reports",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: BookOpen,
    title: "Course Management",
    description: "Add, edit, and organize learning courses and content",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Send announcements and notifications to users",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    icon: Shield,
    title: "Security",
    description: "Monitor security settings and access controls",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
];

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex pt-16">
        <Sidebar />
        
        <main className="flex-1 px-6 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="mb-8 fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-brand p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-brand-foreground" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
                  <p className="text-muted-foreground">Manage your SkillTube platform</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="video-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-foreground">1,234</p>
                      <p className="text-muted-foreground text-sm">Total Users</p>
                    </div>
                    <Users className="h-8 w-8 text-brand" />
                  </div>
                </CardContent>
              </Card>

              <Card className="video-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-foreground">87</p>
                      <p className="text-muted-foreground text-sm">Active Courses</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-brand" />
                  </div>
                </CardContent>
              </Card>

              <Card className="video-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-foreground">15.2K</p>
                      <p className="text-muted-foreground text-sm">Total Views</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-brand" />
                  </div>
                </CardContent>
              </Card>

              <Card className="video-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-foreground">98.5%</p>
                      <p className="text-muted-foreground text-sm">Uptime</p>
                    </div>
                    <Shield className="h-8 w-8 text-brand" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Admin Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminFeatures.map((feature, index) => (
                <Card key={index} className="video-card group cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className={`p-4 rounded-full ${feature.bgColor}`}>
                        <feature.icon className={`h-8 w-8 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {feature.description}
                        </p>
                        <Button variant="outline" className="hover:bg-hover">
                          Access
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card className="video-card border-0 mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-brand" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "New user registered", user: "john@example.com", time: "5 minutes ago" },
                    { action: "Course completed", user: "jane@example.com", time: "12 minutes ago" },
                    { action: "System backup completed", user: "System", time: "1 hour ago" },
                    { action: "New course published", user: "admin@skilltube.com", time: "2 hours ago" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-hover transition-colors duration-200">
                      <div>
                        <p className="font-medium text-foreground text-sm">{activity.action}</p>
                        <p className="text-muted-foreground text-xs">{activity.user}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}