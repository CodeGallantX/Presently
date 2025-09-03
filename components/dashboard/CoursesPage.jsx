"use client";

import { useState, useMemo } from "react";
import { CourseCard } from "./CourseCard";
import { CoursesTable } from "./CoursesTable";
import { File } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MobileNav from "@/components/dashboard/MobileNav";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area"; // Import ScrollArea

const courses = [
  {
    name: "Introduction to Programming",
    code: "CS101",
    lecturer: "Dr. Smith",
    sessions: {
      completed: 8,
      total: 12,
    },
    attendance: 67,
    status: "Ongoing",
    lastAttended: "2025-08-28",
    semester: "Fall 2025",
  },
  {
    name: "Data Structures and Algorithms",
    code: "CS201",
    lecturer: "Prof. Jones",
    sessions: {
      completed: 10,
      total: 10,
    },
    attendance: 90,
    status: "Completed",
    lastAttended: "2025-08-20",
    semester: "Spring 2025",
  },
  {
    name: "Database Management Systems",
    code: "CS301",
    lecturer: "Dr. Williams",
    sessions: {
      completed: 5,
      total: 15,
    },
    attendance: 33,
    status: "Ongoing",
    lastAttended: "2025-09-02",
    semester: "Fall 2025",
  },
  {
    name: "Web Development Fundamentals",
    code: "WEB101",
    lecturer: "Ms. Davis",
    sessions: {
      completed: 7,
      total: 10,
    },
    attendance: 70,
    status: "Ongoing",
    lastAttended: "2025-09-01",
    semester: "Fall 2025",
  },
];

const mockSemesters = [
  { label: "All Semesters", value: "ALL" },
  { label: "Fall 2025", value: "Fall 2025" },
  { label: "Spring 2025", value: "Spring 2025" },
];

const mockStatuses = [
  { label: "All Statuses", value: "ALL" },
  { label: "Ongoing", value: "Ongoing" },
  { label: "Completed", value: "Completed" },
];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSemester =
        selectedSemester === "ALL" || course.semester === selectedSemester;

      const matchesStatus =
        selectedStatus === "ALL" || course.status === selectedStatus;

      return matchesSearch && matchesSemester && matchesStatus;
    });
  }, [searchTerm, selectedSemester, selectedStatus]);

  if (filteredCourses.length === 0 && searchTerm === "" && selectedSemester === "ALL" && selectedStatus === "ALL") {
    return (
      <div className="flex flex-col items-center justify-center h-full pt-16 pb-16">
        <DashboardHeader title="My Courses" />
        <File className="w-16 h-16 text-gray-400" />
        <p className="mt-4 text-lg text-gray-500">No courses found.</p>
        <p className="text-sm text-gray-400">
          Check with your lecturer or department.
        </p>
        <MobileNav activeTab="courses" />
      </div>
    );
  }

  return (
    <>
      <DashboardHeader title="My Courses" />
      <div className="pt-16 pb-16 px-4 md:px-8 lg:px-12 space-y-4"> {/* Adjusted horizontal padding */}
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Input
            placeholder="Search by course name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:flex-1"
          />
          <Select onValueChange={setSelectedSemester} value={selectedSemester}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by Semester" />
            </SelectTrigger>
            <SelectContent>
              {mockSemesters.map((semester) => (
                <SelectItem key={semester.value} value={semester.value}>
                  {semester.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
        </div>

        {filteredCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <File className="w-16 h-16 mb-4" />
            <p className="text-lg">No courses found matching your criteria.</p>
            <p className="text-sm">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <>
            <div className="md:hidden">
              {filteredCourses.map((course) => (
                <CourseCard key={course.code} course={course} />
              ))}
            </div>
            <div className="hidden md:block">
              <ScrollArea className="h-[calc(100vh-250px)] rounded-md border"> {/* Added ScrollArea */}
                <CoursesTable courses={filteredCourses} />
              </ScrollArea>
            </div>
          </>
        )}
      </div>
      <MobileNav activeTab="courses" />
    </>
  );
}
