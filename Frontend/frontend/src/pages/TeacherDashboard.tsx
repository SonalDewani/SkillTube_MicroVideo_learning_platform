import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { GraduationCap, Upload, Users, TrendingUp, BookOpen, Bell, Award, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const teacherFeatures = [
  {
    icon: Upload,
    title: "Upload Content",
    description: "Upload new videos, materials, and course content",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Users,
    title: "Student Management",
    description: "View and manage your enrolled students",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: TrendingUp,
    title: "Performance Analytics",
    description: "Track student progress and course analytics",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Bell,
    title: "Announcements",
    description: "Send notifications and updates to students",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Award,
    title: "Assessments",
    description: "Create quizzes and assignments for students",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    icon: Calendar,
    title: "Schedule",
    description: "Manage your teaching schedule and sessions",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
];

const recentStudents = [
  { name: "Alice Johnson", course: "React Fundamentals", progress: 85, lastActive: "2 hours ago" },
  { name: "Bob Smith", course: "JavaScript Mastery", progress: 72, lastActive: "1 day ago" },
  { name: "Carol Wilson", course: "Python Basics", progress: 94, lastActive: "3 hours ago" },
  { name: "David Brown", course: "React Fundamentals", progress: 56, lastActive: "5 hours ago" },
];

export default function TeacherDashboard() {
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
                  <GraduationCap className="h-6 w-6 text-brand-foreground" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Teacher Dashboard</h1>
                  <p className="text-muted-foreground">Manage your courses and students</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="video-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-foreground">156</p>
                      <p className="text-muted-foreground text-sm">Total Students</p>
                    </div>
                    <Users className="h-8 w-8 text-brand" />
                  </div>
                </CardContent>
              </Card>

              <Card className="video-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-foreground">12</p>
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
                      <p className="text-2xl font-bold text-foreground">89%</p>
                      <p className="text-muted-foreground text-sm">Avg. Completion</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-brand" />
                  </div>
                </CardContent>
              </Card>

              <Card className="video-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-foreground">4.8</p>
                      <p className="text-muted-foreground text-sm">Avg. Rating</p>
                    </div>
                    <Award className="h-8 w-8 text-brand" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Teacher Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {teacherFeatures.map((feature, index) => (
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

            {/* Student Progress */}
            <Card className="video-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-brand" />
                  Recent Student Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentStudents.map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-hover transition-colors duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="bg-brand/20 p-2 rounded-full">
                          <Users className="h-4 w-4 text-brand" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{student.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">{student.course}</Badge>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{student.lastActive}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{student.progress}%</p>
                        <div className="w-16 bg-muted rounded-full h-1.5 mt-1">
                          <div 
                            className="bg-brand h-1.5 rounded-full transition-all duration-300" 
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                      </div>
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