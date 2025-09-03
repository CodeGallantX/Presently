import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BarChart2, CalendarDays } from "lucide-react"; // Import icons

export function CourseCard({ course }) {
  return (
    <Card className="mb-4 dashboard-card">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{course.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{course.code}</p>
            {course.lecturer && ( // Conditionally display lecturer
              <p className="text-xs text-muted-foreground">Lecturer: {course.lecturer}</p>
            )}
          </div>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              course.status === "Ongoing"
                ? "bg-primary/10 text-primary"
                : "bg-secondary/10 text-secondary-foreground"
            }`}
          >
            {course.status}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Attendance</span>
            <span className="text-sm font-medium">{course.attendance}%</span>
          </div>
          <Progress value={course.attendance} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {course.sessions.completed} of {course.sessions.total} sessions attended
          </p>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Link href={`/dashboard/analytics?course=${course.code}`} passHref>
            <Button variant="outline" size="sm">
              <BarChart2 className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </Link>
          <Link href={`/dashboard/courses/${course.code}/sessions`} passHref>
            <Button variant="outline" size="sm">
              <CalendarDays className="h-4 w-4 mr-2" />
              View Sessions
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}