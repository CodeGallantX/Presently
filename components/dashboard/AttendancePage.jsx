import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MobileNav from "@/components/dashboard/MobileNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { File, Download } from "lucide-react";
import { AttendanceCard } from "./AttendanceCard";
import { AttendanceTable } from "./AttendanceTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockAttendanceRecords = [
  {
    id: "1",
    courseName: "Introduction to Programming",
    courseCode: "CS101",
    date: "2025-08-28",
    time: "09:00 AM",
    venue: "Lab 101",
    status: "Present",
    markedAt: "09:05 AM",
  },
  {
    id: "2",
    courseName: "Data Structures and Algorithms",
    courseCode: "CS201",
    date: "2025-08-20",
    time: "10:00 AM",
    venue: "Lecture Hall A",
    status: "Absent",
    markedAt: null,
  },
  {
    id: "3",
    courseName: "Database Management Systems",
    courseCode: "CS301",
    date: "2025-09-02",
    time: "11:00 AM",
    venue: "Room 203",
    status: "Present",
    markedAt: "11:02 AM",
  },
  {
    id: "4",
    courseName: "Introduction to Programming",
    courseCode: "CS101",
    date: "2025-09-04",
    time: "09:00 AM",
    venue: "Lab 101",
    status: "Pending",
    markedAt: null,
  },
];

const mockCourses = [
  { name: "All Courses", code: "ALL" },
  { name: "Introduction to Programming", code: "CS101" },
  { name: "Data Structures and Algorithms", code: "CS201" },
  { name: "Database Management Systems", code: "CS301" },
];

const mockStatuses = [
  { label: "All Statuses", value: "ALL" },
  { label: "Present", value: "Present" },
  { label: "Absent", value: "Absent" },
  { label: "Pending", value: "Pending" },
];

export default function AttendancePage() {
  const [selectedCourse, setSelectedCourse] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const filteredRecords = mockAttendanceRecords.filter((record) => {
    const courseMatch =
      selectedCourse === "ALL" || record.courseCode === selectedCourse;
    const statusMatch =
      selectedStatus === "ALL" || record.status === selectedStatus;
    return courseMatch && statusMatch;
  });

  const totalSessions = mockAttendanceRecords.length;
  const sessionsAttended = mockAttendanceRecords.filter(
    (record) => record.status === "Present"
  ).length;
  const attendancePercentage =
    totalSessions > 0 ? Math.round((sessionsAttended / totalSessions) * 100) : 0;

  const exportToCsv = () => {
    const headers = [
      "Course Code",
      "Course Name",
      "Date",
      "Time",
      "Venue",
      "Status",
      "Marked At",
    ];
    const rows = filteredRecords.map((record) => [
      record.courseCode,
      record.courseName,
      record.date,
      record.time,
      record.venue || "N/A",
      record.status,
      record.markedAt || "N/A",
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      rows.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendance_records.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <DashboardHeader title="My Attendance" />
      <div className="pt-16 pb-16 px-4 space-y-6">
        {/* Header / Summary */}
        <Card className="dashboard-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Overall Attendance</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative w-24 h-24">
                <Progress value={attendancePercentage} className="w-full h-full rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold">{attendancePercentage}%</span>
                </div>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-sm text-muted-foreground">
                  Sessions Attended:{