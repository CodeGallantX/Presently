'use client';
import { useState } from 'react';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Users, FileDown, Calendar, TrendingUp, BookOpen, MessageSquare } from "lucide-react";
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import MobileNav from '@/components/dashboard/MobileNav';
import { useToast } from "@/components/ui/use-toast";

const ClassRepDashboard = () => {
  const [classData] = useState({
    totalStudents: 45,
    averageAttendance: 87,
    todayPresent: 42,
    courseName: 'Mathematics 101'
  });
  const { toast } = useToast();

  const [recentSessions] = useState([
    { id: 1, date: '2025-01-15', present: 42, total: 45, lecturer: 'Dr. Smith' },
    { id: 2, date: '2025-01-14', present: 40, total: 45, lecturer: 'Dr. Smith' },
    { id: 3, date: '2025-01-13', present: 38, total: 45, lecturer: 'Dr. Johnson' },
  ]);

  const handleExportReport = (type) => {
    console.log(`Exporting ${type} report...`);
    // In a real app, this would trigger a file download
    toast({ title: "Export Report", description: `Simulating export of ${type} report.` });
  };

  const handleSendMessage = () => {
    console.log('Sending announcement...');
    // In a real app, this would open a modal or navigate to a messaging interface
    toast({ title: "Send Announcement", description: "Simulating sending an announcement." });
  };

  const handleViewClassList = () => {
    console.log('Viewing class list...');
    // In a real app, this would navigate to a class list page
    toast({ title: "View Class List", description: "Simulating viewing class list." });
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="Class Representative Dashboard" />
      
      <main className="container mx-auto px-6 pt-24 pb-24 md:pb-6">
        {/* Class Overview */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="dashboard-card border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{classData.courseName}</h2>
                  <p className="text-muted-foreground">Class Representative Dashboard</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{classData.todayPresent}/{classData.totalStudents}</div>
                  <div className="text-sm text-muted-foreground">Present Today</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="stat-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">{classData.totalStudents}</div>
              <div className="text-sm text-muted-foreground">Total Students</div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">{classData.averageAttendance}%</div>
              <div className="text-sm text-muted-foreground">Avg Attendance</div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">18</div>
              <div className="text-sm text-muted-foreground">Sessions This Month</div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-500/20 text-orange-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">3</div>
              <div className="text-sm text-muted-foreground">Pending Issues</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileDown className="w-5 h-5" />
                Export Reports
              </CardTitle>
              <CardDescription>Generate attendance reports for your class</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => handleExportReport('weekly PDF')}>
                  <FileDown className="w-4 h-4 mr-2" />
                  Weekly Report (PDF)
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => handleExportReport('monthly Excel')}>
                  <FileDown className="w-4 h-4 mr-2" />
                  Monthly Summary (Excel)
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => handleExportReport('student list CSV')}>
                  <FileDown className="w-4 h-4 mr-2" />
                  Student List (CSV)
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Class Communication
              </CardTitle>
              <CardDescription>Send notifications to your classmates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start cta-button" onClick={handleSendMessage}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Announcement
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handleViewClassList}>
                  <Users className="w-4 h-4 mr-2" />
                  View Class List
                </Button>
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
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Recent Sessions
              </CardTitle>
              <CardDescription>Latest attendance sessions for your class</CardDescription>
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
                        <div className="font-medium">{session.date}</div>
                        <div className="text-sm text-muted-foreground">Lecturer: {session.lecturer}</div>
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

      <MobileNav activeTab="dashboard" />
    </div>
  );
};

export default ClassRepDashboard;