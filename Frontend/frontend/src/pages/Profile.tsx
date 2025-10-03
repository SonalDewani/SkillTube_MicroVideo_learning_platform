import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { User, Mail, Award, Calendar, TrendingUp, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="video-card border-0 w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Not Logged In</h2>
            <p className="text-muted-foreground mb-4">Please log in to view your profile.</p>
            <Button className="btn-brand" onClick={() => window.location.href = "/"}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const achievements = [
    { name: "First Course", icon: "🎯", color: "bg-blue-500" },
    { name: "Week Streak", icon: "🔥", color: "bg-orange-500" },
    { name: "Quiz Master", icon: "🧠", color: "bg-purple-500" },
    { name: "Fast Learner", icon: "⚡", color: "bg-yellow-500" },
  ];

  const recentCourses = [
    { name: "React Mastery", progress: 85, lastAccessed: "2 hours ago" },
    { name: "JavaScript Fundamentals", progress: 100, lastAccessed: "1 day ago" },
    { name: "Python Basics", progress: 45, lastAccessed: "3 days ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex pt-16">
        <Sidebar />
        
        <main className="flex-1 px-6 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Profile Header */}
            <div className="mb-8 fade-in">
              <Card className="video-card border-0">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-6">
                    <div className="bg-brand p-4 rounded-full">
                      <User className="h-8 w-8 text-brand-foreground" />
                    </div>
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold text-foreground mb-2">
                        {user.username}
                      </h1>
                      <div className="flex items-center space-x-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {user.email}
                        </div>
                        <Badge variant="secondary">{user.role || "Student"}</Badge>
                      </div>
                    </div>
                    <Button variant="outline" className="hover:bg-hover">
                      Edit Profile
                    </Button>
                    {user.role !== "teacher" ? (
                      <Button
                        variant="default"
                        className="ml-2"
                        onClick={async () => {
                          try {
                            const token = localStorage.getItem("token");
                            const response = await fetch("http://localhost:8080/api/users/change-role", {
                              method: "PUT",
                              headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`,
                              },
                              body: JSON.stringify({ role: "teacher" })
                            });
                            const data = await response.json();
                            if (response.ok) {
                              localStorage.setItem("loggedInUser", JSON.stringify(data.user));
                              window.location.reload();
                            } else {
                              alert(data.message || "Failed to change role");
                            }
                          } catch (err) {
                            alert("Error changing role");
                          }
                        }}
                      >
                        Become a Teacher
                      </Button>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="video-card group">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-foreground">12</p>
                      <p className="text-muted-foreground text-sm">Courses Completed</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-brand group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>

              <Card className="video-card group">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-foreground">47</p>
                      <p className="text-muted-foreground text-sm">Hours Learned</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-brand group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>

              <Card className="video-card group">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-foreground">8</p>
                      <p className="text-muted-foreground text-sm">Certificates</p>
                    </div>
                    <Award className="h-8 w-8 text-brand group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>

              <Card className="video-card group">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-foreground">15</p>
                      <p className="text-muted-foreground text-sm">Day Streak</p>
                    </div>
                    <Calendar className="h-8 w-8 text-brand group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Achievements */}
              <Card className="video-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-brand" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-hover transition-colors duration-200">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${achievement.color}`}>
                          <span className="text-lg">{achievement.icon}</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{achievement.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Courses */}
              <Card className="video-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-brand" />
                    Recent Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentCourses.map((course, index) => (
                      <div key={index} className="p-3 rounded-lg hover:bg-hover transition-colors duration-200">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-foreground text-sm">{course.name}</h4>
                          <span className="text-xs text-muted-foreground">{course.lastAccessed}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-brand h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{course.progress}% complete</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}