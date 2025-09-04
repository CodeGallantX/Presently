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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State for create modal visibility
  const [sessionType, setSessionType] = useState("one-time"); // "one-time", "daily", "weekly"
  const [newEntryCourseCode, setNewEntryCourseCode] = useState("");
  const [newEntryDate, setNewEntryDate] = useState("");
  const [newEntryStartTime, setNewEntryStartTime] = useState("");
  const [newEntryEndTime, setNewEntryEndTime] = useState("");
  const [newEntryStartDate, setNewEntryStartDate] = useState("");
  const [newEntryEndDate, setNewEntryEndDate] = useState("");
  const [newEntryDaysOfWeek, setNewEntryDaysOfWeek] = useState([]); // For weekly repeats
  const [newEntryAutoStartStop, setNewEntryAutoStartStop] = useState(false);
  const isMobile = useIsMobile(); // Detect mobile device
  const { toast } = useToast();

  const handleDayOfWeekChange = (day) => {
    setNewEntryDaysOfWeek((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

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

  const handleDelete = (id) => {
    toast({
      title: "Delete Action",
      description: `Are you sure you want to delete entry with ID: ${id}?`,
      action: <ToastAction altText="Confirm Delete" onClick={() => {
        setTimetableEntries(timetableEntries.filter((entry) => entry.id !== id));
        toast({ title: "Entry Deleted", description: `Entry with ID: ${id} has been deleted.` });
      }}>Confirm</ToastAction>,
    });
  };

  

  const handleCreateEntry = () => {
    // Basic validation
    if (!newEntryCourseCode) {
      toast({ title: "Validation Error", description: "Please select a course.", variant: "destructive" });
      return;
    }

    let newEntry = {
      id: `t${timetableEntries.length + 1}`, // Simple ID generation
      courseName: mockCourses.find(c => c.code === newEntryCourseCode)?.name || "",
      courseCode: newEntryCourseCode,
      status: "Upcoming",
      duration: "N/A", // Will be calculated
    };

    if (sessionType === "one-time") {
      if (!newEntryDate || !newEntryStartTime || !newEntryEndTime) {
        toast({ title: "Validation Error", description: "Please fill in all date and time fields for one-time session.", variant: "destructive" });
        return;
      }
      newEntry = {
        ...newEntry,
        day: new Date(newEntryDate).toLocaleDateString('en-US', { weekday: 'long' }),
        startTime: newEntryStartTime,
        endTime: newEntryEndTime,
      };
    } else if (sessionType === "daily") {
      if (!newEntryStartDate || !newEntryEndDate || !newEntryStartTime || !newEntryEndTime) {
        toast({ title: "Validation Error", description: "Please fill in all date and time fields for daily repeats.", variant: "destructive" });
        return;
      }
      newEntry = {
        ...newEntry,
        day: "Daily",
        startTime: newEntryStartTime,
        endTime: newEntryEndTime,
        startDate: newEntryStartDate,
        endDate: newEntryEndDate,
      };
    } else if (sessionType === "weekly") {
      if (newEntryDaysOfWeek.length === 0 || !newEntryStartTime || !newEntryEndTime) {
        toast({ title: "Validation Error", description: "Please select at least one day and fill in time fields for weekly repeats.", variant: "destructive" });
        return;
      }
      newEntry = {
        ...newEntry,
        day: newEntryDaysOfWeek.join(", "),
        startTime: newEntryStartTime,
        endTime: newEntryEndTime,
        daysOfWeek: newEntryDaysOfWeek,
      };
    }

    // Calculate duration (simple example)
    if (newEntry.startTime && newEntry.endTime) {
      const start = new Date(`2000/01/01 ${newEntry.startTime}`);
      const end = new Date(`2000/01/01 ${newEntry.endTime}`);
      const diffMs = end - start;
      const diffMins = Math.round(diffMs / (1000 * 60));
      const hours = Math.floor(diffMins / 60);
      const minutes = diffMins % 60;
      newEntry.duration = `${hours}h ${minutes}m`;
    }

    setTimetableEntries((prev) => [...prev, newEntry]);
    setIsCreateModalOpen(false); // Close modal
    toast({ title: "Success", description: "Timetable entry created successfully." });
    // Reset form fields
    setSessionType("one-time");
    setNewEntryCourseCode("");
    setNewEntryDate("");
    setNewEntryStartTime("");
    setNewEntryEndTime("");
    setNewEntryStartDate("");
    setNewEntryEndDate("");
    setNewEntryDaysOfWeek([]);
    setNewEntryAutoStartStop(false);
  };

  const handleEdit = (id) => {
    toast({ title: "Edit Action", description: `Edit entry with ID: ${id}` });
    // In a real app, this would open a form to edit the entry
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>Create New Entry</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Timetable Entry</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sessionType" className="text-right">
                  Session Type
                </Label>
                <Select onValueChange={setSessionType} value={sessionType}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select session type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one-time">One-Time Session</SelectItem>
                    <SelectItem value="daily">Daily Repeats</SelectItem>
                    <SelectItem value="weekly">Weekly Repeats</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Course Selection */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="courseCode" className="text-right">
                  Course
                </Label>
                <Select onValueChange={setNewEntryCourseCode} value={newEntryCourseCode}>
                  <SelectTrigger className="col-span-3">
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
              </div>

              {sessionType === "one-time" && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={newEntryDate}
                      onChange={(e) => setNewEntryDate(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="startTime" className="text-right">
                      Start Time
                    </Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={newEntryStartTime}
                      onChange={(e) => setNewEntryStartTime(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="endTime" className="text-right">
                      End Time
                    </Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={newEntryEndTime}
                      onChange={(e) => setNewEntryEndTime(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </>
              )}

              {sessionType === "daily" && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="startDate" className="text-right">
                      Start Date
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newEntryStartDate}
                      onChange={(e) => setNewEntryStartDate(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="endDate" className="text-right">
                      End Date
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newEntryEndDate}
                      onChange={(e) => setNewEntryEndDate(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dailyStartTime" className="text-right">
                      Start Time
                    </Label>
                    <Input
                      id="dailyStartTime"
                      type="time"
                      value={newEntryStartTime}
                      onChange={(e) => setNewEntryStartTime(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dailyEndTime" className="text-right">
                      End Time
                    </Label>
                    <Input
                      id="dailyEndTime"
                      type="time"
                      value={newEntryEndTime}
                      onChange={(e) => setNewEntryEndTime(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </>
              )}

              {sessionType === "weekly" && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Days</Label>
                    <div className="col-span-3 flex flex-wrap gap-2">
                      {mockDays.filter(day => day.value !== "ALL").map((day) => (
                        <div key={day.value} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={day.value}
                            checked={newEntryDaysOfWeek.includes(day.value)}
                            onChange={() => handleDayOfWeekChange(day.value)}
                            className="form-checkbox"
                          />
                          <Label htmlFor={day.value}>{day.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="weeklyStartTime" className="text-right">
                      Start Time
                    </Label>
                    <Input
                      id="weeklyStartTime"
                      type="time"
                      value={newEntryStartTime}
                      onChange={(e) => setNewEntryStartTime(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="weeklyEndTime" className="text-right">
                      End Time
                    </Label>
                    <Input
                      id="weeklyEndTime"
                      type="time"
                      value={newEntryEndTime}
                      onChange={(e) => setNewEntryEndTime(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </>
              )}

              {/* Extra Configurations */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="autoStartStop" className="text-right">
                  Auto Start/Stop
                </Label>
                <Switch
                  id="autoStartStop"
                  checked={newEntryAutoStartStop}
                  onCheckedChange={setNewEntryAutoStartStop}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleCreateEntry}>Create Entry</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
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
    </>
  );
}
