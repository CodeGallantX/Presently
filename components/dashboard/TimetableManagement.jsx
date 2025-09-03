"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Trash2, Play, StopCircle, CalendarPlus, Filter } from "lucide-react"; // Import Filter
import { useIsMobile } from "@/hooks/use-mobile"; // Import useIsMobile hook

// Mock data for timetable entries
const mockTimetableEntries = [
  {
    id: "t1",
    courseName: "Introduction to Programming",
    courseCode: "CS101",
    day: "Monday",
    startTime: "09:00",
    endTime: "10:00",
    duration: "1h 0m",
    status: "Upcoming",
  },
  {
    id: "t2",
    courseName: "Data Structures and Algorithms",
    courseCode: "CS201",
    day: "Tuesday",
    startTime: "11:00",
    endTime: "12:30",
    duration: "1h 30m",
    status: "Upcoming",
  },
  {
    id: "t3",
    courseName: "Database Management Systems",
    courseCode: "CS301",
    day: "Wednesday",
    startTime: "14:00",
    endTime: "15:00",
    duration: "1h 0m",
    status: "Completed",
  },
  {
    id: "t4",
    courseName: "Web Development Fundamentals",
    courseCode: "WEB101",
    day: "Thursday",
    startTime: "10:00",
    endTime: "11:00",
    duration: "1h 0m",
    status: "In Progress",
  },
];

const mockCourses = [
  { name: "Introduction to Programming", code: "CS101" },
  { name: "Data Structures and Algorithms", code: "CS201" },
  { name: "Database Management Systems", code: "CS301" },
  { name: "Web Development Fundamentals", code: "WEB101" },
];

const mockDays = [
  { label: "All Days", value: "ALL" },
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
];

const mockStatuses = [
  { label: "All Statuses", value: "ALL" },
  { label: "Upcoming", value: "Upcoming" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
  { label: "Cancelled", value: "Cancelled" },
];

export default function TimetableManagement() {
  const [timetableEntries, setTimetableEntries] = useState(mockTimetableEntries);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourseCode, setSelectedCourseCode] = useState("ALL");
  const [selectedDay, setSelectedDay] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [showFilters, setShowFilters] = useState(false); // State for filter visibility
  const isMobile = useIsMobile(); // Detect mobile device

  const filteredEntries = useMemo(() => {
    return timetableEntries.filter((entry) => {
      const matchesSearch =
        entry.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.courseCode.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCourse =
        selectedCourseCode === "ALL" || entry.courseCode === selectedCourseCode;

      const matchesDay = selectedDay === "ALL" || entry.day === selectedDay;

      const matchesStatus =
        selectedStatus === "ALL" || entry.status === selectedStatus;

      return matchesSearch && matchesCourse && matchesDay && matchesStatus;
    });
  }, [timetableEntries, searchTerm, selectedCourseCode, selectedDay, selectedStatus]);

  const handleEdit = (id) => {
    alert(`Edit entry with ID: ${id}`);
    // In a real app, this would open a form to edit the entry
  };

  const handleDelete = (id) => {
    if (confirm(`Are you sure you want to delete entry with ID: ${id}?`)) {
      setTimetableEntries(timetableEntries.filter((entry) => entry.id !== id));
    }
  };

  const handleStartStop = (id, action) => {
    alert(`${action} session for entry with ID: ${id}`);
    // In a real app, this would update the session status
  };

  return (
    <div className="space-y-6">
      <Card className="dashboard-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Timetable Entries</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          {/* Filters and Search */}
          {isMobile && (
            <div className="flex justify-end mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>
          )}
          {(!isMobile || showFilters) && (
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <Input
                placeholder="Search by course name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:flex-1"
              />
              <Select onValueChange={setSelectedCourseCode} value={selectedCourseCode}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Courses</SelectItem>
                  {mockCourses.map((course) => (
                    <SelectItem key={course.code} value={course.code}>
                      {course.name} ({course.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={setSelectedDay} value={selectedDay}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by Day" />
                </SelectTrigger>
                <SelectContent>
                  {mockDays.map((day) => (
                    <SelectItem key={day.value} value={day.value}>
                      {day.label}
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
          )}

          {/* Timetable Table */}
          {filteredEntries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <CalendarPlus className="w-16 h-16 mb-4" />
              <p className="text-lg">No timetable entries found.</p>
              <p className="text-sm">Add new entries to manage your timetable.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Day</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">
                        {entry.courseName} ({entry.courseCode})
                      </TableCell>
                      <TableCell>{entry.day}</TableCell>
                      <TableCell>
                        {entry.startTime} - {entry.endTime}
                      </TableCell>
                      <TableCell>{entry.duration}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            entry.status === "Upcoming"
                              ? "bg-blue-100 text-blue-800"
                              : entry.status === "In Progress"
                              ? "bg-green-100 text-green-800"
                              : entry.status === "Completed"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-red-100 text-red-800" // Cancelled
                          }`}
                        >
                          {entry.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(entry.id)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(entry.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          {entry.status === "Upcoming" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStartStop(entry.id, "Start")}
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                          )}
                          {entry.status === "In Progress" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStartStop(entry.id, "Stop")}
                            >
                              <StopCircle className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
