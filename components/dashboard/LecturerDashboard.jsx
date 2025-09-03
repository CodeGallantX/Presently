'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { 
  Play, 
  Users, 
  TrendingUp, 
  FileDown, 
  Calendar, 
  Clock,
  MapPin,
  BarChart3,
  BookOpen,
  Settings
} from "lucide-react";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar";
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { cn } from '@/lib/utils';

const LecturerDashboard = () => {
  const [activeSession, setActiveSession] = useState(null);
  const [courses] = useState([
    { id: 1, name: 'Mathematics 101', students: 45, attendance: 89 },
    { id: 2, name: 'Advanced Calculus', students: 32, attendance: 92 },
    { id: 3, name: 'Statistics', students: 38, attendance: 76 }
  ]);

  const [recentSessions] = useState([
    { id: 1, course: 'Mathematics 101', date: '2025-01-15', present: 42, total: 45, duration: '1h 30m' },
    { id: 2, course: 'Advanced Calculus', date: '2025-01-14', present: 30, total: 32, duration: '2h 00m' },
    { id: 3, course: 'Statistics', date: '2025-01-13', present: 28, total: 38, duration: '1h 15m' },
  ]);

  const sidebarItems = [
    { icon: <BarChart3 className="w-4 h-4" />, label: 'Dashboard', active: true },
    { icon: <BookOpen className="w-4 h-4" />, label: 'Courses' },
    { icon: <Calendar className="w-4 h-4" />, label: 'Sessions' },
    { icon: <Users className="w-4 h-4" />, label: 'Students' },
    { icon: <FileDown className="w-4 h-4" />, label: 'Reports' },
    { icon: <Settings className="w-4 h-4" />, label: 'Settings' },
  ];

  const startSession = () => {
    setActiveSession({
      course: 'Mathematics 101',
      startTime: new Date(),
      present: 0,
      total: 45
    });
  };

  const endSession = () => {
    setActiveSession(null);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-background">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex">
          <SidebarHeader className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">P</span>
              </div>
              <div>
                <div className="font-bold">Presently</div>
                <div className="text-xs text-muted-foreground">Lecturer Portal</div>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {sidebarItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton isActive={item.active}>
                    {item.icon}
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex-1">
          <DashboardHeader 
            title="Lecturer Dashboard" 
            showSidebarTrigger={true}
          />
          
          <main className="p-6 space-y-8">
            {/* Quick Actions */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Start Session Card */}
              <Card className={cn(
                "dashboard-card",
                activeSession ? "border-green-500/20 bg-green-500/5" : "border-primary/20 bg-primary/5"
              )}>
                <CardContent className="p-8">
                  {activeSession ? (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Session Active</h3>
                      <p className="text-muted-foreground mb-4">{activeSession.course}</p>
                      <div className="flex justify-center gap-4 text-sm">
                        <span className="text-green-400">{activeSession.present} Present</span>
                        <span className="text-muted-foreground">of {activeSession.total}</span>
                      </div>
                      <Button variant="outline" className="mt-4 w-full" onClick={endSession}>
                        End Session
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Play className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Start New Session</h3>
                      <p className="text-muted-foreground mb-6">
                        Begin taking attendance for your class
                      </p>
                      <Button onClick={startSession} className="cta-button w-full group">
                        <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                        Start Session
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="stat-card">
                  <CardContent className="p-6 text-center">
                    <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1">115</div>
                    <div className="text-xs text-muted-foreground">Total Students</div>
                  </CardContent>
                </Card>

                <Card className="stat-card">
                  <CardContent className="p-6 text-center">
                    <div className="w-10 h-10 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1">87%</div>
                    <div className="text-xs text-muted-foreground">Avg Attendance</div>
                  </CardContent>
                </Card>

                <Card className="stat-card">
                  <CardContent className="p-6 text-center">
                    <div className="w-10 h-10 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1">{courses.length}</div>
                    <div className="text-xs text-muted-foreground">Active Courses</div>
                  </CardContent>
                </Card>

                <Card className="stat-card">
                  <CardContent className="p-6 text-center">
                    <div className="w-10 h-10 bg-orange-500/20 text-orange-400 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1">24</div>
                    <div className="text-xs text-muted-foreground">Sessions Today</div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Courses Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Your Courses
                  </CardTitle>
                  <CardDescription>Manage and monitor your active courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courses.map((course, index) => (
                      <motion.div
                        key={course.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{course.name}</div>
                            <div className="text-sm text-muted-foreground">{course.students} students</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">{course.attendance}%</div>
                          <div className="text-xs text-muted-foreground">Attendance</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Sessions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="dashboard-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Recent Sessions
                    </CardTitle>
                    <CardDescription>Latest attendance sessions</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="secondary-button">
                    <FileDown className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentSessions.map((session, index) => (
                      <motion.div
                        key={session.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <div className="font-medium">{session.course}</div>
                            <div className="text-sm text-muted-foreground">{session.date} • {session.duration}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{session.present}/{session.total}</div>
                          <div className="text-xs text-muted-foreground">
                            {Math.round((session.present / session.total) * 100)}% present
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default LecturerDashboard;