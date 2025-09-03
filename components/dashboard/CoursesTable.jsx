import Link from "next/link";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react"; // Import Eye icon

export function CoursesTable({ courses }) {
  return (
    <div className="rounded-md border"> {/* Added border and rounded corners */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course Code</TableHead>
            <TableHead>Course Name</TableHead>
            <TableHead>Lecturer</TableHead>
            <TableHead>Sessions (Attended/Total)</TableHead>
            <TableHead>Attendance %</TableHead>
            <TableHead>Last Attended</TableHead>
            <TableHead className="text-right">Action</TableHead> {/* Align right */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.code}>
              <TableCell className="font-medium">{course.code}</TableCell> {/* Bold font */}
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.lecturer}</TableCell>
              <TableCell>
                {course.sessions.completed}/{course.sessions.total}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2"> {/* Added spacing */}
                  <Progress value={course.attendance} className="w-24 h-2" /> {/* Adjusted height */}
                  <span className="text-sm text-muted-foreground">{course.attendance}%</span> {/* Used muted-foreground */}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{course.lastAttended}</TableCell> {/* Used muted-foreground */}
              <TableCell className="text-right"> {/* Align right */}
                <Link href={`/dashboard/courses/${course.code}`} passHref>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" /> {/* Icon only button */}
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
