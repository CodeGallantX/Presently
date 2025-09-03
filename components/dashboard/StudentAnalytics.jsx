'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress'; // Assuming a progress component exists
import { Download, CalendarDays, TrendingUp, BookOpen } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import MobileNav from '@/components/dashboard/MobileNav';
import { cn } from '@/lib/utils';

// Dummy data for demonstration
const dummyAttendanceData = {
  totalSessions: 120,
  attendedSessions: 100,
  courses: [
    {
      id: 'math101',
      name: 'Mathematics 101',
      attended: 28,
      total: 30,
      lastAttended: '2025-08-30',
    },
    {
      id: 'phy201',
      name: 'Physics 201',
      attended: 25,
      total: 30,
      lastAttended: '2025-08-29',
    },
    {
      id: 'chem101',
      name: 'Chemistry 101',
      attended: 18,
      total: 20,
      lastAttended: '2025-08-28',
    },
    {
      id: 'bio101',
      name: 'Biology 101',
      attended: 20,
      total: 20,
      lastAttended: '2025-08-30',
    },
  ],
  trend: [
    { week: 'Week 1', attendance: 70 },
    { week: 'Week 2', attendance: 75 },
    { week: 'Week 3', attendance: 80 },
    { week: 'Week 4', attendance: 85 },
    { week: 'Week 5', attendance: 88 },
    { week: 'Week 6', attendance: 90 },
  ],
};

const getMotivationalMessage = (percentage) => {
  if (percentage >= 95) return "Outstanding! You're a true attendance champion!";
  if (percentage >= 85) return "Great job! Keep up the excellent work!";
  if (percentage >= 70) return "Good effort! A little more consistency and you'll be unstoppable.";
  return "Every session counts! Let's boost that attendance together.";
};

const StudentAnalytics = () => {
  const overallAttendancePercentage = (
    (dummyAttendanceData.attendedSessions / dummyAttendanceData.totalSessions) * 100
  ).toFixed(1);

  const motivationalMessage = getMotivationalMessage(overallAttendancePercentage);
  const [isChartDialogOpen, setIsChartDialogOpen] = useState(false);

  const handleExportCsv = () => {
    const headers = ["Course Name", "Sessions Attended", "Total Sessions", "Attendance Percentage"];
    const rows = dummyAttendanceData.courses.map(course => [
      course.name,
      course.attended,
      course.total,
      ((course.attended / course.total) * 100).toFixed(1) + '%',
    ]);

    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'attendance_summary.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="Attendance Analytics" showBackButton={true} onBackClick={() => window.history.back()} />

      <main className="container mx-auto px-6 pt-24 pb-24 md:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Overall Attendance Summary */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="dashboard-card h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Overall Attendance
                </CardTitle>
                <CardDescription>Your attendance performance across all sessions.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col items-center justify-center p-6">
                {/* Circular Progress Chart Placeholder */}
                <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-muted stroke-current"
                      strokeWidth="10"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                    />
                    <circle
                      className="text-primary stroke-current"
                      strokeWidth="10"
                      strokeLinecap="round"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={2 * Math.PI * 40 - (2 * Math.PI * 40 * overallAttendancePercentage) / 100}
                    />
                  </svg>
                  <span className="absolute text-2xl font-bold text-primary">{overallAttendancePercentage}%</span>
                </div>
                <p className="text-lg font-semibold text-center mb-2">
                  {dummyAttendanceData.attendedSessions} / {dummyAttendanceData.totalSessions} Sessions
                </p>
                <p className="text-sm text-muted-foreground text-center">
                  {motivationalMessage}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Course Analytics & Export */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="dashboard-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Per-Course Attendance
                    </CardTitle>
                    <CardDescription>Detailed breakdown of your attendance by course.</CardDescription>
                  </div>
                  <Button onClick={handleExportCsv} variant="outline" size="sm" className="secondary-button">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </CardHeader>
                <CardContent>
                  {/* Desktop Table View */}
                  <div className="hidden md:block">
                    <table className="w-full text-left table-auto">
                      <thead>
                        <tr className="text-muted-foreground text-sm uppercase">
                          <th className="py-2">Course</th>
                          <th className="py-2">Attended</th>
                          <th className="py-2">Total</th>
                          <th className="py-2">Percentage</th>
                          <th className="py-2">Progress</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dummyAttendanceData.courses.map((course, index) => (
                          <tr key={course.id} className="border-t border-border text-foreground">
                            <td className="py-3 font-medium">{course.name}</td>
                            <td className="py-3">{course.attended}</td>
                            <td className="py-3">{course.total}</td>
                            <td className="py-3">{((course.attended / course.total) * 100).toFixed(1)}%</td>
                            <td className="py-3">
                              <Progress value={((course.attended / course.total) * 100)} className="w-[100px]" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="md:hidden space-y-4">
                    {dummyAttendanceData.courses.map((course, index) => (
                      <Card key={course.id} className="border-border shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{course.name}</h4>
                            <span className="text-sm text-primary">{((course.attended / course.total) * 100).toFixed(1)}%</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{course.attended} / {course.total} Sessions</p>
                          <Progress value={((course.attended / course.total) * 100)} className="w-full mb-2" />
                          <p className="text-xs text-muted-foreground">
                            Last attended: {course.lastAttended}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Basic Trend Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="w-5 h-5" />
                    Attendance Trend
                  </CardTitle>
                  <CardDescription>Your attendance percentage over time.</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Desktop Chart View */}
                  <div className="hidden md:block w-full h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={dummyAttendanceData.trend}
                        margin={{
                          top: 5,
                          right: 10,
                          left: 10,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                        <XAxis dataKey="week" tickLine={false} axisLine={false} />
                        <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '0.5rem' }}
                          labelStyle={{ color: 'var(--foreground)' }}
                          itemStyle={{ color: 'var(--muted-foreground)' }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '10px', color: 'var(--muted-foreground)' }} />
                        <Line type="monotone" dataKey="attendance" stroke="var(--primary)" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Mobile Chart Button */}
                  <div className="md:hidden flex justify-center">
                    <Button onClick={() => setIsChartDialogOpen(true)} className="cta-button">
                      View Attendance Trend
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Chart Dialog for Mobile */}
            <Dialog open={isChartDialogOpen} onOpenChange={setIsChartDialogOpen}>
              <DialogContent className="sm:max-w-[425px] h-[80vh] flex flex-col">
                <DialogHeader>
                  <DialogTitle>Attendance Trend</DialogTitle>
                </DialogHeader>
                <ScrollArea className="flex-grow">
                  <div className="w-full h-[300px]"> {/* Fixed height for chart inside scroll area */}
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={dummyAttendanceData.trend}
                        margin={{
                          top: 5,
                          right: 10,
                          left: 10,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                        <XAxis dataKey="week" tickLine={false} axisLine={false} />
                        <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '0.5rem' }}
                          labelStyle={{ color: 'var(--foreground)' }}
                          itemStyle={{ color: 'var(--muted-foreground)' }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '10px', color: 'var(--muted-foreground)' }} />
                        <Line type="monotone" dataKey="attendance" stroke="var(--primary)" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>

      <MobileNav activeTab="analytics" />
    </div>
  );
};

export default StudentAnalytics;
