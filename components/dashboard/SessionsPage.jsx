"use client";

import { useState, useMemo } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MobileNav from "@/components/dashboard/MobileNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { File, Download, CalendarPlus, CalendarDays } from "lucide-react"; // Import new icons
import { SessionCard } from "./SessionCard";
import { SessionsTable } from "./SessionsTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link"; // Import Link

const mockSessionRecords = [
  {
    id: "s1",
    courseCode: "CS101",
    sessionTitle: "Lecture 1: Introduction",
    date: "2025-08-28",
    time: "09:00 AM",
    venue: "Lab 101",
    status: "Present",
    markedAt: "09:05 AM",
  },
  {
    id: "s2",
    courseCode: "CS201",
    sessionTitle: "Tutorial 3: Arrays",
    date: "2025-08-20",
    time: "10:00 AM",
    venue: "Lecture Hall A",
    status: "Absent",
    markedAt: null,
  },
  {
    id: "s3",
    courseCode: "CS301",
    sessionTitle: "Lab 2: SQL Queries",
    date: "2025-09-02",
    time: "11:00 AM",
    venue: "Room 203",
    status: "Present",
    markedAt: "11:02 AM",
  },
  {
    id: "s4",
    courseCode: "CS101",
    sessionTitle: "Lecture 2: Variables",
    date: "2025-09-04",
    time: "09:00 AM",
    venue: "Lab 101",
    status: "Not Yet Marked",
    markedAt: null,
  },
  {
    id: "s5",
    courseCode: "CS101",
    sessionTitle: "Lecture 3: Conditionals",
    date: "2025-09-06",
    time: "09:00 AM",
    venue: "Lab 101",
    status: "Present",
    markedAt: "09:03 AM",
  },
  {
    id: "s6",
    courseCode: "CS201",
    sessionTitle: "Lecture 1: Data Types",
    date: "2025-08-15",
    time: "10:00 AM",
    venue: "Lecture Hall A",
    status: "Present",
    markedAt: "10:01 AM",
  },
];

const mockCourses = [
  { name: "Introduction to Programming", code: "CS101" },
  { name: "Data Structures and Algorithms", code: "CS201" },
  { name: "Database Management Systems", code: "CS301" },
];

const mockStatuses = [
  { label: "All Statuses", value: "ALL" },
  { label: "Present", value: "Present" },
  { label: "Absent", value: "Absent" },
  { label: "Not Yet Marked", value: "Not Yet Marked" },
];

export default function SessionsPage() {
  const [selectedCourseCode, setSelectedCourseCode] = useState(mockCourses[0].code);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest");

  // For MVP, hardcode user role. In a real app, this would come from auth context.
  const isCourseRep = true; // Set to true to show "Manage Timetable" button
  const isStudent = true; // Set to true to show "View Timetable" button

  const sessionsForSelectedCourse = useMemo(() => {
    return mockSessionRecords.filter(
      (record) => record.courseCode === selectedCourseCode
    );
  }, [selectedCourseCode]);

  const filteredAndSortedSessions = useMemo(() => {
    let filtered = sessionsForSelectedCourse.filter((record) => {
      return selectedStatus === "ALL" || record.status === selectedStatus;
    });

    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [sessionsForSelectedCourse, selectedStatus, sortBy]);

  const totalSessions = sessionsForSelectedCourse.length;
  const sessionsAttended = sessionsForSelectedCourse.filter(
    (record) => record.status === "Present"
  ).length;
  const sessionsMissed = sessionsForSelectedCourse.filter(
    (record) => record.status === "Absent"
  ).length;
  const attendancePercentage =
    totalSessions > 0 ? Math.round((sessionsAttended / totalSessions) * 100) : 0;

  const getMotivationalMessage = (percentage) => {
    if (percentage === 100) return "Perfect attendance! You're a star!";
    if (percentage >= 80) return "Great job! Keep up the excellent attendance!";
    if (percentage >= 50) return "You're doing well, keep pushing!";
    return "Every session counts! Let's get that attendance up!";
  };

  const exportToCsv = () => {
    const headers = [
      "Session ID",
      "Course Code",
      "Session Title",
      "Date",
      "Time",
      "Venue",
      "Status",
      "Marked At",
    ];
    const rows = filteredAndSortedSessions.map((record) => [
      record.id,
      record.courseCode,
      record.sessionTitle,
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
    link.setAttribute("download", `${selectedCourseCode}_sessions.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <DashboardHeader title="My Sessions" />
      <div className="pt-16 pb-16 px-4 md:px-8 lg:px-12 space-y-6 min-h-[calc(100vh-64px)]"> {/* Adjusted horizontal padding and added min-height */}
        {/* Course Selector */}
        <Card className="dashboard-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Select Course</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Select onValueChange={setSelectedCourseCode} value={selectedCourseCode}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {mockCourses.map((course) => (
                  <SelectItem key={course.code} value={course.code}>
                    {course.name} ({course.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="dashboard-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Course Overview</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-muted/20 rounded-lg">
                <p className="text-2xl font-bold">{totalSessions}</p>
                <p className="text-sm text-muted-foreground">Total Sessions</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-green-500/20 rounded-lg">
                <p className="text-2xl font-bold">{sessionsAttended}</p>
                <p className="text-sm text-muted-foreground">Attended</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-red-500/20 rounded-lg">
                <p className="text-2xl font-bold">{sessionsMissed}</p>
                <p className="text-sm text-muted-foreground">Missed</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-primary/20 rounded-lg">
                <p className="text-2xl font-bold">{attendancePercentage}%</p>
                <p className="text-sm text-muted-foreground">Attendance</p>
              </div>
            </div>
            <p className="text-center text-lg font-semibold">
              {getMotivationalMessage(attendancePercentage)}
            </p>
          </CardContent>
        </Card>

        {/* Filters, Export, and Timetable Buttons */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <Select onValueChange={setSelectedStatus} value={selectedStatus}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              {mockStatuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <RadioGroup
            value={sortBy}
            onValueChange={setSortBy}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="newest" id="newest" />
              <Label htmlFor="newest">Newest</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="oldest" id="oldest" />
              <Label htmlFor="oldest">Oldest</Label>
            </div>
          </RadioGroup>

          <Button onClick={exportToCsv} variant="outline" className="w-full md:w-auto md:ml-auto">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>

          {isCourseRep && (
            <Link href="/dashboard/timetable-management" passHref>
              <Button variant="outline" className="w-full md:w-auto">
                <CalendarPlus className="w-4 h-4 mr-2" />
                Manage Timetable
              </Button>
            </Link>
          )}

          {isStudent && (
            <Link href="/dashboard/view-timetable" passHref>
              <Button variant="outline" className="w-full md:w-auto">
                <CalendarDays className="w-4 h-4 mr-2" />
                View Timetable
              </Button>
            </Link>
          )}
        </div>

        {/* Sessions List */}
        {filteredAndSortedSessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <File className="w-16 h-16 mb-4" />
            <p className="text-lg">No sessions available for this course yet.</p>
            <p className="text-sm">Check back later.</p>
          </div>
        ) : (
          <>
            <div className="md:hidden">
              {filteredAndSortedSessions.map((record) => (
                <SessionCard key={record.id} record={record} />
              ))}
            </div>
            <div className="hidden md:block">
              <SessionsTable records={filteredAndSortedSessions} />
            </div>
          </>
        )}
      </div>
      <MobileNav activeTab="sessions" />
    </>
  );
}