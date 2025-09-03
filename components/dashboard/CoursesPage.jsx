import { CourseCard } from "./CourseCard";
import { CoursesTable } from "./CoursesTable";
import { File } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader"; // Import DashboardHeader
import MobileNav from "@/components/dashboard/MobileNav"; // Import MobileNav

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
  },
];

export default function CoursesPage() {
  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full pt-16 pb-16"> {/* Added padding */}
        <DashboardHeader title="My Courses" /> {/* Added DashboardHeader */}
        <File className="w-16 h-16 text-gray-400" />
        <p className="mt-4 text-lg text-gray-500">No courses found.</p>
        <p className="text-sm text-gray-400">
          Check with your lecturer or department.
        </p>
        <MobileNav activeTab="courses" /> {/* Added MobileNav */}
      </div>
    );
  }

  return (
    <>
      <DashboardHeader title="My Courses" /> {/* Added DashboardHeader */}
      <div className="pt-16 pb-16 px-4 space-y-4"> {/* Added padding and horizontal padding */}
        <div className="md:hidden">
          {courses.map((course) => (
            <CourseCard key={course.code} course={course} />
          ))}
        </div>
        <div className="hidden md:block">
          <CoursesTable courses={courses} />
        </div>
      </div>
      <MobileNav activeTab="courses" /> {/* Added MobileNav */}
    </>
  );
}
