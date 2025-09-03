'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { QrCode, MapPin, Clock, TrendingUp, Calendar, Settings, User, Bell, BookOpen } from "lucide-react";
import MobileNav from '@/components/dashboard/MobileNav';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import MarkAttendanceModal from '@/components/dashboard/MarkAttendanceModal';

const StudentDashboard = () => {
  const { addAttendanceRecord } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attendanceHistory, setAttendanceHistory] = useState([
    { id: 1, course: 'Mathematics 101', date: '2025-01-15', status: 'present', time: '09:00 AM' },
    { id: 2, course: 'Physics 201', date: '2025-01-14', status: 'present', time: '11:00 AM' },
    { id: 3, course: 'Chemistry 101', date: '2025-01-13', status: 'late', time: '02:15 PM' },
    { id: 4, course: 'Biology 101', date: '2025-01-12', status: 'absent', time: '10:00 AM' },
  ]);

  const handleMarkAttendance = (sessionCode) => {
    console.log("Mark Attendance button clicked!");
    const newRecord = {
      id: attendanceHistory.length + 1,
      course: `Course ${sessionCode}`,
      date: new Date().toISOString().slice(0, 10),
      status: 'present',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    addAttendanceRecord(newRecord);
    setAttendanceHistory((prev) => {
      const updatedHistory = [newRecord, ...prev];
      console.log("Updated attendance history:", updatedHistory);
      return updatedHistory;
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const attendanceRate = 85;
  const totalClasses = 24;
  const presentClasses = 20;

  const getStatusStyle = (status) => {
    switch (status) {
      case 'present':
        return 'status-present';
      case 'absent':
        return 'status-absent';
      case 'late':
        return 'status-late';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="Student Dashboard" />
      
      <main className="container mx-auto px-6 pt-24 pb-24 md:pb-6">
        {/* Quick Action - Mark Attendance */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="dashboard-card border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <QrCode className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Ready to Mark Attendance?</h2>
              <p className="text-muted-foreground mb-6">
                Scan the QR code or use your location to check in to class
              </p>
              <Button className="cta-button group" onClick={openModal}>
                <QrCode className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Mark Attendance
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="stat-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">{attendanceRate}%</div>
              <div className="text-sm text-muted-foreground">Attendance Rate</div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">{presentClasses}/{totalClasses}</div>
              <div className="text-sm text-muted-foreground">Classes Attended</div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">2</div>
              <div className="text-sm text-muted-foreground">Late Arrivals</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Attendance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Recent Attendance
              </CardTitle>
              <CardDescription>Your latest attendance records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceHistory.map((record, index) => (
                  <motion.div
                    key={record.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium">{record.course}</div>
                        <div className="text-sm text-muted-foreground">{record.date} • {record.time}</div>
                      </div>
                    </div>
                    <div className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium capitalize",
                      getStatusStyle(record.status)
                    )}>
                      {record.status}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <MobileNav activeTab="dashboard" />

      <MarkAttendanceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onMarkAttendance={handleMarkAttendance}
      />
    </div>
  );
};

export default StudentDashboard;