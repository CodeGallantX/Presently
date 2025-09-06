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
  Settings,
  QrCode,
  Upload, // New import for Bulk Upload
  AlertTriangle, // New import for Attendance Validation Alerts
  MessageSquare, // New import for Notes/Comments (already there, but ensuring)
  BarChart, // New import for Smart Analytics (different from BarChart3)
  Clock as ClockIcon // For Timetable Automation
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; // New import for file upload
import { Textarea } from "@/components/ui/textarea"; // New import for notes
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"; // New imports for modals
import CreateSessionModal from '@/components/dashboard/CreateSessionModal';
import QrCodeModal from '@/components/dashboard/QrCodeModal';

import { useRouter } from 'next/navigation';

const LecturerDashboard = () => {
  const router = useRouter();
  const [isCreateSessionModalOpen, setIsCreateSessionModalOpen] = useState(false);
  const [isQrCodeModalOpen, setIsQrCodeModalOpen] = useState(false);
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

  // New state variables for new features
  const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState(false);
  const [isScheduleSessionModalOpen, setIsScheduleSessionModalOpen] = useState(false);
  const [sessionNotes, setSessionNotes] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const sidebarItems = [
    { icon: <BarChart3 className="w-4 h-4" />, label: 'Dashboard', href: '/dashboard', active: true },
    { icon: <BookOpen className="w-4 h-4" />, label: 'Courses', href: '/dashboard/courses' },
    { icon: <Calendar className="w-4 h-4" />, label: 'Sessions', href: '/dashboard/sessions' },
    { icon: <Users className="w-4 h-4" />, label: 'Students', href: '/dashboard/students' },
    { icon: <FileDown className="w-4 h-4" />, label: 'Reports', href: '/dashboard/reports' },
    { icon: <Settings className="w-4 h-4" />, label: 'Settings', href: '/dashboard/settings' },
  ];

  const handleCreateSession = (newSession) => {
    setActiveSession(newSession);
    setIsCreateSessionModalOpen(false);
  };

  const endSession = () => {
    setActiveSession(null);
    setSessionNotes(''); // Clear notes when session ends
  };

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleBulkUpload = () => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile.name);
      // Simulate upload process
      setIsBulkUploadModalOpen(false);
      setSelectedFile(null);
      alert(`Simulating upload of ${selectedFile.name}. Roster updated!`);
    } else {
      alert("Please select a file to upload.");
    }
  };

  const handleScheduleSession = (scheduleDetails) => {
    console.log("Scheduling session:", scheduleDetails);
    // Simulate scheduling
    setIsScheduleSessionModalOpen(false);
    alert("Session scheduled successfully!");
  };

  return (
    <>
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
            <SidebarContent className="p-4">
              <SidebarMenu className="space-y-2">
                {sidebarItems.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton href={item.href} isActive={router.pathname === item.href}>
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
                        <h3 className="text-xl font-bold mb-2">Active Session: {activeSession.courseName}</h3>
                        <p className="text-muted-foreground mb-4">Venue: {activeSession.venueName}</p>
                        <div className="flex items-center justify-center gap-4 mb-6">
                          <div className="space-y-2">
                            <Label className="text-sm text-muted-foreground">Session Code</Label>
                            <div className="text-3xl font-bold text-primary">{activeSession.sessionCode}</div>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm text-muted-foreground">QR Code</Label>
                            <Button variant="outline" size="icon" onClick={() => setIsQrCodeModalOpen(true)}>
                              <QrCode className="w-6 h-6" />
                            </Button>
                          </div>
                        </div>
                        {/* Notes/Comments */}
                        <div className="space-y-2 mb-4">
                          <Label htmlFor="session-notes">Session Notes</Label>
                          <Textarea
                            id="session-notes"
                            placeholder="Add notes for this session..."
                            value={sessionNotes}
                            onChange={(e) => setSessionNotes(e.target.value)}
                          />
                          <Button size="sm" className="w-full">Save Notes</Button>
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
                        <Button onClick={() => setIsCreateSessionModalOpen(true)} className="cta-button w-full group">
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

              {/* New Features Section */}
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {/* Bulk Upload Card */}
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="w-5 h-5" />
                      Bulk Student Upload
                    </CardTitle>
                    <CardDescription>Add student rosters via Excel/CSV</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input type="file" accept=".csv, .xls, .xlsx" onChange={handleFileUpload} />
                    <Button className="w-full cta-button" onClick={() => setIsBulkUploadModalOpen(true)}>
                      Upload Roster
                    </Button>
                  </CardContent>
                </Card>

                {/* Timetable Automation Card */}
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ClockIcon className="w-5 h-5" />
                      Timetable Automation
                    </CardTitle>
                    <CardDescription>Pre-schedule sessions for automatic attendance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full cta-button" onClick={() => setIsScheduleSessionModalOpen(true)}>
                      Schedule New Session
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Smart Analytics Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart className="w-5 h-5" />
                      Smart Analytics
                    </CardTitle>
                    <CardDescription>Detailed insights into attendance trends</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <h4 className="font-semibold">Course-wise Attendance Heatmaps:</h4>
                    <p className="text-muted-foreground">
                      (Placeholder for interactive heatmap visualization)
                    </p>
                    <h4 className="font-semibold">Late Trends:</h4>
                    <p className="text-muted-foreground">
                      (Placeholder for chart showing late attendance patterns)
                    </p>
                    <h4 className="font-semibold">Top/Low-Performing Students:</h4>
                    <p className="text-muted-foreground">
                      (Placeholder for lists of students based on attendance performance)
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Attendance Validation Alerts Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card className="dashboard-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Attendance Validation Alerts
                    </CardTitle>
                    <CardDescription>Detect and prevent proxy attendance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-orange-500">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Potential proxy attendance detected for MAT101 - Session 2025-01-15</span>
                    </div>
                    <div className="flex items-center gap-2 text-orange-500">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Unusual login pattern for PHY201 - Session 2025-01-14</span>
                    </div>
                    <p className="text-muted-foreground text-sm mt-2">
                      (Alerts will appear here when suspicious activity is detected.)
                    </p>
                  </CardContent>
                </Card>
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

    <CreateSessionModal
      isOpen={isCreateSessionModalOpen}
      onClose={() => setIsCreateSessionModalOpen(false)}
      onCreateSession={handleCreateSession}
    />

    <QrCodeModal
      isOpen={isQrCodeModalOpen}
      onClose={() => setIsQrCodeModalOpen(false)}
      qrCodeUrl={activeSession?.qrCodeUrl}
      sessionCode={activeSession?.sessionCode}
    />

    {/* Bulk Upload Modal */}
    <Dialog open={isBulkUploadModalOpen} onOpenChange={setIsBulkUploadModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Student Roster</DialogTitle>
          <DialogDescription>
            Upload an Excel or CSV file containing your student list.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input type="file" accept=".csv, .xls, .xlsx" onChange={handleFileUpload} />
        </div>
        <DialogFooter>
          <Button onClick={handleBulkUpload} disabled={!selectedFile}>Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Schedule Session Modal */}
    <Dialog open={isScheduleSessionModalOpen} onOpenChange={setIsScheduleSessionModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule New Session</DialogTitle>
          <DialogDescription>
            Pre-schedule your attendance sessions for automatic opening and closing.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="course-select">Course</Label>
          <Select>
            <SelectTrigger id="course-select">
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map(course => (
                <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label htmlFor="session-date">Date</Label>
          <Input id="session-date" type="date" />

          <Label htmlFor="session-time">Time</Label>
          <Input id="session-time" type="time" />

          <Label htmlFor="session-duration">Duration (minutes)</Label>
          <Input id="session-duration" type="number" placeholder="e.g., 90" />

          <Label htmlFor="recurrence">Recurrence</Label>
          <Select>
            <SelectTrigger id="recurrence">
              <SelectValue placeholder="Select recurrence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button onClick={handleScheduleSession}>Schedule</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
  );
};

export default LecturerDashboard;