import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { CheckCircle2, XCircle, Clock } from "lucide-react"; // Icons for status

export function AttendanceTable({ records }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case "Present":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "Absent":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "Pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-800";
      case "Absent":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course Code</TableHead>
            <TableHead>Course Name</TableHead>
            <TableHead>Session Date/Time</TableHead>
            <TableHead>Venue</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Marked At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-medium">{record.courseCode}</TableCell>
              <TableCell>{record.courseName}</TableCell>
              <TableCell>
                {record.date} {record.time}
              </TableCell>
              <TableCell>{record.venue || "N/A"}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full flex items-center gap-1 w-fit ${getStatusBadgeClass(record.status)}`}
                >
                  {getStatusIcon(record.status)}
                  {record.status}
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {record.markedAt || "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
