import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { CheckCircle2, XCircle, Clock } from "lucide-react"; // Icons for status

export function SessionsTable({ records }) { // Renamed from AttendanceTable
  const getStatusIcon = (status) => {
    switch (status) {
      case "Present":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "Absent":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "Not Yet Marked": // New status
        return <Clock className="w-4 h-4 text-blue-500" />;
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
      case "Not Yet Marked": // New status
        return "bg-blue-100 text-blue-800";
      default:
        return "";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Session ID / Title</TableHead> {/* Updated column header */}
            <TableHead>Course Code</TableHead> {/* Added Course Code */}
            <TableHead>Date & Time</TableHead> {/* Updated column header */}
            <TableHead>Venue / Location</TableHead> {/* Updated column header */}
            <TableHead>Status</TableHead>
            <TableHead>Marked At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-medium">{record.sessionTitle}</TableCell> {/* Changed to sessionTitle */}
              <TableCell>{record.courseCode}</TableCell> {/* Display Course Code */}
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